---
title : 스프레드 연산자와 레스트 매개변수  
date : 2021.08.25
---

# 스프레드 연산자와 레스트 매개변수

## 스프레드 연산자
* '...'
> 스프레드 문법을 사용하면 0개 이상의 인수(함수 호출용) 또는 원소(배열 리터럴용)가 예상되는 위치에서  
배열 표현식 또는 문자열과 같은 이터러블 항목을 확장하거나 0개 이상의 키/값 쌍(객체 리터럴용)이 예상되는  
위치에서 객체 표현식을 확장할 수 있다.

### 배열의 결합
```js
const veggie = ['tomato', 'cucumber', 'beans'];
const meat = ['pork', 'beef', 'chicken'];

//veggie과 meat 배열의 모든 개별 원소를 풀어서 menu 배열에 넣고 동시에 새 항목을 추가함
const menu = [...veggie, 'pasta', ...meat]; 
consoel.log(menu); //['tomato', 'cucumber', 'beans', 'pasta, 'pork', 'beef', 'chicken']
```

### 배열의 복사
* 스프레드 문법은 배열 복사 시 매우 유용
```js
// 실제 복사가 아니라 이전 배열 참조한 예
const veggie = ['tomato', 'cucumber', 'beans'];
const newVeggie = veggie; //veggie 배열 참조
veggie.push('pears');
console.log(veggie); //['tomato', 'cucumber', 'beans', 'pears']
console.log(newVeggie); //['tomato', 'cucumber', 'beans', 'pears']

// ES6 버전 이하에서 일반적인 배열의 복사본 만들기
const veggie = ['tomato', 'cucumber', 'beans'];
//빈 배열 생성 후 기존 배열의 값을 새 배열에 이어 붙임
const newVeggie = [].concat(veggie);
veggie.push('pears');
console.log(veggie); //['tomato', 'cucumber', 'beans', 'pears']
console.log(newVeggie); //['tomato', 'cucumber', 'beans']

// 스프레드 문법 이용
const veggie = ['tomato', 'cucumber', 'beans'];
// newVeggie를 배열 veggie의 복사본으로 만들기 위해 newVeggie에 배열 할당 -> 
// 내부에 스프레드 연산자 이용해 veggie 변수의 모든 원소를 넣음
const newVeggie = [...veggie];
veggie.push('pears');
console.log(veggie); //['tomato', 'cucumber', 'beans', 'pears']
console.log(newVeggie); //['tomato', 'cucumber', 'beans']
```

### 함수와 스프레드 연산자
* 인수들을 원소로 가지는 배열에 스프레드 연산자 사용 시 함수 쉽게 호출 가능
```js
// 기존 방식
function doStuff(x, y, z){
    console.log(x, y, z);
}
var args = [0,1,2];
doStuff.apply(null, args);

// 스프레드 문법 사용
doStuff(...args);
console.log(args); //[0,1,2]

// 지정된 인수보다 너 많은 값을 제공하는 경우
const name = ['leo', 'park', 'mark'];
function greet(first, last) {
    console.log(`hello ${first} ${last}`);
}
greet(...name); //hello leo park
```

### 객체 리터럴과 스프레드(ES2018)
* ES2018에서 도입된 객체에 대한 스프레드 연산자의 예시
```js
let person = {
    name: 'leo',
    surname: 'park',
    age: 25
};
let clone = {...person};
console.log(clone); // {name: 'leo', surnameL : 'park', age:25}
```


## 레스트 매개변수
* 레스트 문법은 점 3개로 이루어졌다는 점에서 스프레드 문법과 똑같음. But 기능적으로는 반대
* 스프레드는 배열을 확장하고, 레스트는 여러 원소를 하나의 원소로 압축함
```js
const runners = ['leo', 'max', 'mark', 'emily'];
const [first, second, ...losers] = runners; // 나머지 원소는 레스트 연산자를 사용해 losers 변수에 배열로 담음
console.log(...losers); // mark emily
```
