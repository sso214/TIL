#!/usr/bin/env sh

# abort on errors
set -e

git add .
git commit -m "$1"
git push origin main

sh deploy.sh "$1"
