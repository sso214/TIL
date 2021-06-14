---
title : Fragments  
date : 2021.06.14  
---

# Fragments

## Fragments란?
**DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 할 수 있음.**  

컴포넌트가 여러 자식을 반환할 때 유용.  
간단히 예시를 들면 `table`의 `tr`태그 안에 들어갈 컴포넌트는 `td`태그로만 이루어져야 하는데  
컴포넌트는 하나의 태그로 묶여야 하므로 `div`나 다른 태그를 이용해 감싸면 렌더링 된 HTML이 유효하지 않음.  
`Fragments`는 이러한 문제를 해결함.

```tsx
// 부모 컴포넌트
class ParmentsComponent extends React.Component {
    render() {
        return (
            <table>
                <tr>
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
            <React.Fragment key={item.idx}>
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
