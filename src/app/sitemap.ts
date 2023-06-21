import { MetadataRoute } from "next"
import { Posts } from "@/lib/23summer/post"
import config from "@/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.deploy

  const modified = Posts.lastModified

  const PostLists: MetadataRoute.Sitemap = modified.lists.map(it => ({
    url: `${base}/posts/list/${it.page}`, lastModified: it.lastModified
  }))
  const PostRetrieves: MetadataRoute.Sitemap = modified.retrieves.map(it => ({
    url: `${base}/posts/retrieve/${it.key}`, lastModified: it.lastModified
  }))

  return [
    {
      url: base,
      lastModified: new Date()
    },
    ...PostLists,
    ...PostRetrieves
  ]
}
