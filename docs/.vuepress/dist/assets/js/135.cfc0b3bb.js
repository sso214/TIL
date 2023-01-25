(window.webpackJsonp=window.webpackJsonp||[]).push([[135],{494:function(t,e,a){"use strict";a.r(e);var s=a(44),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"react-test-도구에-관하여"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-test-도구에-관하여"}},[t._v("#")]),t._v(" React Test 도구에 관하여")]),t._v(" "),a("h2",{attrs:{id:"recap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#recap"}},[t._v("#")]),t._v(" Recap")]),t._v(" "),a("ul",[a("li",[t._v("테스트의 단위는 어디까지 분리해야 하는가")]),t._v(" "),a("li",[t._v("무엇을 테스트해야 하는가")]),t._v(" "),a("li",[t._v("어떤 도구를 사용해 테스트를 작성해야 하는가")])]),t._v(" "),a("p",[t._v("(생각보다 주제가 포괄적이어서 어디서부터 어떻게 조사를 해야할지 갈피 잡기 힘들었음)")]),t._v(" "),a("h2",{attrs:{id:"fe-테스트"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fe-테스트"}},[t._v("#")]),t._v(" FE 테스트")]),t._v(" "),a("h3",{attrs:{id:"테스트-정의"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#테스트-정의"}},[t._v("#")]),t._v(" 테스트 정의")]),t._v(" "),a("p",[t._v('"프로그램을 실행하여 오류와 결함을 검출하고'),a("br"),t._v('\n애플리케이션이 요구사항에 맞게 동작하는지 검증하는 절차"'),a("br"),t._v("\n-위키피디아")]),t._v(" "),a("h3",{attrs:{id:"테스트-유형"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#테스트-유형"}},[t._v("#")]),t._v(" 테스트 유형")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("유형")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("특성")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("정적 테스트 (Static)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("- 구문 오류, 나쁜 코드 스타일, 잘못된 API 사용 등에 대한 테스트"),a("br"),t._v("- ESLint, TS로 해결 가능")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("단위 테스트 (Unit)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("- 기능의 개별적인 단위나 하나의 컴포넌트를 독립적으로 테스트"),a("br"),t._v("  (ex. 특정 컴포넌트를 렌더링해 깨지지 않는지 확인)"),a("br"),a("br"),t._v("-테스트 더블(테스트를 위해 사용되는 모의 객체/코드) 사용여부"),a("br"),t._v("  - Sociable 테스트 : 의존성이 있는 코드와 함께 테스트"),a("br"),t._v("    (ex. 자식 컴포넌트까지 포함해 렌더링)"),a("br"),t._v("  - Solitary 테스트 : 모듈에 의해 실행되는 코드 → 테스트 더블 대체"),a("br"),t._v("    (ex. 자식 컴포넌트를 모킹해 렌더링)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("통합 테스트 (Integation)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("- 시스템의 각 구성 요소가 올바르게 연동되어있는지 상호작용 테스트"),a("br"),t._v("  (ex. UI ←→ API 간의 상호작용, state에 따른 UI의 변경 동작 확인)"),a("br"),a("br"),t._v("- 테스트 더블 사용여부"),a("br"),t._v("  - broad test : 의존성이 있는 모든 모듈이 연결된 상태를 테스트"),a("br"),t._v("    (ex. 실제 API 호출)"),a("br"),t._v("  - narrow test : 연결된 모듈을 테스트 더블로 대체하여 테스트"),a("br"),t._v("    (ex. API client를 모킹하거나 가상 API 서버 이용)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("E2E 테스트 (End-to-End)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("- 실제 사용자 입장에서 전체 애플리케이션이 올바르게 동작하는지 테스트"),a("br"),t._v("  (완전한 기능 테스트)")])])])]),t._v(" "),a("p",[t._v("테스팅 트로피 방식이 FE 테스트에서 두각을 보임."),a("br"),t._v("\nE2E 테스트는 가장 느리며 비용이 많이 드는 반면, Unit 테스트는 가장 저렴하며 빠름.")]),t._v(" "),a("p",[t._v("하지만 Unit Test만 하면 UI 테스트의 이점을 가져갈 수 없기 때문에"),a("br"),t._v("\nUI테스트와 Unit 테스트의 중간 특성을 가진 "),a("strong",[t._v("통합 테스트를 위주로 작성")]),t._v("해야 한다고 권함")]),t._v(" "),a("h3",{attrs:{id:"테스트-환경"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#테스트-환경"}},[t._v("#")]),t._v(" 테스트 환경")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}}),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("브라우저")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Node.js")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("실행 속도")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Node.js 프로세스보다 무거우므로 실행속도 느림"),a("br"),a("br"),t._v("→ 속도 문제 해결을 위해 UI 인터페이스를 제외한 Headless 브라우저 사용. 또는 배포 시 CI와 연동해 테스트하는 방식 권장")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("빠름")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Web API, DOM 접근 API 사용 가능 여부")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("사용 가능")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("사용 불가능"),a("br"),t._v("→ jest 같은 테스트 도구들은 jsdom처럼 DOM을 가상으로 구현하는 라이브러리 활용")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("브라우저 호환성, 기기 호환성 테스트 가능 여부")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("가능")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("불가능"),a("br"),t._v("(실제 렌더링을 하지 않아 렌더링 관련 테스트는 불가능)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("대표적인 테스트 라이브러리")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Testcafe, Karma")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Mocha, Jest, Puppeteer"),a("br"),t._v("(chrome, chromium의 api를 사용해 node.js 환경에서도 브라우저 테스트 진행")])])])]),t._v(" "),a("p",[t._v("두 테스트 환경은 얻을 수 있는 이점 두 가지 측면에서 대비되기 때문에 트레이드 오프가 존재함")]),t._v(" "),a("p",[t._v("크로스 브라우징 등의 브라우저의 실제 동작을 테스트하는 경우 브라우저 환경,"),a("br"),t._v("\n그 외의 경우 Node.js 환경에서 테스트하는 것을 권장")]),t._v(" "),a("h3",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://blog.mathpresso.com/%EB%AA%A8%EB%8D%98-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A0%84%EB%9E%B5-1%ED%8E%B8-841e87a613b2",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.mathpresso.com/모던-프론트엔드-테스트-전략-1편-841e87a613b2"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://kimnamsun.github.io/blog/2022-05-22/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://kimnamsun.github.io/blog/2022-05-22/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://testingjavascript.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://testingjavascript.com/"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"js-테스트-도구"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js-테스트-도구"}},[t._v("#")]),t._v(" JS 테스트 도구")]),t._v(" "),a("h3",{attrs:{id:"구성"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#구성"}},[t._v("#")]),t._v(" 구성")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Testing Frameworks")]),t._v(" "),a("ul",[a("li",[t._v("테스트 코드를 작성할 수 있는 기반을 제공해주는 도구")]),t._v(" "),a("li",[t._v("Test Runners + Test Double")]),t._v(" "),a("li",[t._v("ex) Jest, Mocha, Jasmine, AVA")])])]),t._v(" "),a("li",[a("strong",[t._v("Test Runners")]),t._v(" "),a("ul",[a("li",[t._v("테스트 실행 도구. 테스트를 구동할 수 있는 환경 제공")]),t._v(" "),a("li",[t._v("보통 테스트 라이브러리 = Test runner")]),t._v(" "),a("li",[t._v("테스트 파일을 읽어들여 실행, 결과 출력")]),t._v(" "),a("li",[t._v("ex) Jest, Mocha, Jasmine, AVA, Karma")])])]),t._v(" "),a("li",[a("strong",[t._v("Test Double")]),t._v(" "),a("ul",[a("li",[t._v("테스트를 위한 가정을 만듬")]),t._v(" "),a("li",[t._v("테스트를 하기 위해 실제 코드 대신 사용하는 객체/함수")]),t._v(" "),a("li",[t._v("Dummy, Stub, Mock, Spy 통칭")])])]),t._v(" "),a("li",[a("strong",[t._v("Assertion + Matcher")]),t._v(" "),a("ul",[a("li",[t._v("가정 후 기대 결과를 바탕으로 작성된 테스트")]),t._v(" "),a("li",[t._v("Assertion : ‘가정’하는 부분을 담당")]),t._v(" "),a("li",[t._v("Matchers : ‘기대 결과’ 부분을 담당")]),t._v(" "),a("li",[t._v("ex) Chai")])])])]),t._v(" "),a("p",[t._v("그 외")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("리액트 컴포넌트 테스트")]),t._v(" : react-testing-library, Enzyme")]),t._v(" "),a("li",[a("strong",[t._v("E2E 테스트")]),t._v(" : Cypress, Playwright, NightWatch, TestCafe")])]),t._v(" "),a("h3",{attrs:{id:"testing-frameworks-라이브러리-주요-특성"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing-frameworks-라이브러리-주요-특성"}},[t._v("#")]),t._v(" Testing Frameworks 라이브러리 주요 특성")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Jest")]),t._v(" "),a("ul",[a("li",[t._v("zero-configuration")]),t._v(" "),a("li",[t._v("React 기반 애플리케이션에 매우 선호되는 프레임워크."),a("br"),t._v("\n("),a("a",{attrs:{href:"https://jestjs.io/blog/2016/09/01/jest-15",target:"_blank",rel:"noopener noreferrer"}},[t._v("이걸 위해 2016년에 Jest를 대대적으로 개조했다고 함"),a("OutboundLink")],1),t._v(")"),a("br"),t._v("\nReact 외에도 Angular, VueJS, NodeJS 등의 단위 테스트를 지원")]),t._v(" "),a("li",[t._v("단순함에 초점을 뒀으며 페이스북에서 개발")]),t._v(" "),a("li",[t._v("비교적 사용이 간단하며 Babel, TS 등에 모두 사용 가능")]),t._v(" "),a("li",[t._v("스냅샷 캡쳐 기능으로 대규모 테스트 케이스를 관리하는 것이 비교적 쉬움")])])]),t._v(" "),a("li",[a("strong",[t._v("Mocha")]),t._v(" "),a("ul",[a("li",[t._v("프론트엔드 및 백엔드 테스트 호환성 제공 (백엔드 테스트에 강점)")]),t._v(" "),a("li",[t._v("확장성이 좋음 - 여러가지 라이브러리를 사용해 기능 확장 가능"),a("br"),t._v("\n(주로 Assertion : Chai를 사용하고, 테스트 더블 : Sinon을 사용)")]),t._v(" "),a("li",[t._v("테스트가 연속적으로 실행되어 유연하고 정확한 보고가 가능하며 미검증 예외를 올바른 테스트 사례에 매핑함")]),t._v(" "),a("li",[t._v("모든 브라우저 지원 (헤드리스 Chrome 라이브러리 포함)")]),t._v(" "),a("li",[t._v("setup 과정이 Jest나 Jasmine에 비해 복잡 (Test runner로 써드파티라이브러리 필요)")])])]),t._v(" "),a("li",[a("strong",[t._v("Jasmine")]),t._v(" "),a("ul",[a("li",[t._v("동작 중심 개발 프레임워크")]),t._v(" "),a("li",[t._v("다른 JS 프레임워크에 의존하지 않으며 DOM이 필요하지 않음")]),t._v(" "),a("li",[t._v("구문자체가 명확하고 깔끔해서 쉽게 테스트 작성 가능함 (구문이 자연어와 매우 유사)")]),t._v(" "),a("li",[t._v("주로 브라우징 테스가 필요할 때 Karama와 Jasmine의 조합으로 사용"),a("br"),t._v("\n(Node.js와 브라우저 환경 모두에서 사용 가능하기 때문)")]),t._v(" "),a("li",[t._v("Mocha는 여러가지 라이브러리를 사용해야하는 반면 Jasmine은"),a("br"),t._v("\n모든 기능을 통합해서 제공하기 때문에 추가적인 라이브러리 불필요")])])]),t._v(" "),a("li",[a("strong",[t._v("AVA")]),t._v(" "),a("ul",[a("li",[t._v("빠른 실행")]),t._v(" "),a("li",[t._v("간결한 테스트 문법")]),t._v(" "),a("li",[t._v("간결한 API와 세부적인 오류 출력을 제공하며 새로운 언어 기능과 프로세스 격리를 지원")]),t._v(" "),a("li",[t._v("Node.js 모듈 및 서버 애플리케이션 테스트에 최적이지만"),a("br"),t._v("\nUI 애플리케이션 테스트 용도로는 그다지 적합하지 않음")])])])]),t._v(" "),a("h3",{attrs:{id:"인지도-비교"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#인지도-비교"}},[t._v("#")]),t._v(" 인지도 비교")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://2020.stateofjs.com/en-US/technologies/testing/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Status of JS 2020"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://npmtrends.com/ava-vs-jasmine-vs-jest-vs-mocha",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm trends"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"references-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references-2"}},[t._v("#")]),t._v(" References")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.browserstack.com/guide/top-javascript-testing-frameworks",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.browserstack.com/guide/top-javascript-testing-frameworks"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.testim.io/blog/best-unit-testing-framework-for-javascript/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.testim.io/blog/best-unit-testing-framework-for-javascript/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://velog.io/@rimo09/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://velog.io/@rimo09/자바스크립트-테스트-도구"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.naver.com/qls0147/222488038308",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.naver.com/qls0147/222488038308"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.itworld.co.kr/news/128974",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.itworld.co.kr/news/128974"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"react-test"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-test"}},[t._v("#")]),t._v(" React Test")]),t._v(" "),a("h3",{attrs:{id:"테스트-범위"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#테스트-범위"}},[t._v("#")]),t._v(" 테스트 범위")]),t._v(" "),a("ul",[a("li",[t._v("컴포넌트 트리 렌더링 : 간략화된 테스팅 환경과 출력값이 확실한 경우")]),t._v(" "),a("li",[t._v("완성된 앱에서의 테스트 : 브라우저 환경 (E2E 테스트)")])]),t._v(" "),a("h3",{attrs:{id:"테스트-도구"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#테스트-도구"}},[t._v("#")]),t._v(" 테스트 도구")]),t._v(" "),a("ul",[a("li",[t._v("React 공식문서에서 추천하는 테스팅 도구 = "),a("strong",[t._v("Jest + react-testing-library")]),t._v(" 조합"),a("br"),t._v("\n(CRA 사용하는 경우 기본 세팅)")]),t._v(" "),a("li",[t._v("Jest는 Mocha, Jasmine, AVA로 대체 가능하며,"),a("br"),t._v("\nreact-testing-library(=@testing-library/react)는 Enzyme으로 대체 가능")])]),t._v(" "),a("h4",{attrs:{id:"왜-jest와-react-testing-library를-같이-사용하는가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#왜-jest와-react-testing-library를-같이-사용하는가"}},[t._v("#")]),t._v(" 왜 Jest와 react-testing-library를 같이 사용하는가?")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Jest : 테스트 러너(테스트 실행기)")]),a("br"),t._v("\n각 테스트 케이스로 끝나는 모든 파일을 수집하고 실행하고 콘솔에 통과/실패 결과를 표시하는 도구")]),t._v(" "),a("li",[a("strong",[t._v("react-testing-library : React 구성 요소를 테스트하는 테스트 라이브러리")]),a("br"),t._v("\nReact는 JSX 문법이 사용된 Component로 이루어짐"),a("br"),t._v("\n→ 일반 JS가 아니기 때문에 테스트 러너에서 쉽게 동작하기 위해 필요한 라이브러리."),a("br"),t._v("\n테스트용 가상 DOM을 제공하고(가상 DOM이 있어야 브라우저 없이 테스트 가능) 이벤트를 수행하고"),a("br"),t._v("\ndom 요소 포착, render, fireEvent, waitFor, screen 등의 작업을 수행함")])]),t._v(" "),a("h4",{attrs:{id:"왜-react-testing-library는-testing-library-react로-이름이-바뀌었는가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#왜-react-testing-library는-testing-library-react로-이름이-바뀌었는가"}},[t._v("#")]),t._v(" 왜 react-testing-library는 @testing-library/react로 이름이 바뀌었는가?")]),t._v(" "),a("p",[t._v("*-testing-library로 이름 지어진 테스트 라이브러리는"),a("br"),t._v("\n“사용자가 앱을 사용하는 방법과 유사하게 (단위)테스트 코드를 작성하자”는 목표 아래"),a("br"),t._v("\nDom Testing Ligrary를 기반으로 다양한 FE 라이브러리/프레임워크의 테스트 라이브러리를 제공하고 있었음")]),t._v(" "),a("p",[t._v("→ 2019년에 어떤 트위트 이용자가 훗날 발생할 수도 있는 패키지 이름 충돌을 방지하기 위해"),a("br"),t._v("\n관련 테스팅 라이브러리의 패키지들을 @testing-library/*로 변경하는 것을 제안")]),t._v(" "),a("p",[t._v("→ 제안이 받아들여져 2019년 5월부터 관련 테스트 라이브러리들의 이름에 스코프가 적용됨\n"),a("br"),t._v(" "),a("br"),t._v(" "),a("a",{attrs:{href:"https://velog.io/@iamchanii/react-testing-library-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%A3%BC%EC%9D%98%EC%82%AC%ED%95%AD-80k0olhdm6",target:"_blank",rel:"noopener noreferrer"}},[t._v("“공식 패키지를 보다 공식적으로 만들고, 통일성/검색 가능성을 돕고,"),a("br"),t._v("우리가 미래에 사용하고자 하는 이름을 사람들이 가로채는 것을 방지합니다.”"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"react-테스트-라이브러리-비교"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-테스트-라이브러리-비교"}},[t._v("#")]),t._v(" react 테스트 라이브러리 비교")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}}),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("react-testing-library")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("enzyme")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("출시 연도")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("2018")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("2015")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("자기소개")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("react-testing-library는 React 구성 요소를 테스트하기 위한 매우 가벼운 솔루션입니다."),a("br"),t._v("react-dom 위에 가벼운 유틸리티 기능을 제공합니다.")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Enzyme은 React 구성 요소의 출력을 더 쉽게 주장, 조작 및 트래버스할 수 있게 해주는 React용 JavaScript 테스트 유틸리티입니다.")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("테스트 방법론")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Behavior Driven Test (행위 주도 테스트)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Implementation Driven Test (구현 주도 테스트)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("DOM")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("jsdom이라는 라이브러리를 통해 실제 브라우저 DOM을 기준으로 테스트 작성"),a("br"),t._v("→ 사용자 브라우저에서 렌더링하는 실제 HTML 마크업의 모습이 어떤지에 대해 테스트하기 용이")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("React가 만들어내는 가상 DOM을 기준으로 테스트 작성"),a("br"),t._v("→ 테스트 대상에 어떤 props가 넘어가고 현재 state가 어떻게 되는지 검증하기 용이")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("접근 방식")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("렌더링 결과에 조금 더 집중(더 사용자 관점에 집중)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("컴포넌트 내부 기능 자주 접근 (개발자 관점에 집중)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("동작 방식")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("DOM에 따라 구성 요소를 테스트하도록 강제하고, 구성 요소 내부에 접근할 수 있는 수단 제공하지 않음")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("주로 React 구성 요소의 구현 세부 정보를 테스트. 또한 DOM도 테스트 가능함")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("코드의 신뢰도")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("평균적으로 조금 더 복잡한 테스트를 작성해야 하지만 코드에 대한 더 높은 신뢰도로 보상")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("이해하기 쉽지만 장기적으로 보면 유지보수가 어려움"),a("br"),a("br"),t._v("컴포넌트의 state와 props를 사용해 컴포넌트 테스트하므로 일반적으로 테스트가 부서지기 쉬움"),a("br"),t._v("(누군가 상태의 변수명이나 구성요소의 props를 변경하면 기능이 변경되지 않았더라도 테스트 실패함)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("테스트 예시")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("상태 변수에 접근하지 않음."),a("br"),t._v("prop으로 전달된 함수를 테스트하긴 하지만 상태 변수가 정확한 값을 가지고 있는지는 테스트하지 않음")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("유닛 테스트를 먼저 작성."),a("br"),t._v("상태가 제대로 저장되는지 확인하고 현재의 subreddit 값과 함께 onSearch prop이 호출되는지 확인")])])])]),t._v(" "),a("h4",{attrs:{id:"왜-react-testing-library를-많이-사용하는가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#왜-react-testing-library를-많이-사용하는가"}},[t._v("#")]),t._v(" 왜 react-testing-library를 많이 사용하는가?")]),t._v(" "),a("p",[t._v("상태 관리는 컴포넌트의 구현 세부사항이다.(implementation detail)"),a("br"),t._v("\n고로 상태 변수의 위치가 변경되어도 (부모나 자식) 앱은 똑같이 동작해야 함"),a("br"),t._v(" "),a("br"),t._v("\n즉, 코드와 구현방식에 집중하는 대신, "),a("strong",[t._v("단순히 유저의 관점을 취함")]),a("br"),t._v("\n⇒ 이 관점은 앱의 중요한 부분을 테스트하는데 집중하도록 이끔")]),t._v(" "),a("h3",{attrs:{id:"react-테스트-라이브러리-인지도-비교"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-테스트-라이브러리-인지도-비교"}},[t._v("#")]),t._v(" React 테스트 라이브러리 인지도 비교")]),t._v(" "),a("p",[t._v("테스트 프로다임 자체가 Behavior Driven Test로 넘어가는 추세"),a("br"),t._v(" "),a("a",{attrs:{href:"https://npmtrends.com/@testing-library/react-vs-enzyme",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm trends"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"jest-react-testing-library-vs-cypress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jest-react-testing-library-vs-cypress"}},[t._v("#")]),t._v(" Jest + React-testing-library vs Cypress")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}}),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("React-testing-library")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Cypress")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("설정")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("jest도 올인원 프레임워크이라 따로 세팅이 필요 없고,"),a("br"),t._v("CRA 기본 세팅이기 때문에 CRA init 후 바로 테스트 코드 작성 가능함")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("설치 직후 E2E 테스트코드는 바로 작성 가능하지만"),a("br"),t._v("컴포넌트 테스트를 위해서는 추가적인 의존 모듈, 플러그인, config 설정 필요함")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("test runner")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Jest 주로 사용")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("mocha 사용함 (의존 모듈들을 내부적으로 사용하고 있기 때문에 따로 설치할 필요 X)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("개발 편의성")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("터미널에서 사용 가능")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("브라우저에서 사용 가능"),a("br"),t._v("E2E test의 경우 hot reload all files 가능하지만"),a("br"),t._v("컴포넌트 테스트는 hot reload all files가 안됨 (하나의 파일만 가능)"),a("br"),a("br"),t._v("jest의 watch & hot reload 모드보다 메모리를 더 많이 사용"),a("br"),a("br"),t._v("브라우저 위에서 탐색/디버깅이 가능하기 때문에,"),a("br"),t._v("리액트 앱 로컬 서버를 띄우지 않은 상태에서도 크롬 개발자 도구를 보면서 개발이 가능")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("테스트 유효성")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("DOM에서 테스트")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("DOM에서 테스트"),a("br"),t._v("브라우저 위에서 실행하며, 실제 유저 입장에서 다양한 브라우저와 다양한 상황에서 테스트할 수 있어서 더 유용함")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("속도")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("보다 빠름")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("보다 느림")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("기타")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("자동화된 스크린샷 및 비디오 캡처를 허용")])])])]),t._v(" "),a("h3",{attrs:{id:"jest-react-testing-library-vs-cypress-코드-비교"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jest-react-testing-library-vs-cypress-코드-비교"}},[t._v("#")]),t._v(" Jest + React-testing-library vs Cypress 코드 비교")]),t._v(" "),a("h4",{attrs:{id:"jest-react-testing-library-버튼-컴포넌트-테스트-코드"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jest-react-testing-library-버튼-컴포넌트-테스트-코드"}},[t._v("#")]),t._v(" jest + react testing library 버튼 컴포넌트 테스트 코드")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" fireEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" render "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@testing-library/react"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Button "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./Button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("describe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Given Button, When Click, Then call onClick"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" onClick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" jest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" getByText "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Button onClick"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("onClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Test Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" button "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getByText")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("Test button")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("i")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("expect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toBeTruthy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    fireEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("click")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("expect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("onClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toHaveBeenCalledTimes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",[a("li",[a("p",[t._v("컴포넌트 셋업"),a("br"),t._v("\nreact-testing-library에서 제공하는 render 함수 사용해서 컴포넌트 마운트"),a("br"),t._v("\n인자값으로 ReactElement 전달")])]),t._v(" "),a("li",[a("p",[t._v("렌더링 결과 확인"),a("br"),t._v("\nrender 함수가 반환하는 메서드 중 DOM Element에 접근할 수 있는 getByText 사용."),a("br"),t._v("\n렌더링 결과를 검증하기 위해 expect()에 버튼 엘리먼트를 넣고, toBeTruthy 함수로 존재하는지를 확인함."),a("br"),t._v("\n테스트는 버튼이 존재한다면 pass, 존재하지 않는다면 fail")])]),t._v(" "),a("li",[a("p",[t._v("UI로 행동 발생\nreact-testing-library에서 제공하는 fireEvent함수로 버튼 엘리먼트에 click 이벤트를 발생시킴")]),t._v(" "),a("p",[t._v("이벤트를 발생시키는 함수로 fireEvent말고 userEvent함수를 사용하는 방법도 존재"),a("br"),t._v("\nuserEvent는 마치 사람이 직접 브라우저 상에서 행동하는 것처럼 유저 이벤트를 발생시킬 수 있음"),a("br"),t._v("\n따라서 fireEvent는 코드로 명시한 click 이벤트만 발생시키지만,"),a("br"),t._v("\nuserEvent는 유저가 click을 할 때 실제로 발생하는 다른 이벤트들도 모두 발생함."),a("br"),t._v("\n따라서 userEvent를 사용하는 것이 더 실제 환경에 가깝게 테스트를 하는 것")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" userEvent "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@testing-library/user-event"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...(중략)")]),t._v("\nuserEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("click")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h4",{attrs:{id:"cypress-버튼-컴포넌트-테스트-코드"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cypress-버튼-컴포넌트-테스트-코드"}},[t._v("#")]),t._v(" cypress 버튼 컴포넌트 테스트 코드")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" mount "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@cypress/react"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Button "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./Button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("describe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Given Button, When Click, Then call onClic"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" onClick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stub")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("as")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"clickHandler"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Button onClick"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("onClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Test button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    cy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("contains")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Test button"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("click")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    cy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@clickHandler"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("should")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"have.been.calledOnce"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",[a("li",[a("p",[t._v("컴포넌트 셋업"),a("br"),t._v("\ncypress에서 제공하는 mount 함수로 컴포넌트 마운트 (인자값으로 ReactNode 전달)")])]),t._v(" "),a("li",[a("p",[t._v("렌더링 결과 확인"),a("br"),t._v("\nDOM Element에 접근하기 위해서 단 하나의 메서드만을 사용하면 됨"),a("br"),t._v("\ncy.get()은 jQuery의 DOM 쿼리 방식을 그대로 사용함"),a("br"),t._v("\n또한 체이닝을 할 수 있기에 contains 메서드로 특정 텍스트를 가지고 있는 button을 필터링하여 얻을 수 있음"),a("br"),t._v("\ncontains 다음에 should 메소드로 체이닝하면 단언을 작성할 수 있음"),a("br"),t._v(" "),a("code",[t._v('cy.get("button").contains("Test button").should("exist");')]),a("br"),t._v("\n위처럼 작성하면 “Test button” 텍스트를 가진 button 태그가 존재하는지를 확인하는 테스트가 됨")]),t._v(" "),a("p",[t._v("단언을 should와 and로 작성할 수 있는데,"),a("br"),t._v("\nand는 should 뒤에 추가적인 단언을 체이닝으로 작성하고 싶을 때 사용함"),a("br"),t._v(" "),a("code",[t._v('cy.get("input").should("be.focused").and("have.value", "Hello");')])])]),t._v(" "),a("li",[a("p",[t._v("UI로 행동 발생\ncontains 다음 체이닝으로 단언을 쓰지 않고 click 메소드로 click 이벤트를 발생시킴"),a("br"),t._v("\n(이렇게 해도 contains에서 어떤 엘리먼트도 얻지 못하면 테스트는 fail 하게 됨)")])])]),t._v(" "),a("h3",{attrs:{id:"jest-react-testing-library-vs-cypress-인지도-비교"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jest-react-testing-library-vs-cypress-인지도-비교"}},[t._v("#")]),t._v(" Jest + React-testing-library vs Cypress 인지도 비교")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://npmtrends.com/@testing-library/react-vs-cypress",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm trends"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"references-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references-3"}},[t._v("#")]),t._v(" References")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://ko.reactjs.org/docs/testing.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://ko.reactjs.org/docs/testing.html"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://create-react-app.dev/docs/running-tests/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://create-react-app.dev/docs/running-tests/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://jestjs.io/blog/2016/09/01/jest-15",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://jestjs.io/blog/2016/09/01/jest-15"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://learn-react-test.vlpt.us/#/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://learn-react-test.vlpt.us/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://pathas.tistory.com/231",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://pathas.tistory.com/231"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.testim.io/blog/react-testing-library-vs-enzyme/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.testim.io/blog/react-testing-library-vs-enzyme/"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://articles.wesionary.team/react-testing-library-vs-enzyme-afd29db380ac",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://articles.wesionary.team/react-testing-library-vs-enzyme-afd29db380ac"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.daleseo.com/react-testing-library/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.daleseo.com/react-testing-library/"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=r.exports}}]);