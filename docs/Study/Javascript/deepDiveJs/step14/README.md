---
title : 14장. 전역 변수의 문제점   
date : 2022.05.23
---

# 14장. 전역 변수의 문제점

## 1. 변수의 생명 주기

### 1-1. 지역 변수의 생명 주기
* 변수는 생성되고 소멸되는 생명 주기가 있음   
  선언에 의해 생성되고 할당을 통해 값을 가짐. 그리고 언젠가 소멸함  
  (생명 주기가 없다면 한번 선언된 변수는 프로그램을 종료하지 않는 한 영원히 메모리 공간을 차지하게 됨)
* 변수는 자신이 선언된 위치에서 생성되고 소멸함  
  전역 변수의 생명 주기 : 애플리케이션의 생명 주기와 같음  
  함수 내부에서 선언된 지역 변수의 생명 주기 : 함수가 호출되면 생성되고 함수가 종료하면 소멸됨
```js
function foo(){
    var x = 'local';
    console.log(x); //"local"
    return x;
}
foo();
console.log(x); //ReferenceError
```
지역 변수 x는 foo 함수가 호출되기 이전까지는 생성되지 않음  
foo 함수를 호출하지 않으면 함수 내부의 변수 선언문이 실행되지 않기 때문  

#### <지역 변수 선언 실행 시점>
* 전역 변수 :  
  변수 선언은 선언문이 어디에 있든 상관없이 가장 먼저 실행됨.  
  (코드가 한 줄씩 실행되는 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행됨)  
* 함수 내부에서 선언한 변수 :  
  함수가 호출된 직후 함수 몸체의 코드가 순차적으로 실행되기 이전 자바스크립트 엔진에 의해 먼저 실행됨  

#### <지역 변수 생명 주기>
1. 함수 호출 시 자바스크립트 엔진에 의해 변수의 선언문이 먼저 실행되어 변수가 선언되고 undefined로 초기화 됨
2. 함수 몸체를 구성하는 문들이 순차적으로 실행
3. 변수 할당문이 실행되면 변수에 값이 할당됨
4. 함수가 종료하면 변수도 소멸되어 생명 주기가 종료됨

따라 함수 내부에서 선언된 지역 변수는 함수가 호출되어 실행되는 동안에만 유효함  
즉, 지역변수의 생명 주기는 함수의 생명주기와 일치함  

#### <지역 변수가 함수보다 오래 생존하는 경우>
함수 몸체 내부에서 선언된 지역 변수의 생명 주기는 함수의 생명 주기와 대부분 일치하지만  
지역 변수가 함수보다 오래 생존하는 경우도 있음  

변수의 생명 주기 : 메모리 공간이 확보된 시점부터 메모리 공간이 해제되어 가용 메모리 풀에 반환되는 시점까지    
(값을 저장하기 위해 확보한 메모리 공간 자체 또는 메모리 공간을 식별하기 위해 붙인 이름이기 때문)

함수 내부에서 선언된 지역변수는 함수가 생성된 스코프에 등록됨.  
함수가 생성된 스코프는 렉시컬 환경이라 불리는 물리적인 체계가 있어   
변수는 자신이 등록된 스코프가 소멸(메모리 해제)될때까지 유효함   

할당된 메모리 공간은 더 이상 아무도 참조하지 않을 때 가비지 콜렉터에 의해 해제되어 가용 메모리 풀에 반환됨.  
즉 누군가 메모리 공간을 참조하고 있으면 해제되지 않고 확보된 상태로 남아있게 됨.  

스코프도 마찬가지로 누군가 스코프를 참조하고 있으면 스코프는 소멸하지 않고 생존하게 됨  
일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸하지만  
누군가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 됨  

#### <지역 변수의 호이스팅>

```js
var x = 'global';

function foo(){
    console.log(x);  //(1)
    var x = 'local';
}
foo();
console.log(x); //global
```
foo 함수 내부에서 선언된 지역변수 x는 (1) 시점에 이미 선언되고 undefined로 초기화되어 있음   
따라 전역 변수 x가 아닌 지역변수 x를 참조해 값을 출력함  
지역 변수는 함수 전체에서 유효함. (단, 변수 할당문이 실행되기 이전까지는 undefined 값을 가짐)
   
**호이스팅은 스코프를 단위로 동작**함  
* 전역 변수의 호이스팅 :   
  전역 변수의 선언이 전역 스코프의 선두로 끌어올려진 것처럼 동작함  
  따라 전역 변수는 전역 전체에서 유효  
* 지역 변수의 호이스팅 :  
  지역 변수의 선언이 지역 스코프의 선두로 끌어올려진 것처럼 동작함  
  따라 지역 변수는 함수 전체에서 유효  

즉, **호이스팅은 변수 선언이 스코프의 선두로 끌어올려진 것처럼 동작**하는 자바스크립트 고유의 특징을 말함

### 1-2. 전역 변수의 생명 주기
* 전역 코드는 함수 호출과 같이 전역 코드를 실행하는 특별한 진입점이 없고  
  코드가 로드되지마자 곧바로 해석되고 실행됨.  
* 전역 코드는 반환문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료함  
  (함수는 함수 몸체의 마지막 문 또는 반환문이 실행되면 종료함)
* var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 됨.  
  이는 **var 키워드로 선언한 전역 변수의 생명 주기는 전역 객체의 생명주기와 일치**하는 것을 의미  
  
  브라우저 환경에서 var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티.   
  (브라우저 환경의 전역 객체는 window)  
  전역 객체 window는 웹페이지를 닫기 전까지 유효함.  
  따라 브라우저 환경에서 var 키워드로 선언한 전역 변수는 웹페이지를 닫을 때까지 유효함.  

> 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체.   
> 클라이언트 사이드 환경(브라우저)에서의 전역 객체는 window.  
> 서버 사이드 환경(Node.js)에서의 젼역 객체는 global.  
> 환경에 따라 전역 객체를 가리키는 다양한 식별자(window, self, this, frames, global)가 존재했으나   
> ES11에서 globalThis 로 통일됨
> <br>
> <br>
> 전역 객체는 표준 빌트인 객체(Object, String, Number, Function, Array)와   
> 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 호스트 API),  
> 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가짐


## 2. 전역 변수의 문제점
### 암묵적 결합
전역 변수를 선언한 의도는 코드 어디서든 참조하고 할당할 수 있는 변수를 사용하겠다는 것.  
이는 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합을 허용한다는 의미   
변수의 유효 범위가 크면 클수록 코드의 가독성은 나빠지고 의도치 않게 상태 변경의 위험성도 높아짐

### 긴 생명 주기  
* 전역 변수  
  생명 주기가 김. 따라서 메모리 리소스도 오랜 시간 소비함  
  전역 변수의 상태를 변경할 수 있는 시간도 길고 기회도 많음  
  특히 var 키워드는 변수의 중복 선언을 허용하므로 변수 이름이 중복될 가능성 높음  
  (변수 이름 중복 시 의도치 않은 재할당 이뤄짐)  

* 지역 변수  
  전역 변수보다 생명주기 훨씬 짧음  
  (크지 않은 함수의 지역 변수는 생존 시간이 극히 짧음)  
  -> 지역 변수의 상태를 변경할 수 있는 시간도 짧고 기회도 적음   
  전역 변수보다 상태 변경에 의한 오류가 발행할 확률 작음.  
  또한 메모리 리소스도 짧은 기간만 소비함

### 스코프 체인 상에서 종점에 존재  
전역 변수는 스코프 체인상 종점에 존재함    
이는 변수 검색 시 전역 변수가 가장 마지막에 검색된다는 것을 뜻함    
즉, 전역 변수의 검색 속도가 가장 느림 (속도 차이는 크지 않지만 차이는 분명히 존재)

### 네임스페이스 오염  
자바스크립트의 가장 큰 문제점 중 하나는 파일이 분리되어 있어도 하나의 전역 스코프를 공유한다는 것.  
따라 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우  
예상치 못한 결과가 발생할 수 있음


## 3. 전역 변수의 사용을 억제하는 방법
* 전역 변수의 무분별한 사용은 위험  
* 전역 변수를 반드시 사용해야 할 이유가 없다면 지역 변수를 사용해야 함
* 변수의 스코프는 좁을수록 좋음  

### 3-1. 즉시 실행 함수
함수 정의와 동시에 호출되는 즉시 실행 함수는 한번만 호출됨  
**모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 됨**  
이 방법을 사용하면 전역 변수를 생성하지 않으므로 라이브러리 등에 자주 사용됨
```js
(function(){
    var foo = 10; //즉시 실행함수의 지역 변수
}());
console.log(foo); //ReferenceError
```

### 3-2. 네임스페이스 객체
* 전역에 네임스페이스 역할을 담당할 객체를 생성하고  
  전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법
* 네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해 계층적으로 구성할 수도 있음
* 식별자 충돌을 방지하는 효과는 있으나 네임스페이스 객체 자체가 전역 변수에 할당되므로 그다지 유용하진 않음
```js
var MYAPP = {}; //전역 네임스페이스 객체

MYAPP.name = 'Leo';
MYAPP.person = {
  name: 'Park',
  address: 'Seoul'
};

console.log(MYAPP.name); //"Leo"
console.log(MYAPP.person.name); //"Park"
```

### 3-3. 모듈 패턴
* 모듈 패턴은 클래스를 모방해 관련있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만듬  
* 클로저를 기반으로 동작   
* 모듈 패턴의 특성은 전역 변수의 억제는 물론 캡슐화까지 구현할 수 있다는 것  

캡슐화 : 프로퍼티와 메서드를 하나로 묶는 것을 말함.  
캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 함 (=정보 은닉)    
대부분의 객체지향 프로그래밍 언어는 클래스를 구성하는 멤버에 대해 public, private, protected 등의  
접근 제한자를 사용해 공개범위를 한정할 수 있음.  
(제한된 접근 권한을 제공하며 원하지 않는 경우 외부의 접근으로부터 내부를 보호)   
public : public으로 선언된 데이터 또는 메서드는 외부에서 접근 가능  
private: private로 선언된 경우는 외부에서 접근할 수 없고 내부에서만 사용됨  

하지만 자바스크립트는 접근 제한자를 제공하지 않음.  
모듈 패턴은 전역 네임스페이스의 오염을 막는 기능과 한정적이지만 정보 은닉을 구현하기 위해 사용함

```js
var Counter = (function () {
  //private 변수
  var num = 0;

  //외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환함
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    }
  };
}());

//private 변수는 외부에 노출되지 않음
console.log(Counter.num); //undefined

console.log(Counter.increase()); //1
console.log(Counter.increase()); //2
console.log(Counter.decrease()); //1
console.log(Counter.decrease()); //0
```
위 예제의 즉시 실행 함수는 객체를 반환함.    
(이 객체에 외부에 노출하고 싶은 변수나 함수를 담아 반환)  
이때 반환되는 객체의 프로퍼티는 외부에 노출되는 퍼블릭 멤버.  
반환하는 객체에 추가하지 않으면 외부에서 접근 불가한 프라이빗 멤버가 됨

### 3-4. ES6 모듈
ES6 모듈을 사용하면 더는 전역 변수를 사용할 수 없음  
ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공함  
따라 모듈 내에서 var 키워드로 선언한 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아님
모던 브라우저(Chrome 61, FF 60, SF 10.1, Edge 16이상)에서는 ES6 모듈 사용 가능    

script 태그에 type="module" 어트리뷰 추가 시 로드된 자바스크립트 파일은 모듈로서 동작    
모듈 파일 확장자는 mjs를 권장    
`<script type="module" src="lib.mjs"></script>`

구형 브라우저에서 동작하지 않으며, 브라우저의 ES6 모듈 기능을 사용하더라도  
트랜스파일링이나 번들링이 필요하므로 아직까지는 브라우저가 지원하는 ES6 모듈 기능보다는   
Webpack 등의 모듈 번들러를 사용하는 것이 일반적  

