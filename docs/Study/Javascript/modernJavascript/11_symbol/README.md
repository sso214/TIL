---
title : 심볼  
date : 2021.08.27
---

# 심볼
ES6에서 Symbol이라는 새로운 원시 자료형 추가

## 심볼의 고유성
* 심볼은 항상 고유하며 객체 속성의 식별자로 사용 가능함
* 심볼 생성
```js
const me = Symbol('leo');
console.log(me); //Symbol(leo)
```
* 심볼의 값이 겹치는 경우 두 심볼의 값은 동일하지만 각 심볼은 항상 고유하므로 다른 심볼가 겹치지 X
```js
// 겹치는 값을 가진 심볼을 생성하는 경우
const me = Symbol('leo');
console.log(me); //Symbol(leo)

const clone = Symbol('leo');
console.log(clone); //Symbol(leo)

console.log(me === clone); //false
console.log(me == clone); //false
```


## 객체 속성에 대한 식별자
* 심볼을 이용해 객체 속성에 대한 식별자 만들 수 있음
* 심볼은 열거 불가능. 객체 속성 배열을 얻기 위해서 `Object.getOwnPropertySumbols()` 사용함
```js
// 속성 이름이 겹치는 것을 피하기 위해 symbol을 사용할 수 있음
const office = {
    max: 'CEO',
    leo: 'CTO',
    leo: 'CIO'
};

for (person in office) {
    console.log(person); //max, leo
}

// Symbol 이용
const office = {
    [Symbol('max')]: 'CEO',
    [Symbol('leo')]: 'CTO',
    [Symbol('leo')]: 'CIO'
};
for (person in office) {
    console.log(person); //undefined
}
const symbols = Object.getOwnPropertySymbols(office);
console.log(symbols);
// 0: Symbol(max)
// 1: Symbol(leo)
// 2: Symbol(leo)
const value = symbols.map(symbol => office[symbol]);
console.log(value);
// 0: 'CEO'
// 1: 'CTO'
// 2: 'CIO'
```
