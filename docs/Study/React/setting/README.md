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

# eslint-config-prettier : 불필요하거나 prettier와 충돌할 수 있는 규칙 끔 (ex. prettier와 ESLint 들여 쓰기 설정 중복)
# eslint-plugin-prettier : prettier를 ESLint 규칙으로 실행하고 차이점을 개별 ESLint 문제로 보고
$ yarn add -D eslint-config-prettier eslint-plugin-prettier
```
* Yarn 은 npm과 달리 --save 옵션 주지 않아도 package.json에 자동 저장됨

<br>

## ESlint 설정
최상위 경로에 (src 같은) .eslintrc.js(ESLint 설정파일) 생성  

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier"
  ],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-shadow': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
};
```

package.json 파일에 스크립트 추가  
src 파일 내부 ts, tsx, js, jsx 파일을 linting 할 수 있음.

<br>

## Prettier 설정
최상위 경로에 (src 같은) .prettierrc(prettier 설정파일) 생성

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 120,
  "arrowParens": "always"
}
```

<br>

## package.json
```json
{
  "scripts": {
    "prettier": "prettier --write --config ./.prettierrc \"**/*.{ts,tsx}\"",
    "lint": "eslint './src/**/*.{ts,tsx}'", //src 파일 내부의 ts, tsx 파일을 linting
    "lint:fix": "eslint --fix './src/**/*.{ts,tsx}'" //자동으로 lint에 맞게 수정
  }
}
```

## eslint ignore 설정
lint 실행 시 제외할 파일, 폴더 설정  
.eslintignore 파일 생성 후 gitignore 처럼 파일명이나 폴더명 입력

<br>

## webstorm에서 eslint사용
preferences -> ESLint -> manual ESLint configuration 에서 설정

<br>

## 실행
* `npm run prettier` : 자동으로 코드 스타일 변경  
* `npm run lint` : 규칙에 맞는지 검사  
코드 입력 -> prettier -> eslint -> 코드 수정
  


<br>
<br>
<br>

> ### Reference
> * [CRA로 typescript 개발환경 설정하기 @_jouz_ryul](https://velog.io/@_jouz_ryul/CRA%EB%A1%9C-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
> * [CRA - react typescript ESlint + Prettier 설정 @super_iaan](https://velog.io/@super_iaan/CRA-react-typescript-ESlint-Prettier-%EC%84%A4%EC%A0%95)
> * [ESLint, Prettier 적용하기 @기록맨](https://velog.io/@recordboy/ESLint-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
> * [Eslint 적용하기(React + Typescript + Prettier) @플타 앞발자](https://flamingotiger.github.io/javascript/eslint-setup/)
> * [ESLint + Prettier + React(CRA) + TypeScript + AirBnB 설정하기](https://yeonhapark.github.io/posts/configure-eslint-with-typescript-react/)


---
---
---


## ESLint
ECMAScript에 기반한 자바스크립트 코드 상의 버그를 개선하고 일관성 있는 코드 작ㅇ성을 위한 리포팅 동구.  
사용자가 원하는 방식대로 플러그인을 이용해 다양한 룰을 적용할 수 있다.  
(CRA에서는 react-scripts를 통해 이미 eslint가 포함되어있으므로 패키지 매니저를 설치할 필요가 없음)


## Prettier
ESLint의 플러그인 중 하나. 
파일들을 스캔하고 사용자가 설정한 룰에 부합하도록 코드를 포맷팅하는 툴.  
적용함으로 설정한 룰에 포맷팅 적용 가능함.  
(prettier / @typescript-eslint/parser 같은 필수 패키지를 제외하고는 취향에 맞춰 플러그인 적용 가능)  
jsx, Typescript, scss, less, JSON, markdown 등 다양한 언어를 지원  

## ESLint + Prettier setting
1. `yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`  
  * `@typescript-eslint/parser` : Typescript 코드를 linting 하도록 함
  * `@typescript-eslint/eslint-plugin` : Typescript를 위한 ESLint 룰을 포함하는 플러그인

2. `yarn add eslint-plugin-react eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-jsx-a11y eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier -D`
  * `eslint-plugin-react` : react와 타입스크립트를 함께 사용하려면 설치해줘야 함 (devDependencies)
  * `eslint-config-airbnb` : airbnb의 리액트 관련 규칙 적용  
  * `eslint-config-airbnb-typescript` : 위 플러그인의 적용범위를 타입스크립트까지 확대 (별도의 규칙을 가지고 있진 않음)
  * `eslint-plugin-jsx-a11y` : eslint-config-airbnb 와 같이 설치해줘야하는 플러그인 (eslint-plugin-import, eslint-plugin-react 도)
  * `prettier` : prettier를 적용하기 위한 라이브러리
  * `eslint-plugin-prettier` : ESLint 룰로 프리티어 실행
  * `eslint-config-prettier` : prettier와 충돌/중복되는 ESLint 룰 비활성화. 

