#!/usr/bin/env sh

# 오류 발생시 중단한다.
set -e

# 문서(md)를 build하여 html로 만든다.
yarn build

# build가 output된 폴더로 이동한다.
cd docs/.vuepress/dist

# https://<USERNAME>.github.io 에 배포하는 경우
# git clone https://github.com/<USERNAME>/<USERNAME>.github.io/

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# 필자는 이 경우에 해당한다.
git clone -b gh-pages https://github.com/sso214/TIL/

# .git의 내용을 복사한 후 clone은 삭제한다.
cp -rf TIL/.git ./.git
rm -rf TIL

# 이제 add + commit + push를 차례대로 실행해주면 끝
# $1은 문자열 인자
git add .
git commit -m "$1"

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# git push origin master

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# 필자는 이 경우에 해당한다.
git push origin gh-pages

cd -
