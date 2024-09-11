---
name: CoreKeeper 리모트 플레이어
description: 즐겨 하던 게임을 WebRTC 를 통해 iOS 에서 플레이할 수 있게 하는 리모트 플레이어를 개발했습니다.
tags: [SwiftUI, Ktor, GStreamer, WebRTC]
type: playground
datetime: 2024
image: remote-client.jpg
---

플레이어 클라이언트 일반적인 iOS 어플리케이션으로 아래와 같은 기술을 사용했고:
- Swift + SwiftUI
- WebRTC.framework

실제 게임의 구동이 이루어지는 리모트 서버는 아래와 같은 기술을 사용하여 구현했습니다:
- GStreamer + WebRTCBin: 플레이 영상 송수신
- WebRTC DataChannel + Python 의 uinput 바인딩: 클라이언트가 보내는 키 입력을 재현 
- Ktor: WebRTC 의 시그널링 웹 소켓 서버
- Coturn 및 기타

대략, '우분투 환경에서 돌아가는 게임의 영상을 GStreamer 의 WebRTCBin 을 통해 클라이언트(iOS 앱)에 전달하고, 
클라이언트가 보내는 키 입력을 DataChannel 로 받아 Python 의 uinput 바인딩이 우분투에서의 키 입력을 재현' 으로 요약되는 프로젝트입니다.

GStreamer 나 uinput, TURN 서버 구성 등에서 여러 쉽지 않은 문제를 만났지만 
개인 프로젝트인데도 어떻게든 돌아가는 명확한 아웃풋이 나온 몇 안되는 프로젝트 중 하나입니다.

개발 후 남긴 기록으로는 [서버의 개발](/posts/retrieve/2024-07-24-corekeeper-remote-server)에 대한 게시글, 
[클라이언트의 개발](/posts/retrieve/2024-07-24-corekeeper-remote-client)에 대한 게시글, 
[총 후기](/posts/retrieve/2024-07-25-corekeeper-remote) 게시글이 있습니다.
