'use client'

import React from "react"
import { BackgroundContainer, BackgroundImage } from "@/app/_styled"
import MainBackground from "@/resources/main_bg.jpg"

export const Background: React.FC<{ darker?: boolean }> = ({ darker }) => {
  return (
    <BackgroundContainer>
      <BackgroundImage
        src={MainBackground.src}
        alt={"Minecraft screenshot with moon setting in y=-59"}
        darker={`${darker}`}
      />
    </BackgroundContainer>
  )
}