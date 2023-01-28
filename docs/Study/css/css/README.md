---
title : 유용하게 써먹을 예정인 CSS     
date : 2021.07.20
---

# 유용하게 써먹을 예정인 CSS 
2021.07.20

티스토리나 velog에 올라온 간단한 코드들을 보다 보니 생각보다 모르고 있었던 css 속성들이 많이 보였다.  
꽤 오랫동안 css를 사용해왔는데 모르고 있는게 많구나 싶어 잘 정리해놓고 유용하게 써먹을 예정이다.    
역시 이것저것 많이 봐야 내가 어떤 걸 모르고 있는지도 알게 되는 것 같다.  

<br>

## pointer-events
`opacity` 속성을 이용해 이벤트가 존재하는 요소를 숨겼을 경우,   
요소는 보이지 않지만 해당 요소 자리를 클릭 시 이벤트가 발생함.  
이를 제어하기 위해서 유용하게 사용하는 속성이 `pointer-events`.  
pointer-events 속성은 11개의 속성값을 가지지만 아래 세가지 속성값을 제외하고는 SVG 에서만 사용.
* none : HTML 요소에 정의된 이벤트, hover / active 등의 상태, 커서 옵션 등이 비활성화 됨  
* auto : pointer-events 속성 지정하지 않은 것처럼 작동    
* inherit : 부모 요소로부터 pointer-events 값 상속받음  
```css
.hidden {
    opacity: 0;
    pointer-events: none;
}
```

## css Variables
css에서는 전역 또는 지역 범위의 변수 사용이 가능함.  
색상을 쉽게 변경할 수 있고, 코드를 더 읽기 쉽게 만듬  
```html
<style>
    :root {
        --mainColor: skyblue;
        --textColor: #666;
    }
    .wrap {
        --textColor: red;
    }
    .text {
        color: var(--textColor);
        background-color: var(--mainColor);
    }
</style>

<div class="wrap">
    <p class="text">hello</p> <!--color: red-->
</div>
<p class="text">hello</p> <!--color: #666-->
```

<br>
<br>

> ### Reference
> * [MDN CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
> * [w3schools CSS](https://www.w3schools.com/css)
