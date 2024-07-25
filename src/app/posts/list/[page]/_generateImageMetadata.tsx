import { ImageResponse } from "next/og"
import "@/lib/ktn"
import config from "@/config"
import { Posts } from "@/lib/23summer/post"
import { ImageMetadataHeaders, ImageRenderedAt } from "@/lib/23summer/ImageMetadataUtils"

export const alt = ""
export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

const JetBrainsMono = fetch(
  `${config.deploy}/fonts/JetBrainsMono-Regular.ttf`
).then((res) => res.arrayBuffer())

const IBMPlexSansKR = fetch(
  `${config.deploy}/fonts/IBMPlexSansKR-Regular.woff`
).then((res) => res.arrayBuffer())

/* eslint-disable @next/next/no-img-element */
export default async function MetadataImage(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", fontFamily: "IBMPlexSansKR" }}>
        <img
          src={`${config.deploy}${(await import("@/resources/main_bg_crop.jpg")).default.src}`}
          alt={"background image"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", position: "absolute", zIndex: 0 }}
        />
        <img
          src={`${config.deploy}${(await import("@/resources/logo.png")).default.src}`}
          alt={"logo"}
          style={{ width: "125px", height: "125px", margin: "25px", position: "absolute", left: "0", top: "0" }}
        />
        <div style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", zIndex: 1, color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transform: "translateY(-25px)" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px", textShadow: "0 0 10px #ffffffff" }}>
            키위새의 아무말 저장소
          </div>
          <div style={{ textAlign: "center", opacity: "0.5", fontSize: "32px", display: "flex", alignItems: "center" }}>
            개발
            <div style={{ width: "0", height: "15px", borderRight: "2px solid #ffffff50", margin: "2px 40px" }}/>
            마인크래프트
            <div style={{ width: "0", height: "15px", borderRight: "2px solid #ffffff50", margin: "2px 40px" }}/>
            생명과학II
            <div style={{ width: "0", height: "15px", borderRight: "2px solid #ffffff50", margin: "2px 40px" }}/>
            아무말
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start", padding: "40px 45px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "60px" }}>
            <div style={{ display: "flex", fontSize: "24px", color: "white", opacity: "0.45" }}>총 게시글 수</div>
            <div style={{ display: "flex", fontSize: "36px", color: "white", fontWeight: "bold" }}>{Posts.total}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", fontSize: "24px", color: "white", opacity: "0.45" }}>최신 게시글</div>
            <div style={{ display: "flex", fontSize: "36px", color: "white", fontWeight: "bold" }}>{Posts.latest!.data.title}</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: "40px", top: "35px", color: "white", opacity: "0.35", zIndex: 3, fontFamily: "JetBrainsMono" }}>
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
