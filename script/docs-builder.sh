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
  
  mkdir -p ../web-ui/docs/zh/docs/$b
  cp -r ./docs/zh/docs/$b/* ../web-ui/docs/zh/docs/$b/ 
 
  mkdir -p ../web-ui/docs/en/docs/$b
  cp -r ./docs/en/docs/$b/* ../web-ui/docs/en/docs/$b/

  mkdir -p /home/openeuler/website-v2/server/docs/$b/zh
  cp -r ./docs/zh/docs/$b/* ../server/docs/$b/zh/

  mkdir -p /home/openeuler/website-v2/server/docs/$b/en
  cp -r ./docs/en/docs/$b/* ../server/docs/$b/en/
  
  cd ..

  cd ./docs
  
done

cd ..
rm -rf ./docs