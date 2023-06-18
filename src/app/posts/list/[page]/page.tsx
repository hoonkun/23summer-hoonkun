import React from "react"
import { Post, Posts } from "@/lib/23summer/post"
import {
  PostItemLinkChild, PostPreviewContent, PostPreviewExcerpt, PostPreviewImageContainer,
  PostPreviewRoot, PostPreviewTitle,
  PostsCategories,
  PostsGrid,
  PostsRoot,
  PostsTitle,
  VerticalDivider
} from "@/app/posts/list/_styled"
import { notFound } from "next/navigation"
import { Background } from "@/components/Background"
import {
  BackgroundOverlay,
  PostFooterDescription,
  PostFooterLeft,
  PostsFooterArea
} from "@/app/posts/retrieve/_styled"
import Link from "next/link"
import { KiwicraftLogo } from "@/components/KiwicraftLogo"
import Image from "next/image"

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
        <KiwicraftLogo src={(await import("@/resources/logo.png")).default.src}/>
      </PostsFooterArea>
    </PostsRoot>
  )
}

export async function generateStaticParams() {
  return new Array(Posts.pages).fill(undefined).map((_, index) => ({ page: `${index + 1}` }))
}

const PostItem: React.FC<{ post: Post, priority: boolean }> = async ({ post, priority }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostPreviewRoot expand={post.expand}>
      <Link href={`/posts/retrieve/${post.key}`}>
        <PostItemLinkChild>
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
        </PostItemLinkChild>
      </Link>
    </PostPreviewRoot>
  )
}
