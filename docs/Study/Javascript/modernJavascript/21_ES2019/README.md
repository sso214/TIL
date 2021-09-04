---
title : ES2019의 새로운 기능  
date : 2021.09.04
---

# ES2019의 새로운 기능

## `Array.prototype.flat()` 과 `Array.prototype.flatMap()`
* `Array.prototype.flat()` 은 지정한 깊이까지 배열을 재귀적으로 평면화함  
* 깊이 인수가 지정되지 않으면 1이 기분값.
* Infinity로 지정시 모든 중첩 배열 평면화
```js
const letters = ['a', 'b', ['c', 'd', ['e', 'f']]];

//깊이 1(기본값) 평면화
letters.flat(); //['a', 'b', 'c', 'd', ['e', 'f']]

//깊이 2 평면화
letters.flat(2); //['a', 'b', 'c', 'd', 'e', 'f']

//깊이 1 평면화 두 번 수행 시 깊이 2 평면화와 같음
letters.flat().flat(); //['a', 'b', 'c', 'd', 'e', 'f']

//중첩된 배열이 모두 없어질 때까지 평면화
letters.flat(Infinity); //['a', 'b', 'c', 'd', 'e', 'f']
```

* `Array.prototype.flatMap()`은 `.flat()`과 동일한 방식으로 깊이 인수를 처리
* 단순히 배열을 평면화하는 대신 새로운 값으로 매핑되어 생긴 배열을 평면화함
```js
let greeting = ['Greetings from', ' ', 'vietnam'];

//일반 map 함수 사용
greeting.map(x => x.split(' '));//map 사용 시 배열 안에 배열이 중첩된 결과를 얻게 됨
//['Greetings', 'from']
//['', '']
//['vietnam']

greeting.flatMap(x => x.split(' '));//flatMap 사용 시 평면화된 결과 얻음
// ['Greetings', 'from', '', '', 'vietnam']
```


## Object.fromEntries()
* 키/값 쌍이 포함된 배열을 객체로 변환
* 배열, 맵 등의 이터러블 프로토콜을 구현하는 객체라면 무엇이든 `Object.fromEntries()` 인수로 전달 가능
```js
const keyValueArray = [
    ['key1', 'value1'],
    ['key2', 'value2'],
];

const obj = Object.fromEntries(keyValueArray);
console.log(obj); //{key1: "value1", key2: "value2"}
```


## String.prototype.trimStart() 와 String.prototype.trimEnd()
* `trimStart()` : 문자열 시작 부분의 공백 제거. 별칭으로 trimLeft() 사용 가능
* `trinEnd()` : 문자열 끝 부분의 공백 제거. 별칭으로 trimRight() 사용 가능
```js
let str = "      this string has lot of whitespace      ";
str.length; //45

str = str.trimStart(); //"this string has lot of whitespace      "
str.length; //39

str = str.trimEnd(); //"this string has lot of whitespace"
str.length; //33
```


## 선택적 catch 할당
* ES2019 이전에는 catch 절에 항상 예외 변수를 포함해야 했음 -> ES2019에서는 이를 생략 가능
* 이 문법은 오류를 무시하고자 할 때 유용
```js
//ES2019 이전
try {

} catch (err) {

}

//ES2019
try {

} catch {

}
```


## Function.prototype.toString()
* 함수 객체의 `.toString()` 메서드는 함수의 소스 코드를 나타내는 문자열을 반환
* ES2016까지는 소스코드에서 주석이나 공백문자를 제거했지만 ES2019에서 개정되 주석 등도 포함됨
```js
function sum(a, b) {
    return a + b;
}
console.log(sum.toString());
//function sum(a,b) {
//  return a + b;
// }

function sum(a,b) {
    //합계를 구하는 함수
    return a + b;
}
console.log(sum.toString());
// function sum(a,b) {
//     //합계를 구하는 함수
//     return a + b;
// }
```


## Symbol.prototype.description
* 심볼 객체의 description은 해당 심볼 객체의 설명을 반환함
```js
const me = Symbol('Leo');
me.description; //"Leo"
me.toString(); //"Symbol(Leo)"
```
