---
name: Jetpack Compose 기반 Minecraft Dungeons 세이브 파일 에디터 프로그램
description: Kotlin(JetpackCompose) 를 사용해 작성한, Minecraft Dungeons 의 세이브 데이터를 수정하는 프로그램을 개발했습니다.
tags: [KotlinMultiplatform, Compose]
type: playground
datetime: 2023
---

2023년에 진행한 프로젝트로, 저장소는 [이쪽](https://github.com/hoonkun/DungeonsEditor) 입니다.  
기존에 다른 사람이 개발해놓은 에디터가 마음에 들지 않아 독자적으로 다시 개발한 프로그램입니다.  

Jetpack Compose 를 사용하여 반응형 UI로 구성했으며, 그것이 제공하는 구성 가능 함수인 AnimatedContent 등을 사용하여 화면 전환에 신경을 쓴 프로젝트입니다.  
실질 Json을 GUI를 통해 수정하는 프로그램으로, Jetpack Compose 의 StateHolder 라는 패턴을 사용하여 구현했습니다.  

또, 툴 내에서 게임의 이미지 등을 표시하지만 그 어떤 인게임 리소스도 프로그램 내에 직접 포함하지 않고 프로그램 사용자의 환경에 정식으로 설치된 게임의 리소스를 직접 해제하여 그것을 사용하도록 했습니다.  
관련하여 작성한 Unreal 엔진으로 개발된 게임의 리소스 형식은 Pak 파일을 읽는 PakReader 모듈은 기존 C#으로 작성된 것을 Kotlin 으로 번역하였습니다.  

개발 후 작성한 후기 비슷한 [블로그 게시글](/posts/retrieve/2023-06-12-dungeons-editor)도 있습니다.