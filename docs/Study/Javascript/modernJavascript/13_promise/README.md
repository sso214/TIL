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
  (A를 하고, A 완료될때까지 기다렸다가 B를 하고, B가 완료될때까지 기다렸다가 C를 수행하고 이런식)
* 콜백 지옥 : 콜백으로 여러 코드 블록을 차례로 연결해 작성할 때 발생하는 상황  
  (기다리는 시점마다 콜백을 사용해야 하기 때문에 코드가 복잡해짐)
```js
//피자를 준비하는 각 단계마다 서버에 요청을 보내야 하고, 서버가 응답할때까지 기다렸다가 다음 단계를 수행해야하는 비동기적 상황
const makePizza = (ingredients, callback) => { 
    mixIngredients(ingredients, function(mixedIngredients){
        backPizza(mixedIngredients, function(bakedPizza){
            console.log('finished!'); //과도한 함수 중첩이 됨
        })
    })
}
```

## 프로미스
* 프로미스는 비동기 작업의 최종 성공 또는 실패를 나타내는 객체
* 프로미스의 성공을 알리기 위해서는 resolve, 실패를 알리기 위해서는 reject 호출
* setTimeout() 사용 시 resolve가 호출되기 전까지 일정시간을 기다릴 수 있음
* 프로미스가 성공할 때의 값을 얻는 데에 `.then()` 사용, 실패할 때의 오류를 처리하는데에 `.catch()` 사용
```js
const myPromise = new Promise((resolve, reject) => {
    resolve('The value we get from the promise');//resolve 호출
});
myPromise.then(data => {
    //resolve 함수의 첫번째 매개변수로 전달된 값이 콘솔에 출력
    console.log(data); //The value we get from the promise
})

//setTime 사용
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('The value we get from the promise');
    }, 2000);
});
myPromise.the(data => {
    console.log(data);
}); //2초 지난 후 The value we get from the promise

//reject를 이용한 오류 처리
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('this is our error')); 
        //reject(New Error('')) 를 사용했기 때문에 출력된 오류 로그 보면 오류 발생 위치 알 수 있음
    }, 2000);
});

myPromise.then(data => { //성공할 때의 값 얻을 때 .then() 사용
    console.log(data);
}).catch(err => { //실패할때 오류 처리할때 .catch() 사용
    cosnole.log(error);
});
//Error : this is out error
//Stack trace;
//myPromise</<@debugger eval code
```


## 프로미스 체이닝
* 프로미스의 성공 실패 여부 무관하게 이전 프로미스에서 반환된 것을 후속 프로미스의 기반으로 사용해 프로미스를 계속 체이닝 할 수 있음
* 원하는 만큼 많은 프로미스를 연결할 수 있으며 콜백 지옥의 코드보다 더 읽기 쉽고 간결함
```js
const myPromise = new Promise((resolve, reject) => {
    resolve();
});

myPromise.then(data => {
  //새로운 값 반환 
  //.then()이 다음 .then()으로 값을 전달해 해당 값이 로그로 출력
  return 'working...';
}).then(data => {
  //이전 프로미스에서 받은 값 출력
  //두번째 .then()이 발생시킨 오류는 .catch()로 전달되 오류 로그 출력
  console.log(data);
  throw 'failed!';
}).catch(err => {
  //프로미스 수행 중 발생한 오류 받아 출력
  console.log(err); //failed!
});

//프로미스 실패한 경우 연쇄적으로 연결
const myPromise = new Promise((resolve, reject) => {
    resolve();
});
myPromise.then(data => {
    throw new Error('ooops'); //여기서 에러 발생
    console.log('first value'); //출력되지 않음
}).catch(() => {
    console.log('catched an error');
}).then(data => {
    console.log('second value');
});
//catched an error
//second value
```


## `Promise.resolve()` 와 `Promise.reject()`
* `Promise.resolve()`와 `Promise.reject()`는 자동으로(즉시) 성공하거나 실패하는 프로미스를 생성
* then 절에서 생성된 프로미스에는 프로미스가 성공할 때 호출되는 함수와 실패할 때 호출되는 함수 두개의 인수가 존재
* Promise.resolve()는 즉시 프로미스를 성공처리하므로 첫번째 함수 호출
* Promise.reject()는 프로미스를 즉시 실패처리하므로 두번째 인수 호출
```js
//Promise.resolve()
Promise.resolve('Success').then(function(value) {
    console.log('Success'); //Success
}, function(value){
    console.log('fail');
});

//Promise.reject()
Promise.reject(new Error('fail')).then(function(){
    //not called
}, function(error){
    console.log(error); //Error: fail
});
```


## `Promise.all()` 과 `Promise.race()`
### `Promise.all()`
* Promise.all()은 모든 프로미스가 성공할 경우에만 성공하는 하나의 프로미스를 반환
```js
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'first value');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'second value');
});

promise1.then(data => { //각 프로미스는 독립적으로 성공처리 됨
    console.log(data); //500ms 후 first value
});
promise2.then(data => { //각 프로미스는 독립적으로 성공처리 됨
    consol.log(data); //1000ms 후 second value 
});

Promise.all([promise1, promise2]).then(data => { //비어있는 이터러블 전달 시 이미 성공 처리된 프로미스 반환
    const [promise1data, promise2data] = data;
    console.log(promise1data, promise2data);
});
// 1000ms (두번째 프로미스 타임아웃) 후 첫번째, 두번째 프로미스 결과 같이 반환
// 첫번째 프로미스 성공 후에도 두번째 프로미스가 성공할때까지 대기
// first value second value
```
* 프로미스 중 하나가 실패하면 다른 프로미스들이 성공하더라도 해당 실패에서 발생한 오류 반환
```js
const promise1 = new Promise((resolve, reject) => {
    resolve('my first value');
});
const promise2 = new Promise((resolve, reject) => {
    reject(Error('ooooops error'));
});

//.all()은 두 프로미스 중 하나라도 실패하면 전체를 실패로 처리
Promise.all([promise1, promise2]).then(data => {
    const [promise1data, promise2data] = data;
    console.log(promise1data, promise2data);
}).catch(err => {
    console.log(error); //Error :ooooops error
})
```

### `Promise.race()`
* `Promise.rece`는 `Promise.all()`과 달리 이터러블에 포함된 프로미스들 중 가장 먼저 성공 또는 실패한 결과를 반환
* 비어있는 이터러블 전달 시 .race()는 영원히 보류 상태로 남음
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'first value');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeou(resolve, 100, 'second value');
});

Promise.race([promise1, promise2]).then(function(value) {
    console.log(value); //둘 다 성공하지만 promsise가 더 빨리 성공
}); //second value
```


## 문제
```js
function myPromise(){
    return new Promise((resolve, reject) => {
        reject();
    });
}
myPromise().then(() => {
    console.log(1); //myPromise가 reject만 호출하기 때문에 실패
}).then(() => {
    console.log(2); //myPromise가 reject만 호출하기 때문에 실패
}).catch(() => {
    console.log(3); //실행
}).then(() => {
    console.log(4); //.catch()에 의해 생성된 프로미스와 연결되어있는 마지막 .then()은 .catch()가 완료되면 호출되므로 호출됨
});
//3.4 출력됨
```
