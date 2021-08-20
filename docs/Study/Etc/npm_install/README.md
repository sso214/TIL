---
title : npm install 옵션  
date : 2021.08.20
--- 

# 많이 사용하는 npm install 옵션

* `npm install` :   
  package.json - dependencies 에 있는 모든 패키지 설치 프로젝트 세팅 후 해당 명령어로 패키지 설치  
  (= `npm i`)
  
* `npm install [package]` :  
  디렉토리 내 ./node_modules에 [package] 설치
  
* `npm install [package] --save` :   
  [package] 설치하고 package.json - dependencies 에 해당 패키지 정보 추가
  
* `npm install [package] --save -dev` :  
  --save 옵션과 같이 패키지 정보 추가하지만 dependencies가 아니라 devDependencies에 추가  
  (--production로 빌드할 경우 devDependencies에 있는 패키지들은 설치되지 않음)

* `npm install [package] --no-save` :   
  dependencies에 패키지 정보 추가 X

* `npm install [package] --save-exact` :  
  일치하는 버전의 패키지 추가  
  
* `npm install [package] --save-bundle` :  
  패키지를 bundleDependencies 에 추가  
  
* `npm install [package] --force` :  
  해당 패키지가 존재하더라도 원격 저장소에 있는 패키지 가져오기
  
<br/>
<br/>
<br/>

> ### Reference  
> * [npm-install](https://docs.npmjs.com/cli/v7/commands/npm-install/)
> * [npm install 명령어에 있는 option들](https://chimimode.github.io/2019-07-03-npm-install-option/)
