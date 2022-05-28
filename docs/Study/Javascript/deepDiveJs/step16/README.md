---
title : 16장. 프로퍼티 어트리뷰트   
date : 2022.05.24
---

# 16장. 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메서드
* 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해  
  ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드   
  
* ECMAScript 사양에 등장하는 이중 대괄호([[ ... ]])로 감싼 이름들이 내부 슬롯과 내부 메서드
  
* 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로  
  원칙적으로 직접 접근하거나 호출할 수 있는 방법 제공하지 않음  
  (단, 일부에 한해 간접적으로 접근할 수 있는 수단을 제공하기는 함)

ex.  
모든 객체는 [[Prototype]]이라는 내부 슬롯 가짐.  
내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근 불가능하지만  
[[Prototype]] 내부 슬롯의 경우, __proto__를 통해 간접적으로 접근 가능함
  
```js
const o = {};
o.[[Prototype]] //Uncaught SyntaxError
o.__proto__ //Object.prototype
```


## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
자바스크립트 엔진은 **프로퍼티 생성 시마다** 프로퍼티의 상태를 나타내는  
**프로퍼티 어트리뷰트를 기본적으로 자동 정의**함  

* 프로퍼티의 상태 :  
  프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)
* 프로퍼티 어트리뷰트 :  
  자바스크립트 엔진이 관리하는 내부 상태의 값인 내부 슬롯  
  [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]  

프로퍼티 어트리뷰트에 직접 접근은 불가능하지만 `Object.getOwnPropertyDescriptor`  
메서드를 사용해 간접적으로 확인 가능함

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
* `Object.getOwnPropertyDescriptor` 메서드 호출 시   
  첫 번째 매개변수 : 객체의 참조 전달,   
  두번째 매개변수 : 프로퍼티 키를 문자열로 전달
* `Object.getOwnPropertyDescriptor` 메서드는   
  프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체**를 반환함   
  (존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 디스크립터 요구 시 undefined 반환)
* `Object.getOwnPropertyDescriptor` 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환.  
  ES8에서 도입된 `Object.getOwnPropertyDescriptors` 메서드는 모든 프로퍼티의  
  프로퍼티 디스크립터 객체들을 반환함


## 3. 데이터 프로퍼티와 접근자 프로퍼티
프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분 가능함
* **데이터 프로퍼티** :  
  키와 값으로 구성된 일반적인 프로퍼티
* **접근자 프로퍼티** :  
  자체적으로는 값을 가지고 있지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는   
  접근자 함수로 구성된 프로퍼티

### 3-1. 데이터 프로퍼티
데이터 프로퍼티는 이래와 같은 프로퍼티 어트리뷰트를 가짐  
(프로퍼티 생성 시 기본값으로 자동 정의됨)    

프로퍼티가 생성 시 [[Value]]의 값은 프로퍼티 값으로 초기화되며   
[[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화 됨.   
(프로퍼티 동적 추가도 마찬가지) 

#### [[Value]]
* 프로퍼티 디스크립터 객체의 프로퍼티 : value
* 프로퍼티 키를 통해 프로퍼티 값에 접근 시 반환되는 값  
* 프로퍼티 키를 통해 프로퍼티 값을 변경 시 [[Value]]에 값을 재할당함  
  (프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성한 프로퍼티 [[Value]]에 값을 저장함)

#### [[Writable]]   
* 프로퍼티 디스크립터 객체의 프로퍼티 : writable  
* 프로퍼티 값의 변경 여부를 나타내며 불리언 값을 가짐  
* 값이 false인 경우 해당 프로퍼티 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 됨

#### [[Enumerable]]
* 프로퍼티 디스크립터 객체의 프로퍼티 : enumerable
* 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 가짐    
* 값이 false인 경우 해당 프로퍼티는 for ..in문이나 Object.keys 메서드 등으로 열거 불가능

#### [[Configurable]]
* 프로퍼티 디스크립터 객체의 프로퍼티 : configurable  
* 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 가짐   
* 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지됨.    
  (단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용됨)

### 3-2. 접근자 프로퍼티  
접근자 함수는 getter/setter 함수라고도 부름  
접근자 프로퍼티는 getter와 setter 함수를 모두 정의할수도 있고, 하나만 정의할 수도 있음  
이래와 같은 프로퍼티 어트리뷰트를 가짐  

#### [[Get]]
* 프로퍼티 디스크립터 객체의 프로퍼티 : get
* 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수   
  (접근자 프로퍼티 키로 프로퍼티 값에 접근 시 프로퍼티 어트리뷰터 [[Get]]의 값(=getter 함수)가   
  호출되고 결과가 프로퍼티 값으로 반환됨)

#### [[Set]]
* 프로퍼티 디스크립터 객체의 프로퍼티 : set
* 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수   
  (접근자 프로퍼티 키로 프로퍼티 값 저장 시 프로퍼티 어트리뷰트 [[Set]]의 값(=setter 함수)가   
  호출되고 결과가 프로퍼티 값으로 저장됨)

#### [[Enumerable]]
* 데이터 프로퍼티의 [[Enumerable]]와 같음

#### [[Configurable]]
* 데이터 프로퍼티의 [[Configurable]]와 같

#### ex)
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
person.fullName = 'hoho Lee'; //접근자 프로퍼티 fullName에 값 저장 시 setter 함수 호출
console.log(person); //{firstName: 'hoho', lastName: 'Lee'}

//접근자 프로퍼티를 통한 프로퍼티 값의 참조
//접근자 프로퍼티 fullName에 접근 시 getter 함수 호출
console.log(person.fullName); //hoho Lee

//firstName = 데이터 프로퍼티  
//데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: 'hoho', writable: true, enumerable: true, configutable: true}

//fullName = 접근자 프로퍼티
//접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
//{get: f, set: f, enumerable: true, configurable:true}
```

person 객체의 firstName, lastName은 일반적인 데이터 프로퍼티.  
메서드 앞에 get, set 붙은 메서드가 getter, setter 함수.  
getter/setter 함수명 fullName이 접근자 프로퍼티.  
접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 [[Value]])을 가지지 않으며  
데이터 프로퍼티의 값을 읽거나 저장할 때 관여함

접근자 프로퍼티 fullName으로 프로퍼티 값에 접근 시   
내부적으로 [[Get]] 내부 메서드가 호출되어 아래와 같이 동작함

1. 프로퍼티 키가 유효한지 확인. 프로퍼티 키는 문자열이나 심벌이어야 함  
   -> 프로퍼티 키 'fullName'은 문자열이므로 유효한 프로퍼티 키
2. 프로토타입 체인에서 프로퍼티를 검색함.   
   -> person 객체에 fullName 프로퍼티 존재함
3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인   
   -> fullName 프로퍼티는 접근자 프로퍼티.
4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값(=getter 함수)를 호출해 결과를 반환함   
   fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는   
   프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같음

접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 아래와 같음
```js
//일반 객체의 __proto__는 접근자 프로퍼티
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
//{get:f, set:f, enumerable: false, configurable:tre}

//함수 객체의 prototype은 데이터 프로퍼티
Object.getOwnPropertyDescriptor(function(){}, 'prototype');
//{value: {...}, writable: true, enumerable: false, configurable: false}
```

#### <프로토타입>  
* 프로토타입 : 어떤 객체의 부모 역할을 하는 객체
* 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속함
* 프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는   
  자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용 가능함
* 프로토타입 체인 : 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조
* 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티나 메서드가 없다면  
  프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 겁색함


## 4. 프로퍼티 정의
* 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나,   
  기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것
* 이를 통해 객체의 프로퍼티가 어떻게 동작해야하는지를 명확히 정의할 수 있음  
* `Object.defineProperty` 메서드 사용 시 프로퍼티의 어트리뷰트를 정의할 수 있음  
  인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달함  
```js
const person = {};

//데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Park',
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(person, 'lastName', {
  value: 'Leo'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
//firstName {value: 'Park', writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
//디스크립트 객체의 프로퍼티를 누락시키면 undefined, false가 기본 값
//lastName {value: 'Leo', writable: false, enumerable: false, configurable: false}

//[[Enumerable]] 값이 false인 경우
//해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거 불가능
//lastName 프로퍼티는 [[Enumerable]] 값이 false이므로 열거되지 않음
console.log(Object.keys(person)); //['firstName']

//[[Writable]] 값이 false인 경우
//해당 프로퍼티의 값 변경 불가능. 값 변경 시 에러는 발생하지 않고 무시됨
//lastName 프로퍼티는 [[Writable]] 값이 false이므로 값 변경 불가
person.lastName = 'Kim';

//[[Configurable]] 값이 false인 경우
//해당 프로퍼티를 재정의하거나 삭제할 수 없음. 프로퍼티 삭제 시 에러는 발생하지 않고 무시됨
delete person.lastName;
Object.defineProperty(person, 'lastName', { enumerable: true }); //Uncaught TypeError

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastNmae', descriptor);
//lastName {value: 'Leo', writable: false, enumerable: false, configurable: false}


//접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
//fullName {get:f, set:f, enumerable:true, configurable:true}

person.fullName = 'Wow Leo',
console.log(person); //{firstName: 'Wow', lastName:'Leo'}
```

### 프로퍼티 정의 시 디스크립터 객체에서 생략된 어트리뷰트 기본 값
`Object.defineProperty` 메서드로 프로퍼티 정의 시 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략 가능함  
프로퍼티 디스크립터 객체에서 생략된 어트리뷰트는 다음과 같이 기본 값이 적용됨  

|프로퍼티 디스크립트 객체의 프로퍼티|대응하는 프로퍼티 어트리뷰트|생략했을 때의 기본 값|
|:-|:-|:-|
|value|[[Value]]|undefined|
|get|[[Get]]|undefined|
|set|[[Set]]|undefined|
|writable|[[Writable]]|false|
|enumerable|[[Enumerable]]|false|
|configurable|[[Configurable]]|false|

### 한번에 여러 개 프로퍼티 정의
`Object.defineProperty` 메서드는 한번에 하나의 프로퍼티만 정의 가능  
`Object.defineProperties` 메서드 사용 시 여러 개의 프로퍼티를 한번에 정의 가능함
```js
const person = {};
Object.defineProperties(person, {
  firstName: {
    value: 'Park',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value: 'Leo',
    writable: true,
    enumerable: true,
    configurable: true
  },
  fullName: {
      get(){
          return `${this.firstName} ${this.lastName}`;
      },
    set(name){
          [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
  }
});
person.fullName = 'Wow Leoo';
console.log(person); //{ firstName: 'Wow', lastName: 'Leoo' }
```


## 5. 객체 변경 방지
객체는 변경 가능한 값이므로 재할당 없이 직접 변경 가능함.    
즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티의 값을 갱신할 수 있으며  `Object.defineProperty`,   
`Object.defineProperties`메서드를 사용해 프로퍼티 어트리뷰를 재정의 할 수 있음  

자바스크립트는 객체의 변경을 방지하는 다양한 메소드를 제공하는데  
객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다름 

|구분|메서드|추가|삭제|값 읽기|값 쓰기|어트리뷰트<br>재정의|
|:-|:-|:-:|:-:|:-:|:-:|:-:|
|객체 확장 금지|`Object.preventExtensions`|X|O|O|O|O|
|객체 밀봉|`Object.seal`|X|X|O|O|X|
|객체 동결|`Object.freeze`|X|X|O|X|X|


### 5-1. 객체 확장 금지
* `Object.preventExtensions` 메서드는 객체의 확장을 금지함
* 객체 확장 금지 : 프로퍼티 추가 금지를 의미
* 즉, **확장이 금지된 객체는 프로퍼티 추가 금지**
* 프로퍼티는 프로퍼티 동적 추가와 `Object.defineProperty` 메서드로 추가 가능한데 두 방법 모두 금지됨
* 확장 가능한 객체인지의 여부는 `Object.isExtensible` 메서드로 확인 가능
```js
const person = {name: 'Leo'};

//person 객체는 확장이 금지된 객체 아님
console.log(Object.isExtensible(person)); //true

//person 객체의 확장을 금지해 프로퍼티 추가를 금지함
Object.preventExtensions(person);

//person 객체는 확장이 금지된 객체
console.log(Object.isExtensible(person)); //false

//프로퍼티 추가가 금지됨
person.age = 20; //무시. static mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 추가는 금지되지만 삭제는 가능
delete person.name;
console.log(person); //{}

//프로퍼티 정의에 관한 프로퍼티 추가도 금지됨
Object.defineProperty(person, 'age', {value:26}); //TypeError
```

### 5-1. 객체 밀봉
* `Object.seal` 메서드는 객체를 밀봉함
* 객체 밀봉 : 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미  
* 즉, **밀봉된 객체는 읽기와 쓰기만 가능**  
* 밀봉된 객체인지의 여부는 `Object.isSealed` 메서드로 확인 가능
```js
const person = {name: 'Leo'};

//person 객체는 밀봉된 객체가 아님
console.log(Object.isSealed(person)); //false

//person 객체를 밀봉해 프로퍼티 추가, 삭제, 재정의를 금지
Object.seal(person);

//person 객체는 밀봉된 객체
console.log(Object.isSealed(person)); //true

//밀봉된 객체는 configurable이 false
console.log(Object.getOwnPropertyDescriptors(person));
// { name: { value: 'Leo', writable: true, enumerable: true, configurable: false } }

//프로퍼티 추가가 금지됨
person.age = 26; //무시. strict mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 삭제가 금지됨
delete person.name //무시. strict mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 값 갱신은 가능
person.name = 'Park';
console.log(person); //{name: 'Park'}

//프로퍼티 어트리뷰트 재정의가 금지됨
Object.defineProperty(person, 'name', { configurable: true }); //TypeError
```

### 5-3. 객체 동결
* `Object.freeze` 메서드는 객체를 동결함
* 객체 동결 = 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미
* 즉, **동결된 객체는 읽기만 가능**
* 동결된 객체인지의 여부는 `Object.isFrozen` 메서드로 확인 가능
```js
const person = {name: 'Leo'};

//person 객체는 동결된 객체가 아님
console.log(Object.isFrozen(person)); //false

//person 객체를 동결해 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지
Object.freeze(person);

//person 객체는 동결된 객
console.log(Object.isFrozen(person)); //true

//동결된 객체는 writable과 configurable이 false
console.log(Object.getOwnPropertyDescriptors(person));
// { name: { value: 'Leo', writable: false, enumerable: true, configurable: false } }

//프로퍼티 추가가 금지됨
person.age = 26; //무시. strict mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 삭제가 금지됨
delete person.name; //무시. strict mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 값 갱신이 금지됨
person.name = 'Park'; //무시. strict mode에서는 에러 발생
console.log(person); //{name: 'Leo'}

//프로퍼티 어트리뷰트 재정의가 금지됨
Object.defineProperty(person, 'name', { configurable: true }) //TypeError
```

### 5-4. 불변 객체
위에 살펴본 변경 방지 메서드들은 얕은 변경 방지로   
직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 못함  
```js
const person = {
  name: 'Leo',
  address: {city: 'Seoul'}
};

//얕은 객체 동결
Object.freeze(person);

//직속 프로퍼티만 동결함
console.log(Object.isFrozen(person)); //true
//중첩 객체까지는 동결하지 못함
console.log(Object.isFrozen(person.address)); //false

person.address.city = 'Busan';
console.log(person); //{name: 'Leo', address: {city: 'Busan'}}
```

객체의 중첩 객체까지 동결해 변경 불가능한 읽기 전용의 불변 객체를 구현하기 위해션  
객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 함
```js
function deepFreeze(target) {
  //객체가 아니거나 동결된 객체는 무시하고 동결되지 않은 객체만 동결함
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    //모든 프로퍼티를 순회하며 재귀적으로 동결
    //Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환함
    //forEach 메서드는 배열을 순회하며 배열 각 요소에 대해 콜백 함수를 실행
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: 'Leo',
  address: {city: 'Seoul'}
};

//깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); //true
console.log(Object.isFrozen(person.address)); //true

person.address.city = 'Busan';
console.log(person); //{name: 'Leo', address: {city: 'Seoul'}}
```
