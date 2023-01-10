---
title : 45장. Promise   
date : 2022.07.07
---

# 45장. Promise
* JS는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용함  
  but, 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고,  
  에러 처리가 곤란하며 여러 비동기 처리를 한번에 처리하는데 한계가 있음  
* ES6에서는 비동기 처리를 위한 또 다른 패턴으로 Promise를 도입함  
  ⇒ 전통적인 콜백 패턴이 가진 단점을 보완해 비동기 처리 시점을 명확하게 표현함


## 비동기 처리를 위한 콜백 패턴의 단점

### 콜백 헬
- 비동기 함수 : 함수 내부에 비동기로 동작하는 코드를 포함한 함수
- 비동기 함수 호출 시 함수 내부 비동기 코드가 완료되지 않아도 기다리지 않고 즉시 종료됨  
  (즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료)  
  ⇒  
  따라 비동기 함수 내부 비동기 코드에서 처리 결과를 외부로 반환하거나  
  상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않음

#### 비동기 함수 내부 비동기 코드의 처리 결과를 외부에 반환해보기
* setTimeout 함수는 콜백 함수 호출이 비동기로 동작하기 때문에 비동기 함수.  
  호출 시 콜백 함수를 호출 스케줄링한 뒤, 타이머 id를 반환하고 즉시 종료됨    
  (즉, setTimeout 함수의 콜백 함수는 setTimeout 함수가 종료된 이후에 호출)  
  따라, setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나,  
  상위 스코프의 변수에 할당하지 못함
* onload 이벤트 핸들러도 비동기로 동작하기 때문에 비동기 함수가 종료된 이후에 실행됨  
  따라 onload 이벤트 핸들러에서 서버 응답 결과를 반환하거나  
  상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않음  
  ```javascript
  // GET 요청을 위한 비동기 함수
  const get = url => {
  const xhr = new XMLHttpRequest();
  
      xhr.open('GET', url);
  
      xhr.send();
  
      xhr.onload = () => {
          if (xhr.status === 200) {
              // ① 서버의 응답을 반환한다.
              return JSON.parse(xhr.response);
          }
      
          console.error(`${xhr.status} ${xhr.statusText}`);
      };
  };
  
  // ② id가 1인 post를 취득
  const response = get('https://jsonplaceholder.typicode.com/posts/1');
  console.log(response); // undefined
  ```
  1. get 함수 호출 시 XMLHttpRequest 객체 생성,    
     HTTP 요청 초기화, HTTP 요청 전송
  2. xhr.onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하고 종료함
  3. 이때 get 함수에 명시적인 반환문 없으므로 get 함수는 undefined 반환  
     (xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러의 반환문은  
     get 함수의 반환문이 아님)
  4. 함수의 반환 값은 명시적으로 호출한 뒤 캐치하여 다시 반환할 수 있지만  
     onload 이벤트 핸들러는 get 함수가 호출하지 않기 떄문에 그럴 수도 없음.  
     따라 onload 이벤트 핸들러의 반환값은 캐치 불가

#### 비동기 함수 내부 비동기 코드의 처리 결과를 상위 스코프 변수에 할당해보기
서버 응답을 상위 스코프 변수에 할당하는 것도 X
```javascript
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
		} 
		else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos); // ② undefined
```
1. 비동기 함수 get 호출되면 함수 코드 평가 과정에서  
   get 함수 실행 컨텍스트 생성되고 실행 컨텍스트 스택(콜 스택)에 푸시됨
2. 함수 실행 과정에서 xhr.onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러가 바인딩됨  
3. get 함수 종료 시 get 함수의 실행 컨텍스트가 콜 스택에서 팝되고,  
   곧바로 console.log 호출됨.  
   이때 console.log 실행 컨텍스트가 생성되어 실행 컨텍스트 스택에 푸시됨    
   만약 console.log가 호출되기 직전 load 이벤트가 발생했더라도  
   xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러는  
   결코 consle.log 보다 먼저 실행되지 않음
4. 서버로부터 응답 도착 시 xhr 객체에서 onload 이벤트 발생함  
   이때 xhr.onload 이벤트 핸들러는 load 이벤트가 발생하면  
   일단 태스크 큐에 저장되어 대기하다가,  
   콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행됨
5. 이벤트 핸들러도 함수이므로  
   이벤트 핸들러 평가 → 이벤트 핸들러 실행 컨텍스트 생성 →  
   콜 스택에 푸시 → 이벤트 핸들러 실행 과정을 거침  
6. 따라 xhr.onload 이벤트 핸들러가 실행되는 시점에는  
   콜 스택이 빈 상태여야 하므로 console.log는 이미 종료된 후.    
   만약 get 함수 이후 console.log가 100번 호출된다 해도  
   xhr.onload 이벤트 핸들러는 모든 console.log가 종료된 이후 실행됨  
   즉, xhr.onload 이벤트 핸들러에서 상위 스코프의 변수에 서버 응답 결과를 할당하기  
   이전에 console.log가 먼저 호출되어 undfined가 출력됨  
   ⇒  
   xhr.onload 이벤트 핸들러에서 서버 응답을 상위 스코프의 변수에 할당 시  
   처리 순서 보장되지 않음

#### 콜백 헬
비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고,  
상위 스코프의 변수에 할당할 수도 없음  
⇒ 따라 비동기 함수 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 수행 필요  

이때 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에  
비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적.

필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수, 실패하면 호출될 콜백 함수 전달 가능
```javascript
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
/*{"userId": 1,"id": 1,"title": "sunt aut facere ...","body": "quia et suscipit ..."}*/
```

이처럼 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가  
비동기 처리 결과를 가지고 또 다시 비동기 함수를 호출해야 할 경우,  
콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상 발생함 (=콜백 헬)  

콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 됨.
```javascript
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();
	xhr.onload = () => {
		if (xhr.status === 200) {
			// 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
			callback(JSON.parse(xhr.response));
		} 
		else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({ userId }) => {
	console.log(userId); // 1

	// post의 userId를 사용하여 user 정보를 취득
	get(`${url}/users/${userId}`, userInfo => {
		console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret",...}
	});
});
```
```javascript
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

### 에러 처리의 한계
콜백 패턴의 문제점 중 가장 심각한 것은 에러 처리가 곤란하다는 것.
```javascript
try {
	setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
	// 에러를 캐치하지 못한다
	console.error('캐치한 에러', e);
}
```
try 코드 블록 내에서 호출한 setTimeout 함수는 에러를 발생시키지만  
해당 에러는 catch 코드 블록에서 캐치되지 않음.

1. 비동기 함수인 setTimeout이 호출되면  
   setTimeout 함수의 실행 컨텍스트가 생성되어 콜 스택에 푸시되고 실행됨
2. setTimeout은 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고  
   즉시 종료되어 콜 스택에서 제거됨
3. 이후 타이머가 만료되면 setTimeout의 콜백 함수는 태스크 큐로 푸시되고  
   콜 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행됨

콜백 함수가 실행될 때 setTimeout 함수는 이미 콜 스택에서 제거된 상태.  
즉, setTimeout 함수의 콜백 함수를 호출한 것이 setTimeout 함수가 아님을 의미함  

setTimeout 함수의 콜백 함수의 호출자가 setTimeout 함수라면  
콜 스택의 현재 실행 중인 실행 컨텍스트가 콜백 함수의 실행 컨텍스트일 때   
현재 실행 중인 실행 컨텍스트의 하위 실행 컨텍스트는 setTimeout 함수여야 함  

**에러는 호출자 방향으로 전파됨.**  
즉, 콜 스택의 아래 방향 (실행 중인 실행 컨텍스트가 푸시되기 직전 푸시된 실행 컨텍스트 방향)  
으로 전파됨.

하지만 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아님.  
따라 setTimeout 함수의 콜백 함수가 발생시킨 에러는 catch 블록에서 캐치되지 않음  
=>  
이런 콜백 패턴의 문제점(콜백 헬, 에러처리)을 해결하기 위해 ES6에서 Promise가 도입됨


## 프로미스의 생성

### 프로미스 생성
```javascript
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
	// Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
	if (/* 비동기 처리 성공 */) {
		resolve('result');
	} else {
	 /* 비동기 처리 실패 */
		reject('failure reason');
	}
});
```
- Promise 생성자 함수를 new 연산자와 함께 호출 시 Promise 객체 생성함  
- ES6에서 도입된 Promise는 호스트 객체가 아닌  
  ECMAScript 사양에 정의된 표준 빌트인 객체
- Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받음  
  (해당 콜백 함수는 resolve, reject 함수를 인수로 전달받음)
- Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행함.  
  이때 비동기 처리가 성공하면 콜백 함수의 인수로 전달받은 resolve 함수를 호출하고,  
  실패하면 reject 함수를 호출함
```javascript
// GET 요청을 위한 비동기 함수
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
promiseGet('https://jsonplaceholder.typicode.com/posts/1');
```
1. 비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성하고 반환함  
2. 비동기 처리는 Promise 생성자 함수가 인수로 받은 콜백 함수 내부에서 수행됨  
3. 만약 비동기 처리가 성공하면 비동기 처리 결과를 resolve 함수에 인수로 전달하면서  
   호출하고, 실패하면 에러를 reject 함수에 인수로 전달하면서 호출함

### 프로미스의 상태 정보
프로미스는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖음  
- pending : 비동기 처리가 아직 수행되지 않은 상태 : 프로미스가 생성된 직후 기본 상태
- fulfilled : 비동기 처리가 수행된 상태(성공) : resolve 함수 호출
- rejected : 비동기 처리가 수행된 상태(실패) : reject 함수 호출

생성된 직후의 프로미스는 기본적으로 pending 상태.  
이후 비동기 처리가 수행되면 비동기 처리 결과에 따라 프로미스 상태가 변경됨    
- 비동기 처리 성공 : resolve 함수를 호출해 프로미스를 fulfilled 상태로 변경  
- 비동기 처리 실패 : reject 함수를 호출해 프로미스를 rejected 상태로 변경  

<br>

이처럼 프로미스 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정됨      
fulfilled 또는 rejected 상태를 settled 상태라고 함    
settled 상태 : pending이 아닌 상태로 비동기 처리가 수행된 상태 

<br>

프로미스는 pending 상태에서 fulfilled 또는 rejected 상태,   
즉 settled 상태로 변화 가능  
but, 일단 settled 상태가 되면 더는 다른 상태로 변화 불가능함

<br>

프로미스는 비동기 처리 상태와 더불어 비동기 처리 결과도 상태로 갖음  
- 비동기 처리 성공 시 프로미스는 pending 상태에서 fulfilled 상태로 변화하며,  
  비동기 처리 결과인 1을 값으로 갖음
  <br>  
    [[PromiseStatus]] : “fulfilled”  
    [[PromiseValue]] : 1

- 비동기 처리 실패 시 프로미스는 pending 상태에서 rejected 상태로 변화하며,   
  비동기 처리 결과인 Erorr 객체를 값으로 갖음  
  <br>
  [[PromiseStatus]] : “rejected”  
  [[PromiseValue]] : Error: …

<br>
⇒  즉, 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체


## 프로미스의 후속 처리 메서드
- 프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야 함  
  (fulfilled 상태가 되면 프로미스의 처리 결과를 가지고 무언가를 해야 하고,  
  rejected 상태가 되면 프로미스의 처리 결과-에러를 가지고 에러 처리를 해야 함)  
  ⇒  
  이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공함
- 프로미스의 비동기 처리 상태가 변화하면  
  후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출됨  
  이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달됨
- 모든 후속 처리 메서드는 promise를 반환하며, 비동기로 동작함

### Promise.prototype.then
```javascript
//fulfilled
new Promise(resolve => resolve('fulfilled'))
	.then(v => console.log(v), e => console.error(e)); //fulfilled

//rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.then(v => console.log(v), e => console.error(e)); //Error: rejected
```
- 두 개의 콜백 함수를 인수로 전달받음  
  - 첫 번째 콜백 함수 (성공 처리 콜백 함수)  
    프로미스가 fulfilled 상태 (resolve 함수가 호출된 상태)가 되면 호출됨  
    (비동기 처리가 성공했을 떄)  
    이떄 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받음  
  - 두 번째 콜백 함수 (실패 처리 콜백 함수)  
    프로미스가 rejected 상태 (reject 함수가 호출된 상태)가 되면 호출됨  
    (비동기 처리가 실패했을 떄)  
    이떄 콜백 함수는 프로미스의 에러를 인수로 전달받음  
- then 함수는 언제나 프로미스를 반환함  
  만약 then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고,  
  콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로  
  resolve나 reject하여 프로미스를 생성해 반환함  

### Promise.prototype.catch
```javascript
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.catch(e => console.log(e)); // Error: rejected


// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.then(undefined, e => console.log(e)); // Error: rejected
```
- 한 개의 콜백 함수를 인수로 전달받음  
  catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우에만 호출됨  
- catch 메서드는 then(undefined, onRejected)와 동일하게 동작함  
  따라 then 메서드와 마찬가지로 언제나 프로미스를 반환함

### Promise.prototype.finally
```javascript
new Promise(() => {})
	.finally(() => console.log('finally')); // finally
```
- 한 개의 콜백 함수를 인수로 전달받음  
  finally 메서드의 콜백 함수는 프로미스의 성공(fulfilled) 또는 실패(rejected)와  
  상관없이 무조건 한번 호출됨
- 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용함
- then/catch 메서드와 마찬가지로 언제나 프로미스를 반환함

### 프로미스로 구현한 비동기 함수 get을 사용해 후속 처리 구현
```javascript
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};

promiseGet('https://sso214.blog.com/posts/1')
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log('Bye!'));
```


## 프로미스의 에러 처리
- 비동기 처리를 위한 콜백 패턴은 에러 처리가 곤란하다는 문제가 있었지만,  
  프로미스는 에러를 문제 없이 처리 가능함
- 비동기 함수 get은 프로미스를 반환하며, 비동기 처리 결과에 대한 후속 처리는  
  프로미스가 제공하는 후속 처리 메서드 (the, catch, finally)를 사용해 수행함
- 비동기 처리에서 발견한 에러는 then 메서드의 두번째 콜백 함수로 처리 가능함
  ```javascript
  const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
  
  // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
  promiseGet(wrongUrl).then(
      res => console.log(res),
      err => console.error(err)
  ); // Error: 404
  ```
  단, then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서    
  발생한 에러를 캐치하지 못하고 코드가 복잡해져 가독성이 좋지 않음
  ```javascript
  promiseGet('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => console.xxx(res),err => console.error(err)); 
      // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
  ```
- 비동기 처리에서 발생한 에러는 프로미스의 후속 처리 메서드 catch를 사용해서도 처리 가능함
  ```javascript
  const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
  
  // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
  promiseGet(wrongUrl)
      .then(res => console.log(res))
      .catch(err => console.error(err)); // Error: 404
  ```
  catch 메서드를 호출하면 내부적으로 then(undefined, onRejected)를 호출함  
  따라 위 예제는 내부적으로 다음과 같이 처리됨
  ```javascript
  const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';
  
  // 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
  promiseGet(wrongUrl)
      .then(res => console.log(res))
      .then(undefined, err => console.error(err)); // Error: 404
  ```  
  catch 메서드를 모든 then 메서드를 호출한 이후 호출하면 비동기 처리에서 발생한  
  에러(rejected 상태) 뿐 아니라, then 메서드 내부에서 발생한 에러까지 모두 캐치 가능함
  ```javascript
  promiseGet('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => console.xxx(res))
      .catch(err => console.error(err)); 
      // TypeError: console.xxx is not a function
  ```
  또한 then 메서드에 두 번째 콜백 함수를 전달하는 것보다  
  catch 메서드를 사용하는 것이 가독성이 좋고, 명확함
- 따라 에러 처리는 then 메서드가 아닌 catch 메서드에서 하는 것을 권장함


## 프로미스 체이닝
```javascript
const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
	// 취득한 post의 userId로 user 정보를 취득
	.then(({ userId }) => promiseGet(`${url}/users/${userId}`))
	.then(userInfo => console.log(userInfo))
	.catch(err => console.error(err));
```
- 비동기 처리를 위한 콜백 패턴은 콜백 헬이 발생하는 문제 있음  
  프로미스는 then, catch, finally 후속 처리 메서드를 통해 콜백 헬을 해결함
- then, catch, finally 후속처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출 가능함  
  (=프로미스 체이닝)
- 후속 처리 메서드의 콜백 함수는 프로미스의 비동기 처리 상태가 변경되면 선택적으로 호출됨.  
  위 예제에서 후속 처리 메서드의 콜백 함수는 다음처럼 인수를 전달받으며 호출됨

  이처럼 then, catch, finally 후속 처리 메서드는 콜백 함수가 반환한 프로미스를 반환함  
  
  만약 후속 처리 메서드의 콜백 함수가 프로미스가 아닌 값을 반환해도 그 값을  
  암묵적으로 resolve, reject하여 프로미스를 생성해 반환함  
- 프로미스는 프로미스 체이닝을 통해 비동기 결과를 전달받아 후속 처리하므로  
  비동기 처리를 위한 콜백 패턴에서 발생하던 콜백헬이 발생하지 않음  

  다만, 프로미스도 콜백 패턴을 이용하므로 콜백 함수를 사용하지 않는 것은 아님  
- 콜백 패턴은 가독성이 좋지 않음  
  이 문제는 ES8에서 도입된 async/await를 통해 해결 가능   
  async/await를 사용하면 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼  
  프로미스가 처리 결과를 반환하도록 구현 가능함  
  (async/await도 프로미스를 기반으로 동작함) 
  ```javascript
  const url = 'https://jsonplaceholder.typicode.com';
  
  (async () => {
  // id가 1인 post의 userId를 취득
  const { userId } = await promiseGet(`${url}/posts/1`);
  // 취득한 post의 userId로 user 정보를 취득
  const userInfo = await promiseGet(`${url}/users/${userId}`);
  
      console.log(userInfo);
  })();
  ```

## 프로미스의 정적 메서드

## 마이크로태스크 큐

## fetch
