import fs from "fs";
import matter from 'gray-matter';

import config from "../../config";
import { ArrayK } from "./../ktn";
import { Categories, Category } from "./category";
import path from "path"

export type PostMetadata = {
  title: string
  date: string
  author: string
  categories: string[]
  expand?: { max_columns: number, max_rows: number }
  pinned?: boolean
}

export type RawPost = {
  key: string
  data: PostMetadata
  excerpt: string
  category: [Category, Category | undefined]
}

export type PostExpand = { columns: number, rows: number }

export type Post = RawPost & { expand?: { by2: PostExpand, by3: PostExpand } }

export type PostWithContent = Post & { content: string }

export type PostSummary = {
  title: string
  categories: [string, string][]
  excerpt: string
  key: string
  headers: string[]
}

export class Posts {

  static get queryset() {
    return fs.readdirSync(path.join("__posts__")).filter(it => !it.startsWith("_") && !it.startsWith(".")).sort().reverse()
    // return fs.readFileSync(path.join("__posts__/_registry.json"))
    //   .let(it => JSON.parse(it.toString("utf-8")) as string[])
    //   .filter(it => !it.startsWith("_"))
  }

  static get latest() {
    return Posts.retrieve(this.queryset[0])!
  }

  static get total() {
    return Posts.queryset.length
  }

  static get pages() {
    try { return Math.ceil(Posts.queryset.length / config.blog.page_size) }
    catch (e) { return -1 }
  }

  static list(page?: number, expand?: boolean): Post[] {
    if (page === 0) throw Error("invalid page: 0. page must be bigger than zero.")

    return Posts.queryset
      .let(it => page ? it.slice((page - 1) * config.blog.page_size, page * config.blog.page_size) : it)
      .map(key => Posts.retrieve<RawPost>(key)!)
      .let(it => expand ? Posts.withExpand(it) : it)
  }

  static summaries(): PostSummary[] {
    return Posts.queryset
      .map(key => Posts.retrieve<PostWithContent>(key, true)!)
      .map(it => ({
      title: it.data.title,
      categories: it.data.categories.map(it => Categories.retrieve(it)!.let(category => [category.display, category.color.bright] as const)),
      excerpt: it.excerpt,
      key: it.key,
      headers: it.content.split("\n").filter(it => it.startsWith("#"))
    }))
  }

  static get pinned(): Post {
    return Posts.queryset
      .map(it => Posts.retrieve<RawPost>(it)!)
      .find(it => it.data.pinned)!
  }

  static withExpand(posts: RawPost[]): Post[] {
    const buildPostExpander = (GridColumns: number) => {
      const GridRows = (1024 / GridColumns).ceil
      const grid = ArrayK(1024, () => false).chunked(GridColumns)
      let index = 0

      return (post: RawPost, arrayIndex: number): PostExpand | undefined => {
        let x = index % GridColumns
        let y = (index / GridColumns).floor

        while (grid[y][x]) {
          index++
          x = index % GridColumns
          y = (index / GridColumns).floor
        }

        grid[y][x] = true

        if (index === 0) {
          grid[y + 1][x] = grid[y][x + 1] = grid[y + 1][x + 1] = true
          return ({ columns: 2, rows: 2 })
        }

        if (!post.data.expand)
          return undefined

        let { max_columns, max_rows } = post.data.expand
        if (arrayIndex === 1)
          max_columns = 1

        let columns = 1, rows = 1

        while (x + columns <= GridColumns && !grid[y][x + columns] && columns < max_columns) {
          columns++
        }
        if (x + columns > GridColumns) columns--

        while (y + rows <= GridRows && !grid[y + rows][x + columns] && rows < max_rows) {
          rows++
        }
        if (y + rows > GridRows) rows--

        for (let i = 0; i < columns; i++) {
          for (let j = 0; j < rows; j++) {
            grid[y + j][x + i] = true
          }
        }

        return ({ columns, rows })
      }
    }

    const by2ExpandBuilder = buildPostExpander(2)
    const by3ExpandBuilder = buildPostExpander(3)

    const postsMapper = (it: RawPost, index: number): Post => {
      const by2 = by2ExpandBuilder(it, index)
      const by3 = by3ExpandBuilder(it, index)

      if (by2 === undefined || by3 === undefined) return it
      else return ({ ...it, expand: { by2, by3 } })
    }
    return posts.map(postsMapper)
  }

  static retrieve<T extends RawPost>(key: string, content: boolean = false): T | null {
    try {
      const categories = Categories.list()

      return fs.readFileSync(path.join(`__posts__/${key}/_post.markdown`), { encoding: "utf8" })
        .let(it => matter(it, { excerpt: true, excerpt_separator: config.blog.excerpt_separator }))
        .let(it => content ? it.pick("data", "excerpt", "content") : it.pick("data", "excerpt"))
        .also(it => it.data = it.data.pick("title", "date", "author", "categories", "expand", "pinned"))
        .let(it => ({ ...it, excerpt: it.excerpt?.replace(/^> .+$/gm, ""), key }) as T)
        .let(it => ({
          ...it,
          category: [categories.find(category => it.data.categories[0] === category.name), categories.find(category => it.data.categories[1] === category.name)]
        }))
    } catch (e) {
      console.error(`[${new Date().simpleFormat()}] [E] Tried to find un-existing post: ${key}`)
      return null
    }
  }

  static next(key: string): Post | null {
    return Posts.queryset[Posts.queryset.findIndex(it => it === key) - 1]
      ?.let(it => it ? Posts.retrieve(it) : null) ?? null
  }

  static previous(key: string): Post | null {
    return Posts.queryset[Posts.queryset.findIndex(it => it === key) + 1]
      ?.let(it => it ? Posts.retrieve(it) : null) ?? null
  }

  static related(key: string, name: string, surroundings?: (Post | null)[]) {
    return Posts.list()
      .filter(it => it.key !== key && (surroundings?.every(sr => sr?.key !== it.key) ?? true) && it.category[0].name === name).slice(0, 2)
  }

}
