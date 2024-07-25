import { Processor, unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import stringWidth from "string-width"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import { CodeHighlighter } from "@/components/CodeHighlighter"
import { InlineCode } from "@/app/posts/retrieve/_styled"
import Link from "next/link"

import * as ProductionReact from "react/jsx-runtime"

// @ts-expect-error: the React types are missing.
const { jsx, jsxs, Fragment } = ProductionReact

export const BaseProcessor: () => Processor<any, any, any, any, string> = () => unified()
  .use(remarkParse)
  .use(remarkGfm, { stringLength: stringWidth })
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeKatex, { strict: false })
  .use(rehypeRaw)
  .use(rehypeStringify)

const NodeTextRetriever = (node: any): string => {
  if (['string', 'number'].includes(typeof node)) return node
  if (node instanceof Array) return node.map(NodeTextRetriever).join('')
  if (typeof node === 'object' && node) return NodeTextRetriever(node.props.children)

  return ""
}

const SpaceReplacer = (input: string): string => input.replaceAll(" ", "_")

export const GlobalMarkdownComponents = {
  code: (props: any) => props.className ?
    <CodeHighlighter className={props.className}>{props.children}</CodeHighlighter> :
    <InlineCode {...props}/>,
  a: (props: any) => props.href.startsWith("/") ?
    <Link href={props.href}>{props.children}</Link> :
    <a {...props}>{props.children}</a>,
  h1: (props: any) => <h1 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h1>,
  h2: (props: any) => <h2 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h2>,
  h3: (props: any) => <h3 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h3>,
  h4: (props: any) => <h4 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h4>,
  h5: (props: any) => <h5 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h5>,
  h6: (props: any) => <h6 id={SpaceReplacer(NodeTextRetriever(props.children))}>{props.children}</h6>
}

export const GlobalRehypeReactOptions = { jsx, jsxs, Fragment }

