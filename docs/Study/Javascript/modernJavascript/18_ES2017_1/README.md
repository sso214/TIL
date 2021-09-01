---
title : ES2017 - 문자열 패딩, Object.entries(), Object.values() 등  
date : 2021.09.01
---

# ES2017 - 문자열 패딩, Object.entries(), Object.values() 등

## 문자열 패딩
문자열 끝 부분 또는 시작 부분에 padding 추가 가능  
* `padEnd()`
* `padStart()`  

지정한 공백 - 문자열 갯수 = 추가되는 공백 갯수
```js
"hello".padStart(6); " hello" //패딩 6으로 지정했지만 1개의 공간만 확보됨
"hello".padEnd(6); "hello " //hello가 5글자고 패딩은 6으로 지정되어있기 떄문

"hi".padStart(10); "        hi" // 10 - 2 = 8스페이스 공백 추가
"welcome".padStart(10); "   welcome" // 10 - 7 = 3스페이스 공백 추가
```

### padStart()와 오른쪽 정렬
문자열을 오른쪽으로 정리하고 싶을 때 padStart() 활용 가능
```js
const strings = ['short', 'medium length', 'very loon string'];
//가장 긴 문자열 찾아서 길이 측정
const longestString = strings.sort(str => str.length).map(str => str.length)[0];
//가장 긴 문자열의 길이를 기준으로 모든 문자열에 padStart() 적용
strings.forEach(str => console.log(str.padStart(longestString)));
// very long string
//    medium length
//            short
```

### 패딩에 사용자 지정 값 추가
패딩은 공백 추가 뿐 아니라 문자열이나 숫자를 덧붙이는데도 사용 가능
```js
"hello".padEnd(13, ' Leo'); //"hello Leo"
"1".padStart(3,0); //"001"
"99".padStart(3,0); //"099"
```


## Object.entries() 와 Object.values()
객체 내부 값에 쉽게 접근하는 방법
* `Object.values()` : 모든 값이 담긴 배열 반환
* `Object.entries()` : 키와 값을 모두 포함하는 배열의 배열을 반환
```js
//객체 생성
const family = {
    father: 'hi',
    mother: 'hello',
    son: 'wow'
};

//ES2017 전 객체 내부 값 접근 방법
Object.keys(family); //['father', 'mother','son'] : 객체의 키만 반환
family.father; //hi : 값에 접근하기 위해선 해당 키를 먼저 얻은 다음 키를 통해 값에 접근해야 함

//
Object.values(family); //['hi', 'hello', 'wow']
Object.entries(family); //[["father":"hi"], ["mother":"hello"], ["son":"wow"]]
```


## Object.getOwnPropertyDescriptors()
객체가 소유한 모든 속성 설명자를 반환 (value.writable, get, set, configurable, enumerable 등)
```js
const myObj = {
    name: 'leo',
    age: 25,
    greet(){
        console.log('hello');
    },
};
Object.getOwnPropertyDescriptors(myObj);
// age: {value:25, writable:true, enumerrable:true, configurable:true}
// greet: {value:f, writable:true, enumerrable:true, configurable:true}
// name: {value:"Leo", writable:true, enumerrable:true, configurable:true}
```


## 후행 쉼표
이제 객체나 함수를 작성할 때 마지막 매개변수인지 여부 상관없이 각 매개변수 뒤에 쉼표 찍는 것이 허용
```js
//기존
const object = {
    prop1 : "prop",
    prop2 : "propop"
};

//후행 쉼표 허용됨
const object = {
    prop1: "prop",
    prop2: "propop", //속성 추가나 변경 시 실수를 줄일 수 있으므로 후행 쉼표 넣는것이 좋음
}
```


## 어토믹스
자바스크립트는 기본적으로 웹 브라우저 위에서 단일 스레드로 동작.  
하지만 HTML5 웹 워커 API 도입으로 백그라운드 스레드에서도 코드 실행이 가능해짐 ->   
멀티 스레드 환경을 지원하기 위해 공유 메모리 모델과 어토믹스가 도입

> 메모리가 공유되면 여러 스레드가 메모리에서 동일한 데이터를 읽고 쓸수 있음  
Atomics를 이용한 작업은 이런 환경에서도 정확하게 값을 읽고 쓸 수 있게 함  
또 Atomics를 이용한 작업은 다음 작업이 시작되기 전에 완료되고 중단되지 않는 것이 보장됨  
<br>
Atomics는 생성자가 아니며 Atomics의 모든 속성과 메서드는 정적이므로   
Atomics를 new 연산자와 함께 사용하거나 함수 형태로 호출할 수 없다

Atomics는 범용 고정 길이 바이너리 데이터 버퍼를 표현하는 SharedArrayBuffer 객체와 함께 사용됨
Atomics의 메서드
* add / sub
* and / or / xor
* load / store

### Atomics.add()
* Atomics.add()  
  호출시 3개의 인수(배열, 인덱스, 값)을 받고, 더하기를 수행하기 전 해당 인덱스에 존재하던 이전 값을 반환함
* Atomics.load()  
  배열에서 특정 값 가져오기 위해 배열과 인덱스를 인수로 전달
```js
// SharedArrayBuffer 생성
const buffer = new SharedArrayBuffer(16);
const uint8 = new Uint8Array(buffer);

uint8[0] = 10; //0번 인덱스에 값 추가

//Atomics.add() 호출 시 해당 배열 인덱스에 존재하던 이전 값 반환
console.log(Atomics.add(uint8, 0, 5)); //10

console.log(uint8[0]); //15 : 10 + 5
// 배열에서 특정 값 가져오기 위해서는 Atomics.load()에 배열과 인덱스 인수로 전달
consoel.log(Atomics.load(uint8, 0)); //15
```



