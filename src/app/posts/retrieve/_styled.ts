'use client'

import styled, { css } from "styled-components"

import { Select } from "@/lib/styled/media-queries"

import {
  BlogFooterAreaBase, PostItemContentBase,
  PostItemExcerptBase, PostItemImageContainerBase,
  PostItemRootBase, PostItemTitleBase
} from "@/app/posts/_styled"

const ContentPadding = css`padding: 0 max((100% - 700px) / 2, 15px);`

export const PostRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  font-family: "IBM Plex Sans KR", sans-serif;
  
  position: relative;
`

export const PostTitleArea = styled.div`
  position: sticky; top: 0;
  height: 325px; width: calc(100%); max-width: 700px;
  z-index: 0;

  text-align: right;
  word-break: keep-all;
  padding: 0 25px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  
  font-size: 30px;
  font-weight: bold;
  
  line-height: 120%;

  transform: translateY(calc(-150px / 2));

  ${Select(0, 500)} {
    height: 300px;
    font-size: 25px;
    padding: 0 25px;
  }

  ${Select(900, 1150)} {
    font-size: 35px;
  }
  ${Select(1150)} {
    font-size: 40px;
    height: 350px;
  }
`

export const PostTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;

  ${Select(0, 500)} {
    margin-bottom: 4px;
  }
`

export const PostTag = styled.div<{ color: string }>`
  background-color: ${({ color }) => color}40;
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 4px;
  
  font-size: 12px;
  line-height: 100%;
  color: white;
  text-shadow: none;
  
  ${Select(0, 500)} {
    font-size: 10px;
  }
`

export const PostMetadata = styled.div`
  font-size: 20px;
  font-weight: normal;
  color: #ffffff80;
  text-shadow: none;
  margin-top: 12px;
  line-height: 100%;
  
  ${Select(0, 500)} {
    font-size: 12px;
    margin-top: 4px;
  }
  ${Select(500, 900)} {
    font-size: 16px;
  }
`

export const MainImageContainer = styled.div`
  position: relative;
  margin-bottom: 25px;
`

export const PostContainer = styled.div`
  width: 100%;
  
  position: relative;
  z-index: 2;

  background-color: #181c22;
  
  display: flex;
  flex-direction: column;
`

export const PostContent = styled.div`
  line-height: 225%;
  
  ${ContentPadding};
  
  position: relative;
  width: 100%;
  margin-top: -150px;
  
  font-size: 16px;
  
  overflow-wrap: break-word;

  p {
    margin: 20px 0;
  }

  table {
    border-color: #FFFFFFBB;
    table-layout: fixed;
  }

  table td, th {
    border-color: #FFFFFFBB;
  }

  del {
    opacity: 0.55;
  }

  ul, ol {
    padding-inline-start: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #FFFFFF;
    margin: 0 0 10px 0;
    padding-top: 40px;
  }

  .math-inline {
    max-width: 100%;
    margin-bottom: -12px;
    display: inline-block;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    color: #FFFFFF;
    padding-right: 3px;
  }

  table .math-inline {
    margin-bottom: -5px;
  }

  p:has(> img) + blockquote {
    text-align: center;
    color: #FFFFFF90;
    font-size: 14px;
    margin-top: -20px;
    background-color: transparent;
    border-left: none;
    line-height: 100%;
    word-break: keep-all;
    padding: 0;
  }

  code {
    font-family: "JetBrains Mono", sans-serif !important;
    font-size: 13px;
    line-height: 150%;
  }

  pre:has(+ blockquote) > pre {
    margin: 0 !important;
    border-radius: 5px 5px 0 0;
    overflow-x: auto;
    font-family: "JetBrains Mono", sans-serif;
    background-color: rgb(43, 43, 43);
  }

  pre:has( > pre) {
    margin: 20px 0 0 0;
  }

  pre:has(> pre):not(:has(+ blockquote)) > pre {
    margin: 0 !important;
    border-radius: 5px;
    padding: 7px 15px;
    font-size: 16px;
    font-family: "JetBrains Mono", sans-serif;
    background-color: rgb(43, 43, 43);
  }

  pre + blockquote {
    margin: 0 0 0 0;
    font-size: 13px;
    background-color: #00000040;
    padding: 8px 15px;
    font-family: "JetBrains Mono", sans-serif;
    border-radius: 0 0 5px 5px;
    border-left: none;
    line-height: 150%;
  }

  a {
    color: #639aff;
    text-decoration: underline;
  }

  blockquote {
    p {
      margin: 0;
    }
    margin: 0;
    background-color: #FFFFFF10;
    padding: 15px 25px;
    border-left: 5px solid #78a718;
    border-radius: 5px;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
    background: #00000020;
  }

  .hljs {
    color: #bababa;
  }

  .hljs-strong, .hljs-emphasis {
    color: #a8a8a2;
  }

  .hljs-bullet, .hljs-quote, .hljs-link, .hljs-number, .hljs-regexp, .hljs-literal {
    color: #6896ba;
  }

  .hljs-code, .hljs-selector-class {
    color: #a6e22e;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-keyword, .hljs-selector-tag, .hljs-section, .hljs-attribute, .hljs-name, .hljs-variable {
    color: #cb7832;
  }

  .hljs-params {
    color: #b9b9b9;
  }

  .hljs-string {
    color: #6a8759;
  }

  .hljs-subst, .hljs-type, .hljs-built_in, .hljs-builtin-name, .hljs-symbol, .hljs-selector-id, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-template-tag, .hljs-template-variable, .hljs-addition {
    color: #e0c46c;
  }

  .hljs-comment, .hljs-deletion, .hljs-meta {
    color: #7f7f7f;
  }
`

export const InlineCode = styled.code`
  padding: 2px 5px;
  background-color: #00000040;
  border-radius: 4px;
`

export const PostBelowArea = styled.div`
  font-size: 20px;
  
  ${ContentPadding};
`

const PostBelowGrid = css`
  ${Select(750)} {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-column-gap: 15px;
  }
`

export const PostRelated = styled.div`
  margin-bottom: 20px;
  
  ${PostBelowGrid};
`

export const PostSurroundings = styled.div`
  margin-bottom: 40px;
  
  ${PostBelowGrid};
`

export const PostContentDivider = styled.div`
  width: 60%;
  max-width: 400px;
  align-self: center;
  height: 0;
  border-bottom: 1px solid #ffffff40;
  margin: 50px 0;
  ${Select(500)} {
    margin: 75px 0;
  }
`

export const PostItemRoot = styled(PostItemRootBase)`
  margin: 15px 0;
  
  ${Select(0, 500)} {
    height: 150px;
  }
  ${Select(500)} {
    height: 200px;
  }
`

export const PostItemContent = styled(PostItemContentBase)``

export const PostItemImageContainer = styled(PostItemImageContainerBase)``

export const PostItemExcerpt = styled(PostItemExcerptBase)`
  ${Select(0, 500)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${Select(500)} {
    font-size: 16px;
    margin: 15px 25px 0 25px;
  }
`

export const BlogFooterArea = styled(BlogFooterAreaBase)`
  ${ContentPadding};
`

export const PostItemTitle = styled(PostItemTitleBase)`
  ${Select(0, 500)} {
    font-size: 16px;
    margin: 0 30px;
  }
  ${Select(500)} {
    font-size: 20px;
    margin: 0 20px;
  }
`
