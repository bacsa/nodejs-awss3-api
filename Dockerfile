FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

RUN npm run build
# CMD node app.js

FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app /usr/local/nginx/html
