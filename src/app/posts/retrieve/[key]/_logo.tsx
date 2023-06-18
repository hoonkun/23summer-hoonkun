'use client'

import React from "react"
import Image from "next/image"

export const Logo: React.FC<{ src: string }> = ({ src }) =>
  <Image src={src} alt={"Blog Logo"} width={65} height={65} style={{ cursor: "pointer" }} onClick={() => document.scrollingElement?.scroll({ top: 0, behavior: "smooth" })}/>
