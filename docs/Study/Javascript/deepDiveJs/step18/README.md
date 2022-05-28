---
title : 18장. 함수와 일급 객체   
date : 2022.05.27
---

# 18장. 함수와 일급 객체

## 1. 일급 객체
* 아래 조건을 만족하는 객체를 일급 객체라고 함  
  * 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
  * 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
  * 함수의 매개변수에 전달할 수 있다.
  * 함수의 반환값으로 사용할 수 있다.
  
* 자바스크립트의 함수는 조건을 모두 만족하므로 일급 객체
  * 함수가 일급 객체라는 건 함수를 객체와 동일하게 사용 가능하다는 의미 
  * 객체는 값이므로 함수는 값과 동일하게 취급 가능   
    (따라 함수는 값을 사용할 수 있는 곳이라면 어디든 리터럴로 정의할 수 있으며, 런타임에 함수 객체로 평가됨)
  * 함수는 일반 객체와 같이 함수의 매개변수에 전달할 수 있으며 함수의 반환값으로 사용 가능   
    (함수형 프로그래밍 가능케 함)
  * 함수는 객체지만 호출 가능하며 함수 고유의 프로퍼티를 소유함으로 일반 객체와 차이가 있음

```js
//1. 함수는 무명의 리터럴로 생성 가능
//2. 함수는 변수에 저장 가능
//런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당됨
const increase = function (num) {
    return ++num;
};
const decrease = function (num) {
    return --num;
};

//2. 함수는 객체에 저장 가능
const auxs = {increase, decrease};

//3. 함수의 매개변수에 전달 가능
//4. 함수의 반환값으로 사용 가능
function makeCounter(aux) {
    let num = 0;
    return function () {
        num = aux(num);
        return num;
    };
}

//3. 함수는 매개변수에게 함수를 전달 가능
const increaser = makeCounter(auxs.increase);
console.log(increaser()); //1
console.log(increaser()); //2
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); //-1
console.log(decreaser()); //-2
```

## 2. 함수 객체의 프로퍼티
함수는 객체이므로 함수도 프로퍼티를 가질 수 있음
```js
function square(number) {
    return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));
/*
{
    length: {value: 1, writable: false, enumerable: false, configurable: true},
    name: {value: "square", writable: false, enumerable: false, configurable: true},
    arguments: {value: null, writable: false, enumerable: false, configurable: false},
    caller: {value: null, writable: false, enumerable: false, configurable: false} 
    prototype: {value: {...}, writable: true, enumerable: false, configurable: false} 
}
*/

//__proto__는 square 함수의 프로퍼티가 아님
console.log(Object.getOwnPropertyDescriptor(square, '__proto__')); //undefined

//__proto__는 Object.prototype 객체의 접근자 프로퍼티
//square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받음
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get:f, set:f, enumerable: false, configurable: true}
```
* arguments, caller, length, name, prototype 프로퍼티는   
  일반 객체에는 없는 함수 객체 고유의 데이터 프로퍼티
* __proto__는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라   
  Object.prototype 객체의 프로퍼티를 상속 받은 것.  
* Object.prototype 객체의 프로퍼티는 모든 객체가 상속 받아 사용 가능함  
  (=Object.prototype 객체의 __proto__접근자 프로퍼티는 모든 객체가 사용 가능함)


### 2-1. arguments 프로퍼티
* 함수 객체의 arguments 프로퍼티 값 = arguments 객체  
* arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체.  
  함수 내부에서 지역 변수처럼 사용됨 (함수 외부에서는 참조 불가)
* 함수 객체의 arguments 프로퍼티는 ES3부터 표준에서 폐지됨.  
  따라 Function.arguments 같은 사용법은 권장하지 않으며  
  함수 내부에서 지역 변수처럼 사용할 수 있는 arguments 객체를 참조하도록 함  

```js
function multiply(x, y) {
    console.log(arguments);
    return x * y;
}

console.log(multiply()); //NaN
console.log(multiply(1)); //NaN
console.log(multiply(1, 2)); //2
console.log(multiply(1, 2, 3)); //2
```
자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않음 (에러 발생 X)   
매개변수 개수보다 인수를 적게 전달했을 경우 인수가 전달되지 않은 매개변수는 undefined로 초기화된 상태 유지함  
매개변수보다 인수를 더 많이 전달한 경우 초과된 인수는 무시됨.  
초과된 인수가 버려지는 것은 아니고 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관됨

arguments 객체는 인수를 프로퍼티 값으로 소유하며, 프로퍼티 키는 인수의 순서를 나타냄  
arguments 객체의 callee 프로퍼티 : 호출되어 arguments 객체를 생성한 함수 (=함수 자신)을 가리킴   
arguments 객체의 length 프로퍼티 : 인수의 개수를 가리킴

* arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 떄 유용함
* arguments 객체는 배열 형태로 인자 정보를 담고 있지만 실제 배열이 아닌 유사 배열 객체  
  (유사 배열 객체 : length 프로퍼티를 가진 객체로 for 문으로 순회 가능한 객체를 말함)
```js
function sum() {
  let res = 0;

  //arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문 순회 가능
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }
  return res;
}

console.log(sum()); //0
console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //6
```

#### <arguments 객체의 Symbol(Symbol.iterator) 프로퍼티>
arguments 객체의 Symbol(Symbol.iterator) 프로퍼티는   
arguments 객체를 순회 가능한 자료구조인 이터러블로 만들기 위한 프로퍼티    
Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이 됨
```js
function multiply(x, y) {
    //이터레이터
  const iterator = arguments[Symbol.iterator]();
  
  //이터레이터의 next 메서드를 호출해 이터러블 객체 arguments를 순회
  console.log(iterator.next()); //{ value: 1, done: false }
  console.log(iterator.next()); //{ value: 2, done: false }
  console.log(iterator.next()); //{ value: 3, done: false }
  console.log(iterator.next()); //{ value: undefined, done: true }
  
  return x * y;
}
multiply(1,2,3);
```

#### <유사 배열 객체와 이터러블>
ES6에서 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료구조인 이터러블이 됨  
이터러블의 개념이 없었던 ES5에서 arguments 객체는 유사 배열 객체로 구분되었음  
하지만 이터러블이 되입된 ES6부터 arguments 객체는 유사 배열 객체면서 동시에 이터러블

유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러 발생함  
따라 배열 메서드를 사용하려면 Function.prototype.call, Function.apply를 사용해  
간접 호출해야 하는 번거로움이 있음  
-> 이런 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터를 도입함  
(ES6 Rest 파라미터의 도입으로 arguments 객체의 중요성이 많이 낮아짐)
```js
function sum(){
    //arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
      return pre + cur;
  }, 0);
}
console.log(sum(1,2)); //3
console.log(sum(1,2,3,4,5)); //15

//ES6 Rest Parameter
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1,2)); //3
console.log(sum(1,2,3,4,5)); //15
```


### 2-2. caller 프로퍼티
* ECMAScript 사양에 포함되지 않은 비표준 프로퍼티 (이후 표준화될 예정도 없음. 참고로만 알아두면 됨)
* 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킴
```js
function foo(func){
    return func();
}

function bar(){
    return 'caller : ' + bar.caller;
}
//브라우저에서 실행한 결과
console.log(foo(bar)); //caller : function foo(func) {...}
console.log(bar()); //caller : null
```
모듈 때문에 브라우저에서 실행할 때와 Node.js에서 실행할 때 다른 결과가 노출됨

### 2-3. length 프로퍼티
* 함수 객체의 length 프로퍼티는 함수 정의 시 선언한 매개변수의 개수를 가리킴
* arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티 값은 다를 수 있으므로 주의해야 함  
  * arguments 객체의 length 프로퍼티 : 인자의 개수를 가리킴  
  * 함수 객체의 length 프로퍼티 : 매개변수의 개수를 가리킴
```js
function foo() {
}
console.log(foo.length); //0

function bar(x) {
  return x;
}
console.log(bar.length); //1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); //2
```

### 2-4. name 프로퍼티
* 함수 객체의 name 프로퍼티는 함수명을 나타냄
* ES6이전까지는 비표준이었다가 ES6에서 정식 표준이됨
* name 프로퍼티는 ES5와 ES6에서 동작을 달리하므로 주의해야 함   
  * ES5 익명 함수 표현식의 경우 : name 프로퍼티는 빈 문자열을 값으로 가짐  
  * ES6 익명 함수 표현식의 경우 : name 프로퍼티는 함수 객체를 가리키는 식별자를 값으로 가짐
```js
//기명 함수 표현식
var namedFunc = function foo(){};
console.log(namedFunc.nam); //foo

//익명 함수 표현식
var anonymousFunc = function(){};
console.log(anonymousFunc.name); //anonymousFunc
//ES5 : name 프로퍼티는 빈 문자열을 값으로 가짐
//ES6 : name 프로퍼티는 함수 객체를 가리키는 변수명을 값으로 가짐

//함수 선언문
function bar(){}
console.log(bar.name); //bar
```

### 2-5. \__proto__ 접근자 프로퍼티
* 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가짐.   
  [[Prototype]] 내부 슬롯 : 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킴  
* \__proto__ 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에   
  접근하기 위해 사용하는 접근자 프로퍼티  
* 내부 슬롯에는 직접 접근 불가하며 간접적인 접근 방법을 제공하는 경우에 한해 접근 가능함.    
  [[Prototype]] 내부 슬롯에도 직접 접근 불가해 \__proto__ 접근자 프로퍼티를 통해   
  간접적으로 프로토타입 객체에 접근 가능함
```js
const obj = { a:1 };

//객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype
console.log(obj.__proto__ === Object.prototype); //true

//객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받음
console.log(obj.hasOwnProperty('a')); //true
console.log(obj.hasOwnProperty('__proto__')); //false
```
> hasOwnProperty 메서드 :   
> 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 반환  
> 상속받은 프로토타입의 프로퍼티 키인 경우 false 반환

### 2-6. prototype 프로퍼티
* prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체(=constructor) 만이 소유하는 프로퍼티
* 일반 객체와 생성자 함수로 호출 불가한 non-constructor에는 prototype 프로퍼티가 없음
* prototype 프로퍼티는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킴
```js
//함수 객체는 prototype 프로퍼티를 소유함
(function(){}).hasOwnProperty('prototype'); //true

//일반 객체는 prototype 프로퍼티는 소유하지 않음
({}).hasOwnProperty('prototype'); //false
```
