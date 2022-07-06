---
title : 41장. 타이머  
date : 2022.07.05
---

# 41장. 타이머

## 1. 호출 스케줄링
* 일정 시간이 경과된 이후 호출하도록 함수 호출을 예약하려면 타이머 함수를 사용
* 호출 스케줄링이라고 함
* 자바스크립트는 타이머를 생성할 수 있는 타이머 함수(setTimeout, setInterval)과  
  타이머를 제거할 수 있는 타이머 함수(clearTimeout, clearInterval)을 제공
* 타이머 함수는 ECMAScript 사양에 정의된 빌트인 함수는 아니지만  
  브라우저 환경과 Node.js 환경에서 모두 전역 객체의 메서드로 제공함.  
  (즉, 호스트 객체)
* 타이머 함수 setTimeout, setInterval이 생성한 타이머가 만료되면 콜백 함수가 호출됨
    * setTimeout 함수의 콜백 함수 : 타이머가 만료되면 단 한번 호출
    * setInterval 함수의 콜백 함수 : 타이머가 만료될 때마다 반복 호출
* 자바스크립트 엔진은 싱글 스레드이기 때문에 타이머 함수는 비동기 처리 방식으로 동작함


## 2. 타이머 함수

### 2-1. setTimeout / clearTimeout

#### setTimeout
setTimeout의 콜백 함수는 두 번째 인수로 전달받은 시간(ms, 1/1000초) 이후   
단 한번 실행되도록 호출 스케줄링 됨
```js
const timeoutId = setTimeout(func|code[, delay, param1, param2, ...]);
```
* **func : 타이머가 만료된 뒤 호출될 콜백 함수**  
  * 권장하진 않지만 콜백 함수 대신 코드를 문자열로 전달 가능.  
    이때 코드 문자열은 타이머가 만료된 뒤 해석되고 실행됨 (eval 함수와 유사)
* **delay : 타이머 만료 시간(밀리초ms 단위)**   
  * setTimeout 함수는 delay 시간으로 단 한번 동작하는 타이머를 생성함  
  * 인수 전달 생략한 경우 기본값 0이 지정됨  
  * delay 시간이 설정된 타이머가 만료될 때 콜백 함수 즉시 호출이 보장되지는 않음  
    delay 시간은 태스크 큐에 콜백 함수를 등록하는 시간을 지연할 뿐
  * delay가 4ms 이하인 경우 최소 지연 시간 4ms가 지정됨
* **param1, params2, ... : 콜백 함수에 전달해야 할 인수가 존재하는 경우 세 번째 이후의 인수로 전달 가능**  
  * IE9 이하에서는 콜백 함수에 인수 전달 불가능

```js
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
setTimeout(() => console.log('Hi!'), 1000);

// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
// 이때 콜백 함수에 'Lee'가 인수로 전달된다.
setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Lee');

// 두 번째 인수(delay)를 생략하면 기본값 0이 지정된다.
setTimeout(() => console.log('Hello!'));
```

#### clearTimeout
setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환함  
반환된 타이머 id는 브라우저 환경인 경우 숫자, Node.js 환경인 경우 객체

반환된 타이머 id를 clearTimeout 함수의 인수로 전달해 타이머 취소 가능   
(즉, clearTimeout 함수는 호출 스케줄링을 취소함)

```js
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
// setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
const timerId = setTimeout(() => console.log('Hi!'), 1000);

// setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소한다.
// 타이머가 취소되면 setTimeout 함수의 콜백 함수가 실행되지 않는다.
clearTimeout(timerId);
```

### 2-2. setInterval / clearInterval

#### setInterval
* setInterval 함수의 콜백 함수는 두 번째 인수로 전달받은 시간(ms, 1/1000초)이   
  경과할 때마다 반복 실행되도록 호출 스케줄링 됨 (타이머가 취소될 때까지 계속됨)
* 전달할 인수는 setTimeout 함수와 동일
```js
const timerId = setInterval(func|code[, delay, param1, param2, ...]);
```

#### clearInterval
setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환함   
반환된 타이머 id는 브라우저 환경인 경우 숫자, Node.js 환경인 경우 객체

반환된 타이머 id를 clearInterval 함수의 인수로 전달해 타이머를 취소할 수 있음  
즉, clearInterval 함수는 호출 스케줄링을 취소함
```js
let count = 1;
// 1초(1000ms) 후 타이머가 만료될 때마다 콜백 함수가 호출된다.
// setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.

const timeoutId = setInterval(() => {
    console.log(count); // 1 2 3 4 5
    // count가 5이면 setInterval 함수가 반환한 타이머 id를 clearInterval 함수의 인수로 전달하여
    // 타이머를 취소한다. 타이머가 취소되면 setInterval 함수의 콜백 함수가 실행되지 않는다.
    if (count++ === 5) clearInterval(timeoutId);
}, 1000);
```


## 3. 디바운스와 스로틀
scroll, resize, input, mousemove 같은 이벤트는 짧은 시간 간격으로 연속해서 발생함   
이러한 이벤트에 바인딩한 이벤트 핸들러는 과도하게 호출돼 성능 문제를 일으킬 수 있음   

디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해   
과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법

디바운스와 스로틀은 이벤트를 처리할 때 매우 유용함   
(디바운스와 스로틀의 구현에는 타이머 함수가 사용됨)  


### 3-1. 디바운스
디바운스는 짧은 시간 간격으로 발생하는 이벤트를 그룹화 해 마지막에 한 번만 이벤트 핸들러가 호출되도록 함

```html
<!DOCTYPE html>
<html>
<body>
<input type="text">
<div class="msg"></div>
<script>
    const $input = document.querySelector('input');
    const $msg = document.querySelector('.msg');
    const debounce = (callback, delay) => {
        let timerId;
        // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
        return event => {
            // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
            // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(callback, delay, event);
        };
    };
    
    // debounce 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다.
    // 300ms보다 짧은 간격으로 input 이벤트가 발생하면 debounce 함수의 콜백 함수는
    // 호출되지 않다가 300ms 동안 input 이벤트가 더 이상 발생하지 않으면 한 번만 호출된다.
    $input.oninput = debounce(e => {
        $msg.textContent = e.target.value;
    }, 300);
</script>
</body>
</html>
```
* input 이벤트는 값을 입력할 때마다 연속해서 발생함   
  만약 input의 이벤트 핸들러에서 Ajax 요청과 같은 무거운 처리 수행 시 서버에도   
  부담을 주므로 사용자가 입력을 완료했을 때 한 번만 Ajax 요청을 전송하는 것이 바람직함
  
* 일정 시간 동안 텍스트 입력 필드에 값을 입력하지 않으면 입력이 완료된 것으로 간주  
  debounce 함수가 반환한 함수는 debounce 함수에 두 번째 인수로 전달한 시간(delay)보다    
  짧은 간격으로 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정함   
  
  따라 delay보다 짧은 간격으로 이벤트가 연속해서 발생하면 debounce 함수의 첫 번째 인수로   
  전달한 콜백 함수는 호출되지 않다가 delay 동안 input 이벤트가 더 이상 발생하지 않으면 한 번만 호출됨
  
* 디바운스는 resize 이벤트 처리나 input 요소에 입력된 값으로 ajax 요청하는   
  입력 필드 자동완성UI 구현, 버튼 중복 클릭 방지 처리 등에 유용하게 사용됨
  
* 실무에서는 Underscore의 debounce 함수나   
  Lodash의 debounce 함수 사용을 권장함
  

### 3-2. 스로틀
스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해   
일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만듬

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            width: 300px;
            height: 300px;
            background-color: rebeccapurple;
            overflow: scroll;
        }

        .content {
            width: 300px;
            height: 1000vh;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content"></div>
</div>
<div>
    일반 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
    <span class="normal-count">0</span>
</div>
<div>
    스로틀 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
    <span class="throttle-count">0</span>
</div>
<script>
    const $container = document.querySelector('.container');
    const $normalCount = document.querySelector('.normal-count');
    const $throttleCount = document.querySelector('.throttle-count');
    
    const throttle = (callback, delay) => {
        let timerId;
        // throttle 함수는 timerId를 기억하는 클로저를 반환한다.
        return event => {
        // delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
        // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정한다.
        // 따라서 delay 간격으로 callback이 호출된다.
            if (timerId) return;
            timerId = setTimeout(() => {
                callback(event);
                timerId = null;
            }, delay, event);
        };
    };
    
    let normalCount = 0;
    $container.addEventListener('scroll', () => {
        $normalCount.textContent = ++normalCount;
    });
    
    let throttleCount = 0;
    // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다.
    $container.addEventListener('scroll', throttle(() => {
        $throttleCount.textContent = ++throttleCount;
    }, 100));
</script>
</body>
</html>
```
* 짧은 시간 간격으로 연속 발생하는 이벤트의 과도한 이벤트 핸들러의 호출을 방지하기 위해    
  throttle 함수는 이벤트를 그룹화 해 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만듬
  
* throttle 함수가 반환한 함수는 throttle 함수에 두 번째 인수로 전달한 시간(delay)이   
  경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가 delay 시간이 경과했을 때   
  이벤트가 발생하면 콜백 함수를 호출하고 새로운 타이머를 재설정함   
  따라 delay 시간 간격으로 콜백 함수가 호출됨
  
* scroll 이벤트 처리나 무한 스크롤 UI 구현 등에 유용하게 사용됨

* 실무에서는 Underscore의 throttle 함수나 Lodash의 throttle 함수 사용을 권장






