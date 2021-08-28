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
* 기존 클래스로부터 상속된 새로운 클래스를 만들기 위해서는 extends 키워드 사용
```js
// 기존 클래스
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, my name is ${this.name}, and I'm ${this.age} years old`);
  }
}

class Adult extends Person { //Person의 모든 속성과 메소드 상속함
  constructor(name, age, work) {
    super(name, age); //새로운 클래스에서 this를 사용하기 전에 super()를 호출해야함
    //내부에서 super()호출 시 Person이 만들어짐
    //Adult 클래스는 Person으로부터 이름과 나이를 상속받기 떄문에 Person을 다시 선언하고 초기화할 필요 없음 (suepr() 생성자가 하는 일)
    this.work = work;
  }
}

const leo = new Adult('leo', 25, "frontend developer");
console.log(leo.age); //25
console.log(leo.work); //frontend developer
leo.greet(); //Hi, my name is leo, and I'm 25 years old
```


## 배열 확장하기
```js
class Classroom extends Array { //Array 상속
  // 레스트 연산자 이용해 가변 인수로 입력받은 학생들의 정보를 배열 형태로 students에 저장
  constructor(name, ...students) {
    // 스프레드 연산자 사용해 배열 원소들을 풀어헤쳐 생성자 호출
    // 스프레드 연산자를 사용하지 않으면 `학생들의 정보가 들어있는 배열`을 원소로 가진 Array가 생성됨
    super(...students);
    this.name = name;
  }

  add(student) {
    this.push(student);
  }
}

const myClass = new Classroom('1A',
        {name: 'Leo', mark: 2},
        {name: 'Max', mark: 3},
        {name: 'Jim', mark: 1},
        {name: 'Jon', mark: 5},
);
myClass.add({name: 'Mark', mark: 9});
myClass[4]; //{name: 'Mark', mark:9}

for (const student of myClass) {
  console.log(student);
  // {name:'Leo', mark:2}
  // {name:'Max', mark:3}
  // {name:'Jim', mark:1}
  // {name:'Jon', mark:5}
  // {name:'Mark', mark:9}
}
```
