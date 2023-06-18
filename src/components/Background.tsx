'use client'

import React, { PropsWithChildren } from "react"
import { BackgroundContainer, BackgroundImage } from "@/app/_styled"
import MainBackground from "@/resources/main_bg_crop.jpg"

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