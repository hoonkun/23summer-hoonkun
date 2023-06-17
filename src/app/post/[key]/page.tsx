import React, { createElement, Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { Post, Posts, PostWithContent } from "@/lib/23summer/post"
import {
  InlineCode,
  MainImageContainer,
  PostContent,
  PostMetadata,
  PostRoot, PostTag, PostTags,
  PostTitleArea
} from "@/app/post/[key]/_styled"
import { Highlighter } from "@/app/post/[key]/Highlighter"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import stringWidth from "string-width"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import rehypeReact from "rehype-react"

import "@/lib/katex/styles.css"
import { Background } from "@/components/Background"
import { Categories } from "@/lib/23summer/category"

export type PostParams = { key: string }

export default async function Page({ params }: { params: PostParams }) {
  const post = Posts.retrieve<PostWithContent>(params.key, true)

  if (!post) notFound()

  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm, { stringLength: stringWidth })
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { strict: false, displayMode: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .use(rehypeReact, { createElement, Fragment, components: {
        img: (props: any) => <ContentImage src={props.src} alt={props.alt} postId={params.key}/>,
        code: (props: any) => props.className ?
          <Highlighter className={props.className}>{props.children}</Highlighter> :
          <InlineCode {...props}/>,
        a: (props: any) => props.href.startsWith("/") ?
          <Link href={props.href} scroll={false}>{props.children}</Link> :
          <a {...props}>{props.children}</a>
      } }
    )
    .process(post.content)

  const mainImage = await import(`$/__posts__/${post.key}/main.png`)

  return (
    <PostRoot>
      <Background/>
      <PostTitleArea>
        <PostTags>{ post.data.categories.map(it => Categories.retrieve(it)).filter(it => !!it).map(it => <PostTag key={it!.name} color={it!.color.bright}>{ it!.display }</PostTag>) }</PostTags>
        {post.data.title}
        <PostMetadata>{ post.data.date } | { post.data.author.replace("GoHoon", "HoonKun") }</PostMetadata>
      </PostTitleArea>
      <PostContent>
        <MainImageContainer style={{ width: "min(700px, 100%)", aspectRatio: `${mainImage.default.width / mainImage.default.height}` }}>
          <Image src={mainImage.default} alt={`${post.data.title}`} fill sizes={"(min-width: 850px) 800px, 100vw"} style={{ objectFit: "cover" }}/>
        </MainImageContainer>
        {content.result}
      </PostContent>
    </PostRoot>
  )
}

export async function generateMetadata({ params }: { params: PostParams }): Promise<Metadata> {
  const post = Posts.retrieve<Post>(params.key, false)

  if (!post) return { };

  const title = `${post.data.title} | 키위새의 아무말 저장소`

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      site: "arctic_apteryx"
    }
  }
}

export async function generateStaticParams(): Promise<PostParams[]> {
  return Posts.list().map(it => ({ key: it.key }))
}

const ContentImage: React.FC<{ alt: string, postId: string, src: string }> = async (props) => {
  const image = await import(`$/__posts__/${props.postId}${props.src.replace("...image_base...", "")}`)

  return (
    <Image src={image.default}
           alt={props.alt}
           style={{ width: "100%", height: "auto", marginTop: 15 }}
    />
  )
}