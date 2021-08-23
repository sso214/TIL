---
title: 루프  
date : 2021.08.24
---

# 루프

## `for of` 루프
* ES6에서 새로운 유형의 `for of` 루프 도입

### 배열에 대한 반복
```js
// 배열의 각 원소에 대해 반복하기 위해 일반적으로 사용
var fruits = ['apple', 'banana', 'orange'];
for(var i = 0; i < fruits.length; i++) {
    console.log(fruits[i]); // apple banana orange
}


// for of 이용
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit); // apple banana orange
}
```

### 객체에 대한 반복
* 객체는 이터러블이 아님 (이터러블 : 반복 가능한. 배열이나 문자열 등)
* 객체의 키/값 쌍에 대한 반복은 Object.keys()를 사용해 키를 가져온뒤  
  키에 대한 반복을 수행하면서 값에 접근
* Object.entries() 사용해 키/값 쌍을 가져온 뒤,  각 키/값 쌍에 대해 반복 수행하는 방법도 있음
```js
const car = {
    maker: 'BMW',
    color: 'red',
    year: '2021',
};

for (const prop of Object.keys(car)) {
    const value = car[prop];
    console.log(prop, value);
}
// maker BMW
// color red
// year 2021
```


## `for in` 루프
* 순서 없이 객체의 모든 열거 가능한 속성을 반복하기 떄문에 `for of` 루프와는 다름
* 반복 중에는 객체의 속성을 추가, 수정, 삭제하지 않는게 좋음.  
  반복 중에 해당 속성을 거칠 것이라는 보장 X. 수정 전이나 수정 후에 거칠 것이라는 보장 X
```js
const car = {
    maker: 'BMW',
    color: 'red',
    year: '2021',
};

for (const prop in car) {
    console.log(prop, car[prop]);
}
// maker BMW
// color red
// year 2021
```


## `for of`와 `for in`의 차이
* for ...in : 배열의 속성 목록(키의 목록) 반환
* for ...of : 배열의 원소 목록(값) 반환
```js
let list = [4,5,6];
// for ...in
for (let i in list) {
    console.log(i); // "0", "1", "2"
}

// for ...of
for (let i of list) {
    console.log(i); // 4, 5, 6
}
```
