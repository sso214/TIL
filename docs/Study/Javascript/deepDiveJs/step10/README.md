---
title : 10장. 객체 리터럴   
date : 2022.05.19
---

# 10장. 객체 리터럴

## 1. 객체란?
* 자바스크립트는 객체 기반의 프로그래밍 언어  
  자바스크립트를 구성하는 거의 모든 것이 객체 (원시 값을 제외한 나머지 값)
* 원시 타입 = 하나의 값만 나타냄, 변경 불가능   
  객체 타입 = 다양한 타입의 값(원시 값/다른 객체)을 하나의 단위로 구성한 복합적인 자료구조. 변경 가능한 값
* 0개 이상의 프로퍼티와 메서드로 구성된 집합.  
  * 프로퍼티 :  
    객체의 상태를 나타내는 값(data). 키와 값(함수 포함한 모든 값 가능)으로 구성됨
  * 메서드 :  
    프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior).   
    프로퍼티의 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라고 부름
* 객체는 프로퍼티와 메서드를 모두 포함할 수 있기 때문에 상태와 동작을 하나의 단위로 구조화할 수 있어 유용함
* 객체지향 프로그래밍 = 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임
```js
var person = {
  name: 'Leo', //프로퍼티 (프로퍼티 키 : 프로퍼티 값)
  age: 26,
  num: 0,
  increase: function() { //메서드
      this.num++;
  }
}
```
> JS의 객체는 함수와 밀접한 관계를 가짐.  
> 함수로 객체를 생성하기도 하며, 함수 자체가 객체이기도 함  


## 2. 객체 리터럴에 의한 객체 생성
자바스크립트는 프로토타입 기반 객체지향 언어로서 다양한 객체 생성 방법을 지원함
* 객체 리터럴 (가장 일반적으로 많이 쓰임. 이 외 객체 생성 방식은 모두 함수를 이용해 객체 생성)
* Object 생성자 함수
* 생성자 함수
* Object.create 메서드
* 클래스 (ES6)


### 객체 리터럴
* 중괄호({...}) 내에 0개 이상의 프로퍼티를 정의.  
  프로퍼티를 넣어 객체 생성과 동시에 프로퍼티를 만들 수도 있고,  
  객체 생성 이후 동적으로 프로퍼티를 추가할 수도 있음
* 자바스크립트 엔진은 변수에 할당되는 시점에 객체 리터럴을 해석해 객체를 생성함
* 객체 리터럴은 값으로 평가되는 표현식이므로 닫는 중괄호 뒤에 세미콜론 붙여야 함
* 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식  
  (객체 생성 위해 클래스를 먼저 정의하고 new 연산자와 함께 생성자를 호출할 필요 없음)  
```js
var person = {
  name: 'Leo',
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  }
};
console.log(typeof person); //object
console.log(person); //{name: 'Leo', sayHello: f}
```


## 3. 프로퍼티
* 객체는 프로퍼티의 집합. 프로퍼티는 키와 값으로 구성됨
* 프로퍼티 나열 시 쉼표로 구분. (일반적으로 마지막 프로퍼티에는 쉼표 사용하지 않음)
* 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성 가능  
  (프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 함)

### 프로퍼티 키
* 빈 문자열을 포함한 모든 문자열 또는 심벌 값 사용 가능.   
  (일반적으로 문자열을 사용하고, 문자열이나 심벌 값이 아닌 경우 암묵적 타입 변환함)   
* 식별자 역할을 하지만 꼭 식별자 네이밍 규칙을 따라야 하는 건 아님.    
  (but. 식별자 네이밍 규칙을 따르면 따옴표 생략 가능하지만 따르지 않으면 반드시 따옴표 사용해야 함)
* 예약어를 사용해도 에러는 발생하지 않지만 예상치 못한 에러 발생할 수 있으니 권장 X
* 프로퍼티 키 중복 선언 시 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어씀 (에러 발생 X)

### 프로퍼티 값  
* 자바스크립트에서 사용할 수 있는 모든 값 사용 가능

```js
var person = {
  name: 'Leo', //프로퍼티 키: name, 프로퍼티 값: 'Leo'
  'last-nane': 'Leo', //식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키
  1 : 2, //프로퍼티 키로 숫자를 사용한 경우 따옴표는 붙지 않지만 내부적으로는 문자열로 변환됨
  name: 'soyoung',
  name: 'leo' //프로퍼티 키 중복 선언 시 나중에 선언한 프로퍼티로 덮여씀
};

var obj = {};
var key = 'hello';
person[key] = 'world'; //ES5 : 프로퍼티 키 동적 생성, ES6 : 계산된 프로퍼티 이름
console.log(obj); //{hello: 'world'}
```


## 4. 메서드
* 자바스크립트의 함수는 객체(일급 객체)이므로 값으로 취급 가능 -> 프로퍼티 값으로 사용 가능
* 프로퍼티 값이 함수일 경우 일반 함수와 구분 위해 메서드라고 부름 (메서드 = 객체에 묶여있는 함수)
* 메서드 내부에서 사용한 this 키워드는 객체 자신을 가리키는 참조 변수

```js
var circle = {
  radius: 5, //프로퍼티
  getDiameter: function () { //메서드
    return 2 * this.radius; //this는 circle을 가리킴
  }
};
console.log(circle.getDiameter()); //10
```


## 5. 프로퍼티 접근
프로퍼티 접근 방법은 두 가지
* 마침표 프로퍼티 접근 연산자(.)를 사용하는 마침표 표기법
* 대괄호 프로퍼티 접근 연산자([...])를 사용하는 대괄호 표기법

---

* 프로퍼티 키가 식별자 네이밍 규칙을 준수하는 이름일 경우 두 표기법 모두 사용 가능
* 좌측 : 객체로 평가되는 표현식,  
  우측(마침표 프로퍼티 접근 연산자) 또는 내부(대괄호 프로퍼티 접근 연산자) : 프로퍼티 키 지정
* 대괄호 프로퍼티 접근 연산자에서 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 함  
  따옴표로 감싸지 않은 이름을 넣을 시 자바스크립트 엔진은 식별자로 해석함
* 객체에 존재하지 않는 프로퍼티에 접근 시 undefined 반환 (ReferenceError 발생 X)
* 프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않은 경우 반드시 대괄호 표기법을 사용해야 함   
  단, 프로퍼티 키가 숫자로 이루어진 문자열인 경우 따옴표 생략 가능. 그 외에는 전부 반드시 따옴표로 감싸야 함
```js
var person = {
  'first-name': 'Park',
  name: 'Leo',
  1: 26
};

// 마침표 표기법으로 프로퍼티 접근
console.log(person.name); //'Leo'
console.log(person.'first-name'); //SyntaxError
console.log(person.first-name);
// 브라우저 환경 : NaN
// Node.js 환경 : ReferenceError

// 대괄호 표기법으로 프로퍼티 접근
console.log(person['name']); //'Leo'
console.log(person['first-name']); //'Park'
console.log(person['1']); //26
console.log(person[1]); //26

// 대괄호 표기법에서 따옴표로 감싸지 않은 키를 넣었을 시
console.log(person[name]); //ReferenceError

// 객체에 존재하지 않는 프로퍼티 접근
console.log(person.age); //undefined
```

### person.first-name 실행 과정
1. person.first-name 실행 시 자바스크립트 엔진은 먼저 person.first를 평가함
2. person 객체에 프로퍼티 키가 first인 프로퍼티가 없기 때문에 person.first는 undefined로 평가됨  
   따라 person.first-name은 undefined-name과 같음  
3. 다음으로 자바스크립트 엔진은 name이라는 식별자를 찾음.  
   (이때 name은 프로퍼티 키가 아니라 식별자로 해석)  

->   
Node.js 환경에서는 어디에도 name이라는 식별자 선언이 없으므로 ReferneceError 에러 발생

브라우저 환경에서는 name이라는 전역 변수(전역 객체 window의 프로퍼티)가 암묵적으로 존재함  
전역 변수 name은 창(window)의 이름을 가리키며 기본값은 빈 문자열.  
따라 person.first-name은 undefined - ''과 같으므로 NaN이 됨


## 6. 프로퍼티 값 갱신
* 이미 존재하는 프로퍼티 값을 할당하면 프로퍼티 값이 갱신됨
```js
var person = {
    name: 'Leo'
};

person.name = 'Park';
console.log(person.name); //{name: 'Park'}
```


## 7. 프로퍼티 동적 생성
* 존재하지 않는 프로퍼티에 값을 할당하면  
  프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당됨
```js
var person = {
    name: 'Leo'
};
person.age = 26;
console.log(person) //{name: 'Leo', age: 26}
```


## 8. 프로퍼티 삭제
* delete 연산자는 객체의 프로퍼티를 삭제함
* delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 함
* 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시됨
```js
var person = {
    name: 'Leo'
};

person.age = 26;
delete person.age; //정상적으로 age 프로퍼티 삭제
delete person.address; //address 프로퍼티가 존재하지 않으므로 에러 없이 무시됨
console.log(person); //{name: 'Leo'}
```


## 9. ES6에서 추가된 객체 리터럴의 확장 기능

### 9-1. 프로퍼티 축약 표현
ES6에서는 프로퍼티 값으로 변수를 사용하는 경우,  
변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략 가능함.  
이떄 프로퍼티 키는 변수 이름으로 자동 생성됨
```js
// ES5
var x = 1, y = 2;
var obj = {
  x : x,
  y : y
};
console.log(obj) //{x: 1, y: 2}

// ES6
let x = 1, y = 2;
const obj = { x, y };
console.log(obj); //{x: 1, y:2}
```

### 9-2. 계산된 프로퍼티 이름
문자열 또는 문자열로 타입 변환 가능한 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성 가능.  
단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 함. (이를 계산된 프로퍼티 이름이라고 함)

ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법을 사용해야 함  
ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성 가능함
```js
// ES5
var prefix = 'prop';
var i = 0;
var obj = {};

obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
console.log(obj); //{prop-1:1, prop-2:2, prop-3:3}


// ES6
const prefix = 'prop';
let i = 0;
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i
};
console.log(obj); //{prop-1:1, prop-2:2, prop-3:3}
```

### 9-3. 메서드 축약 표현
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수 할당.  
ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현 사용 가능  
(ES6의 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작함)
```js
// ES5
var obj = {
  name: 'Leo',
  sayHi: function () {
    console.log('Hi!' + this.name);
  }
};

// ES6
const obj = {
  name: 'Leo',
  sayHi() {
    console.log('Hi!' + this.name);
  }
}
```
 
