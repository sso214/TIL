---
title : 문자열 메서드  
date : 2021.08.23
---

# 문자열 메서드

## 기본적인 문자열 메서드

### indexOf()
* 문자열에서 지정된 값이 처음 나타나는 위치 반환
```js
const str = 'this is a short sentence';
str.indexOf('short'); // 10
```

### slice()
* 문자열의 지정된 부분을 새 문자열로 반환
```js
const str = 'pizza, orange, cereals';
str.slice(0, 5); //pizza
```

### toUpperCase()
* 문자열 내의 모든 문자를 대문자로 교체
```js
const str = 'i ate an apple';
str.toUpperCase(); // I ATE AN APPLE
```

### toLowerCase()
* 문자열 내의 모든 문자를 소문자로 교체
```js
const str = 'I ATE AN APPLE';
str.toLowerCase(); // i ate an apple
```


## 새로운 문자열 메서드
ES6에서 도입된 새로운 문자열 메서드

### startsWith()
* 매개변수 받은 값으로 문자열이 시작하는지 확인
* 대소문자 구분함
* 매개변수 추가 전달 시 메서드가 검사를 시작하는 시작점을 지정할 수 있음
```js
const code = 'ABCDEFG';
code.startsWith("ABB"); //false
code.startsWith("abc"); //false
code.startsWith("ABC"); //true
code.startsWith('DEF', 3); //true
```

### endsWith()
* startsWith()와 유사하게 문자열이 전달한 값으로 끝나는지 확인
* 대소문자 구분함
* 매개변수 추가 전달 시 문자열의 얼마만큼을 확인할지 길이를 전달할 수 있음
```js
const code = 'ABCDEFG';
code.endsWith('DDD'); //false
code.endsWith('efg'); //false
code.endsWith('EFG'); //true
code.endsWith('EF', 6); //첫 6개문자(ABCDEF)만을 고려 : true
```

### includes()
* 전달한 값이 문자열에 포함되어있는지 확인
* 대소문자 구분함
```js
const code = 'ABCDEFG';
code.includes('ABB'); //false
code.includes('abc'); //false
code.includes('ABC'); //true
```

### repeat()
* 문자열을 반복하며 횟수를 인수로 받음
```js
let hello = 'Hi';
console.log(hello.repeat(10)); //HiHiHiHiHiHiHiHiHiHi
```
