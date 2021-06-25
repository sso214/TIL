---
title : Mac android Simulator 연동하기  
date : 2021.06.25
---

# Mac android Simulator 연동하기

## Homebrew
* brew install  
  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
* brew install check
  `brew --version`


## node
* node install  
  `brew install node`
* node install check   
  `node --version`
* npm install check  
  `npm --version`


## watchman
지정된 디렉토리 및 파일을 감시해 변경 감지 시 특정 동작 실행  
* watchman install  
  `brew install watchman`
* watchman install check   
  `watchman --version`


## React-Native-CLI
expo cli 사용 시 필요없는 라이브러리도 같이 설치해야하기 때문에 프로젝트 용량 커짐.  
expo cli에서 제공하지 않는 부분 사용하기 어려움.  
때문에 react-native-cli 설치  
* react-native-cli install  
  `npm install -g react-native-cli`


## Xcode
ios 앱 만들기 위해 필수 설치  
* App Store - Xcode 설치
* Xcode > Preferences > Locations > Command Line Tools 설치


## cocoapods
ios 개발에 사용되는 의존성 관리 (라이브러리 설치 및 관리 시 사용)  
* cocoapods install  
  `sudo gem install cocoapods`
* cocoapods install check  
  `pod --version`


## Java
* Java install  
  `brew cask install adoptopenjdk8`  
  Unkown command : cask error 시 `brew install --cask adoptopenjdk8`


## Android Studio
* Android Studio download  
  [https://developer.android.com/studio](https://developer.android.com/studio)
* Configure > SDK Manager
  - Android 9.0 (Pie)
    
  - Android SDK Build-Tools  
  - Android Emulator  
  - Android SDK Platform - Tools  
  - Android SDK Tools (Obsolete) : 구식이라고 숨겨져있다.  
  - Intel x86 Emulator Accelerator  
  - Google Play Services : 이건 나중에 배포할 때 사용한다.

* Configure > AVD Manager
  - + Create Virtual Device
  - Simulator action


## vi .zshrc
* `$ cd ~`
* `$ vi .zshrc`
* Android studio 경로 등록

```shell
#$HOME = 안드로이드 스튜디오 Preference에 경로 나옴
export ANDROID_HOME=$HOME/Library/Android/sdk  
export PATH=$PATH:$ANDROID_HOME/emulator  
export PATH=$PATH:$ANDROID_HOME/tools  
export PATH=$PATH:$ANDROID_HOME/tools/bin  
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
* shell 껐다 키기
* `source .zshrc`



## React-native project
* `react-native run-android` 실행


## react-native run-android 버전 호환 오류
`error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup.`  
myProject > android > gradle > wrapper  
gradle-wrapper.properties 파일에서 버전 6.5 이상으로 올려주면 됨  
* `distributionUrl=https\://services.gradle.org/distributions/gradle-6.5-all.zip`  
* `.gradlew clean` (react-native 프로젝트 경로로 가서)
* `react-native run-anroid`


<br>
<br>
<br>

> ### Reference
> * [React Native CLI - Simulator 연동(android, ios)](https://wordbe.tistory.com/entry/React-Native-CLI-Simulator-%EC%97%B0%EB%8F%99android-ios)
> * [MacOS 개발 환경 설정 하기](https://firework-ham.tistory.com/104)
