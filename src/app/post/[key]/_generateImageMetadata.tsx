import { ImageResponse } from "next/server"
import { PostParams } from "@/app/post/[key]/page"
import { Post, Posts } from "@/lib/23summer/post"

// FIXME: 아래의 http://localhost:3000 를 실제 deploy 주소로 변경할 것.
//  근데 서버들은 내가 어느 도메인에 있는지 모르긴 할텐데... 요청 헤더같은거에 있는거 가져다 쓰면 안되는건가... 그런거 없나??

export default async function MetadataImage({ params }: { params: PostParams }): Promise<ImageResponse> {
  const post = Posts.retrieve<Post>(params.key, false)

  if (!post) {
    return new ImageResponse(<NotFoundImage/>)
  } else {
    return new ImageResponse(
      <img
        src={`http://localhost:3000${(await import(`$/__posts__/${params.key}/preview.png`)).default.src}`}
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
