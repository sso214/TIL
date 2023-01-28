---
title : forEach()와 map()과 reduce()  
date : 2021.09.02
---

# forEach()와 map()과 reduce()  
2021.09.02

forEach()와 map(), reduce()는 모두 배열을 이용하는 메서드이다.  
배열을 값을 조작하고 원하는 결과값을 도출해낸다.  


* forEach()  
  배열 요소마다 한 번씩 주어진 콜백 함수 실행  
  리턴 값을 반환하지 않고 기존의 Array 변경 (반환 값 버리고 정의되지 않은 값 반환)    
  map()으로 할 수 있는 일은 forEach()로도 할 수 있음
  
* map()
  배열 요소마다 주어진 콜백 함수 호출 결과를 모아 새로운 배열을 반환 (메모리 할당하고 반환 값 저장)  
  새로운 Array 반환
  forEach()로 할 수 있은 일은 map()으로도 할 수 있음
  
* reduce()  
  이전값, 현재값, index, 배열을 인자로 받을 수 있음  
  map과 달리 배열이 아닌 하나의 값으로 출력함
  
```js
const arr = [1,2,3,4,5];
const forEachSample = [];

//forEach
arr.forEach(num => forEachSample.push(num + 1));
const forEachReturn = arr.forEach(function(value) {
    return value;
});
console.log(forEachReturn); //undefined

//map
const mapSample = arr.map(num => num + 1);
const mapReturn = arr.map(function(value) {
    return value;
});
consoe.log(mapReturn); //[1,2,3,4,5]

//reduce
let reduceSample = arr.reduce(function(preValue, currentValue){
    return preValue + currentValue;
    // preValue만 리턴 시 배열의 첫번째 요소 리턴
    // currentValue만 리턴 시 배열의 마지막 요소 리턴
});
console.log(reduceSample); //15
```
