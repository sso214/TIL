---
title : storybook  
date : 2021.08.18
---

# Storybook
와 TIL 엄청 오랜만에 쓴다.  
한동안 무기력증에 빠져서 공부나 다른것도 다 내팽개쳤는데  
다시 열심히 해봐야겠다는 마음이 들어서 다시 마음을 가다듬고 해보려고 한다.  
작심삼일이라도 계속 반복하면 언젠가는 습관이 되겠지.

<br/>

오늘은 오전에 다른 회사 FE팀은 어떻게 일하나 궁금해서     
모두싸인 엔지니어 가이드 공식 노션을 보게 되었다.  
확실히 회사차원에서 코드리뷰가 이뤄지고 체계가 갖춰진 개발팀은 정말 성장하기 좋은 환경인 것 같다.  
(특히 코드리뷰 너무 부럽다 ㅠㅠㅠㅠㅠㅠㅠㅠㅠ)  
암튼 글을 읽다가 코드 관리에 대해 서로 다른 저장소에서 여러 서비스를 모노레포로 운영하고 있다는 설명을 읽고  
모노레포를 검색해보다가 Storybook이라는 오픈 소스를 알게되었다.  
카카오 FE팀에서도 컴포넌트나 테스트 자동화를 위해 해당 오픈소스를 활용한다고 해서  
도대체 어떤 것이길래 다들 많이 쓰나 궁금해서 찾아봤다.  
Storybook이 개발된 지도 벌써 4-5년이나 됐다고 하던데.  
뒤쳐지지 않도록 평소에 꾸준히 여러 다양한 정보들에 관심을 가지고 적극적으로 많이 찾아봐야겠다.   

<br/>
<br/>

## Storybook이란?
공식 웹사이트에 StoryBook에 대한 소개가 나와있다. 
> Storybook is a user interface development environment and playground for UI components. The tool enables developers to create components independently and showcase components interactively in an isolated development environment.

UI개발 환경이자, UI 컴포넌트를 위한 놀이터.  
개발자들이 컴포넌트를 독립적으로 만들고, 격리된 개발 환경에서 상호작용 가능한 컴포넌트를 선보일 수 있도록 해줌.  

<br/>


회사 프로젝트에서 React + Typescript를 사용해 프론트를 개발하고 있는데  
초기에 컴포넌트 작성할때 거의 계란 바위치듯 몸으로 부딪혀가며 하나하나 만들었던게 생각난다.  
Jisung Par란 분이 미디움에 깔끔하게 설명을 올려두셨는데  
버튼 컴포넌트를 하나 작성하기 위해서는 여러가지 상태값이나 디자인 등을 고려해 상태값을 넘기고 정의해야한다.  

Storybook은 이런 과정을 쉽고 간단하게 작업할 수 있도록 도와주는데  
이런 컴포넌트들의 여러 사례들을 소스와 함께 제공하기도 하고, 해당 컴포넌트의 API문서를 깔끔하고 간편하게 만들 수 있어  
후에 여러 사람들과 협업하기도 수월해진다.  
또한 Storyshot을 이용해 코드 스냅샷 테스트를 받을 수 있고, 특정 유스케이스를 스토리로 저장해 테스트나 QA에 사용 가능하며,  
react의 경우는 react-docgen 등을 사용하면 컴포넌트 소스로 문서를 자동생성할 수도 있다고 한다. 
*MDX라고 마크다운 문서에 JSX를 매끄럽게 작성가능한데 MDX 이용도 가능하다.   
또한 컴포넌트의 동적인 움직임에 대해 웹서버를 띄우지 않고도 디자이너와 편리하게 협업도 가능하다.

<br/>

개인적인 프로젝트나 혼자 작업하는 프로젝트에는 아주 유용할 것 같지는 않은데  
다른 개발자들과 협업하는 상황에서는 몹시 유용할 듯 하다.  
조만간 회사에서 새로운 프로젝트에 투입될 것 같은데  
나 혼자 뿐만 아닌 다른 프론트엔드 개발자와 같이 일하게 될 것 같으므로  
해당 프로젝트에 Storybook을 사용해봐도 괜찮겠다 싶다.
사용해보고 별로면 제거하고, 괜찮으면 다른 프로젝트에도 사용해봐야지.  
일단 사용해보고 후기를 적어야겠다.  

<br/>
<br/>
<br/>

와 세팅하는데 생각보다 삽질을 많이 했다.  
storybook 공식 문서를 보고 cli로 설치했는데   
`npx sb init`  
npm run storybook 으로 시작할 때는 잘 나오는데 npm start가 안되서 고생했다.  
보니까 CRA에서 지원하는 babel-loader랑 webpack 버전이 storybook에서 지원하는 버전과 달라 겹쳐서 에러가 발생했는데  
이리저리 방법을 찾다가 package.json에  
```json
  "resolutions": {
    "babel-loader": "8.1.0",
    "webpack": "4.44.2"
  },
```
을 넣어 버전을 정의하는 방식으로 해결했다.

> ### Reference
> * [모두싸인 엔지니어 지원자를 위한 가이드](https://www.notion.so/975a991feaa44450bfb29c3832091c24#b48e50e419f1431eae6a275fc1e4e555)
> * [FE플랫폼팀이 궁금하세요? – 함께 성장해가는 개발팀 이야기](https://tech.kakao.com/2020/09/21/kakao-fe-platform-team/)
> * [Storybook](https://storybook.js.org/)
> * [Storybook의 유용함](https://medium.com/@j_podracer/storybook%EC%9D%98-%EC%9C%A0%EC%9A%A9%ED%95%A8-8581ea618c32)
> * [[Storybook] 스토리북에 대해 알아보자](https://kjwsx23.tistory.com/541)
> * [Storybook, React, TypeScript and Jest](https://medium.com/@mtiller/storybook-react-typescript-and-jest-c9059ea06fa7)
> * [React + TypeScript + Storybook 프로젝트 설정](https://github.com/hohoya33/react-typescript-storybook)
> * [Storybook: Actions, Knobs, Docs addon 소개 및 설치](https://www.howdy-mj.me/storybook/02-addon-intro/)


