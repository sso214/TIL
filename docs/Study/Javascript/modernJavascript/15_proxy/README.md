---
title : 프록시  
date : 2021.08.31
---

# 프록시

## 프록시
> 프록시(proxy) 객체는 기본 작업 (ex. 속성 조회, 할당, 열거, 함수 호출 등)에 대해  
사용자 지정 동작을 추가로 정의하는데 사용됨


## 프록시 생성
```js
var x = new Proxy(target, handler);
```
* target : 객체, 함수, 다른 프록시 등 무엇이든 가능
* handler : 작업 수행 시 프록시의 동작을 정의하는 객체

```js
//원본 객체
const dog = {breed: "German Shephard", age:5};

//프록시 객체
const dogProxy = new Proxy(dog, {
    get(target, breed) { //호출 시 정상적인 실행 흐름에 끼어들어서 breed의 값을 대문자로 변경
        return target[breed].toUpperCase();
    },
    set(target, breed, value) { //새 값을 설정할 때도 다시 끼어들어 값을 설정하기 전 짧은 메세지 출력
        console.log('changing greed to...');
        target[breed] = value;
    },
});
console.log(dogProxy.breed); //"GERMAN SHEPHARD"
console.log(dogProxy.breed = "Labrador");
//changing greed to...
//"Labrador"
console.log(dogProxy.breed); //"LABRADOR:
```


## 프록시 활용
* 프록시는 데이터를 검증하는데 사용할 수 있음
```js
const validateAge = {
    set: function(object, property, value) {
        if (property === "age") {
            if (value < 18) {
                throw new Error ('you are too young!');
            }
            else {
                object[property] = value;
                return true;
            }
        }
    }
};
const user = new Proxy({}, validateAge);
user.age = 17; //Uncaught Error : you are too young!
user.age = 21; //21
//user 객체의 age 속성을 설정할 때마다 validateAge 함수가 실행되어 age 속성 값이 18보다 작은 경우 오류 발생시킴
```

<br>

프록시는 동일한 내용의 게터와 세터를 많은 속성에 적용해야 할 때 매우 유용  
(하나의 게터와 하나의 세터만 정의하면 되기 때문)  
* JS 코딩 관습에서 _ 기호는 프라이빗 속성 정의하는데 사용됨 (클래스 내부에서만 접근 가능한 속성)  
  또한 속성과 같은 이름으로 set 함수가 정의된 경우 무한루프 발생할 수 있으므로 속성 이름 앞에 _ 사용하면 유용함
```js
//프록시를 사용하지 않는 예시
const dog = {
    _name: 'pup', //프라이빗 속성
    _age: 7, //해당 함수에서 this.name를 사용했다간 세터를 다시 호출하므로 무한 루프 발생함
    
    get name(){
        console.log(this._name);
    },
    get age(){
        console.log(this._age);
    },
    set name(newName){
        this._name = newName;
        console.log(this._name);
    },
    set age(newAge) {
        this._age = newAge;
        console.log(this._age);
    },
};

dog.name; //pup
dog.age; //7
dog.greed; //undefined
dog.name = 'Max'; //Max
dog.age = 8; //8
```
```js
//프록시를 사용한 코드
const dog = {
    name: 'pup',
    age: 7,
};
const handler = { //하나의 게터와 세터로 모든 속성 처리 가능하게 handler를 만듬
    get: (target, property) => { //객체와 속성 두 인수를 받아 해당 객체에 해당 속성이 존재하는지 체크  
        property in target ? console.log(target[property]) : console.log('property not found');
    },
    set: (target, property, value) => { //속성을 새 값으로 설정하고 출력
        target[property] = value;
        console.log(target[property]);
    },
};
const dogProxy = new Proxy(dog, handler);
dogProxy.name; //pup
dogProxy.age; //7
dogProxy.name = 'Max'; //Max
dogProxy.age = 8; //8
dogProxy.breed; //property not found
```
프록시를 사용해 두 가지 달성  
* 더 짧고 깔끔한 코드
* 사용할 수 없는 속성에 접근할 시 사용자 지정 메세지 출력
