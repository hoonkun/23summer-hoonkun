import { ImageResponse } from "next/og"
import { PostParams } from "@/app/posts/retrieve/[key]/page"
import config from "@/config"
import { ImageMetadataHeaders } from "@/lib/23summer/ImageMetadataUtils"

export const alt = ""
export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

/* eslint-disable @next/next/no-img-element */
export default async function MetadataImage({ params }: { params: PostParams }): Promise<ImageResponse> {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <img
        src={`${config.deploy}${(await import(`$/__posts__/${params.key}/preview.jpg`)).default.src}`}
        alt={""}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ width: "100%", height: "100%", position: "absolute", left: "0", right: "0", background: "radial-gradient(circle at 0% 100%, #000000bb 0%, #00000000 40%, #00000000 100%)" }}/>
      <img
        src={`${config.deploy}${(await import("@/resources/logo.png")).default.src}`}
        alt={"logo"}
        style={{ width: "125px", height: "125px", margin: "25px", position: "absolute", right: "0", bottom: "0" }}
      />
    </div>,
    { ...size, headers: ImageMetadataHeaders() }
  )
}
