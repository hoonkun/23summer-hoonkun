---
author: HoonKun
title: 블로그 4회차 엔딩 후기 - Next App Router
date: 2023-06-22, 18:55
categories: [dev, frontend]
---

Next 13.4 의 App Router 를 사용하여 블로그를 갈아엎고 Vercel로 갈아탄 후기.  
<!-- Excerpt -->
기타, 덧글 UI를 입맛에 맞게 바꾸기 위해 Giscus 를 셀프호스팅해본 얘기도 간단하게 해볼까 한다.  

## 서론
기존 블로그도 Next 를 사용했는데, getStaticProps 를 사용해 post 디렉터리의 Markdown 텍스트를 읽어서 클라이언트 컴포넌트에 넘겨주면 그걸 unified를 사용해 렌더링해서 표시하는 방식이었다.  

즉, 처음 페이지 내용을 가져오면 포스트 내용이 없는 상태로 응답을 받고 hydration 을 통해 내용이 렌더링되었다.  
getStaticProps 를 통해서는 컴포넌트를 내려줄 수 없었고, unified 는 비동기 라이브러리이기 때문에 SSG가 바로 렌더링할 수 없었기 때문이었다.

단지 그 뿐이었다. 그게 마음에 들지 않았다.  
처음 curl이던 뭐던 요청을 보내면 적어도 포스트의 내용이 다 렌더링되면 좋겠다고 생각했다.  

그런데 마침 Next 13.4 가 나오면서 App Router 가 생겼는데, 이 방식을 쓰면 서버 컴포넌트가 모든 내용을 렌더링하고 클라이언트에 전달할 수 있었다.  
즉, 명확하게 서버에서 post 디렉터리의 텍스트를 읽어 unified 를 통해 렌더링까지 진행하고 그 결과를 클라이언트에 전달, hydration 되게 할 수 있었다.

그리하여 styled-components 와 Next 13.4 App Router를 사용하여 블로그를 갈아엎고 Vercel 에 배포한 일을 두서없이 생각나는대로 기록해보려고 한다.

## 진행 과정
개발은 무리없이 대충 잘 끝냈는데, 배포하고 문제가 너무 많이 나왔다. Vercel을 처음 써서 그런가.

### 개발
Next 13.4 와 styled-components 를 가져다가 개발했다. 사실 emotion 을 더 쓰고싶었는데, emotion 은 아직 Next App Router 지원이 개발 중이라고 해서 사용하지 못했다.  

#### 구조  
간단하게 RootLayout + Page * 3 으로 개발했다. 딱히 Nesting 되는 구조가 없는데다가, Layout 의 `prop`은 `params`는 가져올 수 있지만 실제 라우트 세그먼트를 가져올 수는 없었어서 공통부분을 따로 분리할 수 없었다.  

#### SEO  
open graph 및 twitter 이미지에 공을 조금 들였다. Pages Router 에도 있는 사항인지는 잘 모르겠는데, App Router 에서 `opengraph-image.tsx` 와 `twitter-image.tsx` 파일에 `default export` 로 `async () => Promise<ImageResponse>` 를 전달하면 request-time에 미리보기 이미지를 렌더링하여 응답해준다.  
특히 `ImageResponse` 의 생성자 첫 인수로 `JSX.Element` 를 전달하는데, 그 전달한 컴포넌트를 브라우저에서 눈에 보이는 형태로 렌더링하여 이미지화한다.  
즉 request-time 에 서버의 상황을 보고 그에 맞는 이미지를 렌더링하여 쓸 수 있다는 말이었다.  
그리하여 메인 페이지의 이미지에는 오늘의 아무믈을 표시하도록 하고, 블로그의 이미지에는 총 게시글과 가장 최근 게시글을 표시하도록 했다.

#### sitemap 과 robots  
이것도 처음에는 `sitemap.ts` 와 `robots.ts` 를 통해 생성하도록 했으나, Vercel 로 배포할 때의 문제로 인해 직접 `ts-node` 를 사용하여 파일을 만들어내도록 했다.  
sitemap 의 lastmod는 실제 포스트가 기록된 markdown 파일과 그 주변 리소스 파일들의 마지막 수정 시각 중 가장 최근 것을 가져와 반영하도록 했다.  

#### Giscus  
그래도 댓글 정도는 달 수 있었으면 해서, 기존에 썼던 utteranc.es 대신 Discussion 을 사용하는 giscus.app 을 사용해보기로 했다.  
근데 이런 애들은 항상 하나같이 디자인이 2% 정도 마음에 안들어서... 방법을 찾는데 셀프호스팅이 가능했다!!
즉 소스를 수정해서 내 도메인에 올리고 쓸 수 있다는 얘기였다.  

그리하여 기존 소스에 CSS 파일 하나를 추가하고 약간의 수정을 거쳐 별도로 Vercel에 배포하고 그것을 사용하도록 했다.  

다음 UI 사항들을 수정했다:
- 루트 Discussion에 아무런 반응이 없을 때 반응 추가 버튼이 왼쪽으로 쏠려있는 문제
- 'Newest' 탭에 hover 시 왼쪽 border가 누락된 문제
- 댓글 달기, 답글 달기, Github 로그인 버튼의 border-radius 를 컨테이너의 그것과 통일
- 일부 아이콘에 패딩이 없는 문제
- 기타 소소한 margin/padding 수정

#### 기타
not-found 나 기타 다른 사항들은 적당히 적당히 했다.

### 배포
모든 것은 순조로웠다. Vercel을 만나기 전까지는.  

뭐... 근데 솔직히 Vercel도 굉장히 편리하고 쉽게 배포할 수 있게 해주긴 했다. 다만, 한 가지 문제를 만났다.  
Vercel 이 빌드 중에 Serverless Funtion dependency limit(50MB) 을 거의 치려고 한다고 콘솔을 찍은 것이다.  

이게 개인 서버에 배포할 때는 문제가 안되는데, Vercel 로 배포하려고 하면 문제가 생긴다.  
파악한 바로는... 거의 모든 서버환경으로 실행되는 코드에서 fs.read* 함수를 탐지해서 읽어낸 파일들을 전부 종속에 넣는다는 것 같았다.  

필자의 경우 포스트의 목록을 request-time에 fs.readdirSync 를 통해 가져오고 있었는데, 거기서 읽은 그 하위 디렉터리의 모든 이미지 리소스를 전부 종속에 넣어버린 듯 했다.  

사실 fs.readdirSync 의 결과는 request-time 에 실시간으로 변하는 데이터가 아니었으므로, request-time 에 수행하지 않고 build-time 보다도 먼저 한 번만 실행되도록 했다.  
즉 수동으로 node 스크립트를 통해 fs.readdirSync 를 사용한 코드를 한 번만 실행하되, 그 결과를 별도 파일에 저장하여 request-time 에는 fs.readdirSync 대신 fs.readFileSync 로 대체할 수 있도록 했다.

그 대신 수동으로 실행할 node 스크립트는 런타임에는 절대 실행되면 안되므로 .vercelignore 에 추가했다.

정리하자면 버셀에 배포되는 소스에는 fs.readdirSync 함수가 있으면 좋지 않은 일이 일어나므로 .vercelignore 처리한 파일로 몰아넣었다.  

특히 `sitemap.ts` 와 `robots.ts` 도, request-time 이 아닌 build-time에 한 번만 하면 되므로 수동으로 node 스크립트를 통해 직접 `sitemap.xml` 과 `robots.txt`를 만들어주기로 한다.

근데 이 문제를 제외하면 정말 아무것도 몰라도 배포할 수 있게 잘 해주고, 도메인 설정도 정말 쉽게 해줬다.  

#### Giscus
이것도 Next 로 된 앱인데, iframe 을 통해 표시되는 그런 친구였다.  
iframe 이라 style 커스터마이징이 어려워서, 문서를 봤더니 소스 클론해서 셀프호스팅 해도 된다더라!  

그리하여, [이 문서](https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md)에 나온 대로 Github App 만들고 이것저것 하고 저장소 클론하고...  

그러고 나서 CSS 몇 줄 수정한 다음에 Vercel에 배포했다.  
어차피 얘는 기존에도 Vercel로 배포되고 있던 애라서 배포에 크게 어려움은 없었다.  

그러고 나서 별도 도메인 붙히고, 블로그 프론트에서 그것을 사용하도록 했다.

## 진짜 후기
목표했던 것들은 완벽하게 성공했다:
- `curl` 을 통해 요청을 날려보면 모든 포스트 내용이 `styled-components` 의 `className` prop과 함께 렌더링되어 돌아온다.  
- 배포도 Github 저장소에 Vercel 을 연결했더니 저장소에 푸시하면 알아서 배포해준다(기존과 동일하게).  

거기에 추가로 이런 이점들 까지 챙겼다:
- SEO태그에 힘을 빡 줬다. 기존보다 훨씬 멋지다!
- 기존 issue 로 관리되던 `utteranc.es` 대신 셀프호스팅하여 디자인도 내 맘대로 꾸밀 수 있는 `giscus.app` 으로 바꿨다. 관리도 더 쉽고, 기존보다 더 멋지다!

기존 Github Pages 대신 Vercel에 배포해보았는데, 역시 왜 Vercel 이 인기가 많은지는 알 것 같다.  
굉장히 강력해보이는 기능이 많았고, 분석 데이터도 유효해보이는 것들이 많았다(물론 나는 뭐가 강력하고 유효한지 잘 모른다).

게다가 Github Pages 는 처음 셋업할 때 고생을 좀 했는데 얘는 적어도 셋업에서는 고생하지 않는다(다른 고생을 했지만).  

슬슬 웹에서 이상한걸 해보려는 시도가 줄고있다.  
아무래도 웹에서 이런건 표준에도 어긋나고 접근성도 구리고 이런 생각을 하게 된 것 같다.  
이건 정적인 웹이지 앱이 아니야... 같은? 생각을 좀 더 하게 된 것 같달지.  

그냥 정적인 페이지 만드는게 훨씬 마음이 편한 것 같다.  

~~근데 솔직히 화면 크기는 좀 고정되었으면 좋겠어 정신건강에 너무 안좋아~~
