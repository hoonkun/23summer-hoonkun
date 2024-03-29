---
author: GoHoon
title: 24학년도 수능 생명과학II 킬러들을 풀어보자
date: 2023-12-28, 14:34
categories: [biology-ii, dna-replication, codon, group-inheritance, restriction-enzyme]
expand:
  max_columns: 2
  max_rows: 2
---
2023년에 시행된 2024학년도 대학수학능력 시험의 생명과학 II 과목 킬러 문제들을 풀어보자.  
<!-- Excerpt -->

## 서론
이번에도 돌아온 수능 타임이다.  
매년 돌아오는 연례행사이자 숙제같은 무언가. 올해도 해보려고 한다.  

다만, 이번에는 누구 씨의 발언으로 난이도가 꽤 있었다고 하던데, 정말 그런지도 한 번 살펴보자.  
그대신 이번에는 문제 별로 별도 게시글을 쓰는 대신 하나의 게시글에 퉁쳐서 적으려고 한다.  

그리고, 이번에는 지면 상의 이유(?) 로 문제 스크린샷이 없다.  
ebsi 홈페이지에서 내려받을 수 있으니 그것을 같이 참고하자.

## 14번: DNA 복제
복제의 주형으로부터 새로 합성된 선도 DNA 가닥을 하나 주되 기호로 구멍 몇 개를 뚫고, 프라이머와 관련된 단서 몇 개를 줬다.  
대략 아래의 과정을 통해 풀게 된다:
1. 마지막 조건을 통해 ㉠ 과 ㉡ 의 정체를 각각 밝힌다.
2. 세 번째 조건을 통해 ㉯가 먼저 합성되었는지, ㉰가 먼저 합성되었는지를 밝힌다.
3. 보기를 본다!

이제 각각을 보자.

### ㉠ 과 ㉡ 의 정체
마지막 조건에서, ㉯와 ㉰의 구성 염기를 다 합해 C/G 가 1/2 이라고 했다.  
이 때, 비율 산정에 U가 관여하지 않았으므로 바로 ㉮ 에서 C/G 가 2/1 이라고 봐도 무관하다.  
만약 ㉠ 가 G 라면 ㉮ 에서 G 의 수가 9 이므로 비율을 만족시키는 정수 해가 없다.  
**따라서 ㉠ 는 C이고 ㉡ 이 G이다.**

### 선도가닥과 지연가닥
프라이머 X~Z 는 4개의 염기로 구성된다.  
㉮가 선도가닥이라고 밝혔으므로, 바로 주어진 가닥 ㉮의 5'쪽 4개의 염기서열로 구성된 조각이 프라이머 X가 된다.  
여기서, Z 가 X 와 상보적이므로 Z 의 서열은 `5'-GGCG-3'` 가 된다.  
그리고, Z를 포함하는 가닥은 ㉮ 와 상보적이므로, Z의 위치를 찾으려면 ㉮에서 `5'-CGCC-3'` 를 찾으면 된다.  
해당 서열은 주어진 ㉮의 서열 3' 말단 쪽 4개의 염기 서열과 일치하므로, 주어진 서열을 절반으로 나누었을 때 오른쪽이 ㉰ 이고 왼쪽이 ㉯ 이다.  
**즉, ㉯ 가 먼저 합성되었다.**

### 보기
- ㉯가 먼저 합성되었으므로 틀린 보기이다. (X)
- Y의 서열은 왼쪽 서열의 5' 말단 쪽 4개의 염기이므로, `5'-CGCC-3'` 가 된다. 이는 X의 서열과 일치한다. (O)
- 염기 수를 세면 된다. 6/8 이므로 3/4가 맞다. (O)

프라이머가 언급되었지만 정말 다행히도 U를 사용하여 변수를 만들지 않았다.  

## 16번: 제한 효소
제한 효소 세 종류를 주고, 그 중 두 종류를 사용하여 잘랐을 때 생성된 염기 수를 주었다(몇 개를 기호로 뚫었지만).  
대략 아래의 과정을 통해 풀게 된다:  
1. 시험관 I, II, IV 를 통해 ㉠, ㉡, ㉢ 의 일부를 밝힌다.  
2. III 에서 생성된 DNA 조각 수를 단서로 모든 염기 서열을 밝히고, III에서 생성된 각 DNA 조각의 염기 수를 밝힌다.
3. 보기를 본다!

이제 각각을 보자.
### Bgl II? Kpn I?
일단, 제한효소들의 인식 위치를 보면 염기 서열이 같다. 즉, 방향을 신경 쓸 필요가 없다.  
예를 들면, BglII 의 위쪽도 `5'-AGATCT-3'` 이고 아래쪽도 같은 서열이다.  

이 점을 숙지하고, 마저 살펴보자.  
시험관 II에서, Kpn I 를 넣고 잘랐을 때 30, 38개의 염기로 구성된 조각들이 나왔으므로, 주어진 서열에서 15번째가 잘렸거나 19번째가 잘렸을 것이다.  
즉, 아래 두 상황 중 하나일 것이다.
<style>mark.exp { background-color: rgba(255,214,90,0.21); color: white; }</style>
<style>span.strong1 { color: #aaccff; font-weight: bold; }</style>
<style>span.strong2 { color: #ffccaa; font-weight: bold; }</style>
<style>span.strong3 { color: #f4ffaa; font-weight: bold; }</style>
<style>span.sep1 { display: inline-block; width: 0; height: 28px; transform: translateY(8px); border-left: 1px solid #AACCffC0; }</style>
<style>span.sep2 { display: inline-block; width: 0; height: 28px; transform: translateY(8px); border-left: 1px solid #ffCCaaC0; }</style>
<style>span.sep3 { display: inline-block; width: 0; height: 28px; transform: translateY(8px); border-left: 1px solid #f4ffaaC0; }</style>
<pre>5'-AAC____A_______<span class="sep1"></span>___T<span class="sep1"></span>AC__________GAC-3'</pre>
위에서 `|` 로 표시한 위치를 중심으로 Kpn I 의 인식범위가 존재하는지 확인해보자.  
일단 두 번째 상황도, 세 번째 상황도 현재까지 주어진 단서로는 성립 가능하다.  
즉, 둘 다 해보고 모순을 찾아야한다.  

- 첫 번째 경우가 맞다면?    
  시험관 IV 에서 Bgl II 및 Kpn I 를 사용해 잘랐을 때 12, 18, 18, 20 개의 조각이 나왔으므로, 
  절반으로 나눴을 때 각각 6, 9, 9, 10개의 염기로 구성되었을 것이다. 여기서, 6 + 9 와 9 + 10 이 각각 15, 19 이므로 II 에서 생긴 DNA 조각의 염기 수 조합과 일치한다.  
  즉 Bgl II 에 의해 왼쪽에서 6 / 9 개로 다시 잘렸고, 오른쪽에서 9 / 10 개로 다시 잘렸다는 뜻이다.  
  <pre>5'-AAC___<span class="sep2"></span>_A_<span class="sep2"></span>______<span class="sep1"></span>___TAC___<span class="sep2"></span>_<span class="sep2"></span>______GAC-3'</pre>
  오른쪽은 당장 확인이 안되지만, 왼쪽은 바로 확인이 된다.  
  Bgl II 에서 4번째나 2번째 염기는 C 이거나 G 이지 A가 아니다.  
  **즉, 이 경우는 틀린 경우이고 두 번째 경우가 맞는 경우이다.**

이제 맞는 경우를 다시 보고, Kpn I 의 서열을 참고해 채울 수 있는 염기를 채운 뒤, Bgl II 에 의해 왼쪽에서 9 / 10 개로 다시 잘렸고 6 / 9 개로 잘렸다고 상정하자.
<pre>5'-AAC____A_<span class="sep2"></span>_<span class="sep2"></span>______<span class="strong1">GG</span>T<span class="sep1"></span>AC<span class="strong1">C</span>___<span class="sep2"></span>___<span class="sep2"></span>___GAC-3'</pre>

이 때, Bgl II 의 두 번째 염기가 G 이므로 왼쪽은 9 - 10 이 아닌 10 - 9 로 잘렸다고 볼 수 있다.  
그리고, 왼쪽이 10 - 9 로 잘렸을 때 가장 왼쪽 조각은 20개의 염기로 구성된다. 그런데 시험관 I 에서 12개 짜리 조각이 있다고 했으므로, 오른쪽은 6 - 9 가 아닌 9 - 6 으로 잘렸다고 볼 수 있다.  

이에 따라 잘린 곳을 확정하고 염기를 채우면 아래와 같아진다:
<pre>5'-AAC____A<span class="strong2">GA</span><span class="sep2"></span><span class="strong2">TCT</span>___GGT<span class="sep1"></span>ACC___<span class="strong2">AGA<span class="sep2"></span>TCT</span>GAC-3'</pre>

### Xho I!
이제 시험관 III 을 보자. 총 4개의 조각이 나왔다고 한다.  
그러면 위의 서열을 보고 4개가 나오려면 어떻게 서열이 구성되어야 하는지 살펴보자.  
<pre>5'-AAC<mark class="exp"><span class="strong3">CTC<span class="sep3"></span>G</span></mark>A<mark class="exp">GA<span class="sep2"></span>TCT<span class="strong3">C<span class="sep3"></span>GA</span>GG</mark>T<span class="sep1"></span>AC<mark class="exp">C<span class="strong3">TC<span class="sep3"></span>G</span>AGA<span class="sep2"></span>TCT</mark>GAC-3'</pre>

다 찾았다! 이제 보기를 보자.

- ㉠ 의 5' 말단 염기는 C 가 맞다. (O)
- ⓐ 와 ⓑ 는 각각 20 과 36이다. 20개 짜리 조각은 가장 왼쪽의 조각이므로, 아래의 조각이다:
  <pre>5'-AACCTCGA    -3'<br/>3'-TTGGAGCTCTAG-5'</pre>
  따라서 A는 5개가 맞다.
- III 에서 생성되는 각 DNA 조각의 염기 수는 12, 16, 20, 20 이다. 18개 짜리는 없다.

개인적으로 제한 효소 문제는 쥐약이다. 매 번 새롭게 어렵다.

## 17번: 코돈
드디어 대망의 코돈이다.  
염기 서열 두 조각을 주고 어떤 순서인지 알려주지 않았으며, 조각 하나는 말단이랑 서열 일부까지 가려놨다.  
거기에 아미노산 서열도 안주고 그냥 몇 개인지랑 뭐뭐를 포함하는지만 줬다.  

그냥 딱 봐도 보스 냄새가 풀풀 난다.  
일단 아래와 같은 과정을 통해 풀게 된다:
1. ⓐ 와 (가) 에 가능한 가짓수를 전부 시도해 맞는 것 하나를 찾는다. 이 과정에서 ㉠ 을 제외한 염기서열이 나온다.  
2. ㉠의 서열로 가능한 것을 나열한 뒤 맞는 것 하나를 찾는다. 이 과정에서 전체 염기서열이 밝혀진다.  
3. Y의 돌연변이를 만들어본다.
4. 보기를 본다.

이제 하나하나 해보자.

### 이게 다 몇 가지야 미친
실질, ⓐ가 5' 인 경우와 3' 인 경우, (가) 가 I 인 경우와 II 인 경우 각각 4가지가 나온다.  
다만 빠르게 쳐낼 수 있는 가짓수가 있다. 마저 살펴보자.  

우선, 주어진 가닥이 전사의 주형이 된 가닥이므로, 개시코돈을 구성하는 5'-CAT-3' 를 찾는다.  
I에서는 끝에서 3-6 번째 정도가 보이는데, 아래의 흐름을 따른다:
- 이게 진짜 개시코돈이라는 전제 하에, I가 (가) 라면 8개의 아미노산을 만들기 위한 염기 수가 부족하다. 즉 I는 (나)이다.  
- 이것이 진짜 개시코돈이라면 제시된 대로 8개의 아미노산을 만들고 종결코돈이 나와야한다.  
  이 경우를 따라보면 I에서는 5개의 아미노산이 나오고, 즉 II 에서 3개의 아미노산을 만들고 종결코돈이 나와야한다.  
  그런데 ⓐ 가 5' 인 경우도, 3' 인 경우도 4번째 코돈이 AGU 이거나 UC_ 이므로 종결코돈이 아니다.

따라서 이건 진짜 개시코돈이 아니다.  
즉, I에는 유효한 개시코돈이 없으므로 (가)여야 한다. 그래야 (나) 에 있는 개시코돈으로 시작하여 8개의 아미노산을 만들 수 있다.

이제 ⓐ를 보자. 여기에 진짜 개시코돈이 있어야 한다.  
그런데 I에 유효한 종결코돈이 있을 것이므로, 그것을 먼저 찾아보자. `TTA`, `CTA`, `TCA` 중 하나를 찾는다.  
`CTA` 와 `TCA` 가 각각 하나씩 있다. 각각을 종결코돈이라고 가정하고 8개의 아미노산을 만들어보자.  
- `CTA` 의 경우 I 에서 4개의 아미노산이 만들어지고 1개의 염기가 남는다.
  - ⓐ 가 5' 이라면, 개시코돈이 존재하지만 6개의 아미노산으로 이루어진다.
  - ⓐ 가 3' 이라면, 개시코돈을 찾지 못한다.
- `TCA` 의 경우 I 에서 2개의 아미노산이 만들어지고 2개의 염기가 남는다.
  - ⓐ 가 5' 이라면, ㉠의 오른쪽 3개의 염기가 개시코돈을 구성할 수도 있다. 그런데 이 경우에는 남은 ㉠을 어떻게 채워도 세린 1개와 아스파트산 1개를 만들어내지 못한다.  

즉, ⓐ 는 3' 이고, I는 (가) 이다. 아직 ㉠은 모른다.  

### 이게 맞냐?
위에서 찾은 내용으로 염기서열은 완성하면 아래와 같다:
<pre>3'-CT<b><u>TAC</u></b>GACTAG_____ATGCGTACGC<b><u>ACT</u></b>GCATCGC-5'</pre>

이 상태에서 아미노산 서열을 만들어보자. 

```text
Met - Leu - Iso - ? - ? - Tre - His - Ala
```
세린 및 아스파트산이 없다. 즉 저 물음표 두 개가 각각 세린 및 아스파트산이라는 의미가 된다.  
두 번째 물음표를 구성하는 코돈의 마지막 염기가 U이므로 그것을 숙지하고 가능한 코돈의 염기서열을 나열해보자.  
- GAUAG U (퓨린 4 피리미딘 1)
- GACAG U (퓨린 4 피리미딘 1)
- GAUUC U (퓨린 2 피리미딘 3)
- GACUC U (퓨린 2 피리미딘 3)
- UC(A/G)GA U

이 때 ㉠ 은 3개의 피리미딘 염기와 2개의 퓨린 계열 염기로 구성되는데, 코돈과 트리플렛코드는 서로 상보적이므로 위의 다섯 가지 중 피리미딘 계열 염기 2개 및 퓨린 계열 염기 3개로 이루어진 것을 찾아야 한다.  
그런데 위의 네 가지는 모두 만족하지 않는다. 즉 마지막 경우가 맞는 경우이다.  

### Y 를 만들자
우선 현재까지 정해진 염기 서열은 아래와 같다:
<pre>3'-CTTACGACTAGAG(C/T)CTATGCGTACGCACTGCATCGC-5'</pre>
Y는 X 에서 연속되는 두 개의 염기가 결실된다.  
그런데, 위의 서열에서 두 개의 연속되는 염기는 [2-3] 염기와, 아직 불확실한 부분의 CC 뿐이다.  
그러나 [2-3] 염기가 결실되면 개시코돈이 제거되기 때문에 불확실한 마지막 염기가 C 가 되고 Y에서는 CC 가 결실된 것으로 볼 수 있다.  

따라서 결실시키면 아래처럼 된다:
<pre>3'-CT<b><u>TAC</u></b>GACTAGAGTATGCGTACGCACTGC<b><u>ATC</u></b>GC-5'</pre>

### 보기를 보자
- ⓐ 는 3' 말단이다 (X)
- X 의 세린을 암호화하는 코돈은 5'-UCG-3' 으로, 3' 말단 염기는 G가 맞다.
- Y의 다섯 번째 아미노산은 UAC 코돈으로 생성되는 Tyr 이다.

모순을 찾는 방식이 기존과 많이 다르다. 
기존에는 단계별로 명확하게 맞다고 상정할 수 있는 경우가 찾아져서 운 좋으면 빠르게 다음으로 넘어갈 수 있었는데, 이 문제는 나머지 아닌 경우를 모두 쳐내고 남은 하나를 찾아야 했다.  

## 20번: 집단유전
수학 II 문제다.  

두 집단 $$I$$, $$II$$ 모두 하디-바인베르크 평형이 유지된다고 제시했으며, 개체 수에 미지수 $$N$$(자연수) 을 사용하여 제시했다.  
그리고 두 형질 (가) 와 (나) 가 서로 다른 염색체에 있으며~~당연한 소리를!~~ $$A$$ 와 $$a$$, $$B$$ 와 $$b$$ 각각 우열관계가 분명하다고 제시했다.  

대략 다음 과정을 통해 풀게 된다:
1. 네번째 조건으로부터 $$I$$ 과 $$II$$ 에서 $$A$$ 와 $$a$$ 의 빈도, $$II$$에서 $$B$$ 와 $$b$$ 의 빈도를 구한다.
2. 다섯번째 조건으로부터 $$I$$에서 $$B$$ 와 $$b$$ 의 빈도를 구한다.
3. 마지막 조건으로부터 $$I$$와 $$II$$의 개체 수가 각각 $$2N$$, $$3N$$ 중 어느 것인지를 밝힌다.
4. 문제가 묻는 $$I$$에서 (나)가 발현된 개체 수를 구한다.

이제 각각을 살펴보자.

### 이게 수학 II지 뭐야
'$$A$$를 가진 개체들을 합해서 구한 $$a$$의 빈도' 를, $$A$$의 빈도를 $$p$$라고 하고 $$a$$의 빈도를 $$1 - p$$ 라고 했을 때 식으로 나타내면 아래와 같아진다:
$$
\begin{equation*}
\begin{aligned}
\frac{2p(1-p)}{2(p^2 + 2p(1-p))} &= \frac{2p - 2p^2}{4p - 2p^2}\\[1em]\
&= \frac{1 - p}{2 - p}
\end{aligned}
\end{equation*}
$$
위의 식의 값이 $$I$$에서 $$\frac{3}{8}$$ 이고 $$II$$ 에서 $$\frac{4}{9}$$ 이므로, 각각을 계산해보자.
$$
\hbox{$
\begin{equation*}
\begin{split}
\frac{1 - p}{2 - p} &= \frac{3}{8}\\[1em]\
8 - 8p &= 6 - 3p,\space\space 5p = 2\\[1em]\
\therefore p &= \frac{2}{5},\space\space q = 1 - p = \frac{3}{5}
\end{split}
\end{equation*}
$}
\space\space\space\space\space\space
\hbox{$
\begin{equation*}
\begin{split}
\frac{1 - p}{2 - p} &= \frac{4}{9}\\[1em]\
9 - 9p &= 8 - 4p,\space\space 5p = 1\\[1em]\
\therefore p &= \frac{1}{5},\space\space q = 1 - p = \frac{4}{5}
\end{split}
\end{equation*}
$}
$$

즉, $$I$$에서 $$A$$와 $$a$$의 빈도가 각각 $$\frac{2}{5}$$ 와 $$\frac{3}{5}$$ 이고, $$II$$에서 $$A$$와 $$a$$의 빈도가 각각 $$\frac{1}{5}$$ 와 $$\frac{4}{5}$$ 이다.  
그리고 $$I$$ 에서 $$A$$ 의 빈도와 $$II$$에서 $$B$$의 빈도가 같다고 했으므로 $$II$$에서 $$B$$, $$b$$ 의 빈도도 각각 $$\frac{2}{5}$$ 와 $$\frac{3}{5}$$ 이다.  

### 수포자의 무덤
다섯 번째 조건에 제시된 왼쪽 분수를 식으로 나타내면 아래와 같아진다.  
단, 분모와 분자가 모두 같은 집단을 대상으로 하고 있고, 둘 모두에 개체 수가 포함되어있으므로 개체수는 약분하여 나타내지 않았다.  

$$
\begin{equation*}
\begin{split}
\frac{2p(1-p) + (1-p)^2}{p^2 + 2p(1-p)} &= \frac{2p - 2p^2 + 1 - 2p + p^2}{p^2 + 2p - 2p^2}\\[1em]\
&= \frac{1 - p^2}{2p - p^2} = \frac{7}{15}\\[1em]\
\\[1em]\
15 - 15p^2 &= 14p - 7p^2\\[1em]\
8p^2 + 14p - 15 &= 0\\[1em]\
(2p + 5)(4p - 3) &= 0\\[1em]\
\therefore p &= \frac{3}{4},\space\space q = 1 - p = \frac{1}{4}
\end{split}
\end{equation*}
$$

즉, $$I$$ 에서 $$B$$의 빈도는 $$\frac{3}{4}$$ 이고, $$b$$ 의 빈도는 $$\frac{1}{4}$$이다.

### 함정카아드 발동!!
이제 마지막 조건을 보자.  
$$I$$에서 $$A$$의 빈도와 $$II$$ 에서 $$B$$의 빈도가 같다고 했는데, 각각이 발현된 개체 수 비가 $$2 : 3$$(혹은 $$3 : 2$$)이 아니다.  
즉, 형질 (가) 와 (나) 중 하나는 열성 동형 접합일 때만 발현하는 형질이라는 의미가 된다.  

다시말하면 $$A > a$$ 이고 $$B > b$$ 라고 주어진 상황에서 A 와 a, B 와 b 중 어느 것이 형질을 발현시키는 유전자인지 모른다는 의미가 된다.  
즉 아래 네 가지 중 맞는 것 하나를 찾아야한다.
1. $$a$$가 형질을 발현시키는 유전자이고, $$I$$의 개체 수가 $$2N$$ 이다. 
2. $$a$$가 형질을 발현시키는 유전자이고, $$I$$의 개체 수가 $$3N$$ 이다.
3. $$b$$가 형질을 발현시키는 유전자이고, $$I$$의 개체 수가 $$2N$$ 이다.
4. $$b$$가 형질을 발현시키는 유전자이고, $$I$$의 개체 수가 $$3N$$ 이다.

그럼 각각을 모두 살펴보자.
$$
\hbox{$
\begin{equation*}
\begin{split}
\frac{2 * a_{I}^2}{3 * (B_{II}^2 + 2B_{II}b_{II})} &= \frac{2 * \frac{9}{25}}{3 * (\frac{4}{25} + \frac{12}{25})}\\[1em]\
&= \frac{18}{48} = \frac{3}{8}\space\space(\text{1})\\[1em]\
\frac{2 * (A_{I}^2 + 2A_{II}a_{II})}{3 * b_{II}^2} &= \frac{2 * (\frac{4}{25} + \frac{12}{25})}{3 * \frac{9}{25}}\\[1em]\
&= \frac{32}{27}\space\space(\text{2})
\end{split}
\end{equation*}
$}
\space\space\space\space\space\space\space\space
\hbox{$
\begin{equation*}
\begin{split}
\frac{3 * a_{I}^2}{2 * (B_{II}^2 + 2B_{II}b_{II})} &= \frac{3 * \frac{9}{25}}{2 * (\frac{4}{25} + \frac{12}{25})}\\[1em]\
&= \frac{27}{32}\space\space(\text{3})\\[1em]\
\frac{3 * (A_{I}^2 + 2A_{II}a_{II})}{2 * b_{II}^2} &= \frac{3 * (\frac{4}{25} + \frac{12}{25})}{2 * \frac{9}{25}}\\[1em]\
&= \frac{48}{18} = \frac{8}{3}\space\space(\text{4})
\end{split}
\end{equation*}
$}
$$

주어진 조건을 만족하는 경우는 1번 뿐이다. 따라서, $$I$$ 의 개체 수가 $$2N$$ 이고, $$II$$ 의 개체 수가 $$3N$$ 이다.  
또, (가)는 열성 형질이고, (나)는 우성 형질이다.  

### 해치웠나?
$$I$$ 에서 (나)가 발현된 개체 수를 구하자.  
(나)는 우성 형질이고 $$I$$ 에서 $$B$$, $$b$$ 의 빈도는 각각 $$\frac{3}{4}$$, $$\frac{1}{4}$$ 이다.  

따라서 아래와 같다:
$$
\begin{equation*}
\begin{split}
(B_{I}^2 + 2B_{I}b_{I}) * 2N &= (\frac{9}{16} + \frac{6}{16}) * 2N\\[1em]\
&= \frac{15}{8}N
\end{split}
\end{equation*}
$$

정말 다행히도 이번에는 누구끼리 교배해서 ~~할 확률을 묻지는 않았다.  
여기서 교배 후 자손의 확률 까지 물었으면...

## 후기
언제나 그렇지만 어렵다. 이걸 어떻게 30분만에 다 풀지...?  
이번에는 비 킬러들도 누구 씨의 발언 덕분에 힘이 들어갔다는 말이 있던데... 무섭다.