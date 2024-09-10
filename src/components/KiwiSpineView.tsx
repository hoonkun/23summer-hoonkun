"use client"

import React, { PropsWithChildren, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import {
  AnimationState,
  AnimationStateData,
  AnimationStateListener,
  AssetManager,
  AtlasAttachmentLoader,
  ManagedWebGLRenderingContext,
  Matrix4,
  Physics,
  PolygonBatcher,
  Shader,
  Skeleton,
  SkeletonBinary,
  SkeletonData,
  SkeletonRenderer,
  TrackEntry,
  Vector2
} from "@esotericsoftware/spine-webgl"
import styled from "styled-components"
import { EmptyFunction } from "@/lib/ktn"
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import Image from "next/image"

import KiwiImage from "@/resources/kiwi.png"

export const Kiwi = () => {

  const { enabled } = useKiwi()

  const [ready, setReady] = useState(false)
  const active = useRef(true)
  const initializationBreaker = useRef(false)

  const renderTarget = useRef<HTMLCanvasElement>(null)
  const animatingStates =
    useRef<KiwiAnimatingState>(DefaultKiwiAnimatingState())

  useEffect(() => {
    if (initializationBreaker.current) return
    initializationBreaker.current = true

    let renderContext: ManagedWebGLRenderingContext = null!
    let mainRenderer: SkeletonRenderer = null!
    let skeletonData: SkeletonData = null!
    let skeleton: Skeleton = null!
    let assetManager: AssetManager = null!
    let animator: AnimationState = null!
    let shader: Shader = null!
    let mvp: Matrix4 = new Matrix4()
    let batcher: PolygonBatcher = null!

    let lookAtAnimated = false

    let bounds: { offset: Vector2, size: Vector2 } = null!

    const ActiveBreaker = () => !active.current

    let lastFrameTime = Date.now()

    const stateListener = new class implements AnimationStateListener {
      start = (entry: TrackEntry) => {
        if (entry.trackIndex === 0) animatingStates.current.phase = entry.animation?.name === "Idle" ? "Idle" : "Extra"
        if (entry.trackIndex === 1) animatingStates.current.eye.animating = true
        if (entry.trackIndex === 2) animatingStates.current.lookAt.animating = true
      }
      end = (entry: TrackEntry) => {
        if (entry.trackIndex === 1) animatingStates.current.eye.animating = false
        if (entry.trackIndex === 2) animatingStates.current.lookAt.animating = false
      }
      interrupt = this.end
      complete = this.end
    }

    const initialize = async () => {
      if (!renderTarget.current)
        return console.error("no canvas available.")

      renderContext = new ManagedWebGLRenderingContext(renderTarget.current)
      if (!renderContext.gl)
        return console.error("no WebGL available in this client.")

      shader = Shader.newTwoColoredTextured(renderContext)
      batcher = new PolygonBatcher(renderContext)
      mvp.ortho2d(0, 0, renderTarget.current.width - 1, renderTarget.current.height - 1)

      mainRenderer = new SkeletonRenderer(renderContext)

      assetManager = new AssetManager(renderContext, "kiwi/")

      assetManager.loadBinary("skeleton.skel")
      assetManager.loadTextureAtlas("kiwi_live.atlas")

      const successful = await waitUntil(() => assetManager.isLoadingComplete(), ActiveBreaker)

      if (!successful)
        return console.error("resource not loaded in reasonable timeout.")

      const atlasLoader = new AtlasAttachmentLoader(assetManager.require("kiwi_live.atlas"))
      const skeletonLoader = new SkeletonBinary(atlasLoader)

      skeletonLoader.scale = 1
      skeletonData = skeletonLoader.readSkeletonData(assetManager.require("skeleton.skel"))
      skeleton = new Skeleton(skeletonData)

      skeleton.setSkinByName("default")

      skeleton.setToSetupPose();
      skeleton.updateWorldTransform(Physics.update);

      let offset = new Vector2();
      let size = new Vector2();
      skeleton.getBounds(offset, size, []);

      bounds = { offset: offset, size: size };

      const animationStateData = new AnimationStateData(skeleton.data)
      animator = new AnimationState(animationStateData)
      animator.addListener(stateListener)

      animationStateData.setMix("Extra", "Extra-Idle", 0)
      animationStateData.setMix("Idle", "Extra", 0.25)
      animationStateData.setMix("Extra-Idle", "Idle", 0.25)

      await setAnimationStateAsIdle()

      render()

      setReady(true)
      renderTarget.current.addEventListener("click", setAnimationStateAsExtra)
    }

    const resize = () => {
      const canvas = renderTarget.current
      if (!canvas) return

      let w = canvas.clientWidth;
      let h = canvas.clientHeight;
      if (canvas.width != w || canvas.height != h) {
        canvas.width = w * 2;
        canvas.height = h * 2;
      }

      let centerX = bounds.offset.x + bounds.size.x / 2;
      let centerY = bounds.offset.y + bounds.size.y / 2;
      let scaleX = bounds.size.x / canvas.width;
      let scaleY = bounds.size.y / canvas.height;
      let scale = Math.max(scaleX, scaleY) // * 2;
      if (scale < 1) scale = 1;
      let width = canvas.width * scale;
      let height = canvas.height * scale;

      mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
      renderContext.gl.viewport(0, 0, canvas.width, canvas.height);
    }

    const render = () => {
      const now = Date.now()
      const deltaTime = (now - lastFrameTime) / 1000
      lastFrameTime = now

      resize()

      const { gl } = renderContext
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT);

      animator.update(deltaTime)
      animator.apply(skeleton)
      skeleton.update(deltaTime)
      skeleton.updateWorldTransform(Physics.update)

      shader.bind()

      shader.setUniformi(Shader.SAMPLER, 0)
      shader.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);

      batcher.begin(shader)
      mainRenderer.draw(batcher, skeleton)
      batcher.end()

      shader.unbind()

      requestAnimationFrame(render)
    }

    const loopEye = () => {
      animatingStates.current.eye.looper.cancel()

      let eyeLooping = true

      const animateEye = () => {
        if (!eyeLooping) return

        animator.setAnimation(1, "Eye", false)
        setTimeout(animateEye, 2000 + Math.random() * 5000)
      }

      setTimeout(animateEye, 2000 + Math.random() * 5000)

      return () => eyeLooping = false
    }

    const loopLookAt = () => {
      animatingStates.current.lookAt.looper.cancel()

      let lookAtLooping = true

      const animateLookAt = async () => {
        if (!lookAtLooping) return

        if (lookAtAnimated)
          animator.setEmptyAnimation(2, 0.25)
        else
          animator.setAnimation(2, "LookAt", false)

        lookAtAnimated = !lookAtAnimated

        setTimeout(animateLookAt, 3000 + Math.random() * 7000)
      }

      setTimeout(animateLookAt, 3000 + Math.random() * 7000)

      return () => lookAtLooping = false
    }

    const setAnimationStateAsIdle = async () => {
      if (animatingStates.current.phase === "Idle") return

      animator.setAnimation(0, "Idle", true)

      animatingStates.current.eye.looper.cancel = loopEye()
      animatingStates.current.lookAt.looper.cancel = loopLookAt()
    }

    const setAnimationStateAsExtra = async () => {
      if (animatingStates.current.phase === "Extra") return

      animatingStates.current.eye.looper.cancel()
      animatingStates.current.lookAt.looper.cancel()

      await waitUntil(() => !animatingStates.current.eye.animating, ActiveBreaker)

      animator.setAnimation(0, "Extra", false)
      animator.setEmptyAnimation(1, 0.25)
      animator.setEmptyAnimation(2, 1)
      await new Promise(resolve => setTimeout(resolve, 2250))

      animator.setAnimation(0, "Extra-Idle", true)

      animatingStates.current.eye.looper.cancel = loopEye()

      setTimeout(setAnimationStateAsIdle, 5000 + Math.random() * 5000)
    }

    const cleanup = () => {

    }

    initialize().then()

    return cleanup
  }, [])

  return (
    <RenderTarget ref={renderTarget} style={{ opacity: ready && enabled ? 1 : 0 }}></RenderTarget>
  )
}

const RenderTarget = styled.canvas`
  height: 88vh;
  aspect-ratio: 1 / 2;
  position: absolute;
  left: 0;
  bottom: -48px;
  transform: scaleX(-1) translateX(max(0px, (600px - 100vw) / 3));
  transition: opacity 0.2s linear;

  ${WhenWidthMost(1150)} {
    filter: brightness(0.3);
  }
  ${WhenWidthLeast(1150)} {
    filter: brightness(0.5);
  }
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

  return <KiwiActivatorImage src={KiwiImage} alt={""} onClick={() => setEnabled(v => !v)}/>
}

type KiwiContext = {
  enabled: boolean
  setEnabled: React.Dispatch<SetStateAction<boolean>>
}

const KiwiContext = React.createContext<KiwiContext>({
  enabled: false,
  setEnabled: EmptyFunction
})

const useKiwi = () => useContext(KiwiContext)

export const KiwiContextProvider: React.FC<PropsWithChildren> = props => {
  const [enabled, setEnabled] = useState(false)
  return <KiwiContext.Provider {...props} value={{ enabled, setEnabled }}/>
}

type KiwiAnimatingStateElement = {
  looper: { cancel: () => unknown }
  animating: boolean
}

type KiwiAnimatingState = {
  phase: null | "Idle" | "Extra"
  eye: KiwiAnimatingStateElement
  lookAt: KiwiAnimatingStateElement
}

const DefaultKiwiAnimatingState = (): KiwiAnimatingState => ({
  phase: null,
  eye: { looper: { cancel: EmptyFunction }, animating: false },
  lookAt: { looper: { cancel: EmptyFunction }, animating: false }
})


const waitUntil = (
  criteria: () => boolean,
  breaker?: () => boolean,
  maxMs: number = 5000
): Promise<boolean | null> => {
  return new Promise<boolean | null>(async resolve => {
    let elapsed = 0
    if (criteria()) return resolve(true)

    const handle = async () => {
      const start = Date.now()
      if (breaker?.()) {
        resolve(null)
        return
      }
      const satisfied = criteria()
      if (satisfied || elapsed >= maxMs) {
        resolve(elapsed <= maxMs && satisfied)
        return
      }
      elapsed += Date.now() - start
      requestAnimationFrame(handle)
    }
    requestAnimationFrame(handle)
  })
}
