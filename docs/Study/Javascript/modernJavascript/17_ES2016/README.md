---
title : ES2016의 새로운 기능  
date : 2021.09.01
---

# ES2016의 새로운 기능
ES2016에서는 두 가지 기능이 새롭게 도입됨
* Array.prototype.includes()
* 지수 연산자(**)

## Array.prototype.includes()
* includes() : 배열에 특정 원소가 포함되어있으면 true 반환, 아니면 false 반환
```js
let array = [1,2,3,4];
array.includes(3); //true
array.includes(6); //false
```

### includes()를 인덱스와 함께 사용하기
* includes()에 인덱스를 추가해 원소 검색 가능함
* 기본값은 0. 음수 전달도 가능 (음수 전달 시 배열의 마지막 원소부터 검색)
* `includes(검색할 원소, 검색 시작한 index)`
```js
let array = [1,3,5,7,9,11];
array.includes(3,1); //true : index 1부터 시작해서 3 검색
array.includes(5,4); //false : index 5부터 시작해서 4 검색
array.includes(1,-1); //false : 배열 끝에서 첫 번째 인덱스부터 숫자 1 검색
array.includes(11,-3); //true : 배열 끝에서 3 번째 인덱스부터 숫자 1 검색
```


## 지수 연산자
* 지수 연산자는 여러 연산을 결합할 때 유용
```js
//ES2016 전의 지수 계산 방식
Math.pow(2,2); //4
Math.pow(2,3); //8
Math.pow(Math.pow(2,2),2); //16 : Math.pow 사용 시 함수를 계속 이어붙여야 해서 가독성 떨어짐

//지수 연산자 사용
2 ** 2; //4
2 ** 3; //8
2 ** 2 ** 2; //16
```
