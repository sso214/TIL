---
title : ES2017 - async와 await  
date : 2021.09.02
---

# ES2017 - async와 await
ES2017에서 async/await 키워드 이용한 새로운 프로미스 작업 방식 도입

## 프로미스 다시 보기
```js
//프로미스 예시 1
fetch('https://api.github.com/users/AlbertoMontalesi').then(res => {//api 호출
    return res.json(); //응답을 json 형태로 반환
}).then(res => {
    //성공 시 데이터 출력
    console.log(res);
}).catch(err => {
    //실패 시 오류 출력
    console.log(err);
});

//프로미스 예시 2
function walk(amount) {
    return new Promise((resolve, reject) => {
        if(amount < 500) {
            reject ('the value is too small');
        }
        setTimeout(() => resulve(`you walked for ${amount}ms`), amount);
    });
}
walk(1000).then(res => {
    console.log(res);
    return walk(500);
}).then(res => {
    console.log(res);
    return walk(700);
}).then(res => {
    console.log(res);
    return walk(800);
}).then(res => {
    console.log(res);
    return walk(100);
}).then(res => {
    console.log(res);
    return walk(400);
}).then(res => {
    console.log(res);
    return walk(600);
});
// you walked for 1000ms
// you walked for 500ms
// you walked for 700ms
// you walked for 800ms
// uncaught exception : the value is too small
```


## async / await
* 비동기 함수를 만들려면 함수 앞에 async 키워드 넣어야 함  
    - async는 자바스크립트에게 항상 프로미스를 반환하도록 지시 
    - 비동기 함수 내 프로미스가 아닌 값을 반환하게 작성하면 자바스크립트가 해당 값을 자동으로   
      프로미스로 감싼 후 반환
* await는 프로미스가 결과를 반환할 때까지 기다리도록 자바스크립트에 지시함  
  (await 키워드는 비동기 함수 내에서만 사용 가능)
```js
function walk(amount) {
    return new Promise((resolve, reject) => {
        if(amount < 500) {
            reject('the value is too small');
        }
        setTimeout(() => resolve(`you walked for ${amount}ms`), amount);
    });
}

async function go(){ //비동기 함수 선언
    const res = await walk(500); //프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    console.log(res);
    const res2 = await walk(900);
    console.log(res2);
    const res3 = await walk(600);
    console.log(res3);
    const res4 = await walk(700);
    console.log(res4);
    const res5 = await walk(400);
    console.log(res5);
    console.log('finished');
}
go();
//you walked for 500ms
//you walked for 900ms
//you walked for 600ms
//you walked for 700ms
//uncaught exception : the value is too small


//비동기 함수가 아닌 곳에서 await 사용 -> 에러 발생
function func(){
    let promise = Promise.resolve(1);
    let result = await promise;
}
func(); //SyntaxError : await is only valid in async functions and async gener-ators

let response = Promise.resolve('hi');
let result = await response;  //SyntaxError : await is only valid in async functions and async gener-ators
```


## 오류 처리
보통 try ... catch 구문 사용해 오류 처리하지만 해당 구문 없이도 오류 처리 가능
```js
//try ... catch 구문 사용
async function asyncFunc(){
    try {
        let response = await fetch('api url');
    } catch(err) {
        console.log(err);
    }
}
asyncFunc(); //TypeError : faild to fetch

//try ... catch 구문 사용 X
async function asyncFunc2(){
    let response = await fetch('api url');
}
asyncFunc2(); //Uncaught (in promise) TypeError: Failed to fetch
asyncFunc2().catch(console.log); //TypeError: Falied to fetch
```
