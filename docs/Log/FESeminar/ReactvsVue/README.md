---
title : React.js vs Vue.js  
date : 2022.09.26  
---

# React.js vs Vue.js

## 요약
React와 Vue의 특징을 비교

## 특징 비교
||React.js|Vue.js|
|:--|:--|:--|
|Typescript 지원|매끄러움|미흡|
|문법|Plain JS에 가까움|vue 문법 사용|
|컴포넌트 작성법|자유도 높음|정형적인 형식이 있음|
|형태|library<br/>(UI 라이브러리)|framework<br/>(프로그레시브 자바스크립트 프레임워크)|
|자유도|높음|제한적|
|컴포넌트 분리|깔끔함|boiler-plate 다수 존재|
|협업|자유도로 인한 높은 커뮤니케이션 비용|저렴한 커뮤니케이션 비용|
|러닝 커브|높음|상대적으로 낮음|
|속도|보통|약간 빠름|
|인지도|높음|낮지만 상승 중|
|코드의 형태|JSX 형태로 코드 작성.<br />모든 것이 JS(CSS-in-js)|HTML,CSS, JS 코드 영역을<br />분리해 사용|
|size|48.8 KB|25.6 KB|
|테스트 용이성|좋음|미흡|
|data binding|one-way|two-way|
|확장자|.js, .jsx, .ts, .tsx|.vue|
|DOM|가상 DOM 활용|가상 DOM 활용|
|관련 라이브러리|커뮤니티에 결정 맡기고<br />더 확장된 생태계 만드는 것을 선택|공식적으로 지원되며<br />핵심 라이브러리와 함께 최신 상태 유지|

### 생각해 볼 이슈
* React.js는 library인가?  
  
  * 라이브러리 :   
    단순 활용 가능한 도구들의 집합.  
    개발자가 만든 클래스에서 호출해 사용하며, 사용하고 호출하는 측에 제어 흐름 주도성 있음  
  * 프레임워크 :   
    특정 문제를 해결하기 위해 상호 협력하는 클래스와 인터페이스의 집합.  
    프레임워크 틀 안에 이미 제어 흐름에 대한 주도성 있음   
  
  React.js는 전역 상태 관리, 라우팅, 빌드 시스템 등을 지원하지 않는 UI 기능만을 제공하는 라이브러리.  
  다만 CRA는 리액트로 웹 애플리케이션을 만들기 위한 환경을 제공하며,   
  명령어 하나로 리액트의 개발환경을 구축할 수 있기 때문에 CRA도 라이브러리라고 할 수 있는지는 고민된다.  
  
* 내가 만약 FE 개발자가 3명 배정된 프로젝트의 팀장이라면   
  해당 프로젝트에 React.js를 도입할 것인가 Vue.js를 도입할 것인가?  
  
  가벼운 프로젝트라면 빠른 결과물 도출, 저렴한 커뮤니케이션 비용의 장점 때문에 vue.js를 선택할 것 같다.  
  하지만 중급 규모 이상의 프로젝트라면 앞으로의 유지보수, 상대적으로 인력을 충원하기 쉬운 React 개발자의  
  장점을 생각해 React.js를 도입할 것 같다.
  

## React.js vs Vue.js
### 기본 철학
React에는 Vue.js에 비해 매직이 덜함.  
Vue.js는 사용자에게 쉽게 느껴지는 API를 제공하기 위해 라이브러리가 직접 헤비 리프팅을 하는 경우 많음 

React는 Vue.js에 비해 사용자 및 사용처에 대해 더 적은 가정을 하고,  
컴포넌트 기반의 선언적 UI 렌더링이라는 가장 핵심적인 기능과 관련된 부분만 코어에 포함함  

### 컴포넌트 분리
컴포넌트를 분리할 때 react.js는 한 개의 파일에서 새로운 함수형 컴포넌트를 쉽고 깔끔하게 정의해 만들 수 있으며,  
부모에서 자식으로 props를 전달해주는 과정이 함수에 인수 전달하듯이 매우 매끄럽게 진행됨  

하지만 vue.js에서 새로운 컴포넌트를 분리하려면 일단 새로운 파일을 하나 더 만들어야하고,  
그에 따라 하나의 파일에 해당하는 (template, script, style)도 작성해야 할 것.  
또 props를 전달하는 과정도 2개의 파일을 오가며 해야 함.  

### 코드의 통일성
React.js는 자유도가 높기 때문에 Vue.js보다 진입장벽이 높지만    
Vue.js는 자유도가 조금 떨어지는 대신 코드 통일성이 높음  

react.js의 경우 &&, 삼항 연산자, if 등 다양하게 문법을 사용 가능하지만 vue에서는 v-if 방법 밖에 없음  
따라 코드의 통일성이 높아 React.js보다 상대적으로 적은 커뮤니케이션 비용이 발생함  

### 속도
필요한 DOM 조작 수를 최소화하기 위해 React와 Vue 모두 가상의 DOM 추상화를 사용해 작업을 수행함  
다만 Vue.js가 DOM 조작에 가능한 적은 오버헤드(특정 기능을 수행하는데 드는 간접적인 시간, 메모리 등의 자원)를     
가지므로(순수 JS만 계산) Vue의 가상 DOM은 React보다 훨씬 가벼워 Vue.js보다 조금 더 빠름  

React에서는 컴포넌트의 상태가 변경되면 해당 컴포넌트를 루트로 하위 트리를 다시 렌더링함  
따라 불필요한 자식 컴포넌트의 재렌더링을 피하려면 shouldComponentUpdate를 구현하고   
변경 불가능한 데이터 구조를 사용해야 하는 반면 Vue에서는 컴포넌트의 종속성은 렌더링 중 자동으로 추적되므로   
시스템은 실제로 다시 렌더링해야하는 컴포넌트를 정확히 알고 있음  

### 코드의 형태
React에서 모든 컴포넌트는 JSX를 사용하는 렌더링 함수를 통해 UI를 포현함  
(JSX는 JS에서 사용하는 선언적 XML 유사 문법)  

JSX를 이용하는 렌더링 함수 사용 시 장점  
* 완전한 프로그래밍 언어를 이용해 뷰 작성 가능, 직접적으로 JS 값을 가져다 사용 가능
* JSX의 훌륭한 툴 지원 (형 검사, 자동완성, linting 등)

css도 css-in-js는 매우 편하고 JS의 역동적인 기능을 사용 가능하지만   
증가한 번들 크기 및 런타임 비용 발생함  
(Vue에서도 JSX 및 css-in-js 사용 가능)


## 누구에게 잘 맞을까?
### React.js
* 프로젝트의 규모가 크다. 점점 더 확장 될 것이다.
* 자바스크립트 문법에 능숙하다.
* 컴포넌트르르 작은 단위로 나누어 비슷한 UI 재사용을 많이 할 예정이다.
* 커스터마이징 및 자유도가 높은 개발 환경을 좋아한다.
* 타입스크립트를 사용할 것이다.
* 넓은 커뮤니티 및 개발 인력시장의 혜택을 보고싶다.

### Vue.js
* 규모가 작고 가벼운 프로젝트를 빠르게 만들고 싶다.
* 속도 이슈에 매우 민감한 사이트이다.
* 자바스크립트 문법에 미숙하다.
* 회사에 퍼블리셔가 따로 존재한다.
* 기존 html css js 구조로 작성된 코드를 SPA로 옮기고 싶다.
* 개발자간 코드 통일성을 위한 커뮤니케이션 비용을 줄이고 싶다.
* 백엔드 개발자다.

### 인지도
||React.js|Vue.js|
|:--|:--|:--|
|Weekly Downloads|6,266,676|1,103,093|
|Questions tagged|178,365|46,884|
|git Star|195k|200k|

## 예제 비교
### UserList 컴포넌트 작성
<react.js>
```js
import React, { Component } from 'react'
import classNames from 'classnames'
import * as styles from './UserList.css'

const UserItem = ({ user, selected }) => (
  <li className={classNames(style.userItem, { [style.selected]: selected })}>
    { user.name }
  </li>
)

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedUserId: undefined }
  }

  render() {
    const { users } = this.props
    const { selectedUserId } = this.state

    return (
      <ul className={styles.userList}>
        {users.map(user => (
          <li className={classNames(styles.userItem, { [styles.selected]: user.id === selectedUserId })}>
            { user.name }
          </li>
        )}
      </ul>
    )
  }
}
```
<vue.js>
```js
import React, { Component } from 'react'
import classNames from 'classnames'
import * as styles from './UserList.css'

const UserItem = ({ user, selected }) => (
  <li className={classNames(style.userItem, { [style.selected]: selected })}>
    { user.name }
  </li>
)

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedUserId: undefined }
  }

  render() {
    const { users } = this.props
    const { selectedUserId } = this.state

    return (
      <ul className={styles.userList}>
        {users.map(user => (
          <li className={classNames(styles.userItem, { [styles.selected]: user.id === selectedUserId })}>
            { user.name }
          </li>
        )}
      </ul>
    )
  }
}
```

### Toggle Button
<react.js>
```js
import React, { Component } from 'react'
import classNames from 'classnames'
import * as styles from './UserList.css'

const UserItem = ({ user, selected }) => (
  <li className={classNames(style.userItem, { [style.selected]: selected })}>
    { user.name }
  </li>
)

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedUserId: undefined }
  }

  render() {
    const { users } = this.props
    const { selectedUserId } = this.state

    return (
      <ul className={styles.userList}>
        {users.map(user => (
          <li className={classNames(styles.userItem, { [styles.selected]: user.id === selectedUserId })}>
            { user.name }
          </li>
        )}
      </ul>
    )
  }
}
```
<vue.js>
```js
import React, { Component } from 'react'
import classNames from 'classnames'
import * as styles from './UserList.css'

const UserItem = ({ user, selected }) => (
  <li className={classNames(style.userItem, { [style.selected]: selected })}>
    { user.name }
  </li>
)

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedUserId: undefined }
  }

  render() {
    const { users } = this.props
    const { selectedUserId } = this.state

    return (
      <ul className={styles.userList}>
        {users.map(user => (
          <li className={classNames(styles.userItem, { [styles.selected]: user.id === selectedUserId })}>
            { user.name }
          </li>
        )}
      </ul>
    )
  }
}
```

## References
* [React를 Vue.js보다 선호하는 이유](https://ahnheejong.name/articles/why-i-prefer-react-over-vuejs/)
* [React vs Vue 장단점 비교](https://velog.io/@leehaeun0/React-vs-Vue-장단점-비교)
* [Node.js - React.js vs Vue.js, 자바스크립트 프레임워크 비교](https://library.gabia.com/contents/8284/)
* [React 인가 Vue 인가?](https://joshua1988.github.io/web_dev/vue-or-react/)
* [Vue 0강 : 카카오가 리액트냅두고 Vue 쓰는 이유](https://www.youtube.com/watch?v=-tVaahsXpwk)
* [Vue.js vs React: Comparison of Two Most Popular JS Frameworks](https://www.codica.com/blog/react-vs-vue/)
* [React vs Vue](https://sangcho.tistory.com/entry/React-vs-Vue)
* [React와 Vue에서 똑같은 앱을 만들어보고 그 차이점에 대해 썼다](https://erwinousy.medium.com/%EB%82%9C-react%EC%99%80-vue%EC%97%90%EC%84%9C-%EC%99%84%EC%A0%84%ED%9E%88-%EA%B0%99%EC%9D%80-%EC%95%B1%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8B%A4-%EC%9D%B4%EA%B2%83%EC%9D%80-%EA%B7%B8-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%B4%EB%8B%A4-5cffcbfe287f)

