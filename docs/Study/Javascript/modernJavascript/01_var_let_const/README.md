---
title : var, let, const  
date: 2021.08.22
---

# var, let, const 

## var, let, const의 차이

### var
* 함수 스코프에 종속
* 블록 스코프에서 사용하면 블록 스코프 외부에서도 사용 가능

```js
for (var i = 0; i < 10; i++) {
    var hi = "Hello";
}
console.log(hi); //"Hello"; 블록 스코프 벗어나도 접근 가능

function myFunc(){
    var functionScoped = "function Scope";
    console.log(functionScoped);
}
myFunc(); //"function Scope";
console.log(functionScoped); //ReferenceError: functionScope is not defined
//함수 스코프 내에 제한되어 함수 외부에서 접근 불가능
```

### let
* 블록 스코프에 종속 (변수가 선언된 블록과 그 하위 블록)
```js
// let 사용
let x = "global";

if (x === "global") {
    let x = "bloack-scoped";
    console.log(x); //"bloack-scoped"
}
console.log(x); //"global"

// var 사용
var y = "global";
if(y === "global") {
    y = "block-sciped";
    console.log(y); //"block-sciped"
}
console.log(y); //"block-sciped"
```

### const
* let과 마찬가지로 블록 스코프에 종속
* 재할당을 통해 값이 변경될 수 없으며 다시 선언될 수 없음
* const로 선언된 변수가 불변이라는 의미는 아님 (객체의 경우)
```js
const constant = "I am a constant";
constant = "I can't be reassigned"; // Uncaught TypeError : Assignment to constant variable
```

### const에 객체가 담겼다면?
* 변수 전체를 재할당하는 것이 아니라 속성 중 하나만 재할당 하는 경우 문제 없음
* 객체 내용을 변경할 수 없게 const 객체를 고정할 수는 있음 (But. 자바스크립트가 오류 던지지는 않음)
```js
const person = {
    name: 'leo',
    age: 25,
};
person.age = 26;
console.log(person.age); //26

Object.freeze(person); //변경 못하게 const 객체 고정 
person.age = 30;
console.log(person.age) //26 (에러는 뜨지 않음)
```


## TDZ
* temporal dead zone : 일시적 비활성 구역
* 호이스팅(hoisting) : 코드 실행 전에 처리되고 해당 스코프 상단으로 올라가는 현상 (블록 스코프던 글로벌스코프던)
* var, let, const 모두 호이스팅의 대상이 됨
* var는 정의되기 전에 접근 가능 : undefined 값을 가지게 됨 
* let과 const는 정의하기 전에 접근 불가능 : 변수가 선언될 때까지 일시적으로 TDZ에 있게 됨
```js
console.log(i); //undefined
var i = "I am a variable";

console.log(j); //ReferenceError : can't access lexiacal declaration 'j' before initialization
let j = "I am a let";
```


## var, let, const를 적재적소에 쓰는 법
따로 정해진 규칙은 없으며 개발자들 사이에서도 의건이 갈림  

마티어스 바인스의 의견  
* 기본적으로 const를 사용
* 재할당 필요한 경우에만 let 사용
* var는 ES6에서 절대 사용하지 않음

카일 심슨의 의견
* 여러 큰 스코프에서 공유하기 위한 최상위 변수에는 var 사용
* 작은 스코프의 로컬 변수에는 let 사용
* 코드 작성이 어느정도 진행된 후에만 let을 const로 리팩터링.  
  (변수 재할당을 막아야 하는 경우가 확실할 때)
  
자신이 직접 사용하며 연구해보고 어떤 방향이 좋을지 선택하는게 좋음
