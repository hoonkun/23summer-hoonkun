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
  SkeletonRenderer,
  TrackEntry,
  Vector2
} from "@esotericsoftware/spine-webgl"
import { EmptyFunction } from "@/lib/ktn"

export type KiwiRenderer = Awaited<ReturnType<typeof KiwiRenderer>>

export const KiwiRenderer = async (renderTarget: HTMLCanvasElement) => {
  if (!renderTarget)
    throw new Error("no canvas available.")

  const renderContext = new ManagedWebGLRenderingContext(renderTarget)
  if (!renderContext.gl)
    throw new Error("no WebGL available in this client.")

  const renderer = new class KiwiRenderer {
    active = true

    renderTarget: HTMLCanvasElement = renderTarget
    shader: Shader = null!
    worker: PolygonBatcher = null!
    matrix: Matrix4 = null!

    assetManager: AssetManager = null!

    skeletonRenderer: SkeletonRenderer = null!
    skeleton: Skeleton = null!

    bounds: { offset: Vector2, size: Vector2 } = null!

    animationStateData: AnimationStateData = null!
    animationState: AnimationState = null!

    setAnimationStateAsIdle: () => Promise<void> = EmptyFunction
    setAnimationStateAsExtra: () => Promise<void> = EmptyFunction

    cleanup = () => {
      this.active = false

      this.assetManager.dispose()
      this.shader.dispose()
      this.worker.dispose()
    }
  }

  const states: KiwiAnimatingState = {
    phase: null,
    eye: { looper: { cancel: EmptyFunction }, animating: false },
    lookAt: { looper: { cancel: EmptyFunction }, animating: false }
  }
  let lastFrameTime = Date.now()
  let lookAtAnimated = false

  const ActiveBreaker = () => !renderer.active

  const resize = () => {
    let w = renderTarget.clientWidth;
    let h = renderTarget.clientHeight;
    if (renderTarget.width != w || renderTarget.height != h) {
      renderTarget.width = w * 2;
      renderTarget.height = h * 2;
    }

    let centerX = offset.x + size.x / 2;
    let centerY = offset.y + size.y / 2;
    let scaleX = size.x / renderTarget.width;
    let scaleY = size.y / renderTarget.height;
    let scale = Math.max(scaleX, scaleY) // * 2;
    if (scale < 1) scale = 1;
    let width = renderTarget.width * scale;
    let height = renderTarget.height * scale;

    mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
    renderContext.gl.viewport(0, 0, renderTarget.width, renderTarget.height);
  }

  const render = () => {
    if (!renderer.active) return

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

    worker.begin(shader)
    skeletonRenderer.draw(worker, skeleton)
    worker.end()

    shader.unbind()

    requestAnimationFrame(render)
  }

  const loopRandomEyeAnimation = () => {
    states.eye.looper.cancel()

    let eyeLooping = true

    const animateEye = () => {
      if (!eyeLooping) return

      animator.setAnimation(1, "Eye", false)
      setTimeout(animateEye, 2000 + Math.random() * 5000)
    }

    setTimeout(animateEye, 2000 + Math.random() * 5000)

    return () => eyeLooping = false
  }

  const loopRandomLookAtAnimation = () => {
    states.lookAt.looper.cancel()

    let lookAtLooping = true

    const animateLookAt = async () => {
      if (!lookAtLooping) return

      if (lookAtAnimated)
        animator.setEmptyAnimation(2, 0.25)
      else
        animator.setAnimation(2, "LookAt", false)

      setTimeout(
        animateLookAt,
        lookAtAnimated ? (3000 + Math.random() * 7000) : (1000 + Math.random() * 3000)
      )

      lookAtAnimated = !lookAtAnimated
    }

    setTimeout(animateLookAt, 3000 + Math.random() * 7000)

    return () => lookAtLooping = false
  }

  const setAnimationStateAsIdle = async () => {
    if (states.phase === "Idle") return

    animator.setAnimation(0, "Idle", true)

    states.eye.looper.cancel = loopRandomEyeAnimation()
    states.lookAt.looper.cancel = loopRandomLookAtAnimation()
  }

  const setAnimationStateAsExtra = async () => {
    if (states.phase === "Extra") return

    states.eye.looper.cancel()
    states.lookAt.looper.cancel()

    await waitUntil(() => !states.eye.animating, ActiveBreaker)
    if (!renderer.active) return

    animator.setAnimation(0, "Extra", false)
    animator.setEmptyAnimation(1, 0.25)
    animator.setEmptyAnimation(2, 1)
    await new Promise(resolve => setTimeout(resolve, 2250))
    if (!renderer.active) return

    animator.setAnimation(0, "Extra-Idle", true)

    states.eye.looper.cancel = loopRandomEyeAnimation()

    setTimeout(setAnimationStateAsIdle, 5000 + Math.random() * 5000)
  }

  const shader = Shader.newTwoColoredTextured(renderContext)
  const worker = new PolygonBatcher(renderContext)
  const mvp = new Matrix4()
    .also(it => it.ortho2d(0, 0, renderTarget.width - 1, renderTarget.height - 1))

  const skeletonRenderer = new SkeletonRenderer(renderContext)

  const assetManager = new AssetManager(renderContext, "kiwi/")
    .also(it => {
      it.loadBinary("skeleton.skel")
      it.loadTextureAtlas("kiwi_live.atlas")
    })

  const loaded = await waitUntil(() => assetManager.isLoadingComplete(), ActiveBreaker)
  if (!loaded)
    throw new Error("resource not loaded in reasonable timeout.")

  const skeleton = new AtlasAttachmentLoader(assetManager.require("kiwi_live.atlas"))
    .let(it => new SkeletonBinary(it))
    .also(it => it.scale = 1)
    .readSkeletonData(assetManager.require("skeleton.skel"))
    .let(it => new Skeleton(it))
    .also(it => {
      it.setSkinByName("default")

      it.setToSetupPose();
      it.updateWorldTransform(Physics.update);
    })

  const [offset, size] = [new Vector2(), new Vector2()]
    .also(it => skeleton.getBounds(it[0], it[1], []))

  const animationStateData = new AnimationStateData(skeleton.data)
    .also(it => {
      it.setMix("Extra", "Extra-Idle", 0)
      it.setMix("Idle", "Extra", 0.25)
      it.setMix("Extra-Idle", "Idle", 0.25)
    })

  const animator = new AnimationState(animationStateData)
  animator.addListener(new class implements AnimationStateListener {
    start = (entry: TrackEntry) => {
      if (entry.trackIndex === 0) states.phase = entry.animation?.name === "Idle" ? "Idle" : "Extra"
      if (entry.trackIndex === 1) states.eye.animating = true
      if (entry.trackIndex === 2) states.lookAt.animating = true
    }
    end = (entry: TrackEntry) => {
      if (entry.trackIndex === 1) states.eye.animating = false
      if (entry.trackIndex === 2) states.lookAt.animating = false
    }
    interrupt = this.end
    complete = this.end
  })

  await setAnimationStateAsIdle()

  render()

  renderer.renderTarget = renderTarget
  renderer.shader = shader
  renderer.worker = worker
  renderer.matrix = mvp
  renderer.assetManager = assetManager
  renderer.skeletonRenderer = skeletonRenderer
  renderer.skeleton = skeleton
  renderer.bounds = { offset, size }
  renderer.animationStateData = animationStateData
  renderer.animationState = animator

  renderer.setAnimationStateAsIdle = setAnimationStateAsIdle
  renderer.setAnimationStateAsExtra = setAnimationStateAsExtra

  return renderer
}

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


type KiwiAnimatingState = {
  phase: null | "Idle" | "Extra"
  eye: KiwiAnimatingStateElement
  lookAt: KiwiAnimatingStateElement
}

type KiwiAnimatingStateElement = {
  looper: { cancel: () => unknown }
  animating: boolean
}

