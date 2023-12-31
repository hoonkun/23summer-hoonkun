import React from "react"

import {
  AsidePreviews,
  AsidePreviewScroller,
  BackNavigator,
  Documents,
  FootprintDecorationLine,
  FootprintDecorationPulse,
  FootprintDecorationPulseHolder,
  FootprintDescription,
  FootprintHello,
  FootprintsRoot,
  FootprintTitle,
  FootprintTitleDecorationRoot
} from "@/app/footprints/_styled"
import { Background } from "@/components/Background"

import * as Portfolio from "@/components/Footprints"
import { Portfolios } from "@/lib/23summer/portfolio"
import Link from "next/link"
import { BlogFooterDescription, VerticalDivider } from "@/app/posts/list/_styled"

export default async function Page() {

  const all = Portfolios.queryset

  return (
    <>
      <FootprintTitleDecoration/>
      <Background overlay dark/>
      <FootprintsRoot>
        <Documents>
          <FootprintTitle>
            <FootprintHello>
              안녕하세요!<br/>
              김영웅이라고 합니다.
            </FootprintHello>
            <FootprintDescription>
              주로 가명인 한고훈이라는 이름으로 활동합니다.<br/>
              이 곳에서는 제가 진행했던, 혹은 참여했던 프로젝트의 간략한 기록을 확인하실 수 있습니다.<br/><br/>
              아래로 스크롤하여 시작하시거나, 오른쪽 목록(모바일 환경에서는 우하단의 햄버거를 눌러서 표시합니다)에서 관심이 가시는 프로젝트를 클릭하여 바로 이동해보세요.
            </FootprintDescription>
            <BackNavigator>
              <Link href={"/"}>HoonKun <VerticalDivider/> 훈쿤</Link>
              <BlogFooterDescription>재미있어 보이는 이것저것을 살피는 햇병아리 멍발자</BlogFooterDescription>
            </BackNavigator>
          </FootprintTitle>
          {all.map(it => <Portfolio.Document key={it} identifier={it}/>)}
        </Documents>
        <AsidePreviews>
          <AsidePreviewScroller>
            {all.map(it => <Portfolio.AsidePreview key={it} identifier={it}/>)}
          </AsidePreviewScroller>
        </AsidePreviews>
      </FootprintsRoot>
    </>
  )
}

const pulses = new Array(30).fill(undefined)

const FootprintTitleDecoration: React.FC = () => {
  return (
    <FootprintTitleDecorationRoot>
      <FootprintDecorationPulseHolder $anchor={"top"}>
        {pulses.map((_, index) => <FootprintDecorationPulse key={index}/>)}
      </FootprintDecorationPulseHolder>
      <FootprintDecorationPulseHolder $anchor={"bottom"}>
        {pulses.map((_, index) => <FootprintDecorationPulse key={index}/>)}
      </FootprintDecorationPulseHolder>
      <FootprintDecorationLine/>
    </FootprintTitleDecorationRoot>
  )
}
