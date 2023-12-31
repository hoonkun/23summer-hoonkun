'use client'

import styled, { css, keyframes } from "styled-components"
import { MarkdownContent } from "@/app/posts/retrieve/_styled"
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import Image from "next/image"

import MenuOpenIcon from "@/resources/icons/menu_open.svg"
import CloseIcon from "@/resources/icons/close.svg"

export const FootprintsRoot = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`

export const FootprintTitle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding-right: 60px;
  padding-left: 20px;
  
  ${WhenWidthMost(1100)} {
    padding-right: 0;
  }

  ${WhenWidthMost(950)} {
    max-width: 750px;
    padding-right: 40px;
    padding-left: 40px;
  }
  
  ${WhenWidthMost(450)} {
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: calc(100vh - 100svh);
  }
`

export const FootprintHello = styled.h1`
  text-shadow: #ffffffcc 0 0 10px, #000000 0 0 10px;
  font-size: 50px;
  line-height: 125%;

  ${WhenWidthMost(450)} {
    font-size: 35px;
  }
`

export const FootprintDescription = styled.p`
  margin-top: 16px;
  line-height: 220%;
  text-shadow: #000000 0 0 10px;

  ${WhenWidthMost(450)} {
    font-size: 14px;
  }
`

export const Documents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  flex-basis: 65%;

  ${WhenWidthMost(950)} {
    flex-basis: 100%;
  }

  ${WhenWidthMost(450)} {
    margin: 20px 0;
  }
  
  transition: opacity .15s linear;
  &:has(+ div[data-open="true"]) {
    opacity: 0.1;
  }
`

export const DocumentTitle = styled.h2`
  word-break: keep-all;
  padding-top: 25px;
`

export const DocumentDescription = styled.p`
  margin-top: 8px;
`

export const AsidePreviewsRoot = styled.div`
  position: sticky; top: 0;
  align-self: flex-start;
  width: 400px;
  flex-shrink: 0;
  background-color: #000000A0;
  border-radius: 8px;
  
  ${WhenWidthMost(950)} {
    width: 100vw;
    display: block;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    left: 0; top: 0; bottom: 0; right: 0;
    z-index: 8;
    backdrop-filter: blur(20px);
    
    transition: opacity .15s linear;
    
    & > div {
      transform: translateX(10px);
      transition: transform .15s cubic-bezier(0.33, 1, 0.68, 1)
    }
    
    &.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
      
      & > div {
        transform: translateX(0);
      }
    }
  }
`

export const AsidePreviews: React.FC<PropsWithChildren> = ({ children }) => {

  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const handler = () => setOpen(false)

    const anchors = currentRef.querySelectorAll("a")
    anchors.forEach(it => it.addEventListener("click", handler))

    return () => anchors.forEach(it => it.removeEventListener("click", handler))
  }, []);

  return (
    <>
      <AsidePreviewsRoot
        ref={ref}
        className={open ? "open" : ""}
        data-open={open ? "true" : "false"}
      >
        {children}
      </AsidePreviewsRoot>
      <AsideOpener onClick={() => setOpen(prev => !prev)}>
        <Image src={open ? CloseIcon : MenuOpenIcon} alt={""} style={{ width: 32, height: 32 }}/>
      </AsideOpener>
    </>
  )
}

export const AsideOpener = styled.button`
  ${WhenWidthLeast(951)} {
    display: none;
  }
  
  position: fixed;
  right: 25px;
  bottom: 25px;
  width: 42px;
  height: 42px;
  border: none;
  z-index: 999;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #ffffff30;
  }
`

export const AsidePreviewScroller = styled.div`
  max-height: 100vh;
  padding: 30px 25px 9px 25px;
  overflow: auto;
  
  ${WhenWidthMost(950)} {
    padding: 30px 25px 80px 25px;
  }
`

export const AsidePreviewRoot = styled.div`
  font-size: 16px;
  margin: 24px 0;
`

export const PortfolioContent = styled(MarkdownContent)`
  margin-top: 0;
  width: auto;
  max-width: unset;
  padding: 0;
`

export const DocumentRoot = styled.div`
  padding: 0 25px 25px 25px;
  background-color: #000000B0;
  border-radius: 8px;
  
  ${WhenWidthMost(450)} {
    border-radius: 0;
  }
`

export const DocumentImage = styled(Image)`
  width: 100%;
  height: auto;
  margin-top: 16px;
`

export const DocumentDivider = styled.div`
  width: 48px;
  height: 0;
  border-bottom: 1px solid #ffffff75;
  margin: 16px 0;
  align-self: center;
`

export const PortfolioTagsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const PortfolioTagRoot = styled.div<{ $color: string, $small?: boolean }>`
  background-color: ${({ $color }) => $color}60;
  padding: ${({ $small }) => $small ? "0 4px" : "2px 8px"};
  border-radius: 4px;
  margin-right: 8px;
  font-size: ${({ $small }) => $small ? 13 : 16}px;
  margin-top: 8px;
  
  ${WhenWidthMost(450)} {
    font-size: ${({ $small }) => $small ? 12 : 13}px;
    border-radius: 2px;
  }
`

export const FootprintTitleDecorationRoot = styled.div`
  position: absolute; 
  height: calc(100svh * 0.86);
  top: calc(100svh * 0.14 / 2); left: 0; right: 0;
  z-index: 0;
  overflow-x: hidden;
`

export const PulseCount = 30;

const PulseMove = keyframes`
  0% { transform: translateX(0) }
  100% { transform: translateX(calc(2000px / ${PulseCount} + 1px)) }
`

export const FootprintDecorationPulseHolder = styled.div<{ $anchor: "top" | "bottom" }>`
  width: 2000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  ${({ $anchor }) => css`${$anchor}: 60px;`};
  animation: ${PulseMove} 2s linear ${({ $anchor }) => $anchor === "top" ? "reverse" : "normal"} infinite;
`

const Pulse = keyframes`
  0% { transform: scale(1, 1) }
  0.1% { transform: scale(1, 1.4) }
  25% { transform: scale(1, 1) }
  100% { transform: scale(1, 1) }
`

export const FootprintDecorationPulse = styled.div`
  width: 0; height: 8px;
  border-right: 1px solid #ffffff75;
  animation: ${Pulse} 0.7s linear infinite;
`

const Line = keyframes`
  0% { transform: translateY(64px) }
  100% { transform: translateY(calc(86svh - 64px)) }
`

export const FootprintDecorationLine = styled.div`
  width: 100vw; height: 0;
  border: 1px solid #ffffff35;
  animation: ${Line} 2.8s linear infinite alternate;
`

export const BackNavigator = styled.div`
  position: absolute;
  left: 0; bottom: calc(7vh + 64px + 40px);

  padding-left: 20px;

  ${WhenWidthMost(950)} {
    padding: 0 40px;
  }

  ${WhenWidthMost(450)} {
    padding: 0;
    position: relative;
    left: unset;
    bottom: unset;
    margin-top: 32px;
    margin-bottom: 32px;
  }
  
  > a {
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 0 5px #ffffff80;

    display: flex;
    align-items: center;
  }
`
