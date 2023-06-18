'use client'

import React, { PropsWithChildren } from "react"
import MainBackground from "@/resources/main_bg_crop.jpg"
import { WhenWidthIn, WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import styled, { css } from "styled-components"

export const Background: React.FC<PropsWithChildren<{ darker?: boolean }>> = ({ darker, children }) => {
  return (
    <BackgroundContainer>
      <BackgroundImage
        src={MainBackground.src}
        alt={"Minecraft screenshot with moon setting in y=-59"}
        darker={`${darker}`}
      />
      {children}
    </BackgroundContainer>
  )
}

export const BackgroundContainer = styled.div`
  position: fixed;
  width: 100vw; height: 100vh;

  z-index: -2;
`

export const BackgroundImage = styled.img<{ darker?: string }>`
  width: 100%; height: 100%;
  display: block;
  
  object-fit: cover;
  object-position: 30% 50%;
  image-rendering: pixelated;
  
  ${({ darker }) => darker === "true" ? css`
    ${WhenWidthMost(1150)} {
      filter: brightness(0.3);
    }
    ${WhenWidthLeast(1150)} {
      filter: brightness(0.75);
    }
  ` : ""}
`
