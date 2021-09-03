---
title : 콜 스택  
date : 2021.08.20
---

# Call Stack (콜 스택)
---
* 콜스택이란? JS가 함수 실행을 핸들하는 방법 중 하나
* 자바스크립트는 하나의 스레드로 1개의 동시성만 다루는 언어 (한 번에 1개 작업만)
* 힙, 큐와 함께 구성하는 단일 콜스택 가짐. (V8 내부에 구현)

## 자바스크립트 엔진
* 가장 많이 사용되는 자바스크립트 엔진 - Google V8
* 크롬, Node.js에서 사용
* Memory Heap + Call Stack 으로 이루어짐
  * Memory Heap : 메모리 할당 일어나는 곳
  * Call Stack : 코드 실행에 따라 호출 스택 쌓임


## 자바스크립트 Runtime(실행환경)
브라우저는 아래의 요소들로 구성되어 있음
* 자바스크립트 엔진 : Memory Heap + Call Stack
* web APIs : 브라우저 내장 API (ex. DOM, AJAX, setTimeout 등)
* Event Queue : Web API 호출 통제
* Event Loop : Web API 호출 통제


## 콜스택
JS : 싱글 쓰레드 기반 언어 (호출 스택이 1개 = 한번에 한 작업)
  
### 콜 스택이란?
* 프로그램 상 내가 어디에 위치하는지를 기록하는 자료구조 (함수의 호출 기록)
* 콜 스택의 각 단계 = 스택 프레임
  
### 콜 스택 과정
모든 과정이 짧은 시간 안에 처리됨 (jiffy time, ms)
1. 파일 실행
2. 모든 실행의 시작인 메인 함수 검색
3. 함수 실행
4. 해당 함수를 콜스택 가장 상단에 추가(push)
5. 실행 완료 후 함수 반환
6. 해당 함수를 콜 스택에서 제거(pop)

### 스택 오버플로우
에러 발생 시 콘솔을 확인하면 Stack Trace가 오류 발생하기까지의 스택 트레이스들로 구성   
(에러 났을 때의 콜스택 단계)
```js
function foo() {
  throw new Error('oops');
}

function bar() {
  foo()
}

function baz() {
  bar()
}

baz();
```
```
  Uncaught Error: oops
  at foo (index.js:2)
  at bar (index.js:6)
  at baz (index.js:10)
  at index.js:13
```
크롬 브라우저는 16000 프레임의 제한된 사이즈 스택을 가지고 있어 해당 범위를 넘어서면 스택 오버플로우 상태가 되고 실행 중이던 것을 죽임 (ex. 무한 루프 재귀 함수)  
```js
function foo(){
    foo()
}
foo(); // Uncaught RangeError: Maximum call stack size exceeded
```

### 콜 스택의 문제점
* 싱글 쓰레드는 멀티 쓰레드 환경에서 발생하는 복잡한 시나리오를 고려할 필요 없음 = 편함. But 제한적
* 하나의 함수처리가 매우 느린 경우 다른 함수 실행에 지장을 줌 (심지어 응답을 멈추기도 함)
* 해결방안 : 비동기 콜백 사용 => 동기 함수와 다르게 스택 안에 바로 push 될 필요 없음  
  (코드 일부 실행 뒤 실행될 콜백함수를 스택에 넣는 형식)
* 이벤트 큐가 콜백 함수들을 관리


## 이벤트 큐
* 실행할 콜백함수와 처리될 메세지들에 대한 리스트
* 웹 브라우저에서 이벤트 발생 시 메세지들 추가. 이벤트들에는 이벤트 리스너가 붙어 있음  
  (웹 브라우저에서 요소 클릭 -> 클릭 이벤트 핸들러가 큐에 메시지 추가)

### 비동기 처리 과정
1. 이벤트 발생 (ex. 버튼 클릭)
2. 비동기 함수(ex. DOM 이벤트, HTTP 요청, setTimeout)는 C++로 구현된 web API 호출
3. web API가 콜백 함수를 이벤트 큐에 밀어 넣음
4. 이벤트 큐는 대기하다가 스택이 비는 시점에 이벤트 루프 돌림 (스택에 넣음)
5. 이벤트 루프는 역할대로 큐와 스택을 지켜보다가 스택이 비는 시점에 콜백을 실행시킴
6. 각 메시지와 콜백은 다른 메시지가 처리되기 전에 완전히 처리됨


## 이벤트 루프
* 비동기 콜백은 코드에서 읽히자마자 실행되지 않고 잠시 후에 실행되기 때문에 동기 함수와 달리  
  바로 스택 내부로 push 될 수 없음
* 때문에 setTimeout 시간을 0으로 넣어도 wow가 먼저 찍힘
```js
setTimeout(function(){
  console.log('hello');
}, 0);

console.log('wow');
//wow
//hello
```

## 콜 스택과 이벤트 루프 과정
```js
setTimeout(() => {
    console.log('hi');
}, 1000);
```
1. 코드 실행
2. 글로벌 스택 프레임이 콜 스택(LIFO:Last In First Out)에 push
3. 코드 첫번째 라인 실행 (setTimeout) -> 실행된 함수 스택 안에 넣음
4. setTimeout 실행 시 Web API 호출
5. setTimeout 실행 끝남 -> setTimeout으로 호출된 Web API는 요청된 시간 동안 대기
6. 실행할 자바스크립트 코드가 없기 때문에 호출 스택 비워짐
7. Web API의 timeout 만료되면 Web API는 이벤트 루프(FIFO : First In First Out)에 코드를 추가해 자바스크립트에 알림 
   (콜 스택에 이미 실행중인 코드가 존재할 수 있으므로, 이벤트 루프는 대기중인 함수를 콜스택에 바로 push 하지 않음)
8. 콜 스택 빌 때마다 자바스크립트 런타임은 이벤트 루프에 대기중 항목이 있는지 확인
9. 대기중 항목이 존재하면 콜스택으로 이동(push)해 함수 실행
10. 함수 실행 -> 코드 내부 console.log 호출 -> 콜 스택 push -> console.log 실행 완료 -> 콜 스택에서 제거
11. 함수 반환됐으므로 콜스택에서 제거 -> 종료


<br/>
<br/>
<br/>

> ### Reference
> * [DEV_NUNU](https://new93helloworld.tistory.com/358)
> * [자바스크립트의 동작원리: 엔진, 런타임, 호출 스택](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)
