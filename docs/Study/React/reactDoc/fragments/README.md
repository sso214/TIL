---
title : Fragments  
date : 2021.06.14  
---

# Fragments

## Fragments란?
**DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 할 수 있음.**  

React v16에 추가된 기능으로, 컴포넌트가 여러 자식을 반환할 때 유용.  
컴포넌트가 여러 엘리먼트를 리턴할 때 하나의 태그로 묶어야 하는데,  
`fragment`를 사용하면 별도의 노드 추가 없이 여러 자식을 그룹화할 수 있다.  
불필요한 DOM node 생성을 막기 때문에 메모리를 적게 사용한다.  

```tsx
// 부모 컴포넌트
class ParmentsComponent extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    {/*Columns 컴포넌트는 tr의 하위태그인 td이나 th로만 이루어져 있어야 함.*/}
                    <Columns/>
                </tr>
            </table>
        )
    }
}

// td로만 이루어져야 하는 하위 컴포넌트
const Columns: React.FC<Props> = ({items}) => {
    return (
        items.map(item => (
            // key가 있을 경우 명시적으로 선언해야 함. key 없을 시 key warning 발생함.
            // key는 Fragment에 전달 가능한 유일한 어트리뷰. 추후 추가적인 어트리뷰 지원할 수도 있음.
            <React.Fragment key={item.idx}> {/*fragment가 아니라 div나 다른태그로 감싸서 반환한다면 유효하지 않은 html이 됨.*/}
                <td>{item.name}</td>
                <td>{item.value}</td>
            </React.Fragment>
        ))
    )
}
```

<br>

## 단축 문법
`<React.Fragment>` 태그 대신 `<>` 빈 태그로 단축해서 사용 가능함.  
`<>` 빈 태그 사용 시 key 또는 어트리뷰를 지원하지 않음.  
```tsx
return (
    <React.Fragment>
        <Component/>
        <Component/>
        <Component/>
    </React.Fragment>
)
// =
return (
    <>
        <Component/>
        <Component/>
        <Component/>
    </>
)
```

<br>
<br>
<br>

> ### Reference
> * [Fragments](https://ko.reactjs.org/docs/fragments.html)
