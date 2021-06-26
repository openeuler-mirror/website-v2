#!/bin/sh

if [ -d "./docs" ]
then
  rm -rf ./docs
fi

git clone https://gitee.com/openeuler/docs

cd ./docs

for r in $(git branch -r --list "origin/stable2-*")
do
  b=${r##*origin/stable2-}
  git checkout -b $b $r
  
  if [ -d "./docs/ru" ]; then
    mkdir -p ../server/docs/$b/ru/
    cp -r ./docs/ru/* ../server/docs/$b/ru/
  fi
  
  cd ..
  cd ./docs
done

cd ..
rm -rf ./docs

cp ./script/server-dockerfile-ru ./server/Dockerfile
cp ./script/webui-dockerfile-ru ./web-ui/Dockerfile