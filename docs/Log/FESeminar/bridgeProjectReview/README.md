---
title : 브릿지 FE 프로젝트 리뷰     
date : 2022.10.28    
---

# 브릿지 FE 프로젝트 리뷰
2022.10.28

FE 기술 공유 세미나에서 지훈님이 만드신 브릿지 프론트엔드 프로젝트를 리뷰하는 시간을 가졌다.  
아래는 프로젝트를 리뷰하면서 나왔던 질문들이다.  

#### Q. component level은 어떤 식으로 설계할 것인가

#### Q. 리액트 프로젝트의 디렉토리
- 디렉토리 템플릿의 히스토리
- 히스토리 별의 장단점

#### Q. 리액트 state
- 객체로 관리하는게 좋은지. 객체로 한다면 formState 와 다른 state 는 분리하는게 좋은지.
- 개별 변수로 관리하는게 좋은지.
- 구분 기준

#### Q. 리액트 page는 어디까지 한 페이지로 구성하는게 좋을지

#### Q. 다국어 같은 기능 구현시 state와 browser local storage 사용 장단점  
- 편의성
- 속도
- 보안

#### Q. 리액트에서 css는 어떤 방식으로 작성하는게 좋은가
- css-in-css
- css-in-js (styled-component)
- external libraries(mui, antd, tailwindCSS etc..)

#### Q. npm package 관리할 때, package-lock.json 도 같이 관리하는게 필요한가

#### Q. react의 component와 page구조는 어떻게 분리해서 구성하면 좋을까

#### Q. react custom hook은 어떻게 구현하는게 좋을까
- 일반 라이브러리 파일과 커스텀 훅은 어떻게 구분해서 구현해야 할까?
- 라이브러리 함수를 custom hook 으로 만들면 backend 에서 재사용하기 어렵다.

#### Q. 프론트엔드 분석을 위해 어떤 툴을 활용하는지  

#### Q. router를 사용하는 서비스 단위
- 예) 리스트 페이지와 상세 페이지가 있다면 라우터로 분리하는게 나은지.       
  아니면 하나의 서버스 단위로 묶고 상태로 분기하는게 좋은지.

#### Q. 커스텀 훅에서 renderXXX 하는 함수(컴포넌트)를 리턴하는 방식에 대해서 어떻게 생각하는지
컴포넌트(를 렌더링하는 함수)를 제공하는 커스텀 훅을 이용해 로직 분할한 케이스 많음
- [React 컴포넌트를 커스텀 훅으로 제공하기](https://engineering.linecorp.com/ko/blog/line-securities-frontend-3/)
- [React Design Patterns: Return Component From Hooks](https://blog.bitsrc.io/new-react-design-pattern-return-component-from-hooks-79215c3eac00)  
  custom hook에서 부분적으로 바인딩된 props가 있는 컴포넌트를 반환하려고 시도할 수 있음  
  그러나 루트 요소가 다른 유형을 가질 때마다 React는 이전 트리를 해체하고 처음부터 새 트리를 빌드하기 때문에  
  → 바인딩된 props가 변경될 때 새 구성 요소 정의를 반환하므로 예상치 못한 마운트 해제와 재마운트 동작이 발생함  
  (custom hook menu에서 컴포넌트를 반환할 때 useMemo의 의존성 배열이 변경될 때마다 새 컴포넌트를 반환하고 이전것과 동일하지 않으므로 새 컴포넌트 트리를 빌드함)  
  → 동적으로 바인딩된 props를 사용하여 정적으로 정의된 구성 요소를 반환하는 방식으로 문제 해결
- [Hook이 render props 및 고차 컴포넌트를 대체합니까?](https://ko.reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)  
  종종 render props와 고차 컴포넌트는 하나의 자식만 렌더링합니다.  
  우리는 Hook이 이 사용 사례를 처리하는 더 간단한 방법이라고 생각합니다. 여전히 두 패턴 모두를 쓸 수 있습니다. (예를 들어, 가상 스크롤러 컴포넌트에는 `renderItem` props가 있거나 시각적 컨테이너 컴포넌트에는 자체 DOM 구조가 있을 수 있습니다) 그러나 대부분의 경우 Hook은 충분하며 코드 트리의 중첩을 줄이는 데 도움이 될 수 있습니다.

#### Q. 모달 설계 방법
- Parent 에서 state 관리 (parent state + modal props)
- ContentProvider 를 활용한 관리
- 전역 상태(redux, mobx, recoil, etc...) 등을 활용한 관리
- return component from custom hook
---
- Parent 에서 state 관리 (parent state + modal props)  
  한 페이지 안에서 여러 개의 모달이 필요한 경우  
  → 관리해야 할 useState 값이 늘어나며 부수적인 코드 많아짐.   
  또한 많은 페이지에서 여러개의 모달을 불러와야 하고 중간의 로직들이 분리되어 있다면 모달 상태값이 필요한 컴포넌트의 단계가 많아짐 (Props Drilling)
- ContentProvider를 활용한 관리 (대체적으로 많이 사용하는 방법)
  - [효율적인 modal 관리 with React(1)](https://nakta.dev/how-to-manage-modals-1)
  - [Select 컴포넌트](https://so-so.dev/react/make-select/)
  - [토스ㅣSLASH 22 - Effective Component 지속 가능한 성장과 컴포넌트](https://www.youtube.com/watch?v=fR8tsJ2r7Eg)
- 전역 상태(redux, mobx, recoil, etc...) 등을 활용한 관리
  - [내가 Context api와 다른 전역상태관리 라이브러리를 동시에 사용하는 기준](https://velog.io/@dev-redo/React-%EB%82%B4%EA%B0%80-Context-api%EC%99%80-%EB%8B%A4%EB%A5%B8-%EC%A0%84%EC%97%AD%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EB%8F%99%EC%8B%9C%EC%97%90-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EA%B8%B0%EC%A4%80)
  - [Context API가 존재하지만 여전히 사람들이 redux와 전역 상태관리 라이브러리를 쓰는 이유](https://velog.io/@minkuk90/Context-API%EA%B0%80-%EC%A1%B4%EC%9E%AC%ED%95%98%EC%A7%80%EB%A7%8C-%EC%97%AC%EC%A0%84%ED%9E%88-%EC%82%AC%EB%9E%8C%EB%93%A4%EC%9D%B4-redux%EC%99%80-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0)
  - createContext API = context 객체를 만드는 것.  
    즉 단순히 drilling을 피하는 전역상태 provider가 아닌, 새로운 영역(context)를 만들고 provider에서 state를 가져오는 역할 
    특정 컴포넌트에 종속되는 state는 애플리케이션에 전반적으로 공유되는 global state 아님  
    고로 context API를 이용하는데 안성 맞춤.  
    - global state (애플리케이션에 전반적으로 사용되는) : 전역상태관리 라이브러리 사용. 로그인 정보 등 
    - 특정 컴포넌트에 종속되는 state : Context API. Modal 등


#### Q. 다양한 모델 구현 방법  
**모델의 페이지가 복잡하고, 기능이 각각 다를 때, 개별 모달별로 component 를 구축하는게 좋을지.   
아니면 1개의 공통 modal component 를 만들고 DOM injection 을 하게 구현하는 방식이 좋을지.**  
현재 tetco 프로젝트에서는 한 개의 공통 modal component를 만들고 children props를 이용해 각 컴포넌트의 content를 주입함.  
모달 컴포넌트들이 개별로 많아질 경우 공통적인 수정이 필요할 때 유지보수가 어려워진다고 생각.    
최대한 비슷한 컴포넌트들끼리 묶는 정도?   
button event라던지 등등 기본적인 기능이나 타이틀 정도 빼두고  


#### Q. 페이지에 상태가 많을 때, 상태를 관리하거나 변화시키는 가장 효율적인 패턴은?
- [React 상태 관리 도구 살펴보기](https://medium.com/zigbang/react-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-1b2e6a771cb9)  
  * 프로젝트 규모가 커지는 경우 원하는 컴포넌트로 상태값들을 전달하려 할 때, 4-5개의 컴포넌트들을 지나쳐 값을 전달하는 경우 발생. 
  즉 불필요한 컴포넌트들을 거쳐 값을 전달해 관리하면 값이 전달될 때마다 불필요한 작업을 반복적으로 해야하고, 실수를 통해 에러 발생 가능성도 커짐  
  따라 props를 통한 복잡한 상태관리 보다는 리덕스를 사용하는 경우, store라는 공간에 상태값들을 저장한 후,  
  해당 상태값이 필요한 컴포넌트에서 값을 빼어내 사용할 수 있다는 편리한 장점을 가지고 있음   
  * 앱이 규모가 커질 수록, UI가 구성이 복잡해질 수록, 복잡한 상태를 관리하기 위한 솔루션이 필요.  
  따라 렌더링하는 시기와 방법을 제어해야 함. 이 같은 사용 사례로 인해 상태 관리 공간(store)에 관한 많은 연구가 이뤄짐  
  * recoil : atoms (공유 상태)에서 selectors (순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만듬.
  최소한의 상태 집합만 atoms에 저장하고, 다른 모든 파생되는 데이터는 selectors를 통해 계산. (쓸모없는 상태의 보존을 방지)

- [Complex State Management in React](https://www.telerik.com/blogs/complex-state-management-react)  
  상태관리 라이브러리를 사용하지 않는 경우 useReducer 사용   
  “다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 `useState`보다 `useReducer`를 선호합니다.
  또한 `useReducer`는 자세한 업데이트를 트리거 하는 컴포넌트의 성능을 최적화할 수 있게 하는데, 이것은 [콜백 대신`dispatch`를 전달](https://ko.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)할 수 있기 때문입니다.”   


#### Q. 리액트에서 AlertModal component 를 만든다 했을 때, import 방식 vs custom hook 방식

#### Q. 전역 상태 관리에 대한 단상 글을 읽고 어떻게 생각하는지
- [전역 상태 관리에 대한 단상 (stale-while-revalidate)](https://jbee.io/react/thinking-about-global-state/)   
  이번 프로젝트에서 react-query를 사용해보면서 전역 상태로 정의 내릴 수 있는 영역을 고민하다보니 정말 테마나 언어 상태값 이외에는 전역 상태로 정의내리긴 어렵다고 생각.
