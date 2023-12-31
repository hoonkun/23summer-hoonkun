---
author: GoHoon
title: 2022학년도 수능특강 생명과학 II '코돈' 123쪽 6-7번 풀이
date: 2021-05-09, 10:12
categories: [biology-ii,codon]
---
이번에는 문제 위에 직접 대고 풀었는데, 샤프로 풀었으면 꽤 헷갈렸을 것 같다.   
펜 색깔이라도 다르게 할 수 있으면 편할텐데...   
<!-- Excerpt -->

## 어찌되었든 풀어보자
이번에는 딱히 손풀이랄게 없지만... 보기 별로 색깔을 구별해서 썼으니 위의 이미지를 보면 될 것 같다.

## 대강의 풀이 과정은?
이 문제는 발문이랑 보기 중심으로 풀면 된다.
1. 발문에 제시된, $$X$$에 트레오닌이 있다는 단서로 ㉠, ㉡(말단 번호)를 찾는다. (6번 ㄱ 보기)
2. 6번 발문에 제시된, $$Y$$에 세린이 2개 있다는 단서로 돌연변이를 만들고, 종결코돈을 찾는다 (6번 ㄴ 보기)
3. 2과정에서 만든 돌연변이를 기반으로 $$y$$에서 세린을 암호화하는 부위를 찾고 $$5'$$말단 염기를 확인한다 (6번 ㄷ보기)
4. 7번 문제에서 ㄱ, ㄷ 보기는 지엽적인 보기이므로 넘어가고, ㄴ 보기만 $$x$$ 염기서열과 비교해 (다)가 사용되는지 확인한다.

막 돌연변이같은거에 기호가 붙어있는 그런 문제가 아니라서 보기를 중심으로 보고 찾아야할 것만 찾으면 된다.   

## 하나하나 자세하게 살펴보자
이제 각 과정별로 어떻게 문제가 풀리는지 확인해보자.   

### 첫 번째 과정: 6번의 ㄱ 보기를 처리하자
우선 주어진 가닥이 주형가닥인지, 그렇지 않은지를 찾아야한다.   
주어진 가닥이 주형가닥이라고 가정한다면 오른쪽 끝부분에서 CAT 서열을 찾거나 왼쪽 끝부분에서 TAC 서열을 찾고, 그렇지 않다면 왼쪽 끝부분에서 ATG 서열을 찾거나 오른쪽 끝부분에서 GTA 서열을 찾는다.   
주어진 서열에서는 왼쪽 끝부분에 TAC 서열은 없고 오른쪽 끝부분에 GTA 서열이 없으므로 두 가지만 확인하면 된다.

바로 살펴보면, 주어진 가닥이 주형가닥이 아니라면 ㉠이 $$5'$$, ㉡이 $$3'$$이 되고 다음과 같이 끊을 수 있다.
<pre>㉠- CT (ATG) TCA CCA CGA AGT [TGA] CAT G -㉡</pre>

여기에 트레오닌이 있는지 확인하자. 트레오닌을 암호화하는 코돈은 AC_인데, 살펴본 가닥이 주형가닥이 아니라면 위에 주어진 서열에서 T를 U로 바꾸어 mRNA라고 생각해도 되기 때문에
바로 AC_서열을 찾아도 된다. 근데, **없다**. 따라서 이 경우는 틀린 경우이다.

다음으로 주어진 가닥이 주형가닥이라면 ㉡이 $$3'$$, ㉠이 $$5'$$이 되며 다음과 같이 끊을 수 있다.
<pre>㉠- CT ATG [TCA] CCA CGA <b>AGT</b> TGA (CAT) G -㉡</pre>

여기에 트레오닌이 있는지를 확인하자. 트레오닌을 암호화하는 코돈은 AC_이므로 트리플렛 코드 상에서는 _GT 가 된다.   
위에서 두껍게 표시한 바와 같이 존재한다. 따라서 이 경우가 맞는 경우이고, ㉡이 $$3'$$, ㉠이 $$5'$$이 된다.   

### 두 번째 과정: 6번의 ㄴ 보기를 처리하자
주어진 가닥이 주형가닥이므로, 그것을 기반으로 돌연변이를 만들면 된다.   
사실 ㄴ 보기만 해결하려 한다면 어디를 결실시켜도 같은 종결코돈이 형성되어 굳이 더 확인할 필요가 없지만, ㄷ 보기를 해결하기 위해 정확한 돌연변이 위치를 찾아야 한다.   

**연속된 두 개의 동일한 염기가 1회 결실**되었으므로, 위에서 정리한 서열에서 돌연변이가 가능한 염기 번호는 다음과 같다:
<pre>[9-10], [14-15], [17-18]</pre>

각각을 결실시켜보자. 세린을 암호화하는 코돈은 두 종류인데, 각각 UC_와 AG(U/C)이다. 이 경우 트리플렛 코드에서는 _GA와 (A/G)CT이므로, 이 사항을 기억하면서 확인하자.
- [9-10]을 결실시켜보자. 다음과 같이 끊어진다:
  <pre>5'- [CTA] TGT CAA <b>CGA</b> AGT <b>TGA</b> (CAT) G -3'</pre>
  두껍게 표시한 바와 같이 세린이 두 개가 있다. 이 경우가 맞는 경우이다.
- [14-15]를 결실시켜보자. 다음과 같이 끊어진다:
  <pre>5'- [CTA] TGT CAC CAC GGT <b>TGA</b> (CAT) G -3'</pre>
  근데 세린이 하나 뿐이다. 틀린 경우이다.
- [17-18]를 결실시켜보자. 다음과 같이 끊어진다:
  <pre>5'- [CTA] TGT CAC CAC GAA <b>GGA</b> (CAT) G -3'</pre>
  이 경우에도 세린이 하나 뿐이다. 틀린 경우이다.

따라서 맞는 경우는 [9-10]이며, 이 때 $$Y$$ 형성 시 사용되는 종결코돈은 UAG이고 $$X$$ 형성 시 사용되는 종결코돈은 UGA였으므로 서로 다르다.   

### 세 번째 과정: 6번의 ㄷ 보기를 처리하자
두 번째 과정에서 구했으므로 확인만 하면 된다.   
단, 구하려는 것이 코돈이 아닌 트리플렛 코드이므로 헷갈리지 말자.   
따라서 두 세린을 암호화하는 염기 서열은 $$5'$$-CGA-$$3'$$와 $$5'$$-TGA-$$3'$$이므로 $$5'$$말단 염기는 서로 다르다.   

### 네 번째 과정: 7번을 해결하자
- ㄱ 보기는 지엽적인 보기다. 단골까진 아니지만 종종 나온다. 아미노산이 결합하는 tRNA의 말단이 $$3'$$말단이다.   
  지금까지의 생명과학II 문제 중에서 많이 나오진 않았지만, tRNA의 $$3'$$말단 염기를 물어본 적도 있었으므로 살펴보면, tRNA는 CCA-$$3'$$ 으로 끝난다.   
- ㄷ 보기는, 코돈과 안티코돈의 차이를 묻는 문제인데 아르지닌을 암호화하는 코돈은 CG_와 AG(A/G)이므로 안티코돈은 _CG와 (C/U)CU가 된다. 따라서 가능한 것은 (가)와 (나)가 맞다.
- ㄴ 보기에서 (다)의 안티코돈은 $$5'$$-CCA-$$3'$$인데 지금껏 본 서열이 전부 $$x$$의 서열이었으므로 그냥 이게 있는지만 확인하면 된다. 
  <pre>5'- CT ATG [TCA] <b>CCA</b> CGA AGT TGA (CAT) G -3'</pre>
  두껍게 표시한 바와 같이 존재한다. 따라서 맞는 보기이다.
   
## 후기
역시 수능 문제가 아니라서 아주 약간이지만 할만하다. 중간에 꼬이지만 않는다면...   
6번의 ㄷ 보기도 애매한게 표현이 엄청 애매하고...  

그보다 수능에서도 역시 펜좀 여러 개 쓸 수 있었으면 좋겠다. 알록달록 색깔펜. 이제 그러면 장인들이 시험지에 예술을 하시겠지?
