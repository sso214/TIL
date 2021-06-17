---
title : CRA setting  
date : 2021.06.17
---

# CRA(create-react-app) + Typescript Setting

## CRA + Typescript
```shell
$ npx create-react-app 프로젝트명 --template typescript
```

<br>

## ESLint + Prettier 설치
코드를 간편하게 작성할 수 있도록 도와주는 도구.   
* ESLint :   
  ES(EcmaScript) + Lint(버그, 오류 등에 표시를 달아놓는 것)   
  코딩 컨벤션 및 안티 패턴 자동 검출해서 일관된 코드 스타일로 작성하도록 도와줌.  
  문법 에러를 잡아내고, 특정 문법 요소를 쓰도록 만드는 것처럼 코드 퀄리티에 관련된 것을 가이드.  
  스타일 가이드를 편하게 적용하기 위해 사용하기도 함(ex. Airbnb Style Guide, Google Style Guide)   
  CRA로 생성된 프로젝트는 ESLint가 탑재되어 있음.
  
* Prettier :  
  정해진 규칙에 따라 자동으로 코드 스타일을 정리해주는 도구.  
  코드 한 줄의 최대 길이, 탭의 길이, 홀따옴표/쌍따옴표 등 코딩 스타일을 일괄적으로 통일하는 도구  
  

eslint(airbnb 스타일)와 prettier를 동시에 사용하기 위해 아래 명령어로 설치
```shell
# package.json devDependencies에 eslint, prettier 패키지 추가
$ yarn add -D eslint prettier

# @typescript-eslint/eslint-plugin : Typescript에 ESlint 규칙을 포함하는 플러그인
# @typescript-eslint/parser : ESLint가 typescript를 lint할 수 있도록 허용해주는 parser
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Airbnb의 .eslintrc 제공
# airbnb 설정 (eslint-config-airbnb : 리액트 관련 규칙이 모두 들어있음, eslint-config-airbnb-base : 리액트를 제외한 규칙이 들어있음)
$ yarn add -D eslint-config-airbnb

# eslint-config-prettier : 불필요하거나 prettier와 충돌할 수 있는 규칙 끔
# eslint-plugin-prettier : prettier를 ESLint 규칙으로 실행하고 차이점을 개별 ESLint 문제로 보고
$ yarn add -D eslint-config-prettier eslint-plugin-prettier
```
* Yarn 은 npm과 달리 --save 옵션 주지 않아도 package.json에 자동 저장됨

<br>

## ESlint 설정
ESLint 설정파일을 생성 : 최상위 경로에 (src 같은) .eslintrc 파일 생성
```json
{
  "scripts": {
    "lint": ""
  }
}
```

package.json 파일에 스크립트 추가  
src 파일 내부 ts, tsx, js, jsx 파일을 linting 할 수 있음.
```json
{
  "scripts": {
    
  }
}
```

<br>
<br>
<br>

> ### Reference
> * [CRA로 typescript 개발환경 설정하기 @_jouz_ryul](https://velog.io/@_jouz_ryul/CRA%EB%A1%9C-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
> * [CRA - react typescript ESlint + Prettier 설정 @super_iaan](https://velog.io/@super_iaan/CRA-react-typescript-ESlint-Prettier-%EC%84%A4%EC%A0%95)
> * [ESLint, Prettier 적용하기 @기록맨](https://velog.io/@recordboy/ESLint-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
> * [Eslint 적용하기(React + Typescript + Prettier) @플타 앞발자](https://flamingotiger.github.io/javascript/eslint-setup/)
