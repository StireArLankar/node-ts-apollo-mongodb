FROM node:12

WORKDIR /home/app/

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

EXPOSE 4000

CMD yarn start