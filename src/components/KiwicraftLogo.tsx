'use client'

import React from "react"
import Image from "next/image"

export const KiwicraftLogo: React.FC<{ className?: string, src: string }> = ({ src, className }) =>
  <Image
    className={className}
    src={src}
    alt={"Blog Logo"}
    width={65}
    height={65}
    style={{ cursor: "pointer", flexShrink: 0 }}
    onClick={() => document.scrollingElement?.scroll({ top: 0, behavior: "smooth" })}
  />
