'use client'

import React from "react"
import styled from "styled-components"

export const NotFoundBackground: React.FC<{ src: string }> = ({ src }) => {
  return (
    <BackgroundImage
      src={src}
      alt={"Minecraft screenshot with moon setting in y=-59"}
    />
  )
}

export const BackgroundImage = styled.img`
  position: fixed;
  width: 100vw; height: 100vh;

  z-index: -2;
  display: block;
  
  object-fit: cover;
  object-position: 30% 50%;
  image-rendering: pixelated;
  
  filter: brightness(0.3) blur(10px);
`
