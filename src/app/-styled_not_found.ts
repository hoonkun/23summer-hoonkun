'use client'

import styled from "styled-components"
import { WhenWidthMost } from "@/lib/styled/media-queries"

export const NotFoundRoot = styled.div`
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h1 {
    font-size: 200px;
    color: white;
    font-family: "JetBrains Mono", sans-serif;
    font-weight: lighter;
  }
  
  ${WhenWidthMost(500)} {
    h1 {
      font-size: 175px;
    }
    p {
      font-size: 14px;
    }
  }
`

export const NotFoundKiwicraftLogo = styled.a`
  position: absolute;
  left: 20px;
  bottom: 20px;
`
