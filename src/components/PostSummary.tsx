'use client'

import React, { useMemo } from "react"
import styled from "styled-components"
import { WhenWidthMost } from "@/lib/styled/media-queries"
import "@/lib/ktn"

export type PostSummary = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  text: string
}

type PostSummaryProps = {
  summary: PostSummary[]
}

export const PostSummary: React.FC<PostSummaryProps> = ({ summary }) => {
  const minIndent = useMemo(() => summary.map(it => parseInt(it.type.substring(1))).min(), [summary])

  if (summary.length === 0) return <></>

  return (
    <Root>
      <Sticky>
        <SummaryTitle>이 페이지의 내용</SummaryTitle>
        <Summaries>
          {summary.map(it =>
            <SummaryItem
              key={`${it.type}_${it.text}`}
              href={`#${it.text.replaceAll(" ", "_")}`}
              $indent={parseInt(it.type.substring(1)) - minIndent}>
              {it.text}
            </SummaryItem>
          )}
        </Summaries>
      </Sticky>
    </Root>
  )
}

const Root = styled.div`
  position: absolute; top: calc(175px + 20px); right: 50%;
  width: 210px; height: calc(100% - 40px - 175px);
  
  word-break: keep-all;
  
  transform: translateX(calc(375px + 100%));
  
  ${WhenWidthMost(1250)} {
    display: none;
  }
  
  & a {
    color: white !important;
    text-decoration: none !important;
  }
`

const Sticky = styled.div`
  position: sticky; top: calc(40px);

  border-left: 4px solid #3485ff;
  padding-left: 17.5px;
`

const SummaryTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Summaries = styled.div`
  font-size: 14px;
  line-height: 125%;
`

const SummaryItem = styled.a<{ $indent: number }>`
  padding: 7.5px 0 7.5px ${({ $indent }) => $indent * 20}px;
  display: block;
`
