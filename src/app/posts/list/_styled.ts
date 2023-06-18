'use client'

import styled, { css } from "styled-components"

import { WhenWidthIn, WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import { PostExpand } from "@/lib/23summer/post"

import {
  BlogFooterAreaBase, PostItemContentBase,
  PostItemExcerptBase, PostItemImageContainerBase,
  PostItemRootBase, PostItemTitleBase
} from "@/app/posts/_styled"

export const PostsRoot = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;
`

export const PostsTitle = styled.div`
  position: sticky; top: 0;
  height: 325px;
  z-index: 0;
  padding: 10px calc(10% + 15px) 10px 10%;
  /*background-color: #00000040;*/
  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  
  font-size: 40px;
  font-weight: bold;
  text-shadow: #ffffff60 0 0 10px;
  
  ${WhenWidthMost(500)} {
    height: 235px;
    font-size: 33px;
    padding: 10px 25px 10px 0;
  }
  
  ${WhenWidthLeast(900)} {
    font-size: 50px;
  }
  ${WhenWidthLeast(1150)} {
    font-size: 60px;
    height: 375px;
  }
`

export const PostsCategories = styled.ul`
  list-style-type: none;
  font-size: 14px;
  font-weight: normal;
  opacity: 0.75;
  color: white;
  
  ${WhenWidthMost(500)} {
    font-size: 12px;
  }

  ${WhenWidthLeast(900)} {
    font-size: 16px;
  }
  ${WhenWidthLeast(1150)} {
    font-size: 20px;
  }
  
  & > li {
    display: inline-block;
    padding-inline-start: 0;
  }
  & > li:nth-of-type(n+2):before {
    content: "|";
    margin: 0 16px;
    font-size: 85%;
    opacity: 0.4;

    ${WhenWidthMost(500)} {
      margin: 0 12px;
    }
  }
`

export const PostsGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  position: relative;
  z-index: 2;

  width: 100%;
  
  background-color: #0c0e11;
  
  padding: 30px 10%;
  ${WhenWidthMost(500)} {
    padding: 20px 15px;
  }

  ${WhenWidthLeast(750)} {
    grid-template-rows: unset;
    grid-auto-rows: 250px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  
  ${WhenWidthLeast(900)} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${WhenWidthIn(750, 900)} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${WhenWidthMost(750)} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${WhenWidthIn(750, 1400)} {
    grid-auto-rows: 200px;
  }
`

export const PostItemRoot = styled(PostItemRootBase)<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${WhenWidthIn(500, 750)} {
    height: 300px;
  }
  ${WhenWidthMost(500)} {
    height: 175px;
  }
  ${WhenWidthLeast(900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by3.columns};grid-row: span ${expand.by3.rows};` : ""}
  }
  ${WhenWidthIn(750, 900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by2.columns};grid-row: span ${expand.by2.rows};` : ""}
  }
`

export const PostItemContent = styled(PostItemContentBase)``

export const PostItemImageContainer = styled(PostItemImageContainerBase)``

export const PostItemTitle = styled(PostItemTitleBase)<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${WhenWidthLeast(1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 18}px;
    margin: 0 25px;
  }
  ${WhenWidthIn(900, 1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 14}px;
    margin: 0 15px;
  }
  ${WhenWidthIn(825, 900)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 18}px;
  }
  ${WhenWidthIn(750, 825)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 14}px;
  }
  ${WhenWidthIn(500, 750)} {
    font-size: 20px;
  }
  ${WhenWidthMost(500)} {
    font-size: 16px;
  }
  ${WhenWidthIn(750, 900)} {
    margin: 0 25px;
  }
  ${WhenWidthMost(750)} {
    margin: 0 30px;
  }
`

export const PostItemExcerpt = styled(PostItemExcerptBase)`
  ${WhenWidthLeast(1400)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${WhenWidthIn(1000, 1400)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
  ${WhenWidthIn(750, 1000)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${WhenWidthIn(500, 750)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${WhenWidthMost(500)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
`

export const BlogFooterArea = styled(BlogFooterAreaBase)`
  padding: 0 10%;
  
  ${WhenWidthMost(500)} {
    padding: 20px 15px;
  }
`

export const VerticalDivider = styled.div`
  width: 0;
  height: 15px;
  margin: 0 10px;
  border-right: 1px solid #ffffff50;
`
