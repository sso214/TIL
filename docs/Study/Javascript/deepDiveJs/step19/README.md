---
title : 19장. 프로토타입   
date : 2022.05.30
---

# 19장. 프로토타입
JS는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어 

클래스와 상속, 캡슐화를 위한 키워드가 없어 객체지향 언어가 아니라고 오해하는 경우도 있지만  
클래스 기반 객체지향 언어보다 더 강력하고 효율적인 객체지향 능력을 지니고 있는   
프로토타입 기반의 객체지향 프로그래밍 언어.  

JS는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체  
(원시 타입 값을 제외한 나머지 값들은 모두 객체)

#### <클래스>
ES6에서 클래스가 도입되었지만 기존의 프로토타입 기반 객체지향 모델을 폐지하는 것은 아님  
사실 클래스도 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수 있음

클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만  
클래스는 생성자 함수에서 제공하지 않는 기능을 제공하며 더 엄격함  

따라 클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕으로 보기보단  
새로운 객체 생성 메커니즘으로 보는 것이 좀 더 합당함


## 1. 객체지향 프로그래밍
객체지향 프로그래밍 : 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임 

실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목시키려는 시도에서 시작함  
실체는 특징이나 성질을 나타내는 속성을 가지고 있고, 속성을 통해 실체를 인식하거나 구별 가능함

객체지향 프로그래밍은 객체의 상태를 나타내는 데이터(=프로퍼티)와   
상태 데이터를 조작할 수 있는 동작(=메서드)을 하나의 논리적 단위로 묶어 생각함

각 객체는 독립적인 부품으로 볼 수 있지만 다른 객체와 관계성을 가질 수 있음    
다른 객체와 메세지를 주고받거나 데이터를 처리할 수도 있으며, 상태 데이터나 동작을 상속받아 사용하기도 함

* 객체 : 속성을 통해 여러 개의 값(상태 데이터, 동작)을 하나의 단위로 구성한 복합적인 자료구조
* 추상화 : 다양한 속성 중 프로그램에 필요한 속성만 간추려 표현하는 것
* 명령형 프로그래밍 : 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 절차지향적 관점


## 2. 상속과 프로토타입
상속은 객체지향 프로그래밍의 핵심 개념  
어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 의미    

JS는 프로토타입을 기반으로 상속을 구현해 불필요한 중복을 제거함   
(기존의 코드를 적극적으로 재사용하는 방식)  

```js
//생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    //Math.PI는 원주율을 나타내는 상수
    return Math.PI * this.radius ** 2;
  };
}


const circle1 = new Circle(1); //반지름이 1인 인스턴스 생성
const circle2 = new Circle(2); //반지름이 2인 인스턴스 생성

//Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 
//getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유함
//getArea 메서드는 하나만 생성해 모든 인스턴스가 공유해 사용하는 것이 바람직함
console.log(circle1.getArea === circle2.getArea); //false
console.log(circle1.getArea()); //3.14...
console.log(circle2.getArea()); //12.56...
```
생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하지만    
인스턴스 생성 시마다 메서드를 중복 생성하고 모든 인스턴스가 중복 소유함    

동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 사용하는 것은 메모리 낭비이고,  
인스턴스 생성 시마다 메서드를 생성해 퍼포먼스에도 악영향을 주므로  
모든 인스턴스가 동일한 내용의 메서드를 사용하는 경우 메서드는 하나만 생성해 공유해 사용하는 것이 바람직함

-> 상속(**자바스크립트는 프로토타입을 기반을 상속을 구현**)을 통해 불필요한 중복을 제거 가능함   

```js
//생성자 함수
function Circle(radius) {
  this.radius = radius;
}

//Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해 사용할 수 있도록 프로토타입에 추가
//프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있음
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

//인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
//프로토타입 Circle.prototype 으로부터 getArea 메서드를 상속받음
//즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유함
console.log(circle1.getArea === circle2.getArea); //true
console.log(circle1.getArea()); //3.14...
console.log(circle2.getArea()); //12.56...
```
Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입(상위 객체 역할을 하는)  
Circle.prototype의 모든 프로퍼티와 메서드를 상속 받음  
getArea 메서드는 하나만 생성되어 프로토타입인 Circle.prototype의 메서드로 할당되어 있음  
따라 Circle 생성자 함수가 생성하는 모든 인스턴스는 getArea 메서드를 상속받아 사용 가능  
(= radius 프로퍼티만 개별적으로 소유하고 내용이 동일한 메서드는 상속을 통해 공유해 사용함)  

상속은 코드의 재사용 관점에서 매우 유용  
공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해두면 생성자 함수가 생성할 모든 인스턴스는   
별도의 구현없이 상위(부모) 객체인 프로토타입의 자산을 공유해 사용 가능함


## 3. 프로토타입 객체
* (=프로토타입)
* 객체 간 상속을 구현하기 위해 사용됨  
* 어떤 객체의 상위 객체 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공함 
* 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용 가능  

모든 객체는 [[Prototype]] 내부 슬롯을 가짐        
[[Prototype]] 내부 슬롯의 값 = 프로토타입의 참조(null인 경우 있음)     
객체 생성 시 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장됨  
ex)   
객체 리터럴에 의해 생성된 객체의 프로토타입 = Object.prototype  
생성자 함수에 의해 생성된 객체의 프로토타입 = 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체  


모든 객체는 하나의 프로토타입을 가지며 모든 프로토타입은 생성자 함수와 연결되어 있음   
([[Prototype]] 내부 슬롯의 값이 null인 객체는 프로토타입 없음)

객체 : \__proto\__접근자 프로퍼티를 통해 프로토타입에 간접적으로 접근 가능   
프로토타입 : 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근 가능      
생성자 함수 : 자신의 prototype 프로퍼티를 통해 프로토타입에 접근 가능   


### 3-1. \__proto\__접근자 프로퍼티
모든 객체는 \__proto\__접근자 프로퍼티를 통해   
자신의 프로토타입([[Prototype]] 내부 슬롯)에 간접적으로 접근 가능     

#### 3-1-1. \__proto\__는 접근자 프로퍼티다.
* 내부 슬롯은 프로퍼티가 아니기 때문에 내부 슬롯과 내부 메서드는 직접적으로 접근하거나 호출 불가  
  단, 일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근할 수 있는 수단을 제공함  
  [[Prototype]] 내부 슬롯에도 직접 접근 불가하며, \__proto\__접근자 프로퍼티를 통해  
  간접적으로 [[Prototype]] 내부 슬롯의 값(=프로토타입)에 접근 가능 

* 접근자 프로퍼티는 자체적으로 값([[Value]] 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의   
  값을 읽거나 저장할 때 사용하는 접근자 함수([[Get]], [[Set]]프로퍼티 어트리뷰트)로 구성된 프로퍼티  

* Object.prototype의 접근자 프로퍼티인 \__proto\__는 getter/setter 함수라고 부르는 접근자 함수  
  ([[Get]], [[Set]] 프로퍼티 어트리뷰트에 할당된 함수)를 통해 프로토타입을 취득하거나 할당함  
  * \__proto\__접근자 프로퍼티를 통해 프로토타입에 접근 시 내부적으로   
    \__proto\__접근자 프로퍼티의 getter 함수인 [[Get]]이 호출됨
  * \__proto\__접근자 프로퍼티를 통해 새로운 프로토타입을 할당 시   
    \__proto\__접근자 프로퍼티의 setter 함수인 [[Set]]이 호출됨

```js
const obj = {};
const parent = {x:1};

//getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
//setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); //1
```

#### 3-1-2. \__proto\__접근자 프로퍼티는 상속을 통해 사용된다.
* \__proto\__접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아닌 Object.prototype의 프로퍼티  
* 모든 객체는 상속을 통해 Object.prototype.\__proto\__접근자 프로퍼티를 사용 가능
```js
const person = {name: 'Leo'};

//person 객체는 __proto__ 프로퍼티를 소유하지 않음
console.log(person.hasOwnProperty('__proto__')); //false

//__proto__프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
//{get:f, set:f, enumerable:fasle, configurable:true}

//모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용 가능
console.log({}.__proto__ === Object.prototype); //true
```

> **Object.prototype**  
> 모든 객체는 프로토타입 계층 구조인 프로토타입 체인에 묶여 있음  
> 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에   
> 접근하려는 프로퍼티가 없다면 \__proto\__접근자 프로퍼티가 가리키는 참조를 따라   
> 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색함  
> <br>
> 프로토타입 체인의 종점(=프로토타입 체인의 최상위 객체는) Object.prototype 이며,  
> 이 객체의 프로퍼티와 메서드는 모든 객체에 상속됨

#### 3-1-3. \__proto\__접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
**상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지**하기 위해서
```js
const parent = {};
const child = {};

//child의 프로토타입을 parent로 설정
child.__proto__ = parent;
//parent의 프로토타입을 child로 설정
parent.__proto__ = child; //TypeError
```
서로가 자신의 프로토타입이 되는 코드가 정상적으로 처리되면 비정상적인 프로토타입 체인이   
만들어지기 때문에 \__proto\__접근자 프로퍼티는 에러를 발생시킴

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 함  
(=프로퍼티 검색 방향이 한방향으로만 흘러가야 함)  
서로가 자신의 프로토타입이 되는(=순환 참조하는) 비정상적인 프로토타입 체인이 만들어지면  
프로토타입타입 체인 종점이 존재하지 않게 때문에 프로퍼티 검색 시 무한 루프에 빠짐    

따라 아무런 체크 없이 무조건적으로 프로토타입을 교체하지 못하도록 \__proto\__접근자 프로퍼티를 통해  
프로토타입에 접근하고 교체하도록 구현되어 있음

#### 3-1-4. \__proto\__접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
* \__proto\__접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준.  
  브라우저 호환성을 고려해 ES6에서 표준으로 채택함 (현재 대부분-IE11이상-의 브라우저에서 지원함)

* 모든 객체가 \__proto\__접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에  
  코드 내에서 \__proto\__접근자 프로퍼티를 직접 사용하는 것은 권장하지 않음  
  (직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에  
  \__proto\__접근자 프로퍼티를 사용할 수 없는 경우 있음)
  ```js
  //obj는 프로토타입 체인의 종점. 따라 Object.__proto__를 상속 받을 수 없음
  const obj = Object.create(null);
  
  //obj는 Object.__proto__를 상속받을 수 없음
  console.log(obj.__proto__); //undefined
  
  //따라 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋음
  console.log(Object.getPrototypeOf(obj)); //null
  ```

* 따라 프로토타입의 참조를 취득하고 싶은 경우 Object.getPrototypeOf 메서드를 사용하고,  
  프로토타입을 교체하고 싶은 경우 Object.setPrototypeOf 메서드 사용을 권장  
  
  두 메서드는 `get Object.prototype.__proto__`,   
  `set Object.prototype.__proto`의 처리 내용과 정확히 일치함  
  * Object.getPrototypeOf : ES5에서 도입, IE9 이상에서 지원
  * Object.setPrototypeOf : ES6에서 도입, IE11 이상에서 지원
  ```js
  const obj = {};
  const parent = { x : 1 };
  
  //obj 객체의 프로토타입을 취득
  Object.getPrototypeOf(obj); //obj.__prototo__;
  //obj 객체의 프로토타입을 교체
  Object.setPrototypeOf(obj, parent); //obj.__proto__ = parent;
  
  console.log(obj.x); //1
  ```

### 3-2. 함수 객체의 prototype 프로퍼티
* 함수 객체만이 소유
* 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킴  
* 생성자 함수로 호출할 수 없는 함수(non-constructor : 화살표 함수, ES6 메서드 축약 표현으로 정의한 메서드)는    
  prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않음
```js
//함수 객체는 prototype 프로퍼티를 소유함
(function(){}).hasOwnProperty('prototype'); //true

//일반 객체는 prototype 프로퍼티를 소유하지 않음
({}).hasOwnProperty('prototype'); //false


//화살표 함수는 non-constructopr
const Person = name => {
    this.name = name;
};

//ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructopr
const obj = {
  foo(){}
};

//non-constructopr는 prototype 프로퍼티를 소유하지 않음
console.log(Person.hasOwnProperty('prototype')); //false
console.log(obj.foo.hasOwnProperty('prototype')); //false

//non-constructopr는 프로토타입을 생성하지 않음
console.log(Person.prototype); //undefined
console.log(obj.foo.prototype); //undefined
```

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를  
소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없음  

모든 객체가 가지고 있는 (Object.prototype으로부터 상속받은) \__proto\__접근자 프로퍼티와   
함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킴  
하지만 이들 프로퍼티를 사용하는 주체가 다름

|구분|소유|값|사용 주체|사용 목적|
|:-|:-|:-|:-|:-|
|\__proto\__<br>접근자 프로퍼티|모든 객체|프로토타입의<br>참조|모든<br>객체|객체가 자신의 프로토타입에<br>접근 또는 교체하기 위해 사용|
|prototype<br>프로퍼티|constructor|프로토타입의<br>참조|생성자<br>함수|생성자 함수가 자신이 생성할 객체<br>(인스턴스)의 프로토타입을 할당하기<br>위해 사용

```js
//생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person('Leo');

//결국 Person.prototype과 me.__proto__는 동일한 프로토타입을 가리킴
console.log(Person.prototype === me.__proto__); //true
```

### 3-3. 프로토타입의 constructor 프로퍼티와 생성자 함수
모든 프로토타입은 constructor 프로퍼티를 가짐  
constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴  
이 연결은 생성자 함수가 생성될 때(즉, 함수 객체가 생성될 때) 이뤄짐
```js
//생성자 함수
function Person(name) {
    this.name = name;
}
const me = new Person('Leo');

//me 객체의 생성자 함수는 Person
console.log(me.constructor === Person); //true
```
Person 생성자 함수로 생성된 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결됨   

me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 있음.   
따라 me 객체는 프로토타입인 Person.prototype의 constructor프로퍼티를 상속받아 사용 가능


## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결됨  
이때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수  

하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로   
new 연산자와 함께 생성자 함수를 호출해 인스턴스를 생성하지 않는 객체 생성 방식도 있음  

리터럴 표기법에 의해 생성된 객체도 물론 프로토타입 존재함   
하지만 해당 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가  
반드시 객체를 생성한 생성자 함수라고 단정할 수는 없음
```js
//객체 리터럴
const obj = {};

//함수 리터럴
const add = function(a,b) {return a + b};

//배열 리터럴
const arr = [1,2,3];

//정규 표현식 리터럴
const regexp = /is/ig;


//obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했지만 
//하지만 obj 객체의 생성자 함수는 Object 생성자 함수
console.log(obj.constructor === Object); //true
```
obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체지만    
Object 생성자 함수와 constructor 프로퍼티로 연결되어 있음  
그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수로 생성되는 것은 아닐까?  

---
ECMAScript 사양을 살펴보면   
Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출 시 내부적으로는   
추상 연산 OrdinaryObjectCreate를 호출해 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성함  

> 추상 연산 : ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것  
> ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사 코드라고 이해하면 됨

```js
//2. Object 생성자 함수에 의한 객체 생성
//인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출해 빈 객체를 생성함
let obj = new Object();
console.log(obj); //{}

//1. new.target이 undefined나 Object가 아닌 경우
//인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성됨
class Foo extends Object {}
new Foo(); //Foo{}

//3. 인수가 전달된 경우에는 인수를 객체로 변환함
//Nubmer 객체 생성
obj = new Object(123);
console.log(obj); //Number {123}

//String 객체 생성
obj = new Object('123');
console.log(obj); //String {'123'}
```

객체 리터럴이 평가될 떄는 추상 연산 OrdinaryObjectCreate를 호출해   
빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있음

이처럼 Object 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 OrdinaryObjectCreate를 호출해  
빈 객체를 생성하는 점에서 동일하나 세부 내용(new.target의 확인, 프로퍼티 추가하는 처리 등)은 다름  
따라 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 이님  

함수 객체의 경우 차이가 더 명확함  
Function 생성자 함수를 호출해 생성한 함수는 렉시컬 스코프를 만들지 않고   
전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않음.    
따라 함수 선언문과 함수 표현식을 평가해 함수 객체를 생성한 것은 Function 생성자 함수가 아님  
하지만 constructor 프로퍼티를 통해 확인해보면 foo 함수의 생성자 함수는 Function 생성자 함수로 나옴
```js
//foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성함
function foo(){}

//하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수.
console.log(foo.constructor === Function); //true
```
리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요함  
따라 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 가짐  
**프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 떄문**  
(프로토타입은 생성자 함수와 더불어 생성되며 prototype.constructor 프로퍼티에 의해 연결되어있음)

리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니지만  
큰 틀에서 생각해보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적으로 큰 차이는 없음  
생성 과정이나 스코프, 클로저 등의 미묘한 차이는 있지만 결국 동일한 특성을 가짐  
따라 프로토타입의 constructor 프로퍼티를 통해 연결되있는 생성자 함수를   
"리터럴 표기법으로 생성한 객체를 생성한" 생성자 함수로 생각해도 크게 무리는 없음  

리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
|리터럴 표기법|생성자 함수|프로토타입|
|:-|:-|:-|
|객체 리터럴|Object|Object.prototype|
|함수 리터럴|Function|Function.prototype|
|배열 리터럴|Array|Array.prototype|
|정규 표현식 리터럴|RegExp|RegExp.prototype|


## 5. 프로토타입의 생성 시점
객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 **결국 모든 객체는 생성자 함수와 연결**되어 있음  
Object.create 메서드와 Class로 객체를 생성하는 방법도 있는데   
해당 방법으로 생성한 객체도 생성자 함수와 연결되어 있음  

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됨**  
프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문  

생성자 함수는 사용자 정의 생성자 함수와 빌트인 생성자 함수로 구분할 수 있음  
둘로 구분해 프로토타입 생성 시점을 알아보자  

### 5-1. 사용자 정의 생성자 함수와 프로토타입 생성 시점
* **생성자 함수로서 호출할 수 있는 함수(=constructor)는 함수 정의가 평가되어  
  함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됨**   
* 생성자 함수로 호출 불가능한 함수(=non-constructor)는 프로토타입이 생성되지 않음
```js
//함수 정의(constructor)가 평가되어 함수 객체 생성하는 시점에 프로토타입도 더불어 생성됨
console.log(Person.prototype); //{constructor: f}
//생성자 함수
function Person(name) {
  this.name = name;
}

//non-constructor 함수
const Person2 = name => {
    this.name = name;
}
//non-constructor 함수는 프로토타입이 생성되지 않음
console.log(Person2.prototype); //undefined
```
함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행되기 때문에  
Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 되며 이때 프로토타입도 더불어 생성됨  

생성된 프로토타입은 오직 constructor 프로퍼티만 가지며  
생성자 함수의 prototype 프로퍼티에 바인딩 됨  

프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖음  
생성된 프로토타입의 프로토타입은 언제나 Object.prototype

### 5-2. 빌트인 생성자 함수와 프로토타입 생성 시점
Object, String, Function, Array 등 빌트인 생성자 함수도 일반 함수와 마찬가지로  
빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성됨  

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성됨  
생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩됨  

이처럼 객체가 생성되기 이전 생성자 함수와 프로토타입은 이미 객체화되어 존재함  
**이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은  
생성된 객체의 [[Prototype]] 내부 슬롯에 할당됨**  
이로써 생성한 생성된 객체는 프로토타입을 상속받음 

#### <전역 객체>
전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수 객체  
전역 객체는 클라이언트 사이드 환경에서는 window, 서버 사이드 환경에서는 global 객체를 의미함  

전역 객체는 표준 빌트인 객체들(Object, String 등)과 환경에 따른 호스트 객체  
(클라이언트 Web API, Node.js의 호스트 API), var 키워드로 선언한 전역 변수와   
전역 함수를 프로퍼티로 가짐  
Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수   

표준 빌트인 객체인 Object도 전역 객체의 프로퍼티며 전역 객체가 생성되는 시점에 생성됨  


## 6. 객체 생성 방식과 프로토타입의 결정
객체는 다양한 생성 방법이 있음 
* 객체 리터럴
* Object 생성자 함수
* 생성자 함수
* Object.create 메서드
* 클래스(ES6)

다양한 방식으로 생성된 모든 객체는 세부적인 객체 생성 방식의 차이는 있으나   
추상 연산 OrdinaryObjectCreate 에 의해 생성된다는 공통점 있음   

#### 추상 연산 OrdinaryObjectCreate
* 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받음  
* 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있음  
* 빈 객체 생성 ->   
  객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가 ->   
  인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당 ->   
  생성한 객체를 반환

즉, 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정됨  
이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정됨  

### 6-1. 객체 리터럴에 의해 생성된 객체의 프로토타입
산객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype  

### 6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype  

객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있음  
객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만  
Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 함  

### 6-3. 생성자 함수에 의해 생성된 객체의 프로토타입
생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체   

표준 빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 Object.prototype은   
다양한 빌트인 메서드(hasOwnProperty 등)을 가지고 있음.   
하지만 사용자 정의 함수와 더불어 생성된 프로토타입의 프로퍼티는 constructor 뿐  

프로토타입은 객체이므로 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있음  
그리고 이렇게 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영됨  


## 7. 프로토타입 체인
자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면  
[[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색함  
=> 이를 프로토타입 체인이라고 함  
프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘  
```js
function Person(name) {
    this.name = name;
}

//프로토타입 메서드
Person.prototype.sayHello = function(){
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Leo');

//hasOwnProperty는 Object.prototype의 메서드
//me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색해 사용함
me.hasOwnProperty('name'); //true
```
위의 코드 실행 시 자바스크립트 엔진은 다음과 같은 과정을 거쳐 메서드를 검색함 (프로퍼티 참조 경우도 마찬가지)  
1. 먼저 hasOwnProperty 메서드를 호출한 me 객체에서 hasOwnProperty 메서드를 검색.    
   me 객체에는 없으므로 프로토타입 체인을 따라 ([[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입)  
   이동해 hasOwnProperty 메서드를 검색함 
2. Person.prototype에도 해당 메서드가 없으므로 프로토타입 체인을 따라 이동해 다시 검색함
3. Object.prototype에는 해당 메서드가 존재함.  
   자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출함  
   이때 Object.prototype.hasOwnProperty 메서드의 this에는 me객체가 바인딩됨  
   ```js  
   //call 메서드 : this로 사용할 객체를 전달하면서 함수를 호출함  
   Object.prototype.hasOwnProperty.call(me, 'name') 
   ```

#### Object.prototype
* 프로토타입 체인의 최상위에 위치하는 객체 (=프로토타입 체인의 종점)
* 모든 객체는 Object.prototype을 상속받음  
* Object.prototype의 프로토타입 (=[[Prototype]] 내부 슬롯의 값)은 null
* Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환함 (에러 발생 X)  

이처럼 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색함  
따라 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이라고 할 수 있음  
이에 반해, 프로퍼티가 아닌 식별자는 스코프체인에서 검색함  
따라 스코프체인은 식별자 검색을 위한 메커니즘이라고 할 수 있음  
```js
me.hasOwnProperty('name');
```
위 예제의 경우 먼저 스코프 체인에서 me 식별자를 검색 ->   
me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색됨 ->  
me 식별자 검색 후 me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색함  

이처럼 스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는게 아니라  
서로 협력해 식별자와 프로퍼티를 검색하는데 사용됨  


## 8. 오버라이딩과 프로퍼티 섀도잉
* 프로토타입 프로퍼티 : 프로토타입이 소유한 프로퍼티   
* 인스턴스 프로퍼티 : 인스턴스가 소유한 프로퍼티  

프로토타입 프로퍼티와 같은 명의 프로퍼티를 인스턴스에 추가 시 프로토타입 체인을 따라  
프로토타입 프로퍼티를 검색해 덮어쓰는게 아니라 인스턴스 프로퍼티로 추가함  
이떄 인스턴스 메서드는 프로토타입 메서드를 오버라이딩했고 프로토타입 메서드는 가려짐  
이처럼 상속 관게에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라고 함  

* 오버라이딩 : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의해 사용하는 방식
* 오버로딩 : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고  
  매개변수에 의해 메서드를 구별해 호출하는 방식. 자바스크립트는 오버로딩을 지원하지 않지만  
  arguments 객체를 사용해 구현 가능함  

프로퍼티 삭제 경우도 마찬가지  
프로토타입 메서드가 아닌 인스턴스 메서드가 삭제됨  

이처럼 하위 객체를 통해 프로토타입의 프로퍼티를 변경, 삭제하는 것은 불가능  
하위 객체를 통해 프로토타입의 get 액세스는 허용되지만 set 액세스는 허용되지 않음  

프로토타입 프로퍼티를 변경, 삭제하려면 프로토타입에 직접 접근해야 함  


## 9. 프로토타입의 교체
프로토타입은 임의의 다른 객체로 변경 가능함  
즉, 부모 객체인 프로토타입을 동적으로 변경가능하다는 걸 의미  
이런 특징을 활용해 객체 간의 상속 관계를 동적으로 변경하 룻 있음  
프로토타입은 생성자 함수 또는 인스턴스에 의해 교체 가능함  

프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 많이 번거로움  
따라 프로토타입은 직접 교체하지 않는게 좋음  
상속 관계를 인위적으로 설정하려면 직접 상속이 더 편리하고 안전함  
또한 ES6에서 도입된 클래스 사용 시 간편하고 직관적으로 상속 관계 구현 가능함  

### 9-1. 생성자 함수에 의한 프로토타입의 교체  
프로토타입 교체 시 constructor 프로퍼티와 생성자 함수 간의 연결이 파고됨    
프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가해   
프로토타입의 constructor 프로퍼티를 되살림  


### 9-2. 인스턴스에 의한 프로토타입의 교체
프로토타입은 생성자 함수의 prototype 프로퍼티 뿐 아니라   
인스턴스의 \__proto\__접근자 프로퍼티를 통해서도 접근 가능함    
따라 프로토타입 교체도 가능함  

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은   
미래에 생성한 인스턴스의 프로토타입을 교체하는 것  
\__proto\__접근자 프로퍼티르 통해 프로토타입을 교체하는 것은   
이미 생성된 객체의 프로토타이븡ㄹ 교체하는 것임  

생성자 함수에 의한 프로토타입 교체와 인스턴스에 의한 프로토타입 교체는   
별다른 차이가 없어보이지만 미묘한 차이가 있음  
* 생성자 함수에 의한 프로토타입 교체 :   
  생성자 함수의 프로퍼티가 교체된 프로토타입을 가리킴  
* 인스턴스에 의한 프로토타입 교체 :   
  생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않음  


## 10. instanceof 연산자
* `객체 instanceof 생성자함수`
* 좌변 : 객체를 가리키는 식별자, 우변 : 생성자 함수를 가리키는 식별자를 피연산자로 받음  
* 우변의 피연산자가 함수가 아닌 경우 TypeError 발생
* 우변 생성자 함수의 prototype에 바인딩된 객체가 좌변 객체의   
  프로토타입 체인 상에 존재하면 ture, 그렇지 않은 경우 false로 평가됨
* 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는게 아니라   
  생성자 함수의 prototype에 바인딩 된 객체가 프로토타입 체인 상에 존재하는지 확인함
* me instanceof Person :   
  me 객체의 프로토타입 체인 상에 Person.prototype에 바인딩된 객체가 존재하는지 확인
```js
//생성자 함수
function Person(name){
    this.name = name;
}
const me = new Person('Leo');

//Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Person); //true

//Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Object); //true


//프로토타입으로 교체할 객체
const parent = {};

//프로토타입의 교체
Object.setPrototypeOf(me, parent);

//Person 생성자 함수와 parent 객체는 연결되어 있지 않음
console.log(Person.prototype === parent); //false
console.log(parent.constructor === Person); //false

//Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않으므로 false
console.log(me instanceof Person); //false
//Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Object); //true


//parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩
Person.prototype = parent;

//Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Person); //true
//Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Object); //true
```

instanceof 연산자를 함수로 표현
```js
function isInstanceof(instance, constructor) {
  //프로토타입 취득
  const prototype = Object.getPrototypeOf(instance);

  //재귀 탈출 조건
  //prototype이 null이면 프로토타입 체인의 종점에 다다른 것
  if (prototype === null) return false;

  //프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true 반환
  //그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인함
  return prototype === constructor.prototype || isInstanceof(prototype, constructor);
}

console.log(isInstanceof(me, Person)); //true
console.log(isInstanceof(me, Object)); //true
console.log(isInstanceof(me, Array)); //false
```
따라 생성자 함수에 의해 프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수 간의   
연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로   
instanceof는 아무런 영향을 받지 않음
```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  //생성자 함수의 prototype 프로퍼티를 통해 프로토타입 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
  return Person();
}());

const me = new Person('Leo');

//constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되도 instanceof는 아무런 영향을 받지 않음
console.log(me.constructor === Person); //false
//Person.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Person); //true
//Object.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Object); //true
```


## 11. 직접 상속

### 11-1. Object.create에 의한 직접 상속

#### <Object.create 메서드>
* 명시적으로 프로토타입을 지정해 새로운 객체를 생성함  
* 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출함  
* 첫 번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체 전달.  
  두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체 전달    
  (Object.defineProperties 메서드의 두 번째 인수와 동일. 옵션이라 생략 가능함)
```js
/**
 * 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성해 반환함
 * @param {object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
 * @param {object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
 * @returns {object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
 * **/
Object.create(prototype[, propertiesObject]);
```

Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성함  
즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것.  
이 메서드의 장점은 아래와 같음  
* new 연산자 없이도 객체 생성 가능
* 프로토타입을 지정하면서 객체 생성 가능
* 객체 리터럴에 의해 생성된 객체도 상속받을 수 있음

참고로 Object.prototype의 빌트인 메서드인 Object.prototype.hasOwnProperty 등은  
모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 상속받아 호출 가능함  

`console.log(obj.hasOwnProperty('a))`  
근데 ESLint에서는 위와 같이 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않음  
Object.create 메서들르 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문  
프로토타입 체인의 종점에 위치하는 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없음  

따라 에러 발생 위험을 없애기 위해 Object.prototype의 빌트인 메서드는 간접적으로 호출하는 것이 좋음  
```js
const obj = Object.create(null);
obj.a = 1;

console.log(obj.hasOwnProperty('a')); //TypeError
console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); //true
```

### 11-2. 객체 리터럴 내부에서 \__proto\__에 의한 직접 상속
Object.create 메서드에 의한 직접 상속은 앞에서 다룬 것처럼 여러 장점이 있음  
하지만 두 번째 인자로 프로퍼티를 정의하는 것은 번거로움  
일단 객체 생성 이후 프로퍼티 추가하는 방법도 있으나 이 또한 깔끔한 방법은 아님  

ES6에서는 객체 리터럴 내부에 \__proto\__접근자 프로퍼티를 사용해 직접 상속을 구현할 수 있음
```js
const myProto = {x: 10};

//객체 리터럴에 의해 객체 생성하면서 프로토타이븡ㄹ 지정해 직접 상속받을 수 있음
const obj = {
  y: 20,
  //객체를 직접 상속받음
  //obj -> myProto -> Object.prototype -> null
  __proto__: myProto
};
console.log(obj.x, obj.y); //10 20
console.log(Object.getPrototypeOf(obj) === myProto); //true

//위 코드는 아래와 동일함
const obj = Object.create(myProto, {
  y: {value: 20, writable: true, enumerable: true, configurable: true}
});
```


## 12. 정적 프로퍼티/메서드
정적 프로퍼티/메서드란 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말함  
생성자 함수는 객체이므로 자신의 프로퍼티/메소드를 소유할 수 있음  
생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 함  

생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근 가능하지만  
정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로  
인스턴스로 참조/호출할 수 없음  

ex.  
Object.create 메서드는 Object 생성자 함수의 정적 메서드,   
Object.prototype.hasOwnProperty 메서드는 Object.prototype의 메서드  
따라 Object.create 메서드는 인스턴스(Object 생성자 함수가 생성한 객체)로 호출 불가  
Object.pototype.hasOwnProperty 메서드는 모든 객체가 호출 가능함  

만약 인스턴스/프로토타입 메서드 내에서 this를 사용하지 않는다면 그 메서드는 정적 메서드로 변경 가능함  
인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 this는 인스턴스를 가리킴  
메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경해도 동작함  
프로토타입 메서드를 호출하려면 인스턴스를 생성해야만 하지만 정적 메서드는 인스턴스를 생성하지 않아도 호출 가능  

참고로 프로토타입 프로퍼티/메서드를 표기 시 prototype을 #으로 포기하는 경우도 있음  
Object.prototype.isPrototypeOf -> Object#isPrototypeOf


## 13. 프로퍼티 존재 확인

### 13-1. in 연산자
* 객체 내 특정 프로퍼티가 존재하는지 여부를 확인함
* in 연산자는 확인 대상 객체의 프로퍼티 뿐 아니라   
  확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인함 
* in 연산자 대신 ES6에서 도입된 Reflect.has 메서드를 사용할 수도 있음 (in 연산자와 동일하게 동작함)
```js
//key : 프로퍼티 키를 나타내는 문자열
//object : 객체로 평가되는 표현식
key in object
```
```js
const person = {
  name: 'Leo',
  address: 'Seoul'
};
//person 객체에 name 프로퍼티가 존재
console.log('name' in person); //true
console.log('toString' in person); //true

console.log(Reflect.has(person, 'name')); //true
console.log(Reflect.has(person, 'toString')); //true
```

### 13-2. Object.prototype.hasOwnProperty 메서드
* Object.prototype.hasOwnProperty 메서드를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인 가능 
* 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 반환함  
  (상속받느 프로토타입의 프로퍼티 키인 경우 false 반환)
```js
console.log(person.hasOwnProperty('name')); //true
console.log(person.hasOwnProperty('toString')); //false
```


## 14. 프로퍼티 열거

### 14-1. for ...in 문
* 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중   
  프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true 프로퍼티를 순회하며 열거함  
* 객체의 프로퍼티 개수만큼 순회하며 for...in 문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당함  
* 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않음
* 상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열겨하려면   
  Object.prototype.hasOwnProperty 메서드를 사용해 객체 자신의 프로퍼티인지 확인해야 함
* for ...in문은 프로퍼티 열거 시 순서를 보장하지 않으므로 주의 필요  
  but. 대부분의 모던 브라우저는 순서를 보장하고 숫자(사실 문자열)인 프로퍼티의 키에 대해서는 정렬을 실시함
* 배열에는 for...in문을 사용하지 말고 for문이나 for..of, Array.prototype.forEach 메서드 사용을 권장  
  배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있음  

```js
//for (변수선언문 in 객체) {...}

const person = {
  name: 'Leo',
  address: 'Seoul'
};

//for ...in 문의 변수 prop에 person 객체의 프로퍼티키가 할당됨 
for (const key in person) {
    console.log(key + ': ' + person[key]);
}
//name: Leo
//address: Seoul
```
```js
const sym = Symbol();
const person = {
  name: 'Leo',
  address: 'Seoul',
  [sym]: 10,
  __proto__: {age: 20},
};

for (const key in person) {
    console.log(key + ': ' + person[key]);
}
//name: Leo
//address: Seoul
//age: 20

for (const key in person) {
  //객체 자신의 프로퍼티인지 확인
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ': ' + person[key]);
}
//name: Leo
//address: Seoul
```

### 14-2. Object.keys/values/entries 메서드
객체 자신의 고유 프로퍼티만 열거하기 위해서는 for ...in문을 사용하는 것보다   
Object.keys/values/entries 메서드 사용을 권장함


* Object.keys : 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환함
* Object.values : 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환함
* Object.entries : 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환함
