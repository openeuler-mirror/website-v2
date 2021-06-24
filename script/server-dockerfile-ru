FROM node:alpine

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/website-v2/server
WORKDIR /home/openeuler/website-v2/server

COPY . /home/openeuler/website-v2/server

WORKDIR /home/openeuler/website-v2/server

RUN npm install

EXPOSE 8090

ENTRYPOINT ["npm", "run"]
CMD ["start"]

