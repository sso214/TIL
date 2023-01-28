---
title : SemVer 
date : 2021.06.30
---

# SemVer
2021.06.30

**SemVer : Semantic Versioning**  
SemVer 이란 소프트웨어 릴리즈 버전 넘버에 대한 네이밍 시스템으로  
버전 형식에 의미를 부여해 체계적인 버전 관리를 위한 방식이다.

<br>

## Versions
버전의 형식은 [Major].[Minor].[Patch] 형식을 따른다.  
* Major : 기존 API가 변경/삭제 되었기 때문에 update시 동작 안될 수 있음  
* Minor : 이전 버전과 호환되며 API가 추가되었으니 확인 필요  
* Patch : 이전 버전과 호환되며 버그 수정을 한 경우  
이렇게 3단계의 형식을 띔으로써 직관적으로 버전의 숫자만 보고도 변동량을 짐작할 수 있다.
  
<br>

## SemVer Specification
* SemVer를 사용하는 소프트웨어는 반드시 공개 API를 선언해야 한다. (코드 자체로 선언 및 문서로 명시)
* [Major].[Minor].[Patch] 각각의 버전은 자연수로 증가하고, 0이 앞에 붙어서는 안된다. (1.11.0)과 같은 형식도 가능
* 배포 시 해당 버전의 내용은 절대 변경해서는 안된다.
* 0(0.y.z)는 초기 개발을 위해서 사용한다.
* 1.0.0 버전은 공개 API를 정의하고, 이후 버전은 배포한 공개 API에서 어떻게 변경되었는지에 따라 기술한다.
* API가 이전 버전과 호환되지 않는 경우에는 반드시 Major 버전을 올린다. 이때 Minor 버전과 Patch 버전은 0으로 초기화한다.
  Minor 버전이 올라간 경우 Patch 버전은 0으로 초기화한다.
* Patch 버전 뒤에 -(하이픈)을 붙이고 .(마침표)로 구별된 식별자를 붙여 배포전의 버전을 명명할 수 있다.  
  1.0.0-alpha 나 1.0.0-alpha.1 과 같은 형식.  
  정식배포 버전 과 비교 시 정식배포 버전의 우선순위가 높음 (1.0.0-alpha < 1.0.0)


## Reference
* [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)
* [Semantic Versioning - MAJOR, MINOR, PATCH와 명세에 관하여](https://velog.io/@slaslaya/Semantic-Versioning-2.0.0-MAJOR-MINOR-PATCH%EC%99%80-%EB%AA%85%EC%84%B8%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC)
* [체계적인 버전 관리, SemVer](https://han41858.tistory.com/22)
