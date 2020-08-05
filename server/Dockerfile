FROM node:12

RUN mkdir -p /home/openeuler/www/express
WORKDIR /home/openeuler/www/express

COPY . /home/openeuler/www/express

RUN npm install

EXPOSE 8090

ENTRYPOINT ["npm", "run"]
CMD ["start"]

