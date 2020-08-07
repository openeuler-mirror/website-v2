#!/bin/sh

FROM node:12

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web

COPY . /home/openeuler/web

RUN npm install -g vuepress
RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["dev"]

