---
title : 21장. 빌트인 객체  
date : 2022.06.02
---

# 21장. 빌트인 객체

## 1. 자바스크립트 객체의 분류
자바스크립트 객체는 크게 3개의 객체로 분류할 수 있음  
* 표준 빌트인 객체  
  * ECMAScript 사양에 정의된 객체. 자바스크립트 실행 환경과 관계없이 언제나 사용 가능  
  * 애플리케이션 전역의 공통 기능을 제공함  
  * 전역 객체의 프로퍼티로서 제공됨. 따라 별도의 선언 없이 전역 변수처럼 언제나 참조 가능
* 호스트 객체
  * ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경에서 추가로 제공하는 객체
  * 브라우저 환경 : DOM, BOM, Web Storage와 같은 클라이언트 사이드 Web API를 호스트 객체로 제공.  
    Node.js 환경 : Node.js 고유의 API를 호스트 객체로 제공함
* 사용자 정의 객체
  * 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체


## 2. 표준 빌트인 객체
* 자바스크립트는 40여개의 표준 빌트인 객체를 제공함  
  (Object.String, Array, Map/Set, Function, JSON, Error 등)
* Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수  
* 생성자 함수 객체인 표준 빌트인 객체 : 프로토타입 메서드와 정적 메서드를 제공   
  생성자 함수가 아닌 표준 빌트인 객체 : 정적 메서드만 제공

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은   
표준 빌트인 객체의 prototype 프로퍼티에 바인딩 된 객체
```js
//String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Leo');
//Stinrg 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype
console.log(Object.getPrototypeOf(strObj) === String.prototype); //true
```

* 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공  
* 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공함  
```js
//Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); //Number {1.5}

//toFixed는 Number.prototype의 프로토타입 메서드
console.log(numObj.toFixed()); //2

//isInteger는 Number의 정적 메서드
console.log(Number.isInteger(0.5)); //false
```


## 3. 원시값과 래퍼 객체

### 원시값이 있는데도 String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유?
원시 값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없는데도 원시값인 문자열이 마치 객체처럼 동작함  
이는 원시값의 경우 마치 객체처럼 마침표 표기법(or 대괄호 표기법)으로 접근 시 자바스크립트 엔진이   
일시적으로 원시값을 연관된 객체로 변환해주기 때문  

즉, 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성해  
생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌림  

이처럼 **문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체**라고 함
```js
const str = 'hello';

//원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작함
console.log(str.length);//5
console.log(str.toUpperCase());//HELLO
```

ex)
```js
//식별자 str은 문자열을 값으로 가짐
const str = 'hello';

//식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킴
//식별자 str의 값('hello')은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당됨
//래퍼 객체에 name 프로퍼티가 동적 추가됨
str.name = 'Leo';

//식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 가짐
//이때 위에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 됨

//식별자 str은 새롭게 암묵적으로 생성된 래퍼 객체를 가리킴 (위에서 생성된 래퍼 객체와는 다른)
//새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않음
console.log(str.name); //undefined

//식별자 str은 다시 원래 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 가짐
//이때 위에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 됨
console.log(typeof str, str); //string hello
```
* 숫자 값에 대해 마침표 표기법으로 접근할 때도 마찬가지.  
* 불리언 값도 문자열/숫자와 같지만 불리언 값으로 메서드 호출하는 경우는 없으므로 그다지 유용하지 않음  
* ES6에서 새롭게 도입된 원시값인 심벌도 래퍼 객체를 생성함   
  심벌은 일반적인 원시값과는 달리 리터럴 표기법으로 생성 불가능하고 Symbol 함수를 통해 생성해야 하므로  
  다른 원시값과는 차이가 있음  
* 이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용 가능하며,  
  표준 빌트인 객체인 String, Number, Boolean, Symbol의 프로토타입 메서드 또는 프로퍼티를 참조 가능함  
  따라 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출해   
  문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지도 않음   
  (Symbol은 생성자 함수가 아니므로 이 논의에서는 제외)
* 문자열, 숫자, 불리언, 심벌 이외의 원시 값(=null, undefined)는 래퍼 객체를 생성하지 않음  
  따라 null/undefined 값을 객체처럼 사용하면 에러 발생함


## 4. 전역 객체
* 코드 실행 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체  
* 계층 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체  
  * 프로토타입 상속 관계에서 최상위 객체라는 의미 아님     
  * 전역 객체는 어떤 객체의 프로퍼티도 아니며 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 의미
* 자바스크립트 환경에 따라 지칭하는 이름이 다름  
  * 브라우저 환경 : window(또는 self, this, frames)
  * Node.js 환경 : global
* 표준 빌트인 객체와 환경에 따른 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가짐

#### globalThis
* ES11에서 도입
* 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자   
* 표준 사양이므로 ECMAScript 표준 사양을 준수하는 모든 환경에서 사용 가능함  
```js
//브라우저 환경
globalThis === this //true
globalThis === window //true
globalThis === self //true
globalThis === frames //true

//Node.js 환경
globalThis === this //true
globalThis === global //true
```

#### 전역 객체의 특징
* 개발자가 의도적으로 생성 불가능함. (전역 객체를 생성할 수 있는 생성자 함수 제공되지 않음)  
* 전여 깩체의 프로퍼티 참조 시 window(or global)을 생략 가능

```js
//문자열 'F'를 16진수로 해석하여 10진수로 변환해 반환함  
window.parseInt('F', 16); //15
//window/.parseInt는 parseInt로 호출 가능
parseInt('F', 16); //15

window.parseInt === parseInt; //true 

//var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); //1

//선언하지 않은 변수에 값을 암묵적 전역. bar는 전역 변수가 아니라 전역 객체의 프로퍼티
bar = 2;
console.log(window.bar); //2

//전역 함수
function baz(){return 3;}
console.log(window.baz()); //3

let poo = 123;
console.log(window.poo); //undefined
```
* 전역 객체는 표준 빌트인 객체를 프로퍼티로 가지고 있음
* 자바스크립트 실행환경에 따라 추가적으로 프로퍼티와 메서드를 가짐  
  * 브라우저 환경 : DOM, Canvas, fetch, SVG 같은 클라이언트 사이드 Web API를 호스트 객체로 제공
  * Node.js 환경 : Node.js 고유의 API를 호스트 객체로 제공
* var 키워드로 선언한 전역 변수, 암묵적 전역, 전역 함수는 전역 객체의 프로퍼티가 됨
* let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티 아님.   
  보이지 않는 개념적인 블록 (전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 됨  
* 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유함  
  여러 개의 script 코드를 통해 코드를 분리해도 하나의 전역 객체 window를 공유하는 것은 변함 없음  
  (분리되어 있는 자바스크립트 코드가 하나의 전역을 공유한다는 의미)
* 전역 객체는 몇 가지 프로퍼티와 메서드를 가짐  
  전역 객체의 프로퍼티와 메서드는 전역 객체를 가리키는 식별자(window / global)을 생략해 참조/호출 가능하므로  
  전역 변수와 전역 함수처럼 사용 가능함

### 4-1. 빌트인 전역 프로퍼티
* 전역 객체의 프로퍼티를 의미함
* 주로 애플리케이션 전역에서 사용하는 값 제공

#### Infinity
* 무한다래를 나타내는 숫자값 Infinity를 갖음
```js
//전역 프로퍼티는 window를 생략하고 참조 가능
console.log(window.Infinity === Infinity); //true

//양의 무한대
console.log(3/0); //Infinity
//음의 무한대
console.log(-3/0); //-Infinity
//Infinity는 숫자값
console.log(typeof Infinity); //number
```

#### NaN
* 숫자가 아님을 나타내는 숫자값 NaN을 가짐
* NaN === Number.NaN 프로퍼티
```js
console.log(window.NaN); //NaN

console.log(Number('xyz')); //NaN
console.log(1 * 'string'); //NaN
console.log(typeof NaN); //number
```

#### undefined
* 원시 타입 undefined를 값으로 가짐
```js
console.log(window.undefined); //undefined

var foo;
console.log(foo); //undefined
console.log(typeof undefined); //undefined
```


### 4-2. 빌트인 전역 함수
* 전역 객체의 메서드
* 애플리케이션 전역에서 호출 가능한 빌트인 함수

#### eval
* 자바스크립트 코드를 나타내는 문자열을 인수로 전달받음
* 전달받은 문자열 코드가 표현식이라면 eval 함수는 문자열 코드를 런타임에 평가해 값을 생성
* 전달받은 인수가 표현식이 아닌 문이라면 eval 함수는 문자열 코드를 런타임에 실행
* 인수로 전달받은 문자열 코드가 여러 개의 문으로 이루어져 있는 경우 모든 문 실행 후 마지막 결과 값 반환
* eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정함
```js
//주어진 문자열 코드를 런타임에 평가 또는 실행
//@param {string} code - 코드를 나타내는 문자열
//@returns {*} 문자열 코드를 평가/실행한 결과값
//eval(code)

//표현식인 문
eval('1 + 2;'); //3

//표현식이 아닌 문
eval('var x = 5;'); //undefined
//eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언됨
console.log(x); //5

//객체 리터럴은 반드시 괄호로 둘러쌈
const o = eval('({a : 1})');
console.log(o); //{a : 1}

//함수 리터럴은 반드시 괄호로 둘러쌈
const f = eval('(function(){return 1;})');
console.log(f()); //1

//인수로 전달받은 문자열 코드가 여러개의 문일 때 모든 문을 실행 후 마지막 결과 값을 반환함 
eval('1 + 2; 3 + 4;'); //7

const x = 1;
function foo() {
  //eval 함수는 런타임에 foo 함수의 스코프를 동적으로 수정함
  eval('var x = 2;');
  console.log(x); //2
}
foo();
console.log(x); //1

```


#### isFinite

#### isNaN

#### parseFloat

#### parseInt

#### encodeURI / decodeURI

#### encodeURIComponent / decodeURIComponent



### 4-3. 암묵적 전역
```js
var x = 10; //전역 변수
function foo() {
  //선언하지 않은 식별자에 값을 할당
  y = 20; //window.y = 20;
}
foo();

//선언하지 않은 식별자 y를 전역에서 참조 가능
console.log(x + y); //30
```
* 선언하지 않은 식별자 y는 마치 선언된 전역 변수처럼 동작함.   
  이는 선언하지 않은 식별자에 값을 할당 시 전역 객체의 프로퍼티가 되기 때문 
* foo 함수 호출 시 자바스크립트 엔진은 
