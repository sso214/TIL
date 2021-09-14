---
title : 클로저  
date : 2021.09.10
---

# Closures
**클로저란?**  
함수와 함수가 선언된 어휘적 환경의 조합  

```js
function init(){
    var name = "Mozilla"; //init에 의해 생성된 지역 변수
    function displayName(){ //내부 함수이며 클로저.
        alert(name); //부모 함수에서 선언된 변수 사용
    }
    displayName();
}
init();

function makeFunc(){
    var name = "Mozilla";
    function displayName(){
        alert(name);
    }
    return displayName;
}
var myFunc = makeFunc(); //myFunc 변수에 displayName 리턴 (유효범위의 어휘적 환경 유지)
myFunc(); //리턴된 displayName 함수 실행 (name 변수에 접근)
// 위 코드와 동일한 결과 실행
```


<br>
<br>
<br>

> ### Reference    
> * [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
