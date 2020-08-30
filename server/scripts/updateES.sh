#!/bin/sh

set -e

# Configure version tag
VERSION=${VERSION:-master}
docs_tag_1="20.03_LTS"
docs_tag_2="1.0_Base"
username="openeulerserver"
password="openeulerserver@1234"
# Configure web domain url
WEB_DOMAIN_URL=${WEB_DOMAIN_URL:-http://127.0.0.1:8090}

curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${docs_tag_1}\&lang=zh\&model=docs
curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${docs_tag_1}\&lang=en\&model=docs

curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${docs_tag_2}\&lang=zh\&model=docs
curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${docs_tag_2}\&lang=en\&model=docs

curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=zh\&model=news
curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=en\&model=news

curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=zh\&model=blog
curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=en\&model=blog

# curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=zh\&model=live
# curl -k -u ${username}:${password} ${WEB_DOMAIN_URL}/search/insert?version=${VERSION}\&lang=en\&model=live
