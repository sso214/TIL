---
title : 템플릿 리터럴  
date : 2021.08.23
---


# 템플릿 리터럴

* 문자열을 삽입하는 방식
* ES6 이전에는 템플릿 문자열이라고 불렸음

## 문자열 삽입
* ES6에서는 backtick(`)을 이용해 템플릿 문자열 작성
```js
// ES5
var name = 'leo';
var greeting = 'hello my name is  ' + name;
console.log(greeting); // hello my name is leo

// ES6
let name = 'leo';
const greeting = `hello my name is ${name}`;
console.log(greeting);
```

## 표현식 삽입
```js
// ES5
var a = 1;
var b = 10;
console.log(`1 * 10  is ` + (a * b)); // 1 * 10 is 10

// ES6
console.log(`1 * 10 is ${a * b}`);
```

## 여러 줄 문자열 생성
```js
//ES5 : 각 행마다 백슬래시 삽입해야 함
var text = "hello, \
    my name is leo \
    how are you?\ ";

//ES6 : 전체를 백틱으로 감싸면 됨
const content = `hello, 
my name is leo
how are you?`;
```

## 중첩 템플릿
* 템플릿 안에 템플릿 중첩
```js
const people = [{
    name: 'leo',
    age: 25
}, {
    name: 'max',
    age: 30
}, {
    name: 'mark',
    age: 29
}];
const markup = `
<ul>
${people.map(person => `<li>  ${person.name}</li>`)}
</ul>
`;
console.log(markup);//<ul><li>   leo</li>,<li>   max</li>,<li>   mark</li></ul>
```

## 삼항 연산자 추가하기
* 삼항연산자 : ?앞의 조건 true 일 경우 첫번째 값 반환, 아닐 경우 두번째 값 반환
* 삼항 연산자 사용시 템플릿 문자열 내에 로직을 쉽게 추가 가능함
```js
// 삼항 연산자
const isDiscounted = false;
function getPrice(){
    console.log(isDiscounted ? '$10' : '$20');
}
getPrice(); //$20

// 템플릿 리터럴 내 삼항 연산자 사용
const artist = {name: 'Bon Jovi', age: 56};
const text = `
<div>
    <p>
    ${artist.name} is ${artist.age} years old  
    ${artist.song ? `and wrote the song ${artist.song}` : ``}
    </p>
</div>
`;
```

## 템플릿 리터럴에 함수 전달하기
```js
const groceries = {
    meat: 'prok chop',
    veggie: 'salad',
    fruit: 'apple',
    others: ['mushrooms', 'instant noodles', 'instant soup']
};

function groceryList(others) {
    return `<p>${others.map(other => `  <span>${other}</span>`).join('\n')}</p>`;
}

const markup = `
<div>
    <p>${groceries.meat}</p>
    <p>${groceries.veggie}</p>
    <p>${groceries.fruit}</p>
    <p>${groceryList(groceries.others)}</p> //groceryList 함수 호출
</div>
`;
```

## 태그된 템플릿 리터럴
* 함수를 태그해 템플릿 리터럴 실행 시 템플릿 내부의 모든 항목이 태그된 함수의 인수로 제공됨
* 함수 이름을 가져다 실행할 템플릿 앞에 쓰면 작동됨
```js
let person = 'leo';
let age = 25;

function myTag(strings, personName, personAge){
    let str = strings[1]; // ['That', 'is a ', '!] : 
    // strings : 전체 문자열 중 템플릿 리터럴 변수를 제외한 문자열들이 담긴 배열로 설정됨
    // 나머지 템플릿 리터럴 변수들이 인수가 됨
    let ageStr;
    
    personAge > 50 ? ageStr = 'grandpa' : ageStr = 'youngster';
    return personName + str + ageStr;
}

let sentence = myTag`That ${person} is a ${age}!`;
console.log(sentence); //leo is a youngster
```
