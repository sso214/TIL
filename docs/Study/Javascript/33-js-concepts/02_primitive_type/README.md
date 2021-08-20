---
title : 자바스크립트 원시 타입  
date : 2021.08.20  
---


# 자바스크립트 원시 타입

## 자바스크립트 타입
자바스크립트는 원시타입과 객체 타입으로 나뉜다.  

## 원시 데이터 타입
자바스립트에서 객체가 아닌 값들이며 값 자체로 저장된 것.  
원시타입에는 어떠한 메소드도 붙어있지 않으며 불변성을 갖음(자신을 변경할 수 있는 메소드가 없음).  
변수에 원시타입 재할당은 값이 변경되는 것이 아니라 새로운 원시타입의 값이 들어가는 개념. 값 자체는 절대 변경되지 않음.  

1. Booleans (true/false)
2. null
3. undefined
4. number (64-bit float. 정수타입은 존재하지 X)
5. string
6. symbol (ES6) : 주로 이름 충돌 위험 없는 유일한 객체의 property key를 만들기 위해 사용됨
```js
//symbol
let hiSymbol = Symbol(); //생성자 함수와 달리 new 연산자 사용하지 않음
console.log(hiSymbol); //Symbol()
console.log(typeof hiSymbol); //symbol
// Symbol('텍스트'); 들어가는 문자열은 생성에 아무런 영향 주지 않으며, 생성된 Symbol에 대한 설명. 디버깅 용도

//symbol 사용
const obj = {};
const mySymbol = Symbol('hello');
obj[mySymbol] = 123;
console.log(obj); // { [Symbol(mySymbol)]: 123 }
console.log(obj[mySymbol]); //123
// Symbol 값은 유일한 값이므로 symbol 값을 키로 갖는 프로퍼티는 다른 프로퍼티들과 충돌하지 않음
```

### null / undefined / NaN 차이점
* null : 값이 존재하지 않음으로 정의됨 <- 저 자체가 값  
* undefined : 아예 정의되지 않음  
* NaN : Not a Number  

### Type
```js
typeof 'hello'
```

## Object
자바스크립트에서 Primitive Type이 아닌 것은 모두 Object 객체 타입이다.  
ex) 함수, 배열 등  
```js
const object =  {key: 'value'}
```

<br/>

원시타입은 값(value)이 저장되지만 object는 참조(reference)로 저장됨
```js
console.log("dog" === "dog"); //true
console.log(14 === 14); //true
console.log({} === {}); //false
console.log([] === []); //false
console.log(function(){}) === (function(){}); //false
// 값은 같지만 서로 다른 곳 참조하기 때문
```

## 함수
자바스크립트 객체의 특성을 만족하기 떄문에 함수는 1급 객체.  
1. 다른 함수의 인자값으로 넘겨질 수 있다.  
2. 변수나 데이터에 할당이 가능하다.  
3. 객체의 리턴 값으로 리턴 가능하다. 

## 메소드
함수와 같이 객체의 프로퍼티

## 생성자 함수
생성자 함수란 리턴 값으로 생성하는 함수를 객체 자체를 반환하는 함수.  
어떤 함수든 생성자 함수가 될 수 있음.  
생성자 함수는 object를 리턴하게 됨으로 새로운 프로퍼티들을 할당하기 위해 this를 함수의 몸통 안에서 사용 가능함.  
```js
const foo = function (){};
const bar = new foo();
bar;
```




> ### Reference
> * [7번째 타입 심볼(Symbol)](https://poiemaweb.com/es6-symbol)
