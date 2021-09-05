---
title : 자바스크립트 기초  
date : 2021.08.22
---


# 자바스크립트 기초

<!--

자바스크립트는?
- 1995년 브렌던 아이크가 만든 프로그래밍 언어  
- 웹 페이지를 만들기 위한 필수적인 언어  

-->

HTML 자바스크립트 삽입 방식
- `<script type="text/javascript"> javscript code </script>`
- `<script src="script link"></script>`  
  파일을 따로 분리해 한번에 다운로드하고 캐시하게 하는 것이 좋음  
  캐시된 버전의 파일을 사용할 수 있으므로 성능상 이점도 있음

## 변수
### 변수란?   
값을 담기 위한 공간.  
ES6 이전에는 `var`로 변수 선언했지만 현재에는 `let`, `const` 사용  
값을 재할당해야 하는 상황이 아니라면 항상 `const`를 사용하는게 좋음

### 변수 명명법  
* 숫자로 시작할 수 없음  
* 공백, 기호, 마침표 들어갈 수 없음  
* 예약어 사용할 수 없음  
* 변수명만 보고도 어떤 변수인지 알 수 있게 지어야 함  
* camelCase(lastLoggedIn) 이나 snake_case(last_logged_in)를 이용해   
  일관성 있게 연관 단어를 이어 변수명 작성


## 자료형

자바스크립트에는 6개의 원시 자료형과 1개의 object 자료형이 존재함.

> 자바스크립트는 동적언어 : 변수 정의 시 자료형 정의가 필요 X.  
편리해보이지만 대규모 프로젝트에서는 버그의 원인 될 수 있음.  
때문에 강타입 언어인 타입스크립트를 사용하기도 함. 

### 원시 자료형
객체가 아닌 자료형으로 하나의 값을 담을 수 있으며 메서드를 가지지 않는다.  
* string : 문자열
* number : 숫자 (JS에는 정수형만을 표현하는 자료형이 따로 없음)
* boolean : true/false
* null : 값이 없음을 정의
* undefined : 정의되지 않은 값
* symbol : 고유하고 변경될 수 없는 값. ES6에 추가

### 객체
* 키/값 쌍으로 데이터를 저장  
* 여러 속성의 모음을 저장하는데 사용 가능

#### 빈 객체 생성
1. `const car = new Object();`
2. `const car = {}` : 객체 리터럴 방식. 주로 이 방식을 사용함
```js
let intern = {
  leo: 25,
  sam: 28,
  max: 30,
  "so young": 23,
};
intern.mark = 29; // 점 표기법을 사용해 객체 car에 새 속성 추가
console.log(intern.leo); // 점 표기법 이용해 객체 속성 접근
console.log(intern['leo']); // 대괄호 표기법 이용해 객체 속성 접근
console.log(intern.so young); // 여러 단어로 이루어진 속성의 경우 점 표기법 사용 불가
const key = 'leo';
console.log(intern.key); // undefined
console.log(intern['key']); // undefined : key는 문자열이 아닌 변수이름. 따옴표 표기 X
console.log(intern[key]); // 25 : 변수에 저장된 키를 통해 객체 속성에 접근하려면 대괄호 표기법을 사용
```

#### 객체의 복사
원시 자료형과 달리 객체 복사는 참조 방식이 사용됨.  
```js
let car = {color: 'black'};
let secondCar = car; // car에 대한 참조(주소)를 저장하게 됨
car.spped = 'fast'; // 때문에 car를 수정하면 secondCar도 같이 수정
console.log(car); // {color:'black',speed:'fast'}
console.log(secondCar); // {color:'black',speed:'fast'}
console.log(car === secondCar); // true

let emptyObject01 = {};
let emptyObject02 = {};
console.log(emptyObject01 == emptyObject02); //false
console.log(emptyObject01 === emptyObject02); //false
emptyObject01.a = 1;
emptyObject02.a = 1;
console.log(emptyObject01 == emptyObject02); //false
console.log(emptyObject01 === emptyObject02); //false
// 객체는 동일한 객체를 비교할 때만 true
```

`Object.assign(복사본에 해당하는 객체, 원본객체)` : 객체 복사하는 빠른 방법
```js
const car = {color: 'red'};
const secondCar = Object.assign({}, car);
car.wheels = 4; // Object.assign 사용 시 car 업데이트해도 secondCar에는 영향 X
console.log(car); // {color:'red', wheels:4}
console.log(secondCar); // {color:'red'}
```

### 배열
순서대로 값을 저장하는 객체. 
```js
const fruitBasket = ['apple', 'banana', 'orange'];
console.log(fruitBasket[0]); // apple
console.log(fruitBasket.length); // 배열길이 확인
console.log(fruitBasket.push('pear')); //배열 끝에 새 값 추가
console.log(fruitBasket.unshift('melon')); //배열 시작에 새 값 추가
console.log(fruitBasket.pop()); //배열 끝에 값 하나 제거
console.log(fruitBasket.shift()); // 배열 시작에 값 하나 제거
```

### typeof 자료형 확인
```js
typeof "hello"; // string
typeof 12; // number
typeof [1,2,3]; // object
typeof {prop: 'value'}; // object
typeof null // object : 버그
```


## 함수
### 함수 정의
* 원시자료형이 함수에 전달될 때는 참조 아닌 값의 형태로 전달 (변경사항 전역적으로 반영 X)
* 객체나 배열을 함수에 전달시 참조로 전달 (변경이 원래의 객체에 반영)
```js
// 기본적인 함수 정의
function greet(name) { // 매개변수
  console.log("hello " + name); //명령문
}
greet("leo");

// 원시자료형 전달
let myInt = 1;
function increase(value) {
    return value += 1;
}
console.log(myInt); //1
console.log(increase(myInt)); //2
console.log(myInt); //1

// 객체 전달
let myCar = {
  maker: 'bmw',
  color: 'red'
};
console.log(myCar); //{maker:'bmw',color:'red'}
function changeColor(car) {
    car.color = 'blue';
}
changeColor(myCar);
console.log(myCar); //{maker:'bmw',color:'blue'}
```

### 함수 표현식
* 변수에 함수 할당
* 함수 표현식을 사용해 익명 함수를 만들 수 있음
```js
const getter = function greet(name) {
    console.log('hello ' + name);
}
getter('leo');

// 익명함수
const getter = function(name) {
  console.log('hello ' + name);
}
```

### 화살표 함수 사용
```js
const greeter = (name) => {
    console.log("hello " + name);
};
```


## 함수 스코프와 this 키워드의 이해

### 스코프
* 스코프 : 변수에 접근할 수 있는 위치 제어
* 전역 스코프 : 전역 스코프를 가지는 변수는 코드 어디에서나 접근 가능
* 블록 스코프 : 변수가 선언된 블록 내부에서만 접근 가능 (블록 : 함수,루프,중괄호로 구분되는 모든 영역)
```js
// var : 블록 스코프 가지지 않기 때문에 블록 외부에서도 접근 가능
var myInt = 1;
if (myInt === 1) {
    var mySecondInt = 2;
    console.lgo(mySecondInt); //2
}
console.lgo(mySecondInt); //2


// let, const : 블록 스코프 외부에서 접근 불가
if (myInt === 1) {
  let mySecondInt = 2;
  console.lgo(mySecondInt); //2
}
console.lgo(mySecondInt); //Uncaught ReferenceError
```


### this 키워드
* this의 값은 함수가 호출되는 방식에 따라 다름
```js
// 객체의 메서드로 호출된 함수
const myCar = {
  color: 'red',
  logColor: function () {
    console.log(this.color); // this : myCar 개체 참조
  },
};
myCar.logColor(); //red

// 전역범위 this 호출
function logThis(){
    console.log(this); // this : 전역 범위에서 호출했으므로 Window 객체 참조
}
logThis(); //Window{...}
```
#### strict mode
* strict mode로 설정하면 실수로 window 객체 참조를 방지할 수 있음
* JS 엄격한 규칙 적용 : JS 파일 시작 부분에 `"use strict";`
* 전역 객체 값을 Window 객체 대신 undefined로 설정하는 규칙 있음

#### .bind()
* this 값 수동 설정할 때 .bind() 사용
```js
const myCar = {
  color: 'red',
  logColor: function () {
    console.log(this.color);
  }
};
const unboundGetColor = myCar.logColor(); //myCar.logColor 메서드와 동일하게 설정
console.log(unboundGetColor()); //undefined : this.color를 찾으려고 하지만 전역범위 this 호출(Window)

const boundGetColor = unboundGetColor.bind(myCar); //.bind()를 사용해 boundGetColor의 this가 괄호 안의 객체를 참조함을 알림
console.log(boundGetColor); //red
```

#### .call()
* .bind()처럼 this의 값을 설정할 수 있음
* 주어진 this의 값으로 함수 호출
* 인수의 목록을 받음
```js
function Car(maker, color) {
    this.carMaker = maker;
    this.carColor = color;
}

function MyCar(maker, color) {
  //.call()에 MyCar 객체 전달 -> this.carMaker가 MyCar의 인수로 전달한 maker로 설정됨
  Car.call(this, maker, color);
  this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
console.log(myNewCar.carMaker); //bmw
console.log(myNewCar.carColor); //red
```



#### .apply()
* .bind()처럼 this의 값을 설정할 수 있음
* 주어진 this의 값으로 함수 호출
* 하나의 인수 배열 받음. 배열에 포함된 원소의 수에 관계없이 함수 내부로 전달 가능
* 함수의 필요한 인수의 수를 모르거나 알 필요 없을 때 .apply() 주로 사용
```js
function Car(maker, color) {
  this.carMaker = maker;
  this.carColor = color;
}

function MyCar(maker, color) {
  //.apply()에 
  Car.apply(this, [maker, color]);
  this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
console.log(myNewCar.carMaker); //bmw
console.log(myNewCar.carColor); //red

// ---

const ourFunction = function(item, method, args) {
    method.apply(args);
};
ourFunction(item, method, ['argument1', 'argument2']);
ourFunction(item, method, ['argument1', 'argument2', 'argument3']);
```
