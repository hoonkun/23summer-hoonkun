import "./../lib/ktn"
import './globals.css'
import React from "react"
import StyledComponentsRegistry from "@/lib/styled/styled-registry"

export const metadata = {
  title: 'HoonKun | 훈쿤',
  description: '23년 여름의, 훈쿤 개인 페이지.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
