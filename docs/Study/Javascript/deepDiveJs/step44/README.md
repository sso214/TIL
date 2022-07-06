---
title : 44장. REST API  
date : 2022.07.06
---

# 44장. REST API

### REST
* REpresentational State Transfer
* HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
* REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미
* REST의 기본 원칙을 성실히 지킨 서비스 디자인을 “RESTful”이라고 표현함


## 1. REST API의 구성
* 자원(resource), 행위(verb), 표현(representations) 3가지 요소로 구성됨  
* REST는 자체 표현 구조로 구성되어 REST API 만으로 HTTP 요청의 내용을 이해 가능함

|구성 요소|내용|표현 방볍|
|:-|:-|:-|
|자원|자원|URL(엔드포인트)|
|행위|자원에 대한 행위|HTTP 요청 메서드|
|표현|자원에 대한 행위의 구체적 내용|페이로드|


## 2. REST API 설계 원칙
REST에서 가장 중요한 기본적인 원칙은 두 가지  
<RESTful API를 설계하는 중심 규칙>  
1. URI는 리소스를 표현하는데 집중하고
2. 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것  

### 2-1. URI는 리소스를 표현해야 한다.
* URI는 리소스를 표현하는데 중점을 둬야 함  
* 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용  
  따라 이름에 get같은 행위에 대한 표현이 들어가면 안됨  
```http request
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

### 2-2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
* HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법  
* 주로 5가지 요청 메서드 (GET, POST, PUT, PATCH, DELETE 등)을 사용해 CRUD를 구현함

|HTTP 요청 메서드|종류|목적|페이로드|
|:-|:-|:-|:-|
|GET|index/retrieve|모든/특정 리소스 취득|X|
|POST|create|리소스 생성|O|
|PUT|replace|리소스의 전체 교체|O|
|PATCH|modify|리소스의 일부 수정|O|
|DELETE|delete|모든/특정 리소스 삭제|X|

* 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URK에 표현하지 않음  
  ex) 리소스를 취득하는 경우 GET, 삭제하는 경우 DELETE를 사용해 리소스에 대한 행위를 명확히 표현
```http request
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```


## 3. JSON Server를 이용한 REST API 실습
HTTP 요청을 전송하고 응답을 받으려면 서버가 필요함  
JSON Server를 사용해 가상 REST API 서버를 구축해 HTTP 요청을 전송하고 응답을 받는 실습을 진행

### 3-1. JSON Server 설치
* JSON Server : json 파일을 사용해 가상 REST API 서버를 구축할 수 있는 툴
* npm을 사용해 JSON Server를 설치
```shell
$ mkdir json-server-exam && cd json-server-exam
$ npm init -y
$ npm install json-server --save-dev
```
#### [npm]
* 자바스크립트 패키지 매니저  
* Node.js에서 사용할 수 있는 모듈들을 패키지화해 모아둔 저장소 역할과   
  패키지 설치 및 관리를 위한 CLI(Command Line Interface)를 제공   
* 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 가능  

### 3-2. db.json 파일 생성
* 프로젝트 루트 폴더 (/json-server-exam)에 db.json 파일을 생성  
* db.json 파일은 리소스를 제공하는 DB 역할을 함
```json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": false
    },
    {
      "id": 3,
      "content": "JavaScript",
      "completed": true
    }
  ]
}
```

### 3-3. JSON Server 실행
* 터미널에서 아래 명령어를 입력해 JSON Server를 실행    
  JSON Server가 DB 역할을 하는 db.json 파일의 변경을 감지하게 하려면 watch 옵션을 추가해야 함  
    ```shell
    ## 기본 포트(3000) 사용 / watch 옵션 적용
    $ json-server --watch db.json
    
    ## 포트 변경 / watch 옵션 적용
    $ json-server --watch db.json --port 5000
    ```
* 매번 명령어를 입력하는 것이 번거로우므로 package.json 파일 scripts를 수정해 JSON Server 실행   
    ```json
    {
      "name": "json-server-exam",
      "version": "1.0.0",
      "scripts": {
        "start": "json-server --watch db.json"
      },
      "devDependencies": {
        "json-server": "^0.16.1"
      }
    }
    ```
* 터미널에서 npm start 명령어를 입력해 JSON Server 실행  
    ```shell
    $ npm start
    ```

### 3-4. GET 요청
* todos 리소스에서 모든 todo를 취득(index)함   
* JSON Server의 루트 폴더에 public 폴더를 생성하고 JSON Server를 중단한 후 재실행   
* public 폴더에 get_index.html을 추가 -> http://localhost:3000/get_index.html로 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스에서 모든 todo를 취득(index)
        xhr.open('GET', '/todos');
        
        // HTTP 요청 전송
        xhr.send();
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    ```
* todos 리소스에서 id를 사용하여 특정 todo를 취득(retrieve).   
  public 폴더에 get_retrieve.html를 추가 -> http://localhost:3000/get_retrieve.html 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스에서 id를 사용하여 특정 todo를 취득(retrieve)
        xhr.open('GET', '/todos/1');
        
        // HTTP 요청 전송
        xhr.send();
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    ```

### 3-5. POST 요청
* todos 리소스에 새로운 todo를 생성
* POST 요청 시에는 setRequestHeader 메서드를 사용해 요청 몸체에 담아  
  서버로 전송할 페이로드의 MIME 타입을 지정해야 함
* public 폴더에 post.html을 추가 -> http://localhost:3000/post.html로 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스에 새로운 todo를 생성
        xhr.open('POST', '/todos');
        
        // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
        xhr.setRequestHeader('content-type', 'application/json');
        
        // HTTP 요청 전송
        // 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
        xhr.send(JSON.stringify({id: 4, content: 'Angular', completed: false}));
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200(OK) 또는 201(Created)이면 정상적으로 응답된 상태다.
            if (xhr.status === 200 || xhr.status === 201) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    ```

### 3-6. PUT 요청
* 특정 리소스 전체를 교체할 때 사용
* 예제에서는 todos 리소스에서 id로 todo를 특정해 id를 제외한 리소스 전체를 교체함   
* PUT 요청 시에는 setRequestHeader 메서드를 사용해 요청 몸체에 담아   
  서버로 전송할 페이로드의 MIME 타입을 지정해야 함
* public 폴더에 put.html 추가 -> http://localhost:3000/put.html로 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스에서 id로 todo를 특정하여 id를 제외한 리소스 전체를 교체
        xhr.open('PUT', '/todos/4');
        
        // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
        xhr.setRequestHeader('content-type', 'application/json');
        
        // HTTP 요청 전송
        // 리소스 전체를 교체하기 위해 페이로드를 서버에 전송해야 한다.
        xhr.send(JSON.stringify({id: 4, content: 'React', completed: true}));
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    }
    ```

### 3-7. PATCH 요청
* PATCH는 특정 리소스의 일부를 수정할 때 사용   
* 예제에서는 todos 리소스의 id로 todo를 특정하여 completed만 수정 
* PATCH 요청 시에는 setRequestHeader 메서드를 사용해 요청 몸체에 담아   
  서버로 전송할 페이로드의 MIME 타입을 지정해야 함
* public 폴더에 patch.html 추가 -> http://localhost:3000/patch.html로 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스의 id로 todo를 특정하여 completed만 수정
        xhr.open('PATCH', '/todos/4');
        
        // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
        xhr.setRequestHeader('content-type', 'application/json');
        
        // HTTP 요청 전송
        // 리소스를 수정하기 위해 페이로드를 서버에 전송해야 한다.
        xhr.send(JSON.stringify({completed: false}));
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    ```

### 3-8. DELETE 요청
* todos 리소스에서 id를 사용하여 todo를 삭제 
* public 폴더에 delete.html을 추가 -> http://localhost:3000/delete.html로 접속
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    <pre></pre>
    <script>
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        
        // HTTP 요청 초기화
        // todos 리소스에서 id를 사용하여 todo를 삭제한다.
        xhr.open('DELETE', '/todos/4');
        
        // HTTP 요청 전송
        xhr.send();
        
        // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
        xhr.onload = () => {
            // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
    </body>
    </html>
    ```
