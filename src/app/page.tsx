import React from "react"
import Link from "next/link"

import { dateBasedRandom, dice } from "@/lib/23summer/dice"

import {
  Comment,
  ContentArea,
  ContentHeader,
  GlowText,
  Hidden,
  HomeRoot,
  MotdContent,
  MotdImage,
  MotdText,
  NameDivider,
  ReadMe,
  SectionDivider,
  TitleArea,
  TitleContent,
  TitleText
} from "@/app/_styled"

import { NewTabLinkIndicator } from "@/components/NewTabLinkIndicator"
import { Background } from "@/components/Background"

export const fetchCache = "force-no-store"

export default function Home() {
  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  return (
    <HomeRoot>
      <Background dark/>
      <ContentArea>
        <TitleArea>
          <TitleText>
            <span>HoonKun</span>
            <NameDivider />
            <GlowText>훈쿤</GlowText>
          </TitleText>
          <Link href={"/posts/list/1"}><NewTabLinkIndicator/> 키위새의 아무말 저장소</Link>
        </TitleArea>
        <SectionDivider />
        <TitleContent>
          <ContentHeader>방가어요!!</ContentHeader>
          <Comment>재미있어보이는 이것저것을 해보는 햇병아리 멍발자</Comment>
          본명은 아니지만 한고훈이라는 이름으로 활동해요.<br/>
          아직 햇병아리 뉴비이지만 열심히 공부하고 있어요.<br/>
          <ReadMe>
            <li>🔭 현재는 <a href={"https://unstabler.pl"}>team unstablers</a> 에 속해있어요!</li>
            <li>🌱 최근에는 Jetpack Compose에 대해 공부 중이에요!</li>
            <li>🥝 주로 개인 프로젝트를 통해 공부하고 있어요.</li>
            <li>📫 Mastodon <a rel={"me"} href={"https://ppiy.ac/@kiwi"}>kiwi@ppiy.ac</a> 에 주로 상주 중이에요!</li>
            <li>⚡ 마인크래프트는 개발하는것도, 플레이하는것도 좋아해요!<br/><Hidden>⚡ </Hidden>같이 할 사람 절찬리에 모집 중! (??)</li>
          </ReadMe>
          <ContentHeader>오늘의 아무말</ContentHeader>
          <MotdContent>
            <MotdImage src={`dice/${die.image}`} rotate={rotation} alt={die.alt}/>
            <MotdText>{die.text}</MotdText>
          </MotdContent>
        </TitleContent>
      </ContentArea>
    </HomeRoot>
  )
}