import fs from "fs"
import path from "path"

import { Posts } from "./lib/23summer/post"
import config from "./config"


const base = "https://hoonkun.kiwi"

// ___PostRegistry___

const postKeys = fs.readdirSync(path.join(process.cwd(), "__posts__")).filter(it => !it.startsWith("_") && !it.startsWith(".")).sort().reverse()
fs.writeFileSync(path.join(process.cwd(), "__posts__/_registry.json"), JSON.stringify(postKeys, null, 2), { encoding: "utf-8" })

// ___SITEMAP___

const retrieves = Posts.queryset.map(it => {
  const basePath = path.join(process.cwd(), `__posts__/${it}`)
  const files = fs.readdirSync(basePath)
  return { key: it, lastModified: new Date(files.map(it => +fs.statSync(path.join(basePath, it)).mtime).max()) }
})
const lists = retrieves.chunked(config.blog.page_size)
  .map(it => it.sort((a, b) => (+b.lastModified) - (+a.lastModified))[0])
  .map((it, index) => ({ page: index, lastModified: it.lastModified }))

const modified = { retrieves, lists }

const PostLists = modified.lists.map(it => ({
  url: `${base}/posts/list/${it.page}`, lastModified: it.lastModified
}))
const PostRetrieves = modified.retrieves.map(it => ({
  url: `${base}/posts/retrieve/${it.key}`, lastModified: it.lastModified
}))

const sitemap = [
  {
    url: base,
    lastModified: new Date()
  },
  ...PostLists,
  ...PostRetrieves
]

const xml = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(it => `<url><loc>${it.url}</loc><lastmod>${it.lastModified.toISOString()}</lastmod></url>`).join("\n")}
</urlset>
`

fs.writeFileSync(path.join(process.cwd(), "src/app/sitemap.xml"), xml, { encoding: "utf-8" })


// ___ROBOTS___

const robots = `
User-Agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
fs.writeFileSync(path.join(process.cwd(), "src/app/robots.txt"), robots, { encoding: "utf-8" })
