FROM openeuler/node:10.21.0-20.03-lts-sp1

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/website-v2/server
WORKDIR /home/openeuler/website-v2/server

COPY . /home/openeuler/website-v2/server

WORKDIR /home/openeuler/website-v2/server

RUN npm install

EXPOSE 8090

ENTRYPOINT ["npm", "run"]
CMD ["start"]

