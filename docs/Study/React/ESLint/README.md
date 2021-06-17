---
title : ESLint   
date : 2021.06.17
---

# ESLint 설정 파일
ESLint Configuration은 eslintrc 파일이나 package.json의 eslintConfig 필드에 작성 가능함.   

ESLint 핵심 구성 정보   
1. Environments: 스크립트 실행환경에 대한 설정, 사전 전역 변수 설정등
2. Globals: 사용자가 추가하는 전역 변수
3. Rules: 활성화 규칙 및 오류 수준

<br>

```json
{
  // 파서 옵션 : 지원하려는 JS 언어 옵션 지정
  "parserOptions": {
    "ecmaVersion": 6, //ES 버전 설정
    "sourceType": "module", //parser의 export 형태 설정
    "ecmaFeatures": { //ES의 언어 확장 기능 설정
      "globalReturn": false, //전역 스코프 사용 여부
      "impliedStric": true, //strict mode 사용 여부
      "jsx": true // ES규격 JSX 사용 여부
    }
  },

  //파서 지정 : 기본적으로 Espree 파서 사용함
  "parser": "@typescript-eslint/parser", //TS 구문 분석 위해 사용되는 파서

  //플러그인 구성 : 일련의 규칙 집합.
  //플러그인 패키지 설치 후 해당 플러그인을 추가해 사용. 규칙을 사용하려면 extends에 사용할 규칙 추가해야 적용됨
  "plugins": [
    "@typescript-eslint",
    "prettier" // eslint-plugin- 접두사 생략 가능. eslint-plugin-prettier 과 같음
  ],

  //프로세서 : 다른 형식 파일로부터 JS 코드 추출, 추출한 코드를 대상으로 Lint를 수행하는 전처리기, 후처리기를 작성하는 용도
  //eslint-plugin-markdown 주로 사용됨.
  "processor": "a-plugin/a-processor",

  //env : 사전 정의된 전역 변수 사용 정의
  //browser, node 설정하지 않을 경우 onsole, require 같은 사전 정의된 전역변수 환경 static 메서드 인식 못함
  "env": {
    "browser": true,
    "node": true
  },

  //globals : 사용자 전역 변수 추가
  "globals": {
    "$": true
  },

  //확장 : 추가한 플로그인에서 사용할 규칙 설정
  "extends": [
    // eslint:all, eslint:recommended = ESLint에 기본 제공되는 확장
    // eslint:all 는 프로덕션 용도로 사용하지 않기 권장함
    "airbnb",
    "plugin:import/errors", // eslint-plugin- 접두사 생략하고 plugin:을 사용해 지정 가능함
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],

  //규칙 : 프로젝트에서 사용하는 규칙 수정 가능함
  //-"off", 0: 규칙 사용 X
  //-"warn", 1: 규칙을 경고로 사용
  //-"error", 2: 규칙을 오류로 사용
  // 플러그인에서 규칙 지정 시 eslint-plugin- 반드시 생략
  "rules": {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    "no-shadow": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [
      2,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "jsx-a11y/no-noninteractive-element-interactions": 0
  }
}
```
<br>
<br>
<br>

> ### Reference
> * [ESLint 공식문서](https://eslint.org/)
> * [ESLint 설정 살펴보기](https://velog.io/@kyusung/eslint-config-2)
