---
title : CSS in 2022
date : 2022.10.28
---

# CSS in 2022

## Google I/O
- 구글이 미국 캘리포니아주 샌프란시스코에서 한 해에 한 번 개최하는 개발자 지향 컨퍼런스
- **I/O** : input/ouput, **I**nnovation in the **O**pen (개방적인 혁신)
- 구글의 개방형 웹 기술에 대한 심도 있는 세션을 제공  
  (웹, 모바일, 엔터프라이즈 애프리케이션 작성, 안드로이드, 크롬, 크롬 OS, 구글 API, 구글 웹 툴킷, 앱 엔진)
- 구글 I/O에서 새로운 CSS 기능을 발표함


## Interop 2022
- 새롭게 추가되는 CSS 기능이 주요 브라우저에서 빠르게 지원이 가능한 이유는
  “[Interop](https://web.dev/interop-2022/)" 프로젝트 때문
- 2019년부터 Mozilla, Google, Microsoft 등 주요 브라우저 회사들이 모여 브라우저의 표준안과
  호환성을 위해 함께 노력해서 개발해 나가는 팀
- 2022년에도 모여 (Apple, Bocoup, Google, Igalia, Microsoft, Mozilla) 2022년도까지
  새로운 기능을 추가하고 지원하겠다고 약속함


## 2022 새롭게 추가된/될 CSS

### Cascade layers
- 지원 브라우저 : chrome(99), firefox(97), edge(99), safari(15.4)
- layer 단위로 우선순위 지정이 가능함 (스타일링의 순서를 심플하게 만들어줌)

#### CSS Cascade
- CSS가 요소에 적용하려는 스타일에 우선순위를 정하는데 사용하는 알고리즘
- 어떤 스타일을 적용할지 결정하기 위해 몇 가지 기준을 고려함 (높은 순 → 낮은 순)
  1. Origin and Importance
  2. Context
  3. Style Attribute
  4. Specificity(명시도)
  5. Order of Apperance(작성 순서)
  <br>
  <br>
  - CSS가 어디에서 선언되었는지 (중요도) : head 요소 내 style이 link로 된 CSS보다 우선순위 높음
  - 대상을 명확하게 지정할수록 (명시도) : !important emd
  - 작성 순서 : 늦게 선언된 스타일이 우선 적용됨

#### 문제
- 선택자를 과다하게 사용할 경우, 속성 재정의 시 더 무거운 선택자의 사용이나 !important 사용해야 함  
  (important 사용 시 에러 발생 가능성 높고 유지보수 어려워짐)
- 선택자를 적게 사용할 경우, 나중에 사용하는 명령문으로 너무 쉽게 덮어쓸 수 있음

#### Cascade layers
- CSS Cascade기준에서 Layers 라는 새로운 기준을 추가함
  1. Origin and Importance
  2. Context
  3. Style Attribute
  4. Layers
  5. Specificity(명시도)
  6. Order of Apperance(작성 순서)
- Layers 기준 내에서 스타일의 우선권이 정해지면   
  Cascade는 해당 스타일에 대한 명시도와 작성 순서를 **더 이상 체크하지 않음**
- Cascade Layers를 사용하여 CSS를 여러 레이어로 분할 가능하며 적용할 레이어 순서를 정할 수 있음
    ```css
    /* Cascade Layers 선언 예시 코드 */
    /* 레이어 순서 정의 - 1. reset, 2. base, 3. theme */
    @layer reset, base, theme;
    
    /* 첫번째 레이어 “reset” */
    @layer reset { … }
    
    /* 2번째 레이어 “base” */
    @layer base { … }
    
    /* 3번째 레이어 “theme” */
    @layer theme { … }
    ```
- layer 이름을 재사용할 경우 기존 레이어에 스타일이 추가됨
    ```css
    @import reset, defaults, patterns, components, utilities, overrides; //레이어 순서 정함
    
    @import url('framework.css') layer(components.framework); //프레임워크 스타일을 한 레이어에 모아둠
    
    //레이어별로 스타일링
    @layer utilities {
        [data-color='brand'] {
            color: var(--barnd, rebeccapurple);
        }
    }
    
    @layer defaults {
        a:any-link {color: maroon;}
    }
    ```

### Container queries
- 지원 브라우저 : 현재는 실험 모드로만 가능
- 뷰포트가 아닌 요소가 들어있는 부모 컨테이너 사이즈를 기반으로 반응적 디자인 가능
- 미디어쿼리와 컨테이너 쿼리 차이점
  - 미디어 쿼리 : 뷰포트 크기에 따라 스타일 변경 가능  
    (윈도우 전체적인 사이즈를 기반으로 윈도우 사이즈가 변경되야만 아이템 재배치 가능)
  - 컨테이너 쿼리 : 부모 컨테이너 사이즈에 따라 스타일 변경 가능  
    (각각 개별적인 부모 요소에 의거해 부모 사이즈가 변경되면 아이템 재배치 가능)
- 유용한 이유 :
  컴포넌트로 분리하는 것처럼 개별적으로 반응형 디자인 가능   
  → 독립적인 컴포넌트, 재사용 가능, 유지보수성 높아짐
```css
.card-holder {
    container-type: inline-size; /* size, inline-size */
    container-name: card-holder; /* 쿼리 컨테이너 이름 지정 */
}

.card {
    display: flex;
    flex-direction: row;
}

@container card-holder (max-width: 200px) {
	.card {
		flex-direction: column;
	}
}
```

### accent-color
- 지원 브라우저 : chrome(93), firefox(92), edge(93), safari(15.4)
- input 요소에 색 지정 가능 (checkbox, radio, range, progress)
- 컴포넌트가 위치한 배경 색상에 따라서 그와 대비되는 색상을   
  자동적으로 스타일링 해주기 때문에 웹 접근성도 알아서 처리를 해줌
```css
/* tint everything */
:root {
  accent-color: hotpink;
}

/* tint one element */
progress {
  accent-color: indigo;
}
```

### hwb
- 지원 브라우저 : chrome(101), firefox(96), edge(101), safari(15)
- Hue, Whiteness, Blackness (색조, 백색도, 흑색)  
  주어진 색상을 색조, 백색도, 흑색도에 따라 표현  
  (선택적 알파 구성 요소는 색상의 투명도 - 이전 색상 함수와 값을 구분하기 위해 슬래시(`/`)를 사용)
- 인간 친화적인 색상 표현 방식으로 나타남
```css
hwb(194 0% 0%) /* #00c3ff */
hwb(194 0% 0% / .5) /* #00c3ff with 50% opacity */
```

### Color Functions

#### Relative Color Syntax
- 지원 브라우저 : chrome(x), firefox(x), edge(x), safari(15)
- 모든 색상을 조작하고 모든 형식으로 변환 가능
```css
/* 기존의 색 값을 지정 - hex값 */
:root {
  --theme-primary: #8832CC;
}

/* hex값을 hsl형식으로 변환, 밝기 값만을 30%로 수정 */
.bg-primary {
  background-color: hsl(from var(--theme-primary) h s 30%);
}
```

#### color-mix()
- 지원 브라우저 : chrome(x), firefox(88), edge(x), safari(15)
- 주어진 색상 공간에서 두 가지 색상 혼합 가능
```css
.color-mix-example {
  --brand: #0af;

  --darker: color-mix(var(--brand) 25%, black);
  --lighter: color-mix(var(--brand) 25%, white);
}
```

#### color-contrast()
- 지원 브라우저 : chrome(x), firefox(x), edge(x), safari(15)
- 값을 가져와 "color"다른 값 목록과 비교해 목록 "color"에서 대비가 가장 높은 값을 선택
```css
color-contrast(wheat vs tan, sienna, #d2691e)
color-contrast(#008080 vs olive, var(--myColor), #d2691e)}

/* --theme-primary와 비교하여 white, black, grey중 대비가 좋은 것을 선택 */
.text-contrast-primary {
  color: color-contrast(var(--theme-primary) vs white, black, grey);
}
```

### inert
- 지원 브라우저 : chrome(102), firefox(81), edge(102), safari(15.5)
- inert가 존재하는 경우 요소에 대한 사용자 입력 이벤트를 무시하게 함
```html
<div>
  <label for="button1">Button 1</label>
  <button id="button1">I am not inert</button>
</div>
<div inert>
	<!-- cannot be keyboard focused or clicked -->
  <label for="button2">Button 2</label>
  <button id="button2">I am inert</button>
</div>
```

### Viewport Units
뷰포트 유닛으로 작업할 경우 iOS의 safari에서 vh 단위가 제대로 동작하지 않는 버그가 있었음  
→ 모바일 safari는 100vh를 계산할 때 UI의 일부를 무시하는 경우 있음  
이를 해결하기 위해 새로운 뷰포트 단위가 추가됨  

- dvh / dvw : **Dynamic viewport** 높이 / 너비의 1%
- lvh / lvw : **Large viewport** 높이 / 너비의 1%
- svh / svw : **Short viewport** 높이 / 너비의 1%

* Dynamic Viewport :
  - 모든 UA 인터페이스를 동적으로 고려하는 뷰포트 크기
  - 표시되는 UA 인터페이스 요소에 따라 자동으로 조정됨
  - 값은 100lvh(최대) 및 100svh(최소)의 내에 있음
* Large Viewport : 
  - 접기 위해 동적으로 확장 및 접히는 UA 인터페이스(예: 주소 표시줄)를 가정한 뷰포트 크기
* Short Viewport :
  - 확장하기 위해 동적으로 확장되고 접히는 모든 UA 인터페이스(예: 주소 표시줄)를 가정한 뷰포트 크기

### :has()
- 지원 브라우저 : chrome(x), firefox(x), edge(x), safari(15.4)
- 특정 자식이 있는 부모 요소를 선택 가능
```css
/* img 태그를 하위로 가지고 있는 모든 a 태그 */
a:has(img) { }

/* img 태그를 자식으로 가지고 있는 모든 a 태그 */
a:has(> img) { }

/* h1 ~ h6을 하위로 가지고 있지 않은 모든 section 태그 */
section:not(:has(h1, h2, h3, h4, h5, h6)){ }

/* p를 인접 형제 요소로 가지고 있는 모든 h1 태그 */
h1:has(+ p) {  }
```


## 2022년 이후에 지원될 유용한 CSS

### @nest
- &선택자(Nesting Selector)를 사용해 상위 스타일을 중첩해 선언 가능
- SCSS에서 사용되는 nesting기능을 언젠가 CSS 에도 사용
```css
article {
	color: darkgray;
}

article > a {
	color: hotpink;
}

article > h1 {
	font-size: 2rem;
}


article {
	color: darkgray;

	& > a {
		color: hotpink;
	}

	& > h1 {
		font-size: 2rem;
	}
}
```

### @scope
- 스타일의 범위 지정 가능
- 서로 스타일링이 다른 컴포넌트나 모듈과 충돌이 나지 않게
  스코프라는 이름명으로 감싸주는 기능
- 이름 충돌을 피하기 위해 사용했던 CSS Module 전처리기를 사용하지 않아도 됨
```css
.card__header {
  color: var(--text);
}

/* with @scope becomes */

@scope (.card) {
  header {
    color: var(--text);
  }
}

@scope (.light-theme) {
  a { color: purple; }
}

@scope (.dark-theme) {
  a { color: plum; }
}
```

### Was in min-width or max-width
```css
@media (min-width: 320px) {
  …
}
@media (min-width: 320px) and (max-width: 1280px) {
  …
}

--->

@media (width >= 320px) {
  …
}
@media (320px <= width <= 1280px) {
  …
}
```

<br>
<br>

> ### Reference
> * [STATE OF CSS IO/22](https://web.dev/state-of-css-2022/)
> * [CSS in 2022 번역본](https://wit.nts-corp.com/2022/02/24/6490)
> * [드림코딩 : 새롭게 출시되는 CSS 새기능 정리](https://www.youtube.com/watch?v=jr9imvgVRJM&t=277s)
> * [CSS Cascade Layers 소개](https://wit.nts-corp.com/2022/05/24/6528)
