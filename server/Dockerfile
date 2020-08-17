FROM node:alpine

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/www/express
WORKDIR /home/openeuler/www/express

COPY . /home/openeuler/www/express

RUN npm install

EXPOSE 8090

ENTRYPOINT ["npm", "run"]
CMD ["start"]

