---
title : 자바스크립트 원시 타입  
date : 2021.08.20  
---


# 자바스크립트 원시 타입

## 자바스크립트 타입
자바스크립트의 타입은 원시 데이터 타입과 객체 타입으로 나눠짐

## 원시 데이터 타입
* 6가지 종류의 원시 데이터 타입 존재
* 객체가 아닌 값이며 값 자체로 저장
* 원시 타입에는 어떠한 메소드도 붙어있지 않으며 불변성을 갖음 (자신을 변경할 수 있는 메소드가 없음)
* 변수에 원시타입 재할당은 값이 변경되는 것이 아닌 새로운 원시타입의 값이 들어가는 개념 (값 자체는 절대 변경 X)

### 원시 데이터 타입의 종류
* Booleans (true/false)
* null
* undefined
* number (64-bit float. 정수타입은 존재하지 X)
* string
* symbol (ES6)

### null / undefined / NaN 차이점
* null : 값이 존재하지 않음으로 정의됨 (<- 이 자체가 값)  
* undefined : 아예 정의되지 않음  
* NaN : Not a Number  

### Symbol
* 주로 이름 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용됨  
* Symbol() 함수로 생성. Symbol() 함수는 호출될 때마다 Symbol 값 생성함  
  (생성된 Symbol은 객체 아닌 원시 타입 값)
```js
let mySymbol = Symbol(); // 래퍼 객체 생성자 함수와 달리 new 연산자 사용하지 않음
console.log(mySymbol); //Symbol()
console.log(typeof mySymbol); //symbol

//문자열(Symbol에 대한 설명)을 인수로 전달할 수 있음. 심볼 생성에 전혀 영향 주지 않고 디버깅 용도로만 사용
let symbolWithDesc = Symbol('ungmo2'); 
console.log(symbolWithDesc); //Symbol(ungmo2)
console.log(symbolWithDesc === Symbol('ungmo2')); //false
```

## Object
* ECMAScript 표준은 원시타입에 더해 Object를 정의함
* 키/값 저장소
* 원시 데이터 타입이 아닌 것들 = object (ex. 함수, 배열 등)
* 원시 타입은 값(value)으로 저장되지만, 객체는 참조(reference)로 저장됨
```js
console.log("dog" === "dog"); //true
console.log(14 === 14); //true
console.log({} === {}); //false
console.log([] === []); //false
console.log(function(){}) === (function(){}); //false
// 값은 같지만 서로 다른 곳 참조하기 때문
```

### 함수
* 특별한 프로퍼티들을 가진 새로운 형태의 객체
* 일반적인 객체와 같이 함수에 새로운 프로퍼티 추가 가능
* 객체의 특성을 만족하기 때문에 함수는 1급 객체
    1. 다른 함수의 인자값으로 넘겨질 수 있다.
    2. 변수나 데이터에 할당이 가능하다.
    3. 객체의 리턴 값으로 리턴 가능하다.

### 메소드
함수와 같이 객체의 프로퍼티

### 생성자 함수
* 생성하는 함수를 객체 그 자체로서 리턴 값으로 반환하는 함수
* `new` 키워드 붙은 이후에 생성자 함수로 사용됨, 객체 자체를 리턴  
  (함수의 역할을 한다기보단 새로운 함수 오브젝트를 반환할 뿐)
* 위의 특징을 제외하면 일반 함수와 다를 바 없음 (어떤 함수든 생성자 함수 될 수 있음)
* 생성자 함수는 object 리턴 -> 새로운 프로퍼티 할당을 위해 this를 함수 내부 안에서 사용 가능
```js
const Foo = function(){
    this.bar = 'baz'; // this는 실행 컨텍스트와 응답을 주고 받음
};
Foo(); // 전역 컨텍스트에서 실행하면 전역 컨텍스트 시점의 this인 window 객체에 bar 프로퍼티 추가됨
console.log(window.bar); //baz

const qux = new Foo(); // new 없이 실행 시 일반 함수처럼 동작
qux; // {bar: 'baz'} : 새로운 오브젝트 생성
console.log(qux instanceof Foo); //true
console.log(qux instanceof Object); //true

// 원시 타입의 'dog' 값을 갖는게 아니라 생성자 함수로 생성된 String 객체를 가지게 됨
const pet = new String('dog'); 
```

### 래퍼 오브젝트 (Wrapper Object)
* 포장 오브젝트 (오브젝트 래퍼라는 이름으로도 불림)
* String, Number, Boolean, Function 같은 원시 타입을 new 키워드로 생성하면  
  원시타입에 대한 레퍼 오브젝트가 생성됨
* String : 문자열이 인자로 들어왔을 때 원시 문자열을 생성하는 전역 함수 (인자로 들어온 값을 문자열로 바꾸려 함)
```js
String(123); //"123"
String(true); //"true"
String(null); //"null"
String(undefined); //"undefined"
String(); //""
String("dog") === 'dog'; //true
typeof String("dog"); //string

// new 키워드 붙여 사용
// 래퍼 오브젝트라는 새로운 object를 생성함 === {0:'d', 1:'o', 2:'g', length:3}
const pet = new String('dog'); 
typeof pet; //object
pet === 'dog'; //false
```

### 오토박싱(Auto-Boxing)
* 원시타입 문자열 생성자와 일반 오브젝트 생성자 둘 다 String 함수를 이용
* 일반적으로 원시타입은 메소드를 가질 수 없지만 원시문자열 타입에서 .constructor 를 이용해  
  생성자 프로퍼티 확인도 가능함 (해당 과정에서 오토박싱이 일어나기 때문)    
* JS 내부에 존재하는 오토박싱 기능 때문에 몇몇 원시타입(Strings, Numbers, Booleans)는 객체처럼 동작함
---
* 오토박싱 : 특정한 원시타입에서 프로퍼티나 메소드를 호출하려 할 때 JS는 처음으로 이것을 임시 래퍼 오브젝트로 바꾼 뒤 프로퍼티나 메소드에 접근하려 함 (원본에는 아무런 영향을 미치지 않음)
* 원시 타입은 프로퍼티를 가질 수 없는데도 원시 타입에 프로퍼티를 할당하려 할 때 경고나 에러메세지가 나지 않는 이유임 (프로퍼티를 할당할 때 잠시 원시타입을 이용한 레퍼 오브젝트를 만들고 거기에 할당하기 때문)
* undefined 나 null 처럼 래퍼 오브젝트가 없는 원시타입에 프로퍼티를 할당하려고 하면 에러메세지 노출됨
```js
const pet = new String('dog');
pet.constructor === String; //true
String('dog').constructor === String; //true


const foo = 'bar';
foo.length; //3 
// length 프로퍼티에 접근하기 위해 JS는 foo를 오토박싱하고 래퍼 오브젝트에 넣음 
// (foo 원시타입 변수에는 전혀 영향을 미치지 않음. foo는 그냥 원시 타입 문자열)
foo === 'bar'; //true
```
