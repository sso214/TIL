---
title : 타입 추론   
date : 2023.01.22
---

# 타입 추론
* 타입스크립트는 타입 추론을 적극적으로 수행함
* 타입 추론은 수동으로 명시해야 하는 타입 구문의 수를 효울적으로 줄여주기 때문에,  
  코드의 전체적인 안정성이 향상됨
* 숙련된 타입스크립트 개발자는 비교적 적은 수의 구문(중요한 부분에는 사용)을 사용함

## 19. 추론 가능한 타입을 사용해 장황한 코드 방지하기
### 불필요한 타입 선언
* 타입스크립트의 많은 타입 구문은 사실 불필요함.  
  코드의 모든 변수에 타입을 선언하는 것은 비생산적.
    ```ts
    let x1:number = 12;
    let x2 = 12; //이렇게만 작성해도 충분함
    ```
* 타입스크립트가 타입을 추론 가능하다면 타입 구문을 작성하지 않는 게 좋음  
  (해당 타입이 추론되는지 알고 싶다면 편집기를 사용해 확인 가능)
* 타입스크립트는 복잡한 객체도 추론 가능함  
  따라 값에 추가로 타입을 작성하는 것은 거추장스러울 뿐임
* 배열의 경우도 타입스크립트는 입력받아 연산하는 함수가 어떤 타입을 반환하는지 정확히 알고 있음
* 타입스크립트는 예상하는 것보다 더 정확하게 추론하기도 함
    ```ts
    const axis1: string = 'x'; //타입은 string
    const axis2 = 'y'; //타입은 'y'
    ```
* 타입이 추론되면 리팩터링 역시 용이해짐
* 비구조화 할당문은 모든 지역 변수의 타입이 추론되도록 함  
  따라 명시적 타입 구문을 넣을 필요 없음
* 이상적인 타입스크립트 코드는 함수/메서드 시그니처에 타입 구문을 포함하지만,  
  함수 내에서 생성된 지역 변수에는 타입 구문을 넣지 않음  
  타입 구문을 생략해 방해되는 것들을 최소화하고 구현 로직에 집중할 수 있게 작성하는게 좋음
* 함수 매개변수에 기본 값이 있는 경우 타입 구문 생략해도 됨
* 보통 타입 정보가 있는 라이브러리에서 콜백 함수의 매개변수 타입은 자동으로 추론됨

### 타입 선언이 필요한 경우
* 정보가 부족해서 타입스크립트가 스스로 타입을 판단하기 어려운 상황도 일부 있음  
  그럴 때는 명시적 타입 구문이 필요함  
  어떤 언어들은 매개변수의 최종 사용처까지 참고해 타입을 추론하지만,  
  타입스크립트는 최종 사용처까지 고려하지 않음  
  타입스크립트의 타입은 일반적으로 처음 등장할 때 결정됨
* 타입이 추론될 수 있음에도 여전히 타입을 명시하고 싶은 몇 가지 상황이 있음
  * 객체 리터럴 정의 시 타입 명시           
    객체 리터럴을 정의할 때 타입을 명시하면 잉여 속성 체크가 동작함   
    잉여 속성 체크는 특히 선택적 속성이 있는 타입의 오타 같은 오류를 잡는데 효과적임    
    그리고 변수가 사용되는 순간이 아닌 할당하는 시점에 오류가 표시되도록 해줌   
    만약 타입 구문을 제거한다면 잉여 속성 체크가 동작하지 않고,   
    객체를 선언한 곳이 아니라 사용되는 곳에서 타입 오류가 발생함.  
    타입 구문을 제대로 명시한다면 실제로 실수가 발생한 부분에 오류를 표시해줌
  * 함수의 반환에 타입을 명시
    * 타입 추론이 가능하더라도 구현상의 오류가 함수를 호출한 곳까지  
      영향을 미치지 않도록 하기 위해 타입 구문을 명시하는 게 좋음   
      의도된 반환 타입을 명시하면 실수가 발생한 정확한 위치에 오류가 표시됨  
      따라 구현상의 오류가 사용자 코드의 오류로 표시되지 않음
    * 반환 타입을 명시하면 함수에 대해 더욱 명확하게 알 수 있음    
      반환 타입을 명시하려면 구현하기 전 입력과 출력 타입에 대해 알아야함  
      추후 코드가 변경되어도 보통 해당 함수의 시그니처는 쉽게 변경되지 않음  
      따라 미리 타입을 명시하는 방법은 TDD(테스트 주도 개발)과 비슷함  
      전체 타입 시그니처를 먼저 작성하면 구현에 맞춰   
      주먹구구식으로 시그니처가 작성되는 것을 방지하고 제대로 원하는 모양을 얻게 됨
    * 반환 타입을 명시하면 명명된 타입을 사용할 수 있음  
      반환 값을 별도의 타입으로 정의하면 타입에 대한 주석을 작성할 수 있어 더욱 자세한 설명이 가능하며,  
      더욱 직관적이 표현이 됨. 추론된 반환 타입이 복잡해질수록 명명된 타입을 제공하는 이점은 커짐
* linter를 사용한다면 eslint 규칙 중 no-inferrable-types을 사용해  
  작성된 모든 타입 구문이 정말 필요한지 확인 가능함


## 20. 다른 타입에는 다른 변수 사용하기
* 자바스크립트에서는 한 변수를 다른 목적을 가지는 다른 타입으로 재사용해도 됨  
  반면 타입스크립트에서는 오류가 발생함  
  변수의 값은 바뀔 수 있지만 그 타입은 보통 바뀌지 않기 때문  
  (타입을 바꿀 수 있도록 범위를 좁히거나 타입 지정 방법이 있지만 이 방법은 어디까지나 예외)
* 유니온 타입으로 변수의 타입을 확장한다면 더 많은 문제가 생길 수 있음  
  해당 변수를 사용할 때마다 값이 어떤 타입인지 확인해야 하기 때문에 간단한 타입에 비해 다루기 더 어려움  
  따라, 가장 좋은 방법은 별도의 변수를 도입하는 것.
* 변수를 무분별하게 재사용하면 타입 체커와 사람 모두에게 혼란을 줄 수 있으므로  
  서로 관련 없는 변수는 별도의 변수를 만들어 사용하는 것이 좋음

### 다른 타입에는 별도의 변수를 사용하는 것이 바람직한 이유
* 서로 관련이 없는 두 개의 값을 분리함
* 변수명을 더 구체적으로 지을 수 있음
* 타입 추론을 향상시키며, 타입 구문이 불필요해짐
* 타입이 좀 더 간결해짐
* let 대신 const로 변수를 선언하게 됨    
  const로 변수 선언 시 코드가 더 간결해지고 타입 체커가 타입을 추론하기도 좋음

<br>

따라 타입이 바뀌는 변수는 되도록 피해야 하며,  
목적이 다른 곳에는 별도의 변수명을 사용해야 함

### 재사용되는 변수와 가려지는 변수
지금까지 이야기한 재사용되는 변수와 가려지는 변수를 혼동해서는 안됨
```ts
const id = '12-34-56';
fetchProduct(id);

{
  const id = 123456; //정상
  fetchProductBySeriaNumber(id); //정상
}
```
* 여기서 두 id는 이름은 같지만 서로 아무런 관계가 없음    
  그러므로 각기 다른 타입으로 사용되어도 문제 없음
* 하지만 동일한 변수명에 타입이 다르다면,   
  타입스크립트 코드는 잘 동작하지 몰라도 사람에게 혼란을 줄 수 있음
* 고로 목적이 다른 곳에는 별도의 변수명을 사용해야 함
* 많은 개발팀이 린터 규칙을 통해 '가려지는' 변수를 사용하지 못하도록 하고 있음


## 21. 타입 넓히기
* 런타임에 모든 변수는 유일한 값을 가지지만  
  타입스크립트 정적 분석 시점에 변수는 '가능한' 값들의 집합인 타입을 가짐
* 상수를 사용해 변수를 초기화할 때 타입을 명시하지 않으면 타입 체커는 타입을 결정해야 함  
  즉, 지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유츄해야 한다는 뜻
* 타입스크립트에서는 이런 과정을 '넓히기'라고 부름
* 넓히기의 과정을 이해하면 오류의 원인을 파악하고 타입 구문을 더 효과적으로 사용할 수 있음


### 타입 넓히기란?
```ts
interface Vercor3 { x: number; y: number; z: number }
function getComponent(vector: Vercor3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
} //런타임에 오류 없이 실행되지만 에디터에서는 오류가 표시됨

let x = 'x';
let vec = { x:10, y:20, z:30 };
getComponent(vec, x); //Error: 'string' 형식의 인수는 '"x"| "y"| "z"형식의 매개변수에 할당될 수 없습니다.'
```
* getComponent 함수는 두 번째 매개변수에 `'x' | 'y' | 'z'` 타입을 기대했지만,   
  x의 타입은 할당 시점에 넓히기가 동작해서 string으로 추론됨    
  string 타입은 `'x' | 'y' | 'z'` 타입에 할당 불가능하므로 오류 발생한 것
* 타입 넓히기가 진행될 때, 주어진 값으로 추론 가능한 타입이 여러 개이기 때문에 과정이 모호함  
  `const mixed = ['x', 1];` 여기서 mixed의 타입이 될 수 있는 후보들은 아래와 같음
  * `('x' | 1)[]`
  * `['x', 1]`
  * `[string, number]`
  * `readonly [string, number]`
  * `(string|number)[]`
  * `readonly (string|number)[]`
  * `[any, any]`
  * `any[]`

  정보가 충분치 않다면 mixed가 어떤 타입으로 추론되야 하는지 알 수 없으므로  
  타입스크립트는 작성자의 의도를 추측함  
  (위의 경우 `(string|number)[]`로 추측함)
* 그러나 타입스크립트가 추측한 답이 항상 옳을 수는 없음
* 타입스크립트는 타입을 추론할 때, 명확성과 유연성 사이의 균형을 유지하려고 함

### 타입 넓히기 과정을 제어하는 방법
타입스크립트는 넓히기의 과정을 제어할 수 있도록 몇 가지 방법을 제공함

#### const 사용
* let 대신 const로 변수를 선언한다면 더 좁은 타입이 됨  
  (실제로 const를 사용하면 앞에서 발생한 오류가 해결됨)
  ```ts
  const x = 'x'; //타입이 'x'
  let vec = {x:10, y:20, z:30};
  getComponent(vec, x); //정상
  ```
* const로 선언된 x는 재할당될 수 없으므로 타입스크립트는 좁은 타입('x')로 추론할 수 있음  
  따라 문자 리터럴 타입 'x'는 `'x' | 'y' | 'z'`에 할당 가능하므로 코드가 타입 체커를 통과함
* 다만 const는 만능이 아님  
  객체와 배열의 경우 여전히 문제 있음  
  `const mixed = ['x', 1];`은 배열에 대한 문제를 보여줌  
  튜플 타입을 추론해야할지, 요소들은 어떤 타입으로 추론해야할지 알 수 없음  
  비슷한 문제가 객체에서도 발생함
* 객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 let으로 할당된 것처럼 다룸
  ```ts
  const v = {
    x:1,
  };
  v.x = 3; //정상
  v.x = '3'; //Error: "3" 형식은 'number' 형식에 할당할 수 없습니다.
  v.y = 4; //Error: {x:number}형식에 'y'속성이 없습니다.
  v.name = 'Pythoagoras'; //Error: {x:number}형식에 'name'속성이 없습니다.
  ```
  위 코드는 JS에서 정상.  
  v의 타입은 구체적인 정도에 따라 다양한 모습으로 추론될 수 있음  
  객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 let으로 할당된 것처럼 다루기 떄문에 v의 타입은 {x: number}가 됨.    
  덕분에 v.x를 다른 숫자로 재할당할 수 있지만 string으로는 안되며, 다른 속성을 추가하지도 못함 (객체를 한번에 만들어야 함)    
  따라 마지막 세 문장에서 위 코드는 오류가 발생함
*

#### 타입스크립트의 기본 동작을 재정의하는 3가지 방법
타입스크립트는 명확성과 유연성 사이의 균형을 유지하려고 함    
오류를 잡기 위해서는 충분히 구체적으로 타입을 추론해야 하지만,    
잘못된 추론을 할 정도로 구체적으로 수행하지는 않음      
(예를 들면 1과 같은 값으로 초기화되는 속성을 적당히 number 타입으로 추론함)  
=> 타입 추론의 강도를 직접 제어하려면 타입스크립트의 기본 동작을 재정의해야 함

1. 명시적 타입 구문을 제공
  ```ts
  const v: { x: 1|3|5 }= {
  x: 1,
}; //타입이 { x: 1|3|5 }
  ```
2. 타입 체커에 추가적인 문맥을 제공  
   (예를 들어, 함수의 매개변수로 값을 전달)
3. const 단언문을 사용  
   변수 선언 시 사용하는 const와 다름.   
   const 단언문은 온전히 타입 공간의 기법.
  ```ts
  const v1 = {
  x: 1,
  y: 2
}; //타입은 {x:number, y:number}

const v2 = {
  x: 1 as const,
  y: 2,
}; //타입은 {x:1, y:number}

const v3 = {
  x: 1,
  y: 2,
} as const; //타입은 {readonly x:1; readonly y:2;}
//v3에는 넓히기가 동작하지 않음  
//v3가 진짜 상수라면 주석에 보이는 추론된 타입이 실제로 원하는 형태일 것
  ```
값 뒤에 as const를 작성하면 타입스크립트는 최대한 좁은 타입으로 추론함  
또한 배열을 튜플 타입으로 추론할 때도 as const를 사용할 수 있음
  ```ts
  const a1 = [1,2,3]; //타입이 number[]
const a2 = [1,2,3] as const; //타입이 readonly [1,2,3]
  ```

### 결론
* 넓히기로 인해 오류가 발생한다면 명시적 타입 구문 또는 const 단언문 추가를 고려해야 함
* 단언문으로 인해 추론이 어떻게 변화하는지 편집기를 통해 주기적으로 타입을 살펴보면 도움됨


## 22. 타입 좁히기
* 타입 넓히기의 반대는 타입 좁히기
* 타입스크립트가 넓은 타입으로부터 좁은 타입으로 진행하는 과정을 뜻함
* 가장 일반적인 예시는 null 체크
  ```ts
  const el = document.getElementById('foo'); //타입이 HTMLElement | null
  if(el) {
    el //타입이 HTMLElement
    el.innerHTML = 'Party Time'.blink();
  } else {
    el //타입이 null
    alert('No element #foo'); 
  }
  ```
  만약 el이 null이라면, 분기문의 첫 번째 블록이 실행되지 않음  
  즉, 첫 번째 블록에서 null을 제외하므로 더 좁은 타입이 되어 작업이 훨씬 편해짐
* 타입 체커는 일반적으로 이런 조건문에서 타입 좁히기를 잘해내지만,  
  타입 별칭이 존재한다면 그러지 못할 수도 있음


### 기본적인 타입 좁히기
* 분기문에서 예외를 던지거나 함수를 반환해 블록의 나머지 부분에서 변수의 타입을 좁힐 수도 있음
  ```ts
  const el = document.getElementById('foo'); //타입이 HTMLElement | null
  if(!el) throw new Error('Unable to find #foo'); 
  el; //이제 타입은 HTMLElement
  el.innerHTML = 'Party Time'.blink();
  ```
* instanceof를 사용해 타입을 좁힐 수도 있음
  ```ts
  function contains(text: string, search: string | RegExp) {
    if(search instanceof RegExp) {
      search; //타입이 RegExp
      return !!search.exec(text);
    }
    search; //타입이 string
    return text.includes(search);
  }
  ```
* 속성 체크로 타입을 좁힐 수도 있음
  ```ts
  interface A {a:number}
  interface B {b:number}
  function pickAB(ab: A | B) {
    if('a' in ab) {
      ab //타입이 A
    } else {
      ab //타입이 B
    }
    ab //타입이 A | B
  }
  ```
* Array.isArray 같은 일부 내장 함수로 타입 좁힐 수 있음
  ```ts
  function contains(text:string, terms: string|string[]) {
    const termList = Array.isArray(terms) ? terms : [terms];
    termList; //타입이 string[]
  }
  ```
* 이 외에도 타입을 좁히는 방법은 많음

### 태그된/구별된 유니온과 사용자 정의 타입 가드를 사용한 타입 좁히기
* 타입스크립트는 일반적으로 조건문에서 타입을 좁히는데 매우 능숙함  
  그러나 타입을 섣불리 판단하는 실수를 저지르기 쉬우므로 꼼꼼히 따져봐야 함  
  예를 들어 밑의 코드는 유니온 타입에서 null을 제외하기 위해 잘못된 방법을 사용함
  ```ts
  const el = document.getElementById('foo'); //타입이 HTMLElement | null
  if(typeof el === 'object') {
    el; //타입이 HTMLElement | null
  }
  ```
  JS에서 typeof null이 'object' 타입이기 떄문에 if 구문에서 null이 제외되지 않음  
  또한 기본형 값이 잘못되어도 비슷한 사례 발생함
  ```ts
  function foo(x?: number | string | null) {
    if(!x) {
      x; //타입이 number | string | null | undefined
    }
  }
  ```
  빈 문자열과 0 모두 false가 되기 떄문에, 타입은 좁혀지지 않음
* 타입을 좁히는 또 다른 일반적인 방법은 명시적 '태그'를 붙이는 것
  ```ts
  interface UploadEvent { type: 'upload', filename: string; contens: string }
  interface DownloadEvent {type: 'download'; filename: string}
  type AppEvent = UploadEvent | DownloadEvent;
  function handleEvent(e: AppEvent) {
    switch (e.type) {
      case 'download': 
        e //타입이 DownloadEvent
        break;
      case 'upload':
        e //타입이 UploadeEvent
        break;
    }
  }
  ```
  이 패턴은 '태그된 유니온', '구별된 유니온' 이라고 불리며 타입스크립트 어디에서나 찾아볼 수 있음  
  만약 타입스크립트가 타입을 식별하지 못한다면 식별을 돕기 위해 커스텀 함수를 도입할 수도 있음
  ```ts
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return 'value' in el;
  }
  function getElementContent(el: HTMLElement) {
    if(isInputElement(el)) {
      el; //타입이 HTMLInputElement
      return e.value;
    }
    el; //타입이 HTMLELement
    return el.textContent;
  }
  ```
  이런 기법을 '사용자 정의 타입 가드'라고 함  
  반환 타입의 `el is HTMLInputElement`는 함수의 반환이 true인 경우,   
  타입 체커에게 매개변수의 타입을 좁힐 수 있다고 알려줌
* 어떤 함수들은 타입 가드를 사용해 배열과 객체의 타입 좁히기를 할 수 있음  
  예를 들어, 배열에서 어떤 탐색을 수행할 때 undefined가 될 수 있은 타입을 사용할 수 있음
  ```ts
  const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
  const members = ['Janet', 'Michael'].map(who => jackson5.find(n => n === who)); //타입이 (string | undefined)[]
  
  //filter 함수를 사용해 undefined를 걸러내려 해도 잘 동작하지 않음
  const members2 = ['Janet', 'Michael'].map(who => jackson5.find(n => n === who)).filter(who => who !== undefined); //타입이 (string | undefined)[]
  
  //이럴 땐 타입 가드를 사용하면 타입을 좁힐 수 있음
  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }
  const members3 = ['Janet', 'Michael'].map(who => jackson5.find(n => n === who)).filter(isDefined); //타입이 string[]
  ```
* IDE에서 타입을 조사하는 습관을 가지면 타입 좁히기가 어떻게 동작하는지 알 수 있음  
  타입이 어떻게 좁혀지는지 이해해야 타입 추론에 대한 개념을 잡을 수 있고, 오류 발생의 원인을 알 수 있으며,  
  타입 체커를 더 호율적으로 이용할 수 있음


## 23. 한꺼번에 객체 생성하기
* 변수의 값은 변경될 수 있지만, 타입스크립트의 타입은 일반적으로 변경되지 않음
* 이런 특성 때문에 일부 JS 패턴을 타입스크립트로 모델링하는게 쉬워짐  
  즉, 객체를 생성할 때는 속성을 하나씩 추가하기보다는 여러 속성을 포함해 한꺼번에 생성해야 타입 추론에 유리함
  ```ts
  const pt = {};
  pt.x = 3; //Error: '{}' 형식에 'x' 속성이 없습니다.
  pt.y = 4; //Error: '{}' 형식에 'y' 속성이 없습니다.
  ```
  타입스크립트에서는 pt 타입이 {} 값을 기준으로 추론되기 떄문에 각 할당문에 오류가 발생함  
  존재하지 않는 속성을 추가할 수는 없음  
  인터페이스를 정의하거나 객체를 한번에 정의하면 오류가 해결됨
* 객체를 반드시 제각각 나눠 만들어야 한다면, 타입 단언문(as)를 사용해 타입 체커를 통과하게 할 수 있음
  ```ts
  interface Point { x: number; y: number; }
  const pt = {} as Point;
  pt.x = 3;
  pt.y = 4; //정상
  
  //물론 이 경우에도 선언 시 객체를 한꺼번에 만드는게 더 나음
  const pt2 = {
    x: 3,
    y: 4
  };
  ```
* 작은 객체들을 조합해 큰 객체를 만들어야하는 경우에도 여러 단계를 거치는 것은 좋지 않은 생각.
  ```ts
  const pt = {x: 3, y: 4};
  const id = {name: 'Pythagoras'};
  const namedPoint = {};
  Object.assign(namedPoint, pt, id);
  namedPoint.name; //Error: '{}' 형식에 'name' 속성이 없습니다.
  ```
  객체 전개 연산자(...)를 사용하면 큰 객체를 한꺼번에 만들 수 있음
  ```ts
  const namedPoint = {...pt, ...id};
  namedPoint.name; //정상, 타입이 string
  ```
  객체 전개 연산자를 사용하면 타입 걱정 없이 필드 단위로 객체를 생성할 수도 있음  
  이때 모든 업데이트마다 새 변수를 사용해 각각 새로운 타입을 얻도록 하는게 중요함
  ```ts
  const pt0 = {};
  const pt1 = {...pt0, x:3};
  const pt: Point = {...pt1, y:4}; //정상
  ```
  이 방법은 객체에 속성을 추가하고 타입스크립트가 새로운 타입을 추론할 수 있게 해 유용함
* 타입에 안전한 방식으로 조건부 속성을 추가하려면   
  속성을 추가하지 않는 null 또는 {}로 객체 전개를 사용하면 됨
  ```ts
  declare let hasMiddle: boolean;
  const firstLast = {first: 'Harry', last: 'Truman'};
  const presidnet = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
  ```
  IDE에서 president 심벌에 마우스를 올리면 타입이 선택적 속성을 가진 것으로 추론됨을 확인할 수 있음
  ```ts
  const presidnet: {
      middle?: string;
      first: string;
      last: string;
  }
  ```
* 전개 연산자로 한꺼번에 여러 속성을 추가할 수도 있음
  ```ts
  declare let hasDates: boolean;
  const nameTitle = {name: 'Khufu', title: 'Pharaoh'};
  const pharaoh = {
    ...nameTitle,
    ...(hasDates ? {start: -2589, end: -2566} : {})
  };
  
  //pharaoh 심벌의 타입은 유니온으로 추론됨
  // const pharaoh: {
  //     start: number;
  //     end: number;
  //     name: string;
  //     title: string;
  // } | {
  //     name: string;
  //     title: string;
  // }
  
  //해당 타입에서는 start를 읽을 수 없음
  pharaoh.start //Error {name: string, title: string} 형식에 start 속성이 없습니다.
  ```
  선택적 필드 방식으로 표현하려면 헬퍼 함수를 사용하면 됨
  ```ts
  function addOptional<T extends Object, U extends Object>(
      a: T, b: U | null
  ): T & Partial<U> {
      return {...a, ...b};
  }
  
  const pharaoh = addOptional(nameTitle, hasDates ? {start: -2589, end:-2566} : null);
  pharaoh.start; //정상, 타입이 number | undefined
  ```
* 객체나 배열을 변환해 새로운 객체나 배열을 생성하고 싶은 경우 루프 대신   
  내장된 함수형 기법 또는 Lodash 같은 유틸리티 라이브러리를 사용하는게   
  '한꺼번에 객체 생성하기' 관점에서 보면 옳음


## 24. 일관성 있는 별칭 사용하기
```ts
//다각형을 표현하는 자료구조
interface Coordinate {
    x: number;
    y: number;
}
interface BoundingBox {
    x: [number, number];
    y: [number, number];
}
interface Polygon {
    exterior: Coordinate[];
    holes: Coordinate[][];
    bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    if(polygon.bbox) {
        if(pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] || pt.y < polygon.bbox.y[0] || pt.y < polygon.bbox.y[1]) {
            return false;
        }
        //
    }
}
/*
위 코드는 에러 없이 동작하지만 반복되는 부분이 많이 존재함
따라 중복을 줄이기 위해 임시변수를 뽑아냄
*/
const box = polygon.bbox;
if (pt.x < box.x[0] || pt.x > box.x[1] || pt.y < box.y[0] || pt.y < box.y[1]) { //Error: 객체가 undefined일 수 있습니다.
}
/*
위 코드는 동작하지만 IDE에서 오류로 표시됨  
이유는 polygon.bbox를 별도의 box라는 별칭을 만들었고, 
첫 번째 예제에서는 잘 동작했던 제어 흐름 분석을 방해했기 때문
box와 polygon.bbox의 타입은 아래와 같음
*/
function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  polygon.bbox //타입이 BoundingBox | undefined
  const box = polygon.bbox; 
  box //타입이 BoundingBox | undefined
  if(polygon.bbox) {
    polygon.bbox //타입이 BoundingBox
    box //타입이 BoundingBox | undefined
  }
}
/*
속성 체크는 polygon.box의 타입을 정제했지만 box는 그렇지 않았기 때문에 오류 발생함
이런 오류는 별칭은 일관성 있게 사용한다는 기본 원칙을 잘 지키면 방지할 수 있음
*/
function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
  const {bbox} = polygon; //객체 비구조화를 사용해 보다 간결한 문법으로 일관된 이름 사용 가능
  if (bbox) {
    const {x, y} = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y < y[1]) { //정상
      return false;
    }
  }
}
/*
객체 비구조화는 배열과 중첩된 구조에서도 사용 가능
객체 비구조화를 이용할 떄는 두 가지를 주의해야 함
1. 전체 bbox 속성이 아니라 x,y가 선택적 속성일 경우 속성 체크가 더 필요함. 
   따라 타입의 경계에 null 값을 추가하는게 좋음
2. bbox에는 선택적 속성이 적합했지만 holes는 그렇지 않음
   holes가 선택적이라면 값이 없거나 빈 배열이었을 것.
   빈 배열은 holes이 없음을 나타내는 좋은 방법
*/


//별칭은 타입 체커 뿐 아니라 런타임에도 혼동을 야기할 수 있음
const {bbox} = polygon;
if (!bbox) {
  calculatePolygonBbox(polygon); //polygon.bbox가 채워짐
  //이제 polygon.bbox와 bbox는 다른 값을 참조함
}

/*
타입스크립트의 제어 흐름 분석은 지역 변수에는 꽤 잘 동작함
그러나 객체 속성에서는 주의해야 함
*/
function fn(p:Polygon) {/*...*/}

polygon.bbox //타입이 BoundingBox | undefined
if(polygon.bbox) {
  polygon.bbox //타입이 BoundingBox
  fn(polygon);
  polygon.bbox //타입이 BoundingBox
}
/*
fn(polygon) 호출은 polygon.bbox를 제거할 가능성이 있으므로   
타입을 BoundingBox | undefined로 되돌리는 것이 안전할 것.
그러나 함수 호출시마다 속성체크를 반복해야 하므로 좋지 않음
그래서 타입스크립트는 함수가 타입 정제를 무효화하지 않는다고 가정함
그러나 실제로는 무효화될 가능성 있음

polygon.bbox로 사용하는 대신 bbox 지역 변수로 뽑아내 사용하면 
bbox의 타입은 정확히 유지되지만, polygon.bbox의 값과 같게 유지되지 않을수도 있음
*/
```
* 별칭은 타입스크립트가 타입을 좁히는 것을 방해함    
  따라 변수에 별칭을 사용할 때는 일관되게 사용해야 함  
  그래야 코드를 잘 이해할 수 있고, 오류도 쉽게 찾을 수 있음
* 비구조화 문법을 사용해 일관된 이름을 사용하는 것이 좋음
* 함수 호출이 객체 속성의 타입 정제를 무효화할 수 있다는 점을 주의해야 함  
  속성보다 지역 변수를 사용하면 타입 정제를 믿을 수 있음


## 25. 비동기 코드에는 콜백 대신 async 함수 사용하기
* 과거 JS에서는 비동기 동작을 위해 콜백을 사용함.  
  때문에 콜백 지옥이 일어날 수 밖에 없었음  
  콜백이 중첩된 코드는 실행 순서가 코드의 순서와 반대이기 때문에 직관적으로 이해하기 어려움  
  요청들을 병렬로 실행하거나 오류 상황을 빠져나오고 싶다면 더욱 혼란스러워짐
  ```ts
  fetchUrl(url1, function(response1){
      fetchURL(url2, function(response2){
          fetchURL(url3, function(response3){
              //...
            console.log(1);
          });
        console.log(2);
      });
    console.log(3);
  });
  console.log(4);
  //로그 : 4 -> 3 -> 2 -> 1
  ```
* ES2015는 콜백 지옥을 극복하기 위해 promise 개념을 도입함  
  코드의 중첩도 적어지고 실행 순서도 코드의 순서와 같음  
  또한 오류를 처리하기도, Promise.all 같은 고급 기법을 사옹하기도 쉬워짐
  ```ts
  const page1Promise = fetch(url1);
  page1Promise.then(response1 => {
      return fetch(url2);
  }).then(response2 => {
      return fetch(url3);
  }).then(response3 => {
      //...
  }).catch(error => {
      //...
  });
  ```
* ES2017에서는 async, await 키워드를 도입해 콜백 지옥을 더 간단하게 처리할 수 있게 됨  
  await 키워드는 각각의 프로미스가 처리될 때까지 fetchPages 함수의 실행을 멈춤  
  async 함수 내에서 await 중인 프로미스가 거절되면 예외를 던짐  
  이를 통해 일반적인 try/catch 구문 사용 가능함
  ```ts
  async function fetchPages() {
      const response1 = await fetch(url1);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
      //...
  }
  
  async function fetchPages2() {
      try {
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
        //...
      } catch (e){
          //...
      }
  }
  ```
* ES5 또는 더 이전 버전을 대상을 할 때, 타입스크립트 컴파일러는   
  async와 await가 동작하도록 정교한 변환을 수행함  
  즉, 타입스크립트는 런타임에 관계없이 async/await 사용이 가능함
* 콜백보다는 프로미스를
* 콜백보다는 프로미스나 async/await사용하는게 코드 작성과 타입 추론 면에서 유리함
  ```ts
  //Promise.all을 사용해 병렬로 API를 호출하는 경우 await와 구조 분해 할당을 사용하면 편리함
  async function fetchPages() {
    const [response1, response2, response3] = await Promise.all([
      fetch(url1), fetch(url2), fetch(url3)
    ]);
    //...
  }
  
  /*
  타입스크립트는 위 코드 세 가지 response 변수 각각의 타입을 Response로 추론함 
  콜백 스타일로 동일한 코드를 작성하려면 더 많은 코드와 타입 구문이 필요함
  이 코드에 오류 처리를 포함하거나 Promise.all 같은 일반적인 코드로 확장하는 것은 쉽지 않음
  */
  function fetchPagesCB() {
    let numDone = 0;
    const reponse: string[] = [];
    const done = () => {
      const [response1, response2, response3] = response;
      //...
    };
    const urls = [url1, url2, url3];
    urls.forEach((url, i) => {
      fetchURL(url, r => {
        responses[i] = url;
        numDone++;
        if(numDone === urls.length) done();
      });
    });
  }
  
  /*
  입력된 프로미스들 중 첫 번째가 처리될 때 완료되는 Promise.race도 타입 추론과 잘 맞음
  Promise.race를 사용해 프로미스에 타임아웃을 추가하는 방법은 흔하게 사용되는 패턴
  
  타입 구문이 없어도 fetchWithTimeout의 반환 타입은 Promise<Response>로 추론됨
  Promise.race의 반환 타입은 입력 타입들의 유니온이고, 이번 경우느 Promise<Response | never>가 됨 
  그러니 never(공집합)과 유니온은 아무런 효과가 없으므로 결과가 Promise<Response>로 간단해짐
  프로미스를 사용하면 모든 타입 추론이 제대로 동작함
  */
  function timeout(millis: number): Promise<never> {
      return new Promise((resolve, reject) => {
          setTimeout(() => reject('timeout'), millis);
      });
  }
  
  async function fetchWithTimeout(url: string, ms: number) {
      return Promise.race([fetch(url), timeout(ms)]);
  }
  ```
* 가능하면 프로미스를 생성하기보단 async/await 사용을 권장함  
  간결하고 직관적인 코드를 작성할 수 있고 모든 종류의 오류를 제거할 수 있음
    ```ts
    //function getNumber():Promise<number>
    async function getNumber() {
        return 42;
    }
    ```
* async 화살표 함수를 만들 수도 있음
  ```ts
  const getNumber = async () => 42; //타입은 () => Promise<number>
  
  //프로미스를 직접 생성
  const getNumber2 = () => Promise.resolve(42); //타입은 () => Promise<number>
  ```
* 어떤 함수가 프로미스를 반환한다면 async로 선언하는 것이 좋음  
  즉시 사용 가능한 값에도 프로미스를 반환하는 것이 이상해보일 수 있지만,  
  실제로는 비동기 함수를 통일하도록 강제하는데 도움이 됨  
  함수는 항상 동기 또는 비동기로 실행되어야 하며, 절대 혼용해서는 안됨
  ```ts
  //이렇게 하면 안됨!
  const _cache: {[url: string]: string} = {};
  function fetchWithCache(url: string, callback: (text: string) => void) {
      if(url in _cache) {
          callback(_cache[url]);
      } else {
          fetchURL(url, text => {
              _cache[url] = text;
              callback(text);
          });
      }
  }
  /*
  코드가 최적화된 것처럼 보일지몰라도 캐시된 경우 콜백 함수가 동기로 호출되기 떄문에 
  fetchWithCache 함수는 사용하기가 무척 어려워짐
  */
  let requestStatus: 'loading' | 'success' | 'error';
  function getUser(userId: string) {
      fetchWithCache(`/user/${userId}`, profile => {
          requestStatus = 'success';
      });
      requestStatus = 'loading';
  }
  /*
  getUser를 호출한 후 requesetStatus의 값은 온전히 profile이 캐시되었는지 여부에 달림
  캐시되어있지 않다면 requestStatus는 조만간 'success'가 됨  
  캐시되어있다면 'success'가 되고 나서 바로 'loading'으로 다시 돌아가버림
  
  async를 두 함수에 모두 사용하면 일관적인 동작을 강제하게 됨
  이제 requestStatus가 'success'로 끝나는 것이 명백해짐
  콜백이나 프로미스를 사용하면 실수로 반(half)동기 코드를 작성할 수 있지만,
  async를 사용하면 항상 비동기 코드를 작성하는 셈
  */
  const _cache2: {[url: string]: string} = {};
  async function fetchWithCache2(url: string) {
    if(url in _cache2) {
      return _cache2[url];
    }
    const response = await fetch(url);
    const text = await response.text();
    _cache[url] = text;
    return text;
  }
  
  async function getUser2(userId: string) {
      requestStatus = 'loading';
      const profile = await fetchWithCache2(`/user/${userId}`);
      requestStatus = 'success';
  }
  ```
* async 함수에서 프로미스를 반환하면 또 다른 프로미스로 래핑되지 않음  
  반환 타입은 Promise<Promise<T>>가 아닌 Promise<T>가 됨
  ```ts
  //function getJSON(url: string): Promise<any>
  async function getJSON(url: string) {
      const response = await fetch(url);
      const jsonPromise = response.json(); //타입이 Promise<any>
      return jsonPromise;
  }
  ```


## 26. 타입 추론에 문맥이 어떻게 사용되는지 이해하기
### 타입 추론에서의 문맥
* 타입스크립트는 타입을 추론할 때 단순히 값만 고려하지는 않음  
  값이 존재하는 곳의 문맥까지도 살핌  
  그런데 문맥을 고려해 타입을 추론하면 가끔 이상한 겨로가가 나옴  
  이때 타입 추론에 문맥이 어떻게 사용되는지 이해하면 제대로 대처할 수 있음
* JS는 코드의 동작과 실행 순서를 바꾸지 않으면서 표현식을 상수로 분리해 낼 수 있음
  ```ts
  //아래 두 문장은 동일함
  //인라인 형태
  setLanguage('JS');
  
  //참조 형태
  let language = 'JS';
  setLanguage(language);
  
  //문자열 타입을 더 특정해 문자열 리터럴 타입의 유니온을 바꾼다고 가정
  type Language = 'JS' | 'TS' | 'Python';
  function setLanguage(lagunage: Language) {/*...*/}
  
  setLanguage('JS');
  setLanguage(language); //Error: string 형식의 인수는 Language 형식의 매개변수에 할당될 수 없습니다.
  /*
  인라인 형태에서 타입스크립트는 함수 선언을 통해 매개변수가 Language 타입이어야 한다는 것을 알고 있음
  해당 타입에 문자열 리터럴 'JS'는 할당 가능하므로 정상.
  그러나 이 값을 변수로 분리해내면, 타입스크립트는 할당 시점에 타입을 추론함
  이번 경우는 string으로 추론했고, Language 타입으로 할당이 불가능하므로 오류가 발생함
  
  이 문제를 해결하는 방법은 두 가지가 있음 
  */
  //1. 타입선언에서 language의 가능한 값을 제한하는 것
  let language2: Language = 'JS';
  
  //2. language를 상수로 만드는 것
  const language3 = 'JS'; //상수로 선언하면 타입스크립트는 더 정확한 타입으로 추론 가능함
  ```
  위의 과정에서 문맥으로부터 값을 분리했는데,  
  이렇게 문맥과 값을 분리하면 추후 근본적인 문제를 발생시킬 수 있음

### 문맥의 소실로 인해 발생하는 오류와 해결방안

### 튜플 사용 시 주의점
튜플을 사용하면서 문맥과 값을 분리함
```ts
function panTo(where: [number, number]) {/*...*/}

panTo([10,20]); //정상

const loc = [10,20];
panTo(loc); //Error: number[] 형식의 인수는 [number,number] 형식의 매개변수에 할당될 수 없습니다.
``` 
첫 번째 경우는 `[10,20]`을 튜플 타입 `[number,number]`에 할당 가능함  
두 번째 경우는 타입스크립트가 loc의 타입을 `number[]`로 추론하므로 튜플 타입에 할당할 수 없음

any를 사용하지 않고 오류를 고칠 수 있는 방법은
1. 타입 선언을 제공
  ```ts
  const loc: [number, number] = [10,20];
  panTo(loc); //정상
  ```
2. 상수 문맥을 제공  
   const는 단지 값이 가리키는 참조가 변하지 않는 얕은 상수인 반면,  
   as const는 그 값이 내부까지 상수라는 사실을 타입스크립트에게 알려줌
  ```ts
  const loc = [10,20] as const;
  panTo(loc); 
  //Error: readonly [10,20] 형식은 readonly이며, 변경 가능한 형식 [number,number]에 할당할 수 없습니다.
  ```
