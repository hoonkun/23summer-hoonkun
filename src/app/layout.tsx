import "./../lib/ktn"
import './globals.css'
import React from "react"
import StyledComponentsRegistry from "@/lib/styled/styled-registry"
import { LogFilter } from "@/components/LogFilter"
import localFont from "next/font/local"

const IBMPlexSansKR = localFont({
  src: [
    {
      path: './../resources/fonts/IBMPlexSansKR-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-Text.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../resources/fonts/IBMPlexSansKR-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ]
})

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
    <body className={IBMPlexSansKR.className}>
    <LogFilter/>
    <StyledComponentsRegistry>
      {children}
    </StyledComponentsRegistry>
    </body>
    </html>
  )
}
