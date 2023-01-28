---
title : CSS의 단위       
date : 2021.07.20
---

# CSS의 단위
2021.07.20

## em
* 현재 요소의 상위 요소에 지정한 font-size를 기준으로 사이즈가 설정됨 
* 중첩된 상위 요소에 따라 사이즈가 달라질 수 있음
```html
<style>
    html {font-size: 14px}
    body {font-size: 12px}
    div {font-size: 2em}  /*12px * 2 = 24px;*/
</style>

<body>
    <div>Test</div>
</body>
```

## rem
* root em
* 최상위 요소에 지정한 font-size를 기준으로 사이즈가 설정됨  
  (보통 최상위 단위는 html 태그)
```html
<style>
    html {font-size: 14px}
    body {font-size: 12px}
    div {font-size: 2em}  /*14px * 2 = 28px;*/
</style>

<body>
<div>Test</div>
</body>
```

## vh & vw
* vertical height & vertical width
* 뷰포트의 너비값과 높이값이 기준  
* vh = 뷰포트 높이값의 100분의 1의 단위
* vw = 뷰포트 넓이값의 100분의 1의 단위
```
.slide {
    width: 100vw; //스크린 너비값에 꽉 맞음
    height: 100vh; //스크린 높이값이 꽉 맞음
}
```

## vmin & vmax
* 너비값과 높이값에 따라 최대/최소값 지정
* 브라우저의 크기가 1100px * 700px 일 경우,  
  1vmin = 7px  
  1vmax = 11px
* 브라우저의 크기가 800px * 1080px 일 경우,  
  1vmin = 8px  
  1vmax = 10.8px
```css
.box {
    height: 100vmin;
    width: 100vmin;
} /*화면 양 변에 가득차는 정사각형 요소가 만들어짐*/
```


## Reference
* [CSS의 7가지 단위 - rem, vh, vw, vmin, vmax, ex, ch](https://webclub.tistory.com/356)
