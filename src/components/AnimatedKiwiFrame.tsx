"use client"

import React from "react"
import styled from "styled-components"
import { WhenWidthLeast } from "@/lib/styled/media-queries"

export const AnimatedKiwiFrame: React.FC = () => {
  return (
    <Root><iframe src={"/kiwibird/index.html"}/></Root>
  )
}

const Root = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  left: 24px; bottom: -18px;

  ${WhenWidthLeast(1350)} {
    width: 72px; height: 72px;
    left: 36px; bottom: -20px;
  }
  
  & > iframe {
    color-scheme: normal;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
`
