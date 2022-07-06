---
title : noreferrer   
date : 2022.06.16
---

# noreferrer

## Tabnabbing
* HTML 문서 내 링크(target이 _blank인)를 클릭했을 때 새롭게 열린 탭(페이지)에서   
  기존 문서의 location을 피싱 사이트로 변경해 정보를 탈취하는 공격 기술
* 메일이나 오픈 커뮤니티에서 쉽게 사용될 수 있음


### Tabnabbing 공격 절차
1. 사용자가 cgm.example.com에 접속
2. 해당 사이트에서 happy.example.com으로 갈 수 있는 외부 링크 클릭
3. 새 탭으로 happy.example.com 열림   
   happy.example.com에는 window.opener 속성 존재   
   자바스크립트를 사용해 opener의 location을 피싱 목적의 cgn.example.com/login으로 변경함
4. 사용자는 다시 본래의 탭으로 돌아옴
5. 로그인이 풀렸다고 생각하고 아이디와 비밀번호를 다시 입력함  
   cgn.example.com은 사용자가 입력한 계정정보를 탈취한 후 다시 본래의 사이트로 리다이렉트함

gmail은 이런 공격을 막기 위해 Anchor 태그에 data-saferedirecturl 속성을 부여해 안전하게 리다이렉트 함

   
### rel=noreferrer 속성
* 위와 같은 공격 취약점을 극복하고자 noreferrer 속성이 추가됨
* rel=noreferrer 속성이 부여된 링크를 통해 열린 페이지는 location 변경 같은 자바스크립트 요청을 거부함  
  (Uncaught TypeError 에러를 발생시킴 - 크롬 기준)
* 크롬 49, 파이어폭스 52부터 지원함
* 해당 방법으로도 불안하면 이런 공격이 우려스러운 서비스(메일, 커뮤니티, 댓글 시스템 등)라면 blankshield와 같은 라이브러리 사용
* 보안적 측면 외에도 성능 상 이점 있음     
  _blank 속성으로 열린 탭(페이지)는 언제든 opener를 참조 가능  
  그래서 부모탭과 같은 스레드에서 페이지가 동작하기 때문에 새탭의 페이지가 리소스를 많이 사용할 경우 부모 탭도 느려짐    
  
  반면 noreferrer 속성을 사용해 열린 탭은 부모를 호출할 일이 없으므로   
  같은 스레드일 필요 없으며 새로운 페이지가 느리다고 부모 탭까지 느려지진 않음
  

> 참고  
> https://blog.coderifleman.com/2017/05/30/tabnabbing_attack_and_noopener/


