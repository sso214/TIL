---
title : 값(value) vs 참조(reference)  
date : 2021.08.26
---

# 값(value)과 참조(reference)

## 자바스크립트에서 값과 참조
* 값에 의한 전달(passed by value)이 일어나는 5가지 원시 타입 (Boolean, Null, Undefined, String, Number)
* 참조에 의한 전달(passed by reference)이 일어나는 3가지의 객체 타입 (Array, Function, Object)


## 원시타입
* 원시타입이 변수에 할당되면 해당 변수를 원시타입을 가진 타입이라고 볼 수 있음
* 해당 변수를 다른 변수에 `=` 키워드를 이용해 할당하면 새로운 변수에 값을 복사하게 됨  
  (같은 값을 가지게 되지만 분리되어 있음. 값을 바꾸더라도 다른 변수에는 영향 X)
```js
var x = 10;
var y = 'abc';

var a = x;
var b = y;
console.log(x, y, a, b); //10, 'abc', 10, 'abc'
```

### 객체
* 원시 타입이 아닌 값이 할당된 변수들은 값으로 향하는 참조(reference)를 가지게 됨  
  (참조는 실제 값이 아닌 메모리에서의 객체의 위치를 가리킴)
```js
var arr = [];
arr.push(1);
```
* 변수 arr이 가진 변수의 값(주소)는 정적임
* 변수의 값이 변경되는게 아닌 메모리 속의 배열 값만 변경
* push 같은 일을 할 때 자바스크립트 엔진은 메모리 속의 arr 위치로 이동 -> 그곳에 저장된 정보를 이용해 작업 수행

| Variables | Values | Addresses | Objects |
|--|--|--|--|
| arr | <#001>(주소) | #001 | [] |


| Variables | Values | Addresses | Objects |
|--|--|--|--|
| arr | <#001>(주소) | #001 | [1] |

### 참조로 할당하기
* 객체 같은 참조 타입의 값이 `=` 키워드를 이용해 다른 변수로 복사될 때   
  값의 주소는 원시타입의 할당처럼 실제로 복사됨. (객체는 값 대신 참조로 복사)
* 각각의 변수는 같은 배열로 향하는 레퍼런스를 가짐
```js
var reference = [1];
var refCopy = reference;

reference.push(2);
console.log(reference, refCopy); // [1,2], [1,2]
```
| Variables | Values | Addresses | Objects
|--|--|--|--|
| reference | <#001> | #001 | [1]|
| reference | <#001> | | |

### 참조 재할당하기
* 참조 재할당은 오래된 참조를 대체함
1. 객체 생성
```js
var obj = {first: 'reference'};
```
| Variables | Values | Addresses | Objects
|--|--|--|--|
| obj | <#234> | #234 | [first: 'reference']|

2. obj 안에 저장됐던 주소값 변경됨. 첫번째 객체는 아직 메모리 상에 표기가 됨
```js
var obj = {first: 'reference'};
obj = {second: 'ref2'};
```
| Variables | Values | Addresses | Objects
|--|--|--|--|
| obj | <#678> | #234 | [first: 'reference']|
|   |   | #678 | [second: 'ref2']|
* 객체를 가리키는 참조가 남아있지 않을 때 자바스크립트 엔진은 `가비지 컬렉션(garbage collection)`을 동작시킬 수 있음  
* 가비지 컬렉션(garbage collection) : 프로그래머가 모든 참조를 날려 객체를 사용하지 못하게 된 뒤 자바스크립트 엔진은 주소로 가 사용되지 않는 객체를 메모리로부터 안전하게 지워버리는 것  
  (위 코드 같은 경우 객체 {first: 'reference'} 더 이상 접근 불가능하고 가비지 콜렉션 될 수 있음)

### == 와 ===
* 동등함을 비교하는 연산자 `==`와  `===`는 참조 타입 변수의 참조를 체크함
* 2개의 구분 가능한 객체들이 있고 그 객체들의 프로퍼티가 같은지 알고 싶으면  
  * 두 객체를 문자열로 변경 후 문자열로 비교 (동등 연산자가 원시타입 비교시에는 값이 같은지만 확인함)
  * 객체를 이용해 재귀적으로 반복 (각각의 프로퍼티가 동일한지 확인)
```js
// 동일 연산자로 참조 변수 체크
var arrRef = ['hi'];
var arrRef2 = arrRef;
console.log(arrRef == arrRef2); //true

// 객체를 문자열로 변경 후 문자열로 비교
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);
console.log(arr1str === arr2str); //true
```

### 함수를 통한 파라미터의 전달
* 원시 값들을 함수로 전달할 때 함수는 값들을 복사해 파라미터로 전달 (= 연산자를 이용하는 것과 같음)
```js
var hundred = 100;
var two = 2;
function multiply(x, y) { 
    // 원시값을 함수로 전달 시 변수 x는 해당 값을 갖게 됨 (값은 =연산자를 써서 할당한 것처럼 복사됨)
    // 인자로 넘겨진 hundred변수에는 아무런 영향을 미치지 않음
    return x * y;
}
var twoHundred = multiply(hundred, two);
```
| Variables | Values | Addresses | Objects
|--|--|--|--|
| hundred | 100 | #333 | function(x, y)... |
| two | 2 |  |  |
| multiply | <#333> |  |  |
| x | 100 |  |  |
| y | 2 |  |  |


### 순수 함수
* 함수 중 바깥 스코프에 아무 영향도 미치지 않는 함수
* 원시 값들만을 파라미터로 이용하고 주변 스코프에서 어떤 함수도 이용하지 않으면 자연스레 순수함수가 됨
* 안에서 만들어진 모든 변수들은 함수에서 반환이 실행되는 즉시 가비지 콜렉션 처리 됨
* 객체 받는 함수는 주변 스코프들의 상태를 변화시킬 수 있음  
  * 배열 참조값을 가진 변수를 함수가 받고 해당 변수가 가리키는 배열에 push 수행 시 주변 스코프에 존재하는 변수들과 참조와 배열이 변하는 현상이 일어남
  * 함수 리턴 후에 변화된 것들은 바깥 스코프에 여전히 남아있음
  * 이런 현상은 side-effect를 줄 수 있음 (디버깅도 어려움)
* `Array.map()`, `Array.filter` 같은 많은 네이티브 배열 함수들은 순수 함수로 작성되어 있음  
  (배열 참조를 받아 내부적으로 배열 복사하고 원본 대신 복사된 배열로 작업 => 원본을 건드리지 않고 바깥 스코프에 영향 주지 않고 새로운 배열의 참조를 반환함)
```js
// 비순수 함수
function changeAgeImpure(person) {
  person.age = 25; //leo 객체를 직접적으로 변화시킴
  return person; //받았던 객체 그대로 반환
  // person 변수를 반환하고 그 참조를 다시 새로운 변수에 저장하는 건 사실 쓸모없는 일
}
var leo = {
  name: 'leo',
  age: 20
};
var changeLeo = changeAgeImpure(leo); //leo와 changeLeo는 같은 참조를 가짐
console.log(leo); //{name:'leo', age:25}
console.log(changeLeo); //{name:'leo', age:25}

// 순수 함수
function changeAgePure(person) {
  var newPerson = JSON.parse(JSON.stringify(person));
  // 넘겨받은 객체를 문자열로 변화시키기 위해 JSON.stringify 함수 사용 => JSON.parse 함수를 이용해 다시 객체로 만듬 => 새로운 객체 생성하고 새로운 변수에 저장
  // 다른 방법으로 원본 객체의 프로퍼티를 반복해 새로운 객체에 할당하는 방법도 있음
  // 새로운 객체는 원본과 같은 프로퍼티들을 가지지만 메모리 상에서 두 객체는 다른 주소값을 가지고 구분됨
  newPerson.age = 25;
  return newPerson; // 새롭게 만들어진 객체 반환
};
var leo = {
  name: 'leo',
  age: 20
};
var changeLeo = changeAgePure(leo); // 프로퍼티를 변경해도 원본에 영향을 주지 않음. (바깥 스코프에 영향 미치지 않음. 인자로 받은 객체까지)
// 새롭게 만들어진 객체 반환해서 새로운 변수에 저장되어야 함. 
// 그렇지 않으면 결과값은 가비지 콜렉션 되고 객체는 어디에도 남지 않게 됨
console.log(leo); //{name:'leo', age:20}
console.log(changeLeo); //{name:'leo', age:25}
```

### 자가 테스트
```js
function changeAgeAndReference(person) {
  person.age = 25; //넘겨진 원본객체 age 변경
  person = { //person을 새로운 객체로 재할당 (새로운 참조를 갖게 되어 원본 객체에 더 이상 영향 미치지 않음)
    name: 'John',
    age: 50
  };
  return person;
}

var personObj1 = {
  name: 'Alex',
  age: 30
};

var personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> {name: 'Alex', age:25}
console.log(personObj2); // -> {name: 'John', age:50}
```
