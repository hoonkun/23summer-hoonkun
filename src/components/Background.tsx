'use client'

import React from "react"
import MainBackground from "@/resources/main_bg.jpg"
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import styled, { css } from "styled-components"
import { WinterOverlay } from "@/components/WinterOverlay"

type BackgroundProps = {
  dark?: boolean
  darker?: boolean
  overlay?: boolean
  kiwi?: boolean
}

export const Background: React.FC<BackgroundProps> = props => {

  const {
    dark,
    darker,
    overlay,
    kiwi
  } = props

  return (
    <>
      <BackgroundImage
        src={MainBackground.src}
        alt={"Minecraft screenshot with moon setting in y=-59"}
        $dark={`${dark}`}
        $darker={`${darker}`}
      />
      {/*{kiwi && <Kiwi/>}*/}
      {overlay && <BackgroundOverlay/>}
      <WinterOverlay/>
    </>
  )
}

export const BackgroundOverlay = styled.div`
  position: fixed; left: 0; top: 0;
  width: 100vw; height: 100vh;
  
  z-index: -1;
  
  background: linear-gradient(to bottom, #00000000 0%, #00000000 45%, #00000080 55%, #00000080 100%);
`

export const BackgroundImage = styled.img<{ $dark?: string, $darker?: string }>`
  position: fixed;
  width: 100vw; height: 100vh;

  z-index: -2;
  display: block;
  
  object-fit: cover;
  object-position: 0 50%;
  image-rendering: pixelated;
  
  transform: scaleX(-1);
  
  ${({ $dark, $darker }) => $dark === "true" ? css`
    ${WhenWidthMost(1150)} {
      filter: brightness(0.3);
    }
    ${WhenWidthLeast(1150)} {
      filter: brightness(0.5);
    }
  ` : $darker === "true" ? css`
    ${WhenWidthMost(1150)} {
      filter: brightness(0.3);
    }
    ${WhenWidthLeast(1150)} {
      filter: brightness(0.3);
    }
  ` : ""}
  
`
