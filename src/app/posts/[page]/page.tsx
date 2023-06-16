import React from "react"
import { Post, Posts } from "@/lib/23summer/post"
import {
  PostItemViewRoot,
  PostPreviewContent, PostPreviewExcerpt,
  PostPreviewImageContainer, PostPreviewTitle, PostsCategories,
  PostsGrid, PostsRoot, PostsTitle
} from "@/app/_styled"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Background } from "@/components/Background"

export default function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)
  if (page <= 0 || page > Posts.pages) notFound()

  const posts = Posts.list(page, true)

  return (
    <PostsRoot>
      <Background/>
      <PostsTitle>
        <div>키위새의 아무말 저장소</div>
        <PostsCategories>
          <li>개발</li>
          <li>마인크래프트</li>
          <li>생명과학II</li>
          <li>아무말</li>
        </PostsCategories>
      </PostsTitle>
      <PostsGrid>
        {posts.map((it, index) => <PostItem key={it.key} priority={index === 0} post={it}/>)}
      </PostsGrid>
    </PostsRoot>
  )
}

export async function generateStaticParams() {
  const maxPage = Posts.pages

    return new Array(maxPage).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}

const PostItem: React.FC<{ post: Post, priority: boolean }> = async ({ post, priority }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostItemViewRoot expand={post.expand}>
      <PostPreviewImageContainer>
        <Image
          src={preview.default}
          alt={`preview image of ${post.key}`}
          sizes={"(max-width: 900px) 66vw, 100vw"}
          style={{ objectFit: "cover", filter: "brightness(0.5) blur(5px)", scale: "1.2" }}
          priority={priority}
          fill
        />
      </PostPreviewImageContainer>
      <PostPreviewContent>
        <PostPreviewTitle expand={post.expand}>{post.data.title}</PostPreviewTitle>
        <PostPreviewExcerpt>{ post.excerpt }</PostPreviewExcerpt>
      </PostPreviewContent>
    </PostItemViewRoot>
  )
}

