import React from "react"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Post, Posts } from "@/lib/23summer/post"

import {
  PostsCategories,
  PostsGrid,
  PostsRoot,
  PostsTitle,
  BlogFooterArea,
  VerticalDivider,
  PostItemRoot,
  PostItemTitle,
  PostItemContent,
  PostItemExcerpt,
  PostItemImageContainer
} from "@/app/posts/list/_styled"
import {
  BlogFooterDescription,
  BlogFooterAreaLeft
} from "@/app/posts/_styled"

import { Background, BackgroundOverlay } from "@/components/Background"
import { KiwicraftLogo } from "@/components/KiwicraftLogo"

export default async function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)
  if (page <= 0 || page > Posts.pages) notFound()

  const posts = Posts.list(page, true)

  return (
    <PostsRoot>
      <Background overlay/>
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
      <BlogFooterArea>
        <BlogFooterAreaLeft>
          <Link href={"/"}>HoonKun <VerticalDivider/> 훈쿤</Link>
          <BlogFooterDescription>재미있어 보이는 이것저것을 살피는 햇병아리 멍발자</BlogFooterDescription>
        </BlogFooterAreaLeft>
        <KiwicraftLogo src={(await import("@/resources/logo.png")).default.src}/>
      </BlogFooterArea>
    </PostsRoot>
  )
}

export async function generateStaticParams() {
  return new Array(Posts.pages).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}

const PostItem: React.FC<{ post: Post, priority: boolean }> = async ({ post, priority }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostItemRoot expand={post.expand} href={`/posts/retrieve/${post.key}`}>
      <PostItemImageContainer>
        <Image
          src={preview.default}
          alt={`preview image of ${post.key}`}
          sizes={"(max-width: 900px) 66vw, 100vw"}
          style={{ objectFit: "cover", filter: "brightness(0.5) blur(5px)", scale: "1.2" }}
          priority={priority}
          fill
        />
      </PostItemImageContainer>
      <PostItemContent>
        <PostItemTitle expand={post.expand}>{post.data.title}</PostItemTitle>
        <PostItemExcerpt>{ post.excerpt }</PostItemExcerpt>
      </PostItemContent>
    </PostItemRoot>
  )
}
