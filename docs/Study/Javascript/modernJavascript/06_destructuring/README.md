---
title : 디스트럭처링  
date : 2021.08.24
---

# 디스트럭처링
* 디스트럭처링 할당 문법은 배열의 값 또는 객체의 속성을 풀어서  
  별개의 변수로 쓸 수 있게 해주는 자바스크립트 표현식

## 객체 디스트럭처링
* 디스트럭처링을 이용해 객체가 가진 속성에 접근함과 동시에 해당 속성 이름으로 변수 선언 가능
* 중첩된 객체 형태로 데이터가 주어진 경우에도 사용 가능
* 변수명 변경이나 기본값 전달도 가능
```js
// ES5 객체에서 변수 생성
var person = {
    first: 'leo',
    last: 'max'
};
var first = person.first;
var last = person.last;


// ES6 객체에서 디스트럭처링을 이용해 변수 생성
const person = {
  first: 'leo',
  last: 'max'
};
const {first, last} = person;


// 중첩된 객체 형태로 데이터 주어진 경우
const person = {
  name: 'leo',
  last: 'max',
  links: {
    sns: {
      github: 'https://github.com/sso214',
      facebook: 'https//face.com'
    },
    webiste: 'https://sso214.github.com'
  }
};
const {github} = person.links.sns


// 디스트럭처링 변수명 변경
const {facebook: fb} = person.links.sns; // person.links.sns.facebook 프로퍼티를 찾아 fb 변수로 명명
console.log(fb); //'https//face.com'
console.log(facebook); // ReferenceError


// 디스트럭처링 기본값 전달
const {facebook: fb = 'https://google.com'} = person.links.sns;
```

## 배열 디스트럭처링
* 객체 디스트럭처링과 달리 `{}`가 아닌 `[]`를 사용
* 생성하려는 변수의 수가 배열의 원소보다 작은 경우에도 사용 가능
* 나머지 모든 값을 얻고 싶을 때는 레스트 연산자(`...`) 사용 
```js
// 배열 디스트럭처링
const person = ['leo', 'park', 25];
const [name, surname, age] = person;


// 생성하려는 변수의 수가 배열의 원소보다 적은 경우
const [name, surname] = person; //age(25)는 어떤 변수에도 할당되지 X
console.log(name, surname); //leo park


// 나머지 모든 값을 얻고 싶을 때
const person = ['leo', 'park', 'pizza', 'ice cream', 'cheese cake'];
const [name, surname, ...food] = person; //레스트 연산자 사용해 나머지 모든 값 얻기
console.log(food); //'pizza', 'ice cream', 'cheese cake'
```

## 디스트럭처링을 이용하여 변수 교체하기
* 디스트럭처링 할당을 사용하면 변수의 값을 쉽게 교체 가능함
* `[] = []`
```js
let hungry = 'yes';
let full = 'no';

[hungry, full] = [full, hungry]; //hungry <--> full
console.log(hungry, full); //no yes
```
