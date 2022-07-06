---
title : 11장. 원시 값과 객체의 비교   
date : 2022.05.19
---

# 11장. 원시 값과 객체의 비교
원시 타입과 객체 타입은 크게 3가지 측면에서 다름
|원시 값|객체|
|:--|:--|
|변경 **불가능**한 값|변경 **가능**한 값|
|변수에 할당 시 **실제 값**이 저장됨|변수에 할당 시 **참조값**이 저장됨|
|원시 값을 갖는 변수를 다른 변수에 할당 시 원본의 **원시 값이 복사**되어 전달됨 (=값에 의한 전달)|객체를 가르키는 변수를 다른 변수에 할당 시 **원본의 참조값이 복사**되어 전달됨 (=참조에 의한 전달)


## 1. 원시 값

### 1-1. 변경 불가능한 값
* **한번 생성된 원시 값은 읽기 전용 값으로서 변경 불가능**     
  **원시 값 자체가 변경 불가능**. 변수는 언제든 재할당을 통해 변수 값 교체 가능  
  상수도 재할당이 금지된 변수일 뿐 변경 불가능한 값과 동일시하면 안됨

* 원시 값은 **어떤 일이 있어도 불변**하기 때문에 데이터의 신뢰성 보장함  
  원시 값이 변경 가능한 값이면 재할당 시 값 자체를 변경하면 될텐데 그럴 수 없어서  
  **참조하던 메모리 공간의 주소가 변경**됨 (값의 이런 특성을 불변성이라고 함.)

* 불변성을 갖는 **원시 값을 할당한 변수는 재할당 외에는 변수 값을 변경할 수 있는 방법 없음**  
  만약 재할당 외 다른 방법으로 변경할 수 있다면 예기치 않게 변수 값이 변경될 수 있다는 의미.  
  이는 값의 변경, 즉 변경 상태를 추적하기 어렵게 만듬

#### <원시 값 할당한 변수에 재할당 과정>
1. 원시 값 할당한 변수에 새로운 원시 값 재할당
2. 새로운 메모리 공간 확보하고 재할당한 원시 값 저장
3. 변수는 새롭게 재할당한 원시 값을 가리킴 (변수가 참조하던 메모리 공간의 주소 바뀜)

### 1-2. 문자열과 불변성
* 문자열 = 0개의 이상의 문자로 이루어진 집합. 1개의 문자는 2바이트 메모리 공간에 저장됨  
  숫자는 길이에 상관없이 동일한 8바이트가 필요, 문자열의 경우 길이에 따라 필요한 메모리 공간의 크기가 결정됨
  
* 문자열은 변경 불가능한 값이기 때문에 **이미 생성된 문자열의 일부 문자를 변경해도 반영되지 않음**  
  (문자열은 유사 배열 객체면서 이터러블이므로 각 문자에 접근 가능함)  
  새로운 문자열 재할당은 기존 문자열 변경이 아니라 새로운 문자열을 새롭게 할당하는 것.  
  원시 값은 어떤 일이 있어도 불변하며 예기치 못한 변경으로부터 자유롭고 데이터의 신뢰성을 보장함 

```js
var str = 'string';
str[0] = 'S';
console.log(str); //'string'
```

> 유사 배열 객체 : 마치 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고 length 프로퍼티를 갖는 객체를 말함   
> 원시 값을 객체처럼 사용하면 원시 값을 감싸는 래퍼 객체로 자동 변환됨

### 1-3. 값에 의한 전달
변수에 '원시 값을 갖는 변수'를 할당 시 해당 변수에는 할당되는 변수의 원시 값이 복사되어 전달됨  
두 변수의 값은 서로 다른 메모리 공간에 저장된 **별개의 값**. 때문에 한 변수의 값을 변경해도 **서로 영향을 주지 않음**    
이를 값에 의한 전달(=공유에 의한 전달)이라고 함.   

사실 엄격하게 표현하면 값에 의한 전달도 사실은 값을 전달하는게 아니라 메모리 주소를 전달하는 것  
단, 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있음
```js
var score = 80;
var copy = score; //score 변수의 값이 복사되어 할당됨

console.log(score, copy); //80 80
console.log(score === copy); //true

score = 100;

console.log(score, copy); //100 80
console.log(score === copy); //false
```


## 2. 객체
**<자바스크립트 객체의 관리 방식>**  
자바스크립트 객체는 프로퍼티 키를 인덱스로 사용하는 해시 테이블이라고 생각할 수 있음  
클래스 없이 객체 생성이나 객체 생성 후에도 동적으로 프로퍼티와 메서드를 추가할 수 있어 사용하기 편리하지만  
이론적으로 성능 면에서는 클래스 기반 객체지향 프로그래밍 언어의 객체보다 비용이 더 많이 드는 비효율적인 방식  


따라 V8 자바스크립트 엔진에서는 프로퍼티에 접근하기 위해 동적 탐색 대신  
히든 클래스라는 방식을 사용해 C++ 객체의 프로퍼티에 접근하는 정도의 성능을 보장함  
(히든 클래스는 자바와 같이 고정된 객체 레이아웃(클래스)와 유사하게 동작함)

### 2-1. 변경 가능한 값
* 객체는 **변경 가능한 값**  
  원시 값 할당한 변수 참조 -> 메모리에 저장되어 있는 **원시 값**에 접근,   
  객체 할당한 변수 참조 -> 메모리에 저장되어 있는 **참조 값**을 통해 실제 객체에 접근  
  (참조 값 : 생성된 객체가 저장된 메모리 공간의 주소)  
  
  일반적으로 원시 값을 할당한 변수는 '변수는 ~값을 갖는다'로 표현하지만,  
  객체를 할당한 변수는 '변수는 객체를 참조하고 있다'라고 표현함

* 객체를 할당한 변수는 **재할당 없이 객체를 직접 변경**할 수 있음  
  즉, 재할당 없이 프로퍼티를 동적으로 추가/삭제할 수 있으며 값을 갱신할 수도 있음  
  
  원시 값을 갖는 변수 값을 변경하려면 재할당을 통해 메모리에 원시값을 새롭게 생성해야 하지만,  
  객체는 변경 가능한 값이므로 메모리에 저장된 객체를 직접 수정할 수 있음.  
  (재할당이 아니므로 참조값은 변경되지 않음)

* 객체는 **여러 개의 식별자가 하나의 객체를 공유**할 수 있음   
  객체를 변경할 때 원시 값처럼 이전 값을 복사해 새롭게 생성한다면 명확하고 신뢰성이 확보되겠지만  
  객체는 크기가 클 수도 있고 크기가 일정하지도 않으며, 프로퍼티 값이 객체일 수도 있어 복사/생성 비용이 많이 듬  
  즉, 메모리 효율적 소비가 어렵고 성능 나빠짐  

  따라 객체를 복사해 생성하는 비용을 절약하고 성능을 향상 시키기 위해 객체는 변경 가능한 값으로 설계되었음   
  (메모리 사용의 효율성과 성능을 위해 어느 정도 구조적인 단점을 감안한 설계)  
  이런 구조적 단점에 따른 부작용으로 여러 개의 식별자가 하나의 객체를 공유 가능함


#### 얕은 복사와 깊은 복사
객체를 프로퍼티 값으로 갖는 객체의 경우  
* 얕은 복사 : 한 단계까지만 복사   
* 깊은 복사 : 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말함
```js
const o = { x: { y: 1 } };

// 얕은 복사
const c1 = {  ...o };
console.log(c1 === o); //false
console.log(c1.x === o.x); //true


// lodash의 cloneDeep을 사용한 깊은 복사
// npm install lodash로 lodash 설치 후 Node.js 환경에서 실행
const _=require('lodash');

// 깊은 복사
const c2 = _.cloneDeep(o);
console.log(c2 === o); //false
console.log(c2.x === o.x); //false
```
얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체. (원본과 복사본은 참조값이 다른 별개의 객체)  
얕은 복사는 객체에 중첩되어 있는 객체의 경우 참조 값을 복사하고   
깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사해 원시 값처럼 완전한 복사본을 만드는 차이가 있음

참고로 아래와 같이 원시 값을 할당한 변수를 다른 변수에 할당하는 것을 깊은 복사,   
객체를 할당한 변수를 다른 변수에 할당하는 것을 얕은 복사라 부르는 경우도 있음
```js
//깊은 복사라고 부르기도 함
const v = 1;
const c1 = v;
console.log(c1 === v);  //true

//얕은 복사라고 부르기도 함
const o = {x:1};
const c2 = o;
console.log(c2 === o); //true
```

### 2-2. 참조에 의한 전달
객체를 가리키는 변수를 다른 변수에 할당하면 **원본의 참조 값이 복사되어 전달**됨 (=참조에 의한 전달)  
이때 원본과 사본에 저장된 메모리 주소는 다르지만 **동일한 참조 값을 가짐**  
(원본, 사본 모두 동일한 객체를 가리킨다는 뜻. 이건 두 개의 식별자가 하나의 객체를 공유한다는 것을 의미함)  
따라 어느 한쪽에서 객체를 변경(객체의 프로퍼티 값을 변경하그나 프로퍼티를 추가/삭제)하면 **서로 영향을 주고 받음**

```js
var person = {
    name: 'Leo',
};

//참조 값을 복사(얕은 복사). 둘은 동일한 참조 값을 가짐
var copy = person;

//copy와 person은 동일한 객체를 참조함
console.log(copy === person); //true

// copy를 통해 객체를 변경
copy.name = 'Park';
// person을 통해 객체 변경
person.age = 26;

// copy와 person은 동일한 객체를 가리킴으로 어느 한쪽에서 변경하면 서로 영향 주고 받음
console.log(copy); //{name:'Park', age:26}
console.log(person); //{name:'Park', age:26}
```

결국 값에 의한 전달과 참조에 의한 전달은 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일함  
다만 변수에 저장되어 있는 값이 원시 값이냐 참조 값이냐의 차이만 있을 뿐.  
따라 자바스크립트에는 참조에 의한 전달은 존재하지 않고 값에 의한 전달만이 존재한다고 말할 수 있음   
하지만 이런 동작 방식을 설명하는 정확한 용어가 존재하지 않아 값에 공유에 의한 전달이라고 표현하기도 함.  

```js
var person1 = {
    name: 'Leo'
};

var person2 = {
    name: 'Leo'
};

console.log(person1 === person2); //false
console.log(person1.name === person2.name); //true
```
* 객체 할당한 변수는 참조값을 가지고, 원시 값을 할당한 변수는 원시 값 자체를 가짐.  
  따라 ===일치 비교 연산자를 통해 객체 변수를 비교하면 참조 값을 비교, 원시 값 변수를 비교하면 원시 값을 비교함
* 객체 리터럴은 평가될 때마다 객체를 생성하므로 객체 내용이 같아도 다른 메모리에 저장된 별개의 객체.  
  즉 두 변수의 참조 값은 전혀 다른 값. 
* 하지만 프로퍼티 값을 참조하는 경우 값으로 평가될 수 있는 표현식임 (원시 값으로 평가됨)