import React, { createElement, Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { Post, Posts, PostWithContent } from "@/lib/23summer/post"
import {
  BackgroundOverlay,
  InlineCode,
  MainImageContainer, PostBelowArea, PostContainer,
  PostContent, PostContentDivider, PostFooterArea, PostFooterDescription, PostFooterLeft,
  PostMetadata, PostRelated,
  PostRoot, PostSurroundings, PostTag, PostTags,
  PostTitleArea
} from "@/app/post/[key]/_styled"
import { Highlighter } from "@/app/post/[key]/_Highlighter"

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
import { Categories, Category } from "@/lib/23summer/category"
import { PostSummary } from "@/components/PostSummary"
import { RelatedPostItem } from "@/app/posts/[page]/_PostItem"
import { Logo } from "@/app/post/[key]/_logo"

export type PostParams = { key: string }

const BaseProcessor = () => unified()
  .use(remarkParse)
  .use(remarkGfm, { stringLength: stringWidth })
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeKatex, { strict: false, displayMode: true })
  .use(rehypeRaw)
  .use(rehypeStringify)

const NodeTextRetriever = (node: any): string => {
  if (['string', 'number'].includes(typeof node)) return node
  if (node instanceof Array) return node.map(NodeTextRetriever).join('')
  if (typeof node === 'object' && node) return NodeTextRetriever(node.props.children)

  return ""
}

const SpaceReplacer = (input: string): string => input.replaceAll(" ", "_")

export default async function Page({ params }: { params: PostParams }) {
  const post = Posts.retrieve<PostWithContent>(params.key, true)

  if (!post) notFound()

  const html = await BaseProcessor()
    .process(post.content)

  const content = await BaseProcessor()
    .use(rehypeReact, { createElement, Fragment, components: {
        img: (props: any) => <ContentImage src={props.src} alt={props.alt} postId={params.key}/>,
        code: (props: any) => props.className ?
          <Highlighter className={props.className}>{props.children}</Highlighter> :
          <InlineCode {...props}/>,
        a: (props: any) => props.href.startsWith("/") ?
          <Link href={props.href} scroll={false}>{props.children}</Link> :
          <a {...props}>{props.children}</a>,
        h1: (props: any) => <h1 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h1>,
        h2: (props: any) => <h2 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h2>,
        h3: (props: any) => <h3 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h3>,
        h4: (props: any) => <h4 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h4>,
        h5: (props: any) => <h5 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h5>,
        h6: (props: any) => <h6 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h6>
      } }
    )
    .process(post.content)

  const summary = Array.from(html.value.toString().matchAll(/<(?<opening>h1|h2|h3|h4|h5|h6)>(?<text>.+?)<\/(?<closing>h1|h2|h3|h4|h5|h6)>/gi))
    .map(it => ({ type: it.groups?.["opening"] ?? "h6", text: it.groups?.["text"] ?? "" }))

  const categories = post.data.categories.map(it => Categories.retrieve(it)).filter(it => !!it) as Category[]

  const surroundings = [Posts.previous(post.key), Posts.next(post.key)]
  const related = Posts.related(post.key, post.data.categories[0], surroundings)

  const mainImage = await import(`$/__posts__/${post.key}/main.png`)

  return (
    <PostRoot>
      <Background>
        <BackgroundOverlay/>
      </Background>
      <PostTitleArea>
        <PostTags>{ categories.map(it => <PostTag key={it.name} color={it.color.bright}>{ it.display }</PostTag>) }</PostTags>
        {post.data.title}
        <PostMetadata>{ post.data.date } | { post.data.author.replace("GoHoon", "HoonKun") }</PostMetadata>
      </PostTitleArea>
      <PostContainer>
        <PostContent>
          <PostSummary summary={summary as PostSummary[]}/>
          <MainImageContainer style={{ width: "min(700px, 100%)", aspectRatio: `${mainImage.default.width / mainImage.default.height}` }}>
            <Image src={mainImage.default} alt={`${post.data.title}`} priority fill sizes={"(min-width: 850px) 800px, 100vw"} style={{ objectFit: "cover" }}/>
          </MainImageContainer>
          {content.result}
        </PostContent>
        <PostContentDivider/>
        <PostBelowArea>
          { categories[0].display } 카테고리의 다른 글
          <PostRelated>
            { related.map(it => <RelatedPostItem key={it.key} post={it}/>) }
          </PostRelated>

          {[surroundings[0] === null ? null : "이전 글", surroundings[1] === null ? null : "다음 글"].filter(it => !!it).join("과 ")}
          <PostSurroundings>
            { surroundings.filter(it => !!it).map(it => <RelatedPostItem key={it!.key} post={it!}/>) }
          </PostSurroundings>
        </PostBelowArea>
      </PostContainer>
      <PostFooterArea>
        <PostFooterLeft>
          <Link href={"/posts/1"}>키위새의 아무말 저장소</Link>
          <PostFooterDescription>
            <li>개발</li>
            <li>마인크래프트</li>
            <li>생명과학II</li>
            <li>아무말</li>
          </PostFooterDescription>
        </PostFooterLeft>
        <Logo src={await import("@/resources/logo.png")}/>
      </PostFooterArea>
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