"use client"

import React, { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Random } from "@/lib/ktn"

import FireOverlay from "@/resources/winter_overlay.png"
import Mask from "@/resources/main_bg_winter_mask_transparent.png"

type Snowflake = {
  size: number // [1, 5] range
  position: [number, number] // [0, 1] range
  velocity: number // [1, 10] range
  direction: number // [-5, 5] range
  opacity: number // [0.15, 0.4] range
}

const generateRandomFlake = (): Snowflake => ({
  size: Random.range(1, 5),
  position: [Random.range(0, 1), Random.range(0, 1)],
  velocity: Random.range(1, 5),
  direction: Random.range(-5, 5),
  opacity: Random.range(0.05, 0.25)
})

const generateInitialFlake = (): Snowflake => ({
  ...generateRandomFlake(),
  position: [Random.range(0, 1), -0.01]
})

export const WinterOverlay: React.FC = () => {

  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const currentCanvas = canvas.current
    if (!currentCanvas) return

    const handleResize = () => {
      // setWindowSize([window.innerWidth, window.innerHeight])
      currentCanvas.width = window.innerWidth
      currentCanvas.height = window.innerHeight
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const currentCanvas = canvas.current
    if (!currentCanvas) return

    const context = currentCanvas.getContext("2d")
    if (!context) return

    const FlakeCount = window.innerWidth > 500 ?
      Math.floor(window.innerWidth / 24) :
      Math.floor(window.innerWidth / 4)

    const SizeMultiplier = window.innerWidth > 500 ?
      window.innerWidth / 500 :
      window.innerWidth / 300

    let flakes = new Array(FlakeCount).fill(null).map(() => generateRandomFlake()) as Snowflake[]
    let breaker = false

    const update = () => {
      if (breaker) return

      flakes = flakes.map(it => it.position[1] > 1.1 || it.position[0] < -0.1 || it.position[0] > 1.1 ?
        generateInitialFlake() :
        ({
          ...it,
          position: [
            it.position[0] + Math.sin((it.direction) * 0.0174533) * it.velocity / 5000,
            it.position[1] + Math.cos((it.direction) * 0.0174533) * it.velocity / 5000
          ]
        })
      )

      context.clearRect(0, 0, currentCanvas.width, currentCanvas.height)

      flakes.forEach(it => {
        context.fillStyle = `rgba(255, 255, 255, ${it.opacity})`
        context.beginPath()
        context.rect(
          it.position[0] * currentCanvas.width,
          it.position[1] * currentCanvas.height,
          it.size * SizeMultiplier,
          it.size * SizeMultiplier
        )
        context.fill()
      })

      requestAnimationFrame(update)
    }
    update()

    return () => { breaker = true }
  }, [])

  return (
    <>
      <Canvas ref={canvas}></Canvas>
      <OverlayWrapper><Overlay src={FireOverlay.src} alt={"fire overlay"}/></OverlayWrapper>
    </>
  )
}

const CanvasFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Canvas = styled.canvas`
  width: 100vw; height: 100vh;
  position: fixed;
  left: 0; top: 0;
  animation: ${CanvasFadeIn} 2s linear;
  
  -webkit-mask-image: url("${Mask.src}");
  mask-image: url("${Mask.src}");
  mask-mode: luminance;
  -webkit-mask-position: 30% 50%;
  mask-position: 30% 50%;
  -webkit-mask-size: cover;
  mask-size: cover;
`

const OverlayAnimation = keyframes`
  0% { opacity: 0.05 }
  5% { opacity: 0.1 }
  40% { opacity: 0.1 }
  100% { opacity: 0.05 }
`

const OverlayWrapper = styled.div`
  position: fixed;
  width: 100vw; height: 100vh;
  opacity: 0.05;
  animation: ${OverlayAnimation} 10s linear infinite;
`;

const Overlay = styled.img<{ darker?: string }>`
  position: fixed;
  width: 100vw; height: 100vh;
  
  display: block;
  
  object-fit: cover;
  opacity: 1;
  mix-blend-mode: multiply;
`

