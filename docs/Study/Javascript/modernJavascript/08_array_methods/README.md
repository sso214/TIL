---
title: 배열 메서드  
date : 2021.08.25
---

# 배열 메서드

## `Array.from()`
* ES6에서 도입한 새로운 배열 메서드
* 배열처럼 보이지만 배열이 아닌 객체를 받아서 실제 배열로 변환해 반환함
* `.textContent` : 태그 자체는 제외하고 태그 안의 텍스트만 반환
* 두번째 인수를 이용해 배열에 map 함수를 적용한 것과 같은 기능의 코드도 작성 가능
```html
<div class="fruits">
    <p>Apple</p>
    <p>Banana</p>
    <p>Orange</p>
</div>
```
```js
const fruits = document.querySelectorAll('.fruits p'); //3개의 p태그를 포함한 노드 리스트(배열과 비슷한 구조)
const fruitArray = Array.from(fruits); //fruits를 배열로 변환
console.log(fruitArray); //[p,p,p]

const fruitsNames = fruitArray.map(fruit => fruit.textContent); 
//배열로 변환했으므로 배열 메서드 사용 가능
//전체 태그 아닌 p태그의 textContent만 새로운 배열로 생성
console.log(fruitsNames); //['Apple', 'Banana', 'Orange']

//아래처럼 단순화 가능
const fruits = Array.from(document.querySelectorAll('.fruits p'));
const fruitsName = fruits.map(fruit => fruit.textContent);
console.log(fruitsNames); //['Apple', 'Banana', 'Orange']

//두번째 인수 사용
const fruits = document.querySelectorAll('.fruits p');
const fruitArray = Array.from(fruits, fruit => {
    console.log(fruit); //<p>Apple</p><p>Banana</p><p>Orange</p>
    return fruit.textContent; //태그 자체는 제외. 태그 안의 텍스트 내용만
});
console.log(fruitArray);
```


## `Array.of()`
* 전달받은 모든 인수로 배열 생성
```js
const digits = Array.of(1,2,3,4,5);
console.log(digits); // [1,2,3,4,5]
```


## `Array.find()`
* 제공된 테스트 함수를 충족하는 배열의 첫 번째 원소를 반환 (첫 번째 원소만 반환)
* 충족하는 원소 없을 경우 undefined 반환
```js
const array = [1,2,3,4,5];
let found = array.find(e => e > 3); // (> 3)의 조건을 충족하는 첫번째 원소 반환
console.log(found); //4
```


## `Array.findIndex()`
* 조건과 일치하는 첫 번째 원소의 index 반환 (첫 번째 원소 index만 반환)
```js
const greetings = ['hello', 'hi', 'byebye', 'goodbye', 'hi'];
let foundIndex = greetings.findIndex(e => e === 'hi');
console.log(foundIndex); //1
```


## `Array.some()` 과 `Array.every()`
* `.some()` : 조건과 일치하는 원소가 있는지 검색 -> 첫 번째 일치하는 원소 찾으면 바로 중지
* `.every()` : 모든 원소가 주어진 조건과 일치하는지 여부 확인
```js
const array = [1,2,3,4,5,6,1,2,3,1];

let arraySome = array.some(e => e > 2);
console.log(arraySome); //true : 2보다 큰 원소가 일부 존재하기 때문

let arrayEvery = array.every(e => e > 2);
console.log(arrayEvery); //false : 모든 원소가 2보다 크지는 않기 때문
```
