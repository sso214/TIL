---
title : React Native pod 캐시 지우기   
date : 2021.06.17
---

# React Native pod 캐시 지우기  
2021.06.17  

React Native 프로젝트를 설치하다가 pod install 과정에서 뭐가 잘못됐는지  
`npm run ios`가 안돼서 여기저기 찾아봤다.  
혹시 pod 캐시 때문에 일어난 문제인가 싶어서 캐시 지우고 다시 설치하니 잘 됨.  


```shell
# rm(파일 및 디렉토리 삭제 명령어), -f(강제), -r(하위 디렉토리 포함해 삭제)
$ rm -rf ~/Library/Caches/CocoaPods
$ rm -rf Pods
$ rm -rf ~/Library/Developer/Xcode/DerivedData/*
$ pod deintegrate
$ pod setup
$ pod install
```


### Reference
* [“how to clear pod cache in react native” Code Answer](https://www.codegrepper.com/code-examples/javascript/how+to+clear+pod+cache+in+react+native)
