import React from "react"
import { Post, Posts } from "@/lib/23summer/post"
import {
  PostItemViewRoot,
  PostPreviewContent, PostPreviewExcerpt,
  PostPreviewImage,
  PostPreviewImageContainer, PostPreviewTitle,
  PostsGrid
} from "@/app/_styled"
import { notFound } from "next/navigation"

export default function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)
  if (page <= 0 || page > Posts.pages) notFound()

  const posts = Posts.list(page, true)

  return (
    <PostsGrid>
      {posts.map(it => <PostItem key={it.key} post={it}/>)}
    </PostsGrid>
  )
}

export async function generateStaticParams() {
  const maxPage = Posts.pages

    return new Array(maxPage).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}

const PostItem: React.FC<{ post: Post }> = async ({ post }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostItemViewRoot expand={post.expand}>
      <PostPreviewImageContainer>
        <PostPreviewImage
          src={preview.default.src}
          alt={`preview image of ${post.key}`}
        />
      </PostPreviewImageContainer>
      <PostPreviewContent>
        <PostPreviewTitle expand={post.expand}>{post.data.title}</PostPreviewTitle>
        <PostPreviewExcerpt>{ post.excerpt }</PostPreviewExcerpt>
      </PostPreviewContent>
    </PostItemViewRoot>
  )
}

