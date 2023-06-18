import React from "react"
import { Posts } from "@/lib/23summer/post"
import { PostsCategories, PostsGrid, PostsRoot, PostsTitle } from "@/app/_styled"
import { notFound } from "next/navigation"
import { Background } from "@/components/Background"
import { PostItem } from "@/app/posts/[page]/_PostItem"

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
  return new Array(Posts.pages).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}
