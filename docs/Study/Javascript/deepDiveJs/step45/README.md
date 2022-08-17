---
title : 45장. 프로미스   
date : 2022.07.07
---

# 45장. 프로미스
자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수 사용   
하지만 콜백 헬로 인해 가독성이 나쁘고 에러의 처리가 곤란하며  
여러개의 비동기 처리를 한번에 처리하는데도 한계 존재  

때문에 ES6에선 비동기 처리를 위해 프로미스를 도입함  
콜백 패턴의 단점을 보완하고 비동기 처리 시점을 명확하게 표현할 수 있는 장점 있음

## 1. 비동기 처리를 위한 콜백 패턴의 단점

### 1-1. 콜백 헬
비동기 함수 : 함수 내부에 비동기로 동작하는 코드를 포함한 함수  
비동기 함수 내부의 비동기 코드는 비동기 함수가 종료된 이후에 완료됨  
따라 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나   
상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않음

get 함수 호출 시 GET 요청을 전송하고   
onload 이벤트 핸들러를 등록한 뒤 undefined를 반환하고 즉시 종료됨  
즉, 비동기 함수인 get 함수 내부의 onload 이벤트 핸들러는 get 함수가 종료된 이후에 실행됨
```js
// GET 요청을 위한 비동기 함수
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콘솔에 출력한다.
            console.log(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};
// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
/*
{
"userId": 1,
"id": 1,
"title": "sunt aut facere ...",
"body": "quia et suscipit ..."
}
*/
```
```js
let todos;
// GET 요청을 위한 비동기 함수
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            // ① 서버의 응답을 상위 스코프의 변수에 할당한다.
            todos = JSON.parse(xhr.response);
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};
// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos); // ② undefined
```
xhr.onload 이벤트 핸들러에서 서버의 응답을 상위 스코프의 변수에 할당하면 처리 순서가 보장되지 않음  
비동기 함수 get 호출 -> 함수 코드 평가 과정에서 get 함수의 실행 컨텍스트가 생성   
-> 실행 컨텍스트 스택 (콜 스택)에 푸시됨 -> 함수 코드 실행과정에서 xhr.onload 이벤트 핸들러 프로퍼티에  
이벤트 핸들러 바인딩됨 -> get 함수 종료 시 get 함수의 실행 컨텍스트가 콜 스택에서 팝 됨   
-> 만약 console.log 호출 직전에 load 이벤트가 발생했더라도 xhr.onload 이벤트 핸들러 프로퍼티에  
바인딩한 이벤트 핸들러는 결코 console.log 보다 먼저 실행되지 않음

이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환 불가능하고, 상위 스코프의 변수에 할당도 불가능함  
따라 비동기 함수의 처리 결과(서버의 응답 등) 후속 처리는 비동기 함수 내부에서 수행해야 함  
이떄 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에   
비동기 처리 결과 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적    
필요에 따라 비동기 처리가 성공 시 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수 전달 가능
```js
// GET 요청을 위한 비동기 함수
const get = (url, successCallback, failureCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
            successCallback(JSON.parse(xhr.response));
        } else {
            // 에러 정보를 콜백 함수에 인수로 전달하면서 호출하여 에러 처리를 한다.
            failureCallback(xhr.status);
        }
    };
};
// id가 1인 post를 취득
// 서버의 응답에 대한 후속 처리를 위한 콜백 함수를 비동기 함수인 get에 전달해야 한다.
get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
/*
{
"userId": 1,
"id": 1,
"title": "sunt aut facere ...",
"body": "quia et suscipit ..."
}
*/
```
이처럼 콜백 함수를 통해 비동기 처리 결과 후속 처리를 수행하는 비동기 함수가  
비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야 한다면  
콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상 발생함   
이를 **콜백 헬**이라고 함    
콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 됨  

```js
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
            callback(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};
const url = 'https://jsonplaceholder.typicode.com';
// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({userId}) => {
    console.log(userId); // 1
    // post의 userId를 사용하여 user 정보를 취득
    get(`${url}/users/${userId}`, userInfo => {
        console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret",...}
    });
});

get('/step1', a => {
    get(`/step2/${a}`, b => {
        get(`/step3/${b}`, c => {
            get(`/step4/${c}`, d => {
                console.log(d);
            });
        });
    });
});
```

### 1-2. 에러 처리의 한계
콜백 패턴의 문제점 중 가장 심각한 것은 에러 처리가 곤란하다는 것  
```js
try {
    setTimeout(() => {
        throw new Error('Error!');
    }, 1000);
} catch (e) {
    // 에러를 캐치하지 못한다
    console.error('캐치한 에러', e);
}
```
try 코드 블록 내에서 호출한 setTimeout 함수는 1초 후 콜백 함수가 실행되도록 타이머를 설정하고,  
이후 콜백 함수는 에러를 발생시킴. 하지만 에러는 catch 코드 블록에서 캐치되지 않음  

setTimeout 호출되면 실행 컨텍스트가 생성되어 콜 스택에 푸시되어 실행됨.   
setTimeout은 비동기 함수이므로 콜백 함수 호출을 기다리지 않고 즉시 종료되어 콜 스택에서 제거됨  
이후 타이머가 만료되면 setTimeout함수의 콜백 함수는 태스크 큐로 푸시되고   
콜 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행됨  

setTimeout 함수의 콜백 함수가 실행될 때 setTimeout 함수는 이미 콜 스택에서 제거된 상태  
즉, setTimeout 함수의 콜백 함수를 호출한 것이 setTimeout 함수가 아니라는 것을 의미  

에러는 호출자 방향으로 전파됨. 즉, 콜 스택의 아래방향으로 전파됨  
setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아님  
따라 setTimeout 함수의 콜백 함수가 발생시킨 에러는 catch 블록에서 캐치되지 않음  

이렇듯 비동기 처리를 위한 콜백 패턴은 콜백 헬이나 에러 처리가 곤란한 문제가 있음  
이를 극복하기 위해 ES6에서 프로미스가 도입

#### try ...catch ...finally 문
* 에러 처리를 구현하는 방법
* try ...catch ...finally 문 실행 시 먼저 try 코드 블록 실행됨   
  이때 try 코드 블록에 포함된 문 중 에러 발생 시 해당 에러는 catch 문의 err 변수에 전달되고  
  catch 코드 블록이 실행됨. finally 코드 블록은 에러 발생과 상관없이 반드시 한번 실행됨  
* try ...catch ...finally 문으로 에러 처리 시 프로그램이 강제 종료되지 않음


## 2. 프로미스의 생성
* Promise 생성자 함수를 new 연산자와 함께 호출 시 프로미스 객체를 생성함  
* ES6에서 도입된 Promise는 호스트 객체가 아닌 ECMAScript 사양에 정의된 표준 빌트인 객체
* Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데  
  이 콜백 함수는 resolve와 reject 함수를 인수로 전달받음
* Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행함  
  이때 비동기 처리가 성공하면 콜백 함수의 인수로 전달받은 resolve 함수를 호출,  
  실패 시 reject 함수를 호출함
    ```js
    // 프로미스 생성
    const promise = new Promise((resolve, reject) => {
        // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
        if (/* 비동기 처리 성공 */) {
            resolve('result');
        } else { /* 비동기 처리 실패 */
            reject('failure reason');
        }
    });
    ```
* 프로미스는 아래와 같이 현재 비동기 처리가 어떻게 진행되고 있는지의 상태 정보를 갖음  
    |프로미스의 상태 정보|의미|상태 변경 조건|
    |:-|:-|:-|
    |pending|비동기 처리가 아직 수행되지 않은 상태|프로미스가 생성된 직후 기본 상태|
    |fulfilled|비동기 처리가 수행된 상태(성공)|resolve 함수 호출|
    |rejected|비동기 처리가 수행된 상티(실패)|reject 함수 호출|
  생성된 직후의 프로미스는 기본적으로 pending 상태  
  이후 비동기 처리 수행 시 처리 결과에 따라 프로미스의 상태가 변경됨  
  * 비동기 처리 성공 : resolve 함수를 호출해 프로미스를 fulfilled 상태로 변경
  * 비동기 처리 실패 : reject 함수를 호출해 프로미스를 rejected 상태로 변경  
  이처럼 프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정됨
* fulfilled / rejected 상태를 settled 상태라고 함  
  settled 상태는 pending이 아닌 상태로 비동기 처리가 수행된 상태를 말함
* 프로미스는 pending 상태에서 settled 상태로 변화 가능함  
  하지만 일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없음
* 프로미스는 비동기 처리 상태와 더불어 비동기 처리 결과도 상태로 갖음    
  즉, 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체


## 3. 프로미스의 후속 처리 메서드
프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야 함  
이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공함  

프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출됨  
이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달됨  

모든 후속 처리 메서드는 프로미스를 반환하며, 비동기로 동작함

### 3-1. Promise.prototype.then
* then 메서드는 두 개의 콜백 함수를 인수로 전달받음  
  * 첫 번째 콜백 함수 : 프로미스가 fulfilled 상태 (resolve 함수가 호출된 상태)가 되면 호출됨   
    이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받음  
  * 두 번째 콜백 함수 : 프로미스가 rejected 상태(reject 함수가 호출된 상태)가 되면 호출됨  
    이때 콜백 함수는 프로미스의 에러를 인수로 전달받음

* then 메서드는 언제나 프로미스를 반환함  
  만약 then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고,  
  프로미스가 아닌 값을 반환 시 암묵적으로 값을 resolve 또는 reject 해 프로매스를 생성해 반환함
```js
// fulfilled
new Promise(resolve => resolve('fulfilled'))
    .then(v => console.log(v), e => console.error(e)); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected')))
    .then(v => console.log(v), e => console.error(e)); // Error: rejected
```

### 3-2. Promise.prototype.catch
* catch 메서드는 한 개의 콜백 함수를 인수로 전달받음  
  catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우에만 호출됨
    ```js
    // rejected
    new Promise((_, reject) => reject(new Error('rejected')))
    .catch(e => console.log(e)); // Error: rejected
    ```
* catch 메서드는 then(undefined, onRejected)와 동일하게 동작함  
  따라 then 메서드와 마찬가지로 언제나 프로미스를 반환함
    ```js
    // rejected
    new Promise((_, reject) => reject(new Error('rejected')))
    .then(undefined, e => console.log(e)); // Error: rejected
    ```

### 3-3. Promise.prototype.finally
* finally 메서드는 한 개의 콜백 함수를 인수로 전달받음   
  finally 메서드의 콜백 함수는 프로미스의 성공이나 실패에 상관없이 무조건 한 번 호출됨
* 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용 
* then/catch 메서드와 마찬가지로 언제나 프로미스를 반환함
    ```js
    new Promise(() => {}).finally(() => console.log('finally')); // finally
    ```
### 프로미스로 구현한 비동기 함수 get을 사용해 후속 처리 구현
```js
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
// 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
                resolve(JSON.parse(xhr.response));
            } else {
// 에러 처리를 위해 reject 함수를 호출한다.
                reject(new Error(xhr.status));
            }
        };
    });
};
// promiseGet 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log('Bye!'));
```


## 4. 프로미스의 에러 처리
* 비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리 가능함
    ```js
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    
    promiseGet(wrongUrl).then(
        res => console.log(res),
        err => console.error(err)
    ); // Error: 404
    ```
* 또한 프로미스의 후속 처리 메서드 catch를 사용해 처리도 가능
    ```js
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    
    promiseGet(wrongUrl)
        .then(res => console.log(res))
        .catch(err => console.error(err)); // Error: 404
    ```  
  catch 메서드 호출 시 내부적으로 then(undefined, onRejected)를 호출함   
  따라 위 예제는 내부적으로 아래와 같이 처리됨
    ```js
    const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
    // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
    promiseGet(wrongUrl)
        .then(res => console.log(res))
        .then(undefined, err => console.error(err)); // Error: 404
    ```  
  단, then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고   
  코드가 복잡해져서 가독성이 좋지 않음  
    ```js
    promiseGet('https://jsonplaceholder.typicode.com/todos/1').then(
        res => console.xxx(res),
        err => console.error(err)
    ); // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
    ```
  catch 메서드를 모든 then 메서드를 호출한 이후에 호출 시 비동기 처리에서 발생한 에러 뿐 아니라  
  then 메서드 내부에서 발생한 에러까지 모두 캐치 가능함
    ```js
    promiseGet('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => console.xxx(res))
        .catch(err => console.error(err)); // TypeError: console.xxx is not a function
    ```  
  또한 catch 메서드를 사용하는 것이 가독성이 좋고 명확함  
  따라 에러 처리는 catch 메서드에서 하는 것을 권장함


## 5. 프로미스 체이닝
콜백 패턴은 콜백 헬이 발생하는 문제가 있음  
프로미스는 then, catch, finally 후속 처리 메서드를 통해 콜백 헬을 해결함  

then, catch, finally 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출 가능함  
(= 프로미스 체이닝)  

프로미스는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 콜백 헬이 발생하지 않음  
다만 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아님  

콜백 패턴은 가능성이 좋지 않음  
이를 위해 ES8에서는 async/await를 도입함  
async/await 사용 시 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼   
프로미스가 처리 결과를 반환하도록 구현 가능함
```js
const url = 'https://jsonplaceholder.typicode.com';
(async () => {
    // id가 1인 post의 userId를 취득
    const {userId} = await promiseGet(`${url}/posts/1`);
    // 취득한 post의 userId로 user 정보를 취득
    const userInfo = await promiseGet(`${url}/users/${userId}`);
    console.log(userInfo);
})();
```
async/await도 프로미스를 기반으로 동작하므로 프로미스를 잘 이해해야 함  


## 6. 프로미스의 정적 메서드
Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드 소유 가능함  
Promise는 5가지 정적 메서드를 제공함

### 6-1. Promise.resolve / Promise.reject
Promise.resolve와 Promise.reject 메서드는 이미 존재하는 값을   
래핑해 프로미스를 생성하기 위해 사용함  

* Promise.resolve 메서드는 인수로 전달받은 값을 resolve 하는 프로미스를 생성함
    ```js
    // 배열을 resolve하는 프로미스를 생성
    const resolvedPromise = Promise.resolve([1, 2, 3]);
    resolvedPromise.then(console.log); // [1, 2, 3]
    ```
    위 코드는 아래 코드와 동일하게 작동함
    ```js
    const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
    resolvedPromise.then(console.log); // [1, 2, 3]
    ```
* Promise.reject 메서드는 인수로 전달받은 값을 reject 하는 프로미스를 생성함  
    ```js
    // 에러 객체를 reject하는 프로미스를 생성
    const rejectedPromise = Promise.reject(new Error('Error!'));
    rejectedPromise.catch(console.log); // Error: Error!
    ```
    위 코드는 아래 코드와 동일하게 작동함
    ```js
    const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')));
    rejectedPromise.catch(console.log); // Error: Error!
    ```

### 6-2. Promise.all
* Promise.all 메서드느 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용함  
* 앞선 비동기 처리 결과를 다음 비동기 처리에 사용하지 않아 서로 의존하지 않고   
  개별적으로 수행되는 비동기 처리의 경우 Promise.all 사용
```js
const requestData1 = () =>
    new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
    new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
    new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 병렬로 처리
Promise.all([requestData1(), requestData2(), requestData3()])
    .then(console.log) // [ 1, 2, 3 ] ⇒ 약 3초 소요
    .catch(console.error);
```
* Promise.all 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음  
  그리고 전달받은 모든 프로미스가 모두 fulfilled 상태가 되면 모든 처리 결과를   
  배열에 저장해 새로운 프로미스를 반환함
* Promise.all 메서드는 인수로 전달받은 배열의 모든 프로미스가 모두 fulfilled 상태가 되면 종료함   
  따라 Promise.all 메서드가 종료하는데 걸리는 시간은   
  가장 늦게 fulfilled 상태가 된느 프로미스의 처리 시간보다 조금 더 김
* 모든 프로미스가 fulfilled 상태가 되면 reosolve된 처리 결과를 모두 배열에 저장해 새로운 프로미스를 반환함   
  이때 프로미스의 상태 변화 순서와 상관 없이 처리 결과를 차례대로 배열에 저장함  
  즉, 처리 순서가 보장됨
* Promise.all 메서드는 인수로 전달받은 배열의 프로미스가 하나라도 rejected 상태가 되면   
  나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료함
* Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우   
  Promise.resolve 메서드를 통해 프로미스로 래핑함


### 6-3. Promise.race
* Promise.all 메서드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음
* 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve 하는 새로운 프로미스를 반환함
```js
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
])
.then(console.log) // 3
.catch(console.log);
```
