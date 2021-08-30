---
title: 제너레티어  
date: 2021.08.30
---

# 제너레이터
* 제너레티어 함수는 원하는 만큼 코드 실행을 시작하거나 중지할 수 있는 함수
* 중지된 제너레이터 함수를 다시 시작할 때 데이터를 추가로 전달하면서 재시작 가능
```js
function* fruitList(){
    yield 'Banana';
    yield 'Apple';
    yield 'Orange';
}

const fruits = fruitList();

//제너레이터
fruits.next(); //{value: 'Banana', done:false}
```
