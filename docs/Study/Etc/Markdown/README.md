---
title: 마크다운 문법 정리
description : 블로그 작성을 위한 마크다운 문법 정리
date: 2021.05.31
---

## Markdown 이란?
Markdown은 2004년 John Gruber 와 Aaron Swartz가 만든 경량형 마크업 언어이다.<br>
간단한 문법을 이용해 웹에서 사용할 수 있는 문서 서식으로 .md 또는 .markdown 확장자를 사용한다.
<br><br>
문법이 간결하고 별도의 에디터 없이 작성 가능하며, 키보드만을 이용해 빠르게 작성이 가능하다.<br>
또한 텍스트 파일로 저장되기 때문에 용량이 작고 변경된 이력들을 관리할 수 있다.<br>
여러 다양한 플랫폼 지원이 가능하지만 모든 HTML을 지원하지는 않는다.
<br><br>
github에서는 Markdown 표준에서 다양하게 변형된 GitHub Flavored Markdown을 지원한다.<br>
[GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
<br><br>


## Heading
h1 ~ h6까지 제목 표현이 가능함<br>
```markdown
# Heading 1 // Heading 1 아래에는 자동적으로 수평선 추가됨
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
일반 텍스트
```


## Line
```markdown
___
(Hyphens)
*** 
(Asterisks)
___
(Underscores) 
```
___
(Hyphens)
*** 
(Asterisks)
___
(Underscores)


## Text attributes
```markdown
 *italic*
 _italic_
 
 **bold**
 __bold__
 
 **_italic + bold_**
 ~~strikethrough~~
 <u>underLine</u>
```
*italic*
_italic_

**bold**
__bold__

**_italic + bold_**  
~~strikethrough~~  
<u>underLine</u>


## Quote
```markdown
> Quote
>> Quote
>>> Quote
```
> Quote
>> Quote
>>> Quote


## Bullet list
```markdown
- hyphen
* asterisks
+ plus sign
    * sub list
    1. sub list
    1. sub list
```
- hyphen
* asterisks
+ plus sign
    * sub list
    1. sub list
    1. sub list


## Numbered list
```markdown
1. hyphen
1. asterisks
1. plus sign
    * sub list
    1. sub list
    2. sub list
```
1. hyphen
1. asterisks
1. plus sign
    * sub list
    1. sub list
    2. sub list


## Link
```markdown
[Click me!](https://google.com)<br>
[Click me!](https://google.com "링크 설명")
[상대적 참조](../../../)

바로 여기서도 링크 [sso214's blog] 사용 가능!  
문서 안의 URL 및 <> 안의 URL은 자동으로 링크 연결됨.  
링크 연결 : https://google.com  
링크 연결 2 : <https://google.com>

[sso214's blog]: https://sso214.github.com
[sso214's blog2]: https://sso214.github.com "sso214의 블로그"
```
[Click me!](https://google.com)<br>
[Click me!](https://google.com "링크 설명")
[상대적 참조](../../../)

바로 여기서도 링크 [sso214's blog] 사용 가능!  
문서 안의 URL 및 <> 안의 URL은 자동으로 링크 연결됨.  
링크 연결 : https://google.com  
링크 연결 2 : <https://google.com>  

[sso214's blog]: https://sso214.github.com  
[sso214's blog2]: https://sso214.github.com "sso214의 블로그"


## Line change
```markdown
룰루랄라 
두번 띄어쓰기  // 띄어쓰기 2번
아니면 <br>
하면 줄바꿈
```
룰루랄라
두번 띄어쓰기  
아니면 <br>
하면 줄바꿈


## Image
```markdown
// 일반 이미지
![image description : google 404 이미지](https://www.google.com/images/errors/robot.png)
// 이미지 넓이를 정하고 싶으면 img 태그 사용
<img src="https://www.google.com/images/errors/robot.png" width="300"/> 
// 이미지에 링크
[![move](https://www.google.com/images/errors/robot.png)](https://google.com)
github LEADME.md 파일에 로컬 이미지 바로 드래그해서 추가 가능함 (이미지 자동 업로드 됨 -> 주소로 변환됨)
```
![google 404 이미지](https://www.google.com/images/errors/robot.png)  
<img src="https://www.google.com/images/errors/robot.png" width="300"/>  
[![move](https://www.google.com/images/errors/robot.png)](https://google.com)


## Table
```markdown
|Fruit|Ball|Flower|
|--:|:--:|:--|
🍎|⚽|🌻 // (맨 왼쪽, 오른쪽에 있는 | 기호는 생략 가능)
|🍌|🏀|🌷|
|🍒|⚾|🌼|

|--:| 오른쪽 정렬
|:--:| 가운데 정렬
|:--| 왼쪽 정렬
```
|Fruit|Ball|Flower|
|--:|:--:|:--|
|🍎|⚽|🌻|
|🍌|🏀|🌷|
|🍒|⚾|🌼|


## Code
```markdown
// 코드 인라인 형태로 포맷 
`console.log('hello')`

// 백틱키 3번하면 코드 블럭 생성
```ts(코드 랭귀지를 표현해주면 문법이 하이라이트 되어 표현됨) console.log('sso214')```
```
`console.log('hello')`
```ts
console.log('sso214')
```

## HTML
```html
원시 HTML 사용 가능
<b>hello</b> // 마크다운에서 지원하지 않는 기능 시 유용
```
<b>hello</b>


## Task Lists
```markdown
- [x] Task Lists
- [ ] Task Lists
```
- [x] Task Lists
- [ ] Task Lists


<br><br><br>
> 참고 : 
> * [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
> * [마크다운(Markdown) 6분 순삭 정리 + 깃허브 리드미(ReadMe) 파일 작성 팁 ⭐️ (드림코딩 by 엘리)](https://www.youtube.com/watch?v=kMEb_BzyUqk&list=PLv2d7VI9OotSn1ThdDeqvBx8QuRSd01qv&index=2)
> * [MarkDown 사용법 총정리 (heropy)](https://heropy.blog/2017/09/30/markdown/)
