---
name: Kotlin 기반 Midi 파일을 마인크래프트의 McFunction 으로 변환하는 프로그램
description: Kotlin 으로 작성된, Midi 파일을 읽어 반복 커맨드블럭에 연결하여 재생시킬 수 있는 McFunction 파일로 변환하는 프로그램을 개발했습니다.
tags: [KotlinConsole, MinecraftCommands]
type: playground
datetime: 2022
image: arctic.jpg
---

2023년에 진행한 개인 프로젝트로, 저장소는 [이쪽](https://github.com/hoonkun/arctic-midi2mcfunction)입니다.  

jfugue 라이브러리를 사용하여 Midi 파일을 읽고, 그것을 하나의 McFunction 으로 재작성합니다.  
이 McFunction 은 하나의 반복 커맨드 블럭에 연결되어 일정한 위치에서 마인크래프트의 노트블럭을 스폰하고 그 음을 Midi 에 맞게 설정, 재생합니다.  

Kotlin 으로 마인크래프트의 커맨드 집합을 출력하는 프로그램이지만, 결국 출력물을 가져다가 실행하는 것안 마인크래프트 클라이언트이기 때문에 무겁지 않게 작성해야 했고 
첫 구현에 이어 커맨드 셋의 최적화가 일부 진행된 바 있습니다.

관련하여 블로그에 [이런 게시글](/posts/retrieve/2023-03-08-arctic-midi2mcfunction)도 있습니다.
