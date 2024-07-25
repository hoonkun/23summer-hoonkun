import React from "react"

import { NotFoundKiwicraftLogo, NotFoundRoot } from "@/app/_styled_not_found"
import { NotFoundBackground } from "@/components/NotFoundBackground"
import { KiwicraftLogo } from "@/components/KiwicraftLogo"

import BackgroundResource from "@/resources/404_bg.jpg"

export default async function NotFound() {
  return (
    <NotFoundRoot>
      <NotFoundBackground src={BackgroundResource.src}/>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>이 페이지는 존재하지 않아요... 링크가 잘못된 것 같아요.</p>
      <NotFoundKiwicraftLogo href={"/"}>
        <KiwicraftLogo src={(await import("@/resources/logo.png")).default.src}/>
      </NotFoundKiwicraftLogo>
    </NotFoundRoot>
  )
}