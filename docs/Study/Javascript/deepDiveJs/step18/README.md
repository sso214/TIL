---
title : 17장. 생성자 함수에 의한 객체 생성   
date : 2022.05.25
---

# 17장. 생성자 함수에 의한 객체 생성
객체 리터럴에 의한 객체 생성 방식은 가장 일반적이고 간단한 객체 생성 방식이지만    
그 외의 다양한 방법으로도 객체 생성 가능함  
이번 장에서는 생성자 함수를 이용해 객체 생성하는 방식을 살펴봄

## 1. Object 생성자 함수
new 연산자와 함께 Object 생성자 함수 호출 시 빈 객체를 생성해 반환함   
빈 객체 생성 이후 프로퍼티나 메서드를 추가해 객체를 완성할 수 있음
```js
//빈 객체 생성
const person = new Object();

//프로퍼티 추가
person.name = 'Leo';
person.sayHello = function(){
    console.log('Hi! My Name is' + this.name);
};

console.log(person); //{name: 'Leo', sayHello: f}
person.sayHello(); //Hi! My Name is Leo
```

### 생성자 함수
* new 연산자와 함께 호출해 객체(인스턴스)를 생성하는 함수  
* 생성자 함수에 의해 생성된 객체를 인스턴스라고 함  
* 자바스크립트는 String, Number, Boolean, Function, Array, Date, RegExp, Promise, Object 등의   
빌트인 생성자 함수를 제공함
```js
//String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Leo');
console.log(typeof strObj); //object
console.log(strObj); //String {'Leo'}

//Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); //object
console.log(numObj); //Number {123}

//Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true);
console.log(typeof boolObj); //object
console.log(boolObj); //Boolean {true}

//Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x');
console.log(typeof func); //function
console.log(func); //f anonymous(x)

//Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1,2,3);
console.log(typeof arr); //object
console.log(arr); //[1,2,3]

//RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); //object
console.log(regExp); // /ab+c/i

//Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
console.log(typeof date); //object
console.log(date); // Mon May 04 ...
```
객체 생성 방법은 객체 리터럴을 사용하는 것이 더 간편함.  
Object 생성자 함수를 사용한 객체 생성 방식은 특별한 이유가 없으면 유용해 보이지 않음


## 2. 생성자 함수

### 2-1. 객체 리터럴에 의한 객체 생성 방식의 문제점
객체 리터럴에 의해 객체를 생성하는 경우 사용하기 직관적이고 간편하지만   
프로퍼티 구조가 동일한 경우에도 매번 같은 프로퍼티와 메서드를 기술해야 함 => 비효율적
```js
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};
console.log(circle1.getDiameter()); //10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
}
console.log(circle2.getDiameter()); //20
```

### 2-2. 생성자 함수에 의한 객체 생성 방식의 장점
마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용해  
프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있음   
만약 new 연산자 없이 생성자 함수 호출하면 일반 함수로 동작함
```js
//생성자 함수
function Circle(radius) {
    //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킴
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

//인스턴스으 ㅣ생성
const circle1 = new Circle(5); //반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); //반지름이 10인 Circle 객체를 생성
const circle3 = Circle(15); //일반 함수로 호출됨

console.log(circle1.getDiameter()); //10
console.log(circle2.getDiameter()); //20
console.log(circle3); //undefined : 일반함수로서 호출된 Circle은 반환문이 없으므로 undefined 반환
console.log(radius); //15 : 일반 함수로 호출된 Circle 내의 this는 전역 객체를 가리킴
```

#### this
* 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수
* this 바인딩(this가 가리키는 값)은 함수 호출 방식에 따라 동적으로 결정됨  

|함수 호출 방식|this 바인딩|  
|:-|:-|  
|일반 함수로서 호출|전역 객체|  
|메서드로서 호출|메서드를 호출한 객체(마침표 앞의 객체)|  
|생성자 함수로서 호출|생성자 함수가 (미래에) 생성할 인스턴스|  

```js
//일반적인 함수로서 호출
function foo(){
    console.log(this);
}
foo(); //window (전역 객체는 브라우저 환경에서 window, Node.js 환경에서 global을 가리킴)

//메서드로서 호출
const obj = { foo }; //ES6 프로퍼티 축약 표현
obj.foo(); //obj

//생성자 함수로서 호출
const inst = new foo(); //inst
```

### 2-3. 생성자 함수의 인스턴스 생성 과정
생성자 함수의 역할  
- 인스턴스를 생성하는 것 (필수) 
- 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것 (옵션)  

생성자 함수 내부 코드를 살펴보면  
this에 프로퍼티를 추가하고 필요에 따라 전달된 인수를 프로퍼티의 초기값으로 할당해 인스턴스를 초기화 함  
인스턴스를 생성하고 반환하는 코드는 보이지 않는데 new 연산자와 함께 생성자 함수를 호출 시  
자바스크립트 엔진이 아래와 같은 과정을 거쳐 암묵적 처리를 통해 인스턴스를 생성하고 반환함  
```js
//생성자 함수
function Circle(radius) {
    //인스턴스 초기화
    this.radius = radius;
    this.getDiameter = function (){
        return 2 * this.radius;
    };
}
//인스턴스 생성
const circle1 = new Circle(5); //반지름이 5인 Circle 객체를 생성
```

#### <생성자 함수의 인스턴스 생성 과정>
1. 인스턴스 생성과 this 바인딩
   * 암묵적으로 빈 객체 생성됨    
     이 객체가 바로 생성자 함수가 생성한 인스턴스 (아직 미완성)
   * 인스턴스(암묵적으로 생성된 빈 객체)는 this에 바인딩 됨   
     생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유가 바로 이 때문  
     이 처리는 함수 몸체 코드가 한줄씩 실행되는 런타임 이전에 실행됨

2. 인스턴스 초기화   
   생성자 함수에 기술되어 있는 코드가 한줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화 함  
   해당 처리는 개발자가 기술함

3. 인스턴스 반환  
   생성자 함수 내부의 모든 처리가 끝나면 "완성된 인스턴스가 바인딩된 this"가 암묵적으로 반환됨    
   
   만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 명시한 객체가 반환됨  
   하지만 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환됨  
   이 같은 행동은 생성자 함수의 기본 동작을 훼손하므로 **생성자 함수 내부에선 return 문을 반드시 생략**해야 함

```js
function Circle(radius) {
    //1. 암묵적으로 인스턴스가 생성되고 this에 바인딩 됨
    console.log(this); //Circle {}

    //2. this에 바인딩되어 있는 인스턴스를 초기화함
    this.radius = radius;
    this.getDiameter = function (){
        return 2 * this.radius;
    };
    //3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됨
}

//인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환함
const circle = new Circle(1);
console.log(circle); //Circle {radius:1, getDiameter: f}
```
```js
//this가 아닌 다른 객체를 명시적으로 반환
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function (){
        return 2 * this.radius;
    };
    return {};
}

const circle = new Circle(1);
console.log(circle); //{}

//this가 아닌 원시 값을 명시적으로 반환
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function (){
        return 2 * this.radius;
    };
    return 100;
}

const circle = new Circle(1);
console.log(circle); //Circle {radius:1, getDiameter: f}
```

> 바인딩 : 식별자와 값을 연결하는 과정  
> 예를 들어 변수 선언은 변수명과 확보된 메모리 공간의 주소를 바인딩하는 것  
> this 바인딩은 this와 this(키워드로 분류되지만 식별자 역할함)가 가리킬 객체를 바인딩하는 것

### 2-4. 내부 메서드 [[Call]]과 [[Construct]]  
* 함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 또는 생성자 함수로서 호출 가능  
  (생성자 함수로서 호출한다는 것은 new 연산자와 함께 호출해 객체를 생성하는 것)  

* 함수는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있어 일반 객체와 동일하게 동작 가능  
  또한 함수는 객체지만 일반 객체와 달리 호출할 수 있기 때문에 함수로서 동작하기 위해 함수 객체만을 위한  
  [[Environment]], [[FormalParameters]] 등의 내부 슬롯과  
  [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있음  

* 함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고  
  new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 [[Construct]]가 호출됨  

  * **callable**  
    내부 메서드 [[Call]]을 갖는 함수 객체 : 호출할 수 있는 객체(=함수)를 의미함   
    호출할 수 없는 객체는 함수 객체가 아니므로 함수 객체는 반드시 callable이어야 함   
  * **constructor**   
    [[Construct]]를 갖는 함수 객체 : 생성자 함수로서 호출할 수 있는 함수   
    (일반 함수 또는 생성자 함수로서 호출할 수 있는 객체를 말함)
  * **non-constructor**   
    [[Construct]]를 갖지 않는 함수 객체 : 생성자 함수로서 호출할 수 없는 함수   
    (일반 함수로서만 호출할 수 있는 객체를 말함)

  모든 함수 객체는 호출할 수 있지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아님 


```js
//함수는 객체
function foo(){}

//함수는 객체이므로 프로퍼티와 메서드 소유 가능
foo.prop = 10;
foo.method = function(){
    console.log(this.prop);
}

foo.method(); //10

foo(); //일반적인 함수로서 호출 : [[Call]] 호출됨
new foo(); //생성자 함수로서 호출 : [[Construct]] 호출됨
```

### 2-5. constructor와 non-constructor의 구분
자바스크립트 엔진은 함수 객체 생성 시 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분함  
non-constructor인 함수 객체는 내부 메서드[[Construct]]를 갖지 않으므로 생성자 함수로서 호출하면 에러 발생함    
* constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수)
* non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

주의할 것은 ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다는 것    
함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭하지만   
ECMAScript 사양에서 메서드란 ES6의 메서드 축약 표현만을 의미함
```js
//constructor : 일반 함수로 정의된 함수만이 constructor
function foo(){} //일반 함수 정의 : 함수 선언문
const bar = function(){}; //일반 함수 정의 : 함수 표현식
const baz = {
    x : function(){} //프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수. 메서드로 인정하지 않음
};
new foo(); // -> foo {}
new bar(); // -> bar {}
new baz.x(); // -> x {}

//non-constructor
const arrow = () => {}; //화살표 함수 정의
const obj = { x(){} }; //메서드 정의 : ES6의 메서드 축약 표현만 메서드로 인정
new arrow(); //TypeError
new obj.x(); //TypeError
```
생성자 함수로서 호출될 것을 기대하고 정의하지 않은 일반 함수(callable이면서 constructor)에   
new 연산자를 붙여 호출 시 생성자 함수처럼 동작할 수 있으므로 주의 필요

### 2-6. new 연산자
일반 함수와 생성자 함수에 특별한 형식적 차이는 없음.   
new 연산자와 함께 함수 호출 시 생성자 함수로 동작하고 new 연산자 없이 함수 호출 시 일반 함수로 호출됨  
(단 new 연산자와 함께 호출하는 함수는 constructor이어야 함)  
생성자 함수는 일반적으로 파스칼 케이스로 명명해 일반 함수와 구별할 수 있게 함
```js
function add(x, y){ //원시 값을 반환하는 일반 함수
    return x + y;
}
let inst = new add(); //일반 함수를 new 연산자와 함께 호출
console.log(inst); //{} : 함수가 객체를 반환하지 않았으므로 반환문 무시되고 빈 객체 생성되어 반환됨

function createUser(name, role) { //객체를 반환하는 일반 함수
    return {name, role};
}
inst = new createUser('Leo', 'admin'); //일반 함수를 new 연산자와 함께 호출
console.log(inst); //{name: 'Leo', role: 'admin'} : 함수가 생성한 객체를 반환


//생성자 함수
function Circle(radius) { //생성자 함수
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * radius;
    };
}
const circle = Circle(5); //new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출됨
console.log(circle); //undefined
console.log(radius); //5 : 일반 함수 내부의 this는 전역 객체 window를 가리킴
console.log(getDiameter()); //10
circle.getDiameter(); //TypeError
```
Circle 함수는 일반 함수로서 호출되었기 때문에 Circle 함수 내부의 this는 전역 객체가 됨.  
따라 radius 프로퍼티와 getDiameter 메서드는 전역 객체의 프로퍼티와 메서드가 됨  

### 2-7. new.target
생성자 함수가 new 연산자 없이 호출되는 것을 막기 위해 파스칼 케이스 컨벤션을 사용한다 하더라도 실수 가능성 존재  
이런 위험성을 피하기 위해 ES6에서는 new.target을 지원함 (IE는 new.target 지원하지 않음)

new.target은 this와 유사하게 constructor인 모든 함수 내부에서   
암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부름.  

함수 내부에서 new.target 사용 시 new 연산자와 함께 생성자 함수로서 호출되었는지 확인 가능함  
생성자 함수로서 호출되면 new.target = 함수 자신  
일반 함수로서 호출되면 new.target = undefined  

따라 함수 내부에서 new.target을 이용해 생성자 함수로서 호출했는지 확인해   
그렇지 않은 경우 new 연산자와 함께 재귀호출을 통해 생성자 함수로서 호출할 수 있음
```js
//생성자 함수
function Circle(radius) {
    if (!new.target) { //함수가 생성자 함수로 호출되지 않았다면 new.target = undeifned
        return new Circle(radius); //new 연산자와 함께 재귀 호출하여 생성된 인스턴스를 반환함
    }
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

//new 연산자 없이 생성자 함수 호출해도 new.target을 통해 생성자 함수로서 호출됨
const circle = Circle(5);
console.log(circle.getDiameter());
```

#### 스코프 세이프 생성자 패턴
new.target은 ES6에서 도입된 최신 문법으로 IE에서 지원하지 않음.  
이런 경우 스코프 세이프 생성자 패턴 사용 가능함  

new 연산자와 함께 생성자 함수에 의해 생성된 객체(인스턴스)는 프로토타입에 의해 생성자 함수와 연결됨.  
이를 이용해 new 연산자와 함께 호출되었는지 확인 가능  
```js
function Circle (radius) {
    //생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고 this에 바인딩함.  
    //이때 this와 Circle은 프로토타입에 의해 연결됨
    
    //함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킴  
    //즉, this와 Circle은 프로토타입에 의해 연결되지 않음
    if(!(this instanceof Circle)) {
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}
const circle = Circle(5);
console.log(circle.getDiameter()); //10
```

참고로 대부분의 빌트인 생성자 함수 (Object, String, Number, ...)는   
new 연산자와 함께 호출되었는지를 확인 후 적절한 값을 반환함


Object와 Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작함  
String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 객체를 생성해 반환하지만   
new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환함  
이를 통해 데이터 타입을 변환하기도 함
```js
let obj = new Object();
console.log(obj); //{}
obj = Object();
console.log(obj); //{}

let f = new Function('x', 'return x ** x');
console.log(f); //f anonymous(x) { return x ** x }
f = Function('x', 'return x ** x');
console.log(f); //f anonymous(x) { return x ** x }

const str = String(123);
console.log(str, typeof str); //123 string

const num = Number('123');
console.log(num, typeof num); //123 number

const bool = Boolean('true');
console.log(bool, typeof bool); //true boolean
```
