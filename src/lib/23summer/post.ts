import fs from "fs";
import matter from 'gray-matter';

import config from "../../config";
import { ArrayK } from "./../ktn";
import { Categories, Category } from "./category";

export type PostMetadata = {
  title: string
  date: string
  author: string
  categories: string[]
  expand?: { max_columns: number, max_rows: number }
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

export class Posts {

  private static get queryset() {
    return fs.readdirSync("./__posts__")
      .filter(it => !it.startsWith("_"))
      .reverse()
  }

  static get latest() {
    return Posts.retrieve(this.queryset[0])
  }

  static get total() {
    return Posts.queryset.length
  }

  static get pages() {
    return Math.ceil(Posts.queryset.length / config.blog.page_size)
  }

  static list(page?: number, expand?: boolean): Post[] {
    if (page === 0) throw Error("invalid page: 0. page must be bigger than zero.")

    return Posts.queryset
      .let(it => page ? it.slice((page - 1) * config.blog.page_size, page * config.blog.page_size) : it)
      .map(key => Posts.retrieve<RawPost>(key)!)
      .let(it => expand ? Posts.withExpand(it) : it)
  }

  private static withExpand(posts: RawPost[]): Post[] {
    const buildPostExpander = (GridColumns: number) => {
      const GridRows = (1024 / GridColumns).ceil
      const grid = ArrayK(1024, () => false).chunked(GridColumns)
      let index = 0

      return (post: RawPost): PostExpand | undefined => {
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

        const { max_columns, max_rows } = post.data.expand

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

    const postsMapper = (it: RawPost): Post => {
      const by2 = by2ExpandBuilder(it)
      const by3 = by3ExpandBuilder(it)

      if (by2 === undefined || by3 === undefined) return it
      else return ({ ...it, expand: { by2, by3 } })
    }
    return posts.map(postsMapper)
  }

  static retrieve<T extends RawPost>(key: string, content: boolean = false): T | null {
    const categories = Categories.list()

    try {
      return fs.readFileSync(`./__posts__/${key}/_post.markdown`, { encoding: "utf8" })
        .let(it => matter(it, { excerpt: true, excerpt_separator: config.blog.excerpt_separator }))
        .let(it => content ? it.pick("data", "excerpt", "content") : it.pick("data", "excerpt"))
        .also(it => it.data = it.data.pick("title", "date", "author", "categories", "expand"))
        .let(it => ({ ...it, excerpt: it.excerpt?.replace(/^> .+$/gm, ""), key }) as T)
        .let(it => ({
          ...it,
          category: [categories.find(category => it.data.categories[0] === category.name), categories.find(category => it.data.categories[1] === category.name)]
        }))
    } catch (e) {
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
