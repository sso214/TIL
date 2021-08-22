---
title : 함수 기본값 인수  
date : 2021.08.22
---

# 함수 기본값 인수

## 함수 인수의 기본값(ES6 이전)
* ES6 이전에는 함수 인수의 기본값을 설정하는 것이 어려웠음
```js
function getLocation(city, country, continent){
    if (typeof country === 'undefined') { // 이렇게 하나하나 설정해줘야했음
        country = 'South korea';
    }
    if (typeof continent === 'undefined') {
        continent = 'Asia';
    }
    console.log(continent, country, city);
}
getLocation('Leo'); // Asia South Korea Leo
getLocation(undefined, 'Paris', 'France'); // 순서에 맞추기 위해 undefined 값을 전달할 수밖에 없음
```

## 함수 기본값 인수
* destructuring(디스트럭처링) :   
  구조화된 배열 또는 객체를 Destructuring(비구조화, 파괴)하여 개별적인 변수에 할당하는 것  
```js
function calculatePrice(total, tax = 0.1, tip = 0.05) {
    return total + (total * tax) + (total * tip);
}
calculatePrice(100, undefined, 0.15); //undefined를 넣어야 함

---

// 함수의 인수를 객체로 만듬
function calculatePrice2({total = 0, tax = 0.1, tip = 0.05} = {}) {
    return total + (total * tax) + (total * tip);
}
const bill = calculatePrice2({tip: 0.15, total: 150});
// 함수 호출 시 매개변수가 주어진 키에 맞춰 입력되기 때문에 순서 신경쓸 필요 없음
// = {} 인수 객체를 기본적으로 빈 객체로 설정했기 때문에 함수에 매개변수를 어떻게 전달하든 상관없이 인수는 객체가 됨
calculatePrice2({}); //0 
calculatePrice2(); //0
calculatePrice2(undefined); //0

---

function calculatePrice3({total = 0, tax = 0.1, tip = 0.05}) {
    // {total = 0, tax = 0.1, tip = 0.05} = {} 
    // 인수 객체를 빈 객체로 기본 설정하지 않은 경우 매개변수 없이 함수 실행하면 오류 발생함
    return total + (total * tax) + (total * tip);
}
const bill = calculatePrice3({}); // cantor read property 'total' of 'undefined' or 'null';
const bill = calculatePrice3(); // cantor read property 'total' of 'undefined' or 'null';
const bill = calculatePrice3(undefined); // cantor read property 'total' of 'undefined' or 'null';
```
