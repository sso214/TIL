---
title : TypeScript란?
date : 2021.06.01
---

## 1. TS의 역사

타입스크립트는 
지속해서 2~3달 기준으로 마이너 버전이 업데이트 되고 있다. 
Javascript는 초기에 브라우저를 위한 스크립팅 언어로 만들어졌는데,  
점차 JS 커뮤니티가 성장하고 범위가 넓어지면서 JS를 이용한 상호작용을 만들어냈다. 
이처럼 JS의 범위가 넓어지면서 JS 사용량은 늘어났고, 실행 엔진을 최적화시키고 웹 개발자가 JS
많은 양의 코드를 실행한다. 
JS에는 많은 장점이 있지만 많은 개발자가 주요한 장점으로 뽑는 점이 있는데 바로 교차 플랫폼이다. 
JS만을 이용해 프로그래밍 하는 것이 가능하다.
JS는 빠른 사용을 위해 설계되었고 유연한 구조에 단점 또한 생겻다. 
오류를 
큰 프로젝트에서는 이러한 문제들이 커다란 오류를 만들어낼 수 있기 때문에 주의해야한다. 
타입 스크립트는 쉽게 생각하면 타입이 존재하는 자바스크립트를 생각하면 되는데, 
정확히 표현하면 정적 타입 시스템을 도입한 자바스크립트이다. 
TS파일은 .ts 확장자를 사용한다.

<br>
<br>


## 2. TS의 장점
1. 정적 타입  
   자바스크립트는 변수나 반환값의 타입을 지정하지 않으므로 의도치 않은 에러를 발생시킬 수 있다. 
   이를 해결하기 위해 타입스크립트는 정적 타입을 지원한다.  
   <br>
   <TS의 명시적인 정적 타입 지정의 장점>
   - 컴파일 단계에서 오류 발견
   - 의독 쉽게 파악
   - 가독성 높임
   - 결과값 에측 가능
   - 디버깅 쉬움
   
```ts
function sum(count:number,length:number) {
    return count + length;
}
sum ('wow', 'text'); // error
```
2. 편리한 도구 지원  
   TS를 사용하면 도구에 타입 정보를 제공할 수 있기 때문에 IDE (통합개발환경) 등 다양한 도구 사용 시  
   높은 수준의 지원을 받을 수 있다. 이러한 장점은 대규모 프로젝트의 필수 요소이다.
   
3. 강력한 객체지향 프로그래밍 지원  
   TS의 인터페이스, 제네릭 같은 객체지향 프로그래밍 지원은 복잡한 프로젝트의 코드를 쉽게 작성할 수 있도록 하며,  
   클래스 기반 객체지향 언어에 익숙한 개발자의 진입장벽을 낮추기도 한다.
   
4. ES6 / ES Next 지원  
    TS는 표준화가 유력한 스펙을 선제적으로 도입하며, 
   
5. Angular
    Angular 커뮤니티에서 가장 많이 사용되는 것이 TS이다. 

<br>
<br>


## 3. TS의 개발환경 구축
타입스크립트로 작성한 파일을 브라우저에 표현하기 위해서는 .ts 파일을 컴파일러를 이용해 .js 파일로 변환해야 한다.  
TypeScript 컴파일러(tsc)는 .ts 파일을 자바스크립트 파일로 트랜스파일링 한다.
> 컴파일 : 일반적으로 소스 코드 -> 바이트 코드 변환  
> TS 컴파일러는 .ts 파일을 자바스클비트 파일로 변환하기 때문에 트랜스파일링이라고 표현하는 것이 적절.

<br>

1. Node.js 설치 (npm 도 같이 설치됨) : [https://nodejs.org/en/](https://nodejs.org/en/)  
  
2. TS 전역 설치  
```shell
$ npm install -g typescript
```
   
3. TS 버전 확인  
```shell
$ tsc -v
```
  
4. 작성한 .ts 파일로 트랜스파일링 실행
```shell
//실행 결과 같은 디렉터리에 .js파일 생성됨 (JS 버전은 기본적으로 ES3)
$ tsc 파일명
```
  
5. JS 버전 변경
```shell
//지원하는 버전 : ES3 | ES5 | ES2-15 | ES2016 | ES2017 | ES2018 | ES2019 | ESMEXT
$ tsc 파일명 -t 버전
```
  
6. Node.js REPL을 이용해 트랜스파일링된 js파일 실행
```shell
$ node js파일명
```

7. tsc 옵션 설정 파일 생성
```shell
//tsc 옵션 설정 파일인 tsconfig.json 생성됨
//tsc 명령어 뒤에 파일명 지정 시 tsconfig.json이 무시됨
//tsc 파일명(tsconfig.json 무시) -> tsc(tsconfig.json적용)
$ tsc --init
$ tsc  //파일명 지정하지 않을 시 폴더 내 모든 .ts 파일이 트랜스파일링 됨
```

8. .ts 파일 내용 변화 감지 -> 자동 트랜스파일링 : [컴파일러 옵션](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
```shell
//tsconfig.json에 옵션 추가 가능 {"watch": true}
//--watch | -w
$ tsc --watch 
```


<br>
<br>


> ## Reference
> * [TypeScript의 소개와 개발 환경 구축](https://poiemaweb.com/typescript-introduction)
> * [TS for the New Programmer](https://typescript-kr.github.io/pages/tutorials/ts-for-the-new-programmer.html)
> * [자바스크립트 개발자를 위한 타입스크립트](https://ahnheejong.gitbook.io/ts-for-jsdev/)
