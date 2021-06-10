---
title : 도형 그리기  
date : 2021.06.09
---

## 그리드
`canvas`는 default 로 가로 150, 세로 150의 기본 그리드를 가지고 있음.  
그리드의 원점은 좌측상단(0, 0)이며, 모든 요소들은 원점을 기준으로 위치함.  
> 그리드 1단위 = 캔버스 1px

`canvas`는 직사각형만을 제공함.  
다른 도형들은 하나 이상의 path와 여러 점으로 이어진 선으로 만들어짐.  
(path drawing function 을 이용해 여러 도형들을 그릴 수 있음)

<br>

## Path methods
개체 경로 설정 시 사용하는 함수

* `beginPath()` :  
  하위 경로 목록 비우고 새 경로 생성. (경로 생성 후에 그리기 명령들은 경로를 구성하고 만드는데 사용됨)

* `closePath()` :  
  포인트가 하위 경로 시작 부분으로 이동함. 현재 지점에서 시작 지점까지 직선 그림.  
  *모양이 이미 닫혀있거나 점이 하나뿐인 경우 아무 작업도 수행하지 X

* `moveTo(x, y)` :  
  새 하위 경로 시작점을 (x,y) 좌표로 이동

* `lineTo(x, y)` :  
  현재 하위 경로 마지막 점을 (x,y) 좌표에 직선으로 연결

* `bezierCurveTo()` :  
  현재 경로에 3차 베지어 곡선 추가

* `quadraticCurveTo()` :  
  현재 경로에 2차 베지어 곡선 추가

* `arc(x, y, radius, startAngle, endAngle [, counterclockwise])` :  
  (x, y) 좌표의 중심점과 radius 반지름을 가진 원을 생성함.  
  startAngle : 원의 시작점, endAngle : 원의 끝점.  
  counterclockwise(option, default:false) : false(시게방향), true(시계반대방향)

* `arcTo(x1, y1, x2, y2, radius)` :  
  직선으로 이전 점에 연결된 제어점 및 반지름을 사용해 현재 경로에 원 추가.  
  x1 : 첫번째 제어점의 X 좌표  
  y1 : 첫번째 제어점의 y 좌표  
  x2 : 두번째 제어점의 X 좌표  
  y2 : 두번째 제어점의 y 좌표   
  radius : 호의 반경 (음수 X)

* `ellipse()` :  
  현재 경로에 타원형 원 추가

* `rect()` :  
  width, height 크기로 (x,y) 좌표에 사각형의 경로 생성

* `stroke()` :  
  윤곽선 이용해 도형 그림

* `fill()` :  
  경로의 내부 채워짐 = 내부 채워진 도형


<br>

## 직사각형 그리기
path 함수와 달리 캔버스에 바로 그릴 수 있음.  
* `fillRect(x, y, width, height)`
  
* `clearRect(x, y, width, height)`
  
* `strokeRect(x, y, width, height)`
```js
function draw() {
    const canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillRect(25, 25, 100, 100); // 색이 채워진 직사각형 그림
        ctx.clearRect(45, 45, 60, 60); // 특정부분을 투명으로 지우는 직사각형 그림
        ctx.strokeRect(50, 50, 50, 50); // 직사각형의 윤곽선 그림
    }
}
```
<br>


## 경로 그리기
`path`(경로)는 직사각형 외 유일한 원시적 도형.  
점들의 집합이며, 선의 한 부분으로 연결되어 도형, 곡선을 이루고 두께와 색 나타냄  
경로, 하위 경로는 닫힐 수 있음.

1. 경로 생성
2. 그리기 명렁어로 경로상에 그림
3. 한번 경로가 만들어지면 렌더링하기 위해 윤곽선을 그리거나 도형을 채울 수 있음.  


<br>


## 삼각형 그리기
```js
function draw() {
    const canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath(); // 하위 경로 초기화 및 새로운 경로 생성
        /*
        * 열린 path가 비어있는 경우 (beginPath() 메소드를 사용한 직후 및 캔버스 생성 직후) 첫 경로 생성 명령은
        * 실제 동작과 상관없이 moveTo()로 작동됨.
        * 때문에 경로 초기화 직후에는 항상 시작 위치 설정하는 것이 좋음.
        * */
        ctx.moveTo(70, 50); // 시작점을 (x,y) 좌표로 이동
        ctx.lineTo(100, 75); // 현재 하위 경로 마지막 점을 (x,y) 좌표에 직선으로 연결
        ctx.lineTo(100, 25); // 현재 하위 경로 마지막 점을 (x,y) 좌표에 직선으로 연결
        ctx.fill(); // 경로 내부 채우기 (도형 자동으로 닫힘)
        /*
        * closePath() 메소드는 선택적.
        * 현재 점 위치와 시작점 위치를 직선으로 이어 도형을 닫는 메소드인데,
        * 이미 도형이 닫혀있거나 한 점만 존재하면 아무 역할 하지 않음.
        * fill() 메소드는 도형이 닫히지만
        * stroke() 메소드는 도형이 닫히지 않음
        * */
    }
}
```

<br>

## 스마일 그리기
```js
function draw(){
    const canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath(); // 시작점 생성
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true); // (100, 100) 좌표가 중심점이고 반지름이 50인 원 생성

        ctx.moveTo(35, 45); // (35, 45)로 좌표 이동
        ctx.arc(30, 45, 5, 0, Math.PI * 2); // (30, 45)위치에 반지름이 5인 원 생성

        ctx.moveTo(32, 45);
        ctx.arc(30, 45, 2, 0, Math.PI * 2, false);

        ctx.moveTo(73, 45);
        ctx.arc(68, 45, 5, 0, Math.PI * 2);

        ctx.moveTo(70, 45);
        ctx.arc(68, 45, 2, 0, Math.PI * 2, true);

        ctx.moveTo(60, 55);
        ctx.arc(50, 55, 10, 0, Math.PI);
        
        ctx.stroke();
    }
}
```

<br>

## 윤곽선 삼각형과 색칠된 삼각형 그리기
```js
function draw(){
    const canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();

        ctx.moveTo(10, 10);
        ctx.lineTo(50, 50);
        ctx.lineTo(10, 50);
        ctx.fill();

        ctx.moveTo(15, 10);
        ctx.lineTo(55, 10);
        ctx.lineTo(55, 50);
        ctx.closePath();
        ctx.stroke();
    }
}
```

<br>

## arcTo
두 개의 직진 세그먼트 상상. 원은 두 세그먼트에 접함
```js
function draw(){
    const canvas = document.getElementById('sample');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();

        ctx.strokeStyle = 'skyblue';
        ctx.moveTo(200, 20);
        ctx.lineTo(200, 130);
        ctx.lineTo(50, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'skyblue';
        ctx.lineWidth = 5;
        ctx.moveTo(200, 20);
        ctx.arcTo(200, 130, 50, 20, 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'pink';
        ctx.arc(200, 20, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'hotpink';
        ctx.arc(200, 130, 5, 0, 2 * Math.PI);
        ctx.arc(50, 20, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}
```



> ### Reference
> * [캔버스(canvas)를 이용한 도형 그리기](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
