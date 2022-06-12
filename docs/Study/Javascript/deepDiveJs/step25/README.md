---
title : 25장. 클래스
date : 2022.06.09
---

# 25장. 클래스

## 1. 클래스는 프로토타입의 문법적 설탕인가?
자바스크립트는 프로토타입 기반 객체지향 언어   
(=클래스가 필요 없는 객체지향 프로그래밍 언어)    
ES5에서는 클래스 없이도 생성자 함수와 프로토타입을 이용해 객체지향 언어의 상속 구현 가능함

ES6에서 도입된 클래스는 클래스 기반 객체지향 프로그래밍 언어와 흡사한 새로운 객체 생성 메크니즘을 제시함  
그렇다고 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고   
새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아님  
사실 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼   
사용할 수 있도록 하는 문법적 설탕이라고 볼 수도 있음  

클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 사용하지만 정확히 동일하게 동작하진 않음  
서로 유사하게 동작하지만 클래스가 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공함  

* 클래스는 new 연산자 없이 호출하면 에러 발생함  
  생성자 함수는 new 연산자 없이 호출한 경우 일반 함수로서 호출됨
  
* 클래스는 상속을 지원하는 extends와 super 키워드를 지원함  
  생성자 함수는 지원하지 않음
  
* 클래스는 호이스팅이 발생하지 않는 것처럼 동작함  
  함수 선언문으로 정의된 생성자 함수 - 함수 호이스팅,   
  함수 표현식으로 작성된 생성자 함수 - 변수 호이스팅 발생함

* 클래스 내의 모든 코드는 암묵적으로 strict mode가 지정되어 실행되며 해제할 수 없음   
  생성자 함수는 암묵적으로 strict mode가 지정되지 않음

* 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트   
  [[Enumerable]] 값 = false (열거되지 않음)

생성자 함수와 클래스는 프로토타입 기반의 객체지향을 구현했다는 점에서 매우 유사하지만  
클래스는 생성자 함수 기반의 객체 생성 방식보다 견고하고 명료함  
(그렇다고 클래스가 우월하다고 생각하진 않음)  
특히 클래스의 extends와 super 키워드는 상속 관계 구현을 더욱 간결하고 명료하게 함 

따라 클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕이라고 보기보단  
새로운 객체 생성 메커니즘으로 보는게 조금 더 합당함


## 2. 클래스 정의
클래스 : 인스턴스를 생성하기 위한 생성자 함수  
클래스는 class 키워드를 사용해 정의함  

클래스명은 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적  
(파스칼 케이스를 사용하지 않아도 에러 발생하진 않음)  
일반적이진 않지만 함수와 마찬가지로 표현식으로 익명/기명 클래스 정의도 가능
```js
//클래스 선언문
class Person {}

//익명 클래스 표현식
const Person = class {};
//기명 클래스 표현식
const Person = class MyClass {};
```

클래스를 표현식으로 정의할 수 있다는 것 = 클래스가 값으로 사용될 수 있는 일급 객체라는 의미  
클래스는 일급 객체로서 아래 같은 특징을 갖음
* 무명의 리터럴로 생성 가능, 즉 런타임에 생성 가능
* 변수나 자료구조(객체, 배열 등)에 저장할 수 있음
* 함수의 매개별수에 전달 가능
* 함수의 반환값으로 사용 가능

클래스 = 함수. 따라 클래스는 값처럼 사용 가능한 일급 객체  
클래스 몸체에는 0개 이상의 메서드만 정의 가능함  
클래스 몸체에서 정의 가능한 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세 가지가 있음  
클래스와 생성자 함수의 정의 방식은 형태적인 면에서 매우 유사함  
```js
//클래스 선언문
class Person {
  //생성자
  constructor(name) {
    //인스턴스 생성 및 초기화
    this.name = name; //name 프로퍼티는 public함
  }
  //프로토타입 메서드
  sayHi(){
      console.log(`Hi! My name is ${this.name}`);
  }
  //정적 메서드
  static sayHello(){
      console.log('Hello!');
  }
}
//인스턴스 생성
const me = new Person('Leo');
//인스턴스의 프로퍼티 참조
console.log(me.name); //Leo
//프로토타입 메서드 호출
me.sayHi(); //Hi! My name is Leo
//정적 메서드 호출
Person.sayHello(); //Hello!
```


## 3. 클래스 호이스팅
클래스는 함수로 평가됨
```js
//클래스 선언문
class Person {}
console.log(typeof Person); //function
```

클래스 선언문으로 정의한 클래스는 함수 선언문처럼 런타임 이전에 먼저 평가되어 함수 객체를 생성함  
이때 클래스가 평가되어 생성된 함수 객체 = 생성자 함수로서 호출할 수 있는 함수(즉, constructor)  
생성자 함수로서 호출할 수 있는 함수는 함수 객체를 생성하는 시점에 프로토타입도 같이 생성됨  
프로토타입과 생성자는 언제나 쌍으로 존재하기 때문

단, 클래스는 클래스 정의 이전에 참조 불가능함
```js
console.log(Person); //ReferenceError
//클래스 선언문
class Person {}
```

클래스 선언문은 마치 호이스팅이 발생하지 않는 것처럼 보이지만 let/const 변수처럼 호이스팅이 발생함  
따라 클래스 선언문 이전에 일시적 사각지대(TDZ)에 빠져 호이스팅이 발생하지 않는 것처럼 동작함  

var, let, const, function, function*, class 키워드를 사용해 선언된 모든 식별자는 호이스팅 됨  
모든 선언문은 런타임 이전에 먼저 실행되기 때문    
```js
const Person = '';

{
  //호이스팅이 발생하지 않는다면 ''이 출력되어야 함
  console.log(Person); //ReferenceError
  
  // 클래스 선언문
  class Person {}
}
```


## 4. 인스턴스 생성
클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성함  
함수는 new 연산자의 사용 여부에 따라 일반 함수로 호출되거나 생성자 함수로 호출되지만  
클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 함
```js
class Person {}

//인스턴스 생성
const me = new Person();
console.log(me); //Person {}

//클래스를 new 연산자 없이 호출하면 타입 에러 발생함
const you = Person(); //TypeError
```
클래스 표현식으로 정의된 클래스의 경우 클래스를 가리키는 식별자를 사용해 인스턴스를 생성하지 않고  
기명 클래스 표현식의 클래스명을 사용해 인스턴스를 생성하면 에러 발생함  
이는 기명 함수 표현식과 마찬가지로 클래스 표현식에서 사용한 클래스명은 외부에서 접근 불가능하기 때문
```js
const Person = class MyClass {};

//함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 함 
const me = new Person();

//클래스명 MyClass는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자
console.log(MyClass); //ReferenceError

const you = new MyClass(); //ReferneceError
```


## 5. 메서드
클래스 몸체에는 0개 이상의 메서드만 선언 가능함  
클래스 몸체에서 정의 가능한 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 3가지가 있음  

> ES11에 따르면 인스턴스 프로퍼티는 반드시 constructor 내부에서 정의해야 함  
> 하지만 현재 클래스 몸체에 메서드 뿐 아니라 프로퍼티를 직접 정의할 수 있는 새로운 표준 사양에 제안되어 있음  
> 이 제안 사양에 의해 머지 않아 클래스 몸체에서 메서드 뿐 아니라 프로퍼티도 정의할 수 있게 될 것으로 보임  
> (크롬 같은 모던 브라우저에서는 이미 사용 가능함)

### 5-1. constructor
* 인스턴스를 생성하고 초기화하기 위한 특수한 메서드
* 이름을 변경할 수 없음
* 생성자 함수와 유사하지만 몇 가지 차이가 있음
```js
class Person {
  //생성자
  constructor(name) {
    //인스턴스 생성 및 초기화
    this.name = name;
  }
}
```
클래스는 평가되어 함수 객체가 되며, 함수 객체 고유의 프로퍼티를 가짐  
함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프체인을 구성함

모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의  
constructor 프로퍼티는 클래스 자신을 가리키고 있음  
이는 클래스가 인스턴스를 생성하는 생성자 함수임을 의미함  

클래스가 생성한 인스턴스의 내부를 들여다보면 클래스의 constructor 내부에서  
this에 추가한 name 프로퍼티가 클래스가 생성한 인스턴스의 프로퍼티로 추가된 것을 볼 수 있음  
즉, 생성자 함수와 마찬가지로 constructor 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 됨    
constructor 내부의 this = 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킴

클래스가 평가되어 생성된 함수 객체나 클래스가 생성한 인스턴스 어디에도 constructor 메서드가 보이지 않는데  
이는 클래스 몸체에 정의한 constructor가 단순한 메서드가 아님을 의미  
constructor는 메서드로 해석되는게 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 됨  
즉, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성됨  

> 클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티는   
> 이름이 같아 혼동하기 쉽지만 직접적인 관련이 없음.  
> 프로토타입의 constructor 프로퍼티 : 모든 프로토타입들이 가지고 있는 프로퍼티이며, 생성자 함수를 가리킴

* **constructor는 클래스 내에 최대 한 개만 존재 가능**  
  만약 클래스가 2개 이상의 constructor를 포함하면 문법 에러 발생함  
  ```js
  class Person {
    constructor() {}
    constructor() {}
  } //SyntaxError
  ```
  
* **constructor는 생략 가능**  
  constructor 생략 시 클래스에 빈 constructor가 암묵적으로 정의됨  
  constructor를 생략한 클래스는 빈 객체를 생성함  
  ```js
  class Person {
    //constructor 생략 시 아래처럼 빈 constructor가 암묵적으로 정의됨
    constructor() {
    }
  }
  
  //빈 객체가 생성됨
  const me = new Person();
  console.log(me); //Person {}
  ```

* **프로퍼티가 추가되어 초기화된 인스턴스 생성**  
  프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가함
  ```js
  class Person {
    constructor() {
      //고정값으로 인스턴스 초기화
      this.name = 'Leo';
      this.address = 'Seoul';
    }
  }
  
  //인스턴스 프로퍼티가 추가됨
  const me = new Person();
  console.log(me); //Person {name: 'Leo', address: 'Seoul'}
  ```

* **클래스 외부에서 인스턴스 프로퍼티의 초기값 전달**   
  인스턴스 생성 시 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면   
  constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달함  
  이때 초기값은 constructor 매개변수에 전달됨  
  
  이처럼 constructor 내에서는 인스턴스의 생성과 동시에 인스턴스 프로퍼티를 통해 인스턴스 초기화를 실행함  
  따라 인스턴스를 초기화하기 위해서는 constructor를 생략하면 안됨
  ```js
  class Person {
    constructor(name, address) {
      //인수로 인스턴스 초기화
      this.name = name;
      this.address = address;
    }
  }
  
  //인수로 초기값 전달. 초기값은 constructor에 전달됨
  const me = new Person('Leo', 'Seoul');
  console.log(me); //Person {name: 'Leo', address: 'Seoul'}
  ```

* **constructor는 별도의 반환문을 갖지 않아야 함**  
  new 연산자와 함께 클래스 호출 시 암묵적으로 this(인스턴스)를 반환하는데    
  만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 않고 return 문에 명시한 객체가 반환됨  
  (명시적으로 원시값을 반환한 경우 원시값 반환은 무시되고 암묵적으로 this가 반환됨)  

  constructor 내부에서 명시적으로 this가 아닌 값을 반환하는 것은 클래스의 기본 동작을 훼손함  
  따라 constructor 내부에서 return 문은 반드시 생략해야함
  ```js
  class Person {
    constructor(name) {
      this.name = name;
      //명시적으로 객체 반환 시 암묵적인 this 반환은 무시됨
      return {};
    }
  }
  
  //constructor에서 명시적으로 반환된 빈 객체가 반환됨
  const me = new Person('Leo');
  console.log(m, e); //{}
  ```

### 5-2. 프로토타입 메서드
* 클래스 몸체에 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 됨   
  클래스 몸체에 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과 달리  
  클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 됨
  ```js
  class Person {
    //생성자
    constructor(name) {
      //인스턴스 생성 및 초기화
      this.name = name;
    }
  
    //프로토타입 메서드
    sayHi() {
      console.log(`Hi! My name is ${this.name}`);
    }
  }
  
  const me = new Person('Leo');
  me.sayHi(); //Hi! My name is Leo
  ```

* 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 됨  
  프로토타입 체인은 기존의 모든 객체 생성 방식 뿐 아니라 클래스에 의해 생성된 인스턴스에도 동일하게 적용됨  
  (생성자 함수의 역할을 클래스가 할 뿐)  
  
  결국 클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라고 볼 수 있음  
  (생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘)
  ```js
  //me 객체의 프로토타입은 Person.prototype
  Object.getPrototypeOf(me) === Person.prototype; //true
  me instanceof Person; //true
  ㅣ
  //Person.prototype의 프로토타입은 Object.prototype
  Object.getPrototypeOf(Person.prototype) === Object.prototype; //true
  me instanceof Object; //true
  
  //me 객체의 constructor는 Person 클래스
  me.constructor === Person; //true
  ```

### 5-3. 정적 메서드
정적 메서드 : 인스턴스를 생성하지 않아도 호출할 수 있는 메서드  

생성자 함수 : 명시적으로 생성자 함수에 메서드를 추가해 정적 메서드 생성  
클래스 : 메서드에 static 키워드를 붙이면 정적 메서드(클래스 메서드)가 됨

* **정적 메서드는 클래스 정의 인스턴스를 생성하지 않아도 호출 가능함**  
  정적 메서드는 클래스에 바인딩된 메서드가 됨  
  클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유 가능  
  클래스는 클래스 정의(클래스 선언문이나 클래스 표현식)가 평가되는 시점에 함수 객체가 되므로  
  인스턴스와 달리 별다른 생성 과정이 필요 없음

* **정적 메서드는 인스턴스로 호출 불가함**  
  인스턴스 프로토타입 체인 상에는 클래스가 존재하지 않으므로 인스턴스로 클래스의 메서드를 상속받을 수 없음  
  정적 메서드는 프로토타입 메서드처럼 인스턴스로 호출하지 않고 클래스로 호출
```js
//생성자 함수
function Person(name) {
  this.name = name;
}
//정적 메서드
Person.sayHi = function () {
  console.log('Hi!');
};
//정적 메서드 호출
Person.sayHi(); //Hi!
```

```js
//클래스
class Person {
  //생성자
  constructor(name) {
    //인스턴스 생성 및 초기화
    this.name = name;
  }
  //정적 메서드
  static sayHi() {
    console.log('Hi!');
  }
}
//정적 메서드는 클래스로 호출
//정적 메서드는 인스턴스 없이도 호출 가능함
Person.sayHi(); //Hi!

//인스턴스 생성
const me = new Person('Leo');
me.sayHi(); //TypeError
```

### 5-4. 정적 메서드와 프로토타입 메서드의 차이
* 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다름
* 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출함
* 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조 가능함

```js
class Square {
  //정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); //100
```
위의 코드에서 정적 메서드 area는 인스턴스 프로퍼티를 참조하지 않음  
만약 인스턴스 프로퍼티를 참조해야 하는 경우라면 정적 메서드 대신 프로토타입 메서드를 사용해야 함  

```js
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  //프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); //10
```
메서드 내부의 this는 메서드를 호출한 객체, 즉 메서드명 앞에 마침표 연산자 앞에 기술한 객체에 바인딩 됨  
프로토타입 메서드와 정적 메서드 내부의 this 바인딩이 다름 
* 프로토타입 메서드 :   
  인스턴스를 호출해야 하므로 프로토타입 메서드 내부의 this는 프로토타입 메서드를 호출한 인스턴스를 가리킴  
* 정적 메서드 :  
  클래스로 호출해야 하므로 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킴  

따라 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면   
this를 사용해야 하며, 이런 경우 프로토타입 메서드로 정의해야 함  

물론 메서드 내부에서 this를 사용하지 않더라도 프로토타입 메서드로 정의 가능하지만    
반드시 인스턴스를 생성한 다음 인스턴스로 호출해야 하므로   
this를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋음  

표준 빌트인 객체는 다양한 정적 메서드를 가지고 있음  
이들 정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수    
예를 들어, 정적 메서드 Math.max는 인스턴스와 상관없이 애플리케이션 전역에서 사용할 유틸리티 함수  

이처럼 클래스 또는 생성자 함수를 하나의 네임페이스로 사용해 정적 메서드를 모아놓으면   
이름 충돌 가능성을 줄여주고 관련 함수들을 구조화할 수 있는 효과가 있음  
이같은 이유로 정적 메서드는 에플리케이션 전역에서 사용할 유틸리티 함수를   
전역 함수로 정의하지 않고 메서드로 구조화할 때 유용함

> ES6에서는 빌트인 전역 함수(isFinit, isNaN, parseFloat, parseInt 등)를   
> 표준 빌트인 객체 Number의 정적 메서드로 추가 구현함  
> Number의 정적 메서드(isFinit, isNaN, parseFloat, parseInt)는   
> 빌트인 전역 함수(isFinit, isNaN, parseFloat, parseInt)보다 엄격함

### 5-5. 클래스에서 정의한 메서드의 특징
* function 키워드를 생략한 메서드 축약 표현을 사용함
* 객체 리터럴과는 달리 클래스에 메서드를 정의할 때는 콤마가 필요 없음
* 암묵적으로 static mode로 실행됨
* for...in문이나 Object.Keys 등ㄹ으로 열거 불가능  
  프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이기 떄문
* 내부 메서드 [[Construct]]를 갖지 않는 non-constructor.  
  따라 new 연산자와 함께 호출할 수 없음


## 6. 클래스의 인스턴스 생성 과정
new 연산자와 함께 클래스 호출 시 생성자 함수와 마찬가지로 클래스의 내부 메서드 [[Construct]]가 호출됨  
클래스는 new 연산자 없이 호출 불가능  
아래와 같은 과정을 거쳐 인스턴스가 생성됨

1. **인스턴스 생성과 this 바인딩**  
   new 연산자와 함께 클래스 호출 시 constructor의 내부 코드가 실행되기 전 암묵적으로 빈 객체가 생성됨  
   이 빈 객체가 바로 클래스가 생성한 인스턴스(아직 완성되지 않은)  
   인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정됨  
   암묵적으로 생성된 빈 객체(인스턴스)는 this에 바인딩 됨  
   따라 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킴
2. **인스턴스 초기화**  
   constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화 함  
   즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고   
   constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화 함  
   만약 constructor가 생략되었다면 이 과정도 생략됨  
3. **인스턴스 반환**  
   클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됨  
```js
class Person {
  //생성자
  constructor(name) {
    //1. 암묵적으로 인스턴스가 생성되고 this에 바인딩 됨
    console.log(this); //Person {}
    consnole.log(Object.getPrototypeOf(this) === Person.prototype); //true

    //2. this에 바인딩되어 있는 인스턴스를 초기화 함
    this.name = name;

    //3. 완성된 인스턴스가 바인딩 된 this가 암묵적으로 반환됨
  }
}
```


## 7. 프로퍼티

### 7-1. 인스턴스 프로퍼티
**인스턴스의 프로퍼티는 constructor 내부에서 정의해야 함**  
constructor 내부 코드가 실행되기 이전 constructor 내부 this에는   
이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있음  

생성자 함수에서 생성자 함수가 정의할 인스턴스의 프로퍼티를 정의하는 것과 마찬가지로   
constructor 내부에서 this에 인스턴스 프로퍼티를 추가함  
이로써 클래스가 암묵적으로 생성한 빈 객체(=인스턴스)에 프로퍼티가 추가되어 인스턴스가 초기화됨  

constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 됨  
ES6의 클래스는 다른 객체지향 언어처럼 접근 제한자를 지원하지 않음  
따라 인스턴스 프로퍼티는 언제나 public 함  
(private한 프로퍼티를 정의할 수 있는 사양은 현재 제안 중에 있음)
```js
class Person {
  constructor(name) {
    //인스턴스 프로퍼티
    this.name = name; //name 프로퍼티는 public 함
  }
}

const me = new Person('Leo');

//name은 public함
console.log(me.name); //Leo
```

### 7-2. 접근자 프로퍼티
접근자 프로퍼티 : 자체적으로는 값([[Value]]내부 슬롯)을 갖지 않고 접근자 함수로 구성된 프로퍼티  
접근자 프로퍼티는 클래스에서도 사용 가능함  

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  //fullName은 접근자 함수로 구성된 접근자 프로퍼티
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Park', 'Leo');

//데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${me.firstName} ${me.lastName}`); //Park Leo

//접근자 프로퍼티를 통한 프로퍼티 값의 저장
//접근자 프로퍼티 fullName에 값 저장 시 setter 함수 호출됨
me.fullName = 'Soo Lee';
console.log(me); //{firstName: 'Soo', lastName: 'Lee'}

//접근자 프로퍼티를 통한 프로퍼티 값의 참조
//접근자 프로퍼티 fullName에 접근 시 getter 함수 호출됨
console.log(me.fullName); //Soo Lee

//fullName은 접근자 프로퍼티
//접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰를 갖음  
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
//{get:f, set:f, enumerable:false, configurable:true}
```

접근자 프로퍼티는 접근자 함수(getter/setter 함수)로 구성되어 있음
* getter  
  인스턴스 프로퍼티에 접근 시마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용   
  메서드명 앞에 get 키워드를 사용해 정의함
* setter  
  인스턴스 프로퍼티에 값을 할당 시마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용  
  메서드명 앞에 set 키워드를 사용해 정의함
  
getter/setter 이름은 인스턴스 프로퍼티처럼 사용됨  
다시 말해 호출하는 것이 아니라 프로퍼티처럼 참조/할당하는 형식으로 사용하며,   
참조/할당 시에 내부적으로 getter/setter가 호출됨    

getter 함수는 뭔가 취득할 때 사용하기 때문에 반드시 무언가를 반환해야 하고,     
setter 함수는 뭔가를 프로퍼티에 할당할 때 사용하기 떄문에 반드시 매개변수가 있어야 함   
(setter는 단 하나의 값만 할당받기 때문에 단 하나의 매개변수만 선언 가능함)  

클래스의 메서드는 기본적으로 프로토타입 메서드가 됨  
따라 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 됨

### 7-3. 클래스 필드 정의 제안
클래스 필드(필드/멤버) : 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어  

자바의 클래스 필드는 마치 클래스 내부에서 변수처럼 사용됨  
```
// 자바의 클래스 정의
public class Person {
  // ① 클래스 필드 정의
  // 클래스 필드는 클래스 몸체에 this 없이 선언해야 한다.
  private String firstName = "";
  private String lastName = "";
  
  // 생성자
  Person(String firstName, String lastName) {
    // ③ this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  public String getFullName() {
    // ② 클래스 필드 참조
    // this 없이도 클래스 필드를 참조할 수 있다.
    return firstName + " " + lastName;
  }
}
```
* 자바의 클래스에서는 ①과 같이 클래스 필드를 변수처럼 클래스 몸체에 this 없이 선언함
* 자바의 클래스에서는 ②와 같이 this를 생략해도 클래스 필드를 참조할 수 있음 
* 클래스 기반 객체지향 언어의 this는 언제나 클래스가 생성할 인스턴스를 가리킴   
  ③과 같이 this는 주로 클래스 필드가 생성자 또는 메서드의 매개변수명과 동일할 때 구분하기 위해 사용함

자바스크립트의 클래스 몸체에는 메서드만 선언 가능  
따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생함
```js
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}
const me = new Person('Lee');
```
하지만 현재 인스턴스 프로퍼티를 마치 클래스 기반 객체지향 언어의 클래스 필드처럼 정의 가능한  
새로운 표준 사양인 “Class field declarations”가 TC39 프로세스 11의 stage 3에 제안되어 있음  
따라 위 코드를 최신 브라우저나 최신 Node.js에서 실행 시 문법 에러가 발생하지 않고 정상 동작함  

해당 클래스 필드 정의 제안은 아직 ECMAScript의 정식 표준 사양으로 승급되지 않았지만   
최신 브라우저와 최신 Node.js는 표준 사양으로 승급이 확실시되는 이 제안을 미리 구현해 놓음  
따라 최신 브라우저와 최신 Node.js에서는 클래스 필드를 클래스 몸체에 정의할 수 있음 

* 클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안 됨   
  this는 클래스의 constructor와 메서드 내에서만 유효함
  ```js
  class Person {
    // this에 클래스 필드를 바인딩해서는 안 됨
    this.name = ''; // SyntaxError: Unexpected token '.'
  }
  ```
  
* 클래스 필드를 참조하는 경우 클래스 기반 객체지향 언어에서는 this를 생략 가능하나  
  자바스크립트에서는 this를 반드시 사용해야 함
  ```js
  class Person {
    // 클래스 필드
    name = 'Leo';
    
    constructor(){
      console.log(name); //ReferenceError
    }
  }
  
  new Person();
  ```
  
* 클래스 필드에 초기값을 할당하지 않으면 undefined를 갖음
  ```js
  class Person {
    //클래스 필드 초기화하지 않으면 undefined를 갖음
    name;
  }
  
  const me = new Person();
  console.log(me); //Person {name: undeinfed}
  ```
  
* 인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면   
  constructor에서 클래스 필드를 초기화해야 함  
  ```js
  class Person {
    name;
  
    constructor(name) {
      //클래스 필드 초기화
      this.name = name;
    }
  }
  
  const me = new Person('Leo');
  console.log(me); //Person {name: 'Leo'}
  ```  
  이처럼 인스턴스 생성 시 클래스 필드를 초기화 해야된다면 constructor 밖에서 클래스 필드를 정의할 필요가 없음  
  클래스 필드를 초기화하려면 어차피 constructor 내부에서 클래스 필드를 참조해 초기값을 할당해야 함  
  이때 this(=클래스가 생성한 인스턴스)에 클래스 필드에 해당하는 프로퍼티가 없다면 자동 추가되기 때문
  ```js
  class Person {
    constructor(name) {
      this.name = name;
    }
  }
  
  const me = new Person('Lee');
  console.log(me); // Person {name: "Lee"}
  ```

* 함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있음   
  따라 클래스 필드를 통해 메서드를 정의할 수도 있음  
  ```js
  class Person {
    // 클래스 필드에 문자열을 할당
    name = 'Lee';
    // 클래스 필드에 함수를 할당
    getName = function () {
      return this.name;
    }
  // 화살표 함수로 정의할 수도 있다.
  // getName = () => this.name;
  }
  
  const me = new Person();
  console.log(me); // Person {name: "Lee", getName: ƒ}
  console.log(me.getName()); // Lee
  ```  
  이처럼 클래스 필드에 함수를 할당하는 경우 인스턴스 메서드가 됨  
  모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문  
  따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않음

클래스 필드 정의 제안으로 인해 인스턴스 프로퍼티를 정의하는 방식은 두 가지가 됨   
인스턴스 생성 시 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면   
constructor에서 인스턴스 프로퍼티를 정의하는 기존 방식을 사용하고,   
인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 없다면  
기존의 constructor에서 인스턴스 프로퍼티를 정의하는 방식과 클래스 필드 정의 제안 모두 사용할 수 있음

#### <클래스 필드와 화살표 함수>
클래스 필드에 화살표 함수를 할당해 화살표 함수 내부의 this가 인스턴스를 가리키게 하는 경우도 있음  
인스턴스가 여러 개 생성된다면 이 방법도 메모리의 손해를 감수해야 함
```js
class App {
  constructor() {
    this.$button = document.querySelector('.btn');
    this.count = 0;
    // increase 메서드를 이벤트 핸들러로 등록
    // 이벤트 핸들러 내부의 this는 DOM 요소(this.$button)를 가리킨다.
    // 하지만 increase는 화살표 함수로 정의되어 있으므로
    // increase 내부의 this는 인스턴스를 가리킨다.
    this.$button.onclick = this.increase;
    // 만약 increase가 화살표 함수가 아니라면 bind 메서드를 사용해야 한다.
    // $button.onclick = this.increase.bind(this);
  }

  // 인스턴스 메서드
  // 화살표 함수 내부의 this는 언제나 상위 컨텍스트의 this를 가리킨다.
  increase = () => this.$button.textContent = ++this.count;
}

new App();
```



> **Technical Committee 39(TC39)**  
> ECMA 인터내셔널은 ECMAScript 이외에도 다양한 기술의 사양을 관리하고,   
> 이들 사양을 관리하는 주체인 기술 위원회Technical Committee도 여럿 존재함.   
> 여러 사양 중 ECMA-262 사양(ECMAScript)의 관리를 담당하는 위원회가 바로 TC39.   
> TC39는 구글, 애플, 마이크로소프트, 모질라 등 브라우저 벤더와   
> 페이스북, 트위터와 같이 ECMA-262 사양(ECMAScript)을 제대로 준수해야 하는 기업으로 구성되어 있음 

> **TC39 프로세스**  
> TC39 프로세스는 ECMAScript에 새로운 표준 사양을 추가하기 위해 공식적으로 명문화해 놓은 과정  
> 0단계부터 4단계까지 총 5개의 단계로 구성되어 있고, 상위 단계로 승급하기 위한 명시적인 조건들이 있음   
> 승급 조건을 충족시킨 제안은 TC39의 동의를 통해 다음 단계로 승급됨  
> <br>
> TC39 프로세스는 다음과 같은 단계를 거쳐 최종적으로 ECMAScript의 새로운 표준 사양이 됨   
> stage 0: strawman → stage 1: proposal → stage 2: draft →   
> stage 3: candidate → stage 4: finished   
> <br>
> stage 3까지 승급한 제안은 심각한 문제가 없는 한 변경되지 않고 대부분 stage 4로 승급됨  
> stage 4까지 승급한 제안은 큰 이변이 없는 이상, 차기 ECMAScript 버전에 포함됨  
> 현재 TC39 프로세스에 올라와 있는 제안을 확인하려면 ECMAScript proposals를 참고


### 7-4. private 필드 정의 제안
자바스크립트는 캡슐화를 완전하게 지원하지 않음  
ES6의 클래스도 생성자 함수처럼 접근 제한자를 지원하지 않음  
따라 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조 가능함 (언제나 public)  
클래스 필드 정의 제안을 사용해도 클래스 필드는 기본적으로 public하기 때문에 외부에 그대로 노출됨  

다행히 TC39 프로세스의 stage 3에는 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있음  
이 제안도 표준 사양으로 승급이 확실시되어   
최신 브라우저(Chrome 74 이상)와 최신 Node.js(버전 12 이상)에 이미 구현되어 있음

* private 필드의 선두에는 #을 붙여줌  
* private 필드를 참조할 때도 #을 붙어주어야 함
```js
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Lee');
// private 필드 #name은 클래스 외부에서 참조할 수 없음
console.log(me.#name); // SyntaxError
```
* public 필드는 어디서든 참조할 수 있지만 private 필드는 클래스 내부에서만 참조 가능  

  |접근 가능성|public|private|
  |:-|:-:|:-:|
  |클래스 내부|◯|◯|
  |자식 클래스 내부|◯|✕|
  |클래스 인스턴스를 통한 접근|◯|✕|

* 클래스 외부에서 private 필드에 직접 접근할 수 있는 방법은 없지만  
  접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효함  
  ````js
  class Person {
    // private 필드 정의
    #name = '';
  
    constructor(name) {
      this.#name = name;
    }
    
    // name은 접근자 프로퍼티
    get name() {
      // private 필드를 참조하여 trim한 다음 반환함
      return this.#name.trim();
    }
  }
  
  const me = new Person(' Lee ');
  ````
* private 필드는 반드시 클래스 몸체에 정의해야 함  
  (private 필드를 직접 constructor에 정의하면 에러가 발생함)
  ```js
  class Person {
    constructor(name) { 
      // private 필드는 클래스 몸체에서 정의해야 한다.
      this.#name = name; // SyntaxError
    }
  }
  ```

> Typescript  
> 자바스크립트의 상위 확장 superset인 타입스크립트는 접근 제한자를 모두 지원하며,   
> 의미 또한 기본적으로 동일함

### 7-5. static 필드 정의 제안
클래스에는 static 키워드를 사용해 정적 메서드를 정의 할 수 있지만   
static 키워드를 사용해 정적 필드를 정의할 수는 없음   

하지만 static public 필드, static private 필드, static private 메서드를 정의할 수 있는   
새로운 표준 사양인 “Static class features”가 TC39 프로세스의 stage 3에 제안되어 있음   
이 제안 중에서 static public/private 필드는 최신 브라우저와 최신 Node.js에 이미 구현되어 있음  
```js
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;
  // static private 필드 정의
  static #num = 10;
  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```


## 8. 상속에 의한 클래스 확장

### 8-1. 클래스 상속과 생성자 함수 상속
상속에 의한 클래스 확장은 프로토타입 기반 상속과는 다른 개념
* 프로토타입 기반 상속: 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념
* **상속에 의한 클래스 확장 : 기존 클래스를 상속받아 새로운 클래스를 확장해 정의하는 것**

클래스와 생성자 함수는 인스턴스 생성 가능한 함수라는 점에서 매우 유사하지만  
클래스는 상속을 통해 기존 클래스를 확장할 수 있는 문법이 기본적으로 제공되는 반면 생성자 함수는 그렇지 않음  
상속에 의한 클래스 확장은 코드 재사용 관점에서 매우 유용함

```js
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return 'eat';
  }

  move() {
    return 'move';
  }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() {
    return 'fly';
  }
}

const bird = new Bird(1, 5);
console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends 키워드가 기본적으로 제공됨  
extends 키워드를 사용한 클래스 확장은 간편하고 직관적임  
하지만 생성자 함수는 이런 문법이 제공되지 않음  

자바스크립트는 클래스 기반 언어가 아니기 때문에 생성자 함수를 이용해 클래스를   
흉내내려는 시도를 권장하지 않지만 의사 클래스 상속 패턴을 사용해 상속에 의한 클래스 확장을 흉내내기도 함  
(클래스의 등장으로 인해 의사 클래스 상속 패턴은 더 이상 필요하지 않음)
```js
// 의사 클래스 상속(pseudo classical inheritance) 패턴
var Animal = (function () {
  function Animal(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  Animal.prototype.eat = function () {
    return 'eat';
  };
  Animal.prototype.move = function () {
    return 'move';
  };
  return Animal;
}());

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
var Bird = (function () {
  function Bird() {
    // Animal 생성자 함수에게 this와 인수를 전달하면서 호출
    Animal.apply(this, arguments);
  }

  // Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체
  Bird.prototype = Object.create(Animal.prototype);
  // Bird.prototype.constructor을 Animal에서 Bird로 교체
  Bird.prototype.constructor = Bird;
  Bird.prototype.fly = function () {
    return 'fly';
  };
  return Bird;
}());

var bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

### 8-2. extends 키워드
상속을 통해 클래스를 확장하려면 extends 키워드를 사용해 상속받을 클래스를 정의함  
* 서브클래스 : 상속을 통해 확장된 클래스 (=파생 클래스/자식 클래스)
* 수퍼클래스 : 서브클래스에게 상속된 클래스 (=베이스 클래스/부모 클래스)
```js
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
```
extends 키워드의 역할 : 수퍼클래스와 서브클래스 간의 상속 관계를 설정  
클래스도 프로토타입을 통해 상속 관계를 구현함  

수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인 뿐 아니라 클래스 간의 프로토타입 체인도 생성함  
이를 통해 프로토타입 메서드, 정적 메서드 모두 상속 가능함

### 8-3. 동적 상속
extends 키워드는 클래스 뿐 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있음  
단, extends 키워드 앞에는 반드시 클래스가 와야 함
```js
// 생성자 함수
function Base(a) {
  this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {
}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```
extends 키워드 다음에는 클래스 뿐 아니라 [[Construct]] 내부 메서드를 갖는   
함수 객체로 평가될 수 있는 모든 표현식 사용 가능함  
이를 통해 동적으로 상속받을 대상을 결정할 수 있음   
```js
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}
console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

### 8-4. 서브클래스의 constructor
클래스에서 constructor를 생략하면 비어있는 constructor가 암묵적으로 정의됨  
```js
constructor() {}
```
서브클래스에서 constructor 생략 시 클래스에 다음과 같은 constructor가 암묵적으로 정의됨  
```js
constructor(...args) { super(...args); }
```

```js
// 수퍼클래스
class Base {}
// 서브클래스
class Derived extends Base {}

// 위 코드는 아래처럼 암묵적으로 constructor가 정의됨
// 수퍼클래스
class Base {
  constructor() {}
}
// 서브클래스
class Derived extends Base {
  constructor(...args) { super(...args); }
}

const derived = new Derived();
console.log(derived); // Derived {}
```
수퍼클래스와 서브클래스 모두 constructor 생략 시 빈 객체가 생성됨  
프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 인스턴스에 프로퍼티를 추가해야 함

### 8-5. super 키워드 
* 함수처럼 호출할 수도 있고, this와 같이 식별자처럼 참조할 수 있는 특수한 키워드
* super 키워드의 동작
  * super 호출 시 수퍼클래스의 constructor(super-constructor)를 호출함
  * super 참조 시 수퍼클래스의 메서드를 호출 가능

#### <super 호출>
* **super 호출 시 수퍼클래스의 constructor(super-constructor)를 호출함**  
  * **서브클래스의 constructor 생략**    
    수퍼클래스의 constructor내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성하는 경우  
    
    서브클래스의 constructor를 생략한 경우 new 연산자와 함께 서브클래스를 호출하면서 전달한 인수는   
    서브클래스에 암묵적으로 정의된 constructor의 super 호출을 통해 수퍼클래스의 constructor에 전달됨
    ```js
    // 수퍼클래스
    class Base {
      constructor(a, b) {
        this.a = a;
        this.b = b;
      }
    }
    
    // 서브클래스
    class Derived extends Base {
    // 다음과 같이 암묵적으로 constructor가 정의된다.
    // constructor(...args) { super(...args); }
    }
    
    const derived = new Derived(1, 2);
    console.log(derived); // Derived {a: 1, b: 2}
    ```
    
  * **서브클래스의 constructor 생략 불가**    
    수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성하는 경우  
    
    new 연산자와 함께 서브 클래스를 호출하면서 전달한 인수 중 수퍼클래스의 constructor에   
    전달할 필요 있는 인수는 서브 클래스의 constructor에서 호출하는 super를 통해 전달함
    ```js
    // 수퍼클래스
    class Base {
      constructor(a, b) { // ④
        this.a = a;
        this.b = b;
      }
    }
    
    // 서브클래스
    class Derived extends Base {
      constructor(a, b, c) { // ②
        super(a, b); // ③
        this.c = c;
      }
    }
    
    const derived = new Derived(1, 2, 3); // ①
    console.log(derived); // Derived {a: 1, b: 2, c: 3}
    ```  
    이처럼 인스턴스 초기화를 위해 전달한 인수는 수퍼클래스와 서브클래스에 배분되고  
    상속 관계의 두 클래스는 서로 협력해 인스턴스를 생성함

* super 호출 시 주의할 점  
  * 서브클래스에서 constructor 생략하지 않는 경우   
    서브 클래스의 constructor에서는 반드시 super를 호출해야 함
  * 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조 불가능
  * super는 반드시 서브클래스의 constructor에서만 호출    
    서브클래스가 아닌 클래스의 constructor나 함수에서 super 호출 시 에러 발생함

#### <super 참조>
**메서드 내에서 super 참조 시 수퍼클래스의 메서드 호출 가능**  

* 서브클래스의 프로토타입 메서드 내에서 super.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킴
  ```js
  // 수퍼클래스
  class Base {
    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      return `Hi! ${this.name}`;
    }
  }
  
  // 서브클래스
  class Derived extends Base {
    sayHi() {
      // super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다.
      return `${super.sayHi()}. how are you doing?`;
    }
  }
  
  const derived = new Derived('Lee');
  console.log(derived.sayHi()); // Hi! Lee. how are you doing?
  ```    
  super 참조를 통해 수퍼클래스의 메서드를 참조하려면 super가   
  수퍼클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야 함  
  위 코드는 아래와 동일하게 동작함  
  ```js
  // 수퍼클래스
  class Base {
    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      return `Hi! ${this.name}`;
    }
  }
  
  class Derived extends Base {
    sayHi() {
      // __super는 Base.prototype을 가리킨다.
      const __super = Object.getPrototypeOf(Derived.prototype);
      return `${__super.sayHi.call(this)} how are you doing?`;
    }
  }
  ```  
  super는 자신을 참조하고 있는 메서드(Derived의 sayHi)가 바인딩되어 있는 객체(Derived.prototype)의  
  프로토타입(Base.prototype)을 가리킴  
  따라 super.sayHi는 Base.prototype.sayHi를 가리킴  
  단, super.sayHi를 호출할 때 casll 메서드를 사용해 this를 전달해야 함  
  
  call 메서드를 사용해 this를 전달하지 않고 super.sayHi를 그대로 호출하면   
  Base.prototype.sayHi 메서드 내부의 this는 Base.prototype을 가리킴   
  Base.prototype.sayHi 메서드는 프로토타입 메서드이기 떄문에 내부의 this는 인스턴스를 가리켜야 함  
  (name 메서드는 인스턴스에 존재하므로)  
  
  이처럼 super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드가   
  바인딩되어 있는 객체의 프로토타입을 찾을 수 있어야 함  
  이를 위해 메서드는 내부 슬롯 [[HomeOjbect]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킴    
  ```js
  /*
  [[HomeObject]]는 메서드 자신을 바인딩하고 있는 객체를 가리킨다.
  [[HomeObject]]를 통해 메서드 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있다.
  예를 들어, Derived 클래스의 sayHi 메서드는 Derived.prototype에 바인딩되어 있다.
  따라서 Derived 클래스의 sayHi 메서드의 [[HomeObject]]는 Derived.prototype이고
  이를 통해 Derived 클래스의 sayHi 메서드 내부의 super 참조가 Base.prototype으로 결정된다.
  따라서 super.sayHi는 Base.prototype.sayHi를 가리키게 된다.
  */
  super = Object.getPrototypeOf([[HomeObject]])
  ```
  
  **주의할 것은 ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다는 것**     
  ```js
  const obj = {
    // foo는 ES6의 메서드 축약 표현으로 정의한 메서드다. 따라서 [[HomeObject]]를 갖는다.
    foo() {
    }, 
    // bar는 ES6의 메서드 축약 표현으로 정의한 메서드가 아니라 일반 함수다.
    // 따라서 [[HomeObject]]를 갖지 않는다.
    bar: function () {
    }
  };
  ```
  따라 [[HomeObject]]를 가지는 ES6의 메서드 축약 표현으로 정의된 함수만이 super를 참조가능함  
  단, super 참조는 수퍼클래스의 메서드를 참조하기 위해 사용하므로 서브클래스의 메서드에서 사용해야 함  
  
  super 참조는 클래스의 전유물은 아님  
  객체 리터럴에서도 super 참조 가능함. 단 ES6의 메서드 축약 표현으로 정의된 함수만 가능
  ```js
  const base = {
    name: 'Lee',
    sayHi() {
      return `Hi! ${this.name}`;
    }
  };
  const derived = {
    __proto__: base,  
    // ES6 메서드 축약 표현으로 정의한 메서드. 따라서 [[HomeObject]]를 갖는다.
    sayHi() {
      return `${super.sayHi()}. how are you doing?`;
    }
  };
  console.log(derived.sayHi()); // Hi! Lee. how are you doing?
  ```
  
* 서브클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드 sayHi를 가리킴
  ```js
  // 수퍼클래스
  class Base {
    static sayHi() {
      return 'Hi!';
    }
  }
  
  // 서브클래스
  class Derived extends Base {
    static sayHi() {
      // super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.
      return `${super.sayHi()} how are you doing?`;
    }
  }
  
  console.log(Derived.sayHi()); // Hi! how are you doing?
  ```

### 8-6. 상속 클래스의 인스턴스 생성 과정
```js
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }
  
  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}
// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```
서브클래스 ColorRectangle이 new 연산자와 함께 호출되면 다음 과정을 통해 인스턴스를 생성함
1. **서브클래스의 super 호출**  
   자바스크립트 엔진은 클래스 평가 시 수퍼클래스/서브클래스를 구분하기 위해   
   'base' or 'derived'를 값으로 갖는 내부 슬롯 [[ConstructorKind]]를 가짐  
   다른 클래스를 상속받지 않는 클래스(그리고 생성자 함수)는 값이 'base'로 설정되지만,  
   다른 클래스를 상속받는 서브클래스는 값이 'derived'로 설정됨  
   이를 통해 수퍼클래스와 서브클래스는 new 연산자와 함께 호출되었을 때 동작이 구분됨  
   
   다른 클래스를 상속받지 않는 클래스는 new 연산자와 함께 호출되었을 때   
   암묵적으로 빈 객체를 생성하고 이를 this에 바인딩함  
   하지만 **서브클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에 인스턴스 생성을 위임함**    
   (서브클리스의 constructor에서 반드시 super를 호출해야 하는 이유)  
   
   서브클래스가 new 연산자와 함께 호출되면 서브클래스 constructor 내부의 super 키워드가 함수처럼 호출됨  
   super가 호출되면 수퍼클래스의 constructor가 호출됨  
   좀 더 정확히 말하면 수퍼클래스가 평가되어 생성된 함수 객체의 코드가 실행되기 시작함   
   
   만약 수퍼클래스 constructor 내부에 super 호출이 없으면 에러 발생함  
   실제로 인스턴스를 생성하는 주체는 수퍼클래스이므로 수퍼클래스의 constructor를   
   호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문
   
2. **수퍼클래스의 인스턴스 생성과 this 바인딩**  
   수퍼클래스의 constructor 내부의 코드가 실행되기 이전에   
   암묵적으로 빈 객체(클래스가 생성한 인스턴스)를 생성하며 해당 빈 객체는 this에 바인딩 됨  
   따라서 수퍼클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.  

   이때 인스턴스는 수퍼클래스가 생성한 것   
   하지만 new 연산자와 함께 호출된 클래스가 서브클래스라는 것이 중요함    
   즉, new 연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킴   
   때문에 인스턴스는 new.target이 가리키는 서브클래스가 생성한 것으로 처리됨  
   
   따라 생성된 인스턴스의 프로토타입은 수퍼클래스의 prototype 프로퍼티가 가리키는 객체가 아닌   
   new.target, 즉 서브클래스의 prototype 프로퍼티가 가리키는 객체

3. **수퍼클래스의 인스턴스 초기화**  
   수퍼클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화함   
   즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고   
   constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화함
   
4. **서브클래스 constructor로의 복귀와 this 바인딩**  
   super의 호출이 종료되고 제어 흐름이 서브클래스 constructor로 돌아옴   
   이때 super가 반환한 인스턴스가 this에 바인딩됨   
   서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩해 그대로 사용함  

   super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없음  
   서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유가 바로 이 때문   
   따라서 서브클래스 constructor 내부의 인스턴스 초기화는 반드시 super 호출 이후에 처리되어야 함

5. **서브클래스의 인스턴스 초기화**  
   super 호출 이후, 서브클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행됨   
   즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고   
   constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화함
   
6. **인스턴스 반환**  
   클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됨





### 8-7. 표준 빌트인 생성자 함수 확장
extends 키워드 다음에는 클래스뿐 아니라 [[Construct]] 내부 메서드를 갖는   
함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있음  
표준 빌트인 객체도 [[Construct]] 내부 메서드를 갖는 생성자 함수이므로 가능  

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }
  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray); // MyArray(4) [1, 1, 2, 3]
// MyArray.prototype.uniq 호출
console.log(myArray.uniq()); // MyArray(3) [1, 2, 3]
// MyArray.prototype.average 호출
console.log(myArray.average()); // 1.75
```
Array 생성자 함수를 상속받아 확장한 MyArray 클래스가 생성한 인스턴스는   
Array.prototype과 MyArray.prototype의 모든 메서드를 사용할 수 있음 

이때 주의할 것은 Array.prototype의 메서드 중 map, filter와 같이 새로운 배열을 반환하는 메서드가  
MyArray 클래스의 인스턴스를 반환한다는 것
```js
console.log(myArray.filter(v => v % 2) instanceof MyArray); // true
```
만약 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고   
Array의 인스턴스를 반환하면 MyArray 클래스의 메서드와 메서드 체이닝이 불가능함  
```js
// 메서드 체이닝
// [1, 1, 2, 3] => [ 1, 1, 3 ] => [ 1, 3 ] => 2
console.log(myArray.filter(v => v % 2).uniq().average()); // 2
```
myArray.filter가 반환하는 인스턴스는 MyArray 클래스가 생성한 인스턴스, 즉 MyArray 타입   
따라 myArray.filter가 반환하는 인스턴스로 uniq 메서드를 연이어 호출(메서드 체이닝)할 수 있음  

uniq 메서드가 반환하는 인스턴스는 Array.prototype.filter에 의해 생성되었기 때문에   
Array 생성자 함수가 생성한 인스턴스로 생각할 수도 있지만   
uniq 메서드가 반환하는 인스턴스도 MyArray 타입이므로  
uniq 메서드가 반환하는 인스턴스로 average 메서드를 연이어 호출(메서드 체이닝)할 수 있음  

만약 MyArray 클래스의 uniq 메서드가 MyArray 클래스가 생성한 인스턴스가 아닌   
Array가 생성한 인스턴스를 반환하게 하려면 Symbol.species를 사용하여 정적 접근자 프로퍼티를 추가함
```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {  
  // 모든 메서드가 Array 타입의 인스턴스를 반환하도록 한다.
  static get [Symbol.species]() {
    return Array;
  }
  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }
  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray.uniq() instanceof MyArray); // false
console.log(myArray.uniq() instanceof Array); // true
// 메서드 체이닝
// uniq 메서드는 Array 인스턴스를 반환하므로 average 메서드를 호출할 수 없다.
console.log(myArray.uniq().average());
// TypeError: myArray.uniq(...).average is not a function
```
