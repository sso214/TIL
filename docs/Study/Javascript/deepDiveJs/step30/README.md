---
title : 30장. Date
date : 2022.06.16
---

# 30장. Date
* 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수
* UTC(협정 세계시)는 국제 표준시를 말함  
  UTC는 GMT(그리니치 평균시)로 불리기도 함  
  UTC와 GMT는 초의 소수점 단위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용됨   
  기술적인 표기에서는 UTC가 사용됨   
* KST(한국 표준시)는 UTC에 9시간을 더한 시간 (즉, KST는 UTC보다 9시간이 빠름)
* 현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 결정됨

## 1. Date 생성자 함수
* Date는 생성자 함수  
  Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖음   
  이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로   
  Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타냄.   

* Date 생성자 함수로 생성한 Date 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가짐   
  현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우   
  Date 생성자 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 지정함   
  Date 생성자 함수로 객체를 생성하는 방법은 다음과 같이 4가지가 있음

### 1-1. new Date()
* Date 생성자 함수를 인수 없이 new 연산자와 함께 호출 시   
  현재 날짜와 시간을 가지는 Date 객체를 반환함   
  Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만   
  Date 객체를 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력함
    ```js
    new Date(); // Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)
    ```
* Date 생성자 함수를 new 연산자 없이 호출 시   
  Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환함
    ```s
    Date(); // "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"
    ```j

### 1-2. new Date(milliseconds) 
* Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달 시   
  1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼   
  경과한 날짜와 시간을 나타내는 Date 객체를 반환함
```js
// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.
new Date(0); // Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)

/*
86400000ms는 1day를 의미한다.
1s = 1,000ms
1m = 60s * 1,000ms = 60,000ms
1h = 60m * 60,000ms = 3,600,000ms
1d = 24h * 3,600,000ms = 86,400,000ms
*/
new Date(86400000); // Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```


### 1-3. new Date(dateString)

### 1-4. new Date(year, month[, day, hour, minute, second, millisecond])


## 2. Date 메서드

### 2-1. Date.now

### 2-2. Date.parse

### 2-3. Date.UTC 

### 2-4. Date.prototype.getFullYear

### 2-5. Date.prototype.setFullYear

### 2-6. 30.2.6 Date.prototype.getMonth

### 2-7. Date.prototype.setMonth

### 2-8. Date.prototype.getDate

### 2-9. Date.prototype.setDate 

### 2-10. Date.prototype.getDay

### 2-11. Date.prototype.getHours

### 2-12. Date.prototype.setHours

### 2-13. Date.prototype.getMinutes 

### 2-14. Date.prototype.setMinutes

### 2-15. Date.prototype.getSeconds

### 2-16. Date.prototype.setSeconds

### 2-17. Date.prototype.getMilliseconds 

### 2-18. Date.prototype.setMilliseconds

### 2-19. Date.prototype.getTime

### 2-20. Date.prototype.setTime

### 2-21. Date.prototype.getTimezoneOffset

### 2-22. Date.prototype.toDateString

### 2-23. Date.prototype.toTimeString

### 2-24. Date.prototype.toISOString

### 2-25. Date.prototype.toLocaleString

### 2-26. Date.prototype.toLocaleTimeString


## 3. Date를 활용한 시계 예제

