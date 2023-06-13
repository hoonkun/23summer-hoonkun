import {
  BackgroundContainer,
  BackgroundImage,
  ContentArea,
  GlowText,
  HomeRoot,
  MotdContent,
  ContentHeader,
  MotdImage,
  MotdText,
  Scrollable,
  StickyArea,
  TitleContent,
  TitleText,
  SectionDivider, NameDivider
} from "@/app/_styled"
import Spacer from "@/components/Spacer"
import { dateBasedRandom, dice } from "@/lib/23summer/dice"

import MainBackground from "@/resources/main_bg.jpg"

export default function Home() {

  const die = dice()
  const rotation = dateBasedRandom() % 10 - 5

  return (
    <HomeRoot>
      <BackgroundContainer>
        <BackgroundImage
          src={MainBackground.src}
          alt={"Minecraft screenshot with moon setting in y=-59"}
        />
      </BackgroundContainer>
      <Scrollable>
        <StickyArea>
          <TitleText>
            <span>HoonKun</span>
            <NameDivider />
            <GlowText>훈쿤</GlowText>
          </TitleText>
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
              <li>📫 인터넷에서는 트위터(<a href={"https://twitter.com/arctic_apteryx"}>@arctic_apteryx</a>)에 주로 상주 중이에요!</li>
              <li>⚡ 마인크래프트는 개발하는것도, 플레이하는것도 좋아해요!<br/>&nbsp;&nbsp;&nbsp;<small>&nbsp;&nbsp;&nbsp;</small>같이 할 사람 절찬리에 모집 중! (??)</li>
            </ul>
            <Spacer height={15}/>
            <ContentHeader>오늘의 아무말</ContentHeader>
            <MotdContent>
              <MotdImage src={`dice/${die.image}`} rotate={rotation}/>
              <MotdText>{die.text}</MotdText>
            </MotdContent>
          </TitleContent>
        </StickyArea>
        <ContentArea>
          {/* TODO */}
        </ContentArea>
      </Scrollable>
    </HomeRoot>
  )
}
