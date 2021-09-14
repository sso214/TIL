---
title : 함수와 블록 스코프
date : 2021.09.06
---

# 함수와 블록 스코프

## 스코프
스코프는 어떤 변수에 접근할 수 있는지 정의하며 전역 스코프와 지역 스코프가 존재함

### 전역 스코프 (Global Scope)
* 변수가 모든 함수에 속하지 않고 속해있는 `{}`괄호도 없다면 해당 변수를 전역변수라고 함  
  (Node.js에서의 전역 변수 선언은 약간 다름)  
* 전역변수를 선언 시, 코드 어디에서든 사용할 수 있음 (함수 내부에서도)
* 네이밍 충돌이 발생할 확률 있기 때문에 전역 변수에서 변수 선언하지 않는 걸 권장  
  const, let 키워드로 변수 선언 시 중복 선언했을 경우 에러가 뜨지만,   
  var 키워드로 변수 선언 시 중복 선언을 했을 경우 변수를 덮어쓰게 됨 (디버그하기 힘듬)
* 전역 변수 사용을 자제하고 지역변수 사용을 지향
```js
const hello = "Hello!"; //전역변수 선언

function sayHello (){
    console.log(hello);
}
console.log(hello); //"Hello!
sayHello(); //"Hello!

var things = "something";
var things = "something else";
console.log(things); //"something else"

let things2 = "something"
let things2 = "something else" //Error, thing has already decleared
```

### 지역 스코프 (Local Scope)
코드 내 특정 구역에서만 사용할 수 있는 변수를 지역변수라고 함   
JS에는 함수 스코프 지역 변수, 블록 스코프 지역 변수 두 가지 종류의 지역 변수가 있음

#### 함수 스코프 (Function Scope)
함수 내에서 변수 선언 시, 함수 내에서만 변수에 접근이 가능함  
(함수 밖에서는 함수 내부의 변수에 접근 불가능)
```js
function sayHello(){
    const hello = "Hello!";
    console.log(hello);
}
sayHello(); //"Hello!"
console.log(hello); //Error, hello is not defined
```

#### 블록 스코프 (Block Scope)
변수를 `{}`괄호 안에 const나 let 키워드로 선언했을 때, `{}`괄호 안에서만 변수에 접근 가능함  
블록 스코프는 함수 스코프의 부분집합 (함수는 `{}` 괄호로 작성되어야 하기 때문)
```js
{
    const hello = "Hello!";
    console.log(hello); //"Hello!"
}
console.log(hello); //Error, hello is not defined
```

### 함수 호이스팅과 스코프
* 호이스팅 : 끌어올리다  
* function 키워드와 함께 선언된 함수들은 항상 현재 스코프의 가장 위로 호이스팅 됨  
  (함수 표현식으로 작성된 함수들은 호이스팅 되지 않음)
* 헷갈릴 수 있고, 버그가 일어날 수 있으므로 항상 함수는 사용전에 미리 선언!
```js
//작성한 코드
sayHello();
function sayHello(){
    console.log("Hello!");
}

//호이스팅됨
function sayHello(){
  console.log("Hello!");
}
sayHello();

//함수 표현식으로 작성된 함수
sayWow(); //Error, sayHello is not defined
const sayWow = function(){
    console.log('Wow!');
}
```

### 함수는 각자의 스코프에 접근할 수 없다
함수 각각 선언 시, 함수는 다른 함수의 스코프에 접근할 권한이 없음 
(심지어 함수 내에서 다른 함수 호출하더라도 스코프 사용 불가)  
```js
function first(){
    const firrstFunctionVariable = "I'm part of first";
}
function second(){
    first();
    console.log(firrstFunctionVariable); //Error, firstFunctionVariable is not defined
}
```

### 내부 스코프 (Nested Scope)
어휘적 스코프 : 함수가 다른 함수 안에서 만들어졌을 때 안쪽 함수는 바깥 함수의 변수에 접근 가능한 것.  
(바깥 함수에서 안쪽 함수의 변수에는 접근 권한이 없음)
```js
function outerFunction(){
    const outer = "I'm the outer function!";
    function innerFunction(){
        const inner = "I'm the inner function!";
        console.log(outer); //I'm the outer function!
    }
    console.log(inner); //Error, inner is not defined
}
```


## 클로져 (Closures)
함수 안에서 다른 함수를 만들 때마다 사실 클로져를 만든 것 (안쪽 함수가 클로져)  
일반적으로 반환시키기 위해 클로져를 만들고 반환된 클로져를 이용해 바깥 함수의 변수들을 사용할 수 있음
```js
function outerFunction(){
    const outer = "I see outer variable";
    function innerFunction(){
        console.log(outer);
    }
    return innerFunction;
}
outerFunction()(); //"I see outer variable"
```

안쪽 함수가 반환되는 기능 구현 시 함수 선언 중 반환문을 작성함으로써 코드의 길이를 줄일 수 있음
```js
function outerFunction(){
  const outer = "I see outer variable";
  return function innerFunction(){
    console.log(outer);
  }
}
outerFunction()(); //"I see outer variable"
```

클로져가 사용되는 경우 
1. side effects를 제어하기 위해 (side effects : 어떤 함수 내에서 자신의 스코프가 아닌 변수들을 제어하는 것을 말함)
2. private 변수를 만들기 위해

### 클로져로 사이드 이펙트 제어하기
함수에서 값을 반환하는 것 별도의 무언가를 하는 경우 사이드 이펙트가 발생할 수 있음  
(Ajax 요청, timeout, console.log() 등)  
```js
function(x) {
    console.log('A console.log is a side effect!');
}
```
사이드 이펙트를 제어하기 위해 클로져를 사용 시 만든 Ajax나 timeout 같은 코드를 망칠 수 있음을 고려해야 함
```js
function makeCake(flavor) {
  setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000);
}
```

### 클로져로 private 변수 만들기


## 개발자도구로 스코프 디버깅하기
