---
title : 34장. 이터러블
date : 2022.06.20
---

# 34장. 이터러블

## 1. 이터레이션 프로토콜
* ES6에서 도입
* 순회 가능한 데이터 컬렉션(자료 구조)을 만들기 위해 ECMAScript 사양에 정의해 미리 약속한 규칙
* ES6 이전의 순회 가능한 데이터 컬렉션은 통일된 규약 없이 다양한 방법으로 순회 가능했음   
  ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일해   
  for...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화 함
* 이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있음  

#### 이터러블 프로토콜  
* Well-known Symbol인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나  
  프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면  
  이터레이터 프로토콜을 준수한 이터레이터를 반환함   
* 이런 규약을 이터러블 프로토콜이라 하며,  
  이터러블 프로토콜을 준수한 객체를 이터러블이라 함  
* 이터러블은 for...of 문으로 순회 가능하며  
  스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용 가능

#### 이터레이터 프로토콜  
* 이터러블의 Symbol.iterator 메서드를 호출 시 이터레이터 프로토콜을 준수한 이터레이터를 반환함     
* 이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며   
  value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환함   
* 이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터라 함   
* 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 함

### 1-1. 이터러블
* 이터러블 프로토콜을 준수한 객체
* Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나   
  프로토타입 체인을 통해 상속받은 객체를 말함
* 이터러블인지 확인하는 함수
  ```js
  const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';
  
  // 배열, 문자열, Map, Set 등은 이터러블이다.
  isIterable([]); //  true
  isIterable(''); //  true
  isIterable(new Map()); //  true
  isIterable(new Set()); //  true
  isIterable({}); //  false
  ```
* 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블.   
  이터러블은 for...of 문으로 순회할 수 있으며,   
  스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있음
  ```js
  const array = [1, 2, 3];
  
  // 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
  console.log(Symbol.iterator in array); // true
  
  // 이터러블인 배열은 for...of 문으로 순회 가능하다.
  for (const item of array) {
    console.log(item);
  }
  
  // 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
  console.log([...array]); // [1, 2, 3]
  
  // 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
  const [a, ...rest] = array;
  console.log(a, rest); // 1, [2, 3]
  ```
* Symbol.iterator 메서드를 직접 구현하지 않거나 상속받지 않은 일반 객체는   
  이터러블 프로토콜을 준수한 이터러블이 아님   
  따라서 일반 객체는 for...of 문으로 순회할 수 없으며   
  스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 없음
  ```js
  const obj = {a: 1, b: 2};
  
  // 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않는다.
  // 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
  console.log(Symbol.iterator in obj); // false
  
  // 이터러블이 아닌 일반 객체는 for...of 문으로 순회할 수 없다.
  for (const item of obj) { //  TypeError: obj is not iterable
    console.log(item);
  }
  
  // 이터러블이 아닌 일반 객체는 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.
  const [a, b] = obj; //  TypeError: obj is not iterable
  ```
  단, TC39 프로세스의 stage 4(Finished) 단계에 제안되어 있는   
  스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법의 사용을 허용함
  ```js
  const obj = { a: 1, b: 2 };
  
  // 스프레드 프로퍼티 제안(Stage 4)은 객체 리터럴 내부에서 스프레드 문법의 사용을 허용한다.
  console.log({ ...obj }); // { a: 1, b: 2 }
  ```
* 일반 객체도 이터러블 프로토콜을 준수하도록 구현하면 이터러블이 됨

### 1-2. 이터레이터
* 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환함  
* 이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖음
  ```js
  // 배열은 이터러블 프로토콜을 준수한 이터러블이다.
  const array = [1, 2, 3];
  
  // Symbol.iterator 메서드는 이터레이터를 반환한다.
  const iterator = array[Symbol.iterator]();
  
  // Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
  console.log('next' in iterator); // true
  ```
* 이터레이터의 next 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 함   
  즉, next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며   
  순회 결과를 나타내는 이터레이터 리절트 객체를 반환함
  ```js
  // 배열은 이터러블 프로토콜을 준수한 이터러블이다.
  const array = [1, 2, 3];
  
  // Symbol.iterator 메서드는 이터레이터를 반환한다. 이터레이터는 next 메서드를 갖는다.
  const iterator = array[Symbol.iterator]();
  
  // next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
  // 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: 3, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
  ```
* 이터레이터의 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는   
  현재 순회 중인 이터러블의 값을 나타내며 done 프로퍼티는 이터러블의 순회 완료 여부를 나타냄


## 2. 빌트인 이터러블
* 자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공함

|빌트인 이터러블|Symbol.iterator 메서드|
|:-|:-|
|Array|Array.prototype[Symbol.iterator]|
|String|String.prototype[Symbol.iterator]|
|Map|Map.prototype[Symbol.iterator]|
|Set|Set.prototype[Symbol.iterator]|
|TypedArray|TypedArray.prototype[Symbol.iterator]|
|arguments|arguments[Symbol.iterator]|
|DOM 컬렉션|NodeList.prototype[Symbol.iterator]<br>HTMLCollection.prototype[Symbol.iterator]|


## 3. for...of 문
* for...of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당함 
* for...of 문은 for...in 문의 형식과 매우 유사함
  ```js
  for (변수선언문 in 객체) { ... }
  
  for (변수선언문 of 이터러블) { ... }
  ```
* 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서   
  프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거함   
  이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않음
* for...of 문은 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며   
  next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for...of 문의 변수에 할당함   
  그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면   
  이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단함
  ```js
  for (const item of [1, 2, 3]) {
    // item 변수에 순차적으로 1, 2, 3이 할당된다.
    console.log(item); // 1 2 3
  }
  ```
* for...of 문의 내부 동작을 for 문으로 표현
  ```js
  // 이터러블
  const iterable = [1, 2, 3];
  
  // 이터러블의 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
  const iterator = iterable[Symbol.iterator]();
  
  for (; ;) {
    // 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다.
    // 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
    const res = iterator.next();
    
    // next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
    if (res.done) break;
    
    // 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
    const item = res.value;
    console.log(item); // 1 2 3
  }
  ```


## 4. 이터러블과 유사 배열 객체
* 유사 배열 객체 : 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체
* 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있고,   
  인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로 가지므로   
  마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있음
  ```js
  // 유사 배열 객체
  const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
  };
  
  // 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있다.
  for (let i = 0; i < arrayLike.length; i++) {
    // 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.
    console.log(arrayLike[i]); // 1 2 3
  }
  ```
* 유사 배열 객체는 이터러블이 아닌 일반 객체   
  따라서 유사 배열 객체에는 Symbol.iterator 메서드가 없기 때문에 for...of 문으로 순회할 수 없음
  ```js
  // 유사 배열 객체는 이터러블이 아니기 때문에 for...of 문으로 순회할 수 없다.
  for (const item of arrayLike) {
    console.log(item); // 1 2 3
  }
  // TypeError: arrayLike is not iterable
  ```
* 단, arguments, NodeList, HTMLCollection은 유사 배열 객체이면서 이터러블  
  정확히 말하면 ES6에서 이터러블이 도입되면서 유사 배열 객체인 arguments, NodeList,   
  HTMLCollection 객체에 Symbol. iterator 메서드를 구현해 이터러블이 됨   
  
  하지만 이터러블이 된 이후에도 length 프로퍼티를 가지며 인덱스로 접근할 수 있는 것에는   
  변함이 없으므로 유사 배열 객체이면서 이터러블인 것   
  배열도 마찬가지로 ES6에서 이터러블이 도입되면서 Symbol.iterator 메서드를 구현하여 이터러블이 됨    
  
  하지만 모든 유사 배열 객체가 이터러블인 것은 아님   
  다만 ES6에서 도입된 Array.from 메서드를 사용하여 배열로 간단히 변환할 수 있음  
  Array.from 메서드는 유사 배열 객체 또는 이터러블을 인수로 전달받아 배열로 변환하여 반환함
  ```js
  // 유사 배열 객체
  const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
  };
  // Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다.
  const arr = Array.from(arrayLike);
  console.log(arr); // [1, 2, 3]
  ```


## 5. 이터레이션 프로토콜의 필요성
for...of 문, 스프레드 문법, 배열 디스트럭처링 할당 등은 Array, String, Map, Set, TypedArray, DOM 컬렉션,  
arguments와 같이 다양한 데이터 소스를 사용할 수 있음 (이터레이션 프로토콜을 준수하는 이터러블)  

ES6 이전의 순회 가능한 데이터 컬렉션(배열, 문자열, 유사 배열 객체, DOM 컬렉션 등)은   
통일된 규약 없이 각자 나름의 구조를 가지고 다양한 방법으로 순회 가능했음   
ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일해   
for...of 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화 함

이터러블은 for...of 문, 스프레드 문법, 배열 디스트럭처링 할당과 같은   
데이터 소비자에 의해 사용되므로 데이터 공급자의 역할을 한다고 할 수 있음  

만약 다양한 데이터 공급자가 각자의 순회 방식을 갖는다면 데이터 소비자는   
다양한 데이터 공급자의 순회 방식을 모두 지원해야 함. -> 비효율적.   
다양한 데이터 공급자가 이터레이션 프로토콜을 준수하도록 규정하면   
데이터 소비자는 이터레이션 프로토콜만 지원하도록 구현하면 됨

즉, 이터러블을 지원하는 데이터 소비자는 내부에서 Symbol.iterator 메서드를 호출해 이터레이터를 생성하고   
이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 이터레이터 리절트 객체를 반환힘.  
그리고 이터레이터 리절트 객체의 value/done 프로퍼티 값을 취득함   

이처럼 이터레이션 프로토콜은 다양한 데이터 공급자가 하나의 순회 방식을 갖도록 규정해   
데이터 소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록   
데이터 소비자와 데이터 공급자를 연결하는 인터페이스의 역할을 함


## 6. 사용자 정의 이터러블

### 6-1. 사용자 정의 이터러블 구현
이터레이션 프로토콜을 준수하지 않는 일반 객체도    
이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 됨   
```js
// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
  // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다.
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1]; // 36.1절 "배열 디스트럭처링 할당" 참고
    const max = 10; // 수열의 최대값

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 하고
    // next 메서드는 이터레이터 리절트 객체를 반환해야 한다.
    return {
      next() {
        [pre, cur] = [cur, pre + cur]; // 36.1절 "배열 디스트럭처링 할당" 참고
        // 이터레이터 리절트 객체를 반환한다.
        return {value: cur, done: cur >= max};
      }
    };
  }
};

// 이터러블인 fibonacci 객체를 순회할 때마다 next 메서드가 호출된다.
for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}
```
사용자 정의 이터러블은 이터레이션 프로토콜을 준수하도록 Symbol.iterator 메서드를 구현하고   
Symbol.iterator 메서드가 next 메서드를 갖는 이터레이터를 반환하도록 함   

그리고 이터레이터의 next 메서드는 done과 value 프로퍼티를 가지는 이터레이터 리절트 객체를 반환함   
for...of 문은 done 프로퍼티가 true가 될 때까지 반복하며 done 프로퍼티가 true가 되면 반복을 중지함  
이터러블은 for...of 문뿐만 아니라 스프레드 문법, 배열 디스트럭처링 할당에도 사용할 수 있음
```js
// 이터러블은 스프레드 문법의 대상이 될 수 있다.
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8 ]

// 이터러블은 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]
```

### 6-2. 이터러블을 생성하는 함수
```js
// 피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수.
// 수열의 최대값을 인수로 전달받는다.
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];
// Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return {value: cur, done: cur >= max};
        }
      };
    }
  };
};
// 이터러블을 반환하는 함수에 수열의 최대값을 인수로 전달하면서 호출한다.
// fibonacciFunc(10)은 이터러블을 반환한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

### 6-3. 이터러블이면서 이터레이터인 객체를 생성하는 함수

### 6-4. 무한 이터러블과 지연 평가
이터러블은 데이터 공급자의 역할을 함   
배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급함   

하지만 위 예제의 이터러블은 지연 평가를 통해 데이터를 생성함  
지연 평가는 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가   
데이터가 필요한 시점이 되면 그때야 비로소 데이터를 생성하는 기법   
즉, 평가 결과가 필요할 때까지 평가를 늦추는 기법이 지연 평가

위 예제의 fibonacciFunc 함수는 무한 이터러블을 생성함  
하지만 fibonacciFunc 함수가 생성한 무한 이터러블은 데이터를 공급하는 메커니즘을 구현한 것으로   
데이터 소비자인 for...of 문이나 배열 디스트럭처링 할당 등이 실행되기 이전까지 데이터를 생성하지는 않음.  

for...of 문의 경우 이터러블을 순회할 때 내부에서   
이터레이터의 next 메서드를 호출하는데 바로 이때 데이터가 생성됨  
next 메서드가 호출되기 이전까지는 데이터를 생성하지 않음  
즉, 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성함  

이처럼 지연 평가를 사용하면 불필요한 데이터를 미리 생성하지 않고 필요한 데이터를 필요한 순간에   
생성하므로 빠른 실행 속도를 기대할 수 있고 불필요한 메모리를 소비하지 않으며   
무한도 표현할 수 있다는 장점이 있음


