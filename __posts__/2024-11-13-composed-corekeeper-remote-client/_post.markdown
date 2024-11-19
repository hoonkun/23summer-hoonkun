---
author: GoHoon
title: Core Keeper 리모트 플레이어의 KMM Compose 재작성 후기
date: 2024-11-14 22:29
categories: [dev, frontend]
expand:
  max_columns: 1
  max_rows: 2
---

Kotlin 최고! 너도 같이 Compose 를 곁들인 Kotlin Multiplatform Mobile 하지 않을래?

<!-- Excerpt -->

## 서론

기존에 작성했던 Core Keeper 리모트 플레이어 클라이언트는 Swift 로 작성된, iOS 에서만 돌아가는 버전이었다.  
물론 나는 iOS 사용자이기 때문에 이걸로도 딱히 상관이 없었지만, 그래도 Android 도 작성해보고 싶었고 마침 Compose Multiplatform 1.7.0 이 릴리즈된 것이다!

그리하여 KMM 을 사용하여 하나의 Kotlin 프로젝트로 iOS 와 Android 모두를 지원하도록 재작성해보기로 한다.


## 디펜던시

### WebRTC - iOS

당연히 WebRTC 같은 프레임워크는 Kotlin 의 것을 iOS 에서 사용하지 못한다. 즉, iOS 에서는 cocoapods 의 그것을, Android 에서는 jar 와 so 를 사용해야한다.

KMM 은 굉장히 유능해서, `build.gradle.kts` 에 `cocoapods` 블럭을 사용하여 종속을 명시하면 Kotlin 의 Objective-C 상호운용 관련 기능을 통해 Kotlin 바인딩을 만들어준다.

예를 들어, 아래와 같이 디펜던시를 추가하면:

```kotlin
kotlin.cocoapods {
    version = "1.0"
    ios.deploymentTarget = "15.3"

    pod("GoogleWebRTC", moduleName = "WebRTC", version = "~> 1.1")
}
```
> build.gradle.kts


아래 처럼 Kotlin 의 iOS 소스셋에서 이 프레임워크 안쪽의 코드를 사용할 수 있다:

```kotlin
import cocoapods.WebRTC.RTCConfiguration
import cocoapods.WebRTC.RTCIceServer
import cocoapods.WebRTC.RTCMediaConstraints
// ...

private val PeerConnectionFactory = RTCPeerConnectionFactory(
    encoderFactory = null,
    decoderFactory = RTCVideoDecoderFactoryH264()
)

private fun buildRtcConfiguration() = RTCConfiguration()
    .apply {
        sdpSemantics = RTCSdpSemantics.RTCSdpSemanticsUnifiedPlan
        iceServers = listOf(/*...*/)
    }
    
private fun buildRtcMediaConstraints() =
    RTCMediaConstraints(null, null)
    
private fun buildPeerConnection(delegate: RTCPeerConnectionDelegateProtocol) =
    PeerConnectionFactory
        .peerConnectionWithConfiguration(
            configuration = buildRtcConfiguration(),
            constraints = buildRtcMediaConstraints(),
            delegate = delegate
        )
```

이 짓을 하기 전에 `.xcproject` 프로젝트를 cocoapods 를 사용하는 `.xcworkspace` 로 바꿔줘야 하지만, 이것도 Kotlin 의 iOS 개발 문서에 자세히 나와있다.  

### WebRTC - Android

안드로이드의 GoogleWebRTC 디펜던시는, 이제는 문을 닫아버린 jCenter 에서만 제공했었기 때문에 이제 접근할 수 없게 되어버렸다.  
그리하여 [Google WebRTC Project 의 페이지](https://webrtc.github.io/webrtc-org/native-code/android/) 에서 기술한 대로 직접 해당 라이브러리를 빌드하기로 한다.

depot_tools 의 설치, 프로젝트 클론, 싱크, 빌드까지... 뭔가 어렵지는 않았는데 시간이 굉장히 오래걸렸다.  
디스크 용량은 40GB 넘게 차지하고... 아마 뭔가가 많아서 그런 것이리라. git clone 하면 받는 오브젝트가 몇백만개이며, 초기 --nohooks 를 통한 싱크가 거의 10분 넘게 걸린다.

그 대신 ninja 를 통한 빌드는 빨리 끝난다. 그 40GB 가 넘는 소스코드가 빌드해서 필요한 것만 꺼내면 15MB 가 안되게 나온다. 가히 충격적인 압축률이 아닐 수 없다.

이 빌드 출력은 `.jar` 와 `.so` 이므로, JVM 에서 해왔던 것 처럼 해주면 된다:

```kotlin
kotlin.sourcesets.androidMain.dependencies {
    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
}
```
> build.gradle.kts

&nbsp; so 라이브러리는 아래처럼 한다:
```kotlin
System.loadLibrary("jingle_peerconnection_so")
```
> 어딘가의 앱 진입점

### 나머지

나머지 종속들은 모두 iOS 쪽도 지원하는 라이브러리를 가져다 썼다.  
특히, 네트워크 통신과 관련하여 WebSocket 클라이언트 구현이 필요했는데, Ktor 가 [이 페이지](https://ktor.io/docs/client-supported-platforms.html) 에서 확인할 수 있듯 
iOS 와 Android 모두를 지원한다. 단 한 가지, HttpClientEngine 만 갈아끼워주면 나머지 로직들은 모두 커먼 소스셋에서 관리가 가능했다.

결론적으로 커먼 소스셋의 종속은 Compose 와 Ktor 관련으로 구성되고, iOS 는 Ktor 의 Darwin Engine 과 WebRTC, Android 는 Okhttp Engine 과 WebRTC 로 구성된다. 

## WebRTC 로직과 시그널링 로직

위에서도 언급했듯, WebRTC 관련 디펜던시는 Android 와 iOS 가 서로 다르다. 즉, `expect`/`actual` 패턴을 통해 구현을 나눠야 했다.  
그러나 시그널링 로직은 Ktor 를 통해 Common 소스셋에서 단일 구현이 가능했다.

처음에는, 아예 둘을 별도 클래스로 나누고 부모 클래스를 만들어 서로가 상호참조할 수 있게 했다.  
요컨데, 아래처럼 했다:

```kotlin
// 별도 소스셋에서 RtcCommunicatorAndroid 및 RtcCommunicatorIOS 로 각각 구현됩니다.
interface RtcCommunicator { /* ... */ }

class Communicator(
    val rtc: RtcCommunicator // 별도의 호출측 소스셋에서 구현된 것을 만들어 넣습니다.
) {
    val signaling = SignalingCommunicator(this)
}

class SignalingCommunicator(val parent: Communicator) { /* 커먼 소스셋의 공통 시그널링 로직 */ }
```
> commonMain:Communicator.kt

일단 문제는 없다. 잘 돌아간다. 그러나... 뭔가 좀 찝찝하다. 서로가 parent 를 통해, `Communicator` 를 거쳐 상호참조하는 형태 자체가.  
특히, 이렇게 짜면 나중에 초기화중인 `this@Communicator` 가 잘못 사용되어 `RtcCommunicator` 및 `SignalCommunicator` 의 초기화 중에 1억 달러의 실수가 발생할 가능성까지도 있었다.

그렇다고 둘을 같이 한 클래스에 짜면, WebRTC 코드가 서로 상호호환이 안되므로 완전히 똑같은 시그널링 로직을 iOS 와 Android 에 각각 둬야한다. 뭔가 망가져서 고치면 두 번 고쳐야한다는 의미다.

짱돌을 조금 굴려본 결과, `interface` 에 일부 구현을 포함할 수 있다는 꼼수를 사용하기로 한다.

```kotlin
expect class Communicator(): RtcCommunicator, SignalingCommunicator

interface RtcCommunicator { 
    // 각 소스셋에서 구현될 추상 함수들
    suspend fun dispatchServerOffer(frame: RemoteFrame.RtcOffer)
    fun writeChannel(payload: String)
    // ...
}

interface SignalingCommunicator { 
    // 커먼 소스셋의 공통 시그널링 로직
    val coroutineScope: CoroutineScope
    fun launchConnection() = coroutineScope.launch { /* ... */ }
    fun cancelConnection() { /* ... */ }
    // ...
}
```
> commonMain:Communicator.kt

이렇게 하면, 시그널링 관련 공통 구현을 커먼 소스셋에 두면서도 처음 짰던 방식보다는 좀 덜 위험한 형태로 작성된다.  
다만, 아래와 같은 Con 들이 있다.

- `interface` 는 기반 필드를 가질 수 없으므로 프로퍼티들의 초기화 로직은 소스셋 사이에서 중복된다.
- `interface` 내 추상 함수들의 실 구현체에는 `private` 가시성 수정자를 줄 수 없으므로, 이들을 구현하는 `Communicator` 클래스는 이 함수들에 대한 외부로부터의 접근을 제한할 수 없다.
- `expect`/`actual` `class` 는 Beta 단계에 있다. 일단 돌아가기는 하지만, Kotlin 내부 구현의 디자인이 별로 바람직하지 않아 갈아엎어질 것으로 계획되며 
  이 과정에서 Breaking Change 가 발생할 가능성이 있다고 한다. [관련 이슈](https://youtrack.jetbrains.com/issue/KT-61573)

다행히도 몇몇 Con 들은 아래와 같은 이유들로 무시할 수 있었는데:

- 복잡한 초기화 필드가 별로 없다. 다들 생성자를 통해 만들어주는 무언가들이었기 때문에.
- 비즈니스 로직이 이렇기는 하지만, 이들 중 UI 에서 가져다 쓰는 것은 몇 개 없고 애초부터 UI 랑 비즈니스 로직을 섞는건 바람직하지 않기 때문에
  UI 에서 사용할 UI 상태 몇 개를 포함하는 래퍼 클래스를 하나 추가해서 거기서 접근을 조절했다.
- UI 로직에서 사용하는 WebRTC 의 미디어 스트림 클래스가 플랫폼 로직에 갇혀있으므로, `class` 형태가 아니라면 구현이 불가능하다. 단순한 함수들만으로는 관리할 수 없기 때문에.

결론적으로는 일부 프로퍼티들의 초기화 구현이 중복되기는 하지만 나름 과하지 않은 범위 내에서 정리가 되었으며, 각 플랫폼 소스셋의 코드에서는 정말 WebRTC 의 로직에만 집중할 수 있었다.

## AppDelegate.kt
...를 할 수 있다면 좋았을 것이다.

결론부터 말하자면, 불가능했다. 가장 직접적인 원인은, Objective-C 의 클래스를 확장하는 Kotlin 클래스는 다시 Objective-C 에서 사용할 수 없다는 제한 때문이다.
Kotlin 의 클래스가 Objective-C 에서 사용이 가능하기는 하나, 문서에 따르면 두 가지의 제한이 존재하는데 그들 중 하나이다.

Swift 쪽 API의 설계 상 UIApplicationDelegate 를 등록하려면 해당 Delegate 를 확장하는 클래스의 인스턴스로는 불가능하고 반드시 클래스 자체의 타입을 사용해야하는데, 
이 조건에 필수불가결한 전제 조건이 바로 이걸 확장하는 Kotlin 클래스가 Objective-C 에 존재해야한다는 점이다.

그러나 Kotlin 에서 `UIApplicationDelegateProtocol` 을 구현하려면 `NSObject` 을 확장해야하고, 이는 이 클래스가 Objective-C 에서 사용할 수 없음을 의미했다.

즉, 아래와 같은 정의가 가능하지만 이 클래스가 Objective-C 에서 접근 가능하지 않다.

```kotlin
// NSObject 라는 Objective-C 클래스를 확장했으므로, 이 클래스는 Objective-C 에서 접근할 수 없습니다.
class AppDelegate: NSObject(), UIApplicationDelegateProtocol {
    override fun applicationDidFinishLaunching(application: UIApplication) { /* ... */ }
}

// 이거는 접근 가능합니다.
class SomeOtherClass
```

그러면 `NSObject` 를 확장하지 않는다면 어떨까? 그렇게 하면, 대략 10개 좀 넘는 수의 추상 함수를 직접 구현해야 한다.  
뭐 구현이야 해본다고 친다. 그러나 그 중 하나인 `conformsToProtocol(aProtocol: Protocol?): Boolean` 의 구현에서 문제가 발생한다.
이 `Protocol` 의 출처는 `objcnames.classes.Protocol` 인데, 이거 임포트해보면 일단 IDE 상에서는 있다고 하는데 빌드해보면 없다고 터진다.

즉, **`NSObject` 를 확장하면 Objective-C(Swift) 에서 못쓰고, 안하면 Kotlin 단에서 구현을 못한다.**

그렇기에, 조금 귀찮지만 Kotlin 단에서 어떤 클래스도 상속받지 않게 만들고, iOS 단에서 Swift 로 된 AppDelegate 를 만든 뒤, Swift 에서 Kotlin 의 것을 호출하도록 했다.


단, 만약 자신이 `applicationDidFinishLaunching` 등의 앱 실행과 관련하여 호출되는 메서드들을 무시해도 된다면, 아래의 기행을 사용할 수도 있다:

```kotlin
object AppDelegate: NSObject(), UIApplicationDelegateProtocol {
    init { UIApplication.sharedApplication.delegate = this }
    fun dummy() = true
    // ...
}
// 이름이 있는 object 는 지연되어 초기화되므로 아래 문장이 필요함
private val dummy = AppDelegate.dummy()
```

하지만... 이렇게까진 하고싶지 않다...

## AVAudioSession

이전 iOS 의 구현에서 해결하지 못했던 문제 중 하나는, '블루투스 이어폰을 포기하거나', 혹은 '블루투스 이어폰을 쓸 수 있지만 볼륨을 0으로 줄일 수 없다' 라는 것이었다.

이렇게 된 원인을 분석한 바, 아래와 같았다:

- RTCAudioSession 는 연결되는 시점부터 `AVAudioSession.Category` 를 강제적으로 `.playAndRecord` 로 설정한다.
- 이 `.playAndRecord` 가 마이크를 켜며, `AVAudioSession.Mode` 등을 통해 '통화 모드'인 것으로 인식하여 볼륨을 0으로 줄일 수 없게 하는 것으로 보였다.
- 그래서 RTCAudioSession 의 이러한 설정이 끝난 후 내가 직접 카테고리를 `.playback` 으로 설정하여 볼륨을 0으로 줄일 수 있게 했으나, 블루투스 이어폰을 연결할 시 RTCAudioSession 의 동작과 충돌하여 더이상 소리가 나지 않았다.

이 문제의 해결책은, 블루투스 이어폰을 연결한 직후에 한 100-300ms 정도 가량 블루투스 이어폰에서 소리가 났다는 점에서 찾았다.  

그렇다는 것은, 이 WebRTC.framework 도 블루투스 이어폰의 연결을 '감지' 하고 나서 무언가를 하려다가 문제를 일으킨 것일거고, 실제로 로그에 찍히는 내용도 그러했다. 
AVAudioSession 에 잘못된 모드와 카테고리를 설정하려고 했다는 로그를 찍은 것이다(유구한 50 오류...).

그리하여, RTCAudioSession 이 '블루투스 이어폰을 연결했다'라는 사실을 '감지'해낼 수 없도록, 아래 코드를 사용하여 RTCAudioSession 에 추가된 observer 를 제거해버렸다:

```kotlin
NSNotificationCenter.defaultCenter
    .removeObserver(
        observer = RTCAudioSession.sharedInstance(),
        name = AVAudioSessionRouteChangeNotification,
        `object` = null
    )
```

다행히도 이 Observer 는 `RTCAudioSession.sharedInstance()` 가 처음 호출될 때, `RTCAudioSession` 인스턴스가 초기화되면서 한 번만 추가되는 것으로 보였다.
즉, 언제 이 Observer 가 추가되는지를 추적하여 그 뒤에 불러줄 필요가 없음을 의미했다.

그렇게 했더니, 카테고리가 `.playback` 인 상태로 볼륨을 0까지 줄일 수 있으며 블루투스 이어폰도 사용 가능한 상태가 되었다.
물론 RouteChange 이벤트를 아예 받지 못하도록 치워버렸으므로 다른 무언가의 로직이 실행되지 않아 생길 문제도 무시할 수 없겠지만, 당장은 딱히 확인할 수 있는게 없었으므로.


## 삽질

이제부터는 이거 하면서 마주쳤던 두 가지 삽질을 얘기해보려고 한다.  

### iOS - RTCMTLVideoView

어째선지 분명히 WebRTC 가 모두 연결됨(IceConnectionState - Connected) 인데, 그래서 소리까지도 나는데, 영상만 안나왔다.  
`object: NSObject(), RTCVideoRendererProtocol` 를 사용하여 프레임을 찍어봐도 모두 잘 받고 있다고 하는데, 아무튼 시커먼 화면만 나오고 안나왔다.

뷰 크기가 제로인가? 찍어보면 유효한 값이 나온다. 뷰가 추가가 안되었나? 그렇다면 이건 Compose 의 문제이나, 딱히 그래보이지는 않았다.

원인은... 레이어가 달라서였다. 이걸 확인하게 된 때는, 앱에 깔려있는 Compose UI 들의 배경화면을 하나하나 지워보던 중에였다.
모든 UI 에 깔려있던 `.background()` 수정자들을 모두 지우고 나니 영상이 보이기 시작했다.

분명히 Compose 계층 상으로 이 UIKitView 밑에 있는 뷰들도 RTCMTLVideoView 의 위에 그려진다.  
아마도, 렌더링 효율성이나 기타 어떤 iOS 내부적인 요소로 인해 Compose 가 그리는 레이어와 RTCMTLVideoView 가 그리는 레이어가 서로 별개인 모양이었다.

다행히도 앱에 깔리는 배경색이 그렇게 많지 않았고, UIKitView 에 UIView 를 사용하여 배경색을 깔면 문제없이 돌아가기에 그렇게 하기로 한다.


### RTCMTLVideoView, SurfaceViewRenderer 와 `.blur()`

어느정도 예상은 했지만, 단순한 뷰가 아니라 Metal 및 EGL 을 통해 렌더링하는 컨텐츠이기 때문에 `.blur` 수정자가 먹히지 않았다.  
물론 `.graphicsLayer { renderEffect = BlurEffect(...) }` 도 먹히지 않았다.

`RTCMTLVideoView` 는, iOS 에서 Swift 로 구현했던 것 처럼 UIBlurEffect 를 Kotlin 으로 재작성하여 해결했다:

```kotlin
class IntensityUIVisualEffectView(
    effect: UIVisualEffect = UIBlurEffect.effectWithStyle(UIBlurEffectStyle.UIBlurEffectStyleDark),
    enabled: Boolean = true
) : UIVisualEffectView(effect = null) {

    var enabled = enabled
        set(value) {
            field = value
            blurAnimator.reversed = !value
            blurAnimator.startAnimation()
        }

    private val blurAnimator = UIViewPropertyAnimator(
        duration = 0.3,
        curve = UIViewAnimationCurve.UIViewAnimationCurveLinear,
        animations = { this.effect = effect }
    ).apply {
        reversed = !enabled
        fractionComplete = 1.0
        pausesOnCompletion = true
    }

}
```

이 뷰 인스턴스의 `enabled` 프로퍼티를 토글하면 블러 효과가 업데이트된다.  
다행히 필터 퀄리티도 준수하고, radius 가 애니메이팅되어 변하는데 성능적인 면에서도 나쁘지 않았다.

`SurfaceViewRenderer` 가 문제였다. 딱히 이런 무언가를 위해 지원되는 네이티브 구현이 없었기 때문에(적어도 몇십 분 정도 검색한 결과 안에서는).  
생각할 수 있는 대안은 블러가 필요할 때 렌더링된 결과를 캡쳐하여 `Image` 구성가능함수에 전달하고, 거기에 수정자를 붙히는 방법이었다.  

놀랍게도 이런 구현은 Android 한정이지만 `Picture` 를 통해 가능했다. Compose 의 `Canvas` 는 `nativeCanvas` 프로퍼티를 통해 Android 의 `Canvas` 에 접근할 수 있게 되어있으며, 
이를 통해 `Picture` 에 `Canvas` 의 내용을 그린 뒤 `Bitmap` 으로 변환 가능했다.

> 이 글을 작성하면서 확인한 사실인데, Compose 1.7.0 부터는 비-Android 상황에서도 지원되는 GraphicsLayer API 도 제공된다.
> `rememberGraphicsLayer()` 및 `GraphicsLayer.record()`, `GraphicsLayer.toImageBitmap()` 함수 등이 있다. Picture 와 유사한 형태다~~정지 함수 하나가 껴있지만~~.

그리고... 이걸 다 구현한 뒤에 알게된 사실이지만 `View.drawToBitmap()` 이라는 함수도 있었다. 지금 그리려는건 Compose 의 뷰가 아닌 네이티브 뷰이므로, 이걸 사용해도 되는 상황이었다.

그런데, **안됐다**. 이 구현**들**로 `Bitmap` 을 따보면, 그냥 전체가 투명 픽셀로 채워진 크기만 맞는 이미지 하나가 나온다.

결론적으로는, `PixelCopy` 라는 별도 API 를 사용해야했다. `Surface` 들에 대한 특별한 API 인걸로 보인다.  
아무튼 인터넷 검색~~stackoverflow~~ 에서 코드를 긁어다 붙히니 정상적으로 렌더링된 결과가 넘어왔다. 아래에 그 코드 일부를 남겨본다:

```kotlin
bitmap = suspendCancellableCoroutine { continuation ->
    val capturedView = view ?: return@suspendCancellableCoroutine continuation.resume(null)
    val newBitmap = Bitmap.createBitmap(capturedView.width, capturedView.height, Bitmap.Config.ARGB_8888)
    val listener = PixelCopy.OnPixelCopyFinishedListener { continuation.resume(newBitmap.asImageBitmap()) }
    PixelCopy.request(capturedView, newBitmap, listener, capturedView.handler)
}
```

이걸 가져와서 Image 에 붙혔더니, 잘 나왔다.
나왔는데, 문제는... `.blur()` 수정자를 붙히지 않았는데도 블러링된 형태로 표시되었다는 점이다.

이건 솔직히 모르겠고... 아무튼 되었으니 넘어갔다.


거의 네이티브 뷰와 관련된 것들이다. 이 케이스들이 좀 코너 케이스에 가까운 것도 물론 맞으므로... 얻을 수 있는 이점에 비해 이정도는 감수할 법 하다고 본다.
다만 완벽하게 Compose 가 제공하는 UI 만으로 모든것을 할 수 있다면 상관 없겠으나, `AndroidView` 나 `UIKitView` 등을 사용한다면 뭔가 망가진다거나 의도하지 않은 동작을 할 수도 있어보인다.

## 후기

이번에는 뭔가 맨땅에 헤딩이라기 보다는, '이게 진짜 될까?' 를 직접 두 눈으로 확인해볼 수 있는 시간이었던 것 같다.

Kotlin 에 Objective-C 및 C 상호운용성이 있다는 건 기존에 어렴풋이는 알고 있었고, Compose 가 UIKitView 및 AndroidView 를 통해 네이티브 뷰를 사용할 수 있다는 것도 어느 정도는 알고 있었다.

의외로 너무나도 순탄하게 진행되어서, 솔직히 굉장히 신기했다. 이게 진짜 이렇게 아무런 문제 없이 되네. 이걸 바인딩을 만들어주네... 같은 부류의.

맨땅에 해딩같은게 아니었기 때문에, 소스코드의 퀄리티(?)도 나름 만족할만한 수준으로 나왔다. 한 가지 아쉬운 점은 git 셋업을 안해놔서 버전 기록이 하나도 없다는 것이다.

그렇지만 일단 일부 파일들을 걸러내고 git 에 [1커밋 짜리 저장소](https://github.com/hoonkun/CKremote-Client)로 올렸다.


그리고, 이번 프로젝트는 화면이 많지 않아 크게 와닿지 않는 문제였지만 아직 쓸만한 공식에서 낸 멀티플랫폼에 호환되는 **안정된** 네비게이션 라이브러리가 없다는 것도 조금 리스크로 작용할 수 있어 보인다.  
안드로이드는 Compose 와 네비게이션을 상호운용할 수 있는 라이브러리가 있는데, iOS 는 그렇지 않다. 그렇기 때문에 Decompose 같은 서드파티를 써야하는데, 역시 아직은 신뢰하기 힘들다.

일반적인 앱 개발에서는 화면이 많기 떄문에, 이런 네비게이션 라이브러리의 부재는 꽤 큰 리스크로 작용할 수 있다고 생각한다.


뭐, 아무래도 좋다. 아무튼 이번에 프론트에서 하려고 했던 것은 굉장히 성공적으로 끝이 났다.

expect/actual 에 익숙해졌고, iOS 의 cocoapods 관련 종속도 Kotlin 에서 사용해볼 수 있었으며, 기타 Native View 들과의 연계도 구현해볼 수 있었다.

너무 순탄하게 잘되어서 오히려 무서울 정도였던 것 같다. 컴포즈로 짠, 어느정도의 완성품이 나온 첫 모바일 프로젝트였던 것 같다.
