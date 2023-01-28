(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{472:function(t,s,a){"use strict";a.r(s);var n=a(44),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"storybook"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#storybook"}},[t._v("#")]),t._v(" Storybook")]),t._v(" "),a("p",[t._v("2021.08.18")]),t._v(" "),a("h2",{attrs:{id:"storybook이란"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#storybook이란"}},[t._v("#")]),t._v(" Storybook이란?")]),t._v(" "),a("blockquote",[a("p",[t._v("Storybook is a user interface development environment and playground for UI components. The tool enables developers to create components independently and showcase components interactively in an isolated development environment.")])]),t._v(" "),a("ul",[a("li",[t._v("UI개발 환경이자, UI 컴포넌트를 위한 놀이터")]),t._v(" "),a("li",[t._v("개발자들이 컴포넌트를 독립적으로 만들고, 격리된 개발 환경에서 상호작용 가능한 컴포넌트를 선보일 수 있도록 함")])]),t._v(" "),a("p",[t._v("초기 react를 처음 사용해보면서 컴포넌트를 작성할 때 계란 바위치듯 삽질해가며 만들었던게 생각났다.\n컴포넌트 하나를 만들기 위해서는 디자인이나 여러 상태값을 고려해 props를 넘기고 정의해야하는데,  아무래도 옵션들이 다양해지고 들어가는 내용이 많아지다보니 복잡해지게 된다."),a("br"),t._v(" "),a("br"),t._v("\nStorybook은 이런 과정을 쉽고 간단하게 작업할 수 있도록 도와준다.\n컴포넌트들의 여러 사례들을 소스와 함께 제공하기도 하고, 해당 컴포넌트의 API 문서를 깔끔하고 간편하게 만들 수 있어 다른 개발자들과 협업하기도 수월해진다."),a("br"),t._v(" "),a("br"),t._v("\n또한 Storyshot을 이용해 코드 스냅샷 테스트를 받을 수 있고, 특정 유스케이스를 스토리로 저장해 테스트나 QA에 사용 가능하며,\nreact의 경우는 react-docgen 등을 사용하면 컴포넌트 소스로 문서를 자동 생성할 수도 있다고 한다.\n(MDX라고 마크다운 문서에 JSX를 매끄럽게 작성가능한데 MDX 이용도 가능하다.)\n뿐만 아니라 컴포넌트의 동적인 움직임에 대해 웹서버를 띄우지 않고도 디자이너와 편리하게 협업도 가능하다.\n"),a("br"),t._v(" "),a("br"),t._v("\n개인적인 프로젝트보다는 크고 여러명이 같이 협업하는 프로젝트에 매우 유용할 것 같다."),a("br"),t._v("\n조만간 회사에서 새로운 프로젝트에 투입될 것 같은데 이야기 꺼내봐야지."),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br")]),t._v(" "),a("h2",{attrs:{id:"react-storybook-setting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-storybook-setting"}},[t._v("#")]),t._v(" React Storybook Setting")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("npx -p @storybook/cli sb init")])]),t._v(" "),a("li",[a("code",[t._v("yarn storybook")])])]),t._v(" "),a("p",[t._v("매우 간단한데 storybook을 설치하고 나서 "),a("code",[t._v("yarn start")]),t._v("이 안되서 방법을 찾느라 삽질을 했다.\nCRA에서 지원하는 babel-loader와 webpack 버전이 storybook에서 지원하는 것과 버전도 다르고 겹쳐서 에러가 발생했는데\n이리저리 방법을 찾다가 package.json에 아래처럼 버전을 정의하는 방법으로 해결했다.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('  "resolutions": {\n    "babel-loader": "8.1.0",\n    "webpack": "4.44.2"\n  },\n')])])]),a("h2",{attrs:{id:"storybook-사용법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#storybook-사용법"}},[t._v("#")]),t._v(" Storybook 사용법")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Run the test runner (Jest) in a terminal:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v(" --watchAll\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Start the component explorer on port 6006:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" storybook\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Run the frontend app proper on port 3000:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" start\n")])])]),a("p",[t._v("storybook을 설치해면 프론트에서 3가지 화면을 확인할 수 있다.")]),t._v(" "),a("ul",[a("li",[t._v("자동화된 테스트 (Jest)")]),t._v(" "),a("li",[t._v("컴포넌트 개발 (Storybook)")]),t._v(" "),a("li",[t._v("앱 자체")])]),t._v(" "),a("h3",{attrs:{id:"asset-추가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#asset-추가"}},[t._v("#")]),t._v(" Asset 추가")]),t._v(" "),a("ul",[a("li",[t._v("아이콘이나 이미지, 폰트들은 src/assets 폴더 안에 넣음")])]),t._v(" "),a("h3",{attrs:{id:"컴포넌트-만들기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#컴포넌트-만들기"}},[t._v("#")]),t._v(" 컴포넌트 만들기")]),t._v(" "),a("p",[t._v("Storybook은 컴포넌트와 그 하위 스토리 두 가지 기본 단계로 구성."),a("br"),t._v("\n각 스토리는 해당 컴포넌트에 대응 (얼마든지 필요한 만큼의 스토리를 컴포넌트별 작성할 수 있음)")]),t._v(" "),a("ul",[a("li",[t._v("컴포넌트\n"),a("ul",[a("li",[t._v("스토리")]),t._v(" "),a("li",[t._v("스토리")]),t._v(" "),a("li",[t._v("스토리")])])])]),t._v(" "),a("ol",[a("li",[t._v("컴포넌트 폴더에 "),a("code",[t._v("컴포먼트명.tsx")]),t._v(" 와 "),a("code",[t._v("컴포먼트명.stories.tsx")]),t._v(" 파일 생성")]),t._v(" "),a("li",[a("code",[t._v(".tsx")]),t._v(" 파일에 컴포넌트 작성")])]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" observer "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mobx-react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Props")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  state"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("boolean")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Task "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("observer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" title"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" state "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Props")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("className")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("list-item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n      ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n      ")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("readOnly")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n      ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("state "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'wow'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n    ")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" Task"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("code",[t._v(".stories.tsx")]),t._v(" 파일에 테스트 사례 구현")])]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" ComponentMeta"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ComponentStory "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@storybook/react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Task "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./Task'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 스토리북에게 문서화하고 있는 컴포넌트를 알려주기 위해 아래 사항들을 포함하는 default export 생성")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Task'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 스토리북 앱의 사이드바에서 컴포넌트 참조 방법")]),t._v("\n  component"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Task"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 해당 컴포넌트")]),t._v("\n  argTypes"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" control"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'color'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ComponentMeta"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" Task"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Template"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ComponentStory"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" Task"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Task")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token spread"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// test 작성")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Default "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Template.bind({})는 함수의 복사본을 만드는 기법. 이 기법을 사용해 각각 스토리가 고유한 속성을 갖지만 동일한 구현을 사용할 수 있게 함")]),t._v("\nDefault"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("args "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Test Task'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  state"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// test 작성")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Large "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Template.bind({})는 함수의 복사본을 만드는 기법. 이 기법을 사용해 각각 스토리가 고유한 속성을 갖지만 동일한 구현을 사용할 수 있게 함")]),t._v("\nDefault"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("args "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("Default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'wow'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"스냅샷-테스트"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#스냅샷-테스트"}},[t._v("#")]),t._v(" 스냅샷 테스트")]),t._v(" "),a("ul",[a("li",[t._v("주어진 입력에 대해 컴포넌트의 양호한 출력 값을 기록한 뒤, 출력 값이 변할 때마다 컴포넌트에 플래그를 지정하는 방식")]),t._v(" "),a("li",[t._v("새로운 버전의 컴포넌트를 보고 바뀐 부분을 빠르게 확인 가능함")]),t._v(" "),a("li",[t._v("스냅샷 테스트가 실패하지 않으려면 컴포넌트에 전달되는 데이터는 매번 변경되지 않는 것으로 넣어야 함(날짜나 무작위로 생성된 값들)")])]),t._v(" "),a("ol",[a("li",[a("code",[t._v("yarn add -D @storybook/addon-storyshots react-test-renderer")])]),t._v(" "),a("li",[t._v("setupTest.ts 파일에 아래 내용 추가")])]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" initStoryshots "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@storybook/addon-storyshots'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("initStoryshots")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("yarn test 실행")])]),t._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[t._v("#")]),t._v(" Reference")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started",target:"_blank",rel:"noopener noreferrer"}},[t._v("Storybook"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://storybook.js.org/addons/@storybook/addon-jest",target:"_blank",rel:"noopener noreferrer"}},[t._v("Storybook의 유용함"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://medium.com/@j_podracer/storybook%EC%9D%98-%EC%9C%A0%EC%9A%A9%ED%95%A8-8581ea618c32",target:"_blank",rel:"noopener noreferrer"}},[t._v("storybook addon jest"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);