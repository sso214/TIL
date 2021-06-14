---
title : 더블 클릭 방지
date : 2021.06.07
---

지금 작업하고 있는 프로젝트에서 input을 채우고 신청 버튼을 더블 클릭하거나  
엔터를 여러 번치면 엔터치거나 더블 클릭한 만큼 신청이 되어버리는 버그가 있어서  
해당 부분을 수정하려고 react 에서는 어떻게 더블클릭을 해결하는지 찾아봤다.  
<br/>
이런저런 방법도 찾아보고 시도해본 후 해당 방법을 사용해 해결했다.

```tsx
const [doubleSubmit, setDoubleSubmit] = useState(false);
const submitEvt = (e: FormEvent<HTMLInputElement>) => {
    e?.preventDefault();
    if (commonStore.error === '' && doubleSubmit) {
        return doubleSubmit;
    } else {
        setDoubleSubmit(true);
        onClickSubmit ? onClickSubmit() : onDismiss();
        return false;
    }
}

return (
    <form onSubmit={() => {return false}}>
        <CustomButton onClick={submitEvt}>확인</CustomButton>
    </form>
)
```

그리고 customEvent.detail 에 대해서 좀 더 알아보게 되었다.  

엔터를 칠 때는 0을 클릭 이벤트는 1, 더블 클릭 이벤트는 2 이런식으로 숫자를 반환한다.  
customEvent.detail 은 이벤트에 따라 현재 클릭 수를 제공한다.  
다른 모든 UIEvent 개체의 경우 UIEvent.detail은 항상 0이며,  
click 이나 mousedown/mouseup 이벤트는 1을 더한 현재 클릭 수를 반환한다.  


> ## REFERENCE
> [UIEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
