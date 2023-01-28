---
title : javascript - this   
date : 2021.08.23  
---

# this
2021.08.23  

* 엄격 모드와 비엄격 모드에서 일부 차이 존재
* 대부분 함수 호출 방법에 따라 this의 값 결정됨
* ES5에서는 함수 호출방법과 상관없이 this값을 설정할 수 있는 bind 메서드 도입.   
  ES6에서는 스스로의 바인딩을 제공하지 않는 화살표 함수 추가
* 실행 컨텍스트의 프로퍼티는 비엄격 모드에서 항상 객체 참조. 엄격 모드에서는 어떠한 값이든 될 수 있음
```js
const test = {
    props : 25,
    func: function (){
        return this.props
    }
};
console.log(test.func()); //25
```


## 전역 문맥에서의 this
* 엄격 모드 여부 상관없이 전역 객체 참조
* 브라우저에서는 window 객체가 전역 객체
```js
console.log(this === 'window'); //true
a = 25;
console.log(window.a); //25
this.b = 'leo';
console.log(window.b); //leo
console.log(b); //leo
```


## 함수 문맥에서의 this
* 함수 내부의 this 값은 함수 호출 방법에 의해 결정

### 단순 호출
* this의 값을 다른 문맥으로 넘기려면 call(), apply() 사용 필요
* 비엄격 모드에서 this로 전달된 값이 객체가 아닌 경우 call, apply는 해당 값을 객체로 변환하는 시도를 함
```js
// 엄격모드 X
function f1(){
    return this;
}
// browser
f1() === window; //true
// node.js
f1() === global; //true

// 엄격모드인 경우
// 실행 문맥에 진입하며 설정되는 값 유지
function f2(){
    "use strict"; // 엄격 모드 참고
    return this;
}
f2() === undefined; // true
```



<br/>
<br/>
<br/>

> ### Reference
> * [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

### bind 메서드
* ES5 도입
* func.bind(someObject) 호출 -> func과 같은 코드와 범위를 가졌지만 this는 원본 함수를 가진 새로운 함수 생성  
  새 함수의 this는 호출 방식과 상관없이 영구적으로 bind()의 첫번째 매개변수로 고정
```js
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind는 한 번만 동작
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```


### 화살표 함수
* 화살표 함수에서의 this는 자신을 감싼 정적 범위
* 화살표 함수를 call(), bind(), apply()를 사용해 호출 시 this의 값을 정해주더라도 무시. (매개변수는 가능하지만 첫번째 매개변수는 null 지정해야함)
```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true

// 객체로서 메서드 호출
var obj = {func: foo};
console.log(obj.func() === globalObject); // true

// call을 사용한 this 설정 시도
console.log(foo.call(obj) === globalObject); // true

// bind를 사용한 this 설정 시도
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```


### 객체의 메서드
* 객체의 메서드로 함수 호출 시 this는 그 객체가 됨
* 위의 규칙은 함수 정의 방법이나 위치에 구분없이 공통적으로 나타남
```js
var o = {
    prop: 37,
    f:function(){
        return this.prop;
    }
};
console.log(o.f()); //37

var o = {prop:37};
function independent() {
    return this.prop;
}
o.f = independent;
console.log(o.f()); //37

o.b = {g:independent, prop:25};
console.log(o.b.g()); //25
```

#### 객체 프로토타입 체인에서의 this
* 객체 프로토타입 체인에 정의된 메서드도 같은 개념.
* 메서드가 객체의 프로토타입 체인 위에 존재하면 this는 객체가 메서드 가진것처럼 설정됨
```js
var o = {
    f: function(){
        return this.a + this.b;
    }
}
var p = Object.create(o);
p.a = 1;
p.b = 4;
console.log(p.f()); //5
```
#### 접근자와 설정자의 this
* 접근자와 설정자에서 함수 호출하더라도 동일
* 접근하거나 설정하는 속성을 가진 객체로 this가 묶임
```js
function sum() {
    return this.a + this.b + this.c;
}

var o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3;
    }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true});

console.log(o.average, o.sum); // 2, 6
```

### 생성자
* new 키워드로 생성한 함수일 시 this는 새로 생긴 객체에 묶임
```js
function C(){
    this.a = 37;
}
var o = new C();
console.log(o.a); //37

function C2(){
    this.a = 37;
    return {a:38};
}
o = new C2();
console.log(o.a); //38
```

### DOM 이벤트
* 이벤트 처리 함수일 시 this는 이벤트를 발사한 요소로 설정
* 일부 브라우저에서는 `addEventListener()` 외 다른 방법으로 추가한 이벤트에 대해서는 규칙을 따르지 않음
* `event.target`은 부모로부터 이벤트가 위임되어 발생하는 자식의 위치 (내가 클릭한 요소) 반환
* `currentTarget`은 이벤트가 부착된 부모의 위치를 반환
```js
function bluify(e) {
    console.log(this === e.currentTarget); // 언제나 true
    console.log(this === e.target); //currentTarget === target
    this.style.backgroundColor === 'skyblue';
}

var elements = document.getElementsByTagName('*'); //문서 내 모든 요소 선택

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', bluify, false); //모든 요소에 bluify 이벤트 등록
}
```

### 인라인 이벤트 핸들러에서
* 인라인 이벤트 사용 시 this는 이벤트 사용한 DOM 요소로 설정됨
```html
<button onclick="console.log(this.tagName.toLowerCase())">this</button> <!--button-->
<button onclick="console.log(function(){return this}())">내부 this</button> <!--Window{...}-->
<!--위의 버튼은 내부 함수의 this가 정해지지 않았으므로 전역 객체인 window를 반환-->
```
