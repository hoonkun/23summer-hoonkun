import React from "react"
import { Posts } from "@/lib/23summer/post"
import { PostsCategories, PostsGrid, PostsRoot, PostsTitle, VerticalDivider } from "@/app/_styled"
import { notFound } from "next/navigation"
import { Background } from "@/components/Background"
import { PostItem } from "@/app/posts/[page]/_PostItem"
import {
  BackgroundOverlay,
  PostFooterArea,
  PostFooterDescription,
  PostFooterLeft,
  PostsFooterArea
} from "@/app/post/[key]/_styled"
import Link from "next/link"
import { Logo } from "@/app/post/[key]/_logo"

export default async function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)
  if (page <= 0 || page > Posts.pages) notFound()

  const posts = Posts.list(page, true)

  return (
    <PostsRoot>
      <Background>
        <BackgroundOverlay/>
      </Background>
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
      <PostsFooterArea>
        <PostFooterLeft>
          <Link href={"/"}>HoonKun <VerticalDivider/> 훈쿤</Link>
          <PostFooterDescription>재미있어 보이는 이것저것을 살피는 햇병아리 멍발자</PostFooterDescription>
        </PostFooterLeft>
        <Logo src={(await import("@/resources/logo.png")).default.src}/>
      </PostsFooterArea>
    </PostsRoot>
  )
}

export async function generateStaticParams() {
  return new Array(Posts.pages).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}
