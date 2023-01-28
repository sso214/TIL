---
title : 타입 설계  
date: 2023.01.28
---

# 타입 설계

## 28. 유효한 상태만 표현하는 타입을 지정하기
* 타입을 잘 설계하면 코드는 직관적으로 작성할 수 있음  
  하지만 타입 설계가 엉망이라면 코드는 뒤죽박죽이 되고 버그는 창궐하게됨
* 효과적으로 타입을 설계하려면, 유효한 상태만 표현할 수 있는 타입을 만드는 것이 가장 중요함

### 예시1
```ts
interface State {
    pageText: string;
    isLoading: boolean;
    error?: string;
}
function renderPage(state: State) {
    if(state.error) {
        return `Error! Unable to load ${currentPage}: ${state.error}`;
    } else if(state.isLoading) {
        return `Loading ${currentPage}...`;
    }
    return `<h1>${currentPage}</h1>\n${state.pageText}`;
}
/*
renderPage 함수 코드를 살펴보면 분기 조건이 명확하지 않음  
isLoading이 true이고 동시에 error 값이 존재하면 상태 값을 명확히 구분할 수 없음  
필요한 정보가 부족하기 때문.  
*/

async function changePages(state: State, newPage: string) {
    state.isLoading = true;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if(!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;
    } catch (e) {
        state.error = '' + e;
    }
}
/*
changePages 함수에는 많은 문제점들이 있음
* 오류가 발생했을 때 state.isLoading을 false로 설정하는 로직이 빠져있음
* state.error를 초기화하지 않았기 때문에, 페이지 전환 중 로딩 메시지 대신 과거의 오류 메세지를 보여주게 됨
* 페이지 로딩 중 사용자가 페이지를 바꿔버리면 어떤 일이 벌어질지 예상하기 어려움  
  새 페이지에 오류가 뜨거나, 응답이 오는 순서에 따라 두번째 페이지가 아닌 첫번째 페이지로 전환될 수도 있음
*/


/*
문제는 바로 상태 값의 두 가지 속성이 동시에 정보가 부족하거나,
(요청이 실패했는지 여전히 로딩 중인지 알 수 없음)
두 가지 속성이 충돌할 수 있다는 것
(오류이면서 동시에 로딩 중일 수 있음)

State 타입은 isLoading이 true이면서 동시에 error 값이 설정되는 무효한 상태를 허용함
무효한 상태가 존재하면 render(), changePage() 둘 다 제대로 구현할 수 없게 됨 
*/
```
애플리케이션의 상태를 좀 더 제대로 표현하면 아래 코드가 됨  
네트워크 요청 과정 각각의 상태를 명시적으로 모델링하는 태그된 유니온(또는 구별된 유니온)이 사용됨  
상태를 나타내는 타입의 코드 길이가 길어지긴 했지만, 무효한 상태를 허용치 않도록 개선되었음  
현재 페이지는 발생하는 모든 요청의 상태로서 명시적으로 모델링되었기 때문에   
개선된 renderPage와 chnagePage 함수는 쉽게 구현 가능함
```ts
interface RequestPending {
    state: 'pending';
}
interface RequestError {
    state: 'error';
    error: string;
}
interface RequestSuccess {
    state: 'ok';
    pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
    currentPage: string;
    requests: {[page: string]: RequestState};
}


function renderPage(state: State) {
    const {currentPage} = state;
    const requestState = state.requests[currentPage];
    switch (requestState.state) {
        case 'pending':
            return `Loading ${currentPage}...`;
        case 'error':
            return `Error! Unable to load ${currentPage}: ${state.error}`;
        case 'ok':
            return `<h1>${currentPage}</h1>\n${state.pageText}`;
    }
}
async function changePages(state: State, newPage: string) {
    state.requests[newPage] = {state: 'pending'};
    state.currentPage = newPage;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if(!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const pageText = await response.text();
        state.requests[newPage] = { state: 'ok', pageText };
    } catch (e) {
        state.requests[newPage] = { state: 'error', error: '' + e };
    }
}
```
처음에 구현했던 renerPage와 changePage의 모호함은 완전히 사라짐  
현재 페이지가 무엇인지 명확하며, 모든 요청은 정확히 하나의 상태로 맞아 떨어짐  
요청이 진행 중인 상태에서 사용자가 페이지를 변경해도 문제 없음  
무효가 된 요청이 실행되긴 하겠지만 UI에는 영향을 미치지 않음

### 예시2
