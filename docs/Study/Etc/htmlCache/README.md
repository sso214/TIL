---
title : meta 태그 이용해서 캐시 삭제하기  
date : 2021.06.25
---

# meta 태그 이용해서 캐시 삭제하기
2021.06.25

웹사이트를 수정 후에 배포해도 남아있는 캐시 때문에   
수정하기 전의 기존 화면이 노출되는 경우가 있어서 캐시 초기화하는 방법을 찾아봤다.  
간편하게 meta 태그를 이용해 캐시 삭제하는 방법이 있었다.   

<br/>

```html
<!--입력된 날짜 이후부터 페이지가 캐싱되지 않음 (1997 ~ )-->
<meta http-equiv="Expires" content="Mon, 06 Jan 1997 00:00:01 GMT">

<!--캐시된 페이지가 만료되어 삭제되는 시간을 정의 (기본적으로 -1로 설정 : 캐시된 페이지 즉시 만료)-->
<meta http-equiv="Expires" content="-1">

<!--페이지 로드시마다 페이지 캐싱 X (HTTP 1.0)-->
<meta http-equiv="Pragma" content="no-cache">

<!--페이지 로드시마다 페이지 캐싱 X (HTTP 1.1)-->
<meta http-equiv="Cache-Control" content="no-cache">
```

## Reference
* [캐싱을 방지하는 방법](https://docs.microsoft.com/ko-kr/troubleshoot/browsers/how-to-prevent-caching)
* [Cache-Control](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Cache-Control)
