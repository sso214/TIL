---
title : ES2018의 새로운 기능  
date : 2021.09.02
---

# ES2018의 새로운 기능  

## 객체에 레스트/스프레드 연산자 사용하기
ES2018부터는 객체에도 레스트/스프레드 구문 사용 가능  
스프레드 연산자 사용 시 배열과 마찬가지로 객체의 복사본을 쉽게 만들 수 있고,  
원래 객체를 수정하더라도 복사본에는 영향 없음
```js
let myObj = {
    a : 1,
    b : 3,
    c : 5,
    d : 8,
};
//레스트 연산자 사용해 a, b를 제외한 나머지 속성을 변수z에 할당
let {a, b, ...z} = myObj;
console.log(a); //1
console.log(b); //3
console.log(z); //{c:5, d:8}

//스프레드 연산자 사용해 복사본 생성
let clone = {...myObj};
console.log(clone); //{a:1, b:3, c:5, d:8}
myObj.e = 15;
console.log(clone); //{a:1, b:3, c:5, d:8}
console.log(myObj); //{a:1, b:3, c:5, d:8, e:15}
```


## 비동기 반복
비동기 반복 사용 시 데이터를 비동기적으로 반복 가능
> 비동기 반복자는 next() 메서드가 {value, done} 쌍에 대한 프로미스를 반환한다는 점을   
> 제외하면 동기 반복자와 매우 유사함

비동기 반복을 위해 각각의 이터러블을 프로미스로 변환해 작동하는 for-await-of 루프 사용
* 실행 중 이터러블이 가진 [Symbol.asyncIterator]()메서드를 통해 비동기 반복자 생성됨
* 루프 속에서 이터러블의 다음 값에 접근할 때마다 반복자 메서드에서 반환된 프로미스를 await 함
```js
const iterables = [1,2,3];
async function test(){
    for await (const value of iterables) {
        console.log(value);
    }
}
test();
//1
//2
//3
```


## Promise.prototype.finally()
.finally()로 프로미스가 완료될 때 호출한 콜백을 등록할 수 있음  

.finally()도 프로미스를 반환하므로 .then()과 .catch()를 계속 연결 가능하지만   
연결된 프로미스는 .finally()가 반환한 값이 아니라 그 전의 프로미스가 반환한 값을 전달받게 됨
```js
const myPromise = new Promise((resolve, reject) => {
    resolve();
});
myPromise.then(() => {
    console.log('still working');
}).catch(() => {
    console.log('there was an error');
}).finally(() => {
    console.log('Done!');
});

myPromise.then(() => {
    console.log('still working');
    return 'still working';
}).finally(() => {
    console.log('Done!');
    return 'Done!'
}).then(res => {
    console.log(res); 
    //.finally() 뒤에 연결된 .then()으로 들어오는 값은 
    //.finally()가 반환한 값이 아니라 그 전의 프로미스가 반환한 값
});
//still working
//Done!
//still working
```


## 정규식 기능 추가
네 가지 새로운 정규식 관련 기능이 추가됨

### 정규식에 대한 s(dotAll) 플래그
정규식에 새로 도입된 s 플래그는 . 표현식(개행문자 제외한 모든 문자 의미)이 개행 문자(줄바꿈문자)를 포함한  모든 문자를 포함하도록 함
```js
/foo.bar/s.test('foo\nbar'); //true
```

### 명명된 캡처 그룹
번호가 매겨진 캡처 그룹으로 정규식이 일치하는 문자열의 특정부분을 참조 가능.  
각 챕쳐 그룹에는 순서대로 고유 번호가 할당되고 해당 번호를 사용해 참조할 수 있음.  
하지만 자동으로 할당되는 번호만으로는 정규식을 파악하고 리팩터링하기 어려움  

ex. 정규식 /(\d{4})-(\d{2})-(\d{2})/를 날짜와 매칭한다고 했을 때   
주변 코드를 검사하지 않고서는 어떤 그룹이 일에 해당하는지 확신하기 어려움  
월과 일의 순서를 바꾸고 싶다면 그룹 참조 번호도 순서에 맞춰 변경해야 함  

(?<name>...)구문을 사용하면 캡처 그룹에 원하는 이름을 지정 가능함.  
이를 사용하면 앞의 예에서 날짜에 대한 정규식을 /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u 형태로 작성  
각 이름은 고유해야 하고 ECMAScript IdentifierName의 문법을 따라야 함  
명명된 그룹은 매칭 결과를 담은 객체의 groups 속성을 통해 접근 가능  
기존의 명명되지 않은 그룹과 마찬가지로 그룹에 대한 번호 참조도 함께 생성됨
```js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let result = re.exec('2021-09-02');
//result.groups.year === '2021';
//result.groups.month === '09';
//result.groups.day === '02';

//result[0] === '2021-09-02';
//result[1] === '2021';
//result[2] === '09';
//result[3] === '02';

let {groups: [one, two]} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
console.log(`one: ${one}, two:${two}`); //one: foo, two:bar
```

### 룩비하인드 어서션
룩비하인드 어서션을 사용하면 패턴 앞에 다른 패턴이 있는지의 여부 확인 가능.  
ex) 달러를 포함한 문자열에서 달러 기호를 캡처하지 않고 달러 금액 부분만 매칭 가능  

긍정 룩비하인드 어서션은 (?<=...)으로 표시하며 안에 포함된 패턴이  
어셔선 다음에 오는 패턴보다 먼저 나오는지를 확인   
ex) 달러 기호는 캡쳐하지 않고 달러 금액만 매칭하려면 /(?<=\$)\d+(\.\d*)?/를 사용해  
$10.53과 매칭하고 10.53만 매칭 결과로 얻을 수 있음

부정 룩비하인드 어서션은 (?<!...)으로 표시하며, 그 안에 포함된 패턴이  
어서션 다음의 패턴보다 앞에 있지 않은지를 검사.  
ex) /(?<!\$)\d+(?:\.\d*)는 $10.53에 매칭되지 않지만 &10.53과는 매칭됨

### 유니코드 속성 이스케이프
/p{...} 및 /P{...} 형식으로 유니코드 속성 이스케이프 사용 가능  
유니코드 속성 이스케이프는 u 플래그가 설정된 정규식에서 사용할 수 있는 새로운 유형의 이스케이프 시퀀스.  
```js
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('ц'); //true
```


## 템플릿 리터럴 제한 해제
태그 지정된 템플릿 리터럴을 사용시 이스케이프 시퀀스에 대한 제한이 제거됨
