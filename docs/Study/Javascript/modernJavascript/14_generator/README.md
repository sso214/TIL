---
title: 제너레티어  
date: 2021.08.30
---

# 제너레이터

## 제너레이터
* 제너레티어 함수는 원하는 만큼 코드 실행을 시작하거나 중지할 수 있는 함수
* 중지된 제너레이터 함수를 다시 시작할 때 데이터를 추가로 전달하면서 재시작 가능
```js
function* fruitList(){ //function* 을 사용해 함수 선언
    yield 'Banana'; //반환할 컨텐츠 앞에 yield 키워드 사용
    yield 'Apple';
    yield 'Orange';
}
const fruits = fruitList();

//제너레이터
//.next() 사용해 함수 실행 시작
fruits.next(); //{value: "Banana", done:false}
fruits.next(); //{value: "Apple", done:false}
fruits.next(); //{value: "Orange", done:false}
fruits.next(); //{value: undefined, done:true}
//마지막으로 .next()를 호출하면 undefined 값과 done:true가 반환
//예시의 함수는 각 .next() 호출 사이에서 일시 중지된 상태에 있음
```


## 제너레이터를 사용하여 배열 반복하기
for of 루프 사용 시 제너레이터에 대해 반복하고 각루프에서 콘텐츠를 반환(yield)할 수 있음
```js
//배열 생성
const fruitList = ['Banana', 'Apple', 'Orange', 'Melon', 'Cherry', 'Mango'];
//제너레이터 생성
function* loop(arr) {
    for(const item of arr) { //제너레이터는 배열을 반복함
        yield `I like to eat ${item}s`;
    }
}

const fruitGenerator = loop(fruitList);
fruitGenerator.next(); //{value: "I like to eat Bananas", done:false}
fruitGenerator.next(); //{value: "I like to eat Apples", done:false}
fruitGenerator.next().value; //I like to eat Oranges
//.next() 호출할 때마다 한번에 하나의 값 출력
```


## `.return()`을 사용하여 제너레이터 종료하기
`.return()`을 사용해 주어진 값을 반환하고 제너레이터를 종료할 수 있음
```js
function* fruitList(){
    yield 'Banana';
    yield 'Apple';
    yield 'Orange';
}
const fruits = fruitList();
//return에 하무것도 전달하지 않았기 떄문에 value:undefined
fruits.return(); //{value:undefined, done:true}
```


## `.throw()`로 오류 잡기
제너레이터는 `.throw()`를 호출했을 때 오류를 반환했고, 실행할 수 있는 yield가 남아있어도 종료함
```js
function* gen(){
    try {
        yield 'Trying...';
        yield 'Trying harder...';
        yield 'Trying even harder...';
    }
    catch(err) {
        console.log("Error : " + err);
    }
}

const myGenerator = gen();
myGenerator.next(); //{value: "Trying...", done:false}
myGenerator.next(); //{value: "Trying harder...", done:false}
myGenerator.throw("ooops"); 
//Error: ooops 
//{value:undefined, done:true}
```


## 제너레이터와 프로미스를 같이 사용하기
* 프로미스는 비동기 프로그래밍에 매우 유용. 제너레이터와 같이 사용하면 콜백 지옥같은 문제를 방지할 수 있음
* 제너레이터와 프로미스를 같이 사용할 경우 마치 동기 코드처럼 느껴지게 비동기 코드 작성이 가능
```js
const myPromise = () => new Promise((resolve, reject) => {
    resolve('our value is ...');
});

function* gen(){
    let result = "";
    yield myPromise().then(data => {result = data}); //프로미스를 반환
    yield result + ' 2'; //프로미스 결과 기다린 후 이 값 사용
};

//비동기 함수 호출
const asyncFunc = get();
const val1 = asyncFunc.next(); //.next() 처음 호출 시 프로미스 반환
console.log(val1); //{value:Promise, done:false}

//프로미스 완료되길 기다린 후 .next() 호출
val1.value.then(() => {
    //제너레이터 내부에서는 프로미스에서 반환한 값을 사용해 작업 수행함
    console.log(asyncFunc.next()); // {value:"our value is ... 2", done:false}
});
```
