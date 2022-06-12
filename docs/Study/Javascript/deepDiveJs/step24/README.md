---
title : 24장. 클로저
date : 2022.06.07
---

# 24장. 클로저

* 자바스크립트 고유의 개념이 아니라 함수형 프로그래밍 언어에서 사용되는 중요한 특성  
* 함수와 그 **함수가 선언된 렉시컬 환경**과의 조합
* 자바스크립트는 렉시컬 스코프를 따르는 프로그래밍 언어


## 1. 렉시컬 스코프 (정적 스코프)

* **자바스크립트 엔진은 함수를 어디에 정의했는지에 따라 상위 스코프를 결정함**  
  함수를 어디서 호출하는지는 함수의 상위 스코프 결정에 어떤 영향도 주지 않음  
  즉, 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않음

* **렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장할 참조 값(=상위 스코프에 대한 참조)은   
  함수 정의가 평가되는 시점에 함수가 정의된 위치에 의해 결정됨**   
  스코프의 실체 = 실행 컨텍스트의 렉시컬 환경     
  렉시컬 환경은 자신의 '외부 렉시컬 환경에 대한 참조'를 통해 상위 렉시컬 환경과 연결됨 (=스코프 체인)    
  (렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장할 참조 값 = 상위 렉시컬 환경에 대한 참조 = 상위 스코프)


## 2. 함수 객체의 내부 슬롯 [[Environment]]
* **함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경(=상위 스코프)의 참조를 저장함**  
  렉시컬 스코프가 가능하려면 함수는 자신이 정의된 환경을 기억해야 하기 때문에 함수 객체 생성 시   
  자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조(=현재 실행 중인 실행 컨텍스트의 렉시컬 환경)를   
  함수 객체 자신의 내부 슬롯 [[Environment]]에 저장함

* **상위 스코프  
  = 내부 슬롯 [[Environment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조   
  = 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장될 값**  

* **함수 객체는 자신이 존재하는 한 내부 슬롯 [[Environment]]에 저장한 상위 스코프를 기억함**

* **외부 렉시컬 환경에 대한 참조에는 함수 객체의   
  내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당됨**  
  이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체


## 3. 클로저와 렉시컬 환경
**외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명주기가 종료한   
외부 함수의 변수를 참조 가능함. 이런 중첩 함수를 클로저라고 부름**
```js
const x = 1;

function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

//outer 함수를 호출하면 중첩 함수 inner를 반환함  
//그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거됨
const innerFunc = outer();
innerFunc();
```

1. outer 함수가 평가되어 함수 객체 생성 시 현재 실행 중인 실행 컨텍스트의 렉시컬 환경 (전역 렉시컬 환경)을   
   outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로서 저장함
   
2. outer 함수 호출 시 outer 함수의 렉시컬 환경이 생성되고 앞서 outer 함수 객체의 [[Environment]]  
   내부 슬롯에 저장된 전역 렉시컬 환경을 outer 함수 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 할당함
   
3. 중첩 함수 inner가 평가됨 (inner 함수는 함수 표현식으로 정의했으므로 런타임에 평가됨)  
   중첩 함수 inner는 [[Environment]] 내부 슬롯에 현재 실행중인 실행 컨텍스트 렉시컬 환경  
   (outer 함수의 렉시컬 환경)을 상위 스코프로서 저장함
   
4. outer 함수의 실행이 종료하면 inner 함수를 반환하면서 outer 함수의 생명 주기가 종료되며     
   outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거됨  
   
   하지만 outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해   
   참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있기 때문에   
   가비지 컬렉션의 대상이 되지 않으므로 outer 함수의 렉시컬 환경은 소멸하지 않음
5. outer 함수가 반환한 inner 함수 호출 시 inenr 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸쉬됨  
   렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 inner 함수 객체의 [[Environment]] 내부 슬롯에   
   저장되어 있는 참조값이 할당됨
   
---

외부 함수보다 더 오래 생존한 중첩 함수는 외부 함수의 생존 여부(실행 컨텍스트의 생존 여부)와   
상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 기억함  
중첩 함수 내부에서 상위 스코프를 참조 가능하므로 상위 스코프의 식별자를 참조 가능하고 값을 변경할 수도 있음

자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저이지만  
일반적으로 모든 함수를 클로저라고는 하지 않음  

* **상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저가 아님**  
  상위 스코프의 어떤 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는   
  메모리 낭비를 막기 위해 최적화를 통해 상위 스코프를 기억하지 않음  
  
* **외부 함수보다 중첩 함수의 생명 주기가 짧은 경우 클로저가 아님**  
  중첩 함수가 외부 함수보다 일찍 소멸되기 때문에 생명 주기가 종료된 외부 함수의   
  식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않음
  
* **클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고   
  중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적**

* 클로저는 상위 스코프를 기억해야 하므로 불필요한 메모리의 점유를 걱정할 수 있지만  
  모던 자바스크립트 엔진은 최적화가 잘 되어 있어 클로저가 참조하지 않는 식별자는 기억하지 않음  
  즉, 상위 스코프의 식별자 중 기억해야 할 식별자만 기억함  
  
  **자유 변수** : 클로저에 의해 참조되는 상위 스코프의 변수  
  **클로저** : 자유변수에 묶여 있는 함수

클로저는 자바스크립트의 강력한 기능.   
필요한 상황에 적극적으로 이용하는 것을 권장함


## 4. 클로저의 활용
**클로저는 상태를 안전하게 변경하고 유지하기 위해 사용함**    
즉, 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고     
특정 함수에게만 상태 변경을 허용해 상태를 안전하게 변경하고 유지하기 위함

### 예제 1

#### 예제 1-1
```js
//카운트 상태 변수
let num = 0;

//카운트 상태 변경 함수
const increase = function () {
    //카운트 상태를 1만큼 증가시킴
    return ++num;
};

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```
해당 코드는 잘 동작하지만 바르게 동작하려면 아래 전제 조건이 지켜져야 하기 떄문에   
오류를 발생시킬 가능성을 안고 있음  
* 카운트 상태는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 함
* 이를 위해 카운트 상태는 increase 함수만이 변경할 수 있어야 함

#### 예제 1-2
카운트 상태를 안전하게 변경하고 유지하기 위해 increase 함수만이 num 변수를 참조하고 변경 가능하도록   
전역 변수 num을 increase 함수의 지역 변수를 바꾸어 의도치 않은 상태 변경을 방지함
```js
//카운트 상태 변경 함수
const increase = function () {
    //카운트 상태 변수
    let num = 0;

    //카운트 상태를 1만큼 증가시킴
    return ++num;
};

console.log(increase()); //1
console.log(increase()); //1
console.log(increase()); //1
```
하지만 increase 함수 호출 시마다 지역 변수는 다시 선언되고 0으로 초기화되기 떄문에  
상태가 변경되기 이전 상태를 유지하지 못함

#### 예제 1-3
이전 상태를 유지할 수 있도록 클로저를 사용
```js
//카운트 상태 변경 함수
const increase = (function () {
    //카운트 상태 변수
    let num = 0;

    //클로저
    return function () {
        //카운트 상태를 1만큼 증가시킴
        return ++num;
    };
}());

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```
* 코드 실행 시 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당됨    
  increase 변수에 할당된 함수는 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저
  
* 즉시 실행 함수는 호출된 이후 소멸하지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출됨  
  즉시 실행 함수가 반환한 클로저는 자유 변수 num을 참조하고 변경할 수 있음
  
* 즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일 없음   
  또한 num 변수는 외부에서 직접 접근 불가능한 은닉된 private 변수이므로   
  의도치 않은 변경을 걱정하지 않아도 되며 더 안정적인 프로그래밍이 가능함

### 예제 2
#### 예제 2-1 
```js
const counter = (function () {
    //카운트 상태 변수
    let num = 0;

    //클로저란 메서드를 갖는 객체를 반환함
    //객체 리터럴은 스코프를 만들지 않음
    //따라 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경
    return {
        //num: 0, //프로퍼티는 public하므로 은닉되지 않음
        increase() {
            return ++num;
        },
        decrease() {
            return num > 0 ? --num : 0;
        }
    };
}());

console.log(counter.increase()); //1
console.log(counter.increase()); //2
console.log(counter.decrease()); //1
console.log(counter.decrease()); //0
```
* 즉시 실행 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 됨  
  이때 객체의 메서드도 함수 객체로 생성됨  
  객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않음  
  
* increase, decrease 메서드의 상위 스코프는 해당 메서드가 평가되는 시점에 실행 중인   
  실행 컨텍스트(즉시 실행 함수 실행 컨텍스트)의 렉시컬 환경.  
  따라 increase, decrease 함수는 즉시 실행 함수의 스코프의 식별자를 참조 가능함

#### 예제 2-2
위 예제를 생성자 함수로 표현하면 아래와 같음
```js
const Counter = (function () {
    //카운트 상태 변수
    let num = 0;

    function Counter() {
        //this.num = 0; //프로퍼티는 public하므로 은닉되지 않음
    }

    Counter.prototype.increase = function () {
        return ++num;
    };

    Counter.prototype.decrease = function () {
        return num > 0 ? --num : 0;
    };

    return Counter;
}());

const counter = new Counter();
console.log(counter.increase()); //1
console.log(counter.increase()); //2
console.log(counter.decrease()); //1
console.log(counter.decrease()); //0
```
* num 변수는 생성자 함수가 생성할 인스턴스의 프로퍼티가 아닌 즉시 실행 함수 내에서 선언된 변수  
  해당 변수는 인스턴스를 통해 접근 불가능하며 즉시 실행 함수 외부에서도 접근 불가능한 은닉된 변수.  
  만약 num 변수가 생성자 함수가 생성할 인스턴스의 프로퍼티라면   
  인스턴스를 통해 외부에서 접근 가능한 public 프로퍼티가 됨   

* 생성자 함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성함  
  두 메서드는 모두 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저.  
  따라 프로토타입을 통해 상속되는 프로토타입 메서드라도 즉시 실행 함수의 자유 변수 num을 참조 가능함

이처럼 클로저는 외부 상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서   
부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 적극적으로 사용됨  

### 예제 3
다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제
```js
//함수를 인수로 전달받고 함수를 반환하는 고차 함수
//이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환함
function makeCounter(aux) {
    //카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;

    //클로저를 반환
    return function () {
        //인수로 전달받은 보조 함수에 상태 변경을 위임함
        counter = aux(counter);
        return counter;
    };
}

//보조 함수
function increase(n) {
    return ++n;
}
function decrease(n) {
    return --n;
}

//함수로 함수를 생성함
//makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환함
const increaser = makeCounter(increase);
console.log(increaser()); //1
console.log(increaser()); //2

//increaser 함수와는 별개로 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동되지 않음
const decreaser = makeCounter(decrease);
console.log(decreaser()); //-1
console.log(decreaser()); //-2
```
* makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수  
  makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인   
  makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저
  
* makeCounter 함수는 인자로 전달받은 보조 함수를 합성해 자신이 반환하는 함수의 동작을 변경할 수 있음   
  주의해야 할 것은 makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는   
  자신만의 독립된 렉시컬 환경을 갖는다는 것.   
  이는 함수 호출 시마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문 
  
* makeCounter 함수 호출 시 makeCounter 함수의 실행 컨텍스트가 생성됨  
  makeCounter 함수는 함수 객체를 생성해 반환한 후 소멸됨   
  makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며,  
  전역 변수인 increaser에 할당됨   
  이 때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은  
  makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸하지 않음  
  
* makeCounter 함수 호출 시 새로운 makeCounter 함수의 실행 컨텍스트가 실행되며   
  위의 과정과 똑같은 과정을 거쳐 전역 변수인 decreaser에 할당됨  

* 전역 변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에  
  카운트를 유지하기 위한 자유변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않음  
  따라 독립된 카운터가 아니라 연동해 증감이 가능한 카운터를 만들려면 렉시컬 환경을   
  공유하는 클로저를 만들어야 하며 이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 함

```js
//함수를 반환하는 고차 함수
//이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환함
const counter = (function () {
  //카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  //함수를 인수로 전달받는 클로저를 반환
  return function (aux) {
    //인수로 전달받은 보조 함수에 상태 변경을 위임함
    counter = aux(counter);
    return counter;
  };
}());


//보조 함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

//보조 함수를 전달해 호출
console.log(counter(increase)); //1
console.log(counter(increase)); //2
//자유 변수를 공유함
console.log(counter(decrease)); //1
console.log(counter(decrease)); //0
```


## 5. 캡슐화와 정보 은닉
* **캡슐화**   
  * 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 동작할 수 있는 동작인 메서드를 하나로 묶는 것  
  * 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 함 (=정보 은닉)
* **정보 은닉**
  * 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어   
    적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하는 것  
  * 객체 간의 상호 의존성(=결합도)를 낮추는 효과가 있음

대부분의 객체지향 프로그래밍 언어는 클래스를 정의하고 클래스를 구성하는 멤버(프로퍼티와 메서드)에 대해  
접근 제한자(public, private, protected)를 선언해 공개 범위를 한정할 수 있음  
public으로 선언된 프로퍼티와 메서드 : 클래스 외부에서 참조 가능   
private으로 선언된 프로퍼티와 메서드 : 클래스 외부에서 참조 불가능    

자바스크립트는 접근 제한자를 제공하지 않음   
따라 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있음 (public)

```js
function Person(name, age) {
  this.name = name; //public
  let _age = age; //private
  
  //인스턴스 메서드
  this.sayHi = function(){
      console.log(`Hi My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person('Leo', 20);
me.sayHi(); //Hi! My name is Leo. I am 20.
console.log(me.name); //Leo
console.log(me._age); //undefined
```
* 예제의 name 프로퍼티는 외부로 공개되어 있어 자유롭게 참조하거나 변경할 수 있음  
  (name 프로퍼티는 public함)  
* _age 변수는 Person 생성자 함수의 지역 변수이므로 Person 생성자 함수 외부에서 참조하거나 변경할 수 없음  
  (_age 변수 = private함)
  

위 예제의 sayHi 메서드는 인스턴스 메서드이므로 Person 객체가 생성될 때마다 중복 생성됨  
sayHi 메서드를 프로토타입 메서드로 변경해 sayHi 메서드의 중복 생성을 방지함
```js
function Person(name, age) {
  this.name = name; //public
  let _age = age; //private
}

Person.prototype.sayHi = function () {
  //Person 생성자 함수의 지역 변수 _age를 참조 불가능
  console.log(`Hi My name is ${this.name}. I am ${_age}.`);
}
```
Person.prototype.sayHi 메서드 내에서 Person 생성자 함수의 _age 지역 변수를 참조할 수 없는 문제 발생    
따라 즉시 실행 함수를 이용해 Person 생성자 함수와 Person.prototype.sayHi 메서드를 하나의 함수로 모음
```js
const Person = (function () {
  let _age = 0; //private

  //생성자 함수
  function Person(name, age) {
    this.name = name; //public
    _age = age;
  }
  
  //프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi My name is ${this.name}. I am ${_age}.`);
  };
  
  //생성자 함수를 반환
  return Person;
}());

const me = new Person('Leo', 20);
me.sayHi(); //Hi! My name is Leo. I am 20.
console.log(me.name); //Leo
console.log(me._age); //undefined
```
이렇게 사용하면 접근 제한자를 제공하지 않는 자바스크립트에서도 정보 은닉이 가능한 것처럼 보임  
즉시 실행 함수가 반환하는 Person 생성자 함수와 Person 생성자 함수의 인스턴스가 상속받아   
호출할 Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출되지만    
이미 종료되어 소멸한 즉시 실행 함수의 지역 변수 _age를 참조할 수 있는 클로저임

하지만 Person 생성자 함수가 여러개의 인스턴스를 생성할 경우 _age 변수의 상태가 유지되지 않는 문제가 생김
```js
const me = new Person('Leo', 20);
me.sayHi(); //Hi! My name is Leo. I am 20.

const you = new Person('Park', 23);
you.sayHi(); //Hi! My name is Park. I am 23.

//_age 변수 값이 변경됨
me.sayHi(); //Hi! My name is Leo. I am 23.
```
이는 Person.prototype.sayHi 메서드가 단 한번 생성되는 클로저이기 때문에 발생하는 현상  

Person.prototype.sayHi 메서드는 즉시 실행 함수가 호출될 때 생성됨  
이때 해당 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의   
렉시컬 환경의 참조를 [[Environment]]에 저장함  

따라 Person.prototype.sayHi 메서드는 어떤 인스턴스로 호출해도 하나의 동일한 상위 스코프를 사용하게 됨    
이런 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 _age 변수의 상태가 유지되지 않음  

이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않음  
인스턴스 메서드를 사용한다면 자유 변수를 통해 private를 흉내낼 수 있지만   
프로토타입 메서드를 사용하면 이마저도 불가능함  
ES6의 Symbol 또는 WeakMap을 사용해 private한 프로퍼티를 흉내낼 수 있으나 근본적인 해결책은 아님  

다행히 2021년 1월 TC39 프로세스의 stage 3에서 클래스에 private 필드를 정의할 수 있는   
새로운 표준 사양이 제안되어 있으며 표준 사양으로 승급이 확실한 이 제안은    
최신 브라우저(Chrome 74  이상)와 최신 Node.js(v12 이상)에 이미 구현되어 있음


## 6. 자주 발생하는 실수
아래는 클로저 사용 시 자주 발생할 수 있는 실수를 보여주는 예제
```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () { return i; };
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```
첫 번째 for 문의 코드 블록 내에서 함수가 funcs 배열의 요소로 추가됨   
두 번째 for 문의 코드 블록 내에서 funcs 배열의 요소로 추가된 함수를 순차적으로 호출함  
이때 funcs 배열의 요소로 추가된 3개의 함수가 0,1,2를 반환할 것으로 기대했지만 결과는 다름  

for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 함수 레벨 스코프를 갖기 때문에 전역 변수임    
전역 변수 i에는 0,1,2가 순차적으로 할당됨  
따라 funcs 배열의 요소로 추가한 함수를 호출하면 전역 변수 i를 참조해 i의 값 3이 출력됨   

클로저를 사용해 위 예제를 바르게 동작하는 코드로 만듬

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    return function () {
      return id;
    }
  }(i));
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```
즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아   
매개변수 id에 할당한 후 중첩 함수를 반환하고 종료함  
즉시 실행 함수가 반환한 함수는 funcs 배열에 순차적으로 저장됨

이때 즉시 실행 함수의 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수의   
상위 스코프(즉시 실행 함수의 렉시컬 환경)에 존재함   
즉시 실행 함수가 반환한 중첩 함수는 자신의 상위 스코프를 기억하는 클로저이고,  
매개변수 id는 즉시 실행 함수가 반환한 중첩 함수에 묶여 있는 자유 변수가 되어 값이 유지됨  

이 예제는 자바스크립트 함수 레벨 스코프 특성으로 인해 발생하는 현상  
ES6의 let 키워드를 사용하면 이 같은 번거로움이 깔끔하게 해결됨

```js
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () { return i; };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]());
}
```
for 문의 변수 선언문에서 let 변수를 사용하면 for 문의 코드 블록이   
반복 실행될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성됨    

만약 for 문의 코드 블록 내에서 정의한 함수가 있다면 이 함수의 상위 스코프는   
for 문의 코드 블록이 반복 실행될 때마다 생성된 for 문 코드 블록의 새로운 렉시컬 환경  

이때 함수의 상위 스코프는 for 문의 코드 블록이 반복 실행될 때마다   
식별자(for 문의 변수 선언문에서 초기화 변수, for 문의 코드 블록 내 지역 변수 등)의 값을 유지해야 함  
이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성해 식별자의 값을 유지함

1. for 문의 변수 선언문에서 let 초기화 변수를 사용한 for 문이 평가되면   
   먼저 새로운 렉시컬 환경을 생성하고 초기화 변수 식별자와 값을 등록함  
   그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체함
   
2. for 문의 코드 블록이 반복 실행되기 시작하면 새로운 렉시컬 환경을 생성하고 코드 블록 내의 식별자와 값을 등록함  
   그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체함
   
3. for 문의 코드 블록의 반복 실행이 모두 종료되면 for 문이 실행되기 이전의 렉시컬 환경을  
   실행 중인 실행 컨텍스트의 렉시컬 환경으로 되돌림


이처럼 let/const 키워드를 사용하는 반복문은 코드 블록을 반복 실행할 때마다   
새로운 렉시컬 환경을 생성해 반복할 당시의 상태를 마치 스냅숏을 찍는 것처럼 저장함  
단, 이는 반복문의 코드 블록 내부에서 함수를 정의할 때 의미 있음  
반복문의 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은  
반복 직후 아무도 참조하지 않기 떄문에 가비지 컬렉션의 대상이 됨 
 
또 다른 방법으로는 함수형 프로그래밍 기법인 고차 함수를 사용하는 방법이 있음  
이 방법은 변수와 반복문의 사용을 억제할 수 있기 떄문에 오류를 줄이고 가독성을 좋게 만듬  
```js
//요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가함
//배열의 요소로 추가된 함수들은 모두 클로저
const funcs = Array.from(new Array(3), (_, i) => () => i); //(3)[f,f,f]

//배열의 요소로 추가된 함수들을 순차적으로 호출
funcs.forEach(f => console.log(f())); // 0 1 2
```

