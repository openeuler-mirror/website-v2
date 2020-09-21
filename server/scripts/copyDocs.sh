#!/bin/bash

if [ -d "./docs" ]; then
	rm -fr ./docs
fi

git clone https://gitee.com/openeuler/docs

cd ./docs

for r in $(git branch -r --list "origin/stable2-*"); do
	b=${r##*origin/stable2-}

	git checkout -b $b $r

	mkdir -p /home/openeuler/website-v2/server/docs/$b/zh/
	cp -r ./docs/zh/docs/$b/* /home/openeuler/website-v2/server/docs/$b/zh/

	mkdir -p /home/openeuler/website-v2/server/docs/$b/en/
	cp -r ./docs/en/docs/$b/* /home/openeuler/website-v2/server/docs/$b/en/

	cd ..

	cd ./docs

done

cd ..