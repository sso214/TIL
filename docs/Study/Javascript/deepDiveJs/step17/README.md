---
title : 16장. 프로퍼티 어트리뷰트   
date : 2022.05.24
---

# 16장. 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메서드
* 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해  
  ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드   
  
* ECMAScript 사양에 등장하는 이중 대괄호([[ ... ]])로 감싼 이름들이 내부 슬롯과 내부 메서드
  
* 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로   
  내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법 제공하지 않음  
  단, 일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근할 수 있는 수단을 제공하기는 함

ex.  
모든 객체는 [[Prototype]]이라는 내부 슬롯을 가짐.  
내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근 불가능하지만  
[[Prototype]] 내부 슬롯의 경우, __proto__를 통해 간접적으로 접근 가능함
  
```js
const o = {};
o.[[Prototype]] //Uncaught SyntaxError
o.__proto__ //Object.prototype
```


## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
자바스크립트 엔진은 프로퍼티를 생성할 때마다 프로퍼티의 상태를 나타내는  
프로퍼티 어트리뷰트를 기본적으로 자동 정의함  

* 프로퍼티의 상태 :  
  프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)
* 프로퍼티 어트리뷰트 :  
  자바스크립트 엔진이 관리하는 내부 상태의 값인 내부 슬롯  
  [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]  

프로퍼티 어트리뷰트에 직접 접근은 불가능하지만 Object.getOwnPropertyDescriptor  
메서드를 사용해 간접적으로 확인 가능함

* `Object.getOwnPropertyDescriptor` 메서드 호출 시   
   첫 번째 매개변수 : 객체의 참조 전달,   
   두번째 매개변수 : 프로퍼티 키를 문자열로 전달
* `Object.getOwnPropertyDescriptor` 메서드는   
   프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체**를 반환함   
   (만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 디스크립터를 요구하면 undefined 반환됨)
* `Object.getOwnPropertyDescriptor` 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환.  
  ES8에서 도입된 `Object.getOwnPropertyDescriptors` 메서드는 모든 프로퍼티의  
  프로퍼티 디스크립터 객체들을 반환함

```js
const person = {
  name: 'Leo'
};

//프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
//{value: 'Leo', writable: true, enumerable: true, configurable: true}


person.age = 26;
//모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환
console.log(Object.getOwnPropertyDescriptors(person));
//{
//   name: {value: 'Leo', writable: true, enumerable: true, configurable: true},
//   age: {value: '26', writable: true, enumerable: true, configurable: true}
// }
```


## 3. 데이터 프로퍼티와 접근자 프로퍼티
프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분 가능함
* 데이터 프로퍼티 :  
  키와 값으로 구성된 일반적인 프로퍼티
* 접근자 프로퍼티 :  
  자체적으로는 값을 가지고 있지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는   
  접근자 함수로 구성된 프로퍼티

### 3-1. 데이터 프로퍼티
데이터 프로퍼티는 이래와 같은 프로퍼티 어트리뷰트를 가짐.  
이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의 됨

* [[Value]]  
  * 프로퍼티 디스크립터 객체의 프로퍼티 : value  
  * 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값  
  * 프로퍼티 키를 통해 값을 변경하면 [[Value]]에 값을 재할당함  
    이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성한 프로퍼티의 [[Value]]값을 저장함

* [[Writable]]   
  * writable  
  * 프로퍼티 값의 변경 여부를 나타내며 불리언 값을 가짐  
  * [[Writable]] 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 됨

* [[Enumerable]]  
  * enumerable
  * 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 가짐    
  * [[Enumerable]] 값이 false인 경우 해당 프로퍼티는 for ..in문이나 Object.keys 메서드 등으로 열거할 수 없음

* [[Configurable]]
  * configurable  
  * 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 가짐   
  * [[Configurable]] 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지됨.  
    단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 fasle로 변경하는 것은 허용됨


프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화되며 [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화 됨.  
프로퍼티를 동적 추가해도 마찬가지

### 3-2. 접근자 프로퍼티
접근자 프로퍼티는 자체적으로 값을 가지고 있지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티  
접근자 프로퍼티는 아래와 같은 프로퍼티 어트리뷰트를 가짐  
* [[Get]] / get  
  * 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수  
    접근자 프로퍼티 키로 프로퍼티 값에 접근 시 프로퍼티 어트리뷰터 [[Get]]의 값. 즉 getter 함수가 호출되고 결과가 프로퍼티 값으로 반환됨
* [[Set]] / set  
  * 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수  
    접근자 프로퍼티 키로 프로퍼티 값 저장 시 프로퍼티 어트리뷰트 [[Set]]의 값. 즉 setter 함수가 호출되고 결과가 프로퍼티 값으로 저장됨
* [[Enumerable]] / enumerable  
  * 데이터 프로퍼티의 [[Enumerable]]과 같음
* [[Configurable]] / configurable
  * 데이터 프로퍼티의 [[Enumerable]]과 같음

접근자 함수는 getter/setter 함수라고도 부름  
접근자 프로퍼티는 getter와 setter 함수를 모두 정의할수도 있고, 하나만 정의할 수도 있음
```js
const person = {
    firstName: 'Park', //데이터 프로퍼티
    lastName: 'Leo',
    
    //fullName은 접근자 함수로 구성된 접근자 프로퍼티
    get fullName() { //getter 함수
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) { //setter 함수
        //배열 디스트럭처링 할당
        [this.firstName, this.lastName] = name.split(' ');
    }
};

//데이터 프로퍼티를 통한 프로퍼티 값의 참조 
console.log(person.firstName + ' ' + person.lastName); //Park Leo

//접근자 프로퍼티를 통한 프로퍼티 값의 저장
person.fullName = 'hoho Lee'; //접근자 프로퍼티 fullName에 값 저장 시 setter 함수 호출됨
console.log(person); //{firstName: 'hoho', lastName: 'Lee'}

//접근자 프로퍼티를 통한 프로퍼티 값의 참조
//접근자 프로퍼티 fullName에 접근 시 getter 함수 호출됨
console.log(person.fullName); //hoho Lee

//firstName은 데이터 프로퍼티.  
//데이터 프로퍼티는  [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: 'hoho', writable: true,enumerable: true, configutable: true}

//fullName은 접근자 프로퍼티
//접슨자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
//{get: f, set: f, enumerable: true, configurable:true}
```
person 객체의 firstName, lastName은 일반적인 데이터 프로퍼티.  
메서드 앞에 get, set 붙은 메서드가 getter, setter 함수.  
getter/setter 함수의 이름 fullName이 접근자 프로퍼티.  
접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 [[Value]])을 가지지 않으며  
다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐

접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 메서드가 호출되 아래와 같이 동작함
1. 프로퍼티 키가 유효한지 확인. 프로퍼티 키는 문자열이나 심벌이어야 함.  
   프로퍼티 키 'fullName'은 문자열이므로 유효한 프로퍼티 키
2. 프로토타입 체인에서 프로퍼티를 검색함. person 객체에 fullName 프로퍼티 존재함
3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인함.  
   fnullName 프로퍼티는 접근자 프로퍼티.
4. 접근자 프로퍼티 fullName의 프로퍼티 으ㅓ트리뷰트 [[Get]]의 값. 즉 getter 함수를 호출해 결과를 반환함   
   프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같음
   
> 프로토타입은 어떤 객체의 부모 역할을 하는 객체.  
> 프로토타입은 자식 객체에게 자신의 프로퍼티와 메서드를 상속함  
> 프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인것처럼 자유롭게 사용 가능
> 
> 프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 되어있는 상속 구조를 말함  
> 객체으 ㅣ프로퍼티나 메서드에 저근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면   
> 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색함

접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 아래와 같음
```js
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
Object.getOwnPropertyDescriptor(function(){}, 'prototype');

```

## 4. 프로퍼티 정의


## 5. 객체 변경 방지

### 5-1. 객체 확장 금지

### 5-1. 객체 밀봉

### 5-3. 객체 동결

### 5-4. 불변 객체
