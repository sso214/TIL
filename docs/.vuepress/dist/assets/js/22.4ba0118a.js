(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{386:function(t,e,a){"use strict";a.r(e);var n=a(44),l=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"django-텔레그램-연동하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#django-텔레그램-연동하기"}},[t._v("#")]),t._v(" Django 텔레그램 연동하기")]),t._v(" "),a("p",[t._v("회사에서 업무를 진행하면서 django에 텔레그램을 연동해야할 일이 있었다.")]),t._v(" "),a("ol",[a("li",[t._v("텔레그램 앱 실행")]),t._v(" "),a("li",[t._v("텔레그램에서 BotFather 검색")]),t._v(" "),a("li",[t._v("BotFather 과의 대화창에서 "),a("code",[t._v("/start")]),t._v(" 전송")]),t._v(" "),a("li",[a("code",[t._v("/newbot")]),t._v(" 전송")]),t._v(" "),a("li",[t._v("가이드대로 봇 이름 입력해서 전송 (이름 맨 뒤가 _bot 으로 끝나야 함)")]),t._v(" "),a("li",[t._v("위의 순서가 끝나면 BotFather가 key를 줌.")]),t._v(" "),a("li",[t._v("django 프로젝트에서 "),a("code",[t._v("pip install telegram")]),t._v(" 실행")]),t._v(" "),a("li",[a("code",[t._v("pip install python-telegram-bot")]),t._v(" 실행")]),t._v(" "),a("li",[t._v("코드에 import telegram")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import telegram\n\ntelgm_token = '받은 API Key'\nbot = telegram.Bot(token = telgm_token)\nupdates = bot.getUpdates()\n\nprint(updates)\n\nfor i in updates:\n    print(i)\n\nprint('start telegram chat bot')\n")])])]),a("ol",{attrs:{start:"10"}},[a("li",[t._v("위 코드 실행하면 print에 "),a("code",[t._v("'chat': {'id': ******}")]),t._v(" chat_id 나옴")]),t._v(" "),a("li",[t._v("텔레그램에 메세지 전송하기")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import telegram\n\ntelgm_token = '받은 API Key'\nbot = telegram.Bot(token = telgm_token)\n\nbot.sendMessage(chat_id='방금 받은 chat_id', text='보낼 메세지') // 텍스트 전송됨\n")])])]),a("p",[a("code",[t._v("pip freeze > requirements.txt")]),t._v(" freeze 꼭 해줘야 함!")])])}),[],!1,null,null,null);e.default=l.exports}}]);