---
name: NextJS 기반 WebRTC 통신 웹 어플리케이션
description: WebRTC 기술을 사용해 P2P 통신을 구현하고, 기타 관리자 페이지 및 친구 시스템을 포함한 웹 어플리케이션의 개발, 유지보수했습니다.  
tags: [Typescript, NextJS, WebRTC]
type: official
datetime: 2022-now
---

2022년에 시작하여 현재까지 진행중인 프로젝트로, 프론트만 담당했으며 아래와 같은 기술/프레임워크가 사용되었습니다.
- NextJS (React)
- WebRTC (클라이언트 단)
- WebSocket (WebRTC 시그널링)
- GraphQL (클라이언트 단)

주된 기능으로는 WebRTC 연결을 중개하는 시그널링 WebSocket 서버를 통해 WebRTC 의 Offer/Answer 를 비롯한 여러 메시지를
각 Peer 에게 전달하여 연결을 수립하고, 기타 통신 내 미디어 제어 및 권한 제어의 수행 등이 있습니다.

추가적인 기능으로는 회원 간 친구 등록, 게시판 등의 시스템이 포함되며, 
특히 하나의 웹 서버 인스턴스로 여러 서브 도메인을 통해 서로 다른 서비스 영역을 제공하기도 합니다.  

예를 들면, kiwi.dummy.com 으로 접속했을 때와 dummy.com 으로 접속했을 때 제공되는 서비스의 영역이나 UI 테마 등이 다르며, 
서브도메인 자체도 회원이 지정할 수 있고 해당 서브 도메인에 접근할 수 있는 사용자도 회원이 제어할 수 있습니다.  

이 기능을 구현하기 위해, 프론트 단에서 iframe 을 사용하여 localStorage 가 같은 베이스 도메인 간에 공유되도록 하는 작업도 진행한 바가 있습니다.  
