FROM node:alpine

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web

COPY . /home/openeuler/web

RUN npm install -g vuepress
RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["dev"]

