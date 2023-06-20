import { ImageResponse } from "next/server"
import { dice } from "@/lib/23summer/dice"
import "@/lib/ktn"
import config from "@/config"
import { ImageMetadataHeaders, ImageRenderedAt } from "@/lib/23summer/ImageMetadataUtils"

export const alt = "Title Image of HoonKun.kiwi"
export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

export const runtime = 'edge'

// 그래서 이게 뭔데... 어디다가 집어넣어도 Cannot resolve module 던지거나 Invalid URL 뜨는데 어쩌라는거임
// const interSemiBold = fetch(
//   new URL('./Inter-SemiBold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

const JetBrainsMono = fetch(
  `${config.deploy}/fonts/JetBrainsMono-Regular.ttf`
).then((res) => res.arrayBuffer())

const IBMPlexSansKR = fetch(
  `${config.deploy}/fonts/IBMPlexSansKR-Regular.woff`
).then((res) => res.arrayBuffer())

export default async function MetadataImage(): Promise<ImageResponse> {
  const die = dice()

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", fontFamily: "IBMPlexSansKR" }}>
        <img
          src={`${config.deploy}${(await import("@/resources/main_bg_crop.jpg")).default.src}`}
          alt={"background image"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", position: "absolute", zIndex: "0" }}
        />
        <img
          src={`${config.deploy}${(await import("@/resources/logo.png")).default.src}`}
          alt={"logo"}
          style={{ width: "125px", height: "125px", margin: "25px", position: "absolute", left: "0", top: "0" }}
        />
        <div style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: "1", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transform: "translateY(-15px)" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px", textShadow: "0 0 10px #ffffffff" }}>
            <span style={{ fontFamily: "JetBrainsMono" }}>HoonKun</span>
            <div style={{ width: "0", height: "40px", borderRight: "3px solid #ffffff50", margin: "0 40px" }}></div>
            <span style={{ transform: "translateY(-15px)" }}>훈쿤</span>
          </div>
          <div style={{ textAlign: "center", opacity: "0.5", transform: "translateY(-20px)", fontSize: "20px" }}>
            재미있어 보이는 이것저것을 살펴보는 햇병아리 멍발자
          </div>
        </div>
        <div style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", padding: "50px" }}>
          <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
            <img
              src={`${config.deploy}/dice/${die.image}`}
              alt={`Message of the today, of hoonkun.kiwi`}
              style={{ width: "185px", aspectRatio: `1`, border: "8px solid white" }}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: "20px", color: "#ffffff80", marginBottom: "16px", marginRight: "30px" }}>오늘의 아무말</div>
              {die.text.split("\n").map((it, index) =>
                <div key={index} style={{ color: "white", whiteSpace: "pre-wrap", fontSize: "30px", marginRight: "30px", textAlign: "right" }}>
                  {it}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: "40px", top: "35px", color: "white", opacity: "0.35", zIndex: "3", fontFamily: "JetBrainsMono" }}>
          Rendered at {ImageRenderedAt()}
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
