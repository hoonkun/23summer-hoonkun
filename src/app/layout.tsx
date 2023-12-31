import "./../lib/ktn"
import './globals.css'
import React from "react"
import StyledComponentsRegistry from "@/lib/styled/styled-registry"

const title = 'HoonKun | 훈쿤'
const description = '23년 여름의, 훈쿤 개인 페이지.'

export const metadata = {
  metadataBase: new URL(`${process.env.DEPLOY_ADDRESS ?? "http://localhost:3000"}`),
  title, description,
  twitter: { title, description, card: "summary_large_image", site: "arctic_apteryx" },
  openGraph: { title, description }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
    <body>
    <StyledComponentsRegistry>
      {children}
    </StyledComponentsRegistry>
    </body>
    </html>
  )
}
