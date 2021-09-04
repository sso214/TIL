---
title : 타입스크립트 기초   
date : 2021.09.05
---

# 타입스크립트 기초
자바스크립트는 강타입 언어가 아니므로 변수 선언 시 자료형을 정의할 필요 없음  
이 때문에 더 유연하고 다른 자료형의 값도 수용할 수 있지만 코드가 더 혼란스러워지고 버그 발생도 쉬워짐  
타입스크립트를 사용하면 특히 협업할 때 유용함

## 타입스크립트란?
* 마이크로소프트에서 몇 년전에 만든 타입스크립트는 자료형을 명시하는 방식을 지원하고 일반 자바스크립트로 컴파일 됨.  
* 자료형이 있는 자바스크립트 상위집합  
  (상위집합이라는 뜻은 타입스크립트 파일에 일반 자바스크립트를 작성해도 되며 오류가 발생하지 않음을 뜻함)
* 브라우저는 타입스크립트를 이해하지 못하므로 일반 자바스크립트로 트랜스파일해야함


## 타입스크립트 사용 방법
1. 타입스크립트를 사용하기 위해서는 타입스크립트를 설치해야 함 `npm install -g typescript`
2. 그 후 IDE를 열고 test.ts 같은 확장명이 ts인 파일 생성  
3. 타입스크립트 코드 작성 후 명령어를 통해 컴파일 `tsc 파일명.ts`
4. 트랜스파일된 자바스크립트 파일 생성됨 (트랜스파일 과정에서 자료형 선언이 제거됨)  

이렇게 자료형을 명시하는 타입스크립트를 사용하면 디버그하고 오류 줄이는데 도움이 됨

## 타입스크립트 기본 자료형
타입스크립트의 기본 자료형은  
boolean, number, string, Array, object, 튜플, enum, any, void, null/undefined, never가 있음

### boolean
true / false
```ts
const active: boolean = true;
```

### number
JS와 마찬가지로 10진, 6진, 2진, 8진 리터럴을 지원함
```ts
const decimal:number = 9;
const hex:number = 0xf00d;
const binary:number = 0b1010;
const octal:number = 0o744;
```

### string
텍스트 형태의 데이터 저장
```ts
const message:string = "hi";
```

### Array
Array 자료형 정의에는 두 가지 방법이 있음
```ts
//첫번째 방법 : type[]
const firstArray: number[] = [1,2,3];

//두번째 방법 : Array<type>
const secondArray: Array<number> = [4,5,6];
```
숫자 자료형보다 복잡한 자료형이 사용될 경우 첫번째 방법은 사용할 수 없음
```ts
//label, value 속성을 가진 객체의 배열을 인수로 받는 함수
function example(arg:Array<{label:string, value:string}>) {}
```

### Object
객체 object는 원시 자료형이 아닌 모든 자료형 값을 가리킴  
여러 속성 포함이 가능하며 속성 값은 원시 자료형, 객체, 함수 등이 될 수 있음
```ts
// 접근하려는 속성 이름이 object 자료형에 존재하지 않을 경우 오류 발생함.
function greetUser(user: object) {
  console.log(`hello ${user.name}`);
}

greetUser({name: 'leo', age: 25});

// 위의 코드 중 해당 객체의 속성을 더 자세히 정의
function greetUser2(user: { name: string, age: number }) {
  //객체의 모든 속성을 명시적으로 지정한 덕분에 쉽게 해당 객체로 무엇을 할 수 있고 없는지 알 수 있음
  console.log(`hello ${user.name}`);
}

greetUser2({name: 'leo', age: 25});
```

### 튜플
* 튜플 사용시 배열의 원소에 자료형을 정의할 수 있음  
* 튜플에 정의된 인덱스의 자료형은 알고 있지만 배열에 새롭게 추가되는 원소의 자료형을 알 수 없음
```ts
let myTuple: [string, number, string];
myTyple = ['hi', 5, 'hello'];
console.log(myTuple); //['hi', 5, 'hello']
```

### enum
* 열거형 enum 사용 시 숫자 집합에 이름을 부여할 수 있음
* 열거형 내부의 값은 0부터 시작
* 시작 값을 지정해 열거 자료형의 숫자를 원하는 값부터 할당 가능함
* 숫자를 이용해 열거 자료형의 값에 접근 가능
```ts
enum Status {deleted, pending, active};
const blogPostStatus = Status.active;
console.log(blogPostStatus); //2

enum Status2 {deleted=-1, pending, active};
const memoPostStatus = Status.active;
console.log(blogPostStatus); //1
console.log(Status2[0]); //pending
```

### any
* any는 특정 변수의 값이 무엇이든 될 수 있음을 의미.  
* 서드 파티 라이브러리가 타입스크립트를 지원하지 않는 경우나 자바스크립트에서 기존 코드들을 활용하면서 부분적으로 타입스크립트를 적용할 때 사용 가능
* any는 존재하지 않을 수 있는 속성과 메서드에 접근할 수 있도록 허용함
* 자료형의 일부만 알고 있는 경우에도 any 사용 가능
```ts
//두 변수 모두 object 자료형이 될 것으로 예상되지만 속성이 확실하지 않으므로 any 사용
let firstUser:Object<any> = {
  name: 'leo',
  age: 25
};
let secondUser: Object<any> = {
    name: 'emily'
}
```

### void
* 자료형이 없음을 정의
* 아무것도 반환하지 않는 함수에서 반환 값을 정의할 떄 주로 이용
* void 자료형의 변수 선언 시 null과 undefined만 할당 가능함
```ts
//객체를 받아 데이터베이스에 저장하지만 아무것도 반환하지 않는 함수. 반환값을 void로 지정
function storeValueInDatabase(objectToStore):void {
    
}
```

### null과 undefined
void와 마찬가지로 null/undefined 자료형의 변수를 만드는 것은  
null과 undefined 값만 할당 가능하기 때문에 그다지 유용하지 않음  

### never
* never는 절대 발생시키지 않는 값
* 반환을 아예 하지 않거나 항상 오류 발생시키는 함수에 사용 가능함
```ts
//오류만 발생시키며 값을 반환하지 않는 함수
function throwError(error:string):never {
    throw new Error(error);
}
```

## 인터페이스와 클래스

### 인터페이스
변수 형태가 복잡해저 여러곳에서 재사용해야 할 때 유용  
인터페이스를 사용하면 해당 변수가 가져야 하는 형태를 정의할 수 있음
* 인터페이스는 객체가 아님
* 속성의 각 행 끝에 ,가 아닌 ;를 사용
* 선택적 속성도 설정 가능 (속성 이름 뒤에 ?)  
  => 해당 속성 없이 새로운 객체 생성해도 오류 발생 X
* readonly 키워드 사용해 객체 생성 후 특정 속성을 편집 불가능하도록 하는 것도 가능  
  => 객체 생성 시 해당 속성 설정하고 생성된 이후에는 변경 불가능
* 인터페이스를 사용해 객체뿐 아니라 함수의 형태도 정의 가능  
  (함수의 형태를 인터페이스로 만든 후, 해당 인터페이스를 자료형으로 가지는 변수를 정의. 해당 변수에 정해진 형태의 함수를 만들어 할당)
```ts
interface Car {
    readonly wheels:number;
    color:string;
    brand:string;
    coupe?:boolean; //선택적 속성
}

interface Greet{
  (greeting:string, name:string):string
}
let greetingFunction:Greet;
greetingFunction = (greetin:string, name:string):string => {
    console.log(`${greeting} ${name}`);
    return `${greeting} ${name};`
}
greetingFunction('Bye', 'Max');
```

### 인터페이스 확장
인터페이스는 다른 인터페이스를 상속받을 수 있음  
(상속받을 시 새로 정의한 속성 뿐 아니라 상속된 속성도 포함하게 됨)
```ts
interface Vehicle {
    wheels:number;
    color:string;
}
interface Airplane extends Vehicle {
    wings:number;
    rotors:number;
}
```

### 클래스
* 타입스크립트에서 클래스는 ES6의 클래스와 유사함  
* 프로토타입 상속을 수행해 재사용 가능한 구성 요소를 만들 수 있음
* ES6 클래스와의 차이점은 타입스크립트를 사용하면 클래스 멤버에 접근하는 권한을 설정할 수 있다는 점  
  * 어디서나 접근 가능할 경우 public 키워드 사용  
  * 자바스크립트에서 모든 클래스 멤버는 공개되기 때문에 접근 제한이 불가능하지만 타입스크립트는 멤버를 비공개로 지정해 클래스 외부에서 접근 불가능하게 막을 수 있음  
    (타입스크립트로 코드 작성 시에는 접근 못하게 막을 수 있지만 트랜스파일되어 생성된 자바스크립트 코드에서까지 접근 막는 건 불가능)
  * 멤버에 protected 키워드 적용 시 해당 클래스와 클래스를 상속받은 클래스 내에서만 접근 가능

```ts
class Animal {
  public eat = () => {
    console.log('gnam gnam');
  };
  protected play = () => {
      console.loG('wow');
  };
  sleep = () => {
    console.log('zzz');
  };
}
class Human extends Animal {
    public doPlay = () => {
        console.log(this.play); 
        //Human 클래스는 Animal 클래스를 확장하므로 protected 메서드에 접근 가능
    };
    private work = () => {
        console.log('zzzzzzz');
    };
}
const me = new Human();
me.work(); //Property 'work' is private and only accessible within class 'Human'
me.eat(); //gnam gnam
me.sleep(); //zzz

const dog = new Animal();
dog.eat(); //gnam gnam
```


## 유니언 자료형과 인터섹션 자료형
기본 자료형보다 더 발전된 자료형

### 유니언 자료형
* 변수는 문자열일 수도 있고, 문자열 배열일 수도 있음.  
* 아래와 같이 정의하는 방식을 유니언 자료형이라고 함 (파이프 기호로 각 자료형 구분)
* 모든 자료형의 유니언 공통 속성에만 접근 가능
```ts
const attendee: string | string[];
const identifier: string | number | string[];

interface Kid {
  age: number;
}

interface Adult {
  age: number;
  job: string;
}

function person(): Kid | Adult {
  return {age: 25};
}

const me = person();
me.age// ok
me.job//error : 모든 자료형의 유니언 공통 속성에만 접근 가능
```

### 인터섹션 자료형
* 인터섹션 자료형 사용 시 여러 자료형을 결합할 수 있음
* 두 인터페이스가 각각 자료형은 다르지만 동일한 이름의 속성을 가지고 있을 시 인터페이스 결합할 때 컴파일에서 오류 발생
```ts
interface Person {
  sex: 'male' | 'female' | 'N/A';
  age: number;
}

interface Employee {
  job: string;
}

type Adult = Person & Employee; //Person과 Employee 자료형을 결합해 Adult 자료형 만듬

const me: Adult = {
  sex: 'female',
  age: 25,
  job: 'frontend developer',
};
console.log(me); //{sex:"female", age:25, job:"frontend developer"}
```
