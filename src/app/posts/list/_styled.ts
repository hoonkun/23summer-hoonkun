'use client'

import Image from "next/image"
import styled, { css, keyframes } from "styled-components"

import { WhenWidthIn, WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import { PostExpand } from "@/lib/23summer/post"

import {
  BlogFooterAreaBase,
  BlogFooterDescriptionBase,
  PostItemExcerptBase,
  PostItemImageContainerBase,
  PostItemRootBase,
  PostItemTitleBase
} from "@/app/posts/_styled"
import Link from "next/link"
import { KiwicraftLogo } from "@/components/KiwicraftLogo"

export const PostsRoot = styled.div`
  position: relative;
  width: 100%;
  min-width: 350px;
  z-index: 0;
`

export const StickyArea = styled.div`
  position: sticky; left: 0; top: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: calc(45vw - 1%);
  height: 100svh;
  overflow: hidden;

  padding: 40px 60px 0 60px;

  ${WhenWidthMost(1210)} {
    width: 45vw;
  }

  ${WhenWidthMost(990)} {
    position: relative;
    min-width: 350px;
    width: 100vw;
  }

  ${WhenWidthMost(650)} {
    padding: 40px 25px 15px 25px;
  }
`

export const PostsTitle = styled.div`
  position: relative;
  z-index: 0;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  font-size: 40px;
  font-weight: bold;
  text-shadow: #ffffff60 0 0 10px;
  
  & > div {
    word-break: keep-all;
    line-height: 125%;
    margin-bottom: 8px;
  }
  
  ${WhenWidthMost(1210)} {
    padding: 10px 0;
  }
  
  ${WhenWidthMost(990)} {
    font-size: 33px;
    padding: 10px 25px 10px 0;
    margin-bottom: 40px;
    
    & > div {
      font-size: 60px;
    }
  }
  
  ${WhenWidthMost(650)} {
    margin-bottom: 16px;
    & > div {
      font-size: 40px;
    }
  }
  ${WhenWidthLeast(900)} {
    font-size: 50px;
  }
  ${WhenWidthLeast(1211)} {
    font-size: 60px;
  }
`

export const PostsCategories = styled.ul`
  list-style-type: none;
  font-weight: normal;
  opacity: 0.75;
  color: white;
  
  font-size: 14px;
  
  & > li {
    display: inline-block;
    padding-inline-start: 0;
    
    font-size: 14px;
    
    ${WhenWidthMost(990)} {
      font-size: 18px;
    }
    
    ${WhenWidthMost(650)} {
      font-size: 14px;
    }
    
    ${WhenWidthMost(450)} {
      font-size: 12px;
    }

    ${WhenWidthLeast(1211)} {
      font-size: 16px;
    }
  }
  & > li:nth-of-type(n+2):before {
    content: "|";
    margin: 0 16px;
    font-size: 85%;
    opacity: 0.4;

    ${WhenWidthMost(450)} {
      margin: 0 12px;
    }
  }
`

export const PostsGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  position: relative;
  z-index: 2;
  
  margin-top: -100vh;
  
  padding: 100px 60px 30px calc(45vw + 1%);
  
  ${WhenWidthMost(1210)} {
    padding: 100px 6% 30px 45vw;
  }
  ${WhenWidthMost(990)} {
    padding: 0 60px 15px 60px;
    margin-top: 0;
  }
  ${WhenWidthMost(650)} {
    padding: 20px 15px;
  }

  ${WhenWidthLeast(991)} {
    grid-template-rows: unset;
    grid-auto-rows: 200px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  
  ${WhenWidthIn(991, 1210)} {
    grid-column-gap: 0;
    grid-template-columns: repeat(1, 1fr);
  }
  
  ${WhenWidthMost(650)} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const PostItemRoot = styled(PostItemRootBase)<{ $expand?: { by2: PostExpand, by3: PostExpand }, $priority?: "true" | "false" }>`
  ${WhenWidthLeast(1211)} {
    ${({ $priority }) => $priority === "true" ? css`
      height: 400px;
    ` : ""}
  }
  ${WhenWidthIn(450, 990)} {
    min-height: 300px;
  }
  ${WhenWidthMost(450)} {
    min-height: 175px;
  }
  ${WhenWidthLeast(1211)} {
    ${({ $expand }) => $expand ? css`grid-column: span ${$expand.by2.columns};grid-row: span ${$expand.by2.rows};` : ""}
  }
  ${WhenWidthIn(651, 990)} {
  ${WhenWidthIn(651, 990)} {
    ${({ $expand }) => $expand ? css`grid-column: span ${$expand.by2.columns};grid-row: span ${$expand.by2.rows};` : ""}
  }
`

export const PostItemImageContainer = styled(PostItemImageContainerBase)``

export const PostItemTitle = styled(PostItemTitleBase)<{ $expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${WhenWidthLeast(1210)} {
    font-size: ${({ $expand }) => ($expand?.by3?.columns ?? 1) >= 2 ? 30 : 18}px;
    margin: 0 25px;
  }
  ${WhenWidthIn(900, 1210)} {
    font-size: 18px;
    margin: 0 15px;
  }
  ${WhenWidthIn(825, 900)} {
    font-size: 18px;
  }
  ${WhenWidthIn(450, 825)} {
    font-size: 14px;
  }
  ${WhenWidthMost(450)} {
    font-size: 16px;
  }
  ${WhenWidthIn(650, 900)} {
    margin: 0 25px;
  }
  ${WhenWidthMost(650)} {
    margin: 0 30px;
  }
`

export const PriorityPostItemTitle = styled(PostItemTitle)`
  ${WhenWidthMost(830)} {
    text-align: left;
    margin: 0 12px;
    font-size: 16px !important;
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const PostItemExcerpt = styled(PostItemExcerptBase)`
  ${WhenWidthLeast(1400)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${WhenWidthIn(450, 1400)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${WhenWidthMost(450)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
`

export const PriorityPostItemExcerpt = styled(PostItemExcerpt)`
  ${WhenWidthMost(830)} {
    text-align: left;
    margin: 0 12px;
    font-size: 12px !important;
  }
`

export const BlogFooterArea = styled(BlogFooterAreaBase)`
  position: relative;
  flex-shrink: 0;
  min-width: 0;

  ${WhenWidthMost(500)} {
    height: 70px;
  }
`

export const BlogFooterDescription = styled(BlogFooterDescriptionBase)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;

  ${WhenWidthMost(1210)} {
    font-size: 14px;
  }

  ${WhenWidthMost(650)} {
    font-size: 11px;
  }
`

export const VerticalDivider = styled.div`
  width: 0;
  height: 15px;
  margin: 0 10px;
  border-right: 1px solid #ffffff50;
`

export const PriorityPostItemRow = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(1, 1fr);
  
  ${WhenWidthIn(831, 990)} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const PriorityPostItemRoot = styled(Link)<{ $hideWhenWide?: boolean }>`
  position: relative;
  overflow: hidden;

  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: scale 0.25s cubic-bezier(0.33, 1, 0.68, 1);

  ${({ $hideWhenWide }) => $hideWhenWide ? css`
    ${WhenWidthLeast(991)} {
      display: none;
    }
  ` : ""}
  ${PostItemTitle} {
    font-size: 30px;

    ${WhenWidthMost(650)} {
      font-size: 24px;
    }
  }

  ${WhenWidthLeast(750)} {
    &:hover {
      scale: 1.05;
      z-index: 100;
    }
  }

  ${WhenWidthMost(1210)} {
    height: 275px;
  }

  ${WhenWidthMost(830)} {
    height: 100px;
    margin-bottom: 8px;
  }
`

export const PriorityPostItemPreview = styled(Image)`
  position: absolute; top: 0; left: 0;
  z-index: 0;
  
  width: 100%;
  height: 100%;
`

export const PriorityPostDescription = styled.p`
  position: absolute; top: 0; left: 0;
  
  margin: 10px;
  color: white;
  font-size: 13px;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  
  opacity: 0.5;
  
  ${WhenWidthMost(650)} {
    font-size: 11px;
  }
  
  ${WhenWidthMost(830)} {
    position: relative;
    margin: 0 10px;
  }
`

export const PinIcon = styled(Image)`
  width: 16px; height: 16px;
  
  margin-right: 4px;
  
  ${WhenWidthMost(830)} {
    width: 12px; height: 12px;
  }
`

export const StickyDescription = styled.div`
  color: white;
  margin: 8px 0 32px 0;
  line-height: 200%;
  font-size: 16px;
  
  & > div {
    opacity: 0.65;
  }
  
  ${WhenWidthMost(1210)} {
    font-size: 13px;
  }
  
  ${WhenWidthMost(990)} {
    font-size: 18px;
  }
  
  ${WhenWidthMost(650)} {
    font-size: 14px;
  }
  
  ${WhenWidthMost(830)} {
    margin: 8px 0 16px 0;
  }
`

export const Description = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  
  ${WhenWidthMost(650)} {
    font-size: 12px;
  }
`

export const SlashKey = styled.div`
  border: 1px solid #dedede;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-family: "JetBrains Mono", sans-serif;
  margin-left: 8px;
  margin-right: 2px;
  background-color: #ffffff25;
`
SlashKey.defaultProps = {
  children: "/"
}

export const StickyContentPositioner = styled.div<{ $ratio: number }>`
  flex-grow: ${({ $ratio }) => $ratio};
`

const ScrollDownTween = keyframes`
  0% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(3px);
  }
`

export const ScrollDown = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 12px;
  display: block;
  opacity: 0.25;
  margin: 0 0 0 16px;
  
  flex-grow: 1;
  flex-shrink: 0;
  text-align: right;
  
  ${WhenWidthLeast(991)} {
    display: none;
  }
  
  /*animation: ${ScrollDownTween} 2s cubic-bezier(0.83, 0, 0.17, 1) infinite;*/
`

export const DesktopOnlyKiwicraftLogo = styled(KiwicraftLogo)`
  ${WhenWidthMost(650)} {
    display: none;
  }
`

export const PostsTopDivider = styled.div`
  height: 0;
  width: 40px;
  border-bottom: 1px solid #ffffff30;
  margin: 4px auto 16px auto;
  
  ${WhenWidthLeast(651)} {
    display: none;
  }
`
