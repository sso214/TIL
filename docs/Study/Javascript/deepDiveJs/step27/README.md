---
title : 27장. 배열
date : 2022.06.13
---

# 27장. 배열

## 1. 배열이란?
```js
//배열 리터럴을 통해 생성한 배열
//배열 arr는 3개의 요소로 구성되어 있음
const arr = ['apple', 'banana', 'orange'];

arr[0]; //'apple'
arr[1]; //'banana'
arr[2]; //'orange'

arr.length; //3

//배열의 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 'apple' 'banana' 'orange'
}

typeof arr; //object

const arr = [1, 2, 3];
arr.constructor === Array //true
Object.getPrototypeOf(arr) === Array.prototype //true
```
* 여러 개의 값을 순차적으로 나열한 자료구조  
* 요소   
  * 배열이 가지고 있는 값
  * 자바스크립트의 모든 값은 배열의 요소가 될 수 있음  
  * 배열에서 자신의 위치를 나타내는 0 이상의 정수인 인덱스를 가짐 (배열 요소에 접근 시 사용)  
  * 요소 접근 시에는 대괄효 포기법을 사용
* 배열은 요소의 개수, 즉 배열의 길이를 나타내는 length 프로퍼티를 가짐   
* 인덱스로 표현되는 값의 순서외 length 프로퍼티를 갖기 때문에 반복문을 통해 값에 접근하기 적합한 자료구조
* 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드로 생성 가능
* 배열의 생성자 함수 : Array  
  배열의 프로토타입 객체 : Array.prototype (배열을 위한 빌트인 메서드 제공)
* 배열은 객체지만 일반 객체와는 구분되는 특징 있음    
  가장 명확한 차이는 '값의 순서'와 'length 프로퍼티'.  
  |구분|객체|배열|
  |:-|:-|:-|
  |구조|프로퍼티 키와 프로퍼티 값|인덱스와 요소|
  |값의 참조|프로퍼티 키|인덱스|
  |값의 순서|X|O|
  |length 프로퍼티|X|O|


## 2. 자바스크립트 배열은 배열이 아니다

### 자료구조에서 말하는 배열  
* 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조   
* 하나의 데이터 타입으로 통일되어 있으며 서로 연속적으로 인접해 있음 (=밀집 배열)  
* 인덱스를 통해 단 한번의 연산으로 임의의 요소에 접근(임의 접근, 시간 복잡도 O(1)) 가능
* 매우 효율적이고, 고속으로 동작함  
* 정렬되지 않은 배열이나 배열에 요소를 삽입/삭제하는 경우 효율적이지 않음


### 자바스크립트의 배열  
* 자료구조에서 말하는 일반적인 의미의 배열과 다름  
* 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며,   
  연속적으로 이어져있지 않을 수도 있음(=희소 배열)  
* 일반적인 배열의 동작을 흉내 낸 특수한 객체  
  인덱스를 나타내는 문자열을 프로퍼티 키로 가지며, length 프로퍼티를 갖는 특수한 객체
* 자바스크립트 배열의 요소는 사실 프로퍼티 값  
  자바스크립트의 모든 값은 객체의 프로퍼티 값이 될 수 있으므로   
  배열의 요소에도 모든 타입의 값이 들어갈 수 있음
```js
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
'0': {value: 1, writable: true, enumerable: true, configurable: true}
'1': {value: 2, writable: true, enumerable: true, configurable: true}
'2': {value: 3, writable: true, enumerable: true, configurable: true}
length: {value: 3, writable: true, enumerable: false, configurable: false}
}
*/
```

### 일반적인 배열과 자바스크립트 배열의 장단점
* 일반적인 배열    
  * 인덱스로 요소에 빠르게 접근 가능함  
  * 특정 요소를 검색하거나 요소를 삽입/삭제하는 경우에는 효율적이지 않음
* 자바스크립트 배열  
  * 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우  
    일반적인 배열보다 성능적인 면에서 느릴 수밖에 없는 구조적인 단점이 있음  
  * 특정 요소를 검색하거나 요소를 삽입/삭제하는 경우에는 일반적인 배열보다 빠른 성능 기대 가능함

자바스크립트 배열은 인덱스로 접근하는 경우의 성능 대신   
특정 요소를 탐색하거나 배열 요소를 삽입/삭제하는 경우의 성능을 선택함  

인덱스로 배열 요소에 접근 시 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점을 보완하기 위해  
대부분의 모던 자바스크립트 엔진은 배열을 일반 객체와 구별해 좀 더 배열처럼 동작하도록 최적화해 구현함  
아래처럼 배열과 일반 객체의 성능을 테스트해보면 배열이 일반 객체보다 약 2배정도 빠름을 알 수 있음
```js
const arr = [];
console.time('Array Performance Test');
for (let i = 0; i < 10000000; i++) {
  arr[i] = i;
}
console.timeEnd('Array Performance Test');
// 약 340ms

const obj = {};
console.time('Object Performance Test');
for (let i = 0; i < 10000000; i++) {
  obj[i] = i;
}
console.timeEnd('Object Performance Test');
// 약 600ms
```


## 3. length 프로퍼티와 희소 배열

### length 프로퍼티  
* 요소의 개수, 즉 배열의 길이를 나타내는 0 이상의 정수를 값으로 갖음  
* 빈 배열일 경우 length 프로퍼티의 값은 0,   
  빈 배열이 아닐 경우 가장 큰 인덱스에 1을 더한 것과 같음
* 배열에서 사용할 수 있는 가장 작은 인덱스는 0이며, 가장 큰 인덱스는 232 – 2(4,294,967,294)
* 배열에 요소를 추가하거나 삭제하면 length 프로퍼티의 값이 자동 갱신됨
* length 프로퍼티 값은 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 명시적으로 할당할 수도 있음  
  * 현재 length 프로퍼티 값보다 작은 숫자 값 할당 시 :   
    배열의 길이가 줄어듬
  * 현재 length 프로퍼티 값보다 큰 숫자 값 할당 시 :   
    length 프로퍼티 값은 변경되지만 실제로 배열의 길이는 늘어나지 않음  
    (값 없이 비어있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않음)  
```js
[].length //0
[1, 2, 3].length //3

const arr = [1, 2, 3];
console.log(arr.length); // 3

// 요소 추가
arr.push(4);
// 요소를 추가하면 length 프로퍼티의 값 자동 갱신
console.log(arr.length); // 4

// 요소 삭제
arr.pop();
// 요소를 삭제하면 length 프로퍼티의 값 자동 갱신
console.log(arr.length); // 3

// 현재 length 프로퍼티 값인 3보다 작은 숫자 값 2를 length 프로퍼티에 할당
arr.length = 2;
// 배열의 길이가 3에서 2로 줄어듬
console.log(arr); // [1, 2]

// 현재 length 프로퍼티 값인 2보다 큰 숫자 값 4를 length 프로퍼티에 할당
arr.length = 4;
// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않음
console.log(arr.length); // 4
console.log(arr); // [1, 2, empty × 2]
// 위 코드의 출력 결과에서 empty × 2는 실제로 추가된 배열의 요소가 아님
// 즉 arr[2], arr[3]에는 값이 존재하지 않음  

console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
'0': {value: 1, writable: true, enumerable: true, configurable: true},
'1': {value: 2, writable: true, enumerable: true, configurable: true},
length: {value: 4, writable: true, enumerable: false, configurable: false}
}
*/
```

### 희소 배열
* 배열의 현재 length 프로퍼티 값보다 큰 숫자 값을 length 프로퍼티에 할당하는 경우   
  length 프로퍼티 값은 변경되지만 실제 배열에는 아무런 변함이 없는데  
  이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열을 희소 배열이라고 함
* 일반적인 배열의 length는 배열 요소의 개수와 언제나 일치하지만   
  희소 배열은 length와 배열 요소의 개수가 일치하지 않으며   
  희소 배열의 length는 희소 배열의 실제 요소 개수보다 언제나 큼
* 자바스크립트는 희소 배열을 문법적으로 허용하지만 사용하지 않는 것을 권장  
  연속적인 값의 집합이라는 배열의 기본적인 개념과 맞지 않으며 성능에도 좋지 않은 영향을 줌  
  (최적화가 잘 되어 있는 모던 자바스크립트 엔진은 요소의 타입이 일치하는 배열을 생성 시   
  일반적인 의미의 배열처럼 연속된 메모리 공간을 확보함)  
  따라 **배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선**
```js
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않음
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않음
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
'1': { value: 2, writable: true, enumerable: true, configurable: true },
'3': { value: 4, writable: true, enumerable: true, configurable: true },
length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```


## 4. 배열 생성

### 4-1. 배열 리터럴
* 다양한 방법 중 가장 일반적이고 간편한 배열 생성 방식
* 0개 이상의 요소를 쉼표로 구분해 대괄호로 묶음
* 객체 리터럴과 달리 프로퍼티 키가 없고 값만 존재
* 요소를 하나도 추가하지 않으면 length 프로퍼티 값이 0인 빈 배열이 됨
* 배열 리터럴에 요소를 생략하면 희소 배열이 생성됨
```js
const arr = [1, 2, 3];
console.log(arr.length); // 3

const arr = [];
console.log(arr.length); // 0

const arr = [1, , 3]; // 희소 배열
// 희소 배열의 length는 배열의 실제 요소 개수보다 언제나 큼
console.log(arr.length); // 3
console.log(arr); // [1, empty, 3]
console.log(arr[1]); // undefined (객체인 arr에 프로퍼티 키가 '1'인 프로퍼티가 존재하지 않기 떄문)
```

### 4-2. Array 생성자 함수
* 전달된 인수의 개수에 따라 다르게 동작함
  * 전달된 인수가 1개이고 숫자인 경우 : length 프로퍼티 값이 인수인 배열을 생성함
    ```js
    const arr = new Array(10);
    //희소 배열 생성
    console.log(arr); // [empty × 10]
    console.log(arr.length); // 10
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
    length: {value: 10, writable: true, enumerable: false, configurable: false}
    }
    */
    
    // 배열은 요소를 최대 4,294,967,295개 가질 수 있음
    new Array(4294967295);
    // 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError 발생
    new Array(4294967296); // RangeError
    // 전달된 인수가 음수면 에러 발생
    new Array(-1); // RangeError: Invalid array length
    ```
  * 전달된 인수가 없는 경우 : 빈 배열 생성 (배열 리터럴 []과 같음)
    ```js
    new Array(); //[]
    ```
  * 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 : 인수를 요소로 갖는 배열 생성
    ```js
    // 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열 생성
    new Array(1, 2, 3); //[1, 2, 3]
    
    // 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열 생성
    new Array({}); //[{}]
    ```
* new 연산자와 함께 호출하지 않아도(=일반 함수로서 호출해도) 배열을 생성하는 생성자 함수로 동작함  
  Array 생성자 함수 내부에서 new.target을 확인하기 때문
  ```js
  Array(1, 2, 3); //[1, 2, 3]
  ```

### 4-3. Array.of
* ES6에서 도입됨
* 전달된 인수를 요소로 갖는 배열을 생성
* Array 생성자 함수와 달리 전달된 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열을 생성함
```js
// 전달된 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열 생성
Array.of(1); //[1]
Array.of(1, 2, 3); //[1, 2, 3]
Array.of('string'); //['string']
```

### 4-4. Array.from
* ES6에서 도입됨
* 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환해 반환함
* 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있음  
  두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를  
  순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환함
```js
// 유사 배열 객체 변환해 배열 생성
Array.from({ length: 2, 0: 'a', 1: 'b' }); //['a', 'b']

// 이터러블을 변환해 배열을 생성. 문자열은 이터러블
Array.from('Hello'); //['H', 'e', 'l', 'l', 'o']

// Array.from에 length만 존재하는 유사 배열 객체를 전달 시 undefined를 요소로 채움
Array.from({ length: 3 }); //[undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환함
Array.from({ length: 3 }, (_, i) => i); //[0, 1, 2]
```

#### <유사 배열 객체와 이터러블 객체>
* 유사 배열 객체  
  * 마치 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고 length 프로퍼티를 갖는 객체
  * 배열처럼 for 문으로 순회 가능
  ```js
  // 유사 배열 객체
  const arrayLike = {
    '0': 'apple',
    '1': 'banana',
    '2': 'orange',
    length: 3
  };
  
  // 유사 배열 객체는 마치 배열처럼 for 문으로 순회할 수도 있음
  for (let i = 0; i < arrayLike.length; i++) {
    console.log(arrayLike[i]); // apple banana orange
  }
  ```
* 이터러블 객체  
  * Symbol.iterator 메서드를 구현해 for...of 문으로 순회 가능하며  
    스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체
  * ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set,   
    DOM 컬렉션(NodeList, HTMLCollection), arguments 등이 있음


## 5. 배열 요소의 참조
* 대괄효 표기법을 사용함
* 대괄호 안에는 인덱스 삽입 (정수로 평가되는 표현식이라면 인덱스 대신 사용 가능함)
* 인덱스는 값을 참조할 수 있다는 의미에서 객체의 프로퍼티 키와 같은 역할을 함
* 존재하지 않는 욧에 접근 시 undefined 반환함  
  배열은 사실 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체  
  따라 존재하지 않는 프로퍼티 키로 객체에 프로퍼티에 접근 시 undefined를 반환하는 것처럼  
  배열도 존재하지 않는 요소를 참조하면 undefined를 반환함  
  같은 이유로 희소 배열의 존재하지 않는 요소를 참조해도 undefined가 반환됨
```js
const arr = [1, 2];
// 인덱스가 0인 요소 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소 참조
console.log(arr[1]); // 2
// 인덱스가 2인 요소 참조. 배열 arr에는 인덱스가 2인 요소가 존재하지 않음
console.log(arr[2]); // undefined


// 희소 배열
const arr = [1, , 3];
// 배열 arr에는 인덱스가 1인 요소가 존재하지 않음
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
'0': {value: 1, writable: true, enumerable: true, configurable: true},
'2': {value: 3, writable: true, enumerable: true, configurable: true},
length: {value: 3, writable: true, enumerable: false, configurable: false}
*/
// 존재하지 않는 요소 참조 시 undefined가 반환됨
console.log(arr[1]); // undefined
console.log(arr[3]); // undefined
```


## 6. 배열 요소의 추가와 갱신
* 배열에 요소 동적 추가 가능
* 존재하지 않는 인덱스를 사용해 값 할당 시 새로운 요소가 추가됨  
  이때 length 프로퍼티 값은 자동 갱신됨
* 만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소 추가 시 희소 배열이 됨  
  이때 인덱스로 요소에 접근해 명시적으로 값을 할당하지 않은 요소는 생성되지 않음
* 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신됨
* 인덱스는 요소의 위치를 나타내므로 반드시 0이상의 정수(또는 정수 형태의 문자열)을 사용해야 함  
  만약 정수 이외의 값을 인덱스처럼 사용 시 요소가 생성되는게 아니라 프로퍼티가 생성됨  
  (이때 추가된 프로퍼티는 length 프로퍼티 값에 영향 주지 않음)
```js
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;
console.log(arr); // [0, 1]
console.log(arr.length); // 2

// 희소 배열
arr[100] = 100;
console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101
// 명시적으로 값을 할당하지 않은 요소는 생성되지 않음
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
'0': {value: 0, writable: true, enumerable: true, configurable: true},
'1': {value: 1, writable: true, enumerable: true, configurable: true},
'100': {value: 100, writable: true, enumerable: true, configurable: true},
length: {value: 101, writable: true, enumerable: false, configurable: false}
*/

// 요소값의 갱신
arr[1] = 10;
console.log(arr); // [0, 10, empty × 98, 100]


const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향 주지 않음
console.log(arr.length); // 2
```


## 7. 배열 요소의 삭제
* 배열은 객체이므로 특정 요소를 삭제하기 위해 delete 연산자를 사용할 수 있음  
  이때 배열은 희소 배열이 되며 length 프로퍼티의 값은 변하지 않음  
  따라 희소 배열을 만드는 delete 연산자는 사용하지 않는 것이 좋음
* 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면  
  Array.prototype.splice 메서드 사용
```js
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]
// length 프로퍼티에 영향 주지 않음. 즉, 희소 배열이 됨
console.log(arr.length); // 3

const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신됨
console.log(arr.length); // 2
```


## 8. 배열 메서드
* 자바스크립트는 배열을 다룰 때 유용한 다양한 빌트인 메서드를 제공함  
  Array 생성자 함수 : 정적 메서드를 제공,   
  배열 객체의 프로토타입인 Array.prototype : 프로토타입 메서드를 제공함
* 배열 메서드는 결과물을 반환하는 패턴이 두 가지  
  * 원본 배열(배열 메서드를 호출한 배열)을 직접 변경하는 메서드  
    외부 상태를 직접 변경하는 부수 효과가 있으므로 사용할 때 주의 필요  
    가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋음
  * 원본 배열을 직접 변경하지 않고 새로운 배열을 생성해 반환하는 메서드
```js
const arr = [1];
// push 메서드는 원본 배열(arr)을 직접 변경함
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환함
const result = arr.concat(3);
console.log(arr); // [1, 2]
console.log(result); // [1, 2, 3]
```

### 8-1. Array.isArray
* Array 생성자 함수의 정적 메서드 (Array.of / Array.from도 Array 생성자 함수의 정적 메서드)
* 전달된 인수가 배열이면 true, 배열이 아니면 false 반환
```js
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 })
```

### 8-2. Array.prototype.indexOf
* 원본 배열에서 인수로 전달된 요소를 검색해 인덱스를 반환함
  * 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환
  * 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1 반환
* 두 번쨰 인수로 검색을 시작할 인덱스를 넘길 수 있음
* 배열에 특정 요소가 존재하는지 확인할 때 유용함
* indexOf 메서드 대신 ES7에서 도입된 Array.prototype.includes 메서드 사용 시 더 가독성이 좋음
```js
const arr = [1, 2, 2, 3];
// 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환
arr.indexOf(2); //1
// 배열 arr에 요소 4가 없으므로 -1을 반환
arr.indexOf(4); //-1
// 두 번째 인수는 검색을 시작할 인덱스. 두 번째 인수를 생략하면 처음부터 검색함
arr.indexOf(2, 2); //2

const foods = ['apple', 'banana', 'orange'];
// foods 배열에 'orange' 요소가 존재하는지 확인
if (foods.indexOf('orange') === -1) {
// foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push('orange');
}
console.log(foods); // ["apple", "banana", "orange"]

// Array.prototype.includes 메서드 사용 
const foods = ['apple', 'banana', 'orange'];
// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods.includes('orange')) {
// foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push('orange');
}
console.log(foods); // ["apple", "banana", "orange"]
```

### 8-3. Array.prototype.push
* 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환함  
* 성능면에서 좋지 않기 때문에 마지막 요소로 추가할 요소가 하나뿐이라면 push 메서드를 사용하지 않고  
  length 프로퍼티를 사용해 배열 마지막에 요소를 직접 추가하는걸 권장 (push 메서드보다 더 빠름)
* 원본 배열을 직접 변경하는 부수 효과가 있기 때문에 push 대신 ES6의 스프레드 문법을 사용하는 걸 권장  
  스프레드 문법 사용 시 함수 호출 없이 표현식으로 마지막에 요소를 추가할 수 있으며 부수 효과도 없음
```js
// 인수로 전달받은 모든 값을 원본 배열 arr의 마지막 요소로 추가하고 변경된 length 값을 반환함
const arr = [1, 2];
let result = arr.push(3, 4);
console.log(result); // 4
// push 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1, 2, 3, 4]


// arr.push(3)과 동일한 처리를 함. 이 방법이 push 메서드보다 빠름
const arr = [1, 2];
arr[arr.length] = 3;
console.log(arr); // [1, 2, 3]


// ES6 스프레드 문법
const arr = [1, 2];
const newArr = [...arr, 3];
console.log(newArr); // [1, 2, 3]
```

### 8-4. Array.prototype.pop
* 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환함
* 원본 배열이 빈 배열이면 undefined를 반환함
* 원본 배열을 직접 변경함
```js
const arr = [1, 2];
// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환함
let result = arr.pop();
console.log(result); // 2
// pop 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1]
```

#### <pop 메서드와 push 메서드를 사용해 스택 구현>
* 스택   
  * 후입 선출 방식의 자료 구조
  * 언제나 가장 마지막에 밀어 넣은 최신 데이터를 먼저 취득함  
  * push : 스택에 데이터를 밀어 넣는 것 
  * pop : 스택에서 데이터를 꺼내는 것
* 스택을 생성자 함수로 구현
  ```js
  const Stack = (function () {
    function Stack(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`);
      }
      this.array = array;
    }
  
    Stack.prototype = {
      constructor: Stack,   
      // 스택의 가장 마지막에 데이터를 밀어 넣는다.
      push(value) {
        return this.array.push(value);
      },   
      // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
      pop() {
        return this.array.pop();
      }, 
      // 스택의 복사본 배열을 반환한다.
      entries() {
        return [...this.array];
      }
    };
    return Stack;
  }());
  
  const stack = new Stack([1, 2]);
  console.log(stack.entries()); // [1, 2]
  stack.push(3);
  console.log(stack.entries()); // [1, 2, 3]
  stack.pop();
  console.log(stack.entries()); // [1, 2]
  ```
* 스택을 클래스로 구현
  ```js
  class Stack {
    #array; // private class member
    constructor(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`);
      }
      this.#array = array;
    }
    // 스택의 가장 마지막에 데이터를 밀어 넣는다.
    push(value) {
      return this.#array.push(value);
    }
    // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
    pop() {
      return this.#array.pop();
    }
    // 스택의 복사본 배열을 반환한다.
    entries() {
      return [...this.#array];
    }
  }
  
  const stack = new Stack([1, 2]);
  console.log(stack.entries()); // [1, 2]
  stack.push(3);
  console.log(stack.entries()); // [1, 2, 3]
  stack.pop();
  console.log(stack.entries()); // [1, 2]
  ```

### 8-5. Array.prototype.unshift
* 인수로 전달받은 모든 값을 원본 배열 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환
* 원본 배열을 직접 변경하는 부수 효과가 있으므로 unshift 메서드보다는 ES6의 스프레드 문법을 사용하는게 좋음
```js
const arr = [1, 2];
// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환
let result = arr.unshift(3, 4);
console.log(result); // 4
// unshift 메서드는 원본 배열을 직접 변경함
console.log(arr); // [3, 4, 1, 2]

// ES6 스프레드 문법
const arr = [1, 2];
const newArr = [3, ...arr];
console.log(newArr); // [3, 1, 2]
```

### 8-6. Array.prototype.shift
* 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환함  
* 원본 배열이 빈 배열일 경우 undefined를 반환
* 원본 배열을 직접 변경함
```js
const arr = [1, 2];
// 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환함
let result = arr.shift();
console.log(result); // 1
// shift 메서드는 원본 배열을 직접 변경함
console.log(arr); // [2]
```
#### <shift 메서드와 push 메서드를 사용해 큐 구현>
* 큐  
  * 선입 선출 방식의 자료 구조  
  * 언제나 데이터를 밀어 넣은 순서대로 취득함
* 큐를 생성자 함수로 구현  
  ```js
  const Queue = (function () {
    function Queue(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`);
      }
      this.array = array;
    }
  
    Queue.prototype = {
      constructor: Queue, 
      // 큐의 가장 마지막에 데이터를 밀어 넣는다.
      enqueue(value) {
        return this.array.push(value);
      }, 
      // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
      dequeue() {
        return this.array.shift();
      }, 
      // 큐의 복사본 배열을 반환한다.
      entries() {
        return [...this.array];
      }
    };
    return Queue;
  }());
  
  const queue = new Queue([1, 2]);
  console.log(queue.entries()); // [1, 2]
  queue.enqueue(3);
  console.log(queue.entries()); // [1, 2, 3]
  queue.dequeue();
  console.log(queue.entries()); // [2, 3]
  ```
* 큐를 클래스로 구현
  ```js
  class Queue {
    #array; // private class member
    constructor(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array.`);
      }
      this.#array = array;
    }
    // 큐의 가장 마지막에 데이터를 밀어 넣는다.
    enqueue(value) {
      return this.#array.push(value);
    }
    // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
    dequeue() {
      return this.#array.shift();
    }
    // 큐의 복사본 배열을 반환한다.
    entries() {
      return [...this.#array];
    }
  }
  
  const queue = new Queue([1, 2]);
  console.log(queue.entries()); // [1, 2]
  queue.enqueue(3);
  console.log(queue.entries()); // [1, 2, 3]
  queue.dequeue();
  console.log(queue.entries()); // [2, 3]
  ```

### 8-7. Array.prototype.concat
* 인수로 전달된 값들(배열 또는 원시값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환
* 인수로 전달한 값이 배열인 경우 배열을 해체해 새로운 배열의 요소로 추가함
* 원본 배열을 변경되지 않음
* push와 unshift 메서드는 concat 메서드로 대체 가능
* concat 메서드는 ES6의 스프레드 문법으로 대체 가능   
  따라 push/unshift 메서드와 concat 메서드를 사용하는 대신   
  ES6 스프레드 문법을 일관성있게 사용하는 것을 권장함
```js
const arr1 = [1, 2];
const arr2 = [3, 4];
// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환함
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가힘
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환함
result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환함
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않음
console.log(arr1); // [1, 2]

// concat 메서드는 ES6의 스프레드 문법으로 대체 가능
let result = [1, 2].concat([3, 4]);
console.log(result); // [1, 2, 3, 4]
result = [...[1, 2], ...[3, 4]];
console.log(result); // [1, 2, 3, 4]
```

#### <push, unshift 메서드와 concat의 차이>
push와 unshift 메서드는 concat 메서드와 유사하게 동작하지만 미묘한 차이가 있음

* push와 unshift 메서드는 원본 배열을 직접 변경하지만   
  concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환함  
  따라 pop, unshift 메서드를 사용할 경우 반드시 원본 배열을 변수에 저장해두어야 하며  
  concat 메서드를 사용할 경우 반드시 반환을 변수에 할당받아야 함
  ```js
  const arr1 = [3, 4];
  // unshift 메서드는 원본 배열을 직접 변경함
  // 따라 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없음
  arr1.unshift(1, 2);
  // unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인 가능
  console.log(arr1); // [1, 2, 3, 4]
  
  // push 메서드는 원본 배열을 직접 변경함
  // 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없음
  arr1.push(5, 6);
  // push 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인 가능
  console.log(arr1); // [1, 2, 3, 4, 5, 6]
  
  // unshift와 push 메서드는 concat 메서드로 대체할 수 있음
  const arr2 = [3, 4];
  // concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환함
  // arr1.unshift(1, 2)를 다음과 같이 대체할 수 있음
  let result = [1, 2].concat(arr2);
  console.log(result); // [1, 2, 3, 4]
  // arr1.push(5, 6)를 다음과 같이 대체할 수 있음
  result = result.concat(5, 6);
  console.log(result); // [1, 2, 3, 4, 5, 6]
  ```
* 인수로 전달받은 값이 배열인 경우 push, unshift 메서드는   
  배열을 그대로 원본 배열의 마지막/첫 번째 요소로 추가하지만    
  concat 메서드는 인수로 전달받은 배열을 해체해 새로운 배열의 마지막 요소로 추가함
  ```js
  const arr = [3, 4];
  // unshift와 push 메서드는 인수로 전달받은 배열을 그대로 원본 배열의 요소로 추가함
  arr.unshift([1, 2]);
  arr.push([5, 6]);
  console.log(arr); // [[1, 2], 3, 4,[5, 6]]
  
  // concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 요소로 추가함
  let result = [1, 2].concat([3, 4]);
  result = result.concat([5, 6]);
  console.log(result); // [1, 2, 3, 4, 5, 6]
  ```

### 8-8. Array.prototype.splice
* 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메서드를 사용
* 3개의 매개변수가 있으며 원본 배열을 직접 변경함  
  * start :   
    * 원본 배열의 요소를 제거하기 시작할 인덱스  
    * start만 지정하면 원본 배열의 start부터 모든 요소를 제거함  
    * 음수인 경우 배열의 끝에서의 인덱스를 나타냄 (-1 : 마지막, -n : 마지막에서 n번째)
  * deleteCount :   
    * 제거할 요소의 개수 
    * 0인 경우 아무런 요소도 제거되지 않음 (option)
  * items :  
    * 제거한 위치에 삽입할 요소들의 목록  
    * 생략할 경우 원본 배열에서 요소들을 제거하기만 함 (option)
```js
const arr = [1, 2, 3, 4];
// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입
const result = arr.splice(1, 2, 20, 30);
// 제거한 요소가 배열로 반환됨
console.log(result); // [2, 3]
// splice 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1, 20, 30, 4]

const arr = [1, 2, 3, 4];
// 원본 배열의 인덱스 1부터 0개의 요소를 제거하고 그 자리에 새로운 요소 100을 삽입함
const result = arr.splice(1, 0, 100);
// 원본 배열이 변경됨
console.log(arr); // [1, 100, 2, 3, 4]
// 제거한 요소가 배열로 반환됨
console.log(result); // []

const arr = [1, 2, 3, 4];
// 원본 배열의 인덱스 1부터 2개의 요소를 제거함
const result = arr.splice(1, 2);
// 원본 배열이 변경됨
console.log(arr); // [1, 4]
// 제거한 요소가 배열로 반환됨
console.log(result); // [2, 3]

const arr = [1, 2, 3, 4];
// 원본 배열의 인덱스 1부터 모든 요소를 제거함
const result = arr.splice(1);
// 원본 배열이 변경됨
console.log(arr); // [1]
// 제거한 요소가 배열로 반환됨
console.log(result); // [2, 3, 4]
```

#### <배열에서 특정 요소 제거>
* 배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해   
  특정 요소의 인덱스를 취득한 다음 splice 메서드를 사용함
  ```js
  const arr = [1, 2, 3, 1, 2];
  
  // 배열 array에서 item 요소를 제거함. item 요소가 여러 개 존재하면 첫 번째 요소만 제거함
  function remove(array, item) {
    // 제거할 item 요소의 인덱스를 취득함
    const index = array.indexOf(item);
    // 제거할 item 요소가 있다면 제거
    if (index !== -1) array.splice(index, 1);
    return array;
  }
  
  console.log(remove(arr, 2)); // [1, 3, 1, 2]
  console.log(remove(arr, 10)); // [1, 3, 1, 2]
  ```
* filter 메서드를 사용해 특정 요소 제거 가능  
  특정 요소가 중복된 경우 모두 제거됨
  ```js
  const arr = [1, 2, 3, 1, 2];
  
  // 배열 array에서 모든 item 요소를 제거함
  function removeAll(array, item) {
    return array.filter(v => v !== item);
  }
  
  console.log(removeAll(arr, 2)); // [1, 3, 1]
  ```

### 8-9. Array.prototype.slice
* 인수로 전달된 범위의 요소들을 복사해 배열로 반환함
* 원본 배열은 변경되지 않음
* 두 개의 매개변수를 가짐  
  * start :   
    * 복사를 시작할 인덱스   
    * 음수인 경우 배열의 끝에서의 인덱스를 나타냄    
  * end :   
    * 복사를 종료할 인덱스  
    * 이 인덱스에 해당하는 요소는 복사되지 않음  
    * 생략 가능하며 생략 시 기본 값은 length 프로퍼티 값  
      따라 start부터 모든 요소를 복사해 배열로 반환함
* 메서드의 인수 모두 생략 시 원본 배열의 복사본을 생성해 반환함   
  이때 생성된 복사본은 얕은 복사를 통해 생성됨
```js
const arr = [1, 2, 3];
// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환함
arr.slice(0, 1); //[1]
// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환함
arr.slice(1, 2); //[2]
// 원본은 변경되지 않음
console.log(arr); //[1, 2, 3]

const arr = [1, 2, 3];
// arr[1]부터 이후의 모든 요소를 복사하여 반환함
arr.slice(1); //[2, 3]

const arr = [1, 2, 3];
// 배열의 끝에서부터 요소를 한 개 복사하여 반환함
arr.slice(-1); //[3]
// 배열의 끝에서부터 요소를 두 개 복사하여 반환함
arr.slice(-2); //[2, 3]

const arr = [1, 2, 3];
// 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환함
const copy = arr.slice();
console.log(copy); // [1, 2, 3]
console.log(copy === arr); // false
```
```js
const todos = [
  {id: 1, content: 'HTML', completed: false},
  {id: 2, content: 'CSS', completed: true},
  {id: 3, content: 'Javascript', completed: false}
];

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// _todos와 todos는 참조값이 다른 별개의 객체
console.log(_todos === todos); // false

// 배열 요소의 참조값이 같음. 즉, 얕은 복사됨
console.log(_todos[0] === todos[0]); // true
```

#### <얕은 복사와 깊은 복사>
객체를 프로퍼티 값으로 갖는 객체의 경우   
얕은 복사 : 한 단계까지만 복사  
깊은 복사 : 객체에 중첩되어 있는 객체까지 모두 복사  

slice 메서드, 스프레드 문법, Object.assign 메서든느 모두 얕은 복사를 수행함  
깊은 복사를 위해서는 Lodash 라이브러리의 cloneDeep 메서드 사용을 추천함

####  <slice 메서드를 사용해 유사 배열 객체를 배열로 변환>
* slice 메서드를 사용해 arguments, HTMLCollection, NodeList 같은   
  유사 배열 객체를 배열로 변환 가능  
  ```js
  function sum() { 
    // 유사 배열 객체를 배열로 변환(ES5)
    var arr = Array.prototype.slice.call(arguments);
    console.log(arr); // [1, 2, 3]
    
    return arr.reduce(function (pre, cur) {
      return pre + cur;
    }, 0);
  }
  
  console.log(sum(1, 2, 3)); // 6
  ```
* Array.from 메서드 사용 시 더욱 간단하게 유사 배열 객체를 배열로 변환 가능함  
  (Array.from 메서드는 유사 배열 객체 또는 이터러블 객체로 변환함)  
  ```js
  function sum() {
    const arr = Array.from(arguments);
    console.log(arr); // [1, 2, 3]
    return arr.reduce((pre, cur) => pre + cur, 0);
  }
  
  console.log(sum(1, 2, 3)); // 6
  ```
* arguments 객체는 유사 배열 객체이면서 이터러블 객체  
  이터러블 객체는 ES6의 스프레드 문법을 사용해 간단하게 배열로 변환 가능함
  ```js
  function sum() {
    // 이터러블을 배열로 변환(ES6 스프레드 문법)
    const arr = [...arguments];
    console.log(arr); // [1, 2, 3]
    return arr.reduce((pre, cur) => pre + cur, 0);
  }
  
  console.log(sum(1, 2, 3)); // 6
  ```

### 8-10. Array.prototype.join
* 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 문자열(구분자)로 연결한 문자열을 반환함  
* 구분자는 생략 가능하며 기본 구분자는 콤마
```js
const arr = [1, 2, 3, 4];

// 기본 구분자는 콤마
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후 기본 구분자로 연결한 문자열을 반환함
arr.join(); //'1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈 문자열로 연결한 문자열을 반환함
arr.join(''); //'1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후 구분자 ':'로 연결한 문자열을 반환함
arr.join(':'); //'1:2:3:4'
```

### 8-11. Array.prototype.reverse
* 원본 배열 순서를 반대로 뒤집음
* 원본 배열이 변경됨
* 반환값은 변경된 배열
```js
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메서드는 원본 배열을 직접 변경함
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열
console.log(result); // [3, 2, 1]
```

### 8-12. Array.prototype.fill
* ES6에서 도입
* 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채움
* 두번째 인수로 요소 채우기를 시작할 인덱스 전달 가능
* 세번째 인수로 요소 채우기를 멈출 인덱스 전달 가능 (해당 인덱스 전까지 채움)
* 원본 배열 변경됨
```js
const arr = [1, 2, 3];
// 인수로 전달받은 값 0을 배열의 처음부터 끝까지 요소로 채움
arr.fill(0);
// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]

const arr = [1, 2, 3];
// 인수로 전달받은 값 0을 배열의 인덱스 1부터 끝까지 요소로 채움
arr.fill(0, 1);
// fill 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1, 0, 0]

const arr = [1, 2, 3, 4, 5];
// 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채움
arr.fill(0, 1, 3);
// fill 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1, 0, 0, 4, 5]
```

#### <Array.from 메서드 사용해 배열 생성 시 특정 값으로 요소 채우기>
fill 메서드 사용 시 배열을 생성하면서 특정 값으로 요소를 채울 수 있음
```js
const arr = new Array(3);
console.log(arr); // [empty × 3]

// 인수로 전달받은 값 1을 배열의 처음부터 끝까지 요소로 채움
const result = arr.fill(1);
// fill 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1, 1, 1]
// fill 메서드는 변경된 원본 배열을 반환함
console.log(result); // [1, 1, 1]
```

fill 메서드로 요소를 채울 경우 모든 요소를 하나의 값으로 채울 수 밖에 없는 단점이 있는데  
Array.from 메서드를 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 요소값을 만들면서 배열을 채울 수 있음  
```js
// 인수로 전달받은 정수만큼 요소를 생성하고 0부터 1씩 증가하면서 요소를 채움
const sequences = (length = 0) => Array.from({length}, (_, i) => i);
// const sequences = (length = 0) => Array.from(new Array(length), (_, i) => i);
console.log(sequences(3)); // [0, 1, 2]
```
Array.from 메서드는 두 번째 인수로 전달한 콜백 함수에   
첫 번째 인수에 의해 생성된 배열의 요소 값과 인덱스를 순차적으로 전달하면서 호출하고,  
콜백 함수의 반환 값으로 구성된 배열을 만듬

### 8-13. Array.prototype.includes
* ES7에서 도입됨
* 배열 내에 특정 요소가 포함되어 있는지 확인해 ture/false를 반환함
* 첫 번째 인수로 검색할 대상을 지정
* 두 번째 인수로 검색을 시작할 인덱스를 지정   
  생략할 경우 기본값 0이 설정됨   
  음수 전달 시 length 프로퍼티 값과 음수 인덱스를 합산해 검색 시작 인덱스를 설정함
```js
const arr = [1, 2, 3];
// 배열에 요소 2가 포함되어 있는지 확인
arr.includes(2); //true
// 배열에 요소 100이 포함되어 있는지 확인
arr.includes(100); //false

const arr = [1, 2, 3];
// 배열에 요소 1이 포함되어 있는지 인덱스 1부터 확인
arr.includes(1, 1); //false
// 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인
arr.includes(3, -1); //true
```

배열에서 인수로 전달된 요소를 검색해 인덱스를 반환하는 indexOf 메서드를 사용해도 되지만  
indexOf 메서드를 사용하면 반환값이 -1인지 확인해야 하고 배열에 NaN이 포함되어 있는지를 확인할 수 업음
```js
[NaN].indexOf(NaN) !== -1; //false
[NaN].includes(NaN); //true
```

### 8-14. Array.prototype.flat
* ES10에서 도입됨
* 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화함
* 중첩 배열을 인수로 전달 가능함   
* 인수를 생략할 경우 기본값은 1
* 인수로 Infinity 전달 시 중첩 배열 모두를 평탄화 함
```js
[1, [2, 3, 4, 5]].flat(); //[1, 2, 3, 4, 5]

// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1
[1, [2, [3, [4]]]].flat(); //[1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(1); //[1, 2, [3, [4]]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화
[1, [2, [3, [4]]]].flat(2); //[1, 2, 3, [4]]
// 2번 평탄화한 것과 동일함
[1, [2, [3, [4]]]].flat().flat(); //[1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화
[1, [2, [3, [4]]]].flat(Infinity); //[1, 2, 3, 4]
```


## 9. 배열 고차 함수
* 고차 함수  
  * 함수를 인수로 전달받거나 함수를 반환하는 함수  
  * 외부 상태의 변경이나 가변 상태를 피하고 불변성을 지향하는 함수 프로그래밍에 기반을 둠
  * 자바스크립트는 고차 함수를 다수 지원함 (특히 배열)
  
* 함수형 프로그래밍과 고차 함수  
  함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거해  
  복잡성을 해결하고 변수의 사용을 억제해 상태 변경을 피하려는 프로그래밍 패러다임  
  
  조건문과 반복문은 로직의 흐름을 이해하기 어렵게 해 가독성을 해치고,  
  변수는 누군가에 의해 언제든 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있기 때문  
  
  함수형 프로그래밍은 결국 순수 함수를 통해 부수 효과를 최대한 억제해   
  오류를 피하고 프로그램의 안정성을 높이려는 노력의 일환

### 9-1. Array.prototype.sort
* 배열의 요소를 정렬함
* 원본 배열을 직접 변경하며 정렬된 배열을 반환함
* 기본적으로 오름차순으로 요소를 정렬함 (한글도)   
  내림차순으로 정렬하려면 sort 메서드를 사용해 오름차순으로 정렬 후 reverse 메서드를 사용해 순서를 뒤집음
  ```js
  const fruits = ['Banana', 'Orange', 'Apple'];
  fruits.sort();
  console.log(fruits); // ['Apple', 'Banana', 'Orange']
  
  const fruits = ['바나나', '오렌지', '사과'];
  fruits.sort();
  console.log(fruits); // ['바나나', '사과', '오렌지']
  ```
* 숫자로 이루어진 배열을 정렬할 때는 주의가 필요함    
  sort 메서드의 기본 정렬 순서는 유니코드 코드 포인트의 순서를 따름  
  배열 요소가 숫자 타입이어도 일시적으로 문자열로 변환 후 유니코드 코드 포인트의 순서를 기준으로 정렬함    
  ```js
  const points = [40, 100, 1, 5, 2, 25, 10];
  points.sort();
  // 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
  console.log(points); // [1, 10, 100, 2, 25, 40, 5]
  
  // 배열 요소를 일시적으로 문자열로 변환 후 정렬함
  ['2', '1'].sort(); // ["1", "2"]
  [2, 1].sort(); // [1, 2]
  
  // 문자열 '10'의 유니코드 코드 포인트 : U+0031U+0030
  // 문자열 '2'의 유니코드 코드 포인트 : U+0032
  ['2', '10'].sort(); //  ["10", "2"]
  [2, 10].sort(); //  [10, 2]
  ```
  따라 숫자 요소 정렬 시에는 sort 메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 함  
  비교 함수는 양수나 음수 또는 0을 반환해야 함  
  비교 함수의 반환값이 0보다 작으면 비교 함수의 첫번째 인수를 우선해 정렬.  
  0이면 정렬하지 않으며, 0보다 크면 두 번째 인수를 우선해 정렬함
  ```js
  const points = [40, 100, 1, 5, 2, 25, 10];
  
  // 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬함
  points.sort((a, b) => a - b);
  console.log(points); // [1, 2, 5, 10, 25, 40, 100]
  
  // 숫자 배열에서 최소/최대값 취득
  console.log(points[0], points[points.length - 1]); // 1 100
  
  // 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬함
  points.sort((a, b) => b - a);
  console.log(points); // [100, 40, 25, 10, 5, 2, 1]
  
  // 숫자 배열에서 최소/최대값 취득
  console.log(points[points.length - 1], points[0]); // 1 100
  ```
* 객체를 요소로 갖는 배열을 정렬하는 예제  
  ```js
  const todos = [
    {id: 4, content: 'JavaScript'},
    {id: 1, content: 'HTML'},
    {id: 2, content: 'CSS'}
  ];
  
  // 비교 함수. 매개변수 key는 프로퍼티 키다.
  function compare(key) {
  // 프로퍼티 값이 문자열인 경우 - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
  // 비교 함수는 양수/음수/0을 반환하면 되므로 - 산술 연산 대신 비교 연산을 사용할 수 있다.
    return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
  }
  
  // id를 기준으로 오름차순 정렬
  todos.sort(compare('id'));
  console.log(todos);
  /*
  [
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
  ]
  */
  // content를 기준으로 오름차순 정렬
  todos.sort(compare('content'));
  console.log(todos);
  /*
  [
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
  ]
  */
  ```
  
#### <sort 메서드의 정렬 알고리즘>
* quicksort 알고리즘을 사용함
* quicksort : 동일한 값의 요소가 중복되어 있을 때 초기 순서와 변경될 수 있는 불안정한 정렬 알고리즘   
* ES10에서는 timesort 알고리즘을 사용하도록 바뀜

### 9-2. Array.prototype.forEach
* for 문을 대체할 수 있는 고차 함수
* 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해   
  자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출함
  ```js
  const numbers = [1, 2, 3];
  const pows = [];
  // forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
  numbers.forEach(item => pows.push(item ** 2));
  console.log(pows); // [1, 4, 9]
  ```
* forEach 메서드는 콜백 함수 호출 시 3개의 인수를 순차적으로 전달함  
  * forEach 메서드를 호출한 배열의 요소값과 인덱스  
  * forEach 메서드를 호출한 배열(this)
  ```js
  
  // forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
  [1, 2, 3].forEach((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
  });
  /*
  요소값: 1, 인덱스: 0, this: [1,2,3]
  요소값: 2, 인덱스: 1, this: [1,2,3]
  요소값: 3, 인덱스: 2, this: [1,2,3]
  */
  ```
* forEach 메서드는 원본 배열을 변경하지 않음  
  하지만 콜백 함수를 통해 원본 배열을 변경할 수 있음  
  ```js
  const numbers = [1, 2, 3];
  // forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
  // 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
  // 따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
  numbers.forEach((item, index, arr) => {
    arr[index] = item ** 2;
  });
  console.log(numbers); // [1, 4, 9]
  ```
* forEach 메서드의 반환값은 언제나 undefined
  ```js
  const result = [1, 2, 3].forEach(console.log);
  console.log(result); // undefined
  ```
* forEach 메서드의 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체 전달 가능
  ```js
  class Numbers {
    numberArray = [];
  
    multiply(arr) {
      arr.forEach(function (item) {
        // TypeError
        this.numberArray.push(item * item);
      });
    }
  }
  
  const numbers = new Numbers();
  numbers.multiply([1, 2, 3]);
  ```  
  forEach 메서드의 콜백 함수는 일반 함수로 호출되므로 콜백 함수 내부의 this는 undefined를 가리킴  
  (class 내부에는 암묵적으로 strict 모드가 적용되기 떄문에 전역 객체가 아닌 undefined 가리킴)   
  forEach 메서드의 콜백 함수 내부의 this와 multiply 메서드 내부의 this를 일치시키려면  
  forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달  
  아래 코드는 두 번째 인수로 multiply 메서드 내부의 this를 전달함
  ```js
  class Numbers {
    numberArray = [];
  
    multiply(arr) {
      arr.forEach(function (item) {
        this.numberArray.push(item * item);
      }, this); // forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
    }
  }
  
  const numbers = new Numbers();
  numbers.multiply([1, 2, 3]);
  console.log(numbers.numberArray); // [1, 4, 9]
  ```  
  가장 나은 방법은 ES6의 화살표 함수를 사용하는 것  
  화살표 함수는 함수 자체의 this 바인딩을 갖지 않아 상위 스코프의 this를 그대로 참조함
  ```js
  class Numbers {
    numberArray = [];
  
    multiply(arr) {
      // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
      arr.forEach(item => this.numberArray.push(item * item));
    }
  }
  
  const numbers = new Numbers();
  numbers.multiply([1, 2, 3]);
  console.log(numbers.numberArray); // [1, 4, 9]
  ```
* forEach 메서드의 폴리필  
  * forEach 동작을 이해하기 위해 폴리필 구현
  * 폴리필 : 최신 사양 기능을 지원하지 않는 브라우저를 위해 누락된 최신 사양의 기능을 구현해 추가해주는 것  
  ```js
  // 만약 Array.prototype에 forEach 메서드가 존재하지 않으면 폴리필을 추가한다.
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      // 첫 번째 인수가 함수가 아니면 TypeError를 발생시킨다.
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      
      // this로 사용할 두 번째 인수를 전달받지 못하면 전역 객체를 this로 사용한다.
      thisArg = thisArg || window;
      
      // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
      for (var i = 0; i < this.length; i++) {
        // call 메서드를 통해 thisArg를 전달하면서 콜백 함수를 호출한다.
        // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  ```   
  이처럼 forEach 메서드도 내부에서는 반복문을 통해 배열을 순회할 수밖에 없음   
  단, 반복문을 메서드 내부로 은닉해 로직의 흐름을 이해하기 쉽게 하고 복잡성을 해결함  
* forEach 메서드는 for문과 달리 break, continue 문 사용 불가능  
  즉, 배열의 모든 요소를 빠짐없이 모두 순회하며 중간에 순회를 중단할 수 없음
  ```js
  [1, 2, 3].forEach(item => {
    console.log(item);
    if (item > 1) break; // SyntaxError
  });
  [1, 2, 3].forEach(item => {
    console.log(item);
    if (item > 1) continue; 
    // SyntaxError
  });
  ```
* 희소 배열의 경우 존재하지 않는 요소는 순회 대상에서 제외됨  
  이는 배열을 순회하는 map, filter, reduce 메서드 등에서도 마찬가지
  ````js
  // 희소 배열
  const arr = [1, , 3];
  // for 문으로 희소 배열을 순회
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1, undefined, 3
  }
  // forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
  arr.forEach(v => console.log(v)); // 1, 3
  ````
* forEach 메서드는 for 문에 비해 성능이 좋지는 않지만 가독성은 더 좋음  
  따라 요소가 많은 배열을 순회하거나 시간이 많이 걸리는 복잡한 코드   
  또는 높은 성능이 필요한 경우가 아니라면 for문 대신 forEach 메서드 사용을 권장함

#### <JSON.stringify 메서드>  
* 객체를 JSON 포맷의 문자열로 변환함 

### 9-3. Array.prototype.map
* 자신을 호출한 배열의 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출함   
  그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환함
  
* 원본 배열은 변경되지 않음
  ```js
  const numbers = [1, 4, 9];
  
  // map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
  // 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
  const roots = numbers.map(item => Math.sqrt(item));
  
  // 위 코드는 다음과 같다.
  // const roots = numbers.map(Math.sqrt);
  
  // map 메서드는 새로운 배열을 반환한다.
  console.log(roots); // [ 1, 2, 3 ]
  // map 메서드는 원본 배열을 변경하지 않는다.
  console.log(numbers); // [ 1, 4, 9 ]
  ```
  
* forEach 메서드와 map 메서드의 공통점은 자신을 호출한 배열의 모든 요소를 순회하며   
  인수로 전달받은 콜백 함수를 반복 호출한다는 것  
  하지만 forEach 메서드는 언제나 undefined를 반환하고, map 메서드는 콜백 함수의  
  반환값들로 구성된 새로운 배열을 반환하는 차이가 있음  
  
  forEach 메서드 : 단순히 반복문을 대체하기 위한 고차 함수  
  map 메서드 : 요소 값을 다른 값으로 매핑한 새로운 배열을 생성하기 위한 고차 함수
  
* map 메서드가 생성해 반환하는 새로운 배열의 length 프로퍼티 값은   
  map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치함  
  즉, map 메서드를 호출한 배열과 map 메서드가 생성해 반환한 배열은 1:1 매핑함
  
* map 메서드는 콜백 함수 호출 시 3개의 인수를 순차적으로 전달함  
  map 메서드를 호출한 배열의 요소값과 인덱스  
  map 메서드를 호출한 배열(this) 
  ```js
  // map 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
  [1, 2, 3].map((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
    return item;
  });
  /*
  요소값: 1, 인덱스: 0, this: [1,2,3]
  요소값: 2, 인덱스: 1, this: [1,2,3]
  요소값: 3, 인덱스: 2, this: [1,2,3]
  */
  ```
* 두 번째 인수로 map 메서드의 콜백 함수 내부에서 this로 사용할 객체 전달 가능
  ```js
  class Prefixer {
    constructor(prefix) {
      this.prefix = prefix;
    }
  
    add(arr) {
      return arr.map(function (item) {
        // 외부에서 this를 전달하지 않으면 this는 undefined를 가리킨다.
        return this.prefix + item;
      }, this); // map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
    }
  }
  
  const prefixer = new Prefixer('-webkit-');
  console.log(prefixer.add(['transition', 'user-select']));
  // ['-webkit-transition', '-webkit-user-select']
  ```  
  더 나은 방법은 ES6의 화살표 함수를 사용하는 것
  ```js
  class Prefixer {
    constructor(prefix) {
      this.prefix = prefix;
    }
  
    add(arr) {
      // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
      return arr.map(item => this.prefix + item);
    }
  }
  
  const prefixer = new Prefixer('-webkit-');
  console.log(prefixer.add(['transition', 'user-select']));
  // ['-webkit-transition', '-webkit-user-select']
  ```

### 9-4. Array.prototype.filter
* 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출함   
  그리고 콜백 함수의 반환값이 true인 요소들로만 구성된 새로운 배열을 반환함   
  이때 원본 배열은 변경되지 않음
  ```js
  const numbers = [1, 2, 3, 4, 5];
  
  // filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
  // 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
  // 다음의 경우 numbers 배열에서 홀수인 요소만 필터링한다(1은 true로 평가된다).
  const odds = numbers.filter(item => item % 2);
  console.log(odds); // [1, 3, 5]
  ```
  
* 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소만 추출해 새로운 배열을 만들고 싶을 떄 사용함  

* filter 메서드가 생성해서 반환한 새로운 배열의 length 프로퍼티 값은   
  filter 메서드를 호출한 배열의 length 프로퍼티 값과 같거나 작음

* filter 메서드는 콜백 함수 호출 시 3개의 인수   
  (filter 메서드를 호출한 배열의 요소값과 인덱스, filter 메서드를 호출한 배열-this)를 순차적으로 전달함
  ```js
  // filter 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
  [1, 2, 3].filter((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
    return item % 2;
  });
  /*
  요소값: 1, 인덱스: 0, this: [1,2,3]
  요소값: 2, 인덱스: 1, this: [1,2,3]
  요소값: 3, 인덱스: 2, this: [1,2,3]
  */
  ```
  
* filter 함수의 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체 전달 가능   
  (map 메서드와 마찬가지로 화살표 함수 사용이 더 나은 방법)  
  
* filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있음    
  filter 메서드 사용해 특정 요소 제거할 경우 특정 요소가 중복되어 있다면 중복된 요소가 모두 제거됨   
  특정 요소 하나만 제거하려면 indexOf 메서드를 통해 특정 요소의 인덱스를 취득한 뒤 splice 메서드 사용
  ```js
  class Users {
    constructor() {
      this.users = [
        {id: 1, name: 'Lee'},
        {id: 2, name: 'Kim'}
      ];
    }
    
    // 요소 추출
    findById(id) {
      // id가 일치하는 사용자만 반환한다.
      return this.users.filter(user => user.id === id);
    }
    
    // 요소 제거
    remove(id) {
      // id가 일치하지 않는 사용자를 제거한다.
      this.users = this.users.filter(user => user.id !== id);
    }
  }
  
  const users = new Users();
  let user = users.findById(1);
  console.log(user); // [{ id: 1, name: 'Lee' }]
  // id가 1인 사용자를 제거한다.
  users.remove(1);
  user = users.findById(1);
  console.log(user); // []
  ```

### 9-5. Array.prototype.reduce
* 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출함  
  그리고 콜백 함수의 반환값을 다음 순회 시 콜백 함수의 첫번째 인수로 전달하면서   
  콜백 함수를 호출해 하나의 결과값을 만들어 반환함   
  원본 배열을 변경되지 않음
  
* 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값을 전달받음  
  콜백 함수에는 4개의 인수가 전달됨    
  * 초기값 또는 콜백 함수의 이전 반환값
  * reduce 메서드를 호출한 배열의 요소값과 인덱스
  * reduce 메서드를 호출한 배열(this)  
  ```js
  // 1부터 4까지 누적을 구한다.
  // 초기값과 배열의 첫 번째 요소값을 콜백 함수에게 인수로 전달하면서 호출
  // 다음 순회에는 콜백 함수의 반환값과 두 번째 요소값을 콜백 함수의 인수로 전달하면서 호출함
  const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator
          + currentValue, 0);
  console.log(sum); // 10
  ```

* 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야 하는 경우에 사용   
  
* 평균 구하기 
  ```js
  const values = [1, 2, 3, 4, 5, 6];
  const average = values.reduce((acc, cur, i, {length}) => {
  // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환한다.
    return i === length - 1 ? (acc + cur) / length : acc + cur;
  }, 0);
  console.log(average); // 3.5
  ```

* 최대값 구하기  
  최대값을 구할 때는 reduce 메서드보다 Math.max 메서드 사용이 더 직관적
  ```js
  const values = [1, 2, 3, 4, 5];
  const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
  console.log(max); // 5
  
  const values = [1, 2, 3, 4, 5];
  const max = Math.max(...values);
  // var max = Math.max.apply(null, values);
  console.log(max); // 5
  ```

* 요소의 중복 횟수 구하기
  ```js
  const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];
  const count = fruits.reduce((acc, cur) => {
  // 첫 번째 순회 시 acc는 초기값인 {}이고 cur은 첫 번째 요소인 'banana'다.
  // 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로 할당한다.
  // 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화한다.
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  
  // 콜백 함수는 총 5번 호출되고 다음과 같이 결과값을 반환한다.
  /*
  {banana: 1} => {banana: 1, apple: 1} => {banana: 1, apple: 1, orange: 1}
  => {banana: 1, apple: 1, orange: 2} => {banana: 1, apple: 2, orange: 2}
  */
  
  console.log(count); // { banana: 1, apple: 2, orange: 2 }
  ```
  
* 중첩 배열 평탄화  
  중첩 배열 평탄시에는 reduce 메서드보다 ES10 Array.prototype.flat 메서드 사용이 더 직관적
  ```js
  const values = [1, [2, 3], 4, [5, 6]];
  const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
  // [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]
  console.log(flatten); // [1, 2, 3, 4, 5, 6]
  
  [1, [2, 3, 4, 5]].flat(); //  [1, 2, 3, 4, 5]
  // 인수 2는 중첩 배열을 평탄화하기 위한 깊이 값이다.
  [1, [2, 3, [4, 5]]].flat(2); //  [1, 2, 3, 4, 5]
  ```

* 중복 요소 제거  
  ```js
  const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
  const result = values.reduce((acc, cur, i, arr) => {
  // 순회 중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소다.
  // 이 요소만 초기값으로 전달받은 배열에 담아 반환한다.
  // 순회 중인 요소의 인덱스가 자신의 인덱스가 아니라면 중복된 요소다.
    if (arr.indexOf(cur) === i) acc.push(cur);
    return acc;
  }, []);
  console.log(result); // [1, 2, 3, 5, 4]
  ```
  중복 요소 제거 시에는 reduce 메서드보다 filter 메서드 사용이 더 직관적
  ```js
  const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
  // 순회 중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소다. 이 요소만 필터링한다.
  const result = values.filter((v, i, arr) => arr.indexOf(v) === i);
  console.log(result); // [1, 2, 3, 5, 4]
  ```
  또는 중복되지 않는 유일한 값들의 집합인 Set도 사용 가능  
  중복 요소 제거 시에는 이 방법을 추천 
  ```js
  const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
  // 중복을 허용하지 않는 Set 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다.
  const result = [...new Set(values)];
  console.log(result); // [1, 2, 3, 5, 4]
  ```
  
* 이처럼 map, filter, some, every, find 같은 모든 배열의 고차 함수는 reduce 메서드로 구현 가능

* reduce 메서드의 두 번째 인수로 전달하는 초기값은 첫 번째 순회에 콜백 함수의 첫 번째 인수로 전달됨  
  reduce 메서드의 두 번째 인수로 전달하는 초기값은 생략 가능    
  ```js
  // reduce 메서드의 두 번째 인수, 즉 초기값을 생략했다.
  const sum = [1, 2, 3, 4].reduce((acc, cur) => acc + cur);
  console.log(sum); // 10
  ```
  하지만 reduce 메서드 호출 시에는 언제나 초기값을 전달하는 것이 안전함
  ```js
  const sum = [].reduce((acc, cur) => acc + cur);
  // TypeError
  
  const sum = [].reduce((acc, cur) => acc + cur, 0);
  console.log(sum); // 0
  ```
```js
const products = [
  {id: 1, price: 100},
  {id: 2, price: 200},
  {id: 3, price: 300}
];
// 1번째 순회 시 acc는 { id: 1, price: 100 }, cur은 { id: 2, price: 200 }이고
// 2번째 순회 시 acc는 300, cur은 { id: 3, price: 300 }이다.
// 2번째 순회 시 acc에 함수에 객체가 아닌 숫자값이 전달된다. 이때 acc.price는 undefined다.
const priceSum = products.reduce((acc, cur) => acc.price + cur.price);
console.log(priceSum); // NaN

const products = [
  {id: 1, price: 100},
  {id: 2, price: 200},
  {id: 3, price: 300}
];
/*
1번째 순회 : acc => 0, cur => { id: 1, price: 100 }
2번째 순회 : acc => 100, cur => { id: 2, price: 200 }
3번째 순회 : acc => 300, cur => { id: 3, price: 300 }
*/
const priceSum = products.reduce((acc, cur) => acc + cur.price, 0);
console.log(priceSum); // 600
```

### 9-6. Array.prototype.some
* 자신을 호출한 배열의 요소를 순회하며 인수로 전달된 콜백 함수를 호출함   
  이때 some 메서드는 콜백 함수의 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false를 반환함  
  즉 배열의 요소 중 콜백 함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인해   
  그 결과를 불리언 타입으로 반환함   
  단, some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false 반환함
  
* some 메서드의 콜백 함수는 some 메서드를 호출한 요소값과 인덱스,   
  some 메서드를 호출한 배열(this)를 순차적으로 전달받을 수 있음
  
* some 메서드의 두번째 인수로 콜백 함수 내부에서 this로 사용할 객체 전달 가능   
  (화살표 함수 사용이 더 나은 방법)
  
```js
// 배열의 요소 중 10보다 큰 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item > 10); // true

// 배열의 요소 중 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item < 0); // false

// 배열의 요소 중 'banana'가 1개 이상 존재하는지 확인
['apple', 'banana', 'mango'].some(item => item === 'banana'); // true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some(item => item > 3); // false
```

### 9-7. Array.prototype.every
* 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출함  
  이때 콜백 함수의 반환값이 모두 참이면 true, 한 번이라도 거짓이면 flase를 반환함  
  즉 배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인해 결과를 불리언 값으로 반환  
  단, every 메서드를 호출한 배열이 빈 배열일 경우 언제나 true 반환
  
* every 메서드의 콜백 함수는 메서드를 호출한 요소값과 인덱스,   
  메서드를 호출한 배열(this)을 순차적으로 전달받을 수 있음

* every 메서드의 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체 전달 가능  
  (화살표 함수 사용이 더 나은 방법)

```js
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every(item => item > 3); // true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every(item => item > 3); // true
```

### 9-8. Array.prototype.find
* ES6에서 도입됨
  
* 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출해   
  반환값이 true인 첫번째 요소를 반환함.   
  콜백 함수의 반환값이 true인 요소가 존재하지 않을 시 undefined 반환
  
* find 메서드의 콜백 함수는 find 메서드를 호출한 요소값과 인덱스,   
  find 메서드를 호출한 배열(this)를 순차적으로 전달받을 수 있음
  
* filter 메서드는 콜백 함수의 호출 결과가 true인 요소만 추출한 새로운 배열을 반환함  
  따라 filter 메서드의 반환값은 언제나 배열   
  find 메서드는 콜백 함수의 반환값이 true인 첫 번째 요소를 반환함   
  find의 결과값은 배열이 아닌 해당 요소값
  
* find 메서드의 두 번째 인수로 콜백 함수 내부에서 this로 사용 가능한 객체 전달 가능   
  (더 나은 방법은 화살표 함수 사용)
  
```js
const users = [
  {id: 1, name: 'Lee'},
  {id: 2, name: 'Kim'},
  {id: 2, name: 'Choi'},
  {id: 3, name: 'Park'}
];
// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find(user => user.id === 2); // {id: 2, name: 'Kim'}

// filter 메서드는 배열을 반환한다.
[1, 2, 2, 3].filter(item => item === 2); // [2, 2]
// find 메서드는 요소를 반환한다.
[1, 2, 2, 3].find(item => item === 2); // 2
```

### 9-9. Array.prototype.findIndex
* ES6에서 도입됨
  
* 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출해   
  반환값이 true인 첫 번째 요소의 인덱스를 반환함.  
  콜백 함수의 반환값이 true인 요소가 존재하지 않을 경우 -1을 반환함
  
* findIndex 메서드의 콜백 함수는 findIndex 메서드를 호출한 요소값과 인덱스,  
  findIndex 메서드를 호출한 배열(this)를 순차적으로 전달받을 수 있음

* findIndex 메서드의 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체 전달 가능  
  (더 나은 방법은 화살표 함수 사용) 
  
```js
const users = [
  {id: 1, name: 'Lee'},
  {id: 2, name: 'Kim'},
  {id: 2, name: 'Choi'},
  {id: 3, name: 'Park'}
];
// id가 2인 요소의 인덱스를 구한다.
users.findIndex(user => user.id === 2); //  1
// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(user => user.name === 'Park'); //  3
// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
// key와 value를 기억하는 클로저를 반환
  return item => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate('id', 2)); //  1
// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate('name', 'Park')); //  3
```

### 9-10. Array.prototype.flatMap
* ES10에서 도입됨
  
* map 메서드를 통해 생성된 새로운 배열을 평탄화함  
  즉, map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있음
  
* 단, flatMap 메서드는 flat 메서드처럼 인수를 전달해   
  평탄화 깊이를 지정할 수는 없고 1단계만 평탄화함   
  map 메서드를 통해 생성된 중첩 배열의 평탄화 깊이를 지정해야 하면 flatMap 메서드 말고  
  map 메서드와 flat 메서드를 각각 호출함  
  
```js
const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']


const arr = ['hello', 'world'];

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```
