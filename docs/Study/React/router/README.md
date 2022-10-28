---
title : react router  
date : 2021.09.08
---

# React Router

* react-router : 웹 & 앱
* react-router-dom : 웹
* react-router-native : 앱

---

* 정적 라우팅 : 직접 경로를 일일히 설정 
* 동적 라우팅 : 한번 설정해주면 라우팅 프로토콜을 통해 알아서 계산되어 경로 결정

---

* BrowserRouter : history API를 사용해 URL과 UI 동기화하는 라우터
* Route : 컴포넌트 속성에 설정된 URL과 현재 경로가 일치하면 해당하는 컴포넌트, 함수를 렌더링
* Link : a 태그와 비슷. to 속성에 설정된 링크로 이동. 기록이 history 스택에 저장됨
* Switch : Route 요소들 중 매치되는 url 렌더링 (중복되는게 있으면 첫번째 요소만 렌더링)  
  (Switch 사용 시 BrowserRouter만 사용할 때와 달리 하나의 매칭된 요소만 렌더링 보장. 사용하지 않을 경우 매칭되는 모두를 렌더링)
* Route - path : 매칭 기다리는 url. 매칭되면 component 렌더링함
* 중첩 라우팅 : 내부 컴포넌트에 라우팅 지점이 또 있는 형태
```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
export const renderRouters = ():React.ReactNode => {
    return(
        <Router>
            <Link to="/">home</Link>
            <Link to="/list">list</Link>
            <Link to="detail">detail</Link>
            <Switch> 
                <Route exact path="/" component={Home}/> 
                <Route path="/list" component={List}/>
                <Route path="/detail" component={Detail}/>
            </Switch>
        </Router>
    )
}
```
