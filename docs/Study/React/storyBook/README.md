---
title : storybook  
date : 2021.08.18
---

# Storybook  
2021.08.18  

## Storybook이란?
> Storybook is a user interface development environment and playground for UI components. The tool enables developers to create components independently and showcase components interactively in an isolated development environment.
* UI개발 환경이자, UI 컴포넌트를 위한 놀이터
* 개발자들이 컴포넌트를 독립적으로 만들고, 격리된 개발 환경에서 상호작용 가능한 컴포넌트를 선보일 수 있도록 함  

초기 react를 처음 사용해보면서 컴포넌트를 작성할 때 계란 바위치듯 삽질해가며 만들었던게 생각났다. 
컴포넌트 하나를 만들기 위해서는 디자인이나 여러 상태값을 고려해 props를 넘기고 정의해야하는데,  아무래도 옵션들이 다양해지고 들어가는 내용이 많아지다보니 복잡해지게 된다.   
<br/>
Storybook은 이런 과정을 쉽고 간단하게 작업할 수 있도록 도와준다. 
컴포넌트들의 여러 사례들을 소스와 함께 제공하기도 하고, 해당 컴포넌트의 API 문서를 깔끔하고 간편하게 만들 수 있어 다른 개발자들과 협업하기도 수월해진다.  
<br/>
또한 Storyshot을 이용해 코드 스냅샷 테스트를 받을 수 있고, 특정 유스케이스를 스토리로 저장해 테스트나 QA에 사용 가능하며, 
react의 경우는 react-docgen 등을 사용하면 컴포넌트 소스로 문서를 자동 생성할 수도 있다고 한다. 
(MDX라고 마크다운 문서에 JSX를 매끄럽게 작성가능한데 MDX 이용도 가능하다.)
뿐만 아니라 컴포넌트의 동적인 움직임에 대해 웹서버를 띄우지 않고도 디자이너와 편리하게 협업도 가능하다.
<br/>
<br/>
개인적인 프로젝트보다는 크고 여러명이 같이 협업하는 프로젝트에 매우 유용할 것 같다.  
조만간 회사에서 새로운 프로젝트에 투입될 것 같은데 이야기 꺼내봐야지.  
<br/>
<br/>
<br/>


## React Storybook Setting
1. `npx -p @storybook/cli sb init`
2. `yarn storybook`

매우 간단한데 storybook을 설치하고 나서 `yarn start`이 안되서 방법을 찾느라 삽질을 했다. 
CRA에서 지원하는 babel-loader와 webpack 버전이 storybook에서 지원하는 것과 버전도 다르고 겹쳐서 에러가 발생했는데 
이리저리 방법을 찾다가 package.json에 아래처럼 버전을 정의하는 방법으로 해결했다.
```
  "resolutions": {
    "babel-loader": "8.1.0",
    "webpack": "4.44.2"
  },
```


## Storybook 사용법
```shell
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 6006:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```
storybook을 설치해면 프론트에서 3가지 화면을 확인할 수 있다.  
* 자동화된 테스트 (Jest)
* 컴포넌트 개발 (Storybook)
* 앱 자체

### Asset 추가
* 아이콘이나 이미지, 폰트들은 src/assets 폴더 안에 넣음

### 컴포넌트 만들기
Storybook은 컴포넌트와 그 하위 스토리 두 가지 기본 단계로 구성.  
각 스토리는 해당 컴포넌트에 대응 (얼마든지 필요한 만큼의 스토리를 컴포넌트별 작성할 수 있음)  
* 컴포넌트
    * 스토리
    * 스토리
    * 스토리

1. 컴포넌트 폴더에 `컴포먼트명.tsx` 와 `컴포먼트명.stories.tsx` 파일 생성
2. `.tsx` 파일에 컴포넌트 작성
```tsx
import React from 'react';
import { observer } from 'mobx-react';

interface Props {
  id?: number;
  title?: string;
  state?: boolean;
}

const Task = observer(({ id, title, state }: Props) => {
  return (
    <div className='list-item'>
      {id}
      <input type='text' value={title} readOnly />
      {state && 'wow'}
    </div>
  );
});

export default Task;
```
3. `.stories.tsx` 파일에 테스트 사례 구현
```tsx
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Task from './Task';

// 스토리북에게 문서화하고 있는 컴포넌트를 알려주기 위해 아래 사항들을 포함하는 default export 생성
export default {
  title: 'Task', // 스토리북 앱의 사이드바에서 컴포넌트 참조 방법
  component: Task, // 해당 컴포넌트
  argTypes: {
    title: { control: 'color' },
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

// test 작성
export const Default = Template.bind({});
// Template.bind({})는 함수의 복사본을 만드는 기법. 이 기법을 사용해 각각 스토리가 고유한 속성을 갖지만 동일한 구현을 사용할 수 있게 함
Default.args = {
  id: 1,
  title: 'Test Task',
  state: true,
};

// test 작성
export const Large = Template.bind({});
// Template.bind({})는 함수의 복사본을 만드는 기법. 이 기법을 사용해 각각 스토리가 고유한 속성을 갖지만 동일한 구현을 사용할 수 있게 함
Default.args = {
  ...Default.args,
  title: 'wow',
};
```

### 스냅샷 테스트
* 주어진 입력에 대해 컴포넌트의 양호한 출력 값을 기록한 뒤, 출력 값이 변할 때마다 컴포넌트에 플래그를 지정하는 방식
* 새로운 버전의 컴포넌트를 보고 바뀐 부분을 빠르게 확인 가능함
* 스냅샷 테스트가 실패하지 않으려면 컴포넌트에 전달되는 데이터는 매번 변경되지 않는 것으로 넣어야 함(날짜나 무작위로 생성된 값들)

1. `yarn add -D @storybook/addon-storyshots react-test-renderer`
2. setupTest.ts 파일에 아래 내용 추가
```ts
import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```
3. yarn test 실행


## Reference
* [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started)
* [Storybook의 유용함](https://storybook.js.org/addons/@storybook/addon-jest)
* [storybook addon jest](https://medium.com/@j_podracer/storybook%EC%9D%98-%EC%9C%A0%EC%9A%A9%ED%95%A8-8581ea618c32)


