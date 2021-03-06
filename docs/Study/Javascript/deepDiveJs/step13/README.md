---
title : 13장. 스코프   
date : 2022.05.23
---

# 13장. 스코프

## 1. 스코프란?
* 자바스크립트를 포함한 모든 프로그래밍 언어의 기본적이며 중요한 개념
* **식별자가 유효한 범위**를 말함  
* 모든 식별자(변수명, 함수명, 클래스명 등)는 자신이 **선언된 위치**에 의해 다른 코드가  
  식별자 자신을 **참조할 수 있는 유효 범위**가 결정됨 (=스코프)
  ```js
  var var1 = 1; //코드의 가장 바깥 영역에서 선언
  
  if(true) {
    var var2 = 2; //코드 블록 내에서 선언
    if (true) {
        var var3 =3; //중첩된 코드 블록 내에서 선언
    }
  }
  
  function foo(){
    var var4 = 4; //함수 내에서 선언

    function bar(){
        var var5 = 5; //중첩된 함수 내에서 선언
    }
  }
  console.log(var1); //1
  console.log(var2); //2
  console.log(var3); //3
  console.log(var4); //ReferenceError
  console.log(var5); //ReferenceError
  ```
* 스코프는 **식별자를 검색할 때 사용하는 규칙**  
  이름이 같은 식별자들이 있을 경우 자바스크립트 엔진은 어떤 식별자를 참조해야할지 결정해야 함 (=식별자 결정)  
  자바스크립트 엔진은 코드 실행 시 문맥을 고려하기 때문에 동일한 코드도 코드가 어디서 실행되며  
  주변에 어떤 코드가 있는지에 따라 다른 결과를 만들어 냄
  ```js
  var x = 'global'; //어디서든 참조 가능
  
  function foo() {
    var x = 'local';
    console.log(x); //함수 내부에서만 참조 가능
  }
  foo();
  //두 변수는 식별자 이름이 동일하지만 스코프가 다른 별개의 변수
  console.log(x);
  ```
* 스코프는 **네임스페이스** (=이름 공간)   
  식별자는 값을 구분할 수 있어야 하므로 유일해야 함. 따라 식별자명은 중복되면 안됨.  
  하지만 전체 코드를 통틀어 변수명을 중복시키지 않아아 한다면 변수명을 만드는 것이 무척이나 번거로울 것.  
  프로그래밍 언어에서는 스코프를 통해 식별자인 변수명의 충돌을 방지해 같은 이름의 변수를 사용할 수 있게 함  
  스코프 내에서 식별자는 유일해야 하지만 다른 스코프에는 같은 이름의 식별자를 사용할 수 있음

> 렉시컬 환경 = '코드가 어디서 실행되며 주변에 어떤 코드가 있는지'  
> 즉, 코드의 문맥은 렉시컬 환경으로 이루어짐. 이를 구현한 것이 실행 컨텍스트.   
> 모든 코드는 실행 컨텍스트에서 평가되고 실행됨. 따라 스코프는 실행 컨텍스트와 깊은 관련이 있음

#### <var 키워드로 선언한 변수의 중복 선언>
var키워드로 선언한 변수는 같은 스코프 내에 중복 선언이 허용됨.   
이는 의도치 않게 변수값이 재할당되어 변경되는 부작용을 발생시킴   
반면 let, const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않음
```js
function foo(){
    var x = 1;
    var x = 2; //자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작함
    console.log(x); //2
}
foo();

function bar(){
    let x = 1;
    let x = 2; //SyntaxError
}
bar();
```


## 2. 스코프의 종류
* 스코프는 전역과 지역으로 구분
* 변수는 자신이 선언된 위치(전역/지역)에 의해 스코프가 결정됨 
  * 전역에서 선언된 변수 = 전역 스코프를 갖는 전역 변수  
  * 지역에서 선언된 변수 = 지역 스코프를 갖는 지역 변수

|구분|설명|스코프|변수|
|:-|:-|:-|:-|
|전역|코드의 가장 바깥 영역|전역 스코프|전역 변수|
|지역|함수 몸체 내부|지역 스코프|지역 변수|

```js
var x = "global x";
var y = "global y";

function outer() {
    //outer 지역 스코프 시작
    var z = "outer's local z";

    console.log(x); //"global x"
    console.log(y); //"global y"
    console.log(z); //"outer's local z"

    function inner() {
        //inner 지역 스코프 시작
        var x = "inner's local x";

        // 자바스크립트 엔진이 스코프 체인을 통해 참조할 변수를 검색함
        console.log(x); //"inner's local x"
        console.log(y); //"global y"
        console.log(z); //"outer's local z"
        //inner 지역 스코프 끝s
    }

    inner();
    //outer 지역 스코프 끝
}

outer();

console.log(x); //"global x"
console.log(z); //ReferenceError
```

### 2-1. 전역과 전역 스코프
* 전역 : 코드의 가장 바깥 영역
* 전역은 전역 스코프를 만듬
* 전역에 변수 선언 시 전역 스코프를 갖는 전역 변수가 됨
* 전역 변수는 어디서든 참조 가능함

### 2-2. 지역과 지역 스코프
* 지역 : 함수 몸체 내부
* 지역은 지역 스코프를 만듬
* 지역에 변수 선언 시 지역 스코프를 갖는 지역 변수가 됨
* 지역 변수는 자신이 선언된 지역과 하위 지역(중첩 함수)에서만 참조 가능함


## 3. 스코프 체인
* 함수는 중첩이 가능하며 함수의 지역 스코프도 중첩될 수 있음  
  (즉, **스코프가 함수의 중첩에 의해 계층적 구조를 갖는다**는 것을 의미)  
  
  중첩 함수의 지역 스코프는 중첩 함수를 포함하는 외부 함수의 지역 스코프와 계층적 구조를 가짐  
  이때 외부 함수의 지역 스코프를 중첩 함수의 상위 스코프라고 함  
  (모든 지역 스코프의 최상위 스코프 = 전역 스코프)  
  
  ex.  
  inner 함수 지역 스코프의 상위 스코프 : outer 함수 지역 스코프.  
  outer 함수 지역 스코프의 상위 스코프 : 전역 스코프

* 모든 스코프는 하나의 계층적 구조로 연결되며,  
  이렇게 **스코프가 계층적으로 연결된 것을 스코프 체인**이라고 함     
  - 전역 스코프 `{x: "global x", y: "global y", outer: <function object>}` 
  - outer 지역 스코프 `{z: "outer's local z", inner: <function object>}`  
  - inner 지역 스코프 `{x: "inner's local x"}`

* 변수 참조 시 자바스크립트 엔진은 **스코프 체인을 통해**     
  **변수를 참조하는 코드의 스코프에서 -> 상위 스코프 방향으로 이동**하며 선언된 변수를 **검색**함   
  (이 때문에 상위 스코프에서 선언한 변수를 하위 스코프에서도 참조 가능한 것)

* 스코프 체인은 물리적인 실체로 존재함  
  자바스크립트 엔진은 코드(전역 코드와 함수 코드)를 실행하기에 앞서  
  스코프 체인 블록 형태와 유사한 자료구조인 렉시컬 환경을 실제로 생성함  
  1. 변수 선언 실행    
  2. 변수 식별자가 이 자료구조(렉시컬 환경)에 키로 등록됨  
  3. 변수 할당 일어나면 이 자료구조의 변수 식별자에 해당하는 값을 변경함  
    
  변수의 검색도 이 자료구조 상에서 이루어짐

> 스코프 체인은 실행 컨텍스트의 렉시컬 환경을 단방향으로 연결한 것  
> 전역 렉시컬 환경 : 코드가 로드되면 곧바로 생성됨     
> 함수의 렉시컬 환경 : 함수가 호출되면 곧바로 생성됨


### 3-1. 스코프 체인에 의한 변수 검색
* 자바스크립트 엔진은 스코프 체인을 따라 변수를 참조하는 코드의 스코프에서    
  상위 스코프 방향으로 이동하며 선언된 변수를 검색함
* 절대 하위 스코프로 내려가면서 식별자를 검색하는 일은 없음  
  (상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조 가능하지만  
  하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다는 것을 의미)
* 스코프 체인으로 연결된 스코프의 계층적 구조는 부자 관계로 이뤄진 상속과 유사함

#### <자바스크립트 엔진이 스코프 체인을 통해 변수를 검색하는 과정>
1. x 변수를 참조하는 코드의 스코프인 inner 함수의 지역 스코프에서 x 변수가 선언되었는지 검색   
   -> inner 함수 내에는 선언된 x 변수가 존재하므로 검색된 변수를 참조하고 검색 종료
2. y 변수를 참조하는 코드의 스코프인 inner 함수의 지역 스코프에서 y 변수가 선언되었는지 검색  
   -> inner 함수 내에는 선언된 y 변수가 존재하지 않으므로 상위 스코프인 outer 함수의 지역 스코프로 이동  
   -> outer 함수 내에도 선언된 y 변수가 존재하지 않으므로 또 다시 상위 스코프인 전역 스코프로 이동  
   -> 전역 스코프에는 선언된 y 변수가 존재하므로 검색된 변수를 참조하고 검색 종료
3. z 변수를 참조하는 코드의 스코프인 inner 함수의 지역 스코프에서 z 변수가 선언되었는지 검색  
   -> inner 함수 내에는 선언된 z 변수가 존재하지 않으므로 상위 스코프인 outer 함수의 지역 스코프로 이동  
   -> outer 함수 내에는 선언된 z 변수가 존재하므로 검색된 변수를 참조하고 검색 종료

### 3-2. 스코프 체인에 의한 함수 검색
```js
function foo(){ //전역에서 정의된 함수
    console.log('global function foo');;
}

function bar(){
    function foo(){ //함수 내부에서 정의된 함수
        console.log('local function foo');
    }
    foo();
}

bar();
```
함수 선언문으로 함수 정의 시 런타임 이전에 함수 객체가 먼저 생성되며,  
자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 선언하고 생성된 함수 객체를 할당함  
따라 위 예제의 모든 함수는 함수 이름과 동일한 이름의 식별자에 할당됨.

foo 함수 호출 시 자바스크립트 엔진은 함수 호출을 위해 먼저 함수를 가리키는 식별자 foo를 검색함  
이처럼 함수도 식별자에 할당되기 때문에 스코프를 가짐.  

사실 함수는 식별자에 함수 객체가 할당된 것 외에 일반 변수와 다를 바 없음.  
따라 스코프를 '변수를 검색할 때 사용하는 규칙' 이라고 표현하기보다  
'식별자를 검색하는 규칙' 이라고 표현하는게 좀 더 적합


## 4. 함수 레벨 스코프  
* 블록 레벨 스코프 :  
  모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프를 만듬  
  대부분의 프로그래밍 언어는 블록 레벨 스코프를 사용
* 함수 레벨 스코프 :   
  코드 블록이 아닌 오로지 함수의 코드 블록(함수 몸체)에 의해서만 지역 스코프가 생성됨   
  var 키워드로 선언된 변수는 함수 레벨 스코프를 가지지만  
  ES6에서 도입된 let, const 키워드는 블록 레벨 스코프를 지원함   
  
  함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 하더라도 모두 전역 변수.  
  -> 의도치 않게 값이 변경되는 부작용을 발생시킴
  
```js
var x = 1;

if (true) {
  //블록 내에서 선언되었지만 var 키워드로 선언된 변수는 함수 레벨 스코프만 인정하기 때문에 전역 변수. 
  //이미 선언된 전역 변수와 중복 선언되어 의도치 않게 전역 변수의 값이 재할당 됨
  var x = 10;
}
console.log(x); //10
```


## 5. 렉시컬 스코프

* 동적 스코프  
  함수를 **어디서 호출했는지**에 따라 함수의 상위 스코프를 결정함.  
  함수를 정의하는 시점에는 함수가 어디서 호출될지 알 수 없고,  
  함수가 호출되는 시점에 동적으로 상위 스코프를 결정해야 하기 때문에 동적 스코프라고 부름
  
* 정적 스코프 (=렉시컬 스코프)  
  함수를 **어디서 정의했는지**에 따라 함수의 상위 스코프를 결정함.  
  동적 스코프 방식처럼 상위 스코프가 동적으로 변하지 않고  
  함수 정의가 평가되는 시점에 상위 스코프가 정적으로 결정되기 떄문에 정적 스코프라고 부름

---
자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따름.  
따라 함수가 호출된 위치는 상위 스코프 결정에 아무 영향도 주지 않으며  
함수를 어디서 정의했는지에 따라 상위 스코프를 결정함  
즉, **함수의 상위 스코프는 언제나 자신이 정의된 스코프**  

이처럼 함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정됨.  
함수 정의(함수 선언문 또는 함수 표현식)가 실행되어 생성된 함수 객체는 이렇게 결정된 상위 스코프를 기억함  
함수가 호출될 때마다 함수의 상위 스코프를 참조할 필요가 있기 때문  

또한 렉시컬 스코프는 클로저와 깊은 관계가 있음

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() { 
  console.log(x);
}

foo(); //1
bar(); //1
```

위 예제에서 bar 함수는 전역에서 정의된 함수.   
함수 선언문으로 정의된 bar 함수는 전역 코드가 실행되기 전에 먼저 평가되어 함수 객체를 생성함  
이때 생성된 bar 함수 객체는 자신이 정의된 스코프(전역 스코프)를 기억함  
그리고 bar 함수가 호출되면 호출된 곳이 어딘지에 상관없이 자신이 기억하고 있는 전역 스코프를 상위 스코프로 사용함  








 
