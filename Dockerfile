FROM node:24.11.1-alpine3.22

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$SERVER_URL

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]