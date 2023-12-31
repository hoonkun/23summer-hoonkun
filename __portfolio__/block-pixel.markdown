---
name: 마인크래프트 월드 데이터를 git으로 버전관리할 수 있게 하는 마인크래프트 서버 플러그인
description: Kotlin 으로 작성된, 마인크래프트 월드를 git을 통해 버전관리, 브랜치 분기, 병합 등을 수행할 수 있게 하는 서버 플러그인을 작성했습니다.
tags: [Kotlin, MinecraftServerPlugin]
type: playground
datetime: 2022
image: block-pixel.jpg
---

2022년에 진행한 개인 프로젝트로, 저장소는 [이쪽](https://github.com/hoonkun/block-pixel) 입니다.

복잡한 월드의 백업 및 복구를 간략화하고, '코드를 작성할 때 사용하는 브랜치를 월드에도 적용시킬 수 있다면 어떨까?' 라는 생각에서 시작된 프로젝트입니다.  
git 에 대해 잘 알지 못했을 때 그에 대해 좀 더 잘 이해하고자 했던 목표와 함께 시작했던 이 프로젝트는 지금까지 진행한 프로젝트 중 가장 완성도있고 바람직하게 마무리한 프로젝트로 평가하고 있습니다.  

Spigot 이라는 마인크래프트 서버 플러그인 개발 프레임워크를 사용했고, Git 관련 조작을 위해 JGit 을 사용했습니다.  
개발 중 마주친 벽이나 고민해서 해결했던 문제들 등 더 자세한 사항은 저장소의 README.md, 혹은 블로그의 [이 게시글](/posts/retrieve/2022-05-07-block-pixel-development) 을 참조하시는 것도 괜찮을 것 같습니다.  
