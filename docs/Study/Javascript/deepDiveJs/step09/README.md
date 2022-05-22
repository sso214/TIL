---
title : 08장. 제어문   
date : 2022.05.15
---

# 08장. 제어문
* 조건에 따라 코드 블록을 실행(조건문)하거나, 반복 실행(반복문)할 때 사용
* 일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행되지만,  
  제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어 가능함
* 다만 제어문은 코드의 흐름을 이해하기 어렵게 만들어 가독성을 해치는 단점이 있음

## 1. 블록문
* 0개 이상의 문을 중괄호로 묶은 것.
* 코드 블록 또는 블록이라고 부르기도 함.  
  자바스크립트는 블록문을 하나의 실행 단위로 취급함
* 문의 끝에는 세미콜론을 붙이는 것이 일반적이지만 블록문은 언제나 문의 종료를 의미하는   
  자체 종결성을 갖기 때문에 블록문 끝에는 세미콜론을 붙이지 않음


## 2. 조건문
* 주어진 조건식의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정함 
* 조건식은 불리언 값으로 평가될 수 있는 표현식
* 자바스크립트는 if ...else 문과 switch 문으로 두 가지 조건문을 제공함

### 2-1. if ...else 문과
* 논리적 참/거짓에 따라 실행할 코드 블록을 결정함
* if문의 조건식을 불리언 값으로 평가되어야 함 (아닐 경우 암묵적으로 타입 변환됨)
* else if 문과 else 문은 옵션 (else if 문은 여러번 사용 가능)
* 코드 블록 내 문의 하나뿐이라면 중괄호 생략 가능
* 대부분의 if ...else 문은 삼항 조건 연산자로 바꿔쓸 수 있음  
  삼항 조건 연산자 표현식은 값처럼 사용할 수 있지만 if ...else문은 값처럼 사용할 수 없음 (변수 할당 불가)  
```js
if(조건식1) {
    // 조건식1이 참일 경우 실행
} else if (조건식2) {
  // 조건식2가 참일 경우 실행
} else {
    // 조건식들이 모두 거짓일 경우 실행
}

if(조건문1) //실행할 코드
else if(조건문2) //실행할 코드
else //실행할 코드
```


### 2-2. switch 문
* 주어진 표현식을 평가해 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮김
* switch 문의 표현식과 일치하는 case문이 없을 시 실행 순서는 default 문으로 이동.  
  (default 문은 옵션) 
* if ...else문은 논리적 참, 거짓으로 실행할 코드 블록을 결정하지만  
  switch 문은 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용함
* break 문은 코드 블록에서 탈출하는 역할을 함.  
  break 문이 없다면 case문의 표현식과 일치하지 않더라도 실행 흐름이  
  다음 case문과 default문으로 연이어 이동함 (=폴스루)  
  (default 문에는 break 문을 생략하는 것이 일반적. 알아서 switch 문을 빠져나감)
* break문을 생략한 폴스루가 유용한 경우도 있음
* switch 문을 지원하는 프로그래밍 언어도 있지만 지원하지 않는 프로그래밍 언어도 있음
* 만약 if ...else 문으로 해결할 수 있다면 switch 문보다 if ...else 문으로 해결하는 편이 좋음
```js
switch (표현식) {
  case '표현식1':
      // 문의 표현식과 표현식이 일치하면 실행될 문;
      break;
  case '표현식2':
    // 문의 표현식과 표현식이 일치하면 실행될 문;
    break;
  default:
    // switch 문의 표현식과 일치하는 case 문이 없을 떄 실행될 문;
}
```


## 3. 반복문
* 조건식의 평가 결과가 참인 경우 코드 블록을 실행. 이는 조건식이 거짓이 될 때까지 반복됨
* 자바스크립트는 세 가지 반복문인 for 문, while 문, do ...while문을 제공함

> 자바스크립트는 배열을 순회할 때 사용하는 forEach 메서드, 객체의 프로퍼티를 열거할 때 사용하는 for ...in 문,   
> ES6에서 도입된 이터러블을 순회할 수 있는 for ...of 문과 같이 반복문을 대체할 수 있는 다양한 기능을 제공함

### 3-1. for 문
* 조건이 거짓으로 평가될 때까지 코드 블록을 반복 실행함
* for문의 변수 선언문의 변수 이름은 반복을 의하는 iteration의 i를 사용하는게 일반적
* for문의 변수 선언문, 조건식, 증감식은 모두 옵션. 단, 어떤 식도 사용하지 않을 경우 무한루프 됨.
* for문 내에 for문 중첩해 사용 가능 (=중첩 for문)
```js
for (변순 선언문 또는 할당문; 조건식; 증감식) {
    조건식이 참인 경우 반복 실행될 할당문;
}
```
1. for문 실행 시 먼저 변수 선언문이 실행됨. 변수 선언문은 단 한번만 실행
2. 변수 선언문의 실행이 종료되면 조건식이 실행됨.
3. 조건식의 평가 결과가 true일 경우 코드 블록 실행.  
   증감문으로 실행 흐름이 이동하는게 아니라 코드 블록으로 실행 흐름이 이동하는 것에 주의
4. 코드 블록의 실행이 종료되면 증감식이 실행되어 변수 선언문의 변수 값이 증감됨
5. 증감식 실행이 종료되면 다시 조건식 실행. (변경된 변수 선언문의 변수 값으로)
6. 조건식의 평가 결과가 true일 경우 코드 블록 다시 실행
7. 조건식의 평가 결과가 false가 될 때까지 계속 반복. false일 경우 for문의 실행이 종료됨


### 3-2. while 문
* 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행함
* for문은 반복 횟수가 명확할 때 사용. while문은 반복 횟수가 불명확할 때 주로 사용함
* while문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료함.  
  만약 조건식의 평가 결과가 불리언 값이 아니라면 암묵적 타입 변환함
* 조건식의 평가 결과가 언제나 참일 경우 무한루프 됨  
  무한루프에서 탈출하기 위해서는 코드 블록 내 if 문으로 탈출 조건을 만들고 break문으로 코드 블록을 탈출함
```js
var count = 0;
while (count < 3) {
  console.log(count); // 0 1 2
  count ++;
}

while (true) {
    console.log(count);
    count++;
    
    if(count === 3) break;
    // 0 1 2
}
```


### 3-3. do ...while 문
* 코드 블록을 먼저 실행하고 조건식을 평가함 (-> 코드 블록은 무조건 한 번 이상 실행됨)
```js
var count = 0;
do {
    console.log(count); // 0 1 2
    count++;
} while (count < 3);
```


## 4. break 문
* switch 문과 while 문에서 확인했듯이 break 문은 코드 블록을 탈출함  
  더 정확히 말하면 코드 블록이 아니라 레이블 문, 반복문(for, for ...in, for ...of, while, do ...while), 또는 switch 문의 코드 블록을 탈출함
* 레이블 문, 반복문, switch 문의 코드 블록 외에 break문을 사용하면 SyntaxError 발생함
* 레이블 문은 식별자가 붙은 문으로 프로그램의 실행 순서를 제어하는데 사용함   
  (switch 문의 case 문과 defualt 문도 레이블 문)  
  레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정  
  (반복문, switch 문에서는 break 문에 레이블 식별자를 지정하지 않음)
* 중첩된 for 문의 내부 for 문에서 break 문 실행시 내부 for 문을 탈출해 외부 for 문으로 진입함  
  이때 내부 for문이 아닌 외부 for문을 탈출하려면 레이블 문 사용
* 레이블 문은 중첩된 for 문 외부로 탈출할 때 유용하지만 그 밖의 경우에는 권장하지 않음   
  레이블 문 사용 시 프로그램의 흐름이 복잡해져 가독성이 나빠지고 오류 발생 가능성 높아지기 떄문
  
```js
if(true) {
    break; //Syntax Error
}


// foo라는 레이블 식별자가 붙은 레이블 문
foo : console.log('foo');

foo : {
    console.log(1);
    break foo; // foo 레이블 블록문 탈출
    console.log(2);
}
console.log('Done!');

outer : for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        if (i + j === 3) break outer;
        console.log(`inner [${i}, ${j}]`);
    }
}
console.log('Done!');

var string = 'Hello World.';
var search = 'l';
var index;

for (var i = 0; i < string.length; i++) {
    if (string[i] === search) {
        index = i;
        break;
    }
}
console.log(index); //2

```


## 5. continue 문
* 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킴
* break 문처럼 반복문을 탈출하지는 않음
* if 문 내에 실행해야할 코드가 한 줄아면 continue 문을 사용했을 떄보다 간편하고 가독성이 좋음  
  하지만 if 문 내에서 실행해야 할 코드가 길다면 depth가 깊어지므로 continue문을 사용하는 편이 가독성에 좋음
```js
var string = 'Hello World.';
var search = 'l';
var count = 0;

for (var i = 0; i < string.length; i++) {
    if (string[i] !== search) continue; //l 아닐 시 현 지점에서 실행 중단하고 반복문의 증감식으로 이동
    count++; //continue문 실행 시 이 문 실행되지 않음
}
console.log(count); //3


// String.prototype.match 메서드를 사용해도 위와 같은 동작함
const  regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length); //3

// 위 코드와 같은 동작
for (var i = 0; i < string.length; i++) {
    if(string[i] === search) count++;
}


// continue 문 사용의 depth 차이
for (var i = 0; i < string.length; i++) {
    if(string[i] === search) {
        count++;
        // code
        // code
        // code
    }
}
for (var i = 0; i < string.length; i++) {
    if(string[i] === search) continue;
    count++;
    // code
    // code
    // code
}
```
