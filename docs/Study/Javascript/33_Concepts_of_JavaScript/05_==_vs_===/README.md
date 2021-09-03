---
title : == vs ===  
date : 2021.09.03
---

# == vs ===  
동등함을 비교할 때는 === 연산자를 사용하는게 좋음

## === 동등 비교 연산자 (= 3개)
자바스크립트에서 `===` 연산자 사용 시, 엄격한 동등성(타입과 값이 둘 다 같아야 함)을 비교함
```js
5 === 5 //true : 둘 다 숫자, 같은 값을 가짐
'hello world' === 'hello world' //true : 둘 다 string, 같은 값을 가짐
true === true //true : 둘 다 boolean, 같은 값을 가짐

77 === "77" //false : 숫자 vs 문자열
'cat' === 'dog' //false : 서로 다른 값
false === 0 //false: 다른 타입, 다른 값
```

## == 동등 비교 연산자 (= 2개)
`==` 연산자는 강제 형변환을 수행하며 느슨한 동등 비교를 함  
강제 형변환 : 동등 연산자로 비교하기 전 피연산자들을 공통 타입으로 만드는 행위  
```js
77 === '77'; //false : 숫자 vs 문자열
77 == '77'; //true : 자바스크립트가 강제 형변환으로 값을 동등한 타입으로 변환 후 값을 비교했기 때문

false === 0 //false : 다른 타입, 다른 값
false == 0 //true : 0이 falsy 값이기 떄문
```

## Falsy 값
아래의 6가지 값은 자바스크립트에서 falsy 값으로 통용됨
* false
* 0
* ""
* null
* undefined
* NaN

## Falsy 값의 비교

### false, 0, ""
false, 0, ""를 느슨한 동등 연산자로 비교했을 때의 결과는 true (false 형태로 강제 형변환 됐기 때문)  
```js
false == 0 //true
0 == "" //true
"" == false //true
```

### null, undefined
null과 undefined 비교 시 null과 undefined는 서로 같으며 자신과도 같음  
```js
null == null //true
undefined == undefined //true
null == undefined //true
```

### NaN
NaN은 어느값과도, 자신과도 동일하지 않음.
```js
NaN == null //false
NaN == undefined //false
NaN == NaN //false
```
