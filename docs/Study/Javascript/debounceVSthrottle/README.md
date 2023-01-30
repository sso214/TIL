---
title: Debounce VS Throttle  
date: 2023.01.30
---

# Debounce VS Throttle  
2023.01.30


## Debounce
* 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음 함수)만 호출하도록 하는 것
* 주로 검색 이벤트 등에서 많이 사용됨
```js
function debounce(callback, limit) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', debounce(function(e) {
  console.log(e.target.value);
}, 500));
```


## Throttle
* 마지막 함수가 호출된 후 일정 시간이 지나기 전에는 다시 호출되지 않도록 하는 것
* 주로 스크롤 이벤트 또는 마우스 이벤트 등에서 성능 최적화시에 많이 사용됨
```js
function throttle(callback, limit = 100) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => waiting = false, limit);
    }
  }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', throttle(function(e) {
  console.log(e.target.value);
}, 500));
```


## Reference
* (자바스크립트: Debounce, Throttle 순수 자바스크립트 (Vanilla JS)로 구현)[http://yoonbumtae.com/?p=3584]
* (쓰로틀링과 디바운싱)[https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa]
