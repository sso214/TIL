---
title : 암묵적 타입 변환  
date : 2021.08.30
---

# 암묵적 타입 변환

## 자바스크립트의 암묵적 타입 변환

### 자바스크립트의 암묵적 타입이란?
* 예상치 못한 타입을 받았을 때 예상 가능한 타입으로 변경해주는 것.  
* 사용자가 맞지 않는 타입을 넘겼을 경우 자바스크립트 엔진은 사용자가 잘못 넣은 타입을  
  올바른 타입으로 변환하려고 시도함
* 자바스크립트의 주요한 기능이지만 가장 피해야할 기능
```js
console.log(3 * "3"); //9
console.log(1 + "2" + 1); //121
console.log(true + true); //2
console.log(10 - true); //9

const foo = {valueOf: () => 2};
console.log(3 + foo); //5
console.log(4 * foo); //8

const bar = {toString: () => " promise is a boy :)"};
console.log(1 + bar); //"1 promise is a boy :)"

console.log(4 * []); //0
console.log(4 * [2]); //8
console.log(4 + [2]); //"42"
console.log(4 + [1,2]); //"41, 2"
console.log(4 * [1,2]); //NaN

console.log("string" ? 4 : 1); //4
console.log(undefined ? 4 : 1); //1
```


## 숫자 표현식에서 숫자가 아닌 값

### 문자열
숫자 표현식에서 문자열을 피연산자로 넘겼을 경우에는 문자열을 인자로 Number 함수를 불러오는 것과 비슷함
* 숫자 문자를 가진 경우 : 동등한 숫자로 바뀜
* 문자열에 숫자가 아닌 것이 포함되어있을 경우 : NaN 리턴
```js
3 * "3" //3 * 3
3 * Number("3") //3 * 3
Number("5") //5

Number("1.") //1
Number("1.34") //1.34
Number("0") //0
Number("012") //12

Number("1,") //NaN
Number("1+1") //NaN
Number("1a") //NaN
Number("la") //NaN
Number("one") //NaN
Number("text") //NaN
```

### +연산자
* \+ 연산자는 다른 수학적 연산자들과 달리 2가지의 기능을 함 (수학적 덧셈, 문자열 합치기)
* \+ 연산자의 피연산자로 문자열이 주어질 경우 자바스크립트는 문자열을 숫자로 바꾸려 하지 않고,   
  숫자를 문자로 바꾸려 함
```js
1 + "2" //"12"
1 + "js" //"1js"

1 + 2 //3
1 + 2 + 1 //4

1 + 2 + "1" //"31"
(1 + 2) + "1" //"31"

1 + "2" + 1 //"121"
(1 + "2") + 1 //"121"
```

### 객체
객체의 대부분의 암묵적 형변환은 결과값으로 [object Object] 반환
```js
"name" + {} // "name[object Object]"
```
모든 자바스크립트 객체는 toString 메소드를 상속 받음  
(상속받은 toString 메소드는 객체가 문자열 타입으로 변해야할 때 쓰임)  
toString의 반환 값은 문자열 합치기 or 수학적 표현식과 같은 연산에서 사용
```js
const foo = {};
foo.toString(); //"[object Object]"
const baz = {
    toString: () => "I'm object baz"
};
baz + "!"; //"I'm object baz!"
```
객체가 수학적 표현식 사이 들어갔을 경우, 자바스크립트는 반환 값을 숫자로 변환하려 함
```js
const foo = {toString: () => 4};
2 * foo //8
2 / foo //0.5
2 + foo //6
"four" + foo //"four4"

const baz = {toString: () => "four"};
2 * baz //NaN
2 + baz //2four

const bar = {toString: () => "2"}
2 + bar //"22"
2 * bar //4
```

### 배열 객체
배열에서 상속된 toString 메소드는 다르게 동작  
배열에서 아무 인자도 넣지 않은 join 메소드 호출한 것과 비슷한 방식으로 작동
```js
[1, 2, 3].toString(); //"1,2,3"
[1,2,3].join(); //"1,2,3"
[].toString(); //""
[].join(); //""

"me" + [1,2,3]; //"me1,2,3"
4 + [1,2,3]; //"41,2,3"
4 * [1,2,3]; //NaN

4 * [] //0
4 / [2] //2

4 * Number([].toString()) //0
4 * Number("") //0
4 * 0 //0

4 / Number([2].toString()) //2
4 / Number("2") //2
4 / 2 //2
```

### True, False and ""
```js
Number(true); //1
Number(false); //0
Number(""); //0

4 + true //5
3 * flase //0
3 * "" //0
3 + "" //3
```

### valueOf 메소드
Object.prototype.valueOf() : 지정된 객체의 프리미티브 값 반환    
문자열이나 숫자와 계산될 수식에 객체 넘길 때마다 자바스크립트 엔진에 의해 사용될 valueOf 메소드 정의도 가능
```js
const foo = {valueOf: () => 3};
3 + foo; //6
3 * foo; //9
```
객체에 toString 과 valueOf() 메소드가 전부 정의되어있을 경우 자바스크립트 엔진은 valueOf 메소드를 사용
```js
const bar = {
  valueOf: () => 5,
  toString: () => 2
};

"sa" + bar; //"sa5"
3 * bar; //15
2 + bar; //7

const two = new Number(2);
two.valueOf(); //2
```

### Falsy 와 Truthy
모든 자바스크립트의 값은 true나 false로 변환될 수 있는 특성을 가지고 있음   
* truthy : true로 형변환을 강제하는 것  
  falsy로 취급되는 값 제외한 모든 값들은 truthy로 취급됨
  
* falsy : false로 형변환 강제하는 것 
  - false
  - 0
  - null
  - undefined
  - ""
  - NaN
  - -0

truthy를 이용해도 괜찮지만 자바스크립트의 묵시적 형변환에 의존하지 않는 것이 좋음  
(값이 참임을 명시적으로 표현해주는 코드가 더 좋은 작성법)
```js
const counter = 2;
if (counter) {}
// 위의 truthy를 사용하는 것보다 아래처럼 명시적으로 값이 참임을 표현하는 코드가 더 좋은 코드
if (counter === 2) {}
if (typeof counter === "number") {}

//---

const add = (number) => {
    if (!number) {
        new Error('Only accepts arguments of type:number');
    }
}
add(0); //Error: Only accepts arguments of type:number
// 위와 같은 경우 인자로 0을 넘기면 의도치 않은 에러 발생함
// 아래처럼 명시적으로 표현하는게 좋은 코드
const add = (number) => {
    if(typeof number !== "number") {
      new Error('Only accepts arguments of type:number');
    }
}
add(0); //no error
```


### NaN
NaN은 자바스크립트에서 유일하게 자기 자신과도 같지 않은 특별한 숫자 값.  
```js
NaN === NaN; //false
const notANumber = 3 * "a"; //NaN
notANumber == notANumber; //false
notANumber === notANumber; //false
notANumber !== notANumber; //true
```

ES6는 NaN을 체크하기 위해 `Number.isNaN` 메소드를 만듬
```js
Number.isNaN(NaN); //true
Number.isNaN('name'); //false
```

전역 isNaN 함수 : 인자가 실제로 NaN인지 체크하기 전에 인자로 들어온 값의 형변환을 강제함
```js
isNaN('name'); //true
isNaN('1'); //false
```

전역 isNaN 함수는 사용하지 않는 것이 좋음.  
전역 isNaN 함수의 동작은 아래 코드와 비슷함
```js
const coerceThenCheckNaN = (val) => {
    const coercedVal = Number(val);
    return coercedVal !== coercedVal ? true : false
}
coerceThenCheckNaN('1a'); //true
coerceThenCheckNaN('1'); //false
coerceThenCheckNaN('as'); //true
coerceThenCheckNaN(NaN); //true
coerceThenCheckNaN(10); //false
```
