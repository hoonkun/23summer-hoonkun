import fs from "fs"
import path from "path"
import { Posts } from "@/lib/23summer/post"
import config from "@/config"
import { MetadataRoute } from "next"

const base = "https://hoonkun.kiwi"

export default function sitemap(): MetadataRoute.Sitemap {
  const postKeys = fs.readdirSync(path.join("__posts__")).filter(it => !it.startsWith("_") && !it.startsWith(".")).sort().reverse()
  fs.writeFileSync(path.join("__posts__/_registry.json"), JSON.stringify(postKeys, null, 2), { encoding: "utf-8" })

  const retrieves = Posts.queryset.map(it => {
    const basePath = path.join(`__posts__/${it}`)
    const files = fs.readdirSync(basePath)
    return { key: it, lastModified: new Date(files.map(it => +fs.statSync(path.join(basePath, it)).mtime).max()) }
  })
  const lists = retrieves.chunked(config.blog.page_size)
    .map(it => it.sort((a, b) => (+b.lastModified) - (+a.lastModified))[0])
    .map((it, index) => ({ page: index + 1, lastModified: it.lastModified }))

  const modified = { retrieves, lists }

  const PostLists = modified.lists.map(it => ({
    url: `${base}/posts/list/${it.page}`, lastModified: it.lastModified
  }))
  const PostRetrieves = modified.retrieves.map(it => ({
    url: `${base}/posts/retrieve/${it.key}`, lastModified: it.lastModified
  }))

  const PortfolioUpdated = fs.readdirSync(path.join(`__portfolio__`))
    .map(it => +new Date(fs.statSync(path.join(`__portfolio__`, it)).mtime))
    .max()

  const Footprint = {
    url: `${base}/footprints`,
    lastModified: new Date(PortfolioUpdated),
  }

  return [
    {
      url: base,
      lastModified: new Date([Footprint, ...PostLists, ...PostRetrieves].map(it => +it.lastModified).max())
    },
    Footprint,
    ...PostLists,
    ...PostRetrieves
  ]
}
