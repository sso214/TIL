---
title: 화살표 함수  
date : 2021.08.22
---

# 화살표 함수

## 화살표 함수
* ES6에서 도입된 함수 선언 방식
```js
//ES5 함수 선언 방식
const greeting = function(name) {
    return 'hello ' + name;
}

//화살표 함수 사용
var greeting = name => {
    return `hello ${name}`;
}
// 매개변수 없을 시 빈 괄호 사용
var greeting = () => {
    return 'hello';
}
```

## 일시적 반환
* 화살표 함수 사용시 명시적 반환을 생략하고 다음과 같이 반환 가능.
* 기존보다 더 간결하게 사용 가능
* 주의할 점은 코드의 간결함보다 가독성이 더 중요. 
```js
// ES5 함수
const oldFunction = function(name) {
    return 'hello ' + name;
}

// 일시적 반환
const arrowFunction = name => `hello ${name}`;
```

객체 리터럴 암시적 반환
```js
const race = "100m dash";
const runners = ['leo', 'max', 'mark'];
const results = runners.map((runner, i) => ({name: runner, race, place: i + 1}));
// 중괄호 안에 있는게 암시적으로 반환하려는 객체 리터럴일 경우 전체를 괄호 안에 감싸야 함
console.log(results);
// [{name: 'leo', reace : '100m dash', place : 1},{name: 'max', reace : '100m dash', place : 2},{name: 'mark', reace : '100m dash', place : 3}];
```

## 화살표 함수는 익명 함수
* 화살표 함수는 익명 함수
* 참조할 이름이 필요할 경우 함수를 변수에 할당
```js
const greeting = name => `hello ${name}`;
greeting('leo');
```

## 화살표 함수와 this 키워드
* 화살표 함수 내에서 this 키워드 사용 시 일반 함수와 다르게 동작함
* 화살표 함수 사용 시 this 키워드는 상위 스코프에서 상속됨
```js
const box = document.querySelector('.box');
box.addEventListener('click', function(){
    this.classList.toggle('opening'); // this : const box에 할당
    setTimeout(function(){
        this.classList.toggle('opening'); //this : window 객체로 설정됨
    }, 500); // Uncaught TypeError : cannot read property 'toggle' of undefined
});

// 화살표 함수 사용
const box = document.querySelector('.box');
box.addEventListener('click', function(){
    this.classList.toggle('opening'); // this : const box에 할당
    setTimeout(() => {
        this.classList.toggle('opening'); // this : (부모 상속) const box에 할당
    }, 500);
})
```

## 화살표 함수를 피해야 하는 경우
```js
const button = document.querySelector('btn');
button.addEventListener('click', () => {
    this.classList.toggle('on'); // this : window 객체 가리킴
});

------
    
const person1 = {
    age: 25,
    grow: function(){
        this.age++;
        console.log(this.age)
    },
};
person1.grow(); //25

const person2 = {
    age: 25,
    grow: () => {
        this.age++;
        console.log(this.age);// this : window 객체 가리킴
    }
};

person2.grow();
```
* 화살표 함수와 일반함수의 또 다른 차이점은 arguments 객체 접근 방식
* arguments 객체 : 함수 내부에서 접근 가능한 배열 객체. 해당 함수에 전달된 인수의 값을 담고 있음
* 화살표 함수에서 arguments 객체는 this와 비슷하게 부모 스코프의 값을 상속함 
```js
// 일반함수 arguments 접근
function example(){
    console.log(arguments[0]);
}
example(1,2,3); //1

// 화살표 함수
const showWinner = () => {
    const winner = arguments[0];
    console.log(`${winner} was the winner`);
}
showWinner("Usain Bolt", "Justin Gatlin", "Asafa Powell"); 
// ReferenceError : arguments is not defined

// 화살표 함수 arguments 접근 올바른 예시
const showWinner = (...args) => {
    const winner = args[0];
    console.log(`${winner} was the winner`);
}
showWinner("Usain Bolt", "Justin Gatlin", "Asafa Powell"); 
// Usain Bolt was the winner
```
