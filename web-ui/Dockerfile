FROM node:alpine as Builder

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web
COPY . /home/openeuler/web

RUN npm install

RUN npm run build

FROM nginx:1.19.2

COPY --from=Builder /home/openeuler/web/docs/.vuepress/dist/ /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./deploy/nginx/default.conf /etc/nginx/conf.d/

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]


