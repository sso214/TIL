---
title : 클래스  
date : 2021.08.27
---

# 클래스
> 클래스는 일차적으로 자바스크립트의 기존 프로토타입 기반 상속에 대한 문법적 설탕이다.  
클래스 문법이 자바스크립트에 새로운 객체 지향 상속 모델을 도입하는 것은 아니다.

프로토타입 상속
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function(){
    // Person 프로토타입에 새 메서드 추가해 Person 객체의 인스턴스들이 접근 가능하게 만듬
    console.log('hello my name is ' + this.name);
}

const leo = new Person('leo', 24);
const max = new Person('max', 30);

leo.greet(); // hello my name is leo
max.greet(); // hello my name is max
```

## 클래스 생성
* 클래스 만드는 방법에는 두 가지 방법이 존재
    * 클래스 선언
    * 클래스 표현식
```js
// 클래스 선언
class Person {
    
}

// 클래스 표현식
const person = class Person {
    
};
```
* 클래스 선언 및 클래스 표현식은 호이스팅 되지 않음 (클래스 먼저 선언하지 않으면 ReferenceError 발생)
* 생성자 메서드를 추가한 것을 제외하면 프로토타입 방식과 큰 차이 없음  
  (클래스에 생성자 메서드가 두 개 이상 포함된 경우 SyntaxError 발생)  
  클래스는 프로토타입 방식을 대신하는 문법적 설탕일 뿐
```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old`);
    }
    farewell() {
        consle.log('goodbye friend');
    }
}

const leo = new Person('leo', 25);
leo.greet(); //Hi, my name is leo and I'm 25 years old
leo.farewell(); //goodbye friend
```


## 정적 메서드
앞의 예시에서 추가한 greet() 이나 farewell() 메서드는 Person 클래스의 모든 인스턴스에서 접근 가능.  
반면 Array.of() 처럼 클래스의 인스턴스가 아닌 클래스 자체에서 접근 가능한 정적 메서드는 아래처럼 정의 가능
```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static info(){
        console.log('I am a Person class, nice to meet you');
    }
}
const leo = new Person('leo', 25);
leo.info(); //TypeError: leo.info is not a funciton
Person.info(); //I am a Person Class, nice to meet you
```


## set과 get
setter와 getter 메서드를 사용해 클래스 내에 값을 설정하거나 가져올 수 있음
```js
class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
        this.nickname = '';
    }
    set nicknames(value) {
        this.nickname = value;
        console.log(this.nickname);
    }
    get nicknames(){
        console.log(`Your nickname is ${this.nickname}`);
    }
}
const leo = new Person('leo', 'park');

//setter 호출
leo.nicknames = 'sso214'; //sso214

//getter 호출
leo.nicknames; //Your nickname is sso214
```


## 클래스 상속하기


## 배열 확장하기
