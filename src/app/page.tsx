import React from "react"

import { dateBasedRandom, dice } from "@/lib/23summer/dice"

import {
  Comment,
  ContentArea,
  ContentHeader,
  FootprintsLink,
  Hidden,
  HomeRoot,
  MotdContent,
  MotdImage,
  MotdText,
  NameDivider,
  PostsLink,
  ReadMe,
  SectionDivider,
  TitleArea,
  TitleContent,
  TitleText,
  TitleTextEN,
  TitleTextKR
} from "@/app/_styled"
import { Background } from "@/components/Background"
import { KiwiActivator, KiwiContextProvider } from "@/components/KiwiSpineView"

export const dynamic = "force-dynamic"

export default function Home() {
  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  return (
    <KiwiContextProvider>
      <HomeRoot>
        <Background dark kiwi/>
        <ContentArea>
          <TitleArea>
            <TitleText>
              <TitleTextEN>HoonKun</TitleTextEN>
              <NameDivider/>
              <TitleTextKR>훈쿤</TitleTextKR>
            </TitleText>
            <PostsLink href={"/posts/list/1"}>키위새의 아무말 저장소</PostsLink>
            <FootprintsLink href={"/footprints"}>발자취</FootprintsLink>
          </TitleArea>
          <SectionDivider/>
          <TitleContent>
            <ContentHeader>방가어요!!</ContentHeader>
            <Comment>재미있어보이는 이것저것을 해보는 햇병아리 멍발자</Comment>
            본명은 아니지만 한고훈이라는 이름으로 활동해요.<br/>
            아직 햇병아리 뉴비이지만 열심히 공부하고 있어요.<br/>
            <ReadMe>
              <li>🔭 현재는 <a href={"https://unstabler.pl"}>team unstablers</a> 에 속해있어요!</li>
              <li>🌱 주로 개인 프로젝트를 통해 공부하고 있어요.</li>
              <li>🥝 최근에는 <a rel={"me"} href={"https://ppiy.ac/@kiwi"}>kiwi@ppiy.ac</a> 에 주로 상주 중이에요!</li>
              <li>📫 <a href={"mailto:herokun.user@gmail.com"}>herokun.user@gmail.com</a> 으로 저와 통신하실 수 있어요!</li>
              <li>⚡ 마인크래프트는 개발하는것도, 플레이하는것도 좋아해요!<br/><Hidden>⚡ </Hidden>같이 할 사람 절찬리에 모집 중! (??)</li>
            </ReadMe>
            <ContentHeader>오늘의 아무말</ContentHeader>
            <MotdContent>
              <MotdImage src={`dice/${die.image}`} rotate={rotation} alt={die.alt}/>
              <KiwiActivator/>
              <MotdText>{die.text}</MotdText>
            </MotdContent>
          </TitleContent>
        </ContentArea>
      </HomeRoot>
    </KiwiContextProvider>
  )
}
