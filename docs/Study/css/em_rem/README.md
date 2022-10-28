---
title : em & rem    
date : 2021.07.20
---

# em & rem
css 사이즈 단위 중 상대적 크기를 명시하는 em, rem 


## em
기준 : 상위 요소 (상위 요소 크기의 몇 배인지)  
ex) `font-size : 2em` = 상위 요소 텍스트 크기의 2배로 설정  
```html
<html>
    <head>
        <style>
            html {font-size:14px}
            body {font-size:12px}
            .text {font-size:2em} /*body 태그 폰트 사이즈의 2배 = 24px*/
        </style>
    </head>
    <body>
    <p class="text">hello my name is ---</p>
    </body>
</html>
```


## rem
기준 : html 요소 (html 요소 크기의 몇 배인지)  
ex) `font-size : 2rem` = html 텍스트 크기의 2배로 설정  
```html
<html>
    <head>
        <style>
            html {font-size:14px}
            body {font-size:12px}
            .text {font-size:2em} /*html 태그 폰트 사이즈의 2배 = 28px*/
        </style>
    </head>
    <body>
    <p class="text">hello my name is ---</p>
    </body>
</html>
```
