import {
  AnimationState,
  AnimationStateData,
  AnimationStateListener,
  AssetManager,
  AtlasAttachmentLoader,
  BoundingBoxAttachment,
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
import { Vectors } from "@/lib/23summer/kiwi/VectorUtils"
import { Polygons } from "@/lib/23summer/kiwi/PolygonUtils"

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

    enableMouseGazing: () => void = EmptyFunction

    cleanup = () => {
      this.active = false

      this.assetManager.dispose()
      this.shader.dispose()
      this.worker.dispose()

      document.removeEventListener("mousemove", onMouseMove)
    }
  }

  const states: KiwiAnimatingState = {
    phase: null,
    eye: { looper: { cancel: EmptyFunction }, animating: false },
    lookAt: { looper: { cancel: EmptyFunction }, animating: false }
  }
  let lastFrameTime = Date.now()
  let scale = 1
  let cameraWidth = 0
  let cameraHeight = 0
  let requestedInterpolateLookAt: [number, number, Vector2, Vector2, Vector2, Vector2] | null | undefined = undefined

  const ActiveBreaker = () => !renderer.active

  const resize = () => {
    const w = renderTarget.clientWidth;
    const h = renderTarget.clientHeight;
    if (renderTarget.width != w || renderTarget.height != h) {
      renderTarget.width = w * 2;
      renderTarget.height = h * 2;
    }

    const centerX = offset.x + size.x / 2;
    const centerY = offset.y + size.y / 2;
    const scaleX = size.x / renderTarget.width;
    const scaleY = size.y / renderTarget.height;
    scale = Math.max(scaleX, scaleY) // * 2;
    if (scale < 1) scale = 1;
    cameraWidth = renderTarget.width * scale;
    cameraHeight = renderTarget.height * scale;

    mvp.ortho2d(centerX - cameraWidth / 2, centerY - cameraHeight / 2 + 96, cameraWidth, cameraHeight);
    renderContext.gl.viewport(0, 0, renderTarget.width, renderTarget.height);
  }

  const render = () => {
    if (!renderer.active) return

    const now = Date.now()
    const deltaTime = (now - lastFrameTime) / 1000
    lastFrameTime = now

    interpolateLookAt()

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

  const setAnimationStateAsIdle = async () => {
    if (states.phase === "Idle") return

    document.removeEventListener("mousemove", onMouseMove)
    document.addEventListener("mousemove", onMouseMove)
    requestedInterpolateLookAt = undefined

    animator.setAnimation(0, "Idle", true)

    states.eye.looper.cancel = loopRandomEyeAnimation()
  }

  const setAnimationStateAsExtra = async () => {
    if (states.phase === "Extra") return

    states.eye.looper.cancel()
    states.lookAt.looper.cancel()

    await waitUntil(() => !states.eye.animating, ActiveBreaker)
    if (!renderer.active) return

    document.removeEventListener("mousemove", onMouseMove)

    animator.setAnimation(0, "Extra", false)
    animator.setEmptyAnimation(1, 0.25)
    animator.setEmptyAnimation(2, 1)
    await new Promise(resolve => setTimeout(resolve, 2250))
    if (!renderer.active) return

    animator.setAnimation(0, "Extra-Idle", true)

    states.eye.looper.cancel = loopRandomEyeAnimation()

    setTimeout(setAnimationStateAsIdle, 5000 + Math.random() * 5000)
  }

  const asSpineCoordinate = (x: number, y: number) => {
    const canvasRectInPage: Vector2Rect = [
      new Vector2(renderTarget.offsetLeft, renderTarget.offsetTop),
      new Vector2(renderTarget.clientWidth, renderTarget.clientHeight)
    ]

    const spineCoordinateMultiplierX = cameraWidth / canvasRectInPage[1].x * -1 // x is inverted in ui
    const spineCoordinateMultiplierY = cameraHeight / canvasRectInPage[1].y

    const spineOriginInPageLT = new Vector2(
      canvasRectInPage[0].x + canvasRectInPage[1].x / (cameraWidth / (cameraWidth - size.x + (-offset.x))),
      canvasRectInPage[0].y + canvasRectInPage[1].y / (cameraHeight / (cameraHeight - size.y + (cameraHeight + offset.y))),
    )

    return new Vector2(
      (x - spineOriginInPageLT.x) * spineCoordinateMultiplierX,
      (window.innerWidth - (y + (window.innerWidth - spineOriginInPageLT.y))) * spineCoordinateMultiplierY
    )
  }

  const onMouseMove = (event: MouseEvent) => {
    const { pageX, pageY } = event

    const mousePositionInSpine = asSpineCoordinate(pageX, pageY)
    let headPosition = Vectors.copy(mousePositionInSpine)
    let eyePosition = Vectors.copy(mousePositionInSpine)

    const [isHeadInPolygon] = Polygons.findContainingOrNearest(HeadRangePolygons, headPosition)
    if (!isHeadInPolygon) {
      const limitedHeadPosition = Polygons.intersection(HeadRangePoints, HeadRangeCenter, headPosition)

      if (limitedHeadPosition)
        headPosition = limitedHeadPosition
    }

    const [isEyeInPolygon] = Polygons.findContainingOrNearest(EyeRangePolygons, eyePosition)
    if (!isEyeInPolygon) {
      const limitedEyePosition = Polygons.intersection(EyeRangePoints, EyeRangeCenter, eyePosition)

      if (limitedEyePosition)
        eyePosition = limitedEyePosition
    }

    const lEyeMix = Math.sqrt(Vectors.distance(FacePosition, eyePosition)) / 2800
    const rEyeMix = lEyeMix / 2

    if (requestedInterpolateLookAt === null) {
      headPosition = HeadLookAt.parent!.worldToLocal(headPosition)
      HeadLookAt.x = headPosition.x
      HeadLookAt.y = headPosition.y

      eyePosition = EyeLookAt.parent!.worldToLocal(eyePosition)
      EyeLookAt.x = eyePosition.x
      EyeLookAt.y = eyePosition.y
    } else if (requestedInterpolateLookAt === undefined) {
      const now = Date.now()
      requestedInterpolateLookAt = [
        now,
        now + 250,
        Vectors.fromBone(HeadLookAt),
        HeadLookAt.parent!.worldToLocal(headPosition),
        Vectors.fromBone(EyeLookAt),
        EyeLookAt.parent!.worldToLocal(eyePosition)
      ]
    } else {
      const now = Date.now()
      requestedInterpolateLookAt = [
        now,
        requestedInterpolateLookAt[1] + (requestedInterpolateLookAt[0] - now) / 4,
        Vectors.fromBone(HeadLookAt),
        HeadLookAt.parent!.worldToLocal(headPosition),
        Vectors.fromBone(EyeLookAt),
        EyeLookAt.parent!.worldToLocal(eyePosition)
      ]
    }

    LeftEyeLookAtConstraint.mixX = lEyeMix
    LeftEyeLookAtConstraint.mixY = lEyeMix / 2

    RightEyeLookAtConstraint.mixX = rEyeMix
    RightEyeLookAtConstraint.mixY = rEyeMix
  }

  const interpolateLookAt = () => {
    if (!requestedInterpolateLookAt) return

    const [from, until, headA, headB, eyeA, eyeB] = requestedInterpolateLookAt

    const now = Date.now()
    const t = (now - from) / (until - from)

    if (now >= until || t < 0 || t === Infinity) {
      requestedInterpolateLookAt = null
      return
    }

    const headInterpolated = Vectors.cubicInterpolation(headA, headB, t)
    HeadLookAt.x = headInterpolated.x
    HeadLookAt.y = headInterpolated.y

    const eyeInterpolated = Vectors.linearInterpolation(eyeA, eyeB, t)
    EyeLookAt.x = eyeInterpolated.x
    EyeLookAt.y = eyeInterpolated.y
  }

  const enableMouseGazing = () => {
    document.addEventListener("mousemove", onMouseMove)
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

  const HeadLookAt = skeleton.findBone("LookAt-Head")!
  const EyeLookAt = skeleton.findBone("LookAt-Eye")!

  const LeftEyeLookAtConstraint = skeleton.findTransformConstraint("LeftEyeLookAtDirection")!
  const RightEyeLookAtConstraint = skeleton.findTransformConstraint("RightEyeLookAtDirection")!

  const HeadLookAtRange = skeleton.findSlot("LookAtRange-Head")!.getAttachment()
  const EyeLookAtRange = skeleton.findSlot("LookAtRange-Eye")!.getAttachment()

  const Face = skeleton.findBone("Face")!
  const FacePosition = new Vector2(Face.worldX, Face.worldY)

  if (!(EyeLookAtRange instanceof BoundingBoxAttachment) || !(HeadLookAtRange instanceof BoundingBoxAttachment))
    throw Error("invalid skeleton data")

  const { vertices: headVertices } = HeadLookAtRange
  const { vertices: eyeVertices } = EyeLookAtRange

  const HeadRangePoints = Array.from(headVertices).chunked(2)
    .map(it => new Vector2(it[0], it[1]))
  const EyeRangePoints = Array.from(eyeVertices).chunked(2)
    .map(it => new Vector2(it[0], it[1]))

  const HeadRangePolygons = Polygons.fromVertices(headVertices)
  const EyeRangePolygons = Polygons.fromVertices(eyeVertices)

  const HeadRangeCenter = HeadRangePoints
    .reduce((acc, curr) => new Vector2(acc.x + curr.x, acc.y + curr.y), new Vector2(0, 0))
    .let(it => new Vector2(it.x / HeadRangePoints.length, it.y / HeadRangePoints.length))
  const EyeRangeCenter = EyeRangePoints
    .reduce((acc, curr) => new Vector2(acc.x + curr.x, acc.y + curr.y), new Vector2(0, 0))
    .let(it => new Vector2(it.x / EyeRangePoints.length, it.y / EyeRangePoints.length))

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

  renderer.enableMouseGazing = enableMouseGazing

  await setAnimationStateAsIdle()
  render()

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

type Vector2Rect = [offset: Vector2, size: Vector2]
