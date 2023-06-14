import React from "react"
import { dateBasedRandom, dice } from "@/lib/23summer/dice"
import { HomeClient } from "@/app/_client"
import { Post, Posts } from "@/lib/23summer/post"
import {
  PostItemViewRoot,
  PostPreviewContent, PostPreviewExcerpt, PostPreviewImage,
  PostPreviewImageContainer,
  PostPreviewTitle,
  PostsGrid
} from "@/app/_styled"

export default function Home() {
  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  const posts = Posts.list(1, true)

  return (
    <HomeClient die={die} rotation={rotation}>
      <PostsGrid>
        {posts.map(it => <PostItem key={it.key} post={it}/>)}
      </PostsGrid>
    </HomeClient>
  )
}

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <PostItemViewRoot expand={post.expand}>
      <PostPreviewImageContainer>
        <PostPreviewImage
          src={require(`./../../__posts__/${post.key}/preview.png`).default.src}
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
