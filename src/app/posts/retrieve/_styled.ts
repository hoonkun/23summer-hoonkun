'use client'

import styled, { css } from "styled-components"

import { WhenWidthIn, WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"

import {
  BlogFooterAreaBase,
  PostItemExcerptBase,
  PostItemImageContainerBase,
  PostItemRootBase,
  PostItemTitleBase
} from "@/app/posts/_styled"
import { CodeStyle } from "@/components/CodeHighlighter"

const WideCriteria = 1400
const ExtraWideCriteria = 1500

const NormalMaxWidth = 700
const WideMaxWidth = 850
const ExtraWideMaxWidth = 925

const ContentPadding = css`
  padding: 0 max((100% - ${NormalMaxWidth}px) / 2, 15px);
  
  ${WhenWidthLeast(WideCriteria)} {
    padding: 0 max((100% - ${WideMaxWidth}px) / 2, 15px);
  }
  
  ${WhenWidthLeast(ExtraWideCriteria)} {
    padding: 0 max((100% - ${ExtraWideMaxWidth}px) / 2, 15px);
  }
`

export const SummaryTranslation = css`
  transform: translateX(calc(${(NormalMaxWidth + 50) / 2}px + 100%));
  
  ${WhenWidthLeast(WideCriteria)} {
    transform: translateX(calc(${(WideMaxWidth + 50) / 2}px + 100%));
  }
  
  ${WhenWidthLeast(ExtraWideCriteria)} {
    transform: translateX(calc(${(ExtraWideMaxWidth + 50) / 2}px + 100%));
  }
`

export const PostRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: relative;
`

export const PostTitleArea = styled.div`
  position: sticky; top: 0;
  height: 325px; width: calc(100%); max-width: ${NormalMaxWidth}px;
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

  ${WhenWidthMost(500)} {
    height: 300px;
    font-size: 25px;
    padding: 0 25px;
  }

  ${WhenWidthIn(900, 1150)} {
    font-size: 35px;
  }
  ${WhenWidthLeast(1150)} {
    font-size: 40px;
    height: 350px;
  }
  
  ${WhenWidthLeast(WideCriteria)} {
    max-width: ${WideMaxWidth}px;
  }
  ${WhenWidthLeast(ExtraWideCriteria)} {
    max-width: ${ExtraWideMaxWidth}px;
  }
`

export const PostTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;

  ${WhenWidthMost(500)} {
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
  
  ${WhenWidthMost(500)} {
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
  
  ${WhenWidthMost(500)} {
    font-size: 12px;
    margin-top: 4px;
  }
  ${WhenWidthIn(500, 900)} {
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

export const MarkdownContent = styled.div`
  line-height: 185%;
  
  ${ContentPadding};
  
  color: #ffffffe0;
  
  position: relative;
  width: 100%;
  margin-top: -150px;
  
  font-size: 16px;
  
  overflow-wrap: break-word;
  
  hr {
    border-color: white;
    border-width: 1px;
    border-top: none;
    border-right: none;
    border-left: none;
    opacity: 0.25;
    margin: 32px;
  }

  p {
    margin: 20px 0;
  }

  table {
    width: 100%;
    border: 1px solid #FFFFFFBB;
    border-collapse: collapse;
    margin: 5px 0;
    table-layout: fixed;
  }

  table td, th {
    border: 1px solid #FFFFFFBB;
    text-align: center;
  }

  del {
    opacity: 0.55;
  }

  ul, ol {
    padding-inline-start: 24px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #FFFFFF;
    margin: 0 0 10px 0;
    padding-top: 40px;
  }

  h3 {
    margin: 0 0 8px 0;
    padding-top: 25px;
  }

  h4, h5, h6 {
    margin: 0 0 5px 0;
    padding-top: 12.5px;
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
    margin-bottom: -14px;
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
  
  pre:not(:has(> div, > pre)) {
    border-radius: 5px;
    overflow-x: auto;
    padding: 2px 15px 3px 15px;
  }
  
  ${CodeStyle} {
    pre {
      margin: 0 !important;
      border-radius: 5px;
      padding: 7px 15px;
      overflow-x: visible !important;
      width: auto !important;
    }
    pre > code {
      width: auto !important;
    }
  }
  
  pre:not(:has(+ blockquote)) {
    margin: 15px 0;
  }
  
  pre:has(+ blockquote) > ${CodeStyle} > pre {
    border-radius: 5px 5px 0 0;
  }
  
  pre:has(> ${CodeStyle}) + blockquote {
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
    padding: 10px 15px;
    border-left: 5px solid #56A8F5;
    line-height: 175%;
  }
  
  .katex-html {
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 4px;
  }
`

export const InlineCode = styled.code`
  padding: 2px 5px;
  background-color: rgb(39,40,44);
  border-radius: 4px;
`

export const PostBelowArea = styled.div`
  font-size: 20px;
  
  ${ContentPadding};
`

const PostBelowGrid = css`
  ${WhenWidthLeast(750)} {
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
  ${WhenWidthLeast(500)} {
    margin: 75px 0;
  }
`

export const PostItemRoot = styled(PostItemRootBase)`
  margin: 15px 0;
  
  ${WhenWidthMost(500)} {
    height: 150px;
  }
  ${WhenWidthLeast(500)} {
    height: 200px;
  }
`

export const PostItemImageContainer = styled(PostItemImageContainerBase)``

export const PostItemExcerpt = styled(PostItemExcerptBase)`
  ${WhenWidthMost(500)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${WhenWidthLeast(500)} {
    font-size: 16px;
    margin: 15px 25px 0 25px;
  }
`

export const BlogFooterArea = styled(BlogFooterAreaBase)`
  ${ContentPadding};
`

export const PostItemTitle = styled(PostItemTitleBase)`
  ${WhenWidthMost(500)} {
    font-size: 16px;
    margin: 0 30px;
  }
  ${WhenWidthLeast(500)} {
    font-size: 20px;
    margin: 0 20px;
  }
`

export const DiscussionContainer = styled.div`
  ${ContentPadding};
  margin-top: 40px;
`