---
author: HoonKun
title: Swift 로 macOS 에서 Spine을 렌더링하는 라이브 배경화면을 만들어보자 
date: 2023-08-24, 21:22
categories: [dev, dev-others]
---
기존에 Qt+Qml 로 작성했던 것을, 조금 편하게 살기 위해 WKWebView 를 사용한 Swift 어플리케이션으로 재작성한 후기.
<!-- Excerpt -->

## 서론
기존에 [이런 게시글](/posts/retrieve/2023-08-24-live-wallpaper-in-macos)을 작성한 적이 있었다.
이 때는 Qt+Qml 을 사용하였고, 즉 Cpp 기반의 프로그램이었다.  

당연히 C 기반의 언어와 친하지 않은 나로써는 유지보수하기가 불가능에 가까웠고, 빌드 하는데만 수많은 벽과 마주쳐야했다.
거기에 Qml 은 미리 보기도 굉장히 귀찮기 때문에... 더이상 손댈 수 없는 수준이었다.

기존에 Cpp 쪽 (Qt)를 선택했던 이유 중 하나는, Cpp 가 아무래도 C 기반이므로 빠르고 CPU 를 덜 잡아먹을 거라고 예상해서였다.
더해서, Spine 런타임 구현체와 관련하여 Swift 네이티브 라이브러리도 지원하는 쓸만한게 없기도 했다.

그러나 Spine 은 WebView 라는 흑마술을 통해 거의 아무곳에서나 쓸 수 있는 JS 런타임을 제공해주고 있었고, 이렇게 만들어놓고 손도 못대느니
조금이라도 내가 손댈 수 있게끔 다시 짜고 그 반동으로 느려지거나 한다면 그에 대한 최적화같은걸 더 해보고싶었다.

그리하여 WebView 를 사용하면서 기존 라이브 배경화면과 동일하게 동작하는 Swift macOS 어플리케이션을 개발해보게 된다.

## 개발 목표

생각보다 간단명료했다.
- 결과물이 기존과 동일하게 동작할 것:
  - 로그인 시 자동으로 실행될 것
  - DesktopWindow 레이어에 깔리고, UIElementApplication 으로 취급될 것
  - SwiftUI 를 사용하고, 생긴게 기존과 같을 것
- 패키징이 간편할 것:
  - XCode 의 재생버튼을 누르면 실행될 것
  - XCode 에서 Archive 를 하면 곧바로 `.app` 디렉터리가 산출될 것

다시말해, SwiftUI 를 사용하는 어플리케이션으로 다시 개발하겠다는 뜻이다.

## 짜보자!

### 사전 초기화 처리와 윈도우들의 겹침 판정

사실 기존 CPP 에서 했던 C 코드들은 웬만해서는 Objective-C 에서 그대로 사용할 수 있고, 결론적으로 Swift 에서도 사용할 수 있다.~~UnsafeRawPointer로 점철되기는 하지만~~
그리고 Swift 로 작성되는 macOS 어플리케이션에는 `AppDelegate.applicationDidFinishLaunching` 이라는 아주 좋은 이벤트를 붙잡을 수 있다.

즉, 아래의 함수를 `applicationDidFinishLaunching` 에서 호출해주면, 어플리케이션을 DesktopWindow 레이어에 깔고 UIElementApplication로 취급하게 할 수 있다.

```swift
func moveToUiElementLayer() -> Int {
    // 앱을 UIElement 로 취급하게 하여 Dock 이나 Alt+Tab 메뉴에서 보이지 않게 합니다.
    var number = ProcessSerialNumber(highLongOfPSN: 0, lowLongOfPSN: UInt32(kCurrentProcess))
    TransformProcessType(&number, ProcessApplicationTransformState(kProcessTransformToUIElementApplication))
    
    // 윈도우의 타이틀 바나 배경색, 경계선 등을 삭제하여 뒤쪽 배경화면이 보이게 합니다.  
    let window = NSApplication.shared.windows.first!
    window.toolbar?.isVisible = false
    window.isOpaque = false
    window.backgroundColor = .clear
    window.styleMask = .borderless
    window.canBecomeVisibleWithoutLogin = true
    window.hidesOnDeactivate = false
    window.hasShadow = false
    
    // 윈도우를 DesktopWindow 레이어에 깔아 마우스로 드래그하여 이동하거나 상호작용할 수 없게 합니다.
    window.level = .init(rawValue: Int(CGWindowLevelForKey(CGWindowLevelKey.desktopWindow)))
    
    return window.windowNumber
}
```
> WindowLayerManager.swift

그리고, 기존에 항상 Spine 뷰를 렌더링하던 것에서 다른 윈도우가 Spine 뷰를 완전히 가리면 어차피 보이지 않는 상태이므로 렌더링하지 않게 했다.
이는 `CGWindowListCopyWindowInfo` 함수를 사용했으며, 모든 접근할 수 있는 윈도우의 id, number, bounds 등을 가져와 Spine 뷰와 겹치는지 판단하여 뷰를 숨기는 역할을 하도록 구현했다.

`CFDictionary.valueOf` 나 `CFArray.valueAt` 은 `CFDictionaryGetValue` 와 `CFArrayGetValueAtIndex` 를 사용한 익스텐션이며
이들이 리턴하는 `UnsafeRawPointer` 에 대해 사용된 `.as*(OrNull)` 함수는 `unsafeBitCast` 를 해주는 익스텐션이다.

위의 ~~Unsafe지옥~~익스텐션들을 통해 윈도우의 위치/크기를 가져와 비교 대상인 `detectionRect` 와의 겹침을 확인하고 `delegate` 를 통해 이벤트를 전파하는 코드이다:

```swift
func checkWindowIntersection() {
    guard let detectionRect else { return }
        
    let windowFilters = 0
        | CGWindowListOption.excludeDesktopElements.rawValue // 다른 데스크톱 요소(상태 바, Dock 등)를 제외
        | CGWindowListOption.optionOnScreenOnly.rawValue     // 최소화된 윈도우들을 제외
    
    guard let windows = CGWindowListCopyWindowInfo(.init(rawValue: windowFilters), kCGNullWindowID) else { return }
    
    var _isCompletelyHidden = false
    var _isPartiallyHidden = false
    
    for i in 0 ..< windows.size() {
        if (_isCompletelyHidden && _isPartiallyHidden) { break }
        
        let window = windows.valueAt(i).asCFDictionary()
        let windowNumber = window.valueOf(key: kCGWindowNumber).asNSNumberOrNull()
        
        if myWindowNumber == windowNumber?.intValue { continue }
        
        // 몇 가지 예외 사항에 해당하는 윈도우는 체크하지 않고 넘어갑니다.
        if let windowOwnerName = window.valueOf(key: kCGWindowOwnerName).asNSStringOrNull() {
            let isDock = windowOwnerName == "Dock"
            let isScreenCapture = windowOwnerName == "스크린샷"
            let isNotificationCenter = windowOwnerName == "알림 센터"
            
            if isDock || isScreenCapture || isNotificationCenter { continue }
        }
        
        // 모든 조건을 만족한 윈도우에 대해, detectionRect 를 가리는지 확인합니다.
        guard let windowBounds = window.valueOf(key: kCGWindowBounds).asCFDictionary().toCGRect()?.statusbarAdjusted() else { continue }
        
        if !_isCompletelyHidden {
            _isCompletelyHidden = detectionRect.isCompletelyHidden(by: windowBounds)
        }
        
        if !_isPartiallyHidden {
            _isPartiallyHidden = detectionRect.isPartiallyHidden(with: windowBounds)
        }
    }
    
    if isCompletelyHidden != _isCompletelyHidden {
        isCompletelyHidden = _isCompletelyHidden
        delegate?.onCompletelyHiddenStateChanged(withState: isCompletelyHidden)
    }
    if isPartiallyHidden != _isPartiallyHidden {
        isPartiallyHidden = _isPartiallyHidden
        delegate?.onPartialHiddenStateChanged(withState: isPartiallyHidden)
    }
}
```
> WindowIntersectionDetector.swift

이제 이 함수를 `Timer` 같은 곳에 붙혀 주기적으로 실행되게 하고, `delegate` 에 UI 상태를 업데이트하는 로직을 연결하면 Spine 뷰가 윈도우에 가려질 때 UI를 제거하여 가려져서 안보이는 동안 낭비되는 CPU와 렌더링 연산량을 최소화할 수 있다.

### WKWebView

대략 Spine 공식 문서의 JS 런타임에 관련한 내용을 거어의 그대로 차용할 수 있다.

1. 우선 실제 내용을 표시할 HTML 파일이 필요하다. 
   1. 일반적으로 spine 관련 JS 파일은 cdn 을 통해 가져오지만, 켜진 직후에 인터넷이 있을리 만무하므로 직접 JS 컨텐츠를 다운로드받아 별도 .js 파일로 번들에 추가하도록 한다. (그리고 어차피 별도 가공도 해야한다.)
   2. 이미지를 포함하여 각종 에셋(sprite atlas, skeleton binary, sprites)들은 HTML 에서 직접 참조가 어렵다. 그러므로... 모든 에셋 데이터를 base64 로 인코딩한 뒤, .js 에 때려넣는다. 놀랍게도 이렇게 해도 아무런 문제가 없다!
   3. 기존에 제공되는 Spine JS 런타임은 base64 를 직접 때려넣는 것을 지원하지 않으므로, 적절히 다운받은 .js 파일에서 `var AssetManagerBase` 를 검색으로 찾아 이러한 형태의 에셋을 핸들링할 수 있는 함수를 추가한다.
      ```javascript
      var AssetManager = class {
          // ...
          // loadText 대신 사용합니다.
          loadBase64Text(path, text) {
              path = this.start(path);
              this.success(null, path, atob(text))
          }
          // loadTexture 대신 사용합니다.
          loadBase64Texture(path, base64, success = null, error = null) {
              this.start(path);
              let image = new Image()
              image.onload = () => this.success(success, path, this.textureLoader(image))
              image.onerror = () => this.error(error, path, `Couldn't load image: ${path}`)             
              image.src = `data:image/png;base64,${base64}`
          }
          // ...
      }
      ```
   4. 이제 HTML 을 구성하기 위한 모든 준비가 끝났다. Spine 문서대로 canvas 와 렌더링 로직을 추가한다.  
      - `AssetManager` 에 atlas 와 binary 를 추가할 때는 3에서 만든 함수를 사용하도록 한다.  
      - `canvas` 의 `width` 와 `height` 는 Swift 의 `WKWebView` 에 지정되는 너비/높이와 동일하도록 설정한다.
2. 여기까지 왔다면 `index.html`, `resources.js`, `spine-webgl.js` 세 개의 파일이 생겼을 것이다. 이들을 모두 앱 번들에 포함하도록 설정한다.
3. `WKWebView` 를 SwiftUI 에서 사용할 수 있도록 하는 래퍼를 만들고, 이 뷰를 UI 상의 적절한 위치에 추가한다.  
   - 위의 `WindowIntersectionDetector` 와의 연결을 위해, 적절히 `GeometryReader` 를 사용하여 `detectionRect` 에 아래 View 의 매트릭스를 전달해준다.
   ```swift
   struct SpineSkeleton: NSViewRepresentable {
       func makeNSView(context: Context) -> some NSView {
           let view = WKWebView()
           view.underPageBackgroundColor = .clear
           view.setValue(false, forKey: "drawsBackground")
           view.loadFileRequest(
               URLRequest(url: URL(fileURLWithPath: Bundle.main.path(forResource: "index", ofType: "html")!)),
               allowingReadAccessTo: URL(filePath: Bundle.main.resourcePath!)
           )
           return view
       }

       func updateNSView(_ nsView: NSViewType, context: Context) { }
   }
   ```
   만약 SwiftUI 로부터 상태를 입력받고싶다면 `updateNSView` 와 `view.evaluateJavascript` 를 적절히 활용하면 된다.
4. 마지막으로, 프로젝트 설정의 `Signing & Capabilities` 영역에서 `Outgoing Connections (Client)` 에 체크한다.

이렇게 하고 나면 SwiftUI 와 HTML 을 통해 Spine Skeleton 이 표시되고 움직인다!  
그리고 추가해보고 나서 안 사실인데, cpp 로 돌릴 때나 웹뷰로 돌릴 때나 CPU 점유율은 유의미하게 차이가 나지 않는다. 둘 다 겁나 많이 먹는다...

### 나머지?

나머지는 지루한 SwiftUI 코딩일 뿐이다. 어디에 텍스트를 배치하고, 어디에 사각형이나 다른 이미지를 표현하고...  
다행히도 SwiftUI 는 `#Preview` 를 통해 빌드하지 않아도 미리 볼 수 있으므로 작업이 수월했다.


## 결과물

![완성품](...image_base.../output.jpg)

대략 이런게 나왔다. 배경 이미지는 macOS 의 환경설정에서 설정한 배경화면이 그대로 보이고, 그 위에 별도 Spine 의 스켈레톤이 표시되는.  
필요하다면 배경 이미지에도 Spine 을 붙혀서 움직이게 할 수 있을 것이다(WebView 를 하나만 더 쓰면 되므로).
오... 오 이거 괜찮겠다. 배경에도 Spine 붙혀볼까 ~~지옥의 시작~~

처음에 목표했던 것들도 모두 달성했다:

- 이제 자유롭게 건드리고 유지보수할 수 있다! UI 요소를 이동시키거나 추가하거나가 자유롭다!
- 빌드는 Archive 메뉴에서 버튼 한 번 누르면 끝이다! 바로 `.app` 이 뽑히고 이걸 로그인 시 시작 항목에 추가하면 끝이다!
- 기존과 완전히 동일하게 동작한다!

한가지 아쉬운 점은 결국 Qt 로 작성된 CPP 코드는 영원히 이해하지 못하게 되었다는 것이다. 언젠가 더 정진해서 이 코드를 볼 수 있는 날이 오면 좋을텐데.
