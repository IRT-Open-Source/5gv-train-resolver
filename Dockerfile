FROM node:latest
WORKDIR /usr/train-resolver
COPY ./*.json ./
RUN npm install
RUN npm i -g @nestjs/cli
