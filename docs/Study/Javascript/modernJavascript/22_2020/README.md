---
title : ES2020의 새로운 기능  
date : 2021.09.04
---

# ES2020의 새로운 기능  
모든 브라우저가 지원하는 것은 아니므로 최신 버전의 크롬이나 파이어폭스를 사용해 예제를 테스트해보는게 좋음  
해당 기능이 지원되지 않는다면 babel 같은 컴파일러가 필요함  
(babel 컴파일러는 v7.8부터 ES2020을 지원함) 

## BigInt
* BinInt에 대한 지원은 자바스클비트에서 매우 큰 정수를 저장할 수 있음을 의미
* 현재 정수의 최댓값은 2의 53승의 -1.  
  Number.MAX_SAFE_INTEGER 를 사용해 얻을 수 있음  
  더 큰 정수를 저장할 수 없는 건 아니지만 처리할 수 있는 최댓값에 도달하면 제대로 된 결과가 나오지 않음
```js
let num = Number.MAX_SAFE_INTEGER; //9007199254740991
num + 1; //9007199254740992
num + 2; //9007199254740992
num + 3; //9007199254740994
num + 4; //9007199254740996
```
* BigInt를 사용하려면 BigInt 생성자를 이용하거나 큰 정수 뒤에 n을 붙이면 됨
* BigInt에 1을 더하려면 먼저 parseInt(bigInt, 1)을 사용해 BigInt를 Int로 변경해야 함  
  (예제에서는 번거로워 1을 더하는 대신 1n을 더함)
```js
let bigInt1 = BigInt(9999999999999);
let bigInt2 = 9999999999999n;

bigInt1 + 1n; //10000000000000n;
```


## 동적으로 가져오기
ES2020부터는 필요할때 모듈을 동적으로 가져올 수 있음  
아래처럼 런타임에서 모듈 필요 여부를 판단해 필요한 경우에만 async/await를 사용해 모듈 가져오는것 가능
```js
if (condition1 && condition2) {
    const module = await import('./path/to/module.js');
    module.doSomething();
}
```


## 옵셔널 체이닝
* 옵셔널 체이닝 연산자 : `?.` 
```js
const user1 = {
    name: 'leo',
    age: 25,
    work: {
        title: 'frontend developer',
        location: 'south korea'
    }
};
const user2 = {
    name: 'tim',
    age: 26,
};

// 여기에서 사용자 work.title에 접근하고 싶을 경우 아래와 같이 작성해야 했음
let jobTitle;
if (user.work) {
    jobTitle = user.work.title
}
// 혹인 삼항 연산자를 사용해서
const jobTitle = user.work ? user.work.title : '';

// work의 title 속성에 접근하기 위해 먼저 work의 속성을 가지고 있는지 확인해야 했음
// 단순할 때는 별로 문제가 되지 않지만 속성이 깊게 중첩되어 있는 객체의 경우 코드가 복잡해짐
// 이때 옵셔널 체이닝 연산자인 ?. 를 사용하면 간결하게 코드 작성 가능
const jobTitle = user.work?.title; //frontend developer
const jobTitle2 = user2.work?.title; //undefined
// user객체가 work 속성의 존재 여부를 묻는 것 처럼 읽히고, 존재한다면 title 속성에 접근할 수 있음
// 객체에서 사용할 수 없는 속성에 도달하면 연산자는 undefined를 반환
```
```js
const leo = {
    name : 'leo Park',
    education: {
        primary_school: {},
        middle_school: {},
        high_school: {},
        university: {
            name: 'Harvard University',
            graduation: {
                year: 2021
            },
        },
    },
};
const alex = {
    name: 'alex',
    education: {
        primary_school: {},
        middle_school: {},
        high_school: {},
        university: {
            name: 'University of Pennsylvania',
        },
    },
}

//옵셔널 체이닝 연산자 사용 안하고 작성하면
let graduationYear;
if (
    user.education.university && 
    user.education.university.graduation && 
    user.education.university.graduation.year) {
    graduationYear = user.education.university.graduation.year;
}

//옵셔널 체이닝 연산자 사용
const leoGraduationYear = leo.education.university?.graduation?.year;//2021
const alexGraduationYear = leo.education.university?.graduation?.year;//undefined
```

## Promise.allSettled()
ES6에서 주어진 모든 프로미스가 성공할 떄까지 기다릴 수 있는 `Promise.all()`이 추가되었음  
`Promise.allSettled()`는 한 단계 더 나아가 성공/실패 여부와 무관하게 모든 프로미스들이 
완료될 때까지 기다렸다가 각각의 결과를 설명하는 객체를 반환 (어떤 프로미스가 실패했는지 알기 쉬움)
```js
const arrayOfPromises = [
    new Promise((res, rej) => setTimeout(res,1000)),
    new Promise((res, rej) => setTimeout(rej,1000)),
    new Promise((res, rej) => setTimeout(res,1000)),
];

Promise.allSettled(arrayOfPromises).then(data => console.log(data));
// [
//   {status: "fulfilled", value:undefined},
//   {status: "rejected", reason:undefined},
//   {status: "fulfilled", value:undefined},
// ]
```


## null 계열의 값을 병합하기
* 새로 도입된 null 변합 연산자`??`를 사용하면 null 계열의 값과 거짓 값을 서로 구분 가능  
* null 병합 연산자는 왼쪽 피연산자가 null 계열의 값인 경우 오른쪽 피연산자를 반환
* null이나 undefined 가능성이 있는 값에 접근 시 null 병합 연산자를 사용해 기본값을 지정해주면 해당 값이 항상 존재한다고 가정할 수 있기 떄문에 편리
```js
'' ?? 'empty string'; //''
0 ?? 'zero'; //0
null ?? 'null print'; //'null print'
undefined ?? 'undefined print';//'undefined print'
```


## String.prototype.matchAll()
`matchAll()` 메서드는 지정된 정규식에 대해 문자열과 일치하는 모든 결과의 반복자를 반환
```js
//a에서 d사이에 있는 문자를 매칭하기 위한 정규식
const regEx = /[a-d]/g;
const str = "Lorem ipsum dolor sit amet";
const regExIterator = str.matchAll(regEx);
console.log(regExIterator);
// [
//     ["d", index: 12, input: "Lorem ipsum dolor sit amet", groups: undefined]
//     ["a", index: 22, input: "Lorem ipsum dolor sit amet", groups: undefined]
// ]
```


## 모듈 네임스페이스 export 문법
ES2020부터는 import 와 export 문법을 대칭적으로 사용할 수 있게 됨
```js
//ES2020 이전에도 import는 가능했음 
import * as stuff from './test.mjs';

//ES2020부터는 export 시에도 동일하게 할 수 있음  
export * as stuff from './test.mjs';
export {stuff}; //위 코드와 동일한 역할 수행
```


## import.meta
import.meta 객체는 ULR 등 모듈에 대한 정보를 노출함
```js
<script type="module" src="test.js"></script>
console.log(import.meta); //{url: "file:///home/user/test.js"}
//객체에 포함된 url은 절대 경로일 수도 있고 상대경로일 수도 있음
```


## globalThis
ES2020전에는 전역 객체(this)에 접근하는 표준화된 방식이 없었음  
(브라우저에서는 window, Node 환경에서는 global, 웹 워커의 경우 self를 사용해 전역 객체 참조)  
때문에 런타임에서 현재 환경을 수동으로 감지한 뒤 전역 객체에 접근하는 적절한 방법을 사용해야 했음
  
ES2020 부터는 어떤 환경에서든 항상 전역 객체(global)를 참조하는 globalThis를 사용할 수 있음  
브라우저에서는 전역 객체에 직접 접근할 수 없기 때문에 globalThis가 전역 객체의 프록시를 참조하게 됨  
globalThis 사용 시 애플리케이션이 실행되는 환경에 따라 전역 객체에 접근하는 방식이 다른 것에 대해 걱정할 필요 없음
