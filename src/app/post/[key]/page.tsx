import React, { createElement, Fragment } from "react"
import { Posts, PostWithContent } from "@/lib/23summer/post"
import Image from "next/image"
import Link from "next/link"

import { InlineCode, PostContent, PostRoot } from "@/app/post/[key]/_styled"
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
import { Metadata } from "next"

import "@/lib/katex/styles.css"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { key: string } }) {
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

  return (
    <PostRoot>
      <PostContent>
        {content.result}
      </PostContent>
    </PostRoot>
  )
}

export const metadata: Metadata = {

}

export async function generateStaticParams() {
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