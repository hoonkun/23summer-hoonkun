import React from "react"
import { dateBasedRandom, dice } from "@/lib/23summer/dice"
import {
  ContentArea, ContentHeader, GlowText,
  HomeRoot, MotdContent, MotdImage, MotdText, NameDivider,
  SectionDivider, TitleArea, TitleContent, TitleText
} from "@/app/_styled"
import Spacer from "@/components/Spacer"
import Link from "next/link"
import { NewTabLinkIndicator } from "@/components/NewTabLinkIndicator"
import { Background } from "@/components/Background"

export default function Home() {
  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  return (
    <HomeRoot>
      <Background darker={true}/>
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
          <Spacer height={15}/>
          <b>재미있어보이는 이것저것을 해보는 햇병아리 멍발자</b>
          <Spacer height={15}/>
          본명은 아니지만 한고훈이라는 이름으로 활동해요.<br/>
          아직 햇병아리 뉴비이지만 열심히 공부하고 있어요.<br/>
          <ul>
            <li>🔭 현재는 <a href={"https://unstabler.pl"}>팀 언스테이블러즈</a>에 속해있어요!</li>
            <li>🌱 최근에는 Jetpack Compose에 대해 공부 중이에요!</li>
            <li>🥝 주로 개인 프로젝트를 통해 공부하고 있어요.</li>
            <li>📫 트위터<a href={"https://twitter.com/arctic_apteryx"}>@arctic_apteryx</a>에 주로 상주 중이에요!</li>
            <li>⚡ 마인크래프트는 개발하는것도, 플레이하는것도 좋아해요!<br/>&nbsp;&nbsp;&nbsp;&nbsp;<small>&nbsp;&nbsp;&nbsp;</small>같이 할 사람 절찬리에 모집 중! (??)</li>
          </ul>
          <Spacer height={15}/>
          <ContentHeader>오늘의 아무말</ContentHeader>
          <MotdContent>
            <MotdImage src={`dice/${die.image}`} rotate={rotation}/>
            <MotdText>{die.text}</MotdText>
          </MotdContent>
        </TitleContent>
      </ContentArea>
    </HomeRoot>
  )
}