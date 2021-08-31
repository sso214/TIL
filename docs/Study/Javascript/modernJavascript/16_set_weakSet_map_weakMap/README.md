---
title : 세트, 위크셋, 맵, 위크맵  
date : 2021.08.31
---

# 세트, 위크셋, 맵, 위크맵

## 세트
세트(집합) : 어떤 자료형의 값이든 각 원소를 고유하게 저장하는 객체
```js
// 세트 생성
const family = new Set();

// 세트에 값 추가
family.add('Dad');
console.log(family); //Set {"Dad"}
family.add('Mom');
console.log(family); //Set {"Dad", "Mom"}
family.add('Son');
console.log(family); //Set {"Dad", "Mom", "Son"}
family.add('Dad'); //Dad를 다시 추가하려고 하지만 Set은 고유한 값만 가질 수 있기 때문에 동일하게 유지
console.log(family); //Set {"Dad", "Mom", "Son"}

family.size; //3
family.keys(); //SetIterator {"Dad", "Mom", "Son"} (Set에는 키가 없기 때문에 .values()와 같은 결과)
family.entries(); //SetIterator {"Dad", "Mom", "Son"}
family.values(); //SetIterator {"Dad", "Mom", "Son"}
family.delete('Dad');
family; //Set {"Mom", "Son"}
family.clear();
family; //Set{}
```

### Set에 대한 루프
.next()를 사용하거나 for of 루프를 사용하는 방법으로 Set에 대해 반복 가능
* values() 메서드는 제너레이터 함수와 비슷하게 next() 호출 가능한 iterator 객체를 반환
```js
//.next() 사용
const iterator = family.values();
iterator.next(); // {value: "Dad", done:false}
iterator.next(); // {value: "Mom", done:false}

//for of 루프 사용
for (const person of family) {
    console.log(person);
    //Dad
    //Mom
    //Son
}
```

### 배열에서 중복 제거하기
고유한 값만 보유 가능한 Set의 특징을 이용해 배열에서 중복 제거 가능
```js
const myArray = ["dad", "mom", "son", "dad", "mom", "daughter"];
const set = new Set(myArray); //고유한 원소만 포함됨
console.log(set); //Set{"dad", "mom", "son", "daughter"}

//Set을 Array로 변환
const uniqueArray = Array.from(set);
console.log(uniqueArray); //["dad", "mom", "son", "daughter"]
//위 코드와 같음
const uniqueArray = Array.from(new Set(myArray)); //["dad", "mom", "son", "daughter"]
```


## 위크셋
워크셋: 세트와 유사하지만 객체만 포함 가능
* WeakSet은 이터러블이 아님. for of 사용 불가
* WeakSet이 포함하는 객체가 가비지 컬렉터에 의해 삭제되면 해당 객체는 WeakSet 에서도 자동삭제 됨  
  (WeakSet, WeakMap은 가비지 컬렉터에 의해 포함된 원소들이 언제든 삭제될 수 있기 때문에 원소들에 대한 반복을 수행할 수 없도록 설계됨)
```js
let dad = {name: 'Daddy', age:50};
let mom = {name: 'Mommy', age:50};

const family = new WeakMap([dad, mom]);

//for of 사용 불가
for (const person of family) {
    console.log(person); //TypeError: family is not iterable
}

//가비지 컬렉터
dad = null; //null 후 얼마후 가비지 컬렉터 실행
console.log(family); //WeakSet{{...}, {...}}
//몇십초 기다린 후 실행
console.log(family); //WeakSet({...}) 침조가 손실되었기 떄문
```


## 맵
맵 : Set과 유사하지만 키/값 쌍으로 이루어짐
* Set은 for of 루프만 사용 가능한 반면, Map은 for of 루프와 forEach 함수 둘 다 사용 가능
```js
const family = new Map();
family.set('Dad', 50);
family.set('Mom', 50);
family.set('Son', 20);

family; //Map {"Dad" => 50, "Mom" => 50, "Son" => 20}
family.size; //3

family.forEach((val, key) => console.log(key, val));
// Dad 50
// Mom 50
// Son 20

for (const [key, val] of family) {
  console.log(key, val);
// Dad 50
// Mom 50
// Son 20
}
```


## 위크맵
위크맵 : 키/값 쌍의 모음이지만 키는 객체여야 함
* WeakSet과 유사하게 WeakMap에서도 키는 약하게 참조됨  
  (키로 사용된 객체의 참조가 손실되어 가비지 컬렉터에 의해 수집되면 WeakMap에서도 해당 키/값 쌍이 자동으로 제거됨)
* WeakMap은 열거 가능하지 않기 떄문에 원소에 반복 수행이 불가능
```js
let dad = {name: 'Daddy'};
let mom = {name: 'Mommy'};

const myMap = new Map();
const myWeakMap = new WeakMap();

myMap.set(dad, "any value");
myWeakMap.set(mom, "any value");

dad = null;
mom = null;

console.log(myMap); //Map {{...} => "any value"}
console.log(myWeakMap); //WeakMap {{...} => "any value"}

// 몇십 초 기다린 후 실행
console.log(myMap); //Map {{...} => "any value"}
console.log(myWeakMap); //WeakMap {}
```
