import React from "react"

import Link from "next/link"
import { notFound } from "next/navigation"

import { Post, Posts } from "@/lib/23summer/post"

import {
  BlogFooterArea,
  BlogFooterDescription,
  DesktopOnlyKiwicraftLogo,
  PinIcon,
  PostItemExcerpt,
  PostItemImageContainer,
  PostItemRoot,
  PostItemTitle,
  PostsCategories,
  PostsGrid,
  PostsRoot,
  PostsTitle,
  PostsTopDivider,
  PriorityPostDescription,
  PriorityPostItemExcerpt,
  PriorityPostItemPreview,
  PriorityPostItemRoot,
  PriorityPostItemRow,
  PriorityPostItemTitle,
  ScrollDown,
  StickyArea,
  StickyContentPositioner,
  StickyDescription,
  VerticalDivider
} from "@/app/posts/list/_styled"
import { BlogFooterAreaLeft } from "@/app/posts/_styled"

import { Background } from "@/components/Background"

import Pin from "@/resources/icons/pin.svg"
import Latest from "@/resources/icons/latest.svg"

export default async function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)
  if (page <= 0 || page > Posts.pages) notFound()

  const posts = Posts.list(page, true)
  const postsCount = Posts.total
  const pinned = Posts.pinned
  const latest = Posts.latest

  return (
    <PostsRoot>
      <Background darker overlay/>
      <StickyArea>
        <StickyContentPositioner $ratio={5}/>
        <PostsTitle>
          <div>키위새의 아무말 저장소</div>
          <PostsCategories>
            <li>개발</li>
            <li>마인크래프트</li>
            <li>생명과학II</li>
            <li>아무말</li>
          </PostsCategories>
        </PostsTitle>
        <StickyDescription>
          <span>전체 {postsCount} 게시글</span><br/>
          생각 날 때마다 가끔씩 들러서 아무말을 합니다!<br/>
          저도 웹 페이지 디자인을 좀 잘 하고 싶네요.<br/>
        </StickyDescription>
        <PriorityPostItemRow>
          <PriorityPostItem post={pinned} type={"pinned"}/>
          <PriorityPostItem post={latest} type={"latest"}/>
        </PriorityPostItemRow>
        <StickyContentPositioner $ratio={1}/>
        <BlogFooterArea>
          <BlogFooterAreaLeft>
            <Link href={"/"}>HoonKun <VerticalDivider/> 훈쿤</Link>
            <BlogFooterDescription>재미있어 보이는 이것저것을 살피는 햇병아리 멍발자</BlogFooterDescription>
          </BlogFooterAreaLeft>
          <ScrollDown>
            <span>스크롤하여 더보기</span><br/>︾
          </ScrollDown>
          <DesktopOnlyKiwicraftLogo src={(await import("@/resources/logo.png")).default.src}/>
        </BlogFooterArea>
      </StickyArea>
      <PostsTopDivider/>
      <PostsGrid>
        {posts.map(it => <PostItem key={it.key} priority={false} post={it}/>)}
      </PostsGrid>
    </PostsRoot>
  )
}

export async function generateStaticParams() {
  return new Array(Posts.pages).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}

const title = "키위새의 아무말 저장소"
const description = "개발, 마인크래프트, 생명과학II 등의 주제로 아무말을 합니다!"

export const metadata = {
  title, description,
  twitter: { title, description, card: "summary_large_image", site: "arctic_apteryx" },
  openGraph: { title, description }
}

const PostItem: React.FC<{ post: Post, priority: boolean }> = async ({ post, priority }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.jpg`)

  return (
    <PostItemRoot
      href={`/posts/retrieve/${post.key}`}
      $expand={post.expand}
      $priority={`${priority}`}
    >
      <PostItemImageContainer
        src={preview.default}
        alt={`preview image of ${post.key}`}
        sizes={"(max-width: 900px) 66vw, 100vw"}
        style={{ objectFit: "cover", filter: "brightness(0.5) blur(5px)", scale: "1.2" }}
        fetchPriority={priority ? "high" : "auto"}
        priority={priority}
        fill
      />
      <PostItemTitle $expand={post.expand}>{post.data.title}</PostItemTitle>
      <PostItemExcerpt>{ post.excerpt }</PostItemExcerpt>
    </PostItemRoot>
  )
}

const PriorityPostItem: React.FC<{ post: Post, type: "latest" | "pinned" }> = async ({ post, type }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.jpg`)

  return (
    <PriorityPostItemRoot
      href={`/posts/retrieve/${post.key}`}
      $hideWhenWide={type === "latest"}
    >
      <PriorityPostItemPreview
        src={preview.default}
        alt={`preview image of ${post.key}`}
        sizes={"(max-width: 900px) 66vw, 100vw"}
        style={{ objectFit: "cover", filter: "brightness(0.5) blur(5px)", scale: "1.2" }}
        fetchPriority={"high"}
        priority={true}
      />
      <PriorityPostDescription>
        {type === "pinned" ? <PinIcon alt={""} src={Pin}/> : <PinIcon alt={""} src={Latest}/>}
        {type === "pinned" ? "고정된 포스트" : "최신 게시글"}
      </PriorityPostDescription>
      <PriorityPostItemTitle
        $expand={{ by2: { columns: 2, rows: 2 }, by3: { columns: 2, rows: 2 } }}
      >
        {post.data.title}
      </PriorityPostItemTitle>
      <PriorityPostItemExcerpt>{ post.excerpt }</PriorityPostItemExcerpt>
    </PriorityPostItemRoot>
  )
}
