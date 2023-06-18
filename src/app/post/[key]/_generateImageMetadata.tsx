import { ImageResponse } from "next/server"
import { PostParams } from "@/app/post/[key]/page"
import { Post, Posts } from "@/lib/23summer/post"
import config from "@/config"

export default async function MetadataImage({ params }: { params: PostParams }): Promise<ImageResponse> {
  const post = Posts.retrieve<Post>(params.key, false)

  if (!post) {
    return new ImageResponse(<NotFoundImage/>)
  } else {
    return new ImageResponse(
      <img
        src={`${config.deploy}${(await import(`$/__posts__/${params.key}/preview.png`)).default.src}`}
        alt={`preview image of post '${post.data.title}' in hoonkun.kiwi`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    )
  }
}

const NotFoundImage = () => {
  return (
    <div>
      {/* TODO!! */}
    </div>
  )
}
