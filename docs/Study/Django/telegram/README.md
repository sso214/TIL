---
title : django 텔레그램 연동하기  
date : 2021.08.19  
---

# Django 텔레그램 연동하기

회사에서 기업 웹사이트를 제작하면서 텔레그램을 연동해야할 일이 있었다.  
채용 페이지였는데 admin을 만들기엔 시간이 촉박하고 간단하고 빠르게 텔레그램으로 정보를 전달 받을 수 있게 하기 위해 텔레그램을 
연동하게 되었다. 

<br/>

1. 텔레그램 앱 실행
2. 텔레그램에서 BotFather 검색
3. BotFather 과의 대화창에서 `/start` 전송
4. `/newbot` 전송
5. 가이드대로 봇 이름 입력해서 전송 (이름 맨 뒤가 _bot 으로 끝나야 함)
6. 위의 순서가 끝나면 BotFather가 key를 줌. 
7. django 프로젝트에서 `pip install telegram` 실행
8. `pip install python-telegram-bot` 실행
9. 코드에 import telegram
```
import telegram

telgm_token = '받은 API Key'
bot = telegram.Bot(token = telgm_token)
updates = bot.getUpdates()

print(updates)

for i in updates:
    print(i)

print('start telegram chat bot')
```
10. 위 코드 실행하면 print에 `'chat': {'id': ******}` chat_id 나옴
11. 텔레그램에 메세지 전송하기
```
import telegram

telgm_token = '받은 API Key'
bot = telegram.Bot(token = telgm_token)

bot.sendMessage(chat_id='방금 받은 chat_id', text='보낼 메세지') // 텍스트 전송됨
```

<br/>

위처럼 텔레그램으로 메세지나 이미지, 파일까지도 전송할 수 있는데 문제가 하나 생겼다.  
파일이나 이미지를 전송하려면 해당 파일의 path를 알아야 하는데 보안때문에 fakepath만 노출되고 파일 경로가 노출이 안된다 ㅠㅠ  
그래서 아직 방법을 찾고 있는데 파일을 저장했다가 따로 보여주는 식으로 해야하나..  
이건 시간들여서 찾아봐도 도무지 모르겠어서 다른 개발자분들께 여쭤봐야 할 것 같다.  



