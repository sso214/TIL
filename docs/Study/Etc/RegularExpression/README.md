---
title : 정규표현식  
date : 2021.06.01
---

# 정규표현식
2021.06.01

**regex : regular expression**  
- 1950년 미국의 수학자였던 Stephen이 개발  
- 텍스트에서 원하는 특정한 패턴을 찾을 때 유용하게 사용할 수 있으며 유효성 검사시에도 사용 가능  
- 유닉스에서 텍스트를 처리하고 프로세싱 할 때 많이 이용되다가 현재는 다양한 프로그래밍 언어(JAVA, Python, JS 등)에서 지원하고 있으며, 텍스트/코드 에디터에서도 정규표현식 이용해서 검색하는 것이 가능함.  
- javascript에서 match 메서드를 이용해 정규식 사용 가능 


/pattern/i  
/(slashes를 이용해 정규표현식임을 나타냄)/  
/(찾고자 하는 패턴 입력)/i(플래그 : 어떤 옵션을 이용해 검색할건지)  


### Groups and ranges
|Chracter|Mean|
|--|--|
|`|`|또는|
|`()`|그룹 지정|
|`(?:)`|검색은 되지만 그룹되어 기억하지는 X|
|`[]`|안에 있는 모든 문자를 하나라도 만족할 시|
|`[^]`|안에 있는 문자들을 제외한 모든 것들 선택|


### Quantifiers
|Chracter|Mean|
|--|--|
|`?`|있거나 없거나 선택|
|`*`|있거나 없거나 많거나 선택|
|`+`|하나 있거나 많이 있거나 선택|
|`{n}`|n번 반복 선택|
|`{min,}`|최소|
|`{min,max}`|최소, 최대|


### Boundary-type
|Chracter|Mean|
|--|--|
|`\b`|특정 경계 지정|
|`\B`|특정 경계 아닌 부분만 선택|
|`^`|문장의 시작|
|`$`|문장의 끝|


### Character classes
|Chracter|Mean|
|--|--|
|`.`|모든 문자열 선택 (줄바꿈 제외)|
|`\`|특수 문자가 아닌 문자|
|`\d`|숫자|
|`\D`|숫자 아닌 모든 것|
|`\w`|문자|
|`\W`|문자 아닌 모든 것|
|`\s`|띄어쓰기|
|`\S`|띄어쓰기를 제외한 모든 것|


### Flags
|Chracter|Mean|
|--|--|
|`\g`|global|
|`\i`|case insensitive|
|`\m`|multiline|
|`\s`|single line (dotall)|
|`\u`|unicode|
|`\y`|sticky|



### Example
```ts
let test = /gr(e|a)y/; //gr
```
 


### Reference
* [정규표현식 , 더이상 미루지 말자 🤩 @드림코딩 by 엘리](https://www.youtube.com/watch?v=t3M6toIflyQ&list=PLv2d7VI9OotSn1ThdDeqvBx8QuRSd01qv)
* [regexr](https://regexr.com/5mhou)
* [regexone](https://regexone.com/)
