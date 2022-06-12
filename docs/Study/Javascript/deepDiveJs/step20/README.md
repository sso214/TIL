---
title : 20장. strict mode   
date : 2022.05.30
---

# 20장. strict mode

## 1. strict mode란?
* ES5부터 strict mode(엄격 모드)가 추가됨
* strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용해 오류 발생 가능성을 높이거나   
  자바스크립트 엔진의 최적화 작어벵 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킴
* ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용됨
* ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있음   
  린트 도구는 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고   
  강제할 수 있기 때문에 더욱 강력한 효과를 얻을 수 있음  
  -> 때문에 strict mode보다 린트 도구 사용을 선호  
  
#### <린트 도구>
정적 분석 기능을 통해 소스코드 실행 전 소스코드를 스캔하여 문법적 오류 뿐 아니라   
잠재적 오류까지 찾아내고 오류 원인을 리포팅해주는 유용한 도구


## 2. strict mode의 적용
strict mode를 적용하려면 전역의 선두나 함수 몸체 선두에 `'use strict';`를 추가함   
(코드 선두에 위치시키지 않으면 strict mode가 제대로 동작하지 않음)
* 전역 선두에 추가 : 스크립트 전체에 strict mode 적용됨  
* 함수 몸체 선두에 추가 : 해당 함수와 중첩 함수에 strict mode 적용됨
```js
'use strict';
function foo() {
  x = 10; //Reference Error
}

foo();
```
```js
function foo() {
  'use strict';
  x = 10; //Reference Error
}

foo();
```
```js
function foo() {
  x = 10; //에러 발생하지 않음
  'use strict';
}

foo();
```


## 3. 전역에 strict mode를 적용하는 것은 피하자
**전역에 적용한 strict mode는 스크립트 단위**로 적용됨  
스크립트 단위로 적용된 strict mode는 해당 스크립트에 한정되어 적용됨  

strict mode 스크립트와 non-strict mode 스크립트 혼용은 오류 발생할 수 있음  
특히 외부 서드파티 라이브러리 사용하는 경우 라이브러리가 non-strict mode인 경우도 있음    
때문에 전역에 strict mode 사용은 바람직하지 않음  

이런 경우 **즉시 실행 함수로 스크립트 전체를 감싸 스코프를 구분**하고 즉시 실행함수 선두에 strict mode를 적용

```html
<!DOCTYPE html>
<html>
<body>
<script>
  'use strict';
</script>
<script>
  x = 1; //에러 발생하지 않음
  console.log(x); //1
</script>
<script>
  'use strict';
  y = 1; //ReferenceError
  console.log(y);
</script>
</body>
</html>
```
```js
//즉시 실행 함수의 선두에 strict mode를 적용
(function () {
  'use strict';
  //Do something ...
}());
```


## 4. 함수 단위로 strict mode를 적용하는 것도 피하자
* 어떤 함수는 strict mode를 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않음  
* 모든 함수에 일일이 strict mode를 적용하는 것은 번거로움  
* strict mode 적용된 함수가 참조할 함수 외부 컨텍스트에 strict mode를 적용하지 않을 시 문제 발생할 수 있음 

따라 **strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용**하는 것이 바람직
```js
(function () {
  //non-strict mode
  var let = 10; //에러 발생하지 않음

  function foo() {
    'use strict';
    let = 20; //SyntaxError
  }

  foo();
}());
```


## 5. strict mode가 발생시키는 에러

### 5-1. 암묵적 전역
선언하지 않은 변수 참조 시 ReferenceError 발생
```js
(function () {
  'use strict';
  
  x = 1;
  console.log(x); //ReferenceError
}());
```

### 5-2. 변수, 함수, 매개변수의 삭제
delete 연산자로 변수, 함수, 매개변수 삭제 시 SyntaxError 발생
```js
(function () {
  'use strict';
  
  var x = 1;
  delete x; //SyntaxError
  
  function foo(a) {
      delete a; //SyntaxError
  }
  delete foo; //SyntaxError
}());
```

### 5-3. 매개변수 이름의 중복
중복된 매개변수 이름 사용 시 SyntaxError 발생
```js
(function () {
  'use strict';
  
  //SyntaxError
  function foo(x, x) {
      return x + x;
  }
  console.log(foo(1,2));
}());
```

### 5-4. with문의 사용
with문 사용 시 SyntaxError 발생  

with문 : 전달된 객체를 스코프 체인에 추가함   
with문은 동일한 객체의 프로퍼티를 반복 사용 시 객체 이름을 생략해 코드가 간단해지는 효과가 있지만  
성능과 가독성이 나빠지는 문제가 있음. 따라 with문은 사용하지 않는 걸 권장
```js
(function () {
  'use strict';
  
  //SyntaxError
  with({ x:1 }) {
      console.log(x);
  }
}());
```


## 6. strict mode 적용에 의한 변화

### 6-1. 일반 함수의 this
strict mode에서 함수를 일반 함수로서 호출 시 this에 undefined 바인딩 됨  
생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요 없기 때문 (에러 발생 X)
```js
(function(){
  'use strict';

  function foo() {
    console.log(this); //undefined
  }
  foo();

  function Foo() {
    console.log(this); //Foo
  }
  new Foo();
}());
```

### 6-2. argumets 객체
strict mode에서는 매개변수에 전달된 인수를 재할당해 변경해도 argumets 객체에 반영되지 않음
```js
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당해 변경
  a = 2;

  //변경된 인수가 arguments 객체에 반영되지 않음
  console.log(arguments); //{0:1, length:1}
}(1));
```

