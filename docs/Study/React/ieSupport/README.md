---
title : CRA IE 지원  
date : 2021.06.03
---

# CRA IE 지원  
2021.06.03  

CRA로 구축한 React 프로젝트가 구 IE에서는 빈 화면으로 노출이 되어서 CRA IE 지원하는 방법을 찾아봤다.   
처음에는 babel 버전만 낮추면 되는 줄 알았는데 오..  
Internet Explorer 9,10,11을 지원하고 싶으면 polyfill이 필요하다고 한다.  

1. react-app-polyfill 설치
```shell
$ npm install react-app-polyfill --save
```

2. src/index.tsx 파일에 import
```tsx
import 'react-app-polyfill/ie9'; // ie9 지원
import 'react-app-polyfill/ie11'; // ie11 지원
import 'react-app-polyfill/stable';
```

<br/>
<br/>

여기서 문제가 해결된 줄 알았는데 ie에서 계속 화면이 안나와서   
콘솔을 확인해보니 `[MobC] proxy not available` 에러가 찍혔다.    
찾아보니 MobX가 5.x 이후부터는 polyfill 사용이 불가능해  
ES6 Proxy를 사용하기 때문에 IE 지원이 안된다고 한다 ㅠㅠ  

다행히 이번 프로젝트는 크롬, 사파리만 지원하기 때문에 안내 문구만 띄우면 괜찮지만   
IE까지 지원해야하는 서비스라면 MobX 4로 downgrade 해야하는 상황 ㅠㅠ   
너무 기본적인 사항이지만 프로젝트 스펙 정할 때 지원 브라우저 꼭 확인하고 작업해야겠다 ㅠㅠ  

## Reference
* [Supported Browsers and Features](https://create-react-app.dev/docs/supported-browsers-features/)
* [react-app-polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)
* [CRA(create-react-app)에서 IE 지원하기](http://www.chidoo.me/index.php/2020/02/27/create-react-app-ie-support/)
* [IE11 지원하며 마주친 문제들](https://choyongjoon.com/ie11-issues/)
* [MobX](https://github.com/mobxjs/mobx#browser-support)
