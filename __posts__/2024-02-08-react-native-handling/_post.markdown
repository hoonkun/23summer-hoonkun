---
author: HoonKun
title: React Native 입문 후기
date: 2024-02-09, 10:57
categories: [dev, frontend, react]
---

계속 눈을 돌리고 도망치다가 어쩔수 없이 마주쳐 입문해본 React Native 후기 및 소소한 문제 해결 기록

> 이 글에서는 리렌더링 최적화에 대한 내용, 기타 로직 편의성에 대한 내용을 다룹니다.   
> 다만, 그 방식이 다소 바람직하지 않거나 협업 상황에서 리스크를 발생시킬 수도 있으므로 참고로만 읽어주세요.  
> 피드백은 언제든지 환영합니다!

<!-- Excerpt -->

## 서론
원래는 React 는 웹에서만 썼었다.  
웹은... 노드 하나하나가 가벼워서 뭔짓을 해도 진짜 길이 2000개 짜리 배열에 `.map` 으로 컴포넌트 렌더링하는 그런게 아닌 이상 성능 문제가 진짜 전혀 없었다.  

그런데? RN 으로 왔더니? 우와... 배열 길이 20개짜리에 `.map`을 돌려도 버벅이네?  
그리고 mobx 같은 짓은 성능상의 문제로 못한다. 즉 상태가 무조건 컴포넌트 안에 있어야하고 라이프사이클을 준수해야한다는 뜻이다.  

그리하여, RN을 개발하며 마주친 벽과 그것을 해결한 방법 몇 가지를 제시하고 기록해두려고 한다.

## 마주친 벽들
### useEffect 안에서의 setState 는 금기
async 가 필요한 초기화 목적으로 사용되는, 단 한번만 실행되는 경우를 제외하고는 금기이다.  
예를 들자면... useMemo가 사용 가능한 경우에서 굳이 상태를 사용하는 경우이다.  

사실 이 내용은 기존에 웹에서 코딩할 때도 준수하던 사항이기는 하지만, 같이 적어두면 좋을 것 같아서 남긴다.

예를 들어 아래와 같은 코드는,
```typescript
const [state, setState] = useState("")
const [formattedState, setFormattedState] = useState("")

useEffect(() => {
  setFormattedState(FormatState(state))
}, [state])
```
- state 의 변경에 대해 추가적인 리렌더 한 번(setFormattedState)이 뒤따른다.
- state 만 변경된 상태로 한 번의 완전한 렌더 프로세스가 이루어진다.  
  즉, state 와 formattedState 사이의 일관성이 무너진다.  
  작성자는 'state 가 변경되면 formattedState 도 같이 변경해야지' 를 기대하고 작성하지만, state 만 변경된 상태로 한 번의 렌더가 완전하게 이루어진다.

와 같은 문제가 있다.  

따라서 아래처럼 변경해야한다.
```typescript
const [state, setState] = useState("")
const formattedState = useMemo(() => FormatState(state), [state])
```
- 부수효과 훅이 삭제되고, `useMemo` 훅이 추가되었다.
- state 가 변경되는 리렌더에서 바로 formattedState 도 같이 변경된다.  
  한 번의 리렌더로 state 및 formattedState 가 모두 변경된다.

### 무조건 useMemo, useCallback. 무조건.
웹에서야 어떻게 해도 딱히 성능상의 문제가 없지만, RN에서는 상황이 다르다. 무조건 써야한다.  
가독성이 떨어진다고? 불필요한 오버헤드? RN의 무거운 뷰가 한 번 리렌더되는것보다 몇 배는 감수할만한 리스크다.  

비슷한 문제로 `useState` 는 최소화해야한다. 가능한 경우 `useMemo`를 사용하고, 함께 붙어서 설정되는 상태들은 하나로 합쳐야한다.

### useRef + useState = useRefState
mobx 를 사용하지 못하므로 모든 상태가 컴포넌트 라이프사이클 안에 있어야한다.  
그런데, 만약 비즈니스 로직과 관련하여 상태처럼 변경 시에 리렌더가 발생해야하지만 `setState` 를 호출한 이후에 바로 값이 변경되어야 한다면?  
로직의 재사용성을 위해 별도 함수로 분리했는데, 인수를 통해 전달할 수는 없고 이전 로직에서 `setState` 한 값을 다음 로직에서 바로 쓰려고 한다면?  

이런 경우에는 reference 와 state 를 병행해서 써야한다.  
값의 변경이 rerender를 트리거해야하고, setState 이후 바로 변경된 값을 읽을 수 있어야한다면.  

아래 커스텀 훅을 보자.  
```typescript
const useRefState = <T>(initialValue: T | (() => T)) => {
  const ref = useRef(initialValue instanceof Function ? initialValue() : initialValue)
  const [state, setState] = useState(initialValue)

  const setter = useCallback<Dispatch<SetStateAction<T>>>(arg => {
    ref.current = arg instanceof Function ? arg(ref.current) : arg
    setState(ref.current)
  }, [])

  return [ref, state, setter] as const
}
```

만약 이 문제를 해결하기 reference를 사용하려면 하나의 값(데이터 원천)에 훅을 두 번 작성해야하고, 항상 일관성을 맞춰야한다.  
매번 `setState` 와 `reference.current = value` 를 써주기는 쉽지 않으므로, 커스텀 훅으로 분리했다.  

이렇게 하면, 아래와 같은 코드가 가능해진다:

```typescript
const ArcticContext: React.FC = props => {
  // ...
  const [userRef, user, setUser] = useRefState<User | null>(null)

  const fetchUserRelatedData = useCallback(async () => {
    await BackendApiFetcher.fetch(userRef.current.id).then() // Do some stuff!
  }, [userRef])
  const login = useCallback(async (id: string, password: string) => {
    setUser(await BackendApiFetcher.login(id, password))
    await fetchUserRelatedData()
  }, [setUser, fetchUserRelatedData])
  // ...
}
```

즉, login 로직에서 `fetchUserRelatedData()` 를 호출할 때 
- 함수의 재사용성을 위해 아무런 인수도 전달하고 싶지는 않고
- 그런데 `setUser` 를 한 뒤에 바로 그 user 오브젝트를 확인하고싶다면

적절한 방법이 될 수 있다.  

아마 이렇게 생각할 수도 있다.  
> 그러면 `fetchUserRelatedData()` 에 인수를 optional 로 추가하고 그게 있으면 그것을, 없으면 user 상태를 참조하면 되는거 아닌가?  

맞는 접근이다. 물론 그렇게도 할 수 있다. 그러나 이 방법은 몇 가지 문제가 있다.
- 상태를 참조하기 때문에 종속에 해당 상태를 포함해야하고, 매번 `user` 가 바뀔 때 새 함수를 만든다.  
  만약 이 함수를 부수효과 훅에서 사용한다면 문제가 발생할 수도 있다.
- 함수가 언제 어떤 user 를 사용할지 알 수 없게된다. 입력으로 들어오는 user 가 누굴지 모르니까.  
- 만약 이런 형태의 함수가 여러 개라면 거기에 전부 인수를 추가해야한다.  

이 방법의 단점은 아래와 같다:
- **훅의 사용이 늘어난다.**  
  당연한 얘기지만 하나의 상태에 훅이 2개다. JS의 처리속도는 나름 빠른 편이지만, 많이 사용하면 당연히 느려질 수 있다.  
- **린터가 멍청해진다.**  
  `useState` 함수의 리턴의 두 번째 요소인 `Dispatch<SetStateAction<T>>` 는 린터가 알아서 종속에 포함하지 않아도 무시한다.  
  왜냐면 이 함수는 언제나 변하지 않는 라이프사이클 밖의 함수이기 때문이다.  
  그런데 `useRefState` 의 세 번째 요소인 `Dispatch<SetStateAction<T>>` 는 `useCallback` 의 리턴인 라이프사이클 안쪽의 함수이기 때문에, 린터가 종속 항목에 이것도 반드시 포함하라고 한다.  
  실상 변하지 않는건 똑같은데(`useCallback` 의 종속이 비었으므로), 그래도 일단 포함해줘야한다. 번거롭다.  

이 방법의 사용처는 아래와 같다:
- 주로 UI와 비즈니스로직이 섞인 컴포넌트에서(ContextProvider 등이 있겠다), mobx 등의 도움 없이 무조건 컴포넌트 라이프사이클 안쪽에서 이루어져야 한다면.
- 하나의 값에 대해, reference 처럼 리렌더와 무관하게 값이 유지되어야하지만 동시에 UI에도 표시되어야한다면.

이 방법을 사용할 때 주의할 사항은 아래와 같다:
- **UI 요소에 ref 를 넣지 말아야한다.**  
  이 훅은 어디까지나 비즈니스로직에서의 값의 일관성을 상태와 함께 보장하기 위해 사용한다. 
  즉, ref 는 비즈니스 로직에서만 사용하고 UI 요소나 `useCallback` 등의 훅을 제외한 `useMemo` 등의 함수에는 사용하지 말아야한다(당연한 얘기지만).
- **반드시 필요한 경우가 아니면 쓰지 말아야한다.**  
  어디까지나 setState 이후에 바로 값을 읽어야 할 때 유용한 훅이므로, 만약 그럴 필요가 없다면(완전히 UI 요소에만 관여한다면) 사용하지 말아야한다.

<!--
### useSavedState
가끔 상태를 저장하고 복구해야할 때가 있다.  
물론 이런건 상태를 끌어올리고 prop 을 사용하는게 맞지만, 만약에 앱이 완전히 종료되었다가 다시 실행되었을 때도 복구해야한다면 아래 훅을 쓰면 유용하다.

```typescript
const useSavedState = <T>(key: string, initialValue: T | (() => T)) => {
    const [stateRef, state, setState] = useRefState(initialValue)
    const [ready, setReady] = useState(false)
  
    useEffect(() => {
        if (!ready) return
        AsyncStorage.setItem(key, JSON.stringify(state)).then()
    }, [key, state, ready])
  
    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(it => it ? setState(JSON.parse(it)) : null).then(() => setReady(true))
    }, [key, setState])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => { AsyncStorage.setItem(key, JSON.stringify(stateRef.current)).then() }
    }, [key, stateRef])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", state => {
            if (!(state === "background" || state === "inactive")) return
            AsyncStorage.setItem(key, JSON.stringify(stateRef.current)).then()
        })
        return () => subscription.remove()
    }, [key, stateRef]);

    return [state, setState, ready] as const;
}
```
> utils/hooks/useSavedState

저장 키를 주고, 컴포넌트가 언마운트 될 때, 혹은 상태가 변할 때 값을 저장한다.  
사실 이 훅은 자주 쓴다기보단 한 두 곳에서 조심스럽게 쓰는데 로직이 똑같아서 분리해놓은 것에 가깝다.  

이 훅의 단점은 아래와 같다:
- **상태 사용 가능 시점을 모른다.**  
  `AsyncStorage` 가 async 이기 때문에 바로 상태의 초기값으로 주지 못한다.  
  즉, **컴포넌트가 마운트되는 시점과 상태가 사용가능해지는 시점이 서로 다르다**는 의미가 된다.  
  그래서 훅의 리턴에서 세 번째 요소로 사용 가능한지 여부를 같이 리턴한다.
  그렇기 때문에 가능한 한 이 훅이 유효한 결과를 반환한 이후에 그 결과를 별도 prop 으로 전달하여 컴포넌트를 마운트할 필요가 있다.
- `JSON.stringify`, `JSON.parse` 를 사용한다.
  이 함수는 느리다. 만약 입력창같은 곳이나, 상태가 매우 많은 데이터를 가지는 오브젝트의 배열이거나 하면 저장하는데 시간이 소요되고, 그만큼 느려진다.
-->

### CachedContext
`React.Context` 는 좋은 문물이다. 다만, JS 특성상 조금 멍청할 뿐이다.  

`React.useContext` 훅을 사용한 컴포넌트는 `React.ProviderExoticComponent` 의 prop 으로 전달되는 value 가 변경되면 무조건 리렌더된다.  
그런데, 만약 이 컨텍스트 내부에 있는 값을 **mutate** 하기만 할 뿐, 그 값을 직접 참조하지는 않는다면?  

아래와 같은 상황을 보자.

```tsx
const Default = { mutate: EmptyFunction, value: null }
const SomeContext = createContext(Default)
export const useSomeContext = () => useContext(SomeContext)

export const SomeContextProvier: React.FC<PropsWithChildren> = props => {
  const valueRef = useRef<string | null>(null)
  const [value, setValue] = useState<string | null>(null)

  const mutate = useCallback<OverlayContextType["mutate"]>(value => {
    valueRef.current = valueRef
    setValue(valueRef.current)
  }, [])

  const ContextValue = { mutate, value }

  return (
    <SomeContext.Provider value={ContextValue}>{props.children}</SomeContext.Provider>
  )
}
```
값을 읽는(reference) 곳과, 값을 쓰는(mutate) 곳이 명확하게 나뉘어져있는 케이스다.  
그리고 값을 쓰는 곳에서는 어떠한 다른 상태도 참조하지 않는 경우.

React는 소비자 컴포넌트가 `useContext` 를 통해 어떤 값을 사용할지 모르기 때문에, 일단 전체 Provider 의 props.value 에 전달하는 오브젝트가 바뀌면 무조건 리렌더를 발생시킨다.  
그러나 이런 경우에는 값을 mutate 하기만 하는 곳에서는 `useContext`가 굳이 리렌더를 발생시킬 필요가 없다.  
특히나 위의 코드에서 보이는 `mutate` 의 종속이 비어있어, 이 함수만 사용한다면 함수 자체도 변할 일이 없으므로.  

이럴 때는 아래와 같은 코드를 사용하면 이런 문제를 회피할 수 있다:

```typescript
// ...
let CachedContext = Default
export const CachedSomeContext = (): Readonly<SomeContextType> => CachedContext

export const SomeContextProvier: React.FC<PropsWithChildren> = props => {
  // ...
  const ContextValue = { mutate, value }
  CachedContext = ContextValue
  //...
}
```

글로벌 변수 CachedState 에 라이프사이클 안쪽의 함수, 상태들을 바깥으로 뺐다.  
이러면 `useContext` 의 사용 없이도 Context 안의 함수에 접근이 가능하다.  

결론적으로 값을 mutate 하는 측에서는 `CachedSomeContext().mutate()` 를 통해, `useContext` 로 인한 불필요한 리렌더 없이 컨텍스트 내부의 값을 변경할 수 있다.  

물론 이 방식은 아래와 같은 잠재적인 위험을 안고있다:
- **라이프사이클 안의 값들이 그 밖으로 나온다**  
  즉, 다른 컴포넌트에서의 종속 관리와 무관하게 되었기 때문에, UI 상태를 CachedContext 를 통해 참조할 경우 일관성이 깨질 우려가 있다.
- **코드가 읽기 어려워지고 파악하기 힘들어진다**  
  컨텍스트의 컨트롤 범위 밖으로 벗어나기 때문에, 어디서 어떻게 값을 쓰고있는지 찾기가 힘들어진다.  
  코드의 작성자가 항상 이게 UI와 관련이 있는지 없는지, mutate 만 하는 함수인지 혹은 그렇지 않은지를 매번 파악해야한다.  
- **컨텍스트 제공자가 언마운트되어버리면 망가진다.**  
  이 방식은 컨텍스트 제공자가 언제나 항상 마운트되어있다는 것을 전제로 한다.  
  만약 컨텍스트가 언마운트될 수 있다면 별도 핸들링을 추가해야한다.

즉, 이 형태는 정말 쓰는 부분과 읽는 부분이 명확히 분리되어있고, 쓰기만 하는 컴포넌트가 굉장히 많고 무거울 때 유용하다.  
또는, `useCallback` 등의 훅 내에서 값을 읽지만 UI와는 무관한 경우에도 유용하다(데이터를 백엔드에 보내거나 할 경우).  
**다른 상황에서는 쓰지 않는 것이 좋다.**

### Object Destruct 와 종속 관리
`useContext`의 리턴값에서 object destruct 를 통해, 만약 어떠한 이유로 부모 컴포넌트의 리렌더를 허용했다고 하더라도 
자식 컴포넌트의 리렌더를 최소화할 수 있는 방법이 있다.  

아래와 같은 예시를 보자. producedSome 은 오브젝트이고 이 값을 prop 으로 전달받는 컴포넌트가 있다고 가정해보자.

```tsx
const SomeItemComponent: React.FC = () => {
  const context = useContext(SomeContext)
  const producedSome = useMemo<ProducedSomeObjectInstance>(() => 
    context.produceSomeObject(context.valueSet.filtered), 
    [context.valueSet.filtered, context.produceSomeValue]
  )
  
  return <ProducedSomeView produced={producedSome}/>
}
```

언뜻 보기에도 맞게 작성한 것 처럼 보이고, 실제로 맞게 작성했다.  
하지만 우리의 ESLint 님은 이걸 못알아보고 종속 항목이 `[context]` 여야 한다고 주장하신다.  

Context 에서 `useMemo` 와 `useCallback` 을 열심히 사용했다면 분명 둘 중 하나만 바뀔 수도 있고, `context` 가 변경되었더라도 저 둘은 변경되지 않았을 수도 있다.  
하지만 우리의 ESLint: react-hooks/exhaustive-deps 님은 그런거 모른다.  

그렇게 종속으로 `[context]`를 줘버리면, `useContext` 에 의한 리렌더가 발생하는 순간 매번 producedSome 의 값이 변해버린다.  
실질 그 안에서 사용한 `filtered` 와 `produceSomeValue` 가 변하지 않았더라도.

이럴 땐 아래처럼 해주자:

```tsx
const SomeItemComponent: React.FC = () => {
  const { valueSet: { filtered }, produceSomeValue } = useContext(SomeContext)
  const producedSome = useMemo<ProducedSomeObjectInstance>(() =>
    produceSomeObject(filtered),
    [filtered, produceSomeValue]
  )

  return <ProducedSomeView produced={producedSome}/>
}
```

이렇게 하면 린터가 아무 딴지도 걸지 않으면서, 의도한대로 producedSome 의 메모 값이 유지된다.  
만약 이 값을 prop으로 전달받는 컴포넌트가 있었을 경우 그 자식의 리렌더를 막을 수 있다.

물론 꼭 object destruct 가 아니더라도, 그냥 변수 할당으로 처리해도 딱히 상관은 없다.


### List 최적화
웹에서는 몰랐다. 왜냐면 이런거 안해도 충분히 빠르니까. 좀 느리다 싶으면 가상화 붙혀주면 단번에 해결된다.  

그러나 앱은 다르다. 뷰 하나하나가 무겁고 느리다.  
그런 상황에 나타난 구세주같은 존재가 얘다.

#### 무조건 React.memo. 무조건.
가상리스트의 `renderItem` prop 에 전달하는 컴포넌트는 거의 필수적으로 얘를 넣지 않으면 나중에 화를 면치 못한다.
`React.memo` 는 컴포넌트 함수와 props 비교 함수를 인수로 받는 함수인데, 대충 아래와 같은 형태로 사용한다:

```tsx
type MemoizedComponentProps = { /* some props */ }
const MemoizedComponentPropsComparator = (
  a: MemoizedComponentProps,
  b: MemoizedComponentProps
): boolean => { /* some compare logic */ }

const MemoizedComponent: React.FC<MemoizedComponentProps> =
  React.memo(props => <>{ /*some content*/ }</>, MemoizedComponentPropsComparator)
```
기본적으로는, 이 함수를 붙혀서 만든 컴포넌트가 React 가 prop 하나하나에 대해(props 오브젝트 자체가 아니다) Object.is 를 통해 비교하여 모든 prop 이 변화가 없었으면 리렌더를 스킵한다.  
즉, 부모 컴포넌트가 리렌더될 때 항상 자식 컴포넌트로 리렌더하게 되지만 이걸 붙히면 prop 이 변하지 않았다면 리렌더를 스킵한다.  

#### prop 에 오브젝트를 전달한다면?
- 반드시 오브젝트 리터럴을 사용하지 말고 useMemo 를 사용하자.
- 그리고 반드시 React.memo 에 동일성을 비교하는 로직을 추가하자. Object.is 는 메모리상 다른 위치에 있는 오브젝트는 다르다고 판단하므로, 오브젝트의 내용을 직접 비교해야한다.

  

#### prop 에 selected 같은게 있다면?
우리의 디자이너님들은 리스트 항목이 선택 가능하길 원하시는데, 만약 컴포넌트에 selected prop 을 전달하고 이게 boolean 이 아니라면 반드시 boolean 으로 변경하자.  
이게 무슨 말이냐면, 선택되었는지에 대한 비교를 컴포넌트 안에서 하고있다면 컴포넌트 밖에서 해야한다.  
리스트 항목 컴포넌트가 알아야할 것은 자신이 선택되었는지 아닌지 이지, '누가 선택되었는지' 가 아니다.  

만약 어떤 리스트 항목 컴포넌트에 `selected={currentSelectedId}` 같은걸 넣었다고 해보자(그리고 컴포넌트 안에서 `props.selected === item.id` 같은 연산을 한다면).  
사용자가 선택을 바꿔서 `currentSelectedId`가 변경되는 순간, 모든 리스트 항목이 전부 리렌더를 시도한다. 왜냐면 prop 이 변했으니까.  

그럴 때는 `selected={currentSelectedId === renderItemProps.item.id}` 를 직접 전달하자.  
이렇게 전달하면 기존에 선택된 항목과 새로 선택된 항목 두 아이템만 리렌더가 발생한다.  

즉, 정리하자면 React.memo 를 사용하고 prop 이 변할 여지를 거의 주지 말아야한다. 가능하다면 prop 비교기도 추가해주고.

### ReactNative 에도 Application.targetFrameRate = 60 이 있습니다.
Unity 를 개발해본 적이 있다면 이해할 수 있는 드립이다.  

처음 겜을 만들고 모바일에서 돌리면 프레임이 개심각하게 느린데, 아무리 별 짓을 다해서 최적화를 해도 빨라지지 않는다.  
근데? 앱 실행 시 실행되는 스크립트 아무대나 `Application.targetFrameRate = 60;` 한 줄만 추가하면 곧바로 프레임이 올라간다.  

RN에도 그런게 있다. 바로 Release Build 다.  

만약 디버그 빌드로만 돌려보면서 '아 이거 진짜 느리네 엄청 버벅거리네' 라는 생각이 든다면, 반드시 Release Build 로 돌려보자.  
속도가 완전히 다른 세상이다. 날아다닌다고 표현해도 좋을 것이다.  
도대체 이렇게 빨라질 수 있는데 디버그 빌드에서는 뭔 짓을 하고 있는거지 싶을 정도다.  

실질 사용자가 쓰는건 디버그 빌드가 아니기 때문에, Release 에서만 문제가 없을 정도의 속도라면 딱히 디버그는 어찌 되어도 상관 없다.  
그러니 성능 관련 문제는 꼭 Release Build 에서 확인하자.

## 후기
사실 RN에 대해 호의적인 입장이 아니다. 제발 빨리 사장되고 역사의 뒤안길로 사라져버렸으면 좋겠다.  
그렇지만 어쨌거나 사장되지 않았고, 내가 이걸 해야했기 때문에, 그렇게 이걸 하면서 마주친 문제들과 해결법 등을 기록해둔다.  

기타 SafeAreaContext 나 KeyboardAvoidingView 등과 관련한 삽질도 했고... emotion 관련 삽질도 했지만 그건 남기지 않는다. 내 use case 가 이상했으므로.  

사실 이 방법이 맞는건지 나도 잘 모르겠다. 더 나은 해결책이 있는데 그걸 모르고 이상하게 회피하고있는건 아닐까 싶기도 하고.  
**혹시 이 글을 보면서 '으 미친 이게 뭐야' 싶으시다면 적절한 피드백을 남겨주시면 감사할 것 같습니다...**
