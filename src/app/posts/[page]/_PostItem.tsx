import React from "react"
import { Post } from "@/lib/23summer/post"
import Image from "next/image"
import {
  PostItemLinkChild,
  PostPreviewRoot,
  PostPreviewContent, PostPreviewExcerpt,
  PostPreviewImageContainer,
  PostPreviewTitle, PostRelatedExcerpt, PostRelatedTitle, PostRelatedRoot
} from "@/app/_styled"
import Link from "next/link"

export const PostItem: React.FC<{ post: Post, priority: boolean }> = async ({ post, priority }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostPreviewRoot expand={post.expand}>
      <Link href={`/post/${post.key}`}>
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

export const RelatedPostItem: React.FC<{ post: Post }> = async ({ post }) => {
  const preview = await import(`$/__posts__/${post.key}/preview.png`)

  return (
    <PostRelatedRoot>
      <Link href={`/post/${post.key}`}>
        <PostItemLinkChild>
          <PostPreviewImageContainer>
            <Image
              src={preview.default}
              alt={`preview image of ${post.key}`}
              sizes={"(max-width: 900px) 66vw, 100vw"}
              style={{ objectFit: "cover", filter: "brightness(0.5) blur(5px)", scale: "1.2" }}
              fill
            />
          </PostPreviewImageContainer>
          <PostPreviewContent>
            <PostRelatedTitle>{post.data.title}</PostRelatedTitle>
            <PostRelatedExcerpt>{ post.excerpt }</PostRelatedExcerpt>
          </PostPreviewContent>
        </PostItemLinkChild>
      </Link>
    </PostRelatedRoot>
  )
}
