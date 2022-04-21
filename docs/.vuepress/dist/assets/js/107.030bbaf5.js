(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{466:function(a,t,e){"use strict";e.r(t);var r=e(44),s=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"mac-android-simulator-연동하기"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mac-android-simulator-연동하기"}},[a._v("#")]),a._v(" Mac android Simulator 연동하기")]),a._v(" "),e("h2",{attrs:{id:"homebrew"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#homebrew"}},[a._v("#")]),a._v(" Homebrew")]),a._v(" "),e("ul",[e("li",[a._v("brew install"),e("br"),a._v(" "),e("code",[a._v('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"')])]),a._v(" "),e("li",[a._v("brew install check\n"),e("code",[a._v("brew --version")])])]),a._v(" "),e("h2",{attrs:{id:"node"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node"}},[a._v("#")]),a._v(" node")]),a._v(" "),e("ul",[e("li",[a._v("node install"),e("br"),a._v(" "),e("code",[a._v("brew install node")])]),a._v(" "),e("li",[a._v("node install check"),e("br"),a._v(" "),e("code",[a._v("node --version")])]),a._v(" "),e("li",[a._v("npm install check"),e("br"),a._v(" "),e("code",[a._v("npm --version")])])]),a._v(" "),e("h2",{attrs:{id:"watchman"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#watchman"}},[a._v("#")]),a._v(" watchman")]),a._v(" "),e("p",[a._v("지정된 디렉토리 및 파일을 감시해 변경 감지 시 특정 동작 실행")]),a._v(" "),e("ul",[e("li",[a._v("watchman install"),e("br"),a._v(" "),e("code",[a._v("brew install watchman")])]),a._v(" "),e("li",[a._v("watchman install check"),e("br"),a._v(" "),e("code",[a._v("watchman --version")])])]),a._v(" "),e("h2",{attrs:{id:"react-native-cli"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-native-cli"}},[a._v("#")]),a._v(" React-Native-CLI")]),a._v(" "),e("p",[a._v("expo cli 사용 시 필요없는 라이브러리도 같이 설치해야하기 때문에 프로젝트 용량 커짐."),e("br"),a._v("\nexpo cli에서 제공하지 않는 부분 사용하기 어려움."),e("br"),a._v("\n때문에 react-native-cli 설치")]),a._v(" "),e("ul",[e("li",[a._v("react-native-cli install"),e("br"),a._v(" "),e("code",[a._v("npm install -g react-native-cli")])])]),a._v(" "),e("h2",{attrs:{id:"xcode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#xcode"}},[a._v("#")]),a._v(" Xcode")]),a._v(" "),e("p",[a._v("ios 앱 만들기 위해 필수 설치")]),a._v(" "),e("ul",[e("li",[a._v("App Store - Xcode 설치")]),a._v(" "),e("li",[a._v("Xcode > Preferences > Locations > Command Line Tools 설치")])]),a._v(" "),e("h2",{attrs:{id:"cocoapods"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cocoapods"}},[a._v("#")]),a._v(" cocoapods")]),a._v(" "),e("p",[a._v("ios 개발에 사용되는 의존성 관리 (라이브러리 설치 및 관리 시 사용)")]),a._v(" "),e("ul",[e("li",[a._v("cocoapods install"),e("br"),a._v(" "),e("code",[a._v("sudo gem install cocoapods")])]),a._v(" "),e("li",[a._v("cocoapods install check"),e("br"),a._v(" "),e("code",[a._v("pod --version")])])]),a._v(" "),e("h2",{attrs:{id:"java"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#java"}},[a._v("#")]),a._v(" Java")]),a._v(" "),e("ul",[e("li",[a._v("Java install"),e("br"),a._v(" "),e("code",[a._v("brew cask install adoptopenjdk8")]),e("br"),a._v("\nUnkown command : cask error 시 "),e("code",[a._v("brew install --cask adoptopenjdk8")])])]),a._v(" "),e("h2",{attrs:{id:"android-studio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#android-studio"}},[a._v("#")]),a._v(" Android Studio")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("Android Studio download"),e("br"),a._v(" "),e("a",{attrs:{href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://developer.android.com/studio"),e("OutboundLink")],1)])]),a._v(" "),e("li",[e("p",[a._v("Configure > SDK Manager")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("Android 9.0 (Pie)")])]),a._v(" "),e("li",[e("p",[a._v("Android SDK Build-Tools")])]),a._v(" "),e("li",[e("p",[a._v("Android Emulator")])]),a._v(" "),e("li",[e("p",[a._v("Android SDK Platform - Tools")])]),a._v(" "),e("li",[e("p",[a._v("Android SDK Tools (Obsolete) : 구식이라고 숨겨져있다.")])]),a._v(" "),e("li",[e("p",[a._v("Intel x86 Emulator Accelerator")])]),a._v(" "),e("li",[e("p",[a._v("Google Play Services : 이건 나중에 배포할 때 사용한다.")])])])]),a._v(" "),e("li",[e("p",[a._v("Configure > AVD Manager")]),a._v(" "),e("ul",[e("li",[e("ul",[e("li",[a._v("Create Virtual Device")])])]),a._v(" "),e("li",[a._v("Simulator action")])])])]),a._v(" "),e("h2",{attrs:{id:"vi-zshrc"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vi-zshrc"}},[a._v("#")]),a._v(" vi .zshrc")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("$ cd ~")])]),a._v(" "),e("li",[e("code",[a._v("$ vi .zshrc")])]),a._v(" "),e("li",[a._v("Android studio 경로 등록")])]),a._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#$HOME = 안드로이드 스튜디오 Preference에 경로 나옴")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ANDROID_HOME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/Library/Android/sdk  \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ANDROID_HOME")]),a._v("/emulator  \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ANDROID_HOME")]),a._v("/tools  \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ANDROID_HOME")]),a._v("/tools/bin  \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ANDROID_HOME")]),a._v("/platform-tools\n")])])]),e("ul",[e("li",[a._v("shell 껐다 키기")]),a._v(" "),e("li",[e("code",[a._v("source .zshrc")])])]),a._v(" "),e("h2",{attrs:{id:"react-native-project"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-native-project"}},[a._v("#")]),a._v(" React-native project")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("react-native run-android")]),a._v(" 실행")])]),a._v(" "),e("h2",{attrs:{id:"react-native-run-android-버전-호환-오류"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#react-native-run-android-버전-호환-오류"}},[a._v("#")]),a._v(" react-native run-android 버전 호환 오류")]),a._v(" "),e("p",[e("code",[a._v("error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup.")]),e("br"),a._v("\nmyProject > android > gradle > wrapper"),e("br"),a._v("\ngradle-wrapper.properties 파일에서 버전 6.5 이상으로 올려주면 됨")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("distributionUrl=https\\://services.gradle.org/distributions/gradle-6.5-all.zip")])]),a._v(" "),e("li",[e("code",[a._v(".gradlew clean")]),a._v(" (react-native 프로젝트 경로로 가서)")]),a._v(" "),e("li",[e("code",[a._v("react-native run-anroid")])])]),a._v(" "),e("br"),a._v(" "),e("br"),a._v(" "),e("br"),a._v(" "),e("blockquote",[e("h3",{attrs:{id:"reference"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[a._v("#")]),a._v(" Reference")]),a._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://wordbe.tistory.com/entry/React-Native-CLI-Simulator-%EC%97%B0%EB%8F%99android-ios",target:"_blank",rel:"noopener noreferrer"}},[a._v("React Native CLI - Simulator 연동(android, ios)"),e("OutboundLink")],1)]),a._v(" "),e("li",[e("a",{attrs:{href:"https://firework-ham.tistory.com/104",target:"_blank",rel:"noopener noreferrer"}},[a._v("MacOS 개발 환경 설정 하기"),e("OutboundLink")],1)])])])])}),[],!1,null,null,null);t.default=s.exports}}]);