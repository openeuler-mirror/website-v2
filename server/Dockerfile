FROM node:alpine

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler
WORKDIR /home/openeuler

COPY . /home/openeuler

WORKDIR /home/openeuler/website-v2/server

RUN npm install

EXPOSE 8090

ENTRYPOINT ["npm", "run"]
CMD ["start"]

