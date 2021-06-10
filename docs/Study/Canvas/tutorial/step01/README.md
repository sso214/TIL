---
title : 캔버스 기본 사용법  
date : 2021.06.08
---

## canvas란?

canvas란 HTML5의 엘리먼트로, 웹페이지에서 그래픽을 그릴 때 사용하는 컨테이너를 뜻함.  
`<canvas>`요소에는 width / height 속성이 존재함.   
<br>
width / height 설정하지 않았을 시 default 값 :  
`width = 300px, height = 150px`  
<br>
렌더링하는 동안 이미지는 레이아웃 크기에 맞게 조정되기 떄문에    
초기 캔버스의 비율을 고려하지 않고 css 크기 지정 시 왜곡되어 노출됨.
> 왜곡되어 보이는 경우 css를 사용하지 않고 `<canvas>`의 width / height 속성 지정 추천
<br>

- 스크립트 내 구분이 용이하도록 global HTML attributes 중 하나인 id 속성을 지정해주는게 좋음.
- `<canvas>`요소에 스타일 적용 가능하지만, 캔버스 위에 그리는 것에는 스타일이 적용되지 않음.  
  캔버스에 따로 스타일링이 지정되지 않으면 투명으로 설정됨

<br>

## canvas 대체 콘텐츠

인터넷 익스플로러 9 이하 같은 오래된 브라우저들은   
`<cavnas>` 요소를 지원하지 않으므로 대체 컨텐츠를 제공해야 함.

```html

<canvas id="sample" width="200" height="200">
    <!--  여기 안에 대체 컨텐츠 삽입-->
    <!--  대체 컨텐츠 필요 없을 시 생략 가능-->
    <img src="img/sample.png" width="200" height="200" alt="sample"/>
</canvas>
```

캔버스를 지원하는 브라우저는 내부 대체 콘텐츠를 무시하며,   
캔버스를 지원하지 않는 브라우저는 컨테이너를 무시하고 canvas 내부의 대체 콘텐츠를 렌더링함.  
이런 대체 콘텐츠 특성 때문에 `<canvas>`는 `<img>` 태그와 달리 꼭 닫는 태그`</canvas>`가 필요함.

<br>

## canvas 초기 세팅

canvas로 그리기 위한 최소한의 템플릿 세팅  
결과 : 비어있는 화면 노출

```js
// js
function draw() {
    let canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
    }
}
```

```html
<!--html-->
<body onload="draw();"> <!-- 페이지 로딩 완료 후 한번 실행 -->
<canvas id="sample" width="200" height="200"></canvas>
</body>
```

<br>

## canvas 그리는 순서

<br>
1. 캔버스 객체 불러오기

```html
<!-- html : 자바스크립트에서 태그에 접근 가능하도록 id 부여-->
<canvas id="sample" width="200" height="200"></canvas>
```

```js
// js : <canvas> 요소를 표시할 DOM 검색
var canvas = document.getElementById('sample');
```

<br>

2. 캔버스 객체로부터 렌더링 컨텍스트 가져오기  
   도화지에 그림을 그리기 위해 연필을 잡는 것처럼 비어있는 캔버스에 그려넣기 위해서는  
   스크립트가 랜더링 컨텍스트에 접근해야 함.  
   canvas 요소는 getContext() 메서드를 이용해 렌더링 컨텍스트와 그리기 함수들을 사용 가능함.

```js
let ctx = canvas.getContext("2d"); // 렌더링 컨텍스트 타입을 지정하는 파라메터를 가짐
// 컨텍스트 종류에 따라 그릴 수 있는 형태가 달라짐. 2d = 2차원, 3d = 3차원.
// (*실제로 3d 렌더링 기능을 지원하진 않음)  
```

<br>

3. canvas 지원 여부 체크  
   `getContext()` 메소드 존재 여부로 canvas 프로그래밍 지원 여부를 확인할 수 있음.

```js
let canvas = document.getElementById('sample');

if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    // 지원하는 경우 코드
} else {
    // 지원하지 않는 경우
}
```

<br>

4. 렌더링 컨텍스트의 메서드 및 속성을 이용해 렌더링

```js
// js
function draw() {
    let canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // fillStyle : 색 지정
        // fillRect() : 사각형 렌더링

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 50, 50);
    }
}
```

```html
<!--html-->
<body onload="draw();">
<canvas id="sample" width="200" height="200"></canvas>
</body>
```

<br>
<br>

> ### Reference  
> [캔버스(Canvas) 기본 사용법](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage)  
> [그래픽 처리 - 캔버스의 기초 / 렌더링 컨텍스트](https://cherryopatra.tistory.com/92)
