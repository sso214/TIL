---
title : 콜 스택  
date : 2021.08.20
---

# Call Stack (콜 스택)

많은 성장을 이룬만큼 자바스크립트는 다양해지고 복잡해졌다.  
때문에 자바스크립트를 잘 이해하고 사용하기 위해서는 자바스립트의 내부동작을 이해해야 한다.  

자바스크립트는 하나의 스레드로 1개의 동시성만 다루는 언어.  
힙, 큐와 함께 구성하는 단일 콜스택을 가지며 V8 내부에 구현되어있음.


## 자바스크립트 Runtime(실행환경)
브라우저는 아래의 요소들로 구성되어 있음
* web API : DOM, AJAX, setTimeout 등
* 자바스크립트 엔진 : Memory Heap + Call Stack
* Event Queue : Web API 호출 통제
* Event Loop : Web API 호출 통제

## 자바스크립트 엔진
가장 많이 사용되는 자바스크립트 엔진은 구글의 V8 엔진.  
V8엔진은 크롬과 노드 안에서 동작하며, Memory Heap 과 Call Stack 으로 이루어져 있음   
* Memory Heap (메모리 힙) :   
  변수와 객체에 대한 모든 메모리 할당이 이뤄지는 곳
* Call Stack (콜 스택) :   
  코드 실행될 때 호출 스택 쌓임

## 콜스택
자바스크립트는 단일 스레드 프로그래밍 언어이기 때문에 단일 콜스택이 있음.  
단일콜 스택 = 한 번의 하나의 일만 처리 가능.  

콜스택이란?  
프로그램에서 현재 내가 있는 위치를 기록하는 데이터 구조. (함수의 호출 기록)     
콜스택의 각 항목을 스택 프레임이라고 함  
1. 파일 실행
2. 모든 실행의 시작이 되는 메인 함수를 찾음
3. 함수 실행
4. 해당 함수의 기록을 스택 맨 위에 추가 (push)
5. 완료 후 함수 반환 
6. 쌓여있던 함수 스택에서 제거 (pop)  

모든 것들은 짧은 시간 안에 처리됨 (jiffy time, ms)  
console에 찍힌 에러를 보면 현재 콜스택의 상태를 나타냄. 실패한 함수를 스택처럼 나열.  
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

크롬 브라우저는 16000 프레임의 제한된 사이즈 스택을 가지고 있어서 해당 범위를 넘어서면 스택 오버플로우 상태가 되고 실행 중이던 것을 죽임. 
ex) 무한 루프 재귀 함수  
```js
function test(){
    wow()
}

function wow(){
    test()
}

test()

```
```
index.js:6 Uncaught RangeError: Maximum call stack size exceeded
    at wow (index.js:6)
    at test (index.js:2)
    at wow (index.js:6)
    at test (index.js:2)
    at wow (index.js:6)
    at test (index.js:2)
    at wow (index.js:6)
    at test (index.js:2)
    at wow (index.js:6)
    at test (index.js:2)
```  

## 힙
거의 구조화되지 않은 영역으로 변수와 객체들의 모든 메모리 할당이 일어나는 부분

## 이벤트 큐
단일 콜스택은 멀티 스레드 환경에서 발생하는 복잡한 시나리오를 고려하지 않아도 되기 때문에 편리하지만,  
하나의 함수처리가 늦어지면 다음 함수 실행에도 지장을 주기 때문에 제한적임.  
이를 해결하기 위해 비동기 콜백을 사용.   
<br/>
코드 일부 실행를 실행 뒤 후 실행될 콜백함수를 스택에 넣는 형식이며,  
비동기 콜백은 정해진 시점에 실행되므로 다른 동기 함수와는 다르게 스택 안에 바로 push 될 필요 없음.  
큐는 실행될 콜백함수나 실행될 메시지들에 대한 리스트.  
<br/>
비동기 처리 과정
1. 이벤트 발생 (ex.버튼 클릭)
2. DOM 이벤트, HTTP 요청, setTimeout 등의 비동기 함수는 C++로 구현된 web API 호출
3. web API는 콜백 함수는 이벤트 큐에 밀어 넣음
4. 이벤트 큐는 대기하다가 스택이 비는 시점에 이벤트 루프를 돌림 (스택에 넣음)
5. 이벤트 루프는 역할대로 큐와 스택을 지켜보다가 스택이 비는 시점에 콜백을 실행시킴
6. 각 메시지와 콜백은 다른 메시지가 처리되기 전에 완전히 처리됨  

메시지들은 웹 브라우저에서 언제든 이벤트가 발생했을 때 추가됨. 그릐고 이벤트들에는 이벤트 리스너가 붙어있음.  
웹 브라우저에서 요소 클릭 -> 클릭 이벤트 핸들러가 큐에 메시지 추가  
이런 콜백 함수 호출은 콜스택 안에서 초기의 프레임 역할을 함.  

## 이벤트 루프
```js
setTimeout(function(){
  console.log('hello');
}, 0);

console.log('wow');
```
위의 코드처럼 setTimeout의 시간을 0으로 넣어도 결과값은 wow가 먼저 찍힘.  
비동기 콜백들은 코드에서 읽히자마자 실행되지 않고 잠시 후에 실행되기 때문에 동기 함수와 다르게 바로 스택내부로 push 될 수 없음.  



<br/>
<br/>
<br/>

> ### Reference
> * [DEV_NUNU](https://new93helloworld.tistory.com/358)
