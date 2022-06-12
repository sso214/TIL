---
title : 26장. ES6 함수의 추가 기능
date : 2022.06.12
---

# 26장. ES6 함수의 추가 기능

## 1. 함수의 구분
ES6 이전까지 함수는 사용 목적에 따라 명확한 구분이 없으므로   
호출 방식에 특별한 제약이 없어 동일한 함수라도 다양한 형태로 호출 가능하며,    
(일반 함수로 호출할 수 있는 것은 물론 생성자 함수로서 호출 가능 - callable이면서 constructor)  
생성자 함수로 호출되지 않아도 프로토타입 객체를 생성함  
 
이는 편리한 것 같지만 실수를 유발시킬 수 있으며 혼란스럽고 성능 면에서도 손해  
```js
var foo = function(){
    return 1;
};

//일반적인 함수로서 호출
foo(); //1

//생성자 함수로서 호출
new foo(); //foo {}

//메서드로서 호출
var obj = {foo : foo};
obj.foo(); //1
```

주의할 것은 ES6 이전에 일반적으로 메서드라고 부르던 객체에 바인딩 된 함수나   
콜백 함수도 callerable이며 constructor라는 것  
따라 객체에 바인딩 된 함수나 콜백 함수가 constructor 라는 건 prototype 프로퍼티를 가지며,  
불필요한 프로토타입 객체도 생성한다는 것을 의미하기 때문에 성능면에서 문제가 있음  
(위와 같이 사용하는 경우는 흔치 않겠지만 문법상 가능하다는 것은 문제가 있음)  
```js
// 프로퍼티 f에 바인딩된 함수는 callable이며 constructor
var obj = {
  x: 10,
  f: function () {
    return this.x;
  }
};
// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10
// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined
// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}

// 콜백 함수를 사용하는 고차 함수 map. 콜백 함수도 constructor이며 프로토타입을 생성
[1, 2, 3].map(function (item) {
  return item * 2;
}); //  [ 2, 4, 6 ]
```

이런 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 나누고 명확히 구분함  
|ES6 함수의 구분|constructor|prototype|super|arguments|
|:-|:-:|:-:|:-:|:-:|
|일반 함수|O|O|X|O|
|메서드|X|X|O|O|
|화살표 함수|X|X|X|X|  

일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며 ES6 이전의 함수와 차이가 없음  
하지만 ES6의 메서드나 화살표 함수는 ES6이전의 함수와 명확한 차이가 있음  


## 2. 메서드
ES6 이전 사양에서 메서드는 일반적으로 객체에 바인딩된 함수를 일컫는 의미로 사용되었으며   
정확한 정의가 없었으나 ES6 사양에는 메서드에 대한 정의가 명확하게 규정되었음   

* **ES6 사양에서 메서드는 "메서드 축약 표현으로 정의된 함수"만을 의미함**
  ```js
  const obj = {
    x: 1,
    //foo는 메서드
    foo() {
      return this.x;
    },
    //bar에 바인딩된 함수는 메서드가 아닌 일반 함수
    bar : function() {return this.x;}
  };
  ```
* **ES6 사양에서 정의된 메서드는 인스턴스를 생성할 수 없는 non-constructor.**  
  생성자 함수로서 호출 불가함  
  인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고, 프로토타입도 생성하지 않음  
  (참고로 표준 빌든인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor)  
  ```js
  new obj.foo(); //TypeError
  new obj.bar(); //bar {}
  
  //obj.foo는 constructor가 아닌 ES6 메서드이므로 prototype 프로퍼티가 없음
  obj.foo.hasOwnProperty('prototype'); //false
  //obj.bar는 constructor인 일반 함수이므로 prototype 프로퍼티가 있음
  obj.bar.hasOwnProperty('prototype'); //true
  
  String.prototype.toUpperCase.prototype; //undefined
  String.fromCharCode.prototype; //undefined
  ```
* **ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 가짐**  
  super 참조는 내부 슬롯 [[HombeObject]]를 사용해 수퍼클래스의 메서드를 참조하므로  
  내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드는 super 키워드를 사용 가능함     
  
  반면 ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없음  
  내부 슬롯 [[HomeObject]]를 갖지 않기 때문
  ```js
  const base = {
    name: 'Leo',
    sayHi() {
      return `Hi! ${this.name}`;
    }
  };
  
  const derived = {
    __proto__: base,
    //sayHi는 ES6 메서드이므로 [[HomeObject]]를 가짐  
    //sayHi의 [[HomeObject]]는 sayHi가 바인딩 된 객체인 derived를 가리키고  
    //super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킴
    sayHi() {
      return `${super.sayHi()}. how are you doing?`;
    },
    // sayHi2는 ES6 메서드가 아님
    // 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없음
    sayHi2: function () {
      // SyntaxError
      return `${super.sayHi()}. how are you doing?`;
    }
  };
  console.log(derived.sayHi()); //Hi! Leo. how are you doing?
  ```
이렇게 ES6 메서드는 본연의 기능(super)을 추가하고 의미적으로 맞지 않는 기능(constructor)은 제거함  
따라 메서드 정의 시 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋음


## 3. 화살표 함수
* function 키워드 대신 화살표(=>)를 사용해 기존의 함수 정의 방식보다 간략하게 함수를 정의 가능  
* 화살표 함수는 표현만 간략할 뿐 아니라 내부 동작도 기존의 함수보다 간략함   
* 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용함

### 3-1. 화살표 함수 정의
* **함수 정의**  
  함수 선언문으로 정의 불가능하고 함수 표현식으로 정의해야 함  
  호출 방식은 기존 함수와 동일함
  ```js
  const multiply = (x, y) => x * y;
  multiply(2, 3); //  6
  ```
* **매개변수 선언**  
  * 매개변수가 여러 개인 경우 소괄호 안에 매개변수를 선언  
  * 매개변수가 한 개인 경우 소괄호 생략 가능  
  * 매개변수 없는 경우 소괄호 생략 불가능
  ```js
  const arrow = (x, y) => { ... };
  const arrow = x => { ... };
  const arrow = () => { ... };
  ```
* **함수 몸체 정의**  
  * 함수 몸체가 하나의 문으로 구성되고 표현식인 문이라면 함수 몸체를 감싸는 중괄호 생략 가능  
    표현식이 아닌 문이라면 반환할 수 없기 때문에 에러 발생함    
    ```js
    // concise body
    const power = x => x ** 2;
    power(2); //  4
    // 위 표현은 다음과 동일하다.
    // block body
    const power = x => { return x ** 2; };
    
    const arrow = () => const x = 1; // SyntaxError
    // 위 표현은 다음과 같이 해석됨
    const arrow = () => { return const x = 1; };
    // 때문에 중괄호 생략 불가능
    const arrow = () => { const x = 1; };
    ```
  * 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸야 함  
    객체 리터럴의 중괄호를 함수 몸체를 감싸는 중괄호로 잘못 해석하기 때문  
    ```js
    const create = (id, content) => ({ id, content });
    create(1, 'JavaScript'); //  {id: 1, content: "JavaScript"}
    // 위 표현은 다음과 동일함
    const create = (id, content) => { return { id, content }; };
    
    // { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석함
    const create = (id, content) => { id, content };
    create(1, 'JavaScript'); //  undefined
    ```
  * 함수 몸체가 여러개의 문으로 구성된 경우 중괄호 생략 불가능  
    반환값이 있다면 명시적으로 반환해야 함
    ```js
    const sum = (a, b) => {
      const result = a + b;
      return result;
    };
    ```
  * 화살표 함수도 **즉시 실행 함수로 사용 가능**함  
    ```js
    const person = (name => ({
      sayHi() {
        return `Hi? My name is ${name}.`;
      }
    }))('Lee');
    console.log(person.sayHi()); // Hi? My name is Lee.
    ```
  * 화살표 함수도 일급 객체이므로 **고차 함수(Array.prototype.map 등)에 인수로 전달 가능**함  
    일반적인 함수 표현식보다 표현이 간결하고 가독성 좋아짐
    ```js
    // ES5
    [1, 2, 3].map(function (v) {
      return v * 2;
    });
    // ES6
    [1, 2, 3].map(v => v * 2); //  [ 2, 4, 6 ]
    ```

### 3-2. 화살표 함수와 일반 함수의 차이
1. **화살표 함수는 인스턴스를 생성할 수 없는 non-constructor**    
   인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않음
    ```js
    const Foo = () => {};
    // 화살표 함수는 생성자 함수로서 호출할 수 없다.
    new Foo(); // TypeError: Foo is not a constructor
    // 화살표 함수는 prototype 프로퍼티가 없다.
    Foo.hasOwnProperty('prototype'); //  false
    ```
2. **화살표 함수는 중복된 매개변수명을 선언할 수 없음**    
   일반 함수는 중복된 매개변수명을 선언해도 에러 발생하지 않음 (단, strict mode에서는 에러 발생)  
    ```js
    function normal(a, a) {
      return a + a;
    }
    console.log(normal(1, 2)); // 4
    
    'use strict';
    function normal(a, a) {
      return a + a;
    } // SyntaxError
    
    const arrow = (a, a) => a + a; // SyntaxError
    ```
3. **화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않음**    
   따라 화살표 함수 내부에서 this, arguments, super, new.target을 참조 시   
   스코프 체인을 통해 가장 가까운 상위 함수 중 화살표 함수가 아닌 함수의    
   this, arguments, super, new.target를 참조함

### 3-3. this
화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this.      

화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많음   
화살표 함수의 this는 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를   
해결하기 위해 설계되었기 때문에 일반 함수의 this와 다르게 동작함   

this 바인딩은 함수의 호출 방식에 따라 동적으로 결정됨   
이때 주의할 것은 일반 함수로서 호출되는 콜백 함수의 경우  
(고차 함수의 인수로 전달되어 고차 함수 내부에서 호출되는 콜백 함수도 중첩 함수라고 할 수 있음)  

#### 콜백 함수 내부의 this 문제
```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) { 
    // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가함
    // ①
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // TypeError
    });
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```
위 예제 실행 시 기대 결과는 ['-webkit-transition', '-webkit-user-select']지만 TypeError가 발생함  

프로토타입 메서드 내부인 ①에서 this는 메서드를 호출한 객체(prefix 객체)를 가리킴  
그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 ②에서 this는 undefined를 가르킴  
Array.prototype.map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문

일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킴  
그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용되어 있으므로  
Array.prototype.map 메서드의 콜백 함수에도 strict mode가 적용됨  

strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아닌 undefined가 바인딩되므로  
일반 함수로서 호출되는 Array.prototype.map 메서드의 콜백 함수 내부의 this에는 undefined가 바인딩 됨  
이때 발생하는 문제가 "콜백 함수 내부의 this 문제"  
즉 콜백 함수의 this와 외부 함수외 this가 서로 다른 값을 가리키고 있기 때문에 TypeError 발생함

#### ES6 이전 "콜백 함수 내부의 this 문제" 해결 방법
* add 메서드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 후 콜백 함수 내부에서 사용   
    ```js
    add(arr) {
      // this를 일단 회피시킴
      const that = this;
      return arr.map(function (item) {
        // this 대신 that을 참조함
        return that.prefix + ' ' + item;
      });
    }
    ```
* Array.prototype.map의 두 번째 인수로 add 메서드를 호출한 prefixer 객체를 가리키는 this를 전달함    
   (Array.prototype.map은 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있음)
    ```js
    add(arr) {
      return arr.map(function (item) {
        return this.prefix + ' ' + item;
      }, this); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩 됨
    }
    ```
* Function.prototype.bind 메서드를 사용해 add 메서드를 호출한 prefixer 객체를 가리키는 this를 바인딩함
    ```js
    add(arr) {
      return arr.map(function (item) {
        return this.prefix + ' ' + item;
      }.bind(this)); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩 됨
    }
    ```

#### ES6 화살표 함수를 사용한 콜백 함수 내부의 this 문제 해결 방법
```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(item => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']
```
**화살표 함수는 함수 자체의 this 바인딩을 갖지 않음.   
따라 화살표 함수 내부에서 this 참조 시 상위 스코프의 this를 그대로 참조함 (=lexical this)**  
마치 렉시컬 스코프와 같이 화살표 함수의 this가 함수가 정의된 위치에 결정된다는 것을 의미

화살표 함수를 제외한 모든 함수에는 this 바인딩이 반드시 존재함  
따라 ES6에서 화살표 함수가 도입되기 이전에는 스코프체인을 통해 this를 탐색할 필요가 없었음  
하지만 화살표 함수는 함수 자체의 this 바인딩이 존재하지 않으므로 화살표 함수 내부에서 this 참조 시   
일반적인 식별자처럼 스코프체인을 통해 상위 스코프에서 this를 탐색함  

화살표 함수를 Function.prototype.bind를 사용해 표현한 코드
```js
// 화살표 함수는 상위 스코프의 this를 참조함
() => this.x;
// 익명 함수에 상위 스코프의 this를 주입함. 위 화살표 함수와 동일하게 동작함
(function () { return this.x; }).bind(this);
```

* 만약 화살표 함수와 화살표 함수가 중첩되어 있어 상위 화살표 함수에도 this 바인딩이 없다면  
  스코프체인 상에서 가장 가까운 상위 함수 중 화살표 함수가 아닌 함수의 this를 참조함  
  ```js
  // 중첩 함수 foo의 상위 스코프 = 즉시 실행 함수
  // 따라 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킴
  (function () {
    const foo = () => console.log(this);
    foo();
  }).call({a: 1}); // { a: 1 }
  
  // bar 함수는 화살표 함수를 반환함
  // bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar 
  // 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
  // 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킴
  (function () {
    const bar = () => () => console.log(this);
    bar()();
  }).call({a: 1}); // { a: 1 }
  ```

* 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리킴  
  전역 함수의 상위 스코프는 전역이고 전역에서 this는 전역 객체를 가리키기 때문
  ```js
  // 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킴
  const foo = () => console.log(this);
  foo(); // window
  ```

* 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서   
  가장 가까운 상위 함수 중 화살표 함수가 아닌 함수의 this를 참조함
  ```js
  // increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역
  // 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킴
  const counter = {
    num: 1,
    increase: () => ++this.num
  };
  console.log(counter.increase()); // NaN
  ```

* 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에   
  Function.prototype.call, Function.prototype.apply, Function.prototype.bind 메서드를 사용해도   
  화살표 함수 내부의 this를 교체할 수 없음  
  (화살표 함수가 해당 메서드를 호출할 수 없다는 의미는 아님)
  ```js
  window.x = 1;
  
  const normal = function () { return this.x; };
  const arrow = () => this.x;
  
  console.log(normal.call({ x: 10 })); // 10
  console.log(arrow.call({ x: 10 })); // 1
  
  const add = (a, b) => a + b;
  
  console.log(add.call(null, 1, 2)); // 3
  console.log(add.apply(null, [1, 2])); // 3
  console.log(add.bind(null, 1, 2)()); // 3
  ```

* 메서드(ES6 메서드가 아닌 일반적인 의미의 메서드)를 화살표 함수로 정의하는 것은 피해야 함   
  화살표 함수로 메서드 정의 시 프로퍼티에 할당한 화살표 함수 내부의 this는   
  메서드를 호출한 객체를 가리키지 않고 상위 스코프의 this를 가리킴   
  때문에 메서드 정의 시에는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용해야 함   
  
  프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우에도 동일한 문제 발생함   
  * 프로퍼티를 동적 추가시에는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당해야 함  
  * 일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 객체 리터럴을 바인딩하고  
    프로토타입의 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정해야 함  
  * 클래스 필드 정의 제안을 사용해 클래스 필드에 화살표 함수를 할당할 수도 있음   
    하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 됨  
    따라 메서드 정의시에는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋음

### 3-4. super
화살표 함수는 함수 자체의 super 바인딩을 갖지 않음   
따라 화살표 함수 내부에서 super 참조 시 this와 마찬가지로 상위 스코프의 super를 참조함  
```js
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킴
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```
super는 내부 슬롯 [[HomeOjbect]]를 갖는 ES6 메서드 내에서만 사용 가능한 키워드  
sayHi 클래스 필드에 할당한 화살표 함수는 ES6 메서드는 아니지만 함수 자체의 super 바인딩을 갖지 않으므로  
super를 참조해도 에러가 발생하지 않고 constructor의 super 바인딩을 참조함  

this와 마찬가지로 클래스 필드에 할당한 화살표 함수 내부에서   
super를 참조 시 constructor 내부의 super 바인딩을 참조함  
(위 코드의 경우 Derived 클래스의 constructor는 생략되었지만 암묵적으로 constructor 생성됨)

### 3-5. arguments
화살표 함수는 함수 자체의 arguments 객체를 갖지 않음  
따라 화살표 함수 내부에서 argumetns를 참조 시 this와 마찬가지로 상위 스코프의 argumets를 참조함  
```js
(function () {
  // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킴
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
}(1, 2));

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킴
// 하지만 전역에는 arguments 객체가 존재하지 않음. arguments 객체는 함수 내부에서만 유효함
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError
```
화살표 함수에서 arguments 참조 시 상위 스코프의 arguments 객체를 참조할 수는 있지만   
화살표 함수 자신에게 전달된 인수 목록을 확인할 수 없으므로 그다지 도움되지 않음  
따라 화살표 함수로 가변 인자 함수 구현 시에는 반드시 Rest 파라미터를 사용해야 함


## 4. Rest 파라미터
* 나머지 매개변수
* 매개변수명 앞에 세개의 점(...)을 붙여 정의한 매개변수를 의미
* 함수에 전달된 인수들의 목록을 배열로 전달받음  

### 4-1. 기본 문법
```js
function foo(...rest) { 
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```
* **일반 매개변수와 Rest 파라미터는 함께 사용 가능함**  
  함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당됨
  ```js
  function bar(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest); // [ 3, 4, 5 ]
  }
  bar(1, 2, 3, 4, 5);
  ```
* Rest 파라미터는 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당됨  
  따라 **Rest 파라미터는 반드시 마지막 파라미터여야 함**
  ```js
  function foo(...rest, param1, param2) {}
  
  foo(1, 2, 3, 4, 5);
  // SyntaxError
  ```
* **Rest 파라미터는 하나만 선언 가능함**
  ```js
  function foo(...rest1, ...rest2) { }
  foo(1, 2, 3, 4, 5);
  // SyntaxError
  ```
* Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 **length 프로퍼티에 영향 주지 않음**
  ```js
  function foo(...rest) {}
  console.log(foo.length); // 0
  
  function bar(x, ...rest) {}
  console.log(bar.length); // 1
  
  function baz(x, y, ...rest) {}
  console.log(baz.length); // 2
  ```

### 4-2. Rest 파라미터와 arguments 객체  
argumetns 객체 :   
함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체,   
함수 내부에서 지역 변수처럼 사용 가능    

ES5에서는 함수 정의 시 매개변수 개수를 확정할 수 없는 가변 인자 함수의 경우 arguments 객체를 활용함    
하지만 arguments 객체는 유사 배열 객체이기 때문에 배열 메서드를 사용하려면   
Function.prototype.call 등의 메서드를 이용해 배열로 변환해야 하는 번거로움이 있었음
```js
// 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
function sum() {
  // 가변 인자 함수는 arguments 객체를 통해 인수를 전달받음
  // 유사 배열 객체인 arguments 객체를 배열로 변환
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6에서는 rest 파라미터를 사용해 가변 인자 함수 목록을 배열로 직접 전달받을 수 있음  
이를 통해 유사 배열 객체인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있음  
```js
function sum(...args) {
// Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```
함수와 ES6 메서드는 Rest 파라미터와 arguments 객체 모두 사용 가능    
하지만 화살표 함수는 함수 자체의 arguments 객체를 갖지 않음  
따라 화살표 함수로 가변 인자 함수 구현 시에는 반드시 Rest 파라미터를 사용해야 함


## 5. 매개변수 기본 값 
자바스크립트 엔진은 매개변수의 개수와 인수의 개수를 체크하지 않기 때문에  
함수 호출 시 매개변수의 개수만큼 인수를 전달하지 않아도 에러는 발생하지 않음  

하지만 인수가 전달되지 않은 매개변수의 값은 undefined이므로    
의도치 않은 결과가 발생할 수 있음   

때문에 매개변수에 인수가 전달되었는지 확인해 인수가 전달되지 않은 경우  
매개변수에 기본 값을 할당할 필요가 있음 (방어 코드)
```js
function sum(x, y) {
// 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당
  x = x || 0;
  y = y || 0;
  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```
* ES6에서 도입된 매개변수 기본 값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화 가능함  
  ```js
  function sum(x = 0, y = 0) {
    return x + y;
  }
  
  console.log(sum(1, 2)); // 3
  console.log(sum(1)); // 1
  ```
* 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우에만 유효함
  ```js
  function logName(name = 'Lee') {
    console.log(name);
  }
  
  logName(); // Lee
  logName(undefined); // Lee
  logName(null); // null
  ```
* Rest 파라미터에는 기본 값 지정 불가능  
  ```js
  function foo(...rest = []) { // SyntaxError
      console.log(rest);
  } 
  ```
* 매개변수 기본값은 함수 정의 시 선언한 매개변수를 나타내는 함수 객체의   
  length 프로퍼티와 arguments 객체에 아무 영향 주지 않음
  ```js
  function sum(x, y = 0) {
    console.log(arguments);
  }
  
  console.log(sum.length); // 1
  sum(1); // Arguments { '0': 1 }
  sum(1, 2); // Arguments { '0': 1, '1': 2 }
  ```


