---
title : 자바스크립트 데이터 타입과 연산자  
date : 2021.07.06  
---

# 자바스크립트 데이터 타입과 연산자

## 기본 타입  
기본 타입은 타입 자체가 하나의 값을 나타냄.  
JS는 느슨한 타입 체크 언어이기 떄문에 변수 선언 시 타입을 미리 정하지 않고 변수를 선언함.  
이렇게 선언된 변수는 안에 들어간 값의 타입에 따라 타입이 결정됨.  
* 숫자 (Number) :   
  모든 숫자를 64비트 부동소수점 형태로 저장하기 때문에 하나의 숫자형만 존재. (10, 0.1 등)  
  주의할 점 : 정수형이 따로 없고 모든 숫자를 실수로 처리하기 때문에 나눗셈 연산시 주의
```js
const num = 5/2;
console.log(num); // 2.5
console.log(Math.floor(num)); //2
// Math.floor : 정수 부분만 가져오기
```

* 문자열 (String) :  
  작은 따옴표나 큰 따옴표로 생성. 문자열은 배열처럼 인덱스 이용해 접근 가능함.  
  주의할 점 : 한번 정의된 문자열은 읽기만 가능, 수정 불가능.  
```js
let str = 'test';
console.log(str[0], str[1], str[2], str[3],); // test

str[0] = 'T';
console.log(str) // test
```

* 불린값 (Boolean) :   
  true / false

* undefined :  
  값이 비어있음. 기본적으로 값 할당되지 않았을 때.  
  undefined 타입의 변수는 자체의 값도 undefined.
  undefined = 타입이자 값을 나타냄

* null :   
  개발자가 명시적으로 값이 비어있음 나타낼 때 사용  
  null 타입을 가진 변수는 typeof의 결과가 object로 나옴.  
  null 타입 변수인지 확인할 때는 typeof 사용하면 안되고 일치 연산자 (===) 사용해 값을 확인해야 함
```js
let nullValue = null;
console.log(typeof nullValue); // object
console.log(typeof nullValue === null); // false
console.log(nullValue === null); // true
```

## 참조 타입 (객체 타입)
기본 타입을 제외한 모든 값은 객체. (배열, 함수, 정규표현식 등)  
JS의 객체는 key:value 형태의 프로퍼티들을 저장하는 컨테이너로 해시라는 자료구조와 유사.  

객체는 여러 개의 프로퍼티들을 포함할 수 있으며, 기본 타입의 값을 포함하거나 다른 객체를 가리킬 수 있음.  
프로퍼티의 값이 함수인 경우 해당 프로퍼티를 메서드라고 부름  

### 객체 생성
JS에서 객체 생성방법은 3가지가 있음.  
1. Object() 생성자 함수 이용 
```js
let leo = new Object(); // leo라는 빈 객체 생성

// foo 객체 프로퍼티 생성
leo.name = 'Leo';
leo.age = 25;
leo.gender = 'female';

console.log(typeof leo); // object
console.log(leo); // {name:'leo', age:25, gender:'female'}
```

2. 객체 리터럴 이용하는 방법  
   리터럴 = 표기법. 객체 리터럴 = 객체를 생성하는 표기법.  
```js
let leo = {
    name : 'leo',
    age: 25,
    gender : 'female' 
    // 프로퍼티 값으로는 어떤 표현식도 가능하며, 함수일 경우 해당 프로퍼티를 메서드라고 부름  
};

console.log(typeof leo); // object
console.log(leo); // {name:'leo', age:25, gender:'female'}
```
   

- 생성자 함수를 이용하는 방법
