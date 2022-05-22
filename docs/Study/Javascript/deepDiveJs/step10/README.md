---
title : 09장. 타입 변환과 단축 평가   
date : 2022.05.18
---

# 09장. 타입 변환과 단축 평가

## 1. 타입 변환이란?
* 명시적 타입 변환 (= 타입 캐스팅) :   
  개발자가 의도적으로 값의 타입을 변환하는 것
* 암묵적 타입 변환 (= 타입 강제 변환) :  
  개발자의 의도와 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환 되는 것

```js
var x = 10;

// 명시적 타입 변환
var str1 = x.toString();
console.log(typeof str1, str1); //string 10
console.log(typeof x, x); //number 10

// 암묵적 타입 변환
var str2 = x + '';
console.log(typeof str2, str2); //string 10
console.log(typeof x, x); //number 10
```
* 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이므로 기존 값을 직접 변경하는 것은 아님
* 암묵적 타입 변환은 발생하지 않도록 주의해야 할까?  
  `(10).toString()` = `10 + ''`  
  때로는 암묵적 타입 변환이 가독성 측면에서 좋을 수 있으므로 사용하지 않는 것 보단  
  타입 변환이 어떻게 동작하는지 정확히 알고 이해하고 사용해야 함  


## 2. 암묵적 타입 변환
자바스크립트 엔진은 표현식을 평가할 때 가급적 에러를 발생시키지 않기 위해  
개발자의 의도와 상관없이 코드의 문맥을 고려해 암묵적 타입 변환을 할 때가 있음

### 2-1. 문자열 타입으로 변환
* 문자열 연결 연산자 표현식에서 피연산자를 문자열 타입으로 암묵적 타입 변환
* 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환함  
```js
0 + ''; //"0"
-1 + ''; //"-1"
NaN + ''; //"NaN"
-Infinity + ''; //"-Infinity"

true + ''; //"true"
false + ''; //"false"

null + ''; //"null"
undefined + ''; //"undefined"

(Symbol()) + ''; //TypeError

({}) + ''; //"[object Object]"
Math + ''; //"[object Math]"
[] + ''; //""
[10, 20] + ''; //"10,20"
(function(){}); //"function(){}"
Array + ''; //"function Array() { [native code] }"
```

### 2-2. 숫자 타입으로 변환
* 산술/비교 연산자 표현식에서 피연산자를 숫자 타입으로 암묵적 타입 변환 
* 피연산자를 숫자 타입으로 변환할 수 없는 경우 결과는 NaN 
```js
1 - '1'; //0
1 * '10'; //10
'1' > 0; //true

+''; //0
+'0'; //0
+'1'; //1
+'string'; //NaN

+true; //1
+false; //0

+null; //0
+undefined; //NaN

+Symbol(); //TypeError

+{}; //NaN
+[]; //0
+[10, 20]; //NaN
+(function(){}); //NaN
```

### 2-3. 불리언 타입으로 변환
* 제어문/삼항 연산자 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환  
* 불리언 타입이 아닌 값은 Truthy 값, Falsy 값으로 구분함  
  * Truthy 값 : Falsy 값 이외의 모든 값
  * Falsy 값 : `false`, `undefined`, `null`, `0`, `-0`, `NaN`, `''`
```js
if('') console.log('1');
if(true) console.log('2');
if(0) console.log('3');
if('str') console.log('4');
if(null) console.log('5');

//2 4
```


## 3. 명시적 타입 변환
명시적으로 타입을 변경하는 방법은 다양함
* 표준 빌트인 생성자 함수 (String, Number, Boolean)를 new 연산자 없이 호출
* 빌트인 메서드 사용
* 암묵적 타입 변환 이용

> 표준 빌트인 생성자 함수와 표준 빌트인 메서드는 JS에서 기본 제공하는 함수.  
> 표준 빌트인 생성자 함수 : 객체 생성을 위한 함수. new 연산자와 같이 호출함  
> 표준 빌트인 메서드 : JS에서 기본 제공하는 빌트인 객체의 메서드

### 3-1. 문자열 타입으로 변환
* String 생성자 함수를 new 연산자 없이 호출
* Object.prototype.toString 메서드 사용
* 문자열 연결 연산자 이용
```js
// String 생성자 함수를 new 연산자 없이 호출
String(1); //"1"
String(NaN); //"NaN"
String(true); //"true"

// Object.prototype.toString 메서드 사용
(1).toString(); //"1"
(NaN).toString(); //"NaN"
(true).toString(); //"true"

// 문자열 연결 연산자 이용
1 + ''; //"1"
NaN + ''; //"NaN"
true + ''; //"true"
```

### 3-2. 숫자 타입으로 변환
* Number 생성자 함수를 new 연산자 없이 호출
* parseInt, parseFloat 함수 사용 (문자열만 가능)
* +단항 산술 연산자 이용
* *산술 연산자 이용
```js
// Number 생성자 함수를 new 연산자 없이 호출
Number('0'); //0
Number('-1'); //-1
Number('10.53'); //10.53
Number(true); //1
Number(false); //0

// parseInt, parseFloat 함수 사용
parseInt('0'); //0
parseInt('-1'); //-1
parseFloat('10.53'); //10.53

// +단항 산술 연산자 이용
+'0'; //0
+'-1'; //-1
+'10.53'; //10.53
+true; //1
+false; //0

// *산술 연산자 이용
'0' * 1; //0
'-1' * 1; //-1
'10.53' * 1; //10.53
true * 1; //1
false * 1; //0
```

### 3-3. 불리언 타입으로 변환
* Boolean 생성자 함수를 new 연산자 없이 호출
* !부정 논리 연산자를 두 번 사용
```js
// Boolean 생성자 함수를 new 연산자 없이 호출
Boolean('x'); //true
Boolean(''); //false
Boolean('false'); //true

Boolean(0); //false
Boolean(1); //true
Boolean(NaN); //false
Boolean(Infinity); //true

Boolean(null); //false
Boolean(undefined); //false
Boolean({}); //true
Boolean([]); //true

// !부정 논리 연산자를 두 번 사용
!!'x'; //true
!!''; //false
!!'false'; //true

!!0; //false
!!1; //true
!!NaN; //false
!!Infinity; //true

!!null; //false
!!undefined; //false
!!{} ; //true
!![]; //true
```


## 4. 단축 평가
### 4-1. 논리 연산자를 사용한 단축 평가
* 단축 평가 : 표현식을 평가하는 도중 결과가 확정된 경우 나머지 평가 과정을 생략하는 것
* 논리합(||) 또는 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 한쪽으로 평가됨  
* 논리합(||) 또는 논리곱(&&) 연산자는 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환함  
```js
'cat' && 'dog'; //"dog"
'cat' || 'dog'; //'cat'
```

|단축 평가 표현식|평가 결과|
|:--:|:--:|:--:|
|true \|\| anything|true|
|false \|\| anything|anything|
|true && anything|anything|
|false && anything|false|

<br>

#### 단축 평가를 사용하면 if문을 대체할 수 있음
* 조건이 Truthy 값일 때 : 논리곱(&&) 연산자 표현식으로 대체
* 조건이 Falsy 값일 때 : 논리합(||) 연산자 표현식으로 대체
* 삼항 조건 연산자는 if ...else 문 대체 가능
```js
var done = true;
var message = '';

// 조건이 Truthy 값일 때
if (done) message = '완료';
message = done && '완료';

// 조건이 Falsy 값일 때
done = false;
if (!done) message = '미완료';
message = done || '미완료';

// 삼항 조건 연산자는 if ...else 문 대체 가능
done = true;
if(done) message = '완료';
else message = '미완료';

message = done ? '완료' : '미완료';
```

#### 객체를 가리키기를 기대하는 변수가 null / undefined가 아닌지 확인하고 프로퍼티를 참조할 떄
객체를 가리키기를 기대하는 변수의 값이 null 또는 undefined인 경우  
객체의 프로퍼티를 참조하면 타입 에러가 발생함. (에러 발생 -> 프로그램 강제 종료)  
이때 단축 평가를 사용하면 에러 발생시키지 않음
```js
var elem = null;
var value = elem.value; //TypeError
value = elem && elem.value; //null
//elem이 Falsy 값이면 elem, Truthy 값이면 elem.value로 평가됨
```

#### 함수 매개변수에 기본값을 설정할 때
함수 호출 시 인수를 전달하지 않으면 매개 변수에는 undefined가 할당됨  
이때 단축 평가를 사용해 매개변수의 기본값을 설정하면 발생할 수 있는 에러를 방지할 수 있음
```js
// 단축 평가를 사용한 매개변수 기본값 설정
function getStringLength(str) {
    str = str || '';
    return str.length;
}
getStringLength(); //0
getStringLength('hi'); //2

// ES6의 매개변수의 기본값 설정
function getStringLength2(str = '') {
    return str.length;
}
getStringLength2(); //0
getStringLength2('hi'); //2
```


### 4-2. 옵셔널 체이닝 연산자
* ES11에서 도입 (`?.`)
* 좌항의 피연산자가 null/undefined 일 경우 undefined 반환. 아닐 경우 우항의 프로퍼티 참조를 이어감
* 객체를 가리키기를 기대하는 변수가 null/undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용
* 옵셔널 체이닝 연산자 도입 전에는 논리 연산자(&&)를 사용한 단축 평가로 확인했음
```js
var elem = null;
var value = elem?.value;
console.log(value); //undefined

value = elem && elem.value;
console.log(value); //null
```

논리 연산자(&&) 사용 시 좌항 피연산자가 Falsy 값이면 좌항 피연산자를 그대로 반환함.  
하지만 아래처럼 Falsy 값이 아닌 값으로 평가가 필요한 경우 예기치 않은 동작 발생할 수 있음  
옵셔널 체이닝 연산자는 좌항 피연산자가 Falsy 값이라도 null/undefined가 아니면 우항의 프로퍼티 참조를 이어감
```js
var str = '';
var length = str && str.length;
console.log(length); //''

length = str?.length;
console.log(length); //0
```


### 4-3. null 병합 연산자
* ES11에서 도입 (`??`)
* 좌항의 피연산자가 null/undefined 일 경우 우항의 피연산자를 반환하고 아닐 경우 좌항의 피연산자를 반환
* 변수에 기본값을 설정할 때 유용 
* null 병합 연산자 도입 전에는 논리 연산자(||)를 사용한 단축 평가로 변수에 기본값 설정함
```js
var foo = null ?? 'default string';
console.log(foo); //'default string'

foo = null || 'default string';
console.log(foo); //'default string'
```
논리 연산자(||) 사용 시 좌항 피연산자가 Falsy 값이면 우항의 피연산자를 반환  
하지만 아래처럼 Falsy 값이 아닌 값으로 평가가 필요한 경우 예기치 않은 동작 발생할 수 있음  
null 병합 연산자는 좌항의 피연산자가 Falsy 값이더라도 null/undefined가 아니면 좌항의 피연산자를 그대로 반환함
```js
var foo = '' || 'default string';
console.log(foo); //'default string'

foo = '' ??  'default string';
console.log(foo); //''
```
