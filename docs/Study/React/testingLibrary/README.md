---
title : React Test 도구에 관하여
date : 2022.11.24
---

# React Test 도구에 관하여  
2022.11.24

## Recap
* 테스트의 단위는 어디까지 분리해야 하는가 
* 무엇을 테스트해야 하는가
* 어떤 도구를 사용해 테스트를 작성해야 하는가  

(생각보다 주제가 포괄적이어서 어디서부터 어떻게 조사를 해야할지 갈피 잡기 힘들었음)

## FE 테스트
### 테스트 정의
"프로그램을 실행하여 오류와 결함을 검출하고   
애플리케이션이 요구사항에 맞게 동작하는지 검증하는 절차"  
-위키피디아

### 테스트 유형
|유형|특성|
|:-|:-|
|정적 테스트 (Static)|- 구문 오류, 나쁜 코드 스타일, 잘못된 API 사용 등에 대한 테스트<br>- ESLint, TS로 해결 가능|
|단위 테스트 (Unit)|- 기능의 개별적인 단위나 하나의 컴포넌트를 독립적으로 테스트<br>&nbsp;&nbsp;(ex. 특정 컴포넌트를 렌더링해 깨지지 않는지 확인)<br><br>-테스트 더블(테스트를 위해 사용되는 모의 객체/코드) 사용여부<br>&nbsp;&nbsp;- Sociable 테스트 : 의존성이 있는 코드와 함께 테스트<br>&nbsp;&nbsp;&nbsp;&nbsp;(ex. 자식 컴포넌트까지 포함해 렌더링)<br>&nbsp;&nbsp;- Solitary 테스트 : 모듈에 의해 실행되는 코드 → 테스트 더블 대체<br>&nbsp;&nbsp;&nbsp;&nbsp;(ex. 자식 컴포넌트를 모킹해 렌더링)|
|통합 테스트 (Integation)|- 시스템의 각 구성 요소가 올바르게 연동되어있는지 상호작용 테스트<br>&nbsp;&nbsp;(ex. UI ←→ API 간의 상호작용, state에 따른 UI의 변경 동작 확인)<br><br>- 테스트 더블 사용여부<br>&nbsp;&nbsp;- broad test : 의존성이 있는 모든 모듈이 연결된 상태를 테스트<br>&nbsp;&nbsp;&nbsp;&nbsp;(ex. 실제 API 호출)<br>&nbsp;&nbsp;- narrow test : 연결된 모듈을 테스트 더블로 대체하여 테스트<br>&nbsp;&nbsp;&nbsp;&nbsp;(ex. API client를 모킹하거나 가상 API 서버 이용)|
|E2E 테스트 (End-to-End)|- 실제 사용자 입장에서 전체 애플리케이션이 올바르게 동작하는지 테스트<br>&nbsp;&nbsp;(완전한 기능 테스트)|


테스팅 트로피 방식이 FE 테스트에서 두각을 보임.  
E2E 테스트는 가장 느리며 비용이 많이 드는 반면, Unit 테스트는 가장 저렴하며 빠름.  

하지만 Unit Test만 하면 UI 테스트의 이점을 가져갈 수 없기 때문에   
UI테스트와 Unit 테스트의 중간 특성을 가진 **통합 테스트를 위주로 작성**해야 한다고 권함

### 테스트 환경
||브라우저|Node.js|
|:-|:-|:-|
|실행 속도|Node.js 프로세스보다 무거우므로 실행속도 느림<br><br>→ 속도 문제 해결을 위해 UI 인터페이스를 제외한 Headless 브라우저 사용. 또는 배포 시 CI와 연동해 테스트하는 방식 권장|빠름|
|Web API, DOM 접근 API 사용 가능 여부|사용 가능|사용 불가능<br>→ jest 같은 테스트 도구들은 jsdom처럼 DOM을 가상으로 구현하는 라이브러리 활용|
|브라우저 호환성, 기기 호환성 테스트 가능 여부|가능|불가능<br>(실제 렌더링을 하지 않아 렌더링 관련 테스트는 불가능)|
|대표적인 테스트 라이브러리|Testcafe, Karma|Mocha, Jest, Puppeteer<br>(chrome, chromium의 api를 사용해 node.js 환경에서도 브라우저 테스트 진행|

두 테스트 환경은 얻을 수 있는 이점 두 가지 측면에서 대비되기 때문에 트레이드 오프가 존재함  

크로스 브라우징 등의 브라우저의 실제 동작을 테스트하는 경우 브라우저 환경,   
그 외의 경우 Node.js 환경에서 테스트하는 것을 권장

### References
* [https://blog.mathpresso.com/모던-프론트엔드-테스트-전략-1편-841e87a613b2](https://blog.mathpresso.com/%EB%AA%A8%EB%8D%98-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A0%84%EB%9E%B5-1%ED%8E%B8-841e87a613b2)
* [https://kimnamsun.github.io/blog/2022-05-22/](https://kimnamsun.github.io/blog/2022-05-22/)
* [https://testingjavascript.com/](https://testingjavascript.com/)


## JS 테스트 도구

### 구성
* **Testing Frameworks**
  * 테스트 코드를 작성할 수 있는 기반을 제공해주는 도구
  * Test Runners + Test Double
  * ex) Jest, Mocha, Jasmine, AVA
* **Test Runners**
  * 테스트 실행 도구. 테스트를 구동할 수 있는 환경 제공
  * 보통 테스트 라이브러리 = Test runner
  * 테스트 파일을 읽어들여 실행, 결과 출력
  * ex) Jest, Mocha, Jasmine, AVA, Karma
* **Test Double**
  * 테스트를 위한 가정을 만듬
  * 테스트를 하기 위해 실제 코드 대신 사용하는 객체/함수
  * Dummy, Stub, Mock, Spy 통칭
* **Assertion + Matcher**
  * 가정 후 기대 결과를 바탕으로 작성된 테스트
  * Assertion : ‘가정’하는 부분을 담당
  * Matchers : ‘기대 결과’ 부분을 담당
  * ex) Chai

그 외 
* **리액트 컴포넌트 테스트** : react-testing-library, Enzyme
* **E2E 테스트** : Cypress, Playwright, NightWatch, TestCafe

### Testing Frameworks 라이브러리 주요 특성
* **Jest**
  * zero-configuration
  * React 기반 애플리케이션에 매우 선호되는 프레임워크.  
    ([이걸 위해 2016년에 Jest를 대대적으로 개조했다고 함](https://jestjs.io/blog/2016/09/01/jest-15))  
    React 외에도 Angular, VueJS, NodeJS 등의 단위 테스트를 지원
  * 단순함에 초점을 뒀으며 페이스북에서 개발
  * 비교적 사용이 간단하며 Babel, TS 등에 모두 사용 가능
  * 스냅샷 캡쳐 기능으로 대규모 테스트 케이스를 관리하는 것이 비교적 쉬움
* **Mocha**
  * 프론트엔드 및 백엔드 테스트 호환성 제공 (백엔드 테스트에 강점)
  * 확장성이 좋음 - 여러가지 라이브러리를 사용해 기능 확장 가능  
    (주로 Assertion : Chai를 사용하고, 테스트 더블 : Sinon을 사용)
  * 테스트가 연속적으로 실행되어 유연하고 정확한 보고가 가능하며 미검증 예외를 올바른 테스트 사례에 매핑함
  * 모든 브라우저 지원 (헤드리스 Chrome 라이브러리 포함)
  * setup 과정이 Jest나 Jasmine에 비해 복잡 (Test runner로 써드파티라이브러리 필요)
* **Jasmine**
  * 동작 중심 개발 프레임워크
  * 다른 JS 프레임워크에 의존하지 않으며 DOM이 필요하지 않음
  * 구문자체가 명확하고 깔끔해서 쉽게 테스트 작성 가능함 (구문이 자연어와 매우 유사)
  * 주로 브라우징 테스가 필요할 때 Karama와 Jasmine의 조합으로 사용   
    (Node.js와 브라우저 환경 모두에서 사용 가능하기 때문)
  * Mocha는 여러가지 라이브러리를 사용해야하는 반면 Jasmine은   
    모든 기능을 통합해서 제공하기 때문에 추가적인 라이브러리 불필요
* **AVA**
  * 빠른 실행  
  * 간결한 테스트 문법
  * 간결한 API와 세부적인 오류 출력을 제공하며 새로운 언어 기능과 프로세스 격리를 지원
  * Node.js 모듈 및 서버 애플리케이션 테스트에 최적이지만  
    UI 애플리케이션 테스트 용도로는 그다지 적합하지 않음

### 인지도 비교
* [Status of JS 2020](https://2020.stateofjs.com/en-US/technologies/testing/)
* [npm trends](https://npmtrends.com/ava-vs-jasmine-vs-jest-vs-mocha)

### References
* [https://www.browserstack.com/guide/top-javascript-testing-frameworks](https://www.browserstack.com/guide/top-javascript-testing-frameworks)
* [https://www.testim.io/blog/best-unit-testing-framework-for-javascript/](https://www.testim.io/blog/best-unit-testing-framework-for-javascript/)
* [https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870](https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870)
* [https://velog.io/@rimo09/자바스크립트-테스트-도구](https://velog.io/@rimo09/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC)
* [https://blog.naver.com/qls0147/222488038308](https://blog.naver.com/qls0147/222488038308)
* [https://www.itworld.co.kr/news/128974](https://www.itworld.co.kr/news/128974)



## React Test

### 테스트 범위
* 컴포넌트 트리 렌더링 : 간략화된 테스팅 환경과 출력값이 확실한 경우
* 완성된 앱에서의 테스트 : 브라우저 환경 (E2E 테스트)

### 테스트 도구
* React 공식문서에서 추천하는 테스팅 도구 = **Jest + react-testing-library** 조합   
  (CRA 사용하는 경우 기본 세팅)
* Jest는 Mocha, Jasmine, AVA로 대체 가능하며,   
  react-testing-library(=@testing-library/react)는 Enzyme으로 대체 가능

#### 왜 Jest와 react-testing-library를 같이 사용하는가?
* **Jest : 테스트 러너(테스트 실행기)**   
  각 테스트 케이스로 끝나는 모든 파일을 수집하고 실행하고 콘솔에 통과/실패 결과를 표시하는 도구
* **react-testing-library : React 구성 요소를 테스트하는 테스트 라이브러리**   
  React는 JSX 문법이 사용된 Component로 이루어짐   
  → 일반 JS가 아니기 때문에 테스트 러너에서 쉽게 동작하기 위해 필요한 라이브러리.  
  테스트용 가상 DOM을 제공하고(가상 DOM이 있어야 브라우저 없이 테스트 가능) 이벤트를 수행하고  
  dom 요소 포착, render, fireEvent, waitFor, screen 등의 작업을 수행함

#### 왜 react-testing-library는 @testing-library/react로 이름이 바뀌었는가?
*-testing-library로 이름 지어진 테스트 라이브러리는   
“사용자가 앱을 사용하는 방법과 유사하게 (단위)테스트 코드를 작성하자”는 목표 아래  
Dom Testing Ligrary를 기반으로 다양한 FE 라이브러리/프레임워크의 테스트 라이브러리를 제공하고 있었음  

→ 2019년에 어떤 트위트 이용자가 훗날 발생할 수도 있는 패키지 이름 충돌을 방지하기 위해  
관련 테스팅 라이브러리의 패키지들을 @testing-library/*로 변경하는 것을 제안  

→ 제안이 받아들여져 2019년 5월부터 관련 테스트 라이브러리들의 이름에 스코프가 적용됨
<br>
<br>
[“공식 패키지를 보다 공식적으로 만들고, 통일성/검색 가능성을 돕고,<br>우리가 미래에 사용하고자 하는 이름을 사람들이 가로채는 것을 방지합니다.”](https://velog.io/@iamchanii/react-testing-library-사용-시-주의사항-80k0olhdm6)

### react 테스트 라이브러리 비교
||react-testing-library|enzyme|
|:-|:-|:-|
|출시 연도|2018|2015|
|자기소개|react-testing-library는 React 구성 요소를 테스트하기 위한 매우 가벼운 솔루션입니다.<br>react-dom 위에 가벼운 유틸리티 기능을 제공합니다.|Enzyme은 React 구성 요소의 출력을 더 쉽게 주장, 조작 및 트래버스할 수 있게 해주는 React용 JavaScript 테스트 유틸리티입니다.|
|테스트 방법론|Behavior Driven Test (행위 주도 테스트)|Implementation Driven Test (구현 주도 테스트)|
|DOM|jsdom이라는 라이브러리를 통해 실제 브라우저 DOM을 기준으로 테스트 작성<br>→ 사용자 브라우저에서 렌더링하는 실제 HTML 마크업의 모습이 어떤지에 대해 테스트하기 용이|React가 만들어내는 가상 DOM을 기준으로 테스트 작성<br>→ 테스트 대상에 어떤 props가 넘어가고 현재 state가 어떻게 되는지 검증하기 용이|
|접근 방식|렌더링 결과에 조금 더 집중(더 사용자 관점에 집중)|컴포넌트 내부 기능 자주 접근 (개발자 관점에 집중)|
|동작 방식|DOM에 따라 구성 요소를 테스트하도록 강제하고, 구성 요소 내부에 접근할 수 있는 수단 제공하지 않음|주로 React 구성 요소의 구현 세부 정보를 테스트. 또한 DOM도 테스트 가능함|
|코드의 신뢰도|평균적으로 조금 더 복잡한 테스트를 작성해야 하지만 코드에 대한 더 높은 신뢰도로 보상|이해하기 쉽지만 장기적으로 보면 유지보수가 어려움<br><br>컴포넌트의 state와 props를 사용해 컴포넌트 테스트하므로 일반적으로 테스트가 부서지기 쉬움<br>(누군가 상태의 변수명이나 구성요소의 props를 변경하면 기능이 변경되지 않았더라도 테스트 실패함)|
|테스트 예시|상태 변수에 접근하지 않음.<br>prop으로 전달된 함수를 테스트하긴 하지만 상태 변수가 정확한 값을 가지고 있는지는 테스트하지 않음|유닛 테스트를 먼저 작성.<br>상태가 제대로 저장되는지 확인하고 현재의 subreddit 값과 함께 onSearch prop이 호출되는지 확인|

#### 왜 react-testing-library를 많이 사용하는가?
상태 관리는 컴포넌트의 구현 세부사항이다.(implementation detail)  
고로 상태 변수의 위치가 변경되어도 (부모나 자식) 앱은 똑같이 동작해야 함   
<br>
즉, 코드와 구현방식에 집중하는 대신, **단순히 유저의 관점을 취함**   
⇒ 이 관점은 앱의 중요한 부분을 테스트하는데 집중하도록 이끔

### React 테스트 라이브러리 인지도 비교
테스트 프로다임 자체가 Behavior Driven Test로 넘어가는 추세  
[npm trends](https://npmtrends.com/@testing-library/react-vs-enzyme)


### Jest + React-testing-library vs Cypress
||React-testing-library|Cypress|
|:-|:-|:-|
|설정|jest도 올인원 프레임워크이라 따로 세팅이 필요 없고,<br>CRA 기본 세팅이기 때문에 CRA init 후 바로 테스트 코드 작성 가능함|설치 직후 E2E 테스트코드는 바로 작성 가능하지만<br>컴포넌트 테스트를 위해서는 추가적인 의존 모듈, 플러그인, config 설정 필요함|
|test runner|Jest 주로 사용|mocha 사용함 (의존 모듈들을 내부적으로 사용하고 있기 때문에 따로 설치할 필요 X)|
|개발 편의성|터미널에서 사용 가능|브라우저에서 사용 가능<br>E2E test의 경우 hot reload all files 가능하지만<br>컴포넌트 테스트는 hot reload all files가 안됨 (하나의 파일만 가능)<br><br>jest의 watch & hot reload 모드보다 메모리를 더 많이 사용<br><br>브라우저 위에서 탐색/디버깅이 가능하기 때문에,<br>리액트 앱 로컬 서버를 띄우지 않은 상태에서도 크롬 개발자 도구를 보면서 개발이 가능|
|테스트 유효성|DOM에서 테스트|DOM에서 테스트<br>브라우저 위에서 실행하며, 실제 유저 입장에서 다양한 브라우저와 다양한 상황에서 테스트할 수 있어서 더 유용함|
|속도|보다 빠름|보다 느림|
|기타|-|자동화된 스크린샷 및 비디오 캡처를 허용|

### Jest + React-testing-library vs Cypress 코드 비교
#### jest + react testing library 버튼 컴포넌트 테스트 코드
```javascript
import { fireEvent, render } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("Given Button, When Click, Then call onClick", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Test Button</Button>);
    const button = getByText(/Test button/i);

    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```
1. 컴포넌트 셋업   
   react-testing-library에서 제공하는 render 함수 사용해서 컴포넌트 마운트  
   인자값으로 ReactElement 전달
2. 렌더링 결과 확인   
   render 함수가 반환하는 메서드 중 DOM Element에 접근할 수 있는 getByText 사용.  
   렌더링 결과를 검증하기 위해 expect()에 버튼 엘리먼트를 넣고, toBeTruthy 함수로 존재하는지를 확인함.  
   테스트는 버튼이 존재한다면 pass, 존재하지 않는다면 fail
3. UI로 행동 발생
   react-testing-library에서 제공하는 fireEvent함수로 버튼 엘리먼트에 click 이벤트를 발생시킴

   이벤트를 발생시키는 함수로 fireEvent말고 userEvent함수를 사용하는 방법도 존재  
   userEvent는 마치 사람이 직접 브라우저 상에서 행동하는 것처럼 유저 이벤트를 발생시킬 수 있음  
   따라서 fireEvent는 코드로 명시한 click 이벤트만 발생시키지만,  
   userEvent는 유저가 click을 할 때 실제로 발생하는 다른 이벤트들도 모두 발생함.  
   따라서 userEvent를 사용하는 것이 더 실제 환경에 가깝게 테스트를 하는 것  
    ```javascript
    import userEvent from "@testing-library/user-event";
    // ...(중략)
    userEvent.click(button);
    ```

#### cypress 버튼 컴포넌트 테스트 코드
```javascript
import { mount } from "@cypress/react";

import Button from "./Button";

describe("Button", () => {
  it("Given Button, When Click, Then call onClic", () => {
    const onClick = cy.stub().as("clickHandler");
    mount(<Button onClick={onClick}>Test button</Button>);

    cy.get("button").contains("Test button").click();

    cy.get("@clickHandler").should("have.been.calledOnce");
  });
});
```
1. 컴포넌트 셋업  
   cypress에서 제공하는 mount 함수로 컴포넌트 마운트 (인자값으로 ReactNode 전달)
2. 렌더링 결과 확인  
   DOM Element에 접근하기 위해서 단 하나의 메서드만을 사용하면 됨  
   cy.get()은 jQuery의 DOM 쿼리 방식을 그대로 사용함  
   또한 체이닝을 할 수 있기에 contains 메서드로 특정 텍스트를 가지고 있는 button을 필터링하여 얻을 수 있음  
   contains 다음에 should 메소드로 체이닝하면 단언을 작성할 수 있음  
   `cy.get("button").contains("Test button").should("exist");`   
   위처럼 작성하면 “Test button” 텍스트를 가진 button 태그가 존재하는지를 확인하는 테스트가 됨
   
   단언을 should와 and로 작성할 수 있는데,    
   and는 should 뒤에 추가적인 단언을 체이닝으로 작성하고 싶을 때 사용함    
   `cy.get("input").should("be.focused").and("have.value", "Hello");`
3. UI로 행동 발생
   contains 다음 체이닝으로 단언을 쓰지 않고 click 메소드로 click 이벤트를 발생시킴    
   (이렇게 해도 contains에서 어떤 엘리먼트도 얻지 못하면 테스트는 fail 하게 됨)

### Jest + React-testing-library vs Cypress 인지도 비교
[npm trends](https://npmtrends.com/@testing-library/react-vs-cypress)

### References
* [https://ko.reactjs.org/docs/testing.html](https://ko.reactjs.org/docs/testing.html)
* [https://create-react-app.dev/docs/running-tests/](https://create-react-app.dev/docs/running-tests/)
* [https://jestjs.io/blog/2016/09/01/jest-15](https://jestjs.io/blog/2016/09/01/jest-15)
* [https://learn-react-test.vlpt.us/](https://learn-react-test.vlpt.us/#/)
* [https://pathas.tistory.com/231](https://pathas.tistory.com/231)
* [https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1](https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1)
* [https://www.testim.io/blog/react-testing-library-vs-enzyme/](https://www.testim.io/blog/react-testing-library-vs-enzyme/)
* [https://articles.wesionary.team/react-testing-library-vs-enzyme-afd29db380ac](https://articles.wesionary.team/react-testing-library-vs-enzyme-afd29db380ac)
* [https://www.daleseo.com/react-testing-library/](https://www.daleseo.com/react-testing-library/)
