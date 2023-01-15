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
