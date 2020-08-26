#!/bin/sh

set -e

# Configure version tag
VERSION=${VERSION:-master}
docs_tag_1="20.03_LTS"
docs_tag_2="1.0_Base"

# Configure web domain url
WEB_DOMAIN_URL=${WEB_DOMAIN_URL:-http://127.0.0.1:8090}

curl -k ${WEB_DOMAIN_URL}/createMenu?version=${VERSION}\&lang=zh
curl -k ${WEB_DOMAIN_URL}/createMenu?version=${VERSION}\&lang=en

curl -k ${WEB_DOMAIN_URL}/createMenu?version=${docs_tag_1}\&lang=zh
curl -k ${WEB_DOMAIN_URL}/createMenu?version=${docs_tag_1}\&lang=en

curl -k ${WEB_DOMAIN_URL}/createMenu?version=${docs_tag_2}\&lang=zh
curl -k ${WEB_DOMAIN_URL}/createMenu?version=${docs_tag_2}\&lang=en