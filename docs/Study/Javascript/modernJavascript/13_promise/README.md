---
title : 프로미스  
date : 2021.08.28
---

# 프로미스
* 자바스크립트는 동기적으로 작동 (각 코드 블록이 이전 블록 이후에 실행)
* 비동기적 함수 사용 시 콜백, 프로미스를 이용해 반환 시점까지 기다릴 수 있음
```js
const data = fetch('your-api-url'); //어떤 URL에서 데이터를 가져옴
//동기 코드의 경우, fetch 작업이 실제로 완료된 후에 다음행이 호출된다고 예상하지만 실제로는
//fetch가 호출된 직후 바로 다음행에 있는 console.log()도 실행됨.되
//fetch가 비동기적으로 수행되기 떄문 (fetch가 완료될때까지 코드 실행 중지가 안리ㅏ 계속해서 다음행 실행)
console.log('finished');
console.log(data); //결국 undefined 출력
```

## 콜백 지옥
* 콜백 : 비동기 코드를 동기식으로 작동하는 것처럼 하기 위해 사용
* 콜백 지옥 : 콜백으로 여러 코드 블록을 차례로 연결해 작성할 때 발생하는 상황
```js
const makePizza = (ingredients, callback) => {
    mixIngredients(ingredients, function(mixedIngredients){
        backPizza(mixedIngredients, function(bakedPizza){
            console.log('finished!');
        })
    })
}
```

## 프로미스


## 프로미스 체이닝


## `Promise.resolve()` 와 `Promise.reject()`


## `Promise.all()` 과 `Promise.race()`
