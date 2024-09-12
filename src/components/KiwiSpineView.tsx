"use client"

import React, { PropsWithChildren, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { EmptyFunction } from "@/lib/ktn"
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import Image from "next/image"
import { KiwiRenderer } from "@/lib/23summer/kiwi/KiwiRenderer"

import KiwiImage from "@/resources/kiwi.png"
import CheeseImageResource from "@/resources/cheese.png"
import KiwiImageResource from "@/resources/kiwi_preview.png"

export const Kiwi = () => {
  const { mounted } = useKiwi()

  if (!mounted) return <></>
  return <KiwiContent/>
}

const KiwiContent = () => {

  const { enabled, ready } = useKiwi()

  const [_, forceRender] = useState(0)
  const renderer = useRef<KiwiRenderer | null>(null)
  const initializationBreaker = useRef(false)

  const renderTarget = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    window.onbeforeunload = () => {
      if (renderer.current) renderer.current!.active = false
    }
  }, []);

  useEffect(() => {
    if (initializationBreaker.current)
      return () => renderer.current?.cleanup()

    initializationBreaker.current = true

    if (!renderTarget.current) return

    const initialize = async (target: HTMLCanvasElement) => {
      renderer.current = await KiwiRenderer(target)
      renderer.current.enableMouseGazing()
      forceRender(Date.now())
    }
    initialize(renderTarget.current).then()

    return () => renderer.current?.cleanup()
  }, [])

  return (
    <RenderTargetContainer>
      <CheeseImage
        src={CheeseImageResource.src}
        alt={"cheese!"}
        style={{ opacity: ready && enabled ? 1 : 0 }}
      />
      <KiwiPreviewImage
        src={KiwiImageResource.src}
        alt={"kiwi!"}
        style={{ opacity: ready && !renderer.current && enabled ? 1 : 0 }}
      />
      <RenderTarget
        ref={renderTarget}
        onClick={renderer.current?.setAnimationStateAsExtra}
        style={{ opacity: ready && !!renderer.current && enabled ? 1 : 0 }}
      />
    </RenderTargetContainer>
  )
}

const RenderTargetContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  bottom: 0;

  ${WhenWidthMost(1150)} {
    filter: brightness(0.3);
  }
  ${WhenWidthLeast(1150)} {
    filter: brightness(0.5);
  }
`

const CheeseImage = styled.img`
  height: 48vh;
  width: auto;
  position: absolute;
  left: calc(88vh / 2);
  bottom: 0;
  align-self: flex-end;
  object-position: 0 40px;
  filter: brightness(0.75);
  transform: scaleX(-1) translateX(calc(max(0px, (600px - 100vw) / 3) + 30px));
  transition: opacity 0.2s linear;
`

const KiwiStyle = css`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 88vh;
  aspect-ratio: 1 / 2;
  object-position: 50% 35px;
  transform: scaleX(-1) translateX(max(0px, (600px - 100vw) / 3));
`

const KiwiPreviewImage = styled.img`
  ${KiwiStyle};
  
  width: unset;
  object-fit: contain;
  filter: grayscale(0.5);
  transition: opacity 0.6s linear;
`

const RenderTarget = styled.canvas`
  ${KiwiStyle};
  transition: opacity 0.2s linear;
`

const KiwiActivatorImage = styled(Image)`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 48px; bottom: -10px;

  ${WhenWidthLeast(1350)} {
    width: 45px; height: 45px;
    left: 60px; bottom: -14px;
  }
  
  transition: transform 0.1s linear;
  
  &:hover {
    transform: scale(1.05) rotateZ(-8deg);
  }
  
  &:active {
    filter: brightness(0.75);
  }
`

export const KiwiActivator: React.FC = () => {
  const { setEnabled } = useKiwi()

  return (
    <KiwiActivatorImage
      src={KiwiImage}
      alt={""}
      onClick={() => setEnabled(v => !v)}
    />
  )
}

type KiwiContext = {
  enabled: boolean
  mounted: boolean
  ready: boolean
  setEnabled: React.Dispatch<SetStateAction<boolean>>
}

const KiwiContext = React.createContext<KiwiContext>({
  enabled: false,
  mounted: false,
  ready: false,
  setEnabled: EmptyFunction
})

const useKiwi = () => useContext(KiwiContext)

export const KiwiContextProvider: React.FC<PropsWithChildren> = props => {
  const [enabled, setEnabled] = useState(true)
  const [mounted, setMounted] = useState(true)
  const [ready, setReady] = useState(true)

  useEffect(() => {
    if (enabled) setMounted(true)
    else {
      const timeout = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(timeout)
    }
  }, [enabled]);

  useEffect(() => {
    setReady(mounted)
  }, [mounted])

  return <KiwiContext.Provider {...props} value={{ ready, enabled, mounted, setEnabled }}/>
}
