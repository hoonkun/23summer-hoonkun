'use client'


import Link from "next/link"
import styled from "styled-components"

import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"

export const BlogFooterAreaBase = styled.div`
  position: sticky; bottom: 0;
  z-index: 0;
  
  width: 100%;
  height: 150px;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  ${WhenWidthMost(500)} {
    height: 100px;
  }
`

export const BlogFooterAreaLeft = styled.div`
  > a {
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 0 5px #ffffff80;
    
    display: flex;
    align-items: center;
    
    ${WhenWidthLeast(500)} {
      font-size: 26px;
    }
  }
`

export const BlogFooterDescription = styled.ul`
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

  & > li {
    display: inline-block;
    padding-inline-start: 0;
  }
  & > li:nth-of-type(n+2):before {
    content: "|";
    margin: 0 12px;
    font-size: 85%;
    opacity: 0.4;

    ${WhenWidthMost(500)} {
      margin: 0 8px;
    }
  }
`

export const PostItemRootBase = styled(Link)`
  align-self: center;
  justify-self: stretch;

  width: 100%;
  height: 100%;

  position: relative;
  
  transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1);
  
  ${WhenWidthLeast(750)} {
    &:hover {
      transform: scale(1.05);
      z-index: 100;
    }
  }
`

export const PostItemImageContainerBase = styled.div`
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  
  overflow: hidden;
`

export const PostItemContentBase = styled.div`
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

export const PostItemExcerptBase = styled.div`
  opacity: 0.75;
  text-align: center;
  word-break: keep-all;
`
