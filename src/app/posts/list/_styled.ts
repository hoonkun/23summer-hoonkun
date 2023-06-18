'use client'

import styled, { css } from "styled-components"

import { Select } from "@/lib/styled/media-queries"
import { PostExpand } from "@/lib/23summer/post"

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
  
  ${Select(0, 500)} {
    height: 235px;
    font-size: 33px;
    padding: 10px 25px 10px 0;
  }
  
  ${Select(900)} {
    font-size: 50px;
  }
  ${Select(1150)} {
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
  
  ${Select(0, 500)} {
    font-size: 12px;
  }

  ${Select(900)} {
    font-size: 16px;
  }
  ${Select(1150)} {
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

    ${Select(0, 500)} {
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
  ${Select(0, 500)} {
    padding: 20px 15px;
  }

  ${Select(750)} {
    grid-template-rows: unset;
    grid-auto-rows: 250px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  
  ${Select(900)} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${Select(750, 900)} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${Select(0, 750)} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${Select(750, 1400)} {
    grid-auto-rows: 200px;
  }
`

export const PostItemRootBase = styled.div`
  align-self: center;
  justify-self: stretch;

  width: 100%;
  height: 100%;

  position: relative;
  
  transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1);
  
  ${Select(750)} {
    &:hover {
      transform: scale(1.05);
      z-index: 100;
    }
  }
`

export const PostRelatedRoot = styled(PostItemRootBase)`
  margin: 15px 0;
  
  ${Select(0, 500)} {
    height: 150px;
  }
  ${Select(500)} {
    height: 200px;
  }
`

export const PostPreviewRoot = styled(PostItemRootBase)<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${Select(500, 750)} {
    height: 300px;
  }
  ${Select(0, 500)} {
    height: 175px;
  }
  ${Select(900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by3.columns};grid-row: span ${expand.by3.rows};` : ""}
  }
  ${Select(750, 900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by2.columns};grid-row: span ${expand.by2.rows};` : ""}
  }
`

export const PostItemLinkChild = styled.div`
  width: 100%;
  height: 100%;
`

export const PostPreviewImageContainer = styled.div`
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  
  overflow: hidden;
`

export const PostPreviewContent = styled.div`
  position: relative;
  width: 100%; height: 100%;
  z-index: 1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PostItemTitleBase = styled.div`
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
`

export const PostPreviewTitle = styled(PostItemTitleBase)<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${Select(1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 18}px;
    margin: 0 25px;
  }
  ${Select(900, 1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 14}px;
    margin: 0 15px;
  }
  ${Select(825, 900)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 18}px;
  }
  ${Select(750, 825)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 14}px;
  }
  ${Select(500, 750)} {
    font-size: 20px;
  }
  ${Select(0, 500)} {
    font-size: 16px;
  }
  ${Select(750, 900)} {
    margin: 0 25px;
  }
  ${Select(0, 750)} {
    margin: 0 30px;
  }
`

export const PostRelatedTitle = styled(PostItemTitleBase)`
  ${Select(0, 500)} {
    font-size: 16px;
    margin: 0 30px;
  }
  ${Select(500)} {
    font-size: 20px;
    margin: 0 20px;
  }
`

export const PostItemExcerptBase = styled.div`
  opacity: 0.75;
  text-align: center;
  word-break: keep-all;
`

export const PostRelatedExcerpt = styled(PostItemExcerptBase)`
  ${Select(0, 500)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${Select(500)} {
    font-size: 16px;
    margin: 15px 25px 0 25px;
  }
`

export const PostPreviewExcerpt = styled(PostItemExcerptBase)`
  ${Select(1400)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${Select(1000, 1400)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
  ${Select(750, 1000)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${Select(500, 750)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${Select(0, 500)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
`

export const VerticalDivider = styled.div`
  width: 0;
  height: 15px;
  margin: 0 10px;
  border-right: 1px solid #ffffff50;
`
