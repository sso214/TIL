--- 
title : Jest  
date : 2021.08.20
---

# Jest

## jest
* facebook에서 선보인 테스팅 도구
* zero config 철학을 가지고 있음 (별도의 설정 없이 빠르게 테스트 케이스를 작성할 수 있음)
* 가장 많이 사용되는 테스트 도구 (front 뿐 아니라 backend 에서도 사용)

## 설치 및 간단한 테스트 작성
1. `npm init` 으로 package.json 생성
2. `npm install jest --save-dev` jest install (개발할 때만 사용하기 때문에 개발 의존성으로 설치)
3. package.json 파일의 scripts test 부분을 "jest"로 변경
```json
"scripts": {"test": "jest"}
```
4. fn.js 파일 생성
```js
const fn = {
    add: (num1, num2) => num1 + num2
};
module.exports = fn; // test파일에서 사용할 수 있게 exports
```
5. fn.test.js 파일 생성
```js
const fn = require('./fn'); //fn.js의 함수를 불러옴

test('설명 : ', () => {
    expect('검증할 값').toBe('기대되는 값');
    // .toBe 부분에서 사용하는 함수를 Matcher 라고 함 : toBe는 숫자나 문자 등 기본타입 값을 비교할 때 사용
});

test('1은 1', () => {
    expect(1).toBe(1);
});

test('2 + 3 = 5', () => {
    expect(fn.add(2,3)).toBe(5);
});

test('3 + 3 = 5', () => {
    expect(fn.add(3,3)).toBe(5);
});

test('3 + 3 != 5', () => {
    expect(fn.add(3,3)).not.toBe(5);
});
```
6. `npm test` 명령어를 실행하면 프로젝트 내 모든 테스트 파일들을 찾아서 테스트  
   (.test.js 로 끝나거나 __tests__폴더에 있는 파일들)  
   한 파일만 테스트하고 싶은 경우 `npm test <파일명 or 파일 경로>`
7. npm test 실행 시 결과값
```shell
> jest_tutorial@1.0.0 test /Users/leo/Documents/study/jest
> jest

 FAIL  ./fn.test.js
  ✕ 설명 :  (5 ms)
  ✓ 1은 1 (1 ms)
  ✓ 2 + 3 = 5 (1 ms)
  ✕ 3 + 3 = 5 (1 ms)
  ✓ 3 + 3 != 5

  ● 설명 : 

    expect(received).toBe(expected) // Object.is equality

    Expected: "기대되는 값"
    Received: "검증할 값"

      2 |
      3 | test('테스트 설명', () => {
    > 4 |     expect('검증 대상').toBe('기대 결과');
        |                     ^
      5 |     // .toBe 부분에서 사용하는 함수를 Matcher 라고 함 : toBe는 숫자나 문자 등 기본타입 값을 비교할 때 사용
      6 | });
      7 |

      at Object.<anonymous> (fn.test.js:4:21)

  ● 3 + 3 = 5

    expect(received).toBe(expected) // Object.is equality

    Expected: 5
    Received: 6

      16 |
      17 | test('3 + 3 = 5', () => {
    > 18 |     expect(fn.add(3,3)).toBe(5);
         |                         ^
      19 | });
      20 |
      21 | test('3 + 3 != 5', () => {

      at Object.<anonymous> (fn.test.js:18:25)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 3 passed, 5 total
Snapshots:   0 total
Time:        0.575 s, estimated 1 s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

## Test Mathcher
Mathcher : .toBe 부분에서 사용하는 함수

### Common Matchers
[https://jestjs.io/docs/en/expect](https://jestjs.io/docs/en/expect) 참고

#### `toBe()`
* 숫자나 문자 같은 원시데이터 일치 여부
* object 값에 사용하면 같은 객체를 가리키고 있는지 확인함 (객체의 내용이 같더라도 다른 메모리에 있는 객체면 false)
* 객체나 배열은 값을 재귀적으로 돌면서 확인해줘야하기 떄문에 toEqual() 사용해야 함
 
#### `toEqual()`
* 객체의 내용이 같은지 확인
* jest는 `toBe()` 대신 `toEqual()` 함수 사용을 추천함  
* 실제 테스트 코드 작성시에는 객체 검증할 일이 많기 떄문에 `toEqual()` 함수를 가장 많이 접함


### `toStrictEqual()`
* `toEqual()` 엄격 모드
* undefined 있을 시 에러 노출


#### `not`
* 불일치 여부 확인


### Truthiness

#### `toBeTruthy() / toBeFalsy()`
* true / false 확인

#### `toBeNull()`
* null 여부 확인

#### `toBeUndefined()`
* undefined 여부 확인

#### `toBeDefined()`
* toBeUndefined의 반대 경우 확인


### Numbers

#### `toBeGreaterThan()`
* 큰 숫자 여부 확인

#### `toBeGreaterThanOrEqual()`
* 같거나 큰 숫자 여부 확인

#### `toBeLessThan()`
* 작은 숫자 여부 확인

#### `toBeLessThanOrEqual()`
* 같거나 작은 숫자 여부 확인

#### `toMatch()`
* 같거나 작은 숫자 여부 확인


### Strings

#### `toMatch()`
* 정규식 사용해 문자열 일치 여부 확인


### Arrays and iterables

#### `toContain()`
* 배열이나 iteration 가능한 (set, map 등) 객체에 특정 요소 포함 여부 확인


### Exceptions

#### `toThrow()`
* 함수 호출시 에러 발생 여부 확인
* 단순 에러
* 특정 에러 지정


<br/>
<br/>
<br/>

> ### Reference
> * [Jest](https://jestjs.io/)
> * [Jest로 기본적인 테스트 작성하기](https://www.daleseo.com/jest-basic/)
> * [코딩앙마 - Jest](https://www.youtube.com/watch?v=g4MdUjxA-S4&list=PLZKTXPmaJk8L1xCg_1cRjL5huINlP2JKt&index=1)
> * [TDD를 적용해보자 2편-TDD 설정(React,Typescript)](https://velog.io/@xortm854/TDD%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90-2%ED%8E%B8TDD-%EC%84%A4%EC%A0%95ReactTypescript)
> * [Jest 사용법](https://velog.io/@modolee/jest-user-guide-04)
