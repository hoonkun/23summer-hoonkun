---
name: React Native 기반, mp3 음원 믹싱 및 소켓을 통해 실시간으로 송수신하는 어플리케이션
description: 실시간으로 여러 Mp3를 PCM 으로 변환하고, 믹싱 후 다시 Mp3로 인코드하여 소켓을 통해 전송, 재생하는 어플리케이션을 개발했습니다.  
tags: [Typescript, ReactNative, SocketCommunicating]
type: official
datetime: 2023
---

2023년에 진행된 프로젝트로, React Native의 JS 단 프론트 및 Kotlin 을 사용한 Android Native 코드를 담당했으며 아래와 같은 기술/프레임워크가 사용되었습니다.
- React Native
- lame Mp3 Encode/Decoder
- Byte 단위 Socket 통신

주된 기능으로는 음원 재생 장치와 통신하여 장치의 상태 등을 UI에 표시하고, Mp3 음원 데이터를 실시간으로 소켓을 통해 장치에 전송하여 장치로 하여금 음원을 재생하도록 합니다.  
특히, 장치에 보내는 음원은 하나가 아니어도 되며, 여러 Mp3 를 동시에 재생하여도 PCM + 믹싱을 통해 합쳐 전송합니다.  

기타 전송 음원 자체의 볼륨 제어, 소켓 통신을 통한 장치의 설정 수정 등이 포함됩니다.  

React Native 로 만들어졌기 때문에, 적절한 백그라운드 핸들링을 위해 UI만 React 를 통해 작성하고 실제 믹싱, 소켓 통신 등의 부분은 Kotlin(Native 코드)를 통해 작성했습니다.  
Coroutine 과 Event 기반의 코드로 React Native 와의 불협음을 최소화하고, 음원의 원활한 재생을 위해 성능에 신경을 쓰게 된 프로젝트입니다.  


