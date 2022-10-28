---
title : django 텔레그램 연동하기  
date : 2021.08.19  
---

# Django 텔레그램 연동하기

회사에서 업무를 진행하면서 django에 텔레그램을 연동해야할 일이 있었다.  

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

`pip freeze > requirements.txt` freeze 꼭 해줘야 함!



