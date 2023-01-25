---
title : 타입스크립트의 타입 시스템  
date : 2023.01.13
---

# 타입스크립트의 타입 시스템

## 6. 편집기를 사용해 타입 시스템 탐색하기
타입스크립트 설치 시, 두 가지를 실행할 수 있음
* tsc : 타입스크립트 컴파일러
* tsserver : 단독으로 실행 가능한 타입스크립트 서버

보통 TS 컴파일러 실행이 목적이지만, TS 서버는 '언어 서비스'를 제공한다는 점에서 중요.  
(언어 서비스는 코드 자동 완성, 명세 검사, 검색, 리펙터링이 포함됨.  
따라 타입스크립트 서버에서 언어 서비스를 제공하도록 설정하는게 좋음)  

* IDE에서 TS 언어 서비스를 적극 활용하는 것을 권장
* 편집기를 사용하면 타입 시스템이 어떻게 동작하는지,  
  TS가 어떻게 타입을 추론하는지 개념을 잡을 수 있음
* TS가 동작을 어떻게 모델링하는지 알기 위해 타입 선언 파일을 보는데 익숙해져야 함


## 7. 타입이 값들의 집합이라고 생각하기
* 타입을 값의 집합으로 생각하면 이해하기 편함 (타입의 '범위')  
  이 집합은 유한(boolean 또는 리터럴)하거나 무한(number 또는 string)함

* TS 타입은 엄격한 상속 관계가 아니라 겹쳐지는 집합(벤 다이어그램)으로 표현됨  
  두 타입은 서로 서브타입이 아니면서도 겹쳐질 수 있음

* 한 객체의 추가적인 속성이 타입 선언에 언급되지 않더라도 그 타입에 속할 수 있음 

* 타입 연산은 집합의 범위에 적용됨  
  A와 B의 교집합은 A의 범위와 B의 범위의 인터섹션(교집합)  
  객체 타입에서는 A & B인 값이 A와 B의 속성을 모두 가짐을 의미함  

* 'A는 B를 상속', 'A는 B에 할당 가능', 'A는 B의 서브타입'은   
  'A는 B의 부분 집합'과 같은 말  

* 가장 작은 집합은 아무 값도 포함하지 않는 공집합 (=never 타입)  
  never 타입으로 선언된 변수의 범위는 공집합이기 떄문에 아무 값도 할당 불가능함

* 그 다음으로 작은 집합은 한 가지 값만 포함하는 타입 (=유닛타입이라고도 불리는 리터럴 타입)  
    ```ts
    type A = 'A';
    type B = 'B';
    type C = 'C';
    ```
  두 개 혹은 세 개로 묶으려면 유니온 타입을 사용함   
  (유니온 타입 = 값 집합들의 합집합)  
  집합 관점에서 타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것.
    ```ts
    type AB = 'A' | 'B'
    ```
  
|TS 용어|집합 용어|
|:--|:--|
|never|공집합|
|리터럴 타입|원소가 1개인 집합|
|값이 T에 할당 가능|값이 T의 원소|
|T1이 T2에 할당 가능|T1이 T2의 부분 집합|
|T1이 T2를 상속|T1이 T2의 부분 집합|
|T1 \| T2|T1과 T2의 합집합|
|T1 & T2|T1과 T2의 교집합|
|unknown|전체 집합|


## 8. 타입 공간과 값 공간의 심벌 구분하기
* 이름이 같을 경우 타입인지 값인지 헷갈릴 수 있음  
  ```ts
  interface Cylinder { //타입으로 쓰임
      radius: number;
      height: number;
  }
  
  //위 Cylinder와 이름은 같지만 값으로 쓰이며 서로 아무 관련도 없음   
  const Cylinder = (radius: number, height: number) => ({ radius, height });
  ```  
  상황에 따라 Cylinder는 타입으로 쓰일 수도 있고, 값으로 쓰일 수도 있음  
  =>   
  instanceof를 이용해 인수가 Cylinder 타입인지 체크하려는 경우,  
  instanceof는 JS의 런타임 연산자이고, 값에 대해 연산을 하기 때문에   
  instanceof Cylinder는 타입이 아닌 함수를 참조하게 됨 (오류 발생)

<br/>

* 한 심벌이 타입인지 값인지 한 눈에 파악이 어려우므로 어떤 형태로 쓰이는지 문맥을 살펴야 함    
  일반적으로 type이나 interface 다음에 나오는 심벌은 타입인 반면,  
  const, let 선언에 쓰이는 것은 값    
  모든 값은 타입을 가지지만 타입은 값을 가지지 않음  
  (type과 interface 같은 키워드는 타입 공간에만 존재함)

<br/>

* 두 공간에 대한 개념을 잡으려면 타입스크립트 플레이그라운드 활용을 추천    
  TS 플레이그라운드는 TS소스로부터 변환된 JS 결과물을 보여줌  
  컴파일 과정에서 타입 정보는 제거되므로 심벌이 사라진다면 그것은 타입에 해당됨

<br/>

* TS 코드에서 타입과 값은 번갈아 나올 수 있음  
  타입 선언(:) 또는 단언문(as) 다음 나오는 심벌은 타입,  
  (=) 다음에 나오는 모든 것은 값.  
  'foo'는 문자열 리터럴이거나, 문자열 리터럴 타입일 수 있음

<br/>

* class와 enum 키워드는 상황에 따라 타입과 값 두 가지로 모두 사용될 수 있음.  
  아래 예제에서 Cylinder 클래스는 타입으로 쓰임  
  ```ts
  class Cylinder {
      radius = 1;
      height = 1;
  }
  function calculateVolume(shape: unknown) {
      if(shape instanceof Cylinder) {
          shape //정상, 타입은 Cylinder
          shape.radius; //정상, 타입은 number
      }
  }
  ```
  클래스가 타입으로 쓰일 떄는 형태(속성과 메서드)가 사용되지만,  
  값으로 쓰일 때는 생성자가 사용됨

<br/>

* 연산자 중에서도 타입에서 쓰일 때와 값에서 쓰일 때 다른 기능을 하는 것들이 있음  
  그 중 하나로 typeof를 들 수 있음  
  ```ts
  type T1 = typeof p; //타입은 Person
  type T2 = typeof email; //타입은 (p:Person, subject: string, body: string) => Response
  
  const v1 = typeof p; //값은 'object'
  const v2 = typeof email; //값은 'function'
  ```
  * 타입의 관점에서 typeof는 값을 읽어 TS 타입을 반환함  
    타입 공간의 typeof는 보다 큰 타입의 일부분으로 사용 가능하고,  
    type 구문으로 이름을 붙이는 용도로 사용 가능함
  * 값의 관점에서 typeof는 JS 런타임의 typeof 연산자가 됨  
    값 공간의 typeof는 대상 심벌의 런타임 타입을 가리키는 문자열을 반환하며,  
    TS 타입과는 다름.  
    JS의 런타입 타입 시스템은 TS의 정적 타입 시스템보다 훨씬 간단함  
    TS 타입은 종류가 무수히 많은 반면, JS에는 6개의 런타입만 존재

<br/>

* class 키워드는 값과 타입 두 가지로 모두 사용 가능하기 때문에   
  클래스에 대한 typeof는 상황에 따라 다르게 동작함
  ```ts
  const v = typeof Cylinder; //값이 'function'
  type T = typeof Cylinder; //타입이 typeof Cylinder
  ```
  클래스가 JS에서는 실제 함수로 구현되기 때문에 첫번째 줄 값은 'function'이 됨  
  두 번째 줄의 타입에서 중요한 것은 Cylinder가 인스턴스의 타입이 아니라는 점.  
  실제로는 new 키워드를 사용할 때 볼 수 있는 생성자 함수
  ```ts
  declare let fn: T;
  const c = new fn(); //타입이 Cylinder
  ```
  아래 코드처럼 instanceType 제너릭을 사용해 생성자 타입과 인스턴스 타입을 전환할 수 있음 
  ```ts
  type C = instanceType<typeof Cylinder>; //타입이 Cylinder
  ```

<br/>

* 속성 접근자인 []는 타입으로 쓰일 때에도 동일하게 동작함  
  인덱스 위치에는 유니오 타입과 기본형 타입을 포함한 어떤 타입이든 사용 가능함
  ```ts
  type PersonEl = Person['first' | 'last']; //타입은 string
  type Tuple = [string, number, Date]; 
  type TupleEl = Tuple[number]; //타입은 stirng | number | Date
  ```

<br/> 

* 두 공간 사이에서 다른 의미를 가지는 코드 패턴들이 있음   
  TS 코드가 의도와 다르게 동작한다면 타입 공간과 값 공간을 혼동해 잘못 작성했을 가능성 있음  
  * 값으로 쓰이는 this는 JS의 this 키워드.     
    타입으로 쓰이는 this는 일명 '다형성 this'라고 불리는 this의 TS 타입.  
    서브 클래스의 메서드 체인을 구현할 떄 유용함
  * 값에서 &와 |는 AND와 OR 비트 연산자.  
    타입에서는 인터섹션과 유니온
  * const는 새 변수를 선언하지만,  
    as const는 리터럴 또는 리터럴 표현식의 추론된 타입을 바꿈  
  * extends는 서브클래스(class A extends B) 또는 서브타입(inteface A extends B)  
    또는 제너릭 타입의 한정자(Generic<T extends number>)를 정의할 수 있음
  * in은 루프(for(key in object)) 또는 매핑된 타입에 등장함


## 9. 타입 단언보다는 타입 선언을 사용하기
* TS에서 변수에 값을 할당하고 타입을 부여하는 방법은 2가지  
  ```ts
  interface Person {name: string};
  
  const alice: Person = {name: 'Alice'}; //타입은 Person
  const bob = {name: 'Bob'} as Person; //타입은 Person
  ```
  두 가지 타입은 결과가 같아 보이지만 그렇지 않음. 
  * :Type은 변수에 '타입 선언'을 붙여 그 값이 선언된 타입임을 명시함  
  * 두 번째 as Type은 '타입 단언'을 수행함  
    즉, TS가 추론한 타입이 있더라도 Person 타입으로 간주함   
* 타입 단언 (as Type)보다 타입 선언(: Type) 사용을 권장함    
  타입 선언은 할당되는 값이 해당 인터페이스를 만족했는지 검사하고 에러를 표시하지만,  
  타입 단언은 강제로 타입을 지정하므로 타입 체커가 오류를 무시함
  ```ts
  const alice:Person = {}; //'Person' 유형에 필요한 'name' 속성이 '{}' 유형에 없습니다.
  const bob = {} as Person; //오류 없음
  ```
* 타입 선언과 단언의 차이는 속성 추가 시에도 마찬가지로 동작함      
  타입 선언문에서는 잉여 속성 체크가 동작하지만, 단언문에서는 적용되지 않음  
  따라 타입 단언이 꼭 필요한 경우가 아니라면, 안정성 체크가 되는 타입 선언 사용을 권장함
* `const bob = <Person>{}`은 단언문의 원래 문법이며 `{} as Person`과 동일함  
  이 코드는 `<Person>`이 .tsx 파일에서 컴포넌트 태그로 인식되기 때문에 현재는 잘 쓰이지 않음  
* 화살표 함수의 반환 타입을 명시하는 방법을 터득해야 함  
  ```ts
  //Person[]을 원했지만 결과는 string[];
  const people = ['alice', 'bob', 'jan'].map(name => ({name}));
  
  //{name}에 타입 단언을 쓰면 문제가 해결될 것 같지만 런타임에 문제가 발생하게 됨 
  const people = ['alice', 'bob', 'jan'].map(name => ({name} as Person));
  const people = ['alice', 'bob', 'jan'].map(name => ({} as Person)); //오류 없음
  
  //단언문을 쓰지 않고 화살표 함수 안에 타입과 함께 변수 선언하는 것이 가장 직관적
  const people = ['alice', 'bob', 'jan'].map(name => {
      const person: Person = {name};
      return person; //타입은 Person[]
  });
  
  /*
  코드를 좀더 간결하게 만들기 위해 변수 대신 화살표 함수의 반환 타입 선언
  위의 코드와 동일한 체크를 수행함
  
  여기서 소괄호는 매우 중요한 의미를 지니는데
  (name):Person은 name의 타입이 없고 반환 타입이 Person이라고 명시함  
  (name:Person)은 name의 타입이 Person임을 명시하고 반환 타입이 없기 때문에 오류가 발생함
  */
  const people = ['alice', 'bob', 'jan'].map((name):Person => {name});
  
  //그러나 함수 호출 체이닝이 연속되는 곳에서는 체이닝 시작에서부터 명명된 타입을 가져야 함  
  //그래야 정확한 곳에 오류가 표시됨
  ```

* 타입 단언이 꼭 필요한 경우가 있음  
  타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때.  
  이런 경우 타입 단언문을 사용하는 것이 타당함
  * DOM 엘리먼트를 다룰 경우.  
    TS는 DOM에 접근하지 못하므로 해당 엘리먼트가 버튼 엘리먼트인지 알지 못함  
    
  * 자주 쓰이는 특별한 문법(!)을 사용해서 null이 아님을 단언하는 경우  
    ```ts
    const elNull = document.getElementById('foo'); //타입은 HTMLElement | null  
    const el = document.getElementById('foo')!; //타입은 HTMLElement
    ```
    접미사로 쓰인 !는 값이 null이 아니라는 단언문으로 해석됨.  
    단언문은 컴파일 과정에 제거되므로, 타입 체커는 알지 못하지만 그 값이 null이 아니라고   
    확실할 수 있는 경우 사용해야 함. 그렇지 않다면 null을 체커하는 조건문을 사용해야 함  
* 타입 단언문으로 임의의 타입 간 변환을 할 수는 없음  
  A가 B의 부분 집합일 경우에만 타입 단언문을 사용해 변환 가능    
  (HTMLElement | null -> HTMLElement, EventTarget -> ButtonElement)  
  하지만 서로의 서브 타입이 아닌 경우 변환 불가능함  
  이런 오류를 해결하려면 unknown 타입을 사용해야 함     
  모든 타입은 unknown의 서버 타입이기 떄문에 unknown이 포함된 단언문은 항상 동작함  
  unknown 단언은 임의의 타입 간 변환을 가능하게 하지만, 뭔가 위험한 동작을 하고 있다는 걸 알 수 있음  
  `const el = document.body as unknown as Person; //정상` 


## 10. 객체 래퍼 타입 피하기
* JS에는 기본형 값들에 대한 일곱 가지 타입 존재함    
  기본형들은 불변이며 메서드를 가지지 않는다는 점에서 객체와 구분됨  
  (string, number, boolean, null, undefined, symbol, bigint)

  <br/>

* 그런데 기본형인 string의 경우 메서드를 가지고 있는 것처럼 보임  
  `'string'.charAt(3) //"m"`
  * string 기본형에는 메서드가 없지만 JS에는 메서드를 가지는   
    String 객체 타입이 정의되어 있으며, JS는 기본형과 객체 타입을 서로 자유롭게 변환함  
  * string 기본형에 charAt 같은 메서드 사용 시  
    JS는 기본형을 String 객체로 래핑하고, 메서드를 호출하고, 마지막에 래핑한 객체를 버림
  * String.prototype 몽키-패치하면 위의 설명한 내용 내부적인 동작 관찰 가능

  <br/>

* 아래 코드에서 메서드 내의 this는 string 기본형이 아닌 String 객체 래퍼.  
  String 객체는 직접 생성할 수도 있고 string 기본형처럼 동작함  
  하지만 string 기본형과 String 객체 래퍼가 항상 동일하게 동작하는 것은 X.  
  ```ts
  const originalCharAt = String.prototype.charAt;
  String.prototype.charAt = function (pso) {
      console.log(this, typeof this, pos);
      return originalCharAt.call(this, pos);
  }
  console.log('primitive',charAt(3)); //[String: 'primitive'] 'object'  3 m
  ```
  * String 객체는 오직 자신하고만 동일함   
    `"hello" === new String("hello") //false`  
    `new String("hello") === new String("hello") //false`
  * 객체 래퍼 타입의 자동변환은 어떤 속성을 기본형에 속성 추가 시 그 속성이 사라짐  
    실제로는 x가 String 객체로 변환된 후 속성이 추가되었고, 속성이 추가된 객체는 버려진 것.
    `x = "hello"; x.language = "English"; x.language; //undefined`

  <br/>

* 다른 기본형에도 동일하게 래퍼 타입이 존재함 (null, undefined 제외)  
  래퍼 타입들로 인해 기본형 값에 메서드를 사용할 수 있고, 정적 메서드도 사용 가능함    
  그러나 보통은 래퍼 객체를 직접 생성할 필요 없음  

  <br/>

* TS는 기본형과 객체 래퍼 타입을 별도로 모델링함  
  string은 String에 할당할 수 있지만 String은 string에 할당할 수 없음

  <br/>

* 기본형 값에 메서드를 제공하기 위해 객체 래퍼 타입이 어떻게 쓰이는지 이해해야 함  
  직접 사용하거나 인스턴스를 생성하는 것은 지양해야 함  

  <br/>

* TS 객체 래퍼 타입은 지양하고 기본형 타입을 사용해야 함  
  String 대신 string, Number 대신 number, Boolean 대신 boolean,  
  Symbol 대신 symbol, BigInt 대신 bitint 사용


## 11. 잉여 속성 체크의 한계 인지하기

* 객체 리터럴을 변수에 할당하거나 매개변수로 전달 시 잉여 속성 체크가 수행됨
  ```ts
  //예시 1
  interface Room {
      numDoors: number;
      ceilingHeightFt: number;
  }
  
  const r: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'parent' //오류 발생
  }
  
  //예시 2
  const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'parent'
  };
  const r: Room = obj; //정상
  ```
* 예시 1처럼 타입이 명시된 변수에 객체 리터럴 할당 시 TS는 해당 타입의 속성이 있는지,   
  그리고 그 외의 속성은 없는지 확인함  
* 하지만 구조적 타이핑 관점으로 생각해보면 그 외의 속성이 있어도 오류가 발생하지 않아야 함.   
  임시 변수를 도입해보면 알 수 있는데, 예시 2처럼 obj 객체는 Room 타입에 할당 가능함  
  obj 타입은 Room 타입의 부분 집합을 포함하므로 Room에 할당 가능하며 타입체커도 통과함
* 예시 1에서는 구조적 타입 시스템에서 발생할 수 있는 중요한 종류의 오류를 잡을 수 있도록  
  '잉여 속성 체크'라는 과정이 수행되었음  
* 그러나 잉여 속성 체크 역시 조건에 따라 동작하지 않다는 한계가 있고,  
  통상적인 할당 가능 검사와 함께 쓰이면 구조적 타이핑이 무엇인지 혼란스러워질 수 있음    
  따라 잉여 속성 체크가 할당 가능 검사와는 별도의 과정이라는 것을 알아야 함  
* `inteface Options { title: string; darkMode?: boolean }`  
  Options 타입의 경우 darkMode 속성에 boolean 타입이 아닌   
  다른 타입의 값이 지정된 경우를 제외하면, string 타입인 title 속성과   
  '또 다른 어떤 속성'을 가지는 모든 객체는 Options 타입의 범위에 속하기 때문에  
  타입의 범위가 너무 넓어져 순수한 타입 체커는 대소문자 체크 같은 종류의 오류를 찾아내지 못함  
  (ex, document, new HTMLAnchorElement 인스턴스는 모두     
  string 타입인 title 속성을 가지고 있기 때문에 Options 타입 변수에 할당 가능함)  
  ```ts  
  const o1: Options = document; //정상  
  const o2: Options = new HTMLAnchorElement; //정상  
  ```
* 잉여 속성 체크를 이요하면 기본적으로 타입 시스템의 구조적 본질을 해치지 않으면서도  
  객체 리터럴에 알 수 없는 속성을 허용치 않음으로써 위에서 다룬 Room이나 Options 같은    
  문제점을 방지할 수 있음 (=엄격한 객체 리터럴 체크)  
* 잉여 속성 체크는 객체리터럴이 아닐 경우 또는 타입 단언문을 사용할 경우 적용되지 않음
  ```ts  
  //타입 구문 없는 임시 변수 사용
  const intermediate = { darkmode: true, title: 'Ski Free' };
  const o1: Options = intermediate; //정상
    
  //객체리터럴 사용
  const o2: Options = { darkmode: true, title: 'Ski Free' }; //Error : Option 형식에 darkmode가 없습니다.
    
  //타입 단언문 사용
  const o3 = { darkmode: true, title: 'Ski Free' } as Options; //정상
  ```
* 잉여 속성 체크를 원치 않는다면,   
  인덱스 시그니처를 사용해 TS가 추가적인 속성을 예상하도록 할 수 있음    
  ```ts
  interface Options { 
    darkMode?: boolean;
    [otherOptions: string]: unknown;
  }
  const o1 = Options = {darkmode: true}; //정상
  ```
* 선택적 속성만 가지는 약한(weak) 타입에도 잉여 속성 체크와 비슷한 체크가 동작함
  ```ts
  interface LineChartOptions {
    logsacle?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
  }
  const opts = { logScale: true };
  const o2: LineChartOptions = opts; //Error : { logScale: boolean } 유형에 LineChartOptions 유형과 공통적인 속성이 없습니다.
  ```
  구조적 관점에서 LineChartOptions 타입은 모든 속성이 선택적이므로 모든 객체를 포함 가능함  
  이런 약한 타입에 대해 TS는 값 타입과 선언 타입에 공통된 속성이 있는지   
  확인하는 별도의 체크를 수행함 (=공통 속성 체크)  
  <br>
  공통 속성 체크는 잉여 속성 체크와 마찬가지로 오타를 잡는데 효과적이며 구조적으로 엄격하지 않음  
  그러나 잉여 속성 체크와는 달리 약한 타입과 관련된 할당문마다 수행됨  
  임시 변수를 제거하더라도 공통 속성 체크는 여전히 동작함  
* 잉여 속성 체크는 구조적 타이핑 시스템에서 허용되는 속성 이름의 오타 같은 실수를 잡는데 효과적.  
  선택적 필드를 포함하는 Options 같은 타입에 특히 유용한 반면,  
  적용 범위가 매우 제한적이며 오직 객체 리터럴에만 적용됨 (임시 변수 도입 시 잉여 속성 체크 건너뜀)    
  따라 한계점을 인지하고 잉여 속성 체크와 일반적인 타입 체크를 구분해 사용 필요  


## 12. 함수 표현식에 타입 적용하기
* JS, TS에서는 함수 문장과 함수 표현식을 다르게 인식함  
  ```ts
  function rollDice1(sides: number): number{}; //문장
  const rollDice2 = function(sides: number): number{}; //표현식
  const rollDice3 = (sides: number): number => {}; //표현식
  ```
* TS에서는 함수 표현식 사용을 권장함  
  함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언해 함수 표현식에 재사용 가능하기 떄문  
  ```ts
  type DiceRollFn = (sides: number) => number;
  const rollDice: DiceRollFn = sides => {};
  ```
* 함수 타입의 선언은 불필요한 코드의 반복을 줄임  
  함수 타입 선언을 이용했던 예제보다 타입 구분이 적으며, 함수 구현부도 분리되어 로직이 분명해짐  
  ```ts
  //함수 타입 선언 사용
  function add1(a: number, b: number) {return a + b};
  function sub1(a: number, b: number) {return a - b};
  function mul1(a: number, b: number) {return a * b};
  function div1(a: number, b: number) {return a / b};
  
  //반복되는 함수 시그니처를 하나의 함수 타입으로 통합
  type BinaryFn = (a: number, b:number) => number;
  const add2: BinaryFn = (a,b) => a + b;
  const sub2: BinaryFn = (a,b) => a - b;
  const mul2: BinaryFn = (a,b) => a * b;
  const div2: BinaryFn = (a,b) => a / b;
  ```
* 라이브러리는 공통 함수 시그니처를 타입으로 제공하기도 함  
  ex)   
  리액트는 함수의 매개변수에 명시하는 MouseEvent 타입 대신   
  함수 전체에 적용 가능한 MouseEventHandler 타입을 제공함  
  라이브러리를 제작하고 있다면 공통 콜백함수를 위한 타입 선언 제공을 권장함  
* 시그니처가 일치하는 다른 함수가 있을 때도 함수 표현식에 타입을 적용하면 좋음  
  ```ts
  // 상태 체크를 수행해 줄 checkedFetch 함수 작성
  declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  
  async function cehckedFetch(input: RequestInfo, init?: RequestInit) {
      const response = await fetch(input, init);
      if(!response.ok) {
          throw new Error('Request Failed : ' + response.status);
      }
      return response;
  }
  
  // 함수 표현식으로 바꾸고 함수 전체에 타입(typeof fetch)을 적용해서 더 간결해 작성
  // TS가 input과 init의 타입을 추론할 수 있게 하며, 반환 타입을 보장하고 fetch와 동일함 
  // 다른 함수의 시그니처를 참조하려면 typeof fn을 사용하면 됨
  const checkedFetch: typeof fetch = async (input, init) => {
      const response = await fetch(input, init);
      if(!response.ok) {
        throw new Error('Request Failed : ' + response.status);
      }
      return response;
  }
  ```
  에러를 throw가 아닌 return을 사용할 경우 Promise<Response | Error>형식은   
  Promise<Response> 형식에 할당할 수 없기 떄문에 오류가 발생하는데  
  위의 함수 문장으로 정의한 cehckedFetch 함수는 구현체가 아닌 함수 호출 위치에서 에러가 발생함  
  반면 함수표현식으로 작성한 아래 cehckedFetch 함수는 Fetch 구현체에서 에러가 발생함  
* 함수의 매개변수에 타입 선언을 하는 것보다 함수 표현식 전체 타입을 정의하는 편이 코드도 간결하고 안전함  
  따라 다른 함수의 시그니처와 동일한 타입을 가지는 새 함수를 작성하거나,   
  동일한 타입 시그니처를 가지는 여러개의 함수 작서잇에는 함수 전체의 타입 선언 적용을 권장함


## 13. 타입과 인터페이스의 차이점 알기
* TS에서 명명된 타입을 정의하는 방법은 2가지가 존재  
  ```ts
  //type으로 named type 정의
  type TState = {
      name: string;
      capital: string;
  }
  
  //inteface로 named type 정의
  interface IState {
      name: string;
      capital: string
  }
  ```
  (인터페이스 대신 클래스를 사용할 수도 있음)
* 대부분의 경우 타입이나 인터페이스 둘 다 사용해도 되지만, 차이점을 정확히 알고   
  같은 상황에서는 동일한 방법으로 명명된 타입을 정의해 일관성을 유지해야 함  
* 타입 네이밍 앞에 I(인터페이스) 또는 T(타입) 접두사를 붙이는 것은 C#에서 비롯된 관례.  
  이 영향을 받아 TS 초기에는 종종 사용했지만 현재는 지양해야 할 스타일로 여겨짐  
  표준 라이브러리에서도 일관성있게 도입되지 않았으므로 유용하지도 않음  

### 인터페이스와 타입 선언의 비슷한 점
* 명명된 타입은 인터페이스로 정의했든 타입으로 정의했든 상태에는 차이 없음
* 둘 다 모두 인덱스 시그니처 사용 가능
  ```ts
  type IDict = { [key: string]: string };
  interface IDict {
      [key: string]: string;
  }
  ```
* 둘 다 모두 함수 타입으로 정의 가능  
  단순한 함수 타입에는 타입 별칭 방법이 더 낫지만,  
  함수 타입에 추가적인 속성이 있다면 둘 중 어느것을 선택하든 차이 없음
  ```ts
  type TFn = (x: number) => string;
  interface IFn {
    (x: number): string;
  }
  
  const toStrT: TFn = x => '' + x; //정상
  const toStrI: IFn = x => '' + x; //정상
  
  //문법이 생소할 수 있지만 JS에서 함수는 호출 가능한 객체이므로 납득 가능함
  type TFnWithProperties = {
    (x: number): number;
    prop: string;
  }
  interface IFnWithProperties {
    (x: number): number;
    prop: string;
  }
  ```
* 타입 별칭과 인터페이스는 모두 제너릭 사용 가능
  ```ts
  type TPair<T> = {
      first: T;
      second: T;
  }
  interface IPair<T> {
    first: T;
    second: T;
  }
  ```
* 인터페이스와 타입 모두 확장 가능함  
  (인터페이스는 주의사항이 몇 가지 있음)
  ```ts
  interface IStateWithPop extends TState {
      population: number;
  }
  type TStateWithPop = IState & { population: number; };
  ```
  위의 IStateWithPop, TStateWithPop는 동일함  
  여기서 주의해야할 점은 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지 못함  
  (복잡한 타입을 확장하고 싶다면 타입과 &를 사용해야 함)  
  한편, 클래스를 구현(implements)할 때는, 타입(TState)과 인터페이스(IState) 둘 다 사용 가능함  
  ```ts
  class StateT implements TState {
      name: string = '';
      capital: string = '';
  }
  class StateI implements IState {
    name: string = '';
    capital: string = '';
  }
  ```

### 인터페이스와 타입 선언의 차이점
* 유니온 타입은 있지만 유니온 인터페이스라는 개념은 없음  
  `type AorB = 'a' | 'b'`
  유니은은 타입 확장을 할 수 없지만 유니온 타입 확장이 필요한 경우가 있음   
  ```ts
  //별도의 타입을 하나의 변수명으로 매핑해 만든 인터페이스
  type Input = {};
  type Output = {};
  interface VariableMap {
      [name: string]: Input | Output;
  }
  
  //유니온 타입에 name 속성을 붙인 타입
  type NamedVariable = (Input | Output) & {name: string};
  ```
  NamedVariable 타입은 인터페이스로 표현이 불가능함
* type 키워드는 일반적으로 interface보다 쓰임새가 많음  
  type 키워드는 유니온이 될 수도 있고, 매핑된 타입 또는 조건부 타입 같은 고급 기능에 활용되기도 함  
  튜플과 배열 타입도 type 키워드를 이용해 더 간결하게 표현 가능함  
  ```ts
  type Pair = [number, number];
  type StringList = string[];
  type NamedNums = [string, ...nubmer[]];
  ```
  인터페이스도 튜플과 비슷하게 구현할 수 있기는 하지만   
  튜플에서 사용 가능한 concat 같은 메서드들을 사용할 수 없음  
  그러므로 튜플은 type 키워드로 구현해야 함  
  ```ts
  interface Tuple {
      0: number;
      1: number;
      length: 2;
  }
  const t: Tuple = [10, 20]; //정상
  ```
* 반면 인터페이스는 타입에 없는 몇 가지 기능 존재함  
  그중 하나는 보강이 가능하다는 것.    
  ```ts
  interface IState {
    name: string;
    capital: string;
  }
  
  interface IState {
    population: number;
  }
  
  const wyoming: IState = {
    name: 'Wyoming',
    capital: 'Cheyenne',
    population: 500_000
  }; //정상
  ```
  이렇게 속성을 확장하는 것을 '선언 병합'이라고 함  
  선언 병합은 주로 타입 선언 파일에서 사용됨  
  따라 타입 선언 파일을 작성할 떄는 선언 병합을 지원하기 위해   
  반드시 인터페이스를 사용해야 하며 표준을 따라야 함  
  타입 선언에는 사용자가 채워야 하는 빈틈이 있을 수 있는데 바로 이 선언 병합이 그럼.  
* TS는 여러 버전의 JS 표준 라이브러리에서 여러 타입을 모아 병합함  
  예를 들어 Array 인터페이스는 lib.es5.d.ts에 정의되어 있고   
  기본적으로는 lib.es5.d.ts에 선언된 인터페이스가 사용됨  
  그러나 tsconfig.json의 lib 목록에 ES2015를 추가하면   
  TS는 lib.es2015.d.ts에 선언된 인터페이스를 병합함  
  여기에는 2015에 추가된 또 다른 Array 선언에 find 같은 메서드가 포함됨  
  이들은 병합을 통해 다른 Array 인터페이스에 추가되고   
  결과적으로 각 선언이 병합되어 전체 메서드를 가지는 하나의 Array 타입을 얻게 됨  
* 병합은 선언처럼 일반적인 코드라 언제든 가능하기 때문에  
  프로퍼티가 추가되는 것을 원하지 않는다면 인터페이스 대신 타입을 사용해야 함  

### 결론
* 복잡한 타입일 경우 고민할 것도 없이 타입 별칭 사용
* 타입과 인터페이스 두 가지 방법으로 모두 표현 가능한 간단한 객체 타입이라면   
  일관성과 보강의 관점에서 고려.  
  일관되게 인터페이스를 사용하는 코드 베이스에서 작업하고 있는 경우 인터페이스를 사용,  
  일관되게 타입을 사용 중이라면 타입을 사용
* 아직 스타일이 확립되지 않은 프로젝트일 경우,  
  향후 보강의 가능성이 있다면 인터페이스를 사용하는 것을 추천  
  (API가 변경될 때 사용자가 인터페이스를 통해 새로운 필드를 병합할 수 있어 유용하기 때문)  
  But, 프로젝트 내부적으로 사용되는 타입에 선언 병합이 발생하는 것은  
  잘못된 설계이므로 이런 경우 타입을 사용해야 함  


## 14. 타입 연산과 제너릭 사용으로 반복 줄이기
* DRY : Don't repeat yourself 원칙 (같은 코드를 반복하지 말라)  
  타입 중복은 코드 중복만큼 많은 문제를 발생시킴  
  따라 DRY 원칙을 타입에도 최대한 적용해야 함  
  타입 간의 매핑하는 방법을 익히면 타입 정의에서도 DRY의 장점을 적용할 수 있음  
* 반복을 줄이는 가장 간단한 방법은 반복되는 타입에 이름을 붙이는 것    
  상수를 사용해 반복을 줄이는 기법을 동일하게 타입 시스템에 적용한 것  
  ```ts
  function distance(a: {x: number, y: number}, b: {x: number, y: number}) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
  
  //타입이 이름 붙임
  interface Point2D {
      x: number;
      y: number;
  }
  function distance(a: Point2D, b: Point2D) {
      /*...*/
  }
  ```
* 하지만 중복된 타입 찾기가 항상 쉬운 것은 아님  
  중복된 타입은 종종 문법에 의해 가려지기도 하기 때문  
  그럴 경우 해당 시그니처를 명명된 타입으로 분리할 수 있음
  ```ts
  function get(url: string, opts: Options): Promise<Response> {} 
  function post(url: string, opts: Options): Promise<Response> {} 
  
  type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
  const get: HTTPFunction = (url, opts) => {};
  const post: HTTPFunction = (url, opts) => {};
  ```
* 한 인터페이스가 다른 인터페이스를 확장하게 해 반복을 제거할 수 있음  
  extends를 사용해 인터페이스 필드의 반복을 피해야 함  
  ```ts
  interface Person {
      firstName: string;
      lastName: string;
  }
  interface PersonWithBirthDate extends Person {
      birth: Date;
  }
  ```
  만약 두 인터페이스가 필드의 부분 집합을 공유한다면, 공통 필드만 골라 기반 클래스로 분리해낼 수 있음  
  또한 이미 존재하는 타입을 확장하는 경우 일반적이진 않지만 인터섹션 연산자를 사용할 수도 있음   
  `type PersonWithBirthDate = Person & { birth: Date };`  
  이런 기법은 유니온 타입(확장할 수 없는)에 속성을 추가하려할 때 특히 유용함  
* 전체 애플리케이션의 상태를 표현하는 State 타입과 단지 부분만 표현하는 TopNavState 타입이 있는 경우    
  TopNavState를 확장해 State를 구성하기보다,   
  State의 부분 집합으로 TopNavState를 정의하는것이 효율적으로 보임    
  이 방법이 전체 앱의 상태를 하나의 인터페이스로 유지할 수 있게 해줌  
  따라 State를 인덱싱 해 속성의 타입에서 중복을 제거할 수 있음 
  ```ts
  interface State {
      userId: string;
      pageTitle: string;
      recentFiles: string[];
      pageContents: string;
  }
  interface TopNavState {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
  }
  
  // State를 인덱싱 해 속성의 타입에서 중복을 제거
  type TopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
  }
  ```
  이제 State 내의 pageTitle 타입이 변경되면 TopNavState에도 반영됨  
  그러나 여전히 반복되는 코드 존재함  
  이 경우 매핑된 타입을 사용하면 반복되는 코드 줄일 수 있음    
  이 정의는 앞의 정의한 타입과 완전히 동일함  
  ```ts
  type TopNavState = {
      [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
  }
  ```
  매핑된 타입은 배열의 필드를 루프 도는 것과 같은 방식.  
  이 패턴은 표준 라이브러리에서도 일반적으로 찾을 수 있으며 Pick이라고 함    
  `type Pick<T, K> = { [k in K]: T[K] };`  
  정의가 완전하지는 않지만 아래처럼도 사용 가능
  `type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;`  
  (여기서 Pick은 제너릭 타입)   
  Pick은 T, K 두 가지 타입을 받아 결과 타입을 반환함  
* 태그된 유니온에서도 다른 형태의 중복 발생할 수 있음  
  ```ts
  //단순히 태그를 붙이기 위해 타입을 사용할 경우
  interface SaveAction {
      type: 'save',
  }
  interface LoadAction {
      type: 'load',
  }
  type Action = SaveAction | LoadAction;
  type ActionType = 'save' | 'load'; //타입 반복
  
  //Action 유니온을 인덱싱하면 타입 반복 없이 ActionType 정의 가능
  type ActionType = Action['type']; //타입은 'save' | 'load'
  ``` 
  Action 유니온에 타입을 더 추가하면 ActionType은 자동적으로 그 타입을 포함함  
  ActionType은 Pick을 사용해 얻게되는 type 속성을 가지는 인터페이스와는 다름
  `type ActionRec = Pick<Action,  'type'>; //{type: 'save' | 'load'}`
* 생성하고 난 다음 업데이트가 되는 클래스를 정의한다면   
  update 메서드 매개변수의 타입은 생성자와 동일한 매개변수이면서   
  타입 대부분이 선택적 필드가 됨
  ```ts
  interface Options {
    width: number;
    height: number;
    color: string;
    loabel: string;
  }
  
  interface OptionsUpdate {
    width?: number;
    height?: number;
    color?: string;
    loabel?: string;
  }
  
  class UIWidget {
    constructor(init: Options) {}
    update(options: OptionsUpdate) {}
  }
  ```
  매핑된 타입과 keyof를 사용하면 Options으로부터 OptionsUpdate를 만들 수 있음  
  `type OptionsUpdate = {[k in keyof Options]?: Options[k]};`  
  keyof는 타입을 받아 속성 타입의 유니온을 반환함  
  `type OptionsKeys = keyof Options; //'width' | 'height' | 'color' | 'label'`  
  매핑된 타입([k in keyof Options])은 순회하면 Options 내 k 값에 해당하는 속성이 있는지 찾음  
  ?는 각 속성을 선택적으로 만듬  
  이 패턴 역시 아주 일반적이며 표준 라이브러리에 Partial라는 이름으로 포함되어 있음
  ```ts
  class UIWidget {
    constructor(init: Options) {}
    update(options: Partial<Options>) {}
  }
  ```
* 값의 형태에 해당하는 타입을 정의하고 싶을 때는 typeof를 사용하면 됨
  ```ts
  const INIT_OPTIONS = {
    width: 640,
    height: 480,
    color: '#00ff00',
    label: 'VGA'
  };
  
  interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
  }
  
  type Options = typeof INIT_OPTIONS; //위의 interface Options과 같음
  ```
  여기에서 사용한 typeof는 타입스크립트 단계에서 연산되며 훨씬 더 정확하게 타입을 표현함  
  그런데 값으로부터 타입을 만들어낼 때는 선언에 순서에 주의해야 함  
  타입 정의를 먼저하고 값이 그 타입에 할당 가능하다고 선언해야   
  타입이 더 명확해지고 예상 어려운 타입 변동을 방지할 수 있음  
* 함수나 메서드의 반환값에 명명된 타입을 만들고 싶은 경우 ReturnType 제너릭을 사용  
  ```ts
  function getUserInfo(userId: string) {
    return {
      userId,
      name,
      age,
      height,
      weight,
      favoriteColor
    };
  }
  //추론된 반환 타입은 {userId: string, name: string, ...}
  
  type UserInfo = ReturnType<typeof getUserInfo>;
  ```
  ReturnType은 함수의 값인 getUserInfo가 아니라 함수의 타입인 typeof getUserInfo에 적용됨  
  (typeof와 마찬가지로 사용할 때 적용 대상이 값인지 타입인지 정확히 알고 구분해서 처리해야 함)  
* 제네릭 타입은 타입을 위한 함수와 같음  
  (타입에 대한 DRY 원칙의 핵심은 제네릭)    
  타입을 반복하는 대신 제너릭 타입을 사용해 타입들 간 매핑을 하는 것이 좋음  
  함수에서 매개변수로 매핑할 수 있는 값을 제한하기 위해 타입 시스템을 사용하는 것처럼  
  제네릭 타입에서 매개변수를 제한할 수 있는 방법이 필요함    
  제네릭 타입을 제한하려면 extends를 사용하면 됨  
  extends를 사용하면 제네릭 매개변수가 특정 타입을 확장한다고 선언할 수 있음  
  ```ts
  interface Name {
      first: string;
      last: string;
  }
  type DancingDuo<T extends Name> = [T, T];
  
  const couple1: DancingDuo<Name> = [
    {first: 'Fred', last: 'Astaire'},
    {first: 'Ginger', last: 'Rogers'},
  ]; //OK
  
  const couple2: DancingDuo<{first: string}> = [
      // Name 타입에 필요한 last 속성이 {first: string;} 타입에 없습니다.
    {first:'Sonny'},
    {first:'Cher'},
  ];
  // {first: string}은 Name을 확장하지 않기 떄문에 오류가 발생함
  ```
  표준 라이브러리에 정의된 Pick, Partial, ReturnType 등의 제네릭 타입에 익숙해져야 함  
* 현재의 TS에서는 선언부에 항상 제너릭 매개변수를 작성하도록 되어 있음  
  DancingDuo<Name> 대신 DancingDuo를 쓰면 동작하지 않음  
  TS가 제네릭 매개변수의 타입을 추론하게 하기 위해, 함수 작성시에는 신중하게 타입을 고려해야 함  
* 앞에 나온 Pick의 정의는 extends를 사용해 완성할 수 있음  
  타입 체커를 통해 기존 예제를 실행해보면 오류 발생함  
  ```ts
  type Pick<T, K> = {
      [k in K]: T[K] //K타입은 string | number | symbol 타입에 할당할 수 없습니다.
  };
  
  /*
  K는 T타입과 무관하고 범위가 너무 넓음.
  K는 인덱스로 사용 가능한 string | number | symbol이 되어야 하며
  T의 키의 부분 집합, 즉 keyof T가 되어야 함
  */
  type Pick<T, K extends keyof T> = {
      [k in K]: T[k]
  }; //정상
  ```
  타입이 값의 집합이라는 관점에서 생각하면 extends를 확장이 아닌 부분집합이라는 걸 이해 가능함


## 15. 동적 데이터에 인덱스 시그니처 사용하기
* JS의 장점 중 하나는 객체를 생성하는 문법이 간단하다는 것.  
  JS 객체는 문자열 키를 타입의 값에 관계없이 매핑함  
  TS에서는 타입에 인덱스 시그니처를 명시해 유연하게 매핑을 표현할 수 있음  
  ```ts
  type Rocket = { [property: string]: string };
  const trocket: Rocket = {
    name: 'Falcon 9',
    variant: 'v1.0',
    thrust: '4,940 kN',
  }; //정상
  ```
* `[property: string]: string`이 인덱스 시그니처이며 세 가지 의미를 담고 있음  
  * 키의 이름 : 키의 위치만 표시하는 용도.   
    타입 체커에서는 사용하지 않으므로 무시 가능한 참고 정보라고 생각하면 됨  
  * 키의 타입 : string | number | symbol의 조합이어야 하지만 보통 string을 사용함
  * 값의 타입 : 어떤 타입이든 가능
* 이렇게 타입 체크가 수행되면 네 가지 단점이 드러남
  * 잘못된 키를 포함해 모든 키를 허용함.   
    (name대신 Name으로 작성해도 유효한 Rocket 타입이 됨)
  * 특정 키가 필요하지 않음
    ({}도 유효한 Rocket 타입이 됨)
  * 키마다 다른 타입을 가질 수 없음
  * TS 언어 서비스가 도움이 되지 못함  
    (name: 입력 시 키는 무엇이든 가능하기 떄문에 자동 완성 기능 동작하지 않음)
* 따라 인덱스 시그니처는 부정확하므로 더 나은 방법을 찾아야 함    
  고로 Rocket은 인터페이스여야 함
  ```ts
  interface Rocket {
    name: string;
    variant: string;
    thrust_kN: number;
  };
  const falconHeavy: Rocket = {
    name: 'Falcon Heavy',
    variant: 'v1',
    thrust_kN: 15_200
  }
  ```
  thrust_kN은 number 타입이고 TS는 모든 필수 필드가 존재하는지 확인하므로  
  TS에서 제공하는 언어 서비스를 모두 사용할 수 있음(자동완성, 정의로 이동, 이름 바꾸기 등)
* 런타임 떄까지 객체의 속성을 알 수 없을 경우(동적 데이터)에만 인덱스 시그니처 사용을 권장함   
  예를 들어 CSV 파일처럼 헤더 행에 열 이름이 있고,   
  데이터 행을 열 이름과 값으로 매핑하는 객체로 나타내고 싶은 경우    
  일반적인 상황에서 열 이름이 무엇인지 미리 알 방법이 없음. 이럴 때 인덱스 시그니처를 사용함  
  ```ts
  //열 이름을 모를 경우
  function parseCSV(input: string): {[columnName: string]: string}[] {
      const lines = input.split('\n');
      const [header, ...rows] = lines;
      const headerColumns = header.split(',');
      return rows.map(rowStr => {
          const row: {[columnName: string]: string} = {};
          rowStr.split(',').forEach((cell, i) => {
            row[headerColumns[i]] = cell;
          });
          return row;
      });
  }
  
  //열 이름을 알고 있는 특정 상황이라면 미리 선언해둔 타입으로 단언문 사용
  interface ProductRow {
      productId: string;
      name: string;
      price: string;
  }
  declare let csvData: string;
  const products = parseCSV(csvData) as unknown as ProductRow[];
  
  //선언해둔 열들이 런타임에 실제로 일치한다는 보장 없기 떄문에  
  //안전한 접근을 위해 인덱스 시그니처의 값 타입에 undefined를 추가함
  function safeParseCSV (input:string): {[columnName: string]: string | undefined}[] {
      return parseCSV(input);
  }
  
  //이제 모든 열의 undefined 여부를 체크해야 함
  //체크를 추가해야하므로 작업이 번거로울 수 있음. 
  //따라 undefined를 추가할지는 상황에 맞게 판단 필요.
  const rows = parseCSV(csvData);
  const prices: {[product: string]:number} = {};
  for (const row of rows) {
      prices[row.productId] = Number(row.price);
  }
  
  const safeRows = safeParseCSV(csvData);
  for (const row of safeRows) {
      prices[row.productId] = Number(row.price);
      //Error : undefined 형식을 인덱스 형식으로 사용할 수 없습니다.
  }
  ```
* 연관 배열의 경우, 객체에 인덱스 시그니처를 사용하는 대신 Map 타입을 사용할 수 있음  
  이는 프로토타입 체인과 관련된 유명한 문제를 우회함.  
* 어떤 타입에 가능한 필드가 제한되어 있는 경우라면 인덱스 시그니처로 모델링하지 말아야 함  
  선택적 필드 또는 유니온 타입으로 모델링하면 됨
  ```ts
  interface Row1 {[column: string]: number} //너무 광범위
  interface Row2 { a: number; b?: number; c?: number; d?: number; } //최선
  type Row3 = 
          | {a: number;} 
          | {a: number; b:number;} 
          | {a: number; b:number; c:number;} 
          | {a: number; b:number; c:number; d:number;}; //가장 정확하지만 사용하기 번거로움
  ```
* string 타입이 너무 광범위해서 인덱스 시그니처를 사용하는데 문제가 있다면,  
  다른 두 가지 대안이 있음
  1. Record를 사용하는 방법  
     Record는 키 타입에 유연성을 제공하는 제너릭 타입.  
     특히 string의 부분 집합을 사용할 수 있음
     ```ts
     type Vec3D = Record<'x' | 'y' | 'z', number>;
     // 아래와 같음
     // type Vec3D = {
     //     x: number;
     //     y: number;
     //     z: number;
     // }
     ```
  2. 매핑된 타입을 사용하는 방법 
     매핕된 타입은 키마다 별도 타입을 사용하게 해줌  
     ```ts
     type Vec3D = {[k in 'x' | 'y' | 'z']: number};
     //아래와 같음
     // type Vec3D = {
     //     x: number;
     //     y: number;
     //     z: number;
     // }
     
     type ABC = {[k in 'a' | 'b' | 'c']: k extends 'b' ? string : number};
     //아래와 같음
     // type ABC = {
     //     a: number;
     //     b: string;
     //     c: number;
     // }
     ```
* 가능하다면 인덱스 시그니처보다 인터페이스, Record, 매핕된 타입 같은 정확한 타입 사용을 권장함\


## 16. number 인덱스 시그니처보다는 Array, 튜플, ArrayLike를 사용하기
* JS는 자유도가 너무 높기로 유명한 언어이고,  
  그 중 가장 악명 높은 것은 암시적 타입 강제와 관련된 부분.  
  `"0" == 0 //true`  
  다행히 이런 암시적 타입 강제와 관련된 문제는 대부분 `===`와 `!==`를 사용해 해결 가능함  
* JS 객체 모델에도 이런 이상한 부분들이 있으며,  
  이 중 일부는 TS 타입 시스템으로 모델링되기 때문에 JS 객체 모델을 이해하는 것이 중요함  
* JS에서 객체란 키/값 쌍의 모음.  
  키는 보통 문자열(ES2015 이후로는 심벌도 가능)이며, 값은 어떤 것이든 될 수 있음  
  파이썬이나 자바에서 볼 수 있는 '해시 가능' 객체라는 표현이 JS에는 없음  
  * 만약 더 복잡한 객체를 키로 사용하려하면,   
    toString 메서드가 호출되어 객체가 문자열로 변환됨
  * 특히 숫자는 키로 사용할 수 없음.  
    만약 속성 이름으로 숫자를 사용한다면 JS 런타임은 문자열로 변환함  
  * 배열은 객체이므로 키는 숫자가 아니라 문자열.    
    Object.keys를 사용해 배열의 키를 나열하면 키가 문자열로 출력됨  
* TS는 위 같은 혼란을 바로잡기 위해 숫자 키를 허용하고, 문자열 키와 다른 것으로 인식함  
  (Array에 대한 타입 선언은 lib.es5.d.ts에서 확인 가능)  
  ```ts
  interface Array<T> {
    //...
    [n:number]: T;
  }
  ```
  TS 타입 시스템의 다른 것들과 마찬가지로 타임 정보는 런타임에 제거되며,  
  ECMAScript 표준이 서술하는 것처럼 문자열 키로 인식하지만   
  타입 체크 시점에 오류를 잡을 수 있어 유용함  
  즉, 인덱스 시그니처로 사용된 number 타입은 버그를 잡기 위한 순수 TS 코드.  
* 한편, Object.keys 같은 구문은 여전히 문자열로 반환됨
  ```ts
  const xs = [1,2,3];
  const keys = Object.keys(xs); //타입이 string[]
  
  for (const key in xs) {
      key; //타입이 string
      const x = xs[key]; //타입이 number
  }
  /*
  string이 nubmer에 할당될 수 없기 떄문에 마지막 줄이 동작하는게 이상해 보일 수 있음  
  배열을 순회하는 코드 스타일에 대한 실용적인 허용임.  
  JS에서는 흔한 일이지만 배열을 순회하기에 좋은 방법은 아님  
  */
  
  //index를 신경쓰지 않는다면 for of문 사용을 권장함
  for (const x of xs) {
      x; //타입이 nubmer
  }
  
  //만약 index의 타입이 중요하다면 
  //number 타입을 제공해줄 Array.prototype.forEach를 사용하면 됨
  xs.forEach((x,i) => {
      i; //타입이 number
      x; //타입이 number
  });
  
  //루프 중간에 멈춰야 한다면 C 스타일인 for 루프 사용을 권장
  for (let i=0; i<xs.length; i++) {
      const x = xs[i];
      if (x<0) break;
  }
  ```
  타입이 불확실하다면 for-in 루프는 대부분의 브라우저와 JS 엔진에서   
  for-of, for 루프에 비해 몇 배나 느림  
* 인덱스 시그니처가 number로 표현되어 있다면 입력한 값이 number여야 하지만  
  (for-in 루프는 확실히 제외), 실제 런타임에 사용되는 키는 string 타입.  
  일반적으로 string 대신 number를 타입의 인덱스 시그니처로 사용할 경우는 많지 않음  
  만약 숫자를 사용해 인덱스할 항목을 지정한다면 Array 또는 튜플 타입을 대신 사용하게 될 것.  
  nubmer를 인덱스 타입으로 사용하면 숫자 속성이 어떤 특별한 의미를 지닌다는 오해를 불러 일으킬 수 있음  
* 어떤 길이를 가지는 배열과 비슷한 형태의 튜플을 사용하고 싶다면   
  TS에 있는 ArrayLike 타입을 사용.  
  ArrayLike를 사용하더라도 키는 여전히 문자열.  
  ```ts
  function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
    if (i < xs.length) {
      return xs[i];
    }
    throw new Error(`배열의 끝을 지나 ${i}에 접근하려고 했습니다.`);
  }
  
  const tupleLike: ArrayLike<string> = {
    '0': 'A',
    '1': 'B',
    length: 2
  }; //정상
  ```
* 따라 인덱스 시그니처에 number를 사용하기보다 Array, 튜플, ArrayLike 타입 사용을 권장함


## 17. 변경 관련된 오류 방지를 위해 readonly 사용하기
```ts
function arraySum(arr: readonly number[]) {
    let sum = 0, num;
    while((num = arr.pop()) !== undefined) {
        //Error : readonly number[] 형식에 pop 속성이 없습니다.
        sum += num;
    }
    return sum;
}
```
* readonly를 사용하면 변경하면서 발생하는 오류를 방지할 수 있고,  
  변경이 발생하는 코드도 쉽게 찾을 수 있음
* `readonly number[]`는 타입이고, `number[]`와 구분되는 몇 가지 특징이 있음 
  * 배열의 요소를 읽을 수 있지만, 쓸 수는 없음
  * length를 읽을 수 있지만, 바꿀 수는 없음 (배열을 변경함)
  * 배열을 변경하는 pop을 비롯한 다른 메서드를 호출할 수 없음
* `number[]`는 `readonly number[]`보다 기능이 많기 때문에,   
  `readonly number[]`의 서브타입이 됨.  
  따라 변경 가능한 배열을 readonly 배열에 할당할 수 있음  
  (그 반대는 불가능)
  ```ts
  const a: number[] = [1,2,3];
  const b: readonly number[] = a;
  const c: number[] = b; //Error: readonly number[] 타입은 readonly이므로 변경 가능한 number[] 타입에 할당될 수 없습니다.
  ```
  타입 단언문 없이 readonly 접근 제한자를 제거할 수 있다면   
  readonly는 쓸모없으므로 오류 발생하는게 맞음
* 매개변수를 readonly로 선언하면 아래와 같은 일이 생김
  * TS는 매개변수가 함수 내에서 변경이 일어나는지 체크함
  * 호출하는 쪽에서는 함수가 매개변수를 변경하지 않는다는 보장을 받게 됨
  * 호출하는 쪽에서 함수에 readonly 배열을 매개변수로 넣을 수도 있음
* JS/TS에서는 명시적으로 언급하지 않는 한, 함수가 매개변수를 변경하지 않는다고 가정함  
  그러나 이로인해 타입 체크에 문제가 일어날 수 있음.  
  따라 명시적인 방법을 사용하는 것이 좋음  
* 만약 함수가 매개변수를 변경하지 않는다면, readonly로 선언해야 함  
  더 넓은 타입으로 호출할 수 있고, 의도치 않은 변경은 방지될 것.    
  즉, readonly 매개변수는 인터페이스를 명확하게 하며, 매개변수가 변경되는 것을 방지함
* readonly로 선언해서 생긴 단점을 굳이 찾자면   
  매개변수가 readonly로 선언되지 않은 함수를 호출해야 할 경우도 있다는 것.    
  만약 함수가 매개변수를 변경하지 않고도 제어가 가능하다면 readonly로 선언하면 됨.  
  어떤 함수를 readonly로 만들면 그 함수를 호출하는 다른 함수도 모두 readonly로 만들어야하기 때문에  
  오히려 인터페이스를 명확히 하고 타입 안정성을 높일 수 있음  
  그러나 타 라이브러리의 함수를 호출하는 경우 타입 선언을 바꿀 수 없으므로 타입 단언문을 사용해야 함   
* readonly를 사용하면 지역 변수와 관련된 모든 종류의 변경 오류를 방지할 수 있음  
  ```ts
  function parseTaggedText(lines: string[]): string[][] {
    const currPara: readonly string[] = [];
    const paragraphs: string[][] = [];
  
    const addParagraph = () => {
          if(currPara.length) {
              paragraphs.push(currPara); //currpara의 내용이 삽입되지 않고 배열의 참조가 삽입됨
            // Error: readonly string[] 형식의 인수는 string[]형식의 매개변수에 할당될 수 없습니다.
              currPara.length = 0; //currpara 배열을 비움. 따라 paragraphs 요소에도 변경이 반영됨
            // Error : 읽기 전용 속성이기 때문에 length에 할당할 수 없습니다.
          }
      };
      
      for (const line of lines) {
          if (!line) {
              addParagraph();
          } else {
              currPara.push(line); //readonly string[] 형식에 push 속성이 없습니다.
          }
      }
      addParagraph();
      return paragraphs;
  }
  /*
  위 코드는 텍스트 문자열을 넣고 실행하면 [[], [], []] 출력이 됨. 오류.
  문제점은 별칭과 변경을 동시에 사용해 발생함
  위의 코드는 currPara를 let으로 선언하고 변환없는 메서드를 사용함으로써 오류를 고칠 수 있음  
  */
  let currPara: readonly string[] = [];
  //...
  currPara = []; //배열을 비움
  //...
  currPara = currPara.concat([line]);//concat은 원본을 수정하지 않고 새 배열을 반환함  
  /*
  선언부를 const에서 let으로 바꾸고 readonly를 추가함으로써 한쪽의 변경 가능성을 또 다른 쪽으로 옮긴 것.
  currPara 변수는 이제 가리키는 배열을 자유롭게 변경할 수 있지만, 
  그 배열 자체는 변경하지 못하게 됨
  
  여전히 남아있는 paragraphs에 대한 오류를 바로잡는 방법은 3가지가 있음
  
  1. currPara의 복사본을 만드는 방법
  paragraphs.push([...currPara]);
  currPara는 readonly로 유지되지만 복사본은 원하는대로 변경이 가능하므로 오류가 사라짐
  
  2. paragraphs(그리고 함수의 변환 타입)을 readonly string[]의 배열로 변경하는 방법
  const paragraphs:(readonly string[])[] = [];
  여기서 괄호가 중요한데 readonly string[][]은 
  readonly 배열의 변경 가능한 배열이 아닌 변경 가능한 배열의 readonly 배열이기 때문.
  이 방법은 동작하지만 해당 함수를 사용하는 사용자에게는 불편할 수 있음
  이미 함수가 반환한 값에 대해 영향을 끼치는 것이 맞는 방법인지 고민해봐야 함
  
  3. 배열의 readonly 속성을 제거하기 위해 단언문을 사용하는 방법
  paragraphs.push(currPara as string[]);
  바로 다음 문장에서 currPara를 새 배열에 할당하므로 매우 공격적인 단언문처럼 보이지는 않음
  */
  ```
* readonly는 얕게 동작한다는 것에 유의하며 사용해야 함  
  만약 객체의 readonly 배열이 있다면, 그 객체 자체는 readonly가 아님
  ```ts
  const dates: readonly Date[] = [new Date()];
  dates.push(new Date()); //readonly Date[] 형식에 push 속성이 없습니다.
  dates[0].setFullYear(2037); //정상
  ```
* 비슷한 경우가 readonly의 사촌격이자 객체에 사용되는 Readonly 제너릭에도 해당됨
  ```ts
  interface Outer {
      inner: {
          x: number;
      }
  }
  const o: Readonly<Outer> = { inner: {x: 0} };
  o.inner = {x:1}; //Error: 읽기 전용 속성이기 때문에 inner에 할당할 수 없습니다.
  o.inner.x = 1; //정상
  ```
  타입 별칭을 만든 뒤 정확히 무슨일이 일어나는지 IDE에서 확인할 수 있음
  ```ts
  type T = Readonly<Outer>;
  // Type T = {
  //     readonly inner: {
  //        x: number; 
  //     }
  // }
  ```
* 중요한 것은 readonly 접근제어자는 inner에 적용되는 것이지 x는 아니라느 넋.  
  현재 시점에는 deep readonly 타입이 기본으로 지원되지 않지만,  
  제너릭을 만들면 깊은 readonly 타입 사용이 가능함  
  그러나 제너릭은 만들기 까다롭기 때문에 라이브러리 사용을 권장함  
  (ts-essentials의 DeepReadonly 제너릭 사용 등)
* 인덱스 시그니처에도 readonly를 사용할 수 있음  
  읽기는 허용하되 쓰기를 방지하는 효과가 있음 (객체의 속성이 변경되는 것을 방지) 
  ```ts
  let obj: {readonly [k: string]: number} = {};
  //또는 Readonly<[k: string]: number>
  obj.hi = 45; //...형식의 인덱스 시그니처는 읽기만 허용됩니다.
  obj = {...obj, hi:12}; //정상
  obj = {...obj, bye:34}; //정상
  ```


## 18. 매핑된 타입을 사용하여 값을 동기화하기
* 매핑된 타입을 사용해 관련된 값과 타입을 동기화하도록 함
* 인터페이스에 새로운 속성을 추가할 때, 선택을 강제하도록 매핑된 타입을 고려해야 함
