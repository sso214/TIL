---
title : Next.js  
date : 2021.08.20
---

## Next.js란?
React의 SSR(Server Side Rendering)을 쉽게 구현 가능하게 도와주는 프레임워크.  
React도 자체적으로 구현 가능하지만 복잡하기 때문에 사용법이 간단한 Next.js 나옴.  
react-router보다 코드 스플리팅 구조가 잘 되어있어 사용하기 편함.  

<br/>
<br/>

* 일반적 React 렌더링 방식 (CSR-Client Side Rendering) :  
    1. render() 함수 실행
    2. componentDidMount() 함수를 통해 데이터 가져와서 다시 한 번 렌더링   
       첫 로딩 시 필요한 모든 파일을 내려받기 때문에 초기 로딩 속도 느림.    
       but page 이동 시 해당 페이지에 필요한 파일만 받으므로 빠름

* Next의 렌더링 방식 (SSR) :   
  getInitialProps() 함수를 사용해 데이터를 먼저 가져와서 한번에 렌더링.  
  한번에 렌더링 되기 때문에 초기로딩 속도 빠름.   
  but page 이동시 중복되는 파일을 모두 내려받기 떄문에 CSR보다 느림.  
  

## Next.js의 핵심기능

* 코드 스플리팅  
  일반적으로 리액트 싱글페이지는 초기 렌더링 시 모든 컴포넌트를 내려받지만 규모가 크거나 용량이 크면 로딩 속도가 지연되는 문제점이 있음.  
  Next는 해당 문제를 개선해 필요에 따라 파일을 불러올 수 있게 파일을 여러개로 분리하는 코드 스플리팅을 사용함.  
  폴더 구조에서 pages 폴더 안에는 각 page(라우트)들이 들어가 있고, Components 폴더 안에는 React 컴포넌트들이 들어가있음.  
  브라우저 실행 -> 사용자 접속 -> 첫 페이지인 index page만 호출 -> 다른 페이지 이동시 해당 페이지만 호출

* 간단한 클라이언트 사이드 라우팅 제공  
  Router, Link 모두 import 해서 사용 가능.

* Custom API 서버 (as - 라우트 마스킹)  
  커스텀 서버를 통해 라우트를 마스킹 할 수 있음

* getInitialProps()  
  getInitialProps 함수 통해 데이터 가져올 수 있음. 데이터를 미리 가지고 오기 때문에 한번에 렌더링 가능

<br/>
<br/>
<br/>

> ### Reference
> * [https://nextjs.org/](https://nextjs.org/)
> * [Next.js 제대로 알고 쓰자](https://medium.com/@msj9121/next-js-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-8727f76614c9)
> * [Next.js 에서 타입스크립트, emotion 적용하기](https://blog.naver.com/PostView.naver?blogId=minhyupp&logNo=222239244566&from=search&redirect=Log&widgetTypeCall=true&directAccess=false)
> 
