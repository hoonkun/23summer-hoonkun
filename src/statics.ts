import fs from "fs"
import path from "path"

import { Posts } from "./lib/23summer/post"


const base = "https://hoonkun.kiwi"

// ___SITEMAP___

const modified = Posts.lastModified

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


// ___PostRegistry___

const postKeys = fs.readdirSync(path.join(process.cwd(), "__posts__")).filter(it => !it.startsWith("_")).sort().reverse()
fs.writeFileSync(path.join(process.cwd(), "__posts__/_registry.json"), JSON.stringify(postKeys, null, 2), { encoding: "utf-8" })
