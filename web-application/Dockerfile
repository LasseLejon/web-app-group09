FROM node:16.13.2

EXPOSE 8080

WORKDIR /web-application

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start