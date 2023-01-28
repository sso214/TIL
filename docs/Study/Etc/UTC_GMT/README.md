---
title : UTC, GMT  
date : 2021.06.17
---

# UTC, GMT
2021.06.17

datepicker를 사용하다가 GMT나 UTC가 헷갈려서 찾아봤다.  

## GMT
Greenwich Mean Time. 그리니치 표준시  
영국 런던 기점. 웰링턴을 종점으로 설정되는 협정 시계시의 기준시간대  
1972년 1월 1일부터 '협정 세계시'가 공식적 표현이지만 아직 GMT로 널리 쓰임


## UTC
Coordinated Universal Time. 협정 세계시, UTC.   
1972년 1월 1일부터 시행된 국제 표준시.  
UTC는 GMT에 기반함. UTC와 GMT는 초의 소숫점 단위에서만 차이남.  
기술적인 표기에는 UTC 사용되지만 일상에서는 혼용되어 사용  
한국 표준시(KST)는 UTC+09:00임

## GMT -> UTC
```js
let _gmt = new Date(); // GMT
let _utc = new Date(_gmt.getTime() + (_gmt.getTimezoneOffset() * 60000)) // UTC로 변환
```

## Reference
* [UTC, GMT 차이](https://m.blog.naver.com/hyunny333/220177767182)
* [JavaScript GMT 시간 UTC 시간으로 변환하기](https://elena90.tistory.com/entry/Java-Script-GMT-%EC%8B%9C%EA%B0%84-UTC-%EC%8B%9C%EA%B0%84%EC%9C%BC%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B8%B0)
