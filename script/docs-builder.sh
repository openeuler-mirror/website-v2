#!/bin/sh

if [ -d "./docs" ]
then
  rm -fr ./docs
fi

git clone https://gitee.com/openeuler/docs

cd ./docs

for r in $(git branch -r --list "origin/stable2-*")
do
  b=${r##*origin/stable2-}
  git checkout -b $b $r
  
  mkdir -p ../web-ui/docs/zh/docs/$b
  cp -r ./docs/zh/docs/$b/* ../web-ui/docs/zh/docs/$b/ 
 
  mkdir -p ../web-ui/docs/en/docs/$b
  cp -r ./docs/en/docs/$b/* ../web-ui/docs/en/docs/$b/

  cd ..

  cd ./docs
  
done

cd ..
rm -fr ./docs