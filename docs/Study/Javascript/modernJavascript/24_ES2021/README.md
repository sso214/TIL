---
title : 부록 - ES2021  
date : 2021.09.05
---

# 부록 - ES2021 
2015년 이후 자바스크립트는 매년 사양이 업데이트 되고 있음  
ES2021의 출시까지는 시간이 남았지만 이미 많은 기능이 4단계에 도달해 사양에 포함될 예정이므로 예측 가능함  

사양의 제안 과정은 4단께가 있으며, 4단계는 제안이 완료된 것으로 표시하는 마지막 단계.  
개발자에게 새로운 언어 사양에 대한 정보를 숙지하는 일은 매우 중요


## String.prototype.replaceAll()
replace()는 문자열의 패턴을 다른 것으로 바꿀 수 있는 메서드.  
하지만 정규식(RegEx)패턴이 아닌 단순 문자열 패턴을 사용할 때는 일치하는 첫번째 항목만 교체 가능함
```js
const str = "I like my dog, my dog loves me";
const newStr = str.replace('dog', 'cat');
console.log(newStr); //"I like my cat, my dog loves me"
```

replaceAll()은 RegEx를 사용하지 않고도 문자열 패턴을 대체할 때 일치하는 모든 패턴을 찾아내 교체함  
```js
const str = "I like my dog, my dog loves me";
const newStr = str.replaceAll('dog', 'cat');
console.log(newStr); //"I like my cat, my cat loves me"
```


## Promise.any()
* 주어진 프로미스 중 하나라도 성공하면 실행이 완료되지만 그렇지 않다면 모든 프로미스가 실패할 때까지 계속됨
* Promise.race()와 헷갈릴 수 있는데  
  Promise.race()는 주어진 프로미스 중 하나라동 성공하거나 실패하면 전체 프로미스의 실행이 완료됨    
  프로미스가 성공했을 때의 동작은 두 메서드가 비슷하지만 실패했을 떄의 동작은 매우 다름  
* Promise.any() 내부의 모든 프로미스가 실패할 시 모든 프로미스의 실패 이유가 포함된 AggregateError(Error의 하위 클래스)가 발생함
```js
Promise.any(promises).then((first) => {
    //프로미스 중 하나라도 완료된 경우
}, (error) => {
    //모든 프로미스가 실패한 경우
});
```


## 논리 연산자와 할당 표현식
* 루비 언어처럼 논리 연산자 (&&, ||, ??)와 할당 표현식(=)를 결합 가능함
```js
a ||= b; // a = a || b (a가 참이면 a반환, 거짓이면 b반환)
a &&= b; // a = a && b (a와 b가 둘 다 참이면 a반환, 그렇지 않으면 b반환)
a ??= b; // a = a ?? b (a가 null이거나 undefined인 경우 a반환, 그렇지 않으면 b반환)
```


## 숫자 구분 기호
큰 숫자의 자릿수 그룹을 구분하는데 _밑줄 문자를 사용해 숫자를 더 쉽게 읽을 수 있게 됨
```js
x = 100_000; //=100,000
dollar = 55_09; //=5590
fraction = 0.000_1; //1/10000
```


## 약한 참조
* 객체에 대한 약한 참조란 : 가비지 콜렉터에서 객체를 회수하는 것을 방지하지 않는 참조
* ES2021의 새로운 제안을 통해 WeakRef 클래스를 사용해 객체에 대한 약한 참조를 만들 수 있게 됨


## Intl.ListFormat
각종 언어별로 목록 서식을 활성화하는 객체의 생성자 (영어에 국한되지 않음)
```js
const list = ['Apple', 'Orange', 'Banana'];
new Intl.ListFormat('en-GB', {style:'long', type:'conjunction'}).format(list);
//Apple, Orange and Banana
new Intl.ListFormat('en-GB', {style:'short', type:'disjunction'}).format(list);
//Apple, Orange or Banana

new Intl.ListFormat('it', {style:'long', type:'conjunction'}).format(list);
//Apple, Orange e Banana (이탈리아어)
new Intl.ListFormat('es', {style:'long', type:'conjunction'}).format(list);
//Apple, Orange y Banana (스페인어)
new Intl.ListFormat('de', {style:'long', type:'conjunction'}).format(list);
//Apple, Orange und Banana (독일어)
```


## Intl.DataTimeFormat의 dateStyle 및 timeStyle 옵션
dateStyle과 timeStyle 옵션을 사용하면 시간대에 따른 날짜 및 시간 서식을 지정 가능함
* 원하는 시간대의 지역을 전달할 때 short, medium, long 세가지 옵션 중 원하는 서식에 맞는 것 선택 가능
* dateStyle과 timeStyle 옵션 동시 전달도 가능
```js
//dateStyle
new Intl.DateTimeFormat('en', {dateStyle:'short'}).format(Date.now()); 
// "9/5/21"
new Intl.DateTimeFormat('en', {dateStyle:'medium'}).format(Date.now()); 
// "Sep 5, 2021"
new Intl.DateTimeFormat('en', {dateStyle:'long'}).format(Date.now()); 
// "September 5, 2021"

//timeStyle
new Intl.DateTimeFormat('en', {timeStyle:'short'}).format(Date.now());
// "8:39 AM"
new Intl.DateTimeFormat('en', {timeStyle:'medium'}).format(Date.now());
// "8:40:00 AM"
new Intl.DateTimeFormat('en', {timeStyle:'long'}).format(Date.now());
// "8:40:20 AM GMT+9"
```
