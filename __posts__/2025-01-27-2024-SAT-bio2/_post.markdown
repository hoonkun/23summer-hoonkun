---
author: GoHoon
title: 25학년도 수능 생명과학II 킬러들을 풀어보자
date: 2023-12-28, 14:34
categories: [biology-ii, dna-replication, codon, group-inheritance, restriction-enzyme]
expand:
  max_columns: 2
  max_rows: 2
---
2024년에 시행된 2025학년도 대학수학능력 시험의 생명과학 II 과목 킬러 문제들을 풀어보자.
<!-- Excerpt -->

## 서론
매년마다 죽지도 않고 돌아오는 수능 타임이다.
이번 연례행사도 빼먹을 수 없다. 빠르게 훑어보려고 한다.

사실 이번에는 개인적인 평가지만 집단유전이 제일 어려웠고 샤가프가 운빨겜이었으며, 나머지는 평이했다고 생각한다.
그래서 조금 많지만 위에서 언급한 5문제 정도까지 풀어보려고 한다.

이번에도 [작년의 것](/posts/retrieve/2023-12-28-2023-SAT-bio2)과 비슷하게 하나의 게시글에 퉁쳐 적을 것이다.
마찬가지로 시험지 이미지는 지면상의 이유(?)로 올리지 못했다. ebsi 홈페이지의 그것을 같이 참고해주시라.

그럼 바로 본론으로 들어가보자.

## 너무 길어요
빠르게 이동해보자:  
- [9번: DNA 복제](#9번_dna_복제)  
- [12번: 샤가프의 법칙](#12번_샤가프의_법칙)  
- [16번: 집단유전](#16번_집단_유전)  
- [18번: 코돈](#18번_코돈)  
- [20번: 제한효소](#20번_제한효소)  

## 9번: DNA 복제
방향을 알 수 없는 염기서열 하나를 주고, 선도가닥 한 개와 지연가닥 두 개 및 프라이머 세 개에 기호를 뚫었으며,
프라이머를 추론할 수 있는 단서를 위주로 제시했다.  

대략 아래의 과정을 통해 풀게 된다:
1. 가능한 프라이머의 배치 두 가지 중 세 번째 발문을 통해 맞는 것 하나를 추론한다.
2. 세 번째 발문으로부터 $$Z$$ 를 찾고, 마지막 발문을 통해 $$X$$ 와 $$Y$$ 를 찾는다. 이 과정에서 제시된 서열의 방향도 밝혀진다.
3. 두 번째 발문에 제시된 합성 순서를 보고 어느 프라이머가 어떤 가닥에 있는지를 찾는다.
4. 보기를 본다!

각각을 따라가보자.

### 프라이머의 배치
프라이머는 아래 두 배치 중 하나로 존재할 수 있다:
<style>mark.leading { background-color: #6580a880; color: white; }</style>
<style>mark.lazy1 { background-color: #a87c6580; color:white; }</style>
<style>mark.lazy2 { background-color: #a88e6580; color:white; }</style>
- 왼쪽으로부터 1\~5번째 염기(지연가닥)와 왼쪽으로부터 19\~24번째 염기(지연가닥), 그리고 오른쪽으로부터 1~5번째 염기(선도가닥)
  <pre class="c">ⓐ-<mark class="lazy1">TCGAG</mark>ATGCTACCTAGCT<mark class="lazy2">TATCG</mark>AGTGATCG<mark class="leading">TATCG</mark>-ⓑ</pre>
- 오른쪽으로부터 1\~5번째 염기(지연가닥)와 오른쪽으로부터 19\~24번째 염기(지연가닥), 그리고 왼쪽으로부터 1~5번째 염기(선도가닥)
  <pre class="c">ⓐ-<mark class="leading">TCGAG</mark>ATGCTACC<mark class="lazy2">TAGCT</mark>TATCGAGTGATCG<mark class="lazy1">TATCG</mark>-ⓑ</pre>

이 때, 두 번째 경우는 세 프라이머 중 어떤 두 프라이머를 잡아도 서로 상보적이지 않다. 즉, 세 번째 발문에 위배된다.  
따라서 첫 번째 경우가 맞는 경우이다.

### X, Y, Z
발문에서는 $$X$$, $$Y$$ 가 서로 상보적이라고 제시했고, $$X$$ 는 A/G > C/U 이며 $$Y$$ 와 Z 는 C/U > A/G 라고 제시했다.  
$$X$$, $$Y$$ 가 서로 상보적이므로, 짝이 안맞는 친구가 $$Z$$ 가 된다. 즉, 아래의 서열에서:
<pre class="c">ⓐ-<mark class="lazy1">TCGAG</mark>ATGCTACCTAGCT<mark class="lazy2">TATCG</mark>AGTGATCG<mark class="leading">TATCG</mark>-ⓑ</pre>

오른쪽 두 개가 짝이 맞으므로, <mark class="lazy1">왼쪽의 것이 $$Z$$</mark> 가 된다.  
그런데, $$Z$$ 에서 C/U > A/G 라고 하였으나 주어진 서열에서 해당 영역은 A/G > C/U 이다.  
따라서 $$Z$$ 는 주어진 가닥에 상보적으로 결합된 프라이머이며 그 서열은 5'-AGCUC 가 되고, 결론적으로 ⓐ 는 3' 말단이 된다.

지금까지 나온 정보로 대략적인 구조를 살펴보면 아래와 같다:
<pre class="c">
5'-                                    -3'
3'-                             ← <mark class="leading">UAUCG</mark>-5'

5'-<mark class="lazy1">AGCUC</mark> →           <mark class="lazy2">AUAGC</mark> →           -3'
3'-TCGAGATGCTACCTAGCTTATCGAGTGATCGTATCG-5'
</pre>

한편, $$X$$ 에서 A/G > C/U 라고 하였는데 선도가닥의 프라이머는 이 조건을 만족하지 않는다.  
따라서 <mark class="leading">선도가닥의 프라이머가 $$Y$$</mark> 가 되며, <mark class="lazy2">남은 하나가 $$X$$</mark> 가 된다.

### I, II 와 ㉠, ㉡, ㉢

대충 다 나온 것 같지만, 아직 $$I$$과 $$II$$, 그리고 ㉠, ㉡, ㉢ 는 모른다. 지면의 아래쪽 구조 이미지에는 말단이 나와있지 않기 때문이다.
즉, 위에 정리한 구조에서 위아래는 맞지만, 좌우로 반전되어있을 가능성이 있다는 의미이다.

그런데 발문에서 ㉢ 이 ㉡ 보다 먼저 합성되었다고 제시되었고, 위에 제시한 구조에서 두 지연 가닥 중 먼저 합성된 것은 <mark class="lazy2">프라이머 $$X$$</mark> 로부터 개시되는 가닥이다.  
따라서, 발문으로 제시된 서열은 $$II$$ 이고, <mark class="leading">선도가닥 프라이며 $$Y$$</mark> 는 ㉠에, <mark class="lazy2">지연가닥 프라이머 $$X$$</mark> 는 ㉢에, 나머지 <mark class="lazy1">지연가닥 프라이머 $$Z$$</mark> 는 ㉡ 에 존재한다.

### 보기를 보자!

- ⓐ 는 3' 말단이다. (X)
- X 는 ㉢에 존재하는게 맞다. (O)
- Z 에서 C의 수는 AGCUC 이므로 두 개가 맞다. (O)

생각보다 꼬여있지 않았다. 
다만 지연가닥 두 개의 합성 순서를 알려주는 일은 드물었던 것 같은데, 그래서 처음 풀 때 이 정보를 못보고 지나쳤다가 엥 하기는 했다.


## 12번: 샤가프의 법칙
전형적인 샤가프의 법칙 유형의 문제다. 두 가닥 $$X_{1}$$ 과 $$X_{2}$$ 둘 중 하나로부터 전사된 $$Y$$ 를 제시하고, 그들의 염기 비율이나 수소결합같은 단서를 제시했다.

결론부터 말하자면, 적어도 필자가 풀었을 때는 운빨망겜이라는 생각이 들었다.  
발문의 분수 비율이나 수소결합 수를 조합하여 빠르게 쳐낼 수 있는 경우가 있는지는 모르겠으나 필자는 머리가 나빠서 가능한 4가지 경우를 모두 계산했다.

즉, $$Y$$ 가 전사된 주형 가닥이 $$X_{1}$$ 인 경우와 $$X_{2}$$ 인 경우, ㉠, ㉡ 이 각각 G, T 인 경우와 T, G 인 경우 모두를 계산했다.  
이 과정에서 중간에 발문에 위배되는 것 없는 경우가 나오면 거기서 클리어다. 즉, 운이 좋으면 첫 번째로 잡은 것이 정답이고 운이 나쁘면 4번 다 계산을 한 이후에나 답이 나온다.

결국 풀이과정도 이것이 전부이기 때문에, 그냥 네 가지 하나하나 표 그리고 계산해보면 된다.

우선, 마지막 단서가 중심이다. 마지막 단서를 중심으로 $$Y$$ 의 전사 주형가닥이 어느것이냐에 따라 표의 형태는 동일하다.
즉, ㉠, ㉡ 이 각각 어느 것이든 $$Y$$ 의 주형가닥에 따라서만 표의 형태가 바뀌므로, 먼저 이 

### Y 가 X1 로부터 전사된 경우
이 경우의 표를 그리면 아래와 같다:

|           | $$A$$  | $$T$$  | $$G$$  | $$C$$  |
|-----------|--------|--------|--------|--------|
| $$X_{1}$$ | $$n$$  | $$7a$$ | $$6a$$ | $$m$$  |
| $$X_{2}$$ | $$7a$$ | $$n$$  | $$m$$  | $$6a$$ |
| $$Y$$     | $$7a$$ | $$n$$  | $$m$$  | $$6a$$ |

이 때, 수소결합 단서로부터 아래의 식이,  
$$2(7a+n)+3(6a+m)=280$$

네 번째 발문으로부터 아래의 식이 세워진다:  
$$3(7a+m)=5(6a+n)$$

이 경우에서, 나머지 ㉠, ㉡이 각각의 경우인 가지를 생각해보자.

**<big>㉠ = G, ㉡ = T</big>**  
세 번째 발문으로부터, 아래의 식이 추가로 세워진다:  
$$6a+m=2(7a+n)$$

이 식을 그대로 수소결합 식에 대입하면:  
$$7a=35-n, 6a=70-m$$

이라는 식이 나온다. 이 두 식을 네 번째 발문의 식에 연립하여 정리하면, 대략 아래와 같은 식이 나오는데:  
$$8m-8n=245$$

이를 만족시키는 양의 정수 $$m$$, $$n$$ 이 존재하지 않는다. 따라서 **틀린 경우**이다.

**<big>㉠ = T, ㉡ = G</big>**  
위와 동일한 흐름으로 아래와 같은 일련의 식이 도출되는데:    
$$2(6a+m)=7a+n$$  
$$7a=80-n,\space6a=40-m$$  
$$8n-8m=40,\space n-m=5$$  

두 번째의 두 식을, 왼쪽에서 오른쪽을 빼고 마지막의 $$n-m$$ 을 대입하면:  
$$a=40-(n-m)=40-5=35$$

가 된다. 그런데 이 $$a$$ 값을 두 번째 식에 다시 대입하면 식을 만족시키는 양의 정수 $$m$$, $$n$$ 이 존재하지 않는다. 따라서 **이것도 틀린 경우**이다.

결론적으로, **$$Y$$ 는** $$X_{1}$$ 가 아닌 **$$X_{2}$$ 로부터 전사되었음**을 알 수 있다. 

### Y 는 X2 로부터 전사되었구나...
다시 표를 그려보면 아래와 같다:

|           | $$A$$  | $$T$$  | $$G$$  | $$C$$  |
|-----------|--------|--------|--------|--------|
| $$X_{1}$$ | $$7a$$ | $$n$$  | $$m$$  | $$6a$$ |
| $$X_{2}$$ | $$n$$  | $$7a$$ | $$6a$$ | $$m$$  |
| $$Y$$     | $$7a$$ | $$n$$  | $$m$$  | $$6a$$ |

위쪽에서와 비슷하게 수소결합과 네 번재 발문으로부터 아래 두 식이 세워진다:  
$$2(7a+n)+3(6a+m)=280$$  
$$5(7a+m)=3(6a+n)$$  

**<big>㉠ = G, ㉡ = T</big>**  
마찬가지로 동일한 흐름으로 아래와 같은 일련의 식이 도출되는데:  
$$6a+m=2(7a+n)$$  
$$7a=35-n, 6a=70-m$$  
$$8n-8m=245$$  

이를 만족시키는 양의 정수 $$m$$, $$n$$ 이 존재하지 않는다. 따라서 **틀린 경우**이다.

**<big>㉠ = T, ㉡ = G</big>**  
~~살려줘~~마지막으로 동일한 흐름을 따라 아래와 같은 식이 도출된다:  
$$2(6a+m)=7a+n$$  
$$7a=80-n,\space6a=40-m$$  
$$8n-8m=280,\space n-m=35$$  

이제 두 번째의 두 식을, 왼쪽에서 오른쪽을 빼고 마지막의 $$n-m$$ 을 대입하면:  
$$a=40-(n-m)=40-35=5$$

가 된다. 이 $$a$$ 를 두 번째 식들에 넣으면, $$n=45$$, $$m=10$$ 이 된다.

즉, 발문에 위배되지 않고 모든 값이 밝혀졌으므로 이 경우가 맞는 경우이며, 표를 완성하면 아래와 같다:

|           | $$A$$  | $$T$$  | $$G$$  | $$C$$  |
|-----------|--------|--------|--------|--------|
| $$X_{1}$$ | $$35$$ | $$45$$ | $$10$$ | $$30$$ |
| $$X_{2}$$ | $$45$$ | $$35$$ | $$30$$ | $$10$$ |
| $$Y$$     | $$35$$ | $$45$$ | $$10$$ | $$30$$ |

### BOGI를 보자!

- $$Y$$ 는 $$X_{2}$$ 로부터 전사되었다. (X)
- $$X$$ 의 뉴클레오타이드 총 갯수는 $$2\times(35+45+10+30)=2\times120$$ 이므로 240개가 맞다. (O)
- $$Y$$ 에서 G 는 10개다. (X)

필자는 운이 나빠서 4개 다 계산하고 찾았다. 게다가 3미지수 연립방정식은 진짜 쥐약이라 엄청 많이 해멨다...  
미지수 정리되는거랑 식의 형태를 보면 훨씬 빠르게 계산할 수 있어보이기는 한데... 나는 생물을 좋아하는거지 수학을 좋아하는건 아니다.  

죽을 것 같다...

## 18번: 코돈
지면 상 16번의 집단 유전 문제는 마지막에 다루려고 한다. 우선 코돈부터 보자.

이중 가닥 DNA 중 한 가닥의 염기서열을, 일부만 모든 염기를 ㉠, ㉡, ㉢, ㉣ 로 뚫어 제시했다.
기타 돌연변이 $$y$$ 에 대한 단서와 아미노산 $$X$$ 및 $$Y$$ 에 대한 단서를 주었다.

대략 아래와 같은 과정으로 풀었다:
1. 두 가지 가능한 개시코돈 중 조건에 위배되는 것을 쳐내고 진짜 개시코돈을 찾는다. 여기서 ㉠, ㉡이 밝혀진다.
2. 세 번째 발문으로부터 아이소류신을 단서로 나머지 ㉢, ㉣을 밝힌다.
3. 기타 각 폴리펩타이드의 아미노산 서열과 그것이 합성될 때 사용된 종결코돈을 파악한다.
4. 보기를 본다!

### 개시코돈은 어느 것?
일반적으로 5' 이 왼쪽에 있다고 봤을 때, 서열의 오른쪽에서 `5'-CAT` 이나 왼쪽에서 `5'-ATG` 를 찾는다.  
각각 주어진 가닥이 주형가닥이었을 경우와 그렇지 않았을 경우이다.

아래 두 경우가 가능한 개시코돈이 되는데:

<style>s { opacity: 0.5; }</style>
<style>pre.co { line-height: 100%; }</style>
<style>span.e { letter-spacing: 4.3px; }</style>
<style>span.d { width: 0; height: 32px; display: inline-block; border-right: 1px solid; border-color: #888888; margin-bottom: -10px; }</style>
<style>span.d1 { border-color: #ff4d0040; }</style>
<style>span.d1f { border-color: #ff4d00a0; }</style>
<style>span.d2 { border-color: rgba(255,166,0,0.25); }</style>
<style>mark.rel { position: absolute; left: 50%; transform: translateX(-50%) translateY(-20px); }</style>
<style>mark.aug { background-color: #6580a880; color: white; }</style>
<style>mark.aug.d { filter: grayscale(1); }</style>
<style>mark.d1 { background-color: #ff4d0040; color: white; }</style>
<style>mark.d2 { background-color: rgba(255,166,0,0.25); color: white; }</style>

<pre>5'-CGACT<mark class="aug">ATG</mark>CAT㉣㉡㉠㉢㉠㉣㉣㉠㉣㉡㉡㉣㉢㉠㉣G<mark class="aug">CAT</mark>GACGT-3'</pre>

우선 두 경우 모두 9번째 코돈이 유효한 종결코돈이다. 그러면 나머지 조건을 더 봐야한다.  

이 때 $$Y$$ 가 5개의 염기로 이루어진다고 했고 연속된 2개의 동일한 염기가 결실되었으므로 기호로 뚫린 `㉣㉣` 이나 `㉡㉡` 가 결실되어야 한다.  
그런데 제시된 서열이 주형이 아니라면, 즉 왼쪽의 개시코돈이 진짜라면 두 경우를 모두 결실시켜보아도 6번째 코돈에서 유효한 종결코돈이 형성되지 않는다.

<pre class="co">
5'-CGACT<mark class="aug">ATG</mark><span class="d"></span>CAT<span class="d"></span>㉣㉡㉠<span class="d"></span>㉢㉠<mark class="d1">㉣<span class="d d2"></span>㉣</mark>㉠<span class="d d1"></span>㉣<span class="d d2"></span><mark class="d2">㉡㉡</mark><span class="d d1"></span><u>㉣㉢㉠</u><span class="d"></span>㉣G<mark class="aug d">CAT</mark>GACGT-3'
             <span class="e">&nbsp;&nbsp;AG<span class="d i"></span> G <span class="d i"></span> G<span class="d i"></span> AA<span class="d i"></span>  G</span>
             <span class="e">&nbsp;&nbsp;GA<span class="d i"></span> A <span class="d i"></span> A<span class="d i"></span> GG<span class="d i"></span>  A</span>
</pre>

위의 서열에서 종결코돈의 위치는 밑줄친 `5'-㉣㉢㉠` 부분인데, ㉢, ㉣ 이 각각 C 와 T 중 하나이지만 C 를 포함하는 종결코돈은 없으므로 유효한 종결코돈이 없는 것이 된다.  
그러므로 진짜 개시코돈은 오른쪽에 있는 `5'-CAT` 이 된다.

<pre class="co">
5'-CGACTATGCA<span class="d"></span><u>T㉣㉡</u><span class="d"></span>㉠㉢㉠<span class="d d2"></span><mark class="d1">㉣㉣</mark><span class="d d1"></span>㉠<span class="d d2"></span>㉣<mark class="d2">㉡<span class="d d1"></span>㉡</mark>㉣㉢<span class="d"></span>㉠㉣G<span class="d"></span><mark class="aug">CAT</mark>GACGT-3'
             <span class="e">&nbsp;&nbsp;AG G<span class="d i"></span>&nbsp;&nbsp;<span class="d i"></span>G<span class="d i"></span> A<span class="d i"></span>A  <span class="d i"></span>G</span>
             <span class="e">&nbsp;&nbsp;GA A<span class="d i"></span>&nbsp;&nbsp;<span class="d i"></span>A<span class="d i"></span> G<span class="d i"></span>G  <span class="d i"></span>A</span>
</pre>

이 때, 종결코돈은 위의 서열에서 밑줄 친 `5'-T㉣㉡` 로 표현되는 부분인데, ㉡ 이 A 이어야 U 로 시작하는 종결코돈이 된다. 즉, ㉡ 이 A 이고 ㉠ 은 G 이다.
이걸로 서열 일부를 완성하면 아래와 같다:

<pre>
5'-CGACTATGCA<span class="d"></span><u>T㉣A</u><span class="d"></span>G㉢G<span class="d d2"></span><mark class="d1">㉣㉣</mark><span class="d d1"></span>G<span class="d d2"></span>㉣<mark class="d2">A<span class="d d1"></span>A</mark>㉣㉢<span class="d"></span>G㉣G<span class="d"></span><mark class="aug">CAT</mark>GACGT-3'
</pre>

정리하면 제시된 서열이 전사 주형가닥이며, ㉡ 이 A 이고 ㉠ 은 G 다.

### Iso?

발문에서 $$Y$$ 에는 아이소류신이 있다고 했다. 아이소류신을 나타내는 코돈은 `5'-AU(UCA)` 이며, 이것은 주형가닥에서의 트리플렛 코드로 `5'-(AGT)AT` 이다. 

위의 서열에서, AA 가 결실되면 어느 곳에도 `5'-(AGT)AT` 가 형성되지 못하므로 아래처럼 ㉣㉣이 결실되어 밑줄친 세 번째 코돈에 `5'-AAT` 로 지정된 아이소류신이 형성되어야 한다:

<pre>
5'-CGACTATGCA<span class="d"></span><s>T㉣A</s><span class="d"></span>G㉢G<span class="d d1f"></span>G㉣<mark class="d2">A<span class="d d1f"></span><u>A</u></mark><u>㉣㉢</u><span class="d"></span>G㉣G<span class="d"></span><mark class="aug">CAT</mark>GACGT-3'
</pre>

물론, ㉣ 은 A 가 아니다. 그러나 우리에겐 아직 치환의 기회가 남아있다. $$Y$$ 가 형성될 때 하나의 피리미딘 염기가 다른 염기로 치환되었다고 했으며, ㉢과 ㉣ 은 피리미딘 염기이므로 다른 것으로 바꿀 수 있다.  
그렇기에, $$Y$$의 형성 과정에서 `5'-A㉣㉢` 중 ㉣ 이 A 로 치환되었으며, ㉢ 는 T 이어야 함을 알 수 있다(따라서 ㉣ 은 C 다).

### 기타 다른 것들...?
은 생략하고 바로 보기를 보자. 실제 시험에서는 여기까지만 보고 바로 보기를 통해 확인하는게 더 빠르다:

### 보기를 볼까?

- ㉣ 은 C 가 맞다. (O)
- ⓐ 는, $$Y$$ 에서의 아이소류신이 세 번째 아미노산이므로 $$X$$ 의 세 번째 아미노산을 찾으면 된다. 찾아보면 `AGU` 로 지정되는 세린이다. (X)
- $$X$$ 가 합성될 때 사용된 종결코돈은 `UAG` 이고, $$Y$$ 가 합성될 때 사용된 종결코돈은 `UGA` 이다. (X)

풀이를 풀어서 쓰니 복잡하고 길지만, 실제로 풀어보면 생각보다 막힘 없이 풀린다. 개시코돈 추론도 가짓 수가 두 가지 뿐이고, 돌연변이도 나름 복잡하지 않게 확인이 된다.  

## 20번: 제한효소

두 구역을 기호로 뚫은 염기서열과, 네 개의(!) 제한 효소의 인식 부위 및 각 제한 효소를 사용한 실험 결과를 제시했다.
특별한 내용은 없으므로 바로 시작해보자. 대략 아래와 같은 과정으로 풀었다:

1. 시험관 I 과 V 를 통해 BamH I 와 Sac I 이 작용한 위치를 염기서열 내에서 찾고, (가) 와 (나)의 염기 일부를 밝힌다.
2. 시험관 IV 를 통해 Xho I 이 작용한 위치를 염기서열 내에서 찾고 염기 일부를 더 밝힌다.
3. 여기까지 찾고 나면 Kpn I 가 작용할 수 있는 위치가 정해진다. 이를 통해 모든 염기를 밝힌다.
4. 보기를 본다!

하나하나 살펴보자.

### BamH I? Sac I?
우선 BamH I 을 먼저 잘라보자. 시험관 I 에서 생성된 조각들의 염기 수가 각각 32, 44 이므로, 주어진 서열에서 16개 짜리 서열과 22개 짜리 서열로 나뉜 것이다.
즉, 아래 두 경우 중 하나이다:

<style>pre.c { font-variant-ligatures: none; }</style>
<style>mark.bam { background-color: rgba(255,101,36,0.25); color: white; }</style>
<style>span.bam { border-color: rgba(255,101,36,0.75); }</style>
<style>mark.sac { background-color: #ffae0040; color: white; }</style>
<style>span.sac { border-color: #ffae00c0; }</style>
<style>mark.xho { background-color: #00ff8840; color: white; }</style>
<style>span.xho { border-color: #00ff88c0; }</style>
<style>mark.kpn { background-color: #00aaff40; color: white; }</style>
<style>span.kpn { border-color: #00aaffc0; }</style>
<style>span.n { height: 16px; margin-bottom: -2px; }</style>
<style>span.nn { height: 48px; margin-bottom: -30px; opacity: 0.5; }</style>

<style>span.i { height: 4px; margin-bottom: 0; border-color: transparent; }</style>

<pre class="c">
5'-ATGCC___________<span class="d bam"></span>_CCGG_<span class="d bam"></span>___________CCTAT-3'
</pre>

당장은 두 경우 모두 가능하다. 그러면 BamH I 과 같이 사용한 시험관이 있는 Sac I 을 확인해보자.  
우선 시험관 III 에서 14, 20, 42 짜리 조각이 나왔으므로 각각 7, 10, 21개 짜리 조각들이다. 여기에서,

- Sac I 인식부위의 왼쪽 5' 말단 염기는 G 이므로, 가장 왼쪽에 7개짜리 조각이 있을 수는 없다(C 이므로).
- 또, 가장 왼쪽에 21개 짜리 조각도 있을 수 없다(인식부위는 GAG 이지만 염기 서열은 CGG 이므로). 

즉, 가장 왼쪽에는 10개 짜리 조각이 있어야 한다. 그리고,

- 가장 오른쪽에도 21개 짜리 조각은 있을 수 없다(인식 부위는 CTC 이지만 염기 서열은 CCG 이므로).

그러므로 가장 오른쪽에 7개 짜리 조각이 들어가고, 21개 짜리 조각이 가운데에 위치해야 한다.  
즉, Sac I 는 아래와 같이 작용해야 한다:

<pre class="c">
5'-ATGCC__<mark class="sac"><u>GAG<span class="d sac"></span>CTC</u></mark>____CCGG_______<mark class="sac"><u>GAG<span class="d sac"></span>CT</u>C</mark>CTAT-3'
</pre>

이제 BamH I 과 Sac I 를 같이 사용한 시험관 V 를 보자. 여기서는 7, 9, 10, 12 개 짜리들이 나왔는데, 위에서 잠깐 봤던 붉은색 위치를 참고하면 
Sac I 이 작용하여 나온 조각 중 21개 짜리 조각이 BamH I 에 의해 다시 9, 12 개 짜리 조각으로 나뉘었음을 추론할 수 있다.

BamH I 이 9, 12 개 짜리 조각을 만드려면 아래처럼 작용해야 한다:

<pre class="c">
5'-ATGCC__<u>GAG<span class="d sac"></span>CTC</u>____CC<mark class="bam">GG<u>A<span class="d bam"></span>TCC</u></mark>___<u>GAG<span class="d sac"></span>CT</u>CCTAT-3'
</pre>

### Xho I!

이제 시험관 IV 를 통해 Xho I 의 작용 위치 및 서열을 파악하자.

Xho I 는 `5'-CTCGAG` 에 작용하여 7, 10, 21 개 짜리 서열을 만들었으므로, 위의 서열에서 만족할 수 있는 부분을 찾으면 아래와 같다.
Sac I 과 완전히 똑같은 염기수로 구성되는 조각들을 만들었으므로, 좌우가 반전되어있다고 생각하면 편하다:

<pre class="c">
5'-ATGC<mark class="xho">C</mark><u><mark class="xho">TC<span class="d xho"></span>GAG</mark><span class="d sac"></span>CTC</u>____CCGG<u>A<span class="d bam"></span>TCC<mark class="xho">CTC<span class="d xho"></span>GAG</mark><span class="d sac"></span>CT</u>CCTAT-3'
</pre>

### Kpn I...

이제 Kpn I 은 쉽게 찾을 수 있다. 아래처럼 작용해야 한다:

<pre class="c">
5'-ATGCC<u>TC<span class="d xho"></span>GAG<span class="d sac"></span>CTC</u><mark class="kpn"><u>GGT<span class="d kpn"></span>A</u>CC</mark>GG<u>A<span class="d bam"></span>TCCCTC</u><span class="d xho"></span><u>GAG</u><u><span class="d sac"></span>CT</u>CCTAT-3'
</pre>

다 찾았다! 이제 보기를 보자.

### 보기..를 보자.

- (가)의 3' 말단 염기는 A 이다. (X)
- II 에서 염기 개수가 32개인 DNA 조각이 생성되는건 맞다. 작용부위 기준 왼쪽 조각이 32개 짜리 조각이다. (O)
- V 에서 생성된 조각 중 염기 수가 18개 짜리인 조각은 아래 조각이다:
  <pre class="co">
  5'-<span class="d n bam"></span>GA<span class="d nn bam"></span>TCCCTCGAG<span class="d nn sac"></span>CT<span class="d n sac"></span>-3'
  3'-  <span class="d nn i bam"></span>  <span class="d n bam"></span>GGAGC<span class="d n sac"></span>  <span class="d nn i sac"></span>  -3'
  </pre>
  그러므로 A 는 세 개가 맞다. (O)

제한효소 문제는 어디서부터 시작하느냐가 관건인 것 같다.  
이 많은 시험관 중에 어느 하나로부터 풀이가 시작되는데, 그걸 찾는게...


## 16번: 집단 유전
이 문제는... 뭔가 찝찝하다. 분명히 답이 맞았는데... 평가원이 낸 문제들 중에 맞춰놓고 이렇게 찜찜한 적이 없었던 것 같다.  
분명히 잘못 푼 것 같은데 답이 맞아서 그렇다. 이런 이유로 가장 마지막으로 순서를 내렸다.  

혹시라도 아래의 풀이 중 잘못된 부분이 있으면 지적해주었으면 좋겠다...

우선 아래의 과정을 통해 풀었다:
1. 네 번째 발문으로부터 $$I$$과 $$II$$ 에서 $$A$$, $$A*$$ 의 빈도를 구한다.
2. 다섯 번째 발문으로부터 $$I$$과 $$II$$ 에서 $$B$$, $$B*$$ 의 빈도를 구한다. 이 과정에서 형질 (나)의 우열과 형질을 발현시키는 유전자가 어느것인지도 밝혀진다.
3. 마지막 조건으로부터 $$A$$ 와 $$A*$$ 사이의 우열과 어느 것이 형질을 발현시키는 유전자인지 파악한다.
4. 요구하는 확률을 계산한다.

### AA??
우선, 네 번째 발문에서 분수의 분모인 ㉠ 이 $$AA$$ 와 $$A^*A^*$$ 중 하나라고 했다. 그리고 분수의 분자는 $$AA + AA^*$$ 이다.  
그런데, II 에서 분수의 값이 7/9로 1보다 작다. 즉, 만약 ㉠이 $$AA$$ 라면 식을 만족시키는 양의 정수가 존재하지 않으므로, ㉠ 은 곧바로 $$A^*A^*$$ 이 된다.  

그러므로 ㉠ 이 $$A^*A^*$$ 이라고 보고 제시된 식을 풀어보자.  
$$A$$ 의 빈도를 $$p$$, $$A^*$$ 의 빈도를 $$q$$ 라고 했을 때:

$$
\begin{equation*}
\frac{p^2+2pq}{q^2}=\frac{2p-p^2}{(1-p)^2}
\end{equation*}
$$

의 값이 I 에서 $$\frac{5}{4}$$ 이고 II 에서 $$\frac{7}{9}$$ 이다.

먼저 I 을 정리해보면,

$$
\begin{equation*}
\begin{aligned}
5(1-p)^2=\space&4(2p-p^2)\newline
9p^2-18p+5=\space&(3p-1)(3p-5)=0\newline
& \therefore \space\space p_{I}=\frac{1}{3}, \space\space q_{I}=\frac{2}{3}
\end{aligned}
\end{equation*}
$$

그리고 II 를 정리해보면:

$$
\begin{equation*}
\begin{aligned}
7(1-p)^2=\space&9(2p-p^2)\newline
16p^2-32p+7=\space&(4p-1)(4p-7)=0\newline
& \therefore \space\space p_{II}=\frac{1}{4}, \space\space q_{II}=\frac{3}{4}
\end{aligned}
\end{equation*}
$$

### (나)...?

우선, $$B$$ 와 $$B^*$$ 사이의 우열이 분명하다고만 했지, 어느 것이 형질을 발현시키는지, 우성 형질인지 열성 형질인지도 주지 않았다.  
즉, 각 경우 모두 4개의 가짓수를 해봐야한다. 단, 이 중 두 가지는 계산하지 않고도 제외된다.  
$$B$$ 의 빈도를 $$p$$, $$B^*$$ 의 빈도를 $$q$$ 라고 했을 때 각각을 살펴보면:

- $$i)\space B > B^*, [B]$$

  $$
  \begin{equation*}
  \begin{aligned}
  \frac{2p^2+2pq}{2(p^2+2pq)}=\frac{p^2+pq}{p^2+2pq}=\frac{p+q}{p+2q}=\frac{1}{2-p}=\frac{1}{6}
  \end{aligned}
  \end{equation*}
  $$
  
  이 때, $$0 \le p \le 1$$ 인 $$p$$ 가 존재하지 않는다. 따라서 틀린 경우이다.

- $$ii)\space B < B^*, [B]$$

  이 경우는, $$BB$$ 들을 모아 $$B$$ 의 빈도를 찾았으므로 1이어야 한다. 그러므로 틀린 경우이다.

- $$iii)\space B > B^*, [B^*]$$

  이 경우는, $$B^*B^*$$ 들을 모아 $$B$$ 의 빈도를 찾았으므로 0이어야 한다. 그러므로 틀린 경우이다.

- $$iv)\space B < B^*, [B^*]$$

  $$
  \begin{equation*}
  \begin{aligned}
  \frac{2pq}{2(q^2+2pq)}=&\space\frac{p}{q+2p}=\frac{p}{p+1}=\frac{1}{6}\newline
  &\therefore\space p_{I}=\frac{1}{5}, q_{I}=\frac{4}{5}
  \end{aligned}
  \end{equation*}
  $$
  
  이 때, 위의 빈도는 $$I$$ 에서의 빈도이고, 발문에서 $$I$$ 에서의 $$B$$ 의 빈도가 $$II$$ 에서 $$B^*$$ 빈도의 $$\frac{1}{2}$$ 라고 했으므로, 

  $$
  \therefore \space\space p_{II}=\frac{3}{5}, \space q_{II}=\frac{2}{5}
  $$

### (가).......??

이제 (나) 에 대한 것은 모든 것을 찾았고, (가)에 대해 마무리지어야 한다. 마지막 발문을 보면, 오른쪽 분수의 분자는 $\frac{16}{25}$ 이다.
즉, 오른쪽 분수의 분모 부분이 $\frac{16}{25}\times\frac{15}{16}=\frac{3}{5}$ 이어야 한다.  

(나) 때와 마찬가지로 4가지 해보면 된다. 다만, 이 경우는 3가지(???)가 계산을 하지 않아도 쳐내진다:

- $$i)\space A > A^*, [A]$$  
  이 경우는, $AA + AA^*$ 중에서 $A^*A^*$ 를 찾았으므로 0이어야 한다. 그러므로 틀린 경우이다.

- $$ii)\space A < A^*, [A]$$  
  이 경우는, $AA$ 중에서 $A^*A^*$ 를 찾았으므로 0이어야 한다. 그러므로 틀린 경우이다.

- $$iii)\space A > A^*, [A^*]$$  
  이 경우는, $A^*A^*$ 중에서 $A^*A^*$ 를 찾았으므로 1이어야 한다. 그러므로 틀린 경우이다.

- $$iv)\space A < A^*, [A^*]$$  
  이미 다른 모든 경우가 다 쳐내졌지만... 일단 유효한 계산이 가능하다. 해보면:
  $$
  \begin{equation*}
  \begin{aligned}
  \frac{q^2}{2pq+q^2}=& \space \frac{q}{2p+q}=\frac{q}{2-q}=\frac{3}{5}\newline
  & \space \therefore 8q=6, \space q_{II}=\frac{3}{4}, \space p_{II}=\frac{1}{4}
  \end{aligned}
  \end{equation*}
  $$
  이므로 위에서 구했던(??) $$q_{II}$$ 와도 맞아떨어진다.

### 확률과 통계

유전자형이 $$AA^*BB^*$$ 인 암컷과 임의의 수컷이 교배하여 (가)와 (나)가 발현될 확률을 물었다.
둘 모두 *이 붙은 것이 발현 유전자인 우성 형질임을 감안하고 계산해보자.

- 부모가 $$AA^*$$ 를 내려줄 확률  
  $$\frac{1}{2}\times\frac{1}{3}+\frac{1}{2}\times\frac{2}{3}=\frac{1}{2}$$
- 부모가 $$A^*A^*$$ 를 내려줄 확률  
  $$\frac{1}{2}\times\frac{2}{3}=\frac{1}{3}$$
- 부모가 $$BB^*$$ 를 내려줄 확률  
  $$\frac{1}{2}\times\frac{1}{5}+\frac{1}{2}\times\frac{4}{5}=\frac{1}{2}$$
- 부모가 $$B^*B^*$$ 를 내려줄 확률  
  $$\frac{1}{2}\times\frac{4}{5}=\frac{2}{5}$$

그리고,

- $$AA^*BB^*$$ 일 확률  
  $$\frac{1}{2}\times\frac{1}{2}=\frac{1}{4}$$
- $$A^*A^*BB^*$$ 일 확률  
  $$\frac{1}{3}\times\frac{1}{2}=\frac{1}{6}$$
- $$AA^*B^*B^*$$ 일 확률  
  $$\frac{1}{2}\times\frac{2}{5}=\frac{1}{5}$$
- $$A^*A^*B^*B^*$$ 일 확률  
  $$\frac{1}{3}\times\frac{2}{5}=\frac{2}{15}$$

위의 네 값을 모두 더하면:

$$\frac{1}{4}+\frac{1}{6}+\frac{1}{5}+\frac{2}{15}=\frac{3}{4}$$

이므로, 답은 ② 가 된다.... 는 것인데.

### 이상해, 이상해애애애앳!!

굉장히 이상하다. 일단 크게는
- ㉠ 이 별다른 계산 없이 눈으로 $$A^*A^*$$ 임을 확인할 수 있다는 점
- 마지막 발문의 $$\frac{16}{15}$$ 가 단순히 '0 이나 1이 아니다' 를 파악하기 위해서만 사용된다는 점

기존까지 풀었던 집단유전 문제들과 비교해보면 심히 이상하다. 잘못 풀었거나... 지나치게 많은 것을 구했거나... 일 것 같은데...  
잘 모르겠다. 아무튼 맞았으니 된거지만...

## 후기

집단 유전은 난이도가 좀 정신이 나간 것 같고, 샤가프는 운이 좋으면 빠르게 넘어갈 수 있었을 것이고...
나머지들은 그렇게 막 미친듯이 어렵지는 않았던 것 같다. 근데 집단유전... 진짜 뭐지.
