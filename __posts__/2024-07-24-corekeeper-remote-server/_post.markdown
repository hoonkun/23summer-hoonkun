---
author: HoonKun
title: Core Keeper 리모트 플레이 개발 - 서버편
date: 2024-07-24, 21:07
categories: [dev, backend, dev-others]
---

Kotlin + Python (+ Shell Scripting) / Ktor + WebRTC + GStreamer + coturn 모든게 합쳐진 키메라같은 프로젝트

<!-- Excerpt -->

~~사진은 코어키퍼 머신이 된 이전 노트북~~

## 서론
은 [이 게시글](/posts/retrieve/2024-07-25-corekeeper-remote) 에서 좀 더 자세히 확인하실 수 있다.
여기서는 서버의 개발에 대한 후기를 중점적으로 작성하므로, 프론트가 궁금하다면 [여기](/posts/retrieve/2024-07-24-corekeeper-remote-client)로 가보자!

대략, **Windows 와 Linux 만 지원하는 Core Keeper 라는 게임을 휴대폰에서 플레이하고 싶어서 만든, 리모트 플레이어 앱의 백엔드 개발 후기** 이다.

## 구성
우분투로 구성된 서버에는 대략 아래에 나열된 것들이 돌아간다:
### 스팀 + 코어키퍼 게임  
당연하지만 실제로 겜을 돌리는 애는 이 서버다. 서버로부터 화면을 받고 클라이언트는 입력을 얘한테 던져서 플레이한다.

### 메인 플레이어 서버  
얘가 이번 글의 주인공이다. 온갖 기술과 언어가 짬뽕된 키메라같은... 잡탕.   
하나의 jar 파일로 패키징되며 `java -jar` 로 실행할 수 있는 애다.
- **시그널링 웹소켓 서버**  
  ktor 로 구성된 웹소켓 서버로, WebRTC 의 시그널링을 맡는다.
- **화면 녹화 및 WebRTC 로의 핸들링**  
  모두 GStreamer 가 담당한다. GStreamer 의 Java 바인딩을 Kotlin JVM 에서 사용했다.
- **가상 조이스틱 에뮬레이터**  
  가상 조이스틱 입력을 만들고, 클라이언트가 WebRTC 의 데이터 채널로 던지는 입력을 받아 만든 가상 입력에 넣는다.  
  Python 의 uinput 바인딩을 사용했다.
- **윈도우 위치 유틸리티**  
  클라이언트와 원격 모니터의 화면 비율이 다르므로, 그것을 맞춰주기 위한 유틸리티.
  코어키퍼 윈도우의 크기를 적절히 클라이언트 화면 비율에 맞게 조정한다.

그리고 아래에서 따로 설명하겠지만, 별도 외부 서버에 coturn 서버가 올라간다.

## 시그널링 웹소켓 서버
Kotlin 로 작성된, ktor 프레임워크 위에서 돌아가는 웹소켓 서버다.  

제일 익숙하고, 작은 규모의 프로젝트에서 쓰기에 이것만큼 편한게 없어서 빠른 구성을 위해 선택했다.  
진짜 웹소켓이 뭔지랑 Kotlin 이라는 언어만 알아도 바로 가져다 쓸 수 있는 무언가다. Spring 같은 애들은 의존성 주입이니 뭐니 MVC니 뭐니 이런거 신경써야하는데 솔직히 귀찮다.  

서버의 역할은 간단한 초기 접근제어 이후 **WebRTC의 메시지를 교환할 수 있게 하는 것**이다.  
아무나 이 웹소켓 서버에 접근할 수 있다면 아무나 내 서버에 내 스팀 계정으로 리모트 플레이를 할 수 있다는 의미가 되므로, 최소한의 접근제어는 붙여야 한다.  

그러고 나서는, 이 웹소켓을 통해 서버가 곧바로 클라이언트에게 Offer 를 보내고 클라이언트로부터 Answer 를 돌려받으며, IceCandidate 를 주고받는다.  
그렇게 모든 Candidate 교환이 끝나면 클라이언트와 GStreamer 의 WebRTCBin 을 통해 연결되며, GStreamer 가 내보내는 영상 및 소리를 클라이언트에서 들을 수 있게 된다.

---

웹소켓에서 이번에 고민했다고 할 수 있을 법한 사항은 직렬화/역직렬화이다.  

일반적으로 소켓 메시지를 Json 으로 주고받기는 하지만, Kotlin 의 Serializer 는... 말하자면 Typescript 의 합집합 타입(Union type)같은걸 편리한 방법으로 지원하지는 않는다.  
얘를 들어 아래와 같은 두 메시지 타입이 있다고 생각해보자.

```kotlin
@Serializable
data class Offer( 
    val type: String, // is always "offer"
    val sdp: String
)

@Serializable
data class Answer(
    val type: String, // is always "answer"
    val sdp: String
    val someOtherProperty: Int
)
```

즉, Json 의 type 필드가 어떤 메시지인지를 정의하고 나머지 필드가 그 내용인 경우다.  
이런 메시지들을 핸들링하려면 Kotlin Serializer 의 역직렬화 로직을 커스텀해야한다.

하지만 그러기는 귀찮았다. 그래서, 이번에는 봉인된 인터페이스(sealed interface)와 어노테이션, Kotlin 의 리플렉션을 사용해서 역직렬화를 해봤다.

```kotlin
@Serializable
sealed interface Frame

@Serializable
sealed interface WebRTCFrame: Frame

annotation class Header(val value: String)

@Serializable @Header("init")
data class Init(
    val someProperty: String
): Frame

@Serializable @Header("offer")
data class Offer(
    val sdp: String
): WebRTCFrame

@Serializable @Header("answer")
data class Answer(
    val sdp: String,
    val someOtherProperty: Int
): WebRTCFrame
```

메시지는 이렇게 정의한다. 두 메시지가 봉인된 인터페이스인 `Frame` 을 확장하며, `@Serializable` 어노테이션과 함께 `@Header` 어노테이션을 갖는다.  

메시지의 수신 형태는 아래와 같다:

```text
offer { "sdp": "v=0\r\n ..." }
answer { "sdp": "v=0\r\n ...", "someOtherProperty": 0 }
```

지금은 Json 을 역직렬화 하지 않고 '파싱'만 할 수 있는 라이브러리까지 쓰기 귀찮아서 이렇게 구조를 변경했는데, 만약 Jackson 같은 것을 쓰고 있다면 
그것을 가져다가 역직렬화 없이 안전하게 type 필드의 값을 가져올 수 있으므로 타입을 Json 밖으로 빼낼 필요가 없다.

디코딩은 아래처럼 한다:

```kotlin
val <T: Any>KClass<out T>.allDescendentSealedSubclasses: List<KClass<out T>>
    get() = sealedSubclasses.flatMap { if (it.isSealed) it.allDescendentSealedSubclasses else listOf(it) }

inline fun <reified T: Frame>decodeFromString(payload: String): T {
    val (header, payload) = payload.split(" ", limit = 2)
    val type = T::class.allDescendentSealedSubclasses
        .firstOrNull { header == it.annotations.filterIsInstance<Header>().first().value }
        ?.createType()
        ?: throw RuntimeException("no deserializable data class with given header: $header")

    return Json.decodeFromString(serializer(type), payload) as T
}
```

그리고 실 사용은 아래처럼 한다:

```kotlin
val frame: Frame = decodeFromString(content)

when (frame) {
    is Init -> { /* handling Init */ }
    is Offer -> { /* handling Offer */ }
    is Answer -> { /* handling Answer */ }
}
```

이렇게 하면, `Frame` 인터페이스가 '봉인'되었으므로 `when` 구문의 가지(branch)에 누락된 것이 있으면 컴파일 에러가 발생한다.  
예를 들어 위의 예제에서 `when` 의 세 가지 중 `Offer` 가지를 지우면 바로 컴파일 에러가 발생한다.  
즉, **핸들링이 누락되지 않도록 보장된다**.  

게다가 이 방법의 환상적인 점은, 만약 들어오는 content 가 어떤 종류의 것인지 어느정도 유추가 가능하거나 반대로 **'어떤 종류만 와야한다'고 제한해야 한다면, 봉인된 인터페이스를 세분화**하여 목적을 달성할 수 있다는 점이다.

만약 어떤 위치의 로직에서는 'WebRTC 와 관련한 메시지만 받겠다' 라고 한다면 아래처럼 작성할 수 있다.

```kotlin
val frame: WebRTCFrame = 
    try { decodeFromString(content) }
    catch (e: RuntimeException) { return }

when (frame) {
    is Offer -> { /* handling Offer */ }
    is Answer -> { /* handling Answer */ }
}
```

이 때 만약 `content` 가 `init` 타입이라면, `decodeFromString` 에서 위의 디코딩 코드에서 확인할 수 있는 `RuntimeException` 예외가 발생한다.
그렇기 때문에, `frame` 은 안전하게 `WebRTCFrame` 로 유추될 수 있으며 즉 `when` 구문에서 `WebRTCFrame` 만 핸들링하면 된다.

더해서, **더이상 데이터의 내용 정의에 이 타입이 뭔지를 적을 필요가 없다**.  
즉, `data class` 안에 더이상 type 과 관련된 프로퍼티가 없다. 이미 클래스의 타입이 그것을 잘 설명하기 때문이다.  

기존처럼 Serializer 의 행동을 커스텀해서 `String` 타입을 가지는 `type` 프로퍼티가 있었다면, 
실수로 `type` 문자열에 맞지 않는 데이터로 역직렬화할 가능성이 있으며 실제 데이터의 사용 측에서는 별로 궁금하지 않은 내용이 데이터 클래스에 포함된다.

--- 

나머지는... 정말 간단한 것들로, [공식 문서](https://ktor.io/docs/server-websockets.html)를 보면 알 수 있는 것들 뿐이다.


## 화면 녹화 및 WebRTC 로의 핸들링

GStreamer 를 사용했다. 이번에 처음 써보는 무언가...다.  
사실 그렇기에 아직 많은 것을 알지 못한다. 이 바닥에서 뭔가를 배우면 항상 처음엔 '이걸 하면 이게 된대!'이고 
좀 길게 하다보면 이게 왜 이따구지? 하면서 '이게 왜 이렇게 되지?' 를 궁금해하는 시기가 오는데, 아직 거기까진 안갔다.  

이번에 안 것이라고는, GStreamer 는 양 끝에 입력과 출력이 있고 여러 요소를 가지는 파이프라인으로 이루어진다는 것이다.  
여러 입력을 하나의 중간 요소로 이을 수도 있으며, 반대로 하나의 중간 요소에서 나온 결과를 여러 출력으로 나눌 수도 있다.  

이번 케이스에서는, 원격 서버의 화면에서 나오는 '영상 소스(ximagesrc)'와 시스템에서 발생하는 소리인 '음성 소스(pulsesrc)'를 여러 중간요소를 거쳐 하나의 출력인 'WebRTCBin' 으로 연결했다.

물론 중간중간에 로우 데이터를 h264로 인코딩하거나 rtp 형태로 변환하는 중간 요소들이 개입하며, 음성은 샘플링 관련 요소도 개입한다.   

실제 구현은 GStreamer 의 Java 바인딩을 Kotlin 에서 사용했으며, 다행히 이 바인딩에 WebRTCBin 과 관련한 구현도 있었다.  
단지, 결국에 GStreamer 는 C 기반이며 그것을 Java 에 붙힌 것이기 때문에 타입이나 레퍼런스 처리가 그닥 깔끔하지 않았다.  
GStreamer 로 emit 하는 이벤트의 종류나 타입같은걸 전혀 알 수 없고, 이 이벤트가 뭘 리턴하는지, 혹은 아무것도 리턴하지 않는지에 대한 정보가 단순히 코드만 보면 전혀 알 수 없다.  
그래서 GPT 한테 묻거나, 혹은 스택오버플로우에서 2017년에 작성된 게시물의 바다를 헤엄쳐야했다.  

아래같은 발버둥도 쳐보긴 했지만... 어차피 베이스가 그런 이상 어쩔 수 없다고 생각한다:

```kotlin
private inline fun <reified T: NativeObject>Element.returningEmit(
    signal: String, 
    vararg arguments: Any?
) =
    emit(T::class.java, signal, *arguments)

private inline fun <reified T: Element>Pipeline.getElement(
    name: String
) =
    getElementByName(name) as T

private inline fun <reified T: GstAPI.GstCallback>GstObject.connect(
    listener: T
) =
    connect(T::class.java, listener, listener)
```

---

WebRTC 의 측면에서는, 적어도 서버에서는 그다지 특별한게 없었다.  
소켓을 통해 Offer-Answer-Candidate 를 모두 끝내고 나면 서버는 알아서 자기 영상 및 소리를 내보내고 있었다.  

단지, 서버가 네고시에이션 이후로 클라이언트로부터 받는 유일한 입력인 '컨트롤러 입력'을 조금이라도 더 빠르게 핸들링하기 위해, WebRTC 의 데이터채널을 이용했다.  

WebSocket 은 TCP 연결이고, WebRTC 의 DataChannel 은 UDP 연결이다. 즉, 일반적으로 후자가 더 빠르다(쓰는 입장에서는 거의 차이가 안나기는 하겠지만).  
게다가 이런 입력은 매우 짧은 시간에 굉장히 많이 들어오기 때문에, 기존의 소켓과 동일하게 Json 으로 직렬화하기에는 너무 데이터 크기가 커진다.  

그래서 명확하게 영역을 나누고 속도를 확보하기 위해 데이터 채널을 사용했다.

### TURN 서버

개발을 한창 할 때는, 서버도 내부망 안에 있고 클라이언트도 내부망 안에 있었기에 그다지 이상한걸 못느꼈다. 속도도 굉장히 빨랐다. ~~당연한 얘기를!~~

그러나 이 시나리오는 둘 중 하나라도 밖으로 나가면 망가진다. WebRTC 는 자기 자신이 어디에 있는지를 Candidate 로 교환하는데, 
하나는 내부망 안에 숨어있고 하나가 그 밖으로 나가버리면 서로 접근할 수 없는 것으로 간주한다. 암만 공유기로 포트포워딩을 해도 의미가 없다.

그리하여 turn 서버 하나를 두기로 한다. 다행히 coturn 이라는 아주 좋은 docker-compose.yml 가 ~~누군가에 의해~~ 제공되어 그것을 가져다 썼다.  

근데, 그래도 화면이 안나왔다. 웃긴게, 노트북으로 Trickle Ice 페이지에 가서 후보군 수집해보면 잘만 나오는데, 휴대폰으로는 안나왔다.

이건 들어보니 IP 주소의 문제라고 한다. 요즘 휴대폰의 회선에는 IPv6 주소만 들어오는데, 내가 가진 서버에 물린 회선은 IPv4 만 들어온다. 
이런 경우에도 서로 통신할 수 없다고 한다.

두 가지 방안이 있었다:
- 114에 전화해서 내 휴대폰에 들어오는 IP를 4로 내려달라고 한다  
  의외로 국내에서 리모트 플레이 관련하여 이런 요청이 많이 들어오는 모양이다. 통신사에 전화해서 '플레이스테이션 리모트 플레이가 안된다. IPv4 로 내려달라' 라고 하면 해준단다.
- 서버를 IPv6 이 있는 곳으로 이동한다.

그러나... 매뉴얼에 114에 전화하라고 쓸 수는 없었다.  
일단, 수중에 내 노트북(화면이 달린 우분투)에 꽂을 수 있는 IPv6 은 없지만 그렇지 않은 IPv6 은 있었다. 즉, 화면은 없지만 IPv6 이 붙은 별도의 다른 우분투는 있었다.  
그래서 내 노트북에 뒀을 때에 비해서 레이턴시가 조금 생기긴 하겠지만 TURN 서버만 따로 다른 곳으로 이동하기로 한다.

일단 된다! 레이턴시가 조금 있지만… 플레이하기에 무리는 아니었다. 그냥 신경이 조금 쓰이는 정도.  
물론 지하철을 타거나 이상한 곳에 가면 더 느려지긴 하겠지만 음… 그건 뭐 다 그럴테니까.


## 가상 조이스틱 에뮬레이터

Python 으로 작성했다. 사실 처음에는 얘도 uinput 이 C 로 만들어진 무언가이니 Java 의 native 함수로 옮겨서 써볼까도 생각했는데, **귀찮았다**.

솔직히 만들어두면 두고두고 써먹을 것 같기는 했지만... **귀찮았다**.

일단 문서를 참고해서 가상 입력을 만들긴 만들었다. 근데, **안됐다**. 정확히는, 내가 만든 가상 입력을 스팀과 코어키퍼가 인식하지를 못했다.  

뭔가 에러 로그가 뜨거나 만든게 터지거나 하는 것도 아니고 그냥 안됐다. 그래서 원인 파악에 시간이 조금 걸렸다.  

찾아보니 xboxdrv 라는걸 쓰라는데, 이걸 쓰면 일단 컨트롤러의 존재 인식은 하지만 키를 눌러도 반응이 없었다.  
이 드라이버는 기존에 추가한 입력 소스를 감싸서 스팀이 인식할 수 있는 형태의 가상 입력을 추가로 만드는 애인 것으로 보이는데, 결론적으로 스팀과 게임이 인식은 하나 누르는 키에 반응하지 않았다.  

그래서 xboxdrv 없이, 그것이 추가로 만든 입력의 vender 와 product, version 정보를 그대로 가져다 써봤다. 역시 인식되지 않았다.  

기타 등등.. 많은 삽질을 했다. 길고 긴 밤이 끝나고, 정상적으로 인식하고 동작할 조건은:

- 가상 입력의 vender 와 product, version 정보가 유효할 것(스팀이 인식하는 값 리스트가 있었다)
- 가상 입력의 bustype 이 3 일 것
- 가상 입력이, 컨트롤러와 맞지 않는 키를 지원하지 않을 것(컨트롤러와 관련없는 키, 예를 들면 키보드같은게 있으면 안됐다)

이었다. 웃기게도, 처음에는 전부 다 만족하지 않았다. 
하나의 입력에 컨트롤러부터 마우스, 키보드 까지 다 때려넣어져 있었으며 bustype 을 비롯한 모든 기타 정보가 0이었다.  

--- 

더해서, 수학적인 지식도 조금 필요했다. 

클라이언트에서 조이스틱을 구현할 때, 당연히 조이스틱은 돌리는 애이므로 원형의 필드 안에서 스틱이 이동하는 형태를 생각했다.  
그래서 조이스틱이 발산하는 이벤트가 '원점으로부터의 거리(0 ~ 1)'와 '스틱의 위치벡터가 x축 양의 방향과 이루는 각(0 ~ 2pi)'을 주도록 했다.

그런데 이게 웬걸, 실제 조이스틱 입력이 받는건 X 좌표 -1 ~ 1 과 Y 좌표 -1 ~ 1 이었다.  
심지어 X, Y 각각 1, 1 인 것이 내 이벤트와는 1, 45deg 와 매핑된다. (1, 1) 의 원점으로부터 거리는 루트2 인데, 내 거리는 1이었다...

즉, 원형으로 구현된 이벤트를 정사각형 형태로 매핑해야했다.

일단 어떻게든 하기는 했으나, 생각보다 많은 시행착오가 있었다. 
라디안과 기울기, 삼각함수... 고등학교를 나온 이후에 이렇게까지 수학적 지식을 동원한건 거의 처음 아닌가 싶었다.

## 윈도우 위치 유틸리티

클라이언트의 화면 비율과 원격 서버의 모니터 화면 비율이 서로 다르기에, 게임 윈도우가 원격 모니터를 가득 채우면 필연적으로 클라이언트에서 잘리거나 검은 여백이 생긴다.  

다행히도 코어키퍼는 어느 정도까지는 윈도우 크기를 줄여도 잘 대응해줘서, 가능하면 클라이언트의 화면 비율에 맞게 조정하고 싶었다.  

처음에는 xdotool 과 wmctrl 를 사용해서, 아래의 내용으로 요약되는 셸 스크립트를 짰다:
1. 코어키퍼 윈도우를 찾는다.  
   xdotool 로 "Core Keeper" 라는 이름을 갖는 윈도우를 찾는다. 다만, 이렇게 찾으면 항상 매치되는 것이 두 개여서 추가 확인을 통해 그 중 '더 작은 것'을 찾도록 했다.
2. 찾은 윈도우를 '활성화' 한다.  
   윈도우가 아래에 깔려있었으면 위쪽으로 끌어올리고, 이후 과정에서 id 대신 '활성화된 것'을 사용하기 위함이다.
3. 윈도우를 최대화하여, 윈도우가 가질 수 있는 최대 높이를 구한다.
   이는 Gnome Shell 의 상단바 영역에는 윈도우가 침범할 수 없기에 추가된 사항이다. 
   즉, 윈도우를 중앙 정렬할 때 화면의 높이가 아닌 이 높이를 기준으로 잡아야한다.
4. 화면의 너비를 윈도우의 새 너비로 잡고, 전달받은 클라이언트의 화면 비율에 맞게 높이를 설정한 뒤 윈도우가 화면 중앙으로 오도록 한다.

그런데, 이거는 추후에 X가 포워딩된 ssh 환경에서 실행하면 xdotool 이 오작동해서 wmctrl 로 대체했다.

## 좀 쉽게 관리하자!

동작 확인할 때도 느꼈지만, 원격 서버를 관리하기가 굉장히 귀찮았다.  
뭐 하나 망가지면 원격 서버 노트북에 직접 로그인해서 뭐가 문젠지 확인해줘야했다.

재부팅을 하면 직접 로그인도 해줘야 했고, ssh 로 접속하면 X 세션이 없어서 서버 시작도 안됐다(포워딩의 존재를 처음엔 몰랐고, 소켓 서버를 열고 클라이언트가 연결되면 GStreamer가 화면을 캡쳐하려고 하기 때문에 X가 없으면 터진다). 
즉, 뭔가를 하려면 항상 서버 노트북을 직접 들고다녀야했다.

근데 개발은 따로 맥으로 하고 있었다. 리눅스는 실사용하기에 내가 너무 뉴비였기 때문에.

그래서 이걸 두 개를 들고다니다가는 내 어깨가 먼저 나갈 것으로 예상되어 아래처럼 몇 가지 설정을 추가한다:

- 자동 로그인: 재부팅할 때 알아서 X 서버를 열도록 한다.  
  이는 ssh 에서 뭔가가 꼬여 재부팅을 하더라도 자동으로 로그인, X 서버가 시작되어 ssh 세션이 포워딩할 수 있게 하려는 것이다(부팅 직후에는 로그인을 하지 않으면 x 서버가 켜지지 않는다).
  어차피 이 노트북은 집에만 둬야하고 들고나가지 못하므로(그래야 IP가 고정되어 외부에서 접속할 수 있다), 자동로그인을 해도 크게 문제가 없다는 판단이었다.

- SSH 의 X 포워딩 활성화
  이걸 쓰면 SSH 세션에 X 디스플레이가 포워딩된다. 사실 X 의 생태계에 대해 잘 아는게 아니어서 내부적으로 무슨 일이 일어나는지는 모르지만, 이걸 하면 `DISPLAY=:0` 을 넣었을 때 대부분의 명령이 잘 동작했다.
  안하고 `DISPLAY=:0` 을 넣으면 이 디스플레이를 열 수 없다고 터진다…

그리고 기타 `/sys/devices` 에 있는 `intel_backlight` 를 사용해서 화면을 꺼버린다던지 하는 설정도 추가했다. 

이렇게 함으로써, 모든 작업을 SSH 로 할 수 있게 되었다. 서버의 시작 및 중지, 로그 확인 등…. 결론적으로 실제 노트북의 화면에는 코어키퍼랑 스팀만 켜져있다.

더해서, 나중에 이걸 도커라이즈 해도 좋을 것 같다는 생각도 든다. 요구사항이 좀 까다로워서 어느정도 까지 될 지는 모르겠지만...

## 후기

나름 많은 고민을 했고 많은 벽을 만났다.  
대체적으로 뭔가가 안되어서 열이 받았다. 이게 왜 안되지...? 근데 왜 안되는지는 모르겠는.  

그 때마다 혜성같이 나타나 원인을 짚어주고 해결의 키워드를 제시해준 [@the_unstabler](https://x.com/the_unstabler) 형에게 다음에 맛난거라도 사주는걸로.


사실 아직 GStreamer 의 리소스 해제에 문제가 남아있다.  
모든게 시나리오대로 잘 흘러가면 문제가 없는데, WebRTC 연결이 어딘가에서 실패하거나, 
클라이언트가 오류에 의해 강제로 종료되면 서버가 리소스 해제를 제대로 못한다.

그래서 한 번 이상 이런 일이 발생하면 추가적인 다른 연결을 수립하는게 불가능하며, 심지어 `Ctrl + C` 를 해도 서버가 안죽어서 `kill -9` 를 해야한다.  

이에 대한 원인 파악도 해야하고... 수정도 해야할 것 같은데  
일단 잘 되니까 나중에 해야겠고... 그렇다.
