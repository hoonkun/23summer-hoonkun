import { ImageResponse } from "next/og"
import { metadata as MainMetadata } from "@/app/layout"
import { dice } from "@/lib/23summer/dice"
import "@/lib/ktn"
import config from "@/config"
import { ImageMetadataHeaders } from "@/lib/23summer/ImageMetadataUtils"

export const alt = "Title Image of HoonKun.kiwi"
export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

export const metadata = {
  metadataBase: MainMetadata.metadataBase,
}

// 그래서 이게 뭔데... 어디다가 집어넣어도 Cannot resolve module 던지거나 Invalid URL 뜨는데 어쩌라는거임
// const interSemiBold = fetch(
//   new URL('./Inter-SemiBold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

const JetBrainsMono = fetch(
  `${config.deploy}/fonts/JetBrainsMono-Regular.ttf`
).then((res) => res.arrayBuffer())

const IBMPlexSansKR = fetch(
  `${config.deploy}/fonts/IBMPlexSansKR-Medium.woff`
).then((res) => res.arrayBuffer())

/* eslint-disable @next/next/no-img-element */
export default async function MetadataImage(): Promise<ImageResponse> {
  const die = dice()

  return new ImageResponse(
    (
      <div style={Styles.Root}>
        <img
          src={`${config.deploy}${(await import("@/resources/main_bg_crop.jpg")).default.src}`}
          alt={"background image"}
          style={Styles.Background}
        />
        <img
          src={`${config.deploy}/dice/${die.image}`}
          alt={`Message of the today, of hoonkun.kiwi`}
          style={Styles.MotdImage}
        />
        <img
          src={`${config.deploy}${(await import("@/resources/logo.png")).default.src}`}
          alt={"logo"}
          style={Styles.Logo}
        />
        <div style={Styles.CenteredContent}>
          <div style={Styles.TitleContainer}>
            <span style={Styles.TitleEn}>
              HoonKun
              <span style={Styles.TitleKo}>훈쿤</span>
            </span>
            <div style={Styles.Description}>재미있어 보이는 이것저것을 살펴보는 햇병아리 멍발자</div>
          </div>
          <div style={Styles.TitleDivider}></div>
          <div style={Styles.DiceContainer}>
            <div style={Styles.DiceContent}>
              <div style={Styles.MotdContainer}>
                {die.text.split("\n").map((it, index) =>
                  <div key={index} style={Styles.MotdTextLine}>{it}</div>
                )}
                <div style={Styles.MotdDescription}>오늘의 아무말</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrainsMono",
          data: await JetBrainsMono,
          style: "normal",
          weight: 400
        },
        {
          name: "IBMPlexSansKR",
          data: await IBMPlexSansKR,
          style: "normal",
          weight: 400
        }
      ],
      headers: ImageMetadataHeaders()
    }
  )
}

const Styles = {
  Root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    fontFamily: "IBMPlexSansKR"
  },
  Background: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "30% 50%",
    position: "absolute",
    zIndex: 0
  },
  Logo: {
    width: "100px",
    height: "100px",
    margin: "32px",
    position: "absolute",
    right: "0",
    bottom: "0"
  },
  CenteredContent: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  TitleContainer: {
    width: 540,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    fontSize: "70px",
    textShadow: "0 0 10px #ffffffff"
  },
  TitleEn: {
    fontFamily: "JetBrainsMono",
    display: "flex",
    alignItems: "center"
  },
  TitleDivider: {
    width: "0",
    height: "100px",
    borderRight: "2px solid #ffffff50",
    margin: "0 60px"
  },
  TitleKo: {
    fontSize: "56px",
    fontWeight: "bold",
    fontFamily: "IBMPlexSansKR",
    transform: "translateY(-8px)",
    marginLeft: "16px",
  },
  Description: {
    textAlign: "center",
    opacity: "0.5",
    transform: "translateY(-20px)",
    fontSize: "20px",
    marginTop: "16px",
    textShadow: "none"
  },
  DiceContainer: {
    width: 540,
    position: "relative",
    zIndex: "2",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "50px 50px 50px 0",
    transform: "translateY(-6px)"
  },
  DiceContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  MotdImage: {
    display: "flex",
    height: 630,
    width: 630,
    position: "absolute",
    left: "0",
    top: "0",
    transform: "translateX(570px)",
    filter: "brightness(0.7)",
    maskImage: "linear-gradient(to left, black 0%, transparent 80%, transparent 100%)",
  },
  MotdContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  MotdDescription: {
    textAlign: "center",
    fontSize: "20px",
    textShadow: "none",
    color: "#ffffff80",
    marginTop: "8px",
    marginRight: "30px"
  },
  MotdTextLine: {
    color: "white",
    whiteSpace: "pre-wrap",
    fontSize: "24px",
    marginRight: "30px",
    textAlign: "right"
  },
  RenderedAt: {
    display: "flex",
    position: "absolute",
    right: "40px",
    top: "35px",
    color: "white",
    opacity: "0.35",
    zIndex: "3",
    fontFamily: "JetBrainsMono"
  }
} as const
