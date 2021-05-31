---
title: React Native 개발 환경 구축
description : React Native 개발 환경 구축
date: 2021.05.31
---


# MAC에서 React Native 개발 환경 구축
맥에서 React Native 앱 개발하는 방법으로는 Expo CLI, React Native CLI가 있는데  
여기서는 내가 해 본 React Native CLI 방법을 다룬다.  
XCode 시뮬레이터 연결해서 webstorm 사용했다.

1. HomeBrew 설치 : [https://brew.sh/](https://brew.sh/)
    * `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 명령어로 설치
    * `brew --version` (homebrew 설치됐는지 확인)
2. Node.js 설치 : [https://nodejs.org/](https://nodejs.org/)
    * `brew install node` 명령어로 설치
    * `node -–version` 버전 확인
    * `npm --versrion` node 설치 시 npm도 같이 설치 됨. 버전 확인
3. Watchman 설치 : [https://facebook.github.io/watchman/](https://facebook.github.io/watchman/)  
   코드 추가, 변경 감지 후 다시 빌드하기 위해 사용
    * `brew install watchman`
    * `watchman –version`
4. React Native CLI 설치
    * `npm install -g react-native-cli`
    * `react-native --version`
5. Xcode 설치 : [https://apps.apple.com/us/app/xcode/id497799835?mt=12](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
6. Cocoapods 설치 : [https://cocoapods.org/](https://cocoapods.org/)
    * `sudo gem install cocoapods`
    * `pod --version`
7. 프로젝트 실행
    * `npm run ios`

> [맥(Mac)에 react native 개발 환경 구축하기 (@dev-yakuza)](https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/)



# npm run ios 안될 때
npm run ios가 안돼서 몇 시간동안 해결방안을 찾느라 고생했다.
```
// ios > Pods > Pods.xcodeproj > Podfile 의 아래코드 주석처리
use_flipper!
  post_install do |installer|
    flipper_post_install(installer)
  end
```
> [(Mac) React Native 개발환경 구축하기 & 에러해결(@yeseul)](https://velog.io/@yeseul/Mac-React-Native-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-%EC%97%90%EB%9F%AC%ED%95%B4%EA%B2%B0)  
> [Cant build react native from box in XCode: 'event2/event-config.h' file not found](https://github.com/facebook/react-native/issues/30836#issuecomment-774701342)



# pod install
아 그리고 패키지를 새로 설치한게 있으면 pod를 다시 설치해주어야 한다.  
1. `cd ios`
2. `pod install` (혹시 install 잘 안되면 `pod uninstall` 후 재설치)
3. `npm run ios`

