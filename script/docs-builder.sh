#!/bin/sh

if [ -d "./docs" ]
then
  rm -rf ./docs
fi

git clone https://gitee.com/openeuler/docs

cd ./docs

mkdir -p ../server/web-ui/docs/zh
mkdir -p ../server/web-ui/docs/en
cp -r ../web-ui/docs/zh/blog ../server/web-ui/docs/zh
cp -r ../web-ui/docs/en/blog ../server/web-ui/docs/en
cp -r ../web-ui/docs/zh/news ../server/web-ui/docs/zh
cp -r ../web-ui/docs/en/news ../server/web-ui/docs/en

for r in $(git branch -r --list "origin/stable2-*")
do
  b=${r##*origin/stable2-}
  git checkout -b $b $r

  mkdir -p ../server/docs/$b/zh/
  cp -r ./docs/zh/* ../server/docs/$b/zh/

  mkdir -p ../server/docs/$b/en/
  cp -r ./docs/en/* ../server/docs/$b/en/
  
  cd ..
  cd ./docs
done

cd ..
rm -rf ./docs