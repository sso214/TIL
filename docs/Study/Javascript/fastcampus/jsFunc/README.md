---
title : JS 함수  
date : 2022.02.09
---

## 01. 함수 복습

* 함수의 호출은 최대한 적게. 변수를 효율적으로 사용
* 매개변수를 지정하지 않아도 arguments라는 객체를 함수 내에서 사용할 수 있음  
  (하지만 직관적이지 않으므로 되도록 매개변수 이름을 지정해 받아오는 것이 좋음)
```js
function test(){
    console.log(arguments);
}
test(1,2);
```


## 02. 화살표 함수

```js
const double = function (x) {
    return x * 2
}
console.log('double: ', double(7));

const doubleArrow = (x) => x * 2;
const doubleArrow2 = x => ({name: 'hello'}); //축약형으로 객체 데이터 반환
console.log('doubleArrow: ', doubleArrow(7));
```
* 화살표 함수는 중괄호와 return 없앤 축약형으로 사용 가능 (매개변수 하나일 경우 중괄호도 제거 가능)



## 03. IIFE : Immediately-Invoked Function Expression (즉시실행 함수)
함수를 만들자마자 바로 실행
```js
(function(){
    console.log(a * 2);
})();

(function(){
    console.log(a * 2);
}());
// 소괄호 위치만 다를 뿐 둘다 같게 동작
```


## 04.호이스팅
함수 선언부가 유효범위 최상단으로 끌어올려지는 현상

* 함수 표현식 사용 시 호이스팅 X
```js
const a = 7;
double(); //error : double is not a function
const double = function(){
    console.log(a * 2);
}
```

* 함수 선언 사용 시 호이스팅 발생
```js
const a = 7;
double();
function double(){
    console.log(a * 2);
}
```
