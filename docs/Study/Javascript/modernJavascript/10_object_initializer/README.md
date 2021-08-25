---
title : 객체 리터럴의 업그레이드  
date : 2021.08.26
----

# 객체 리터럴의 업그레이드

## 변수를 키와 값으로 하는 객체 만들기
* 변수들의 이름이 코드 내의 속성과 동일하기 떄문에 코드 내에서 굳이 두번씩 표기하지 않아도 됨
```js
const name = 'leo';
const surname = 'park';
const age = 25;
const nationality = 'south korea';

// ES6 이전
const person = {
    name: name,
    surname: surname,
    age: age,
    nationality: nationality,
};
console.log(person); //{name: 'leo', ...}

// ES6에서는 단순화 가능
const person = {
    name,
    surname,
    age,
    nationality,
};
console.log(person); //{name: 'leo', ...}
```


## 객체에 함수 추가하기
* 객체에 함수를 추가하기 위해서는 function 키워드를 사용해야 했음
* ES6에서는 function 키워드를 사용하지 않아도 됨
```js
//ES5
const person = {
    name: 'leo',
    greet: function (){
        console.log('hello');
    }
};

person.greet(); //hello

//ES6
const person = {
    name: 'leo',
    greet(){
        console.log('hello');
    }
};
person.greet();

// 화살표 함수
const person1 = {
    () => console.log('hello'), // 작동하지 않음. 함수에 접근하기 위한 키 필요
};
const person2 = {
    greet: () => console.log('hello'),
};
person2.greet(); //hello
```


## 객체의 속성을 동적으로 정의하기
```js
//ES5
var name = 'leo';
var persno = {}; //먼저 객체 생성
person[name] = 'Park'; //그 뒤에 수정
console.log(person.name);

//ES6
const name = 'leo';
const person = {
    [name]: 'leo' //객체 생성과 수정을 동시에 할 수 있음
};
console.log(person.name);
```
