FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

# CMD node app.js

FROM nginx
EXPOSE 80
COPY /usr/src/app /usr/share/nginx/html
