FROM node:24.11.1-alpine3.22

WORKDIR /app

ARG VITE_SERVER_URL

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN echo "VITE_SERVER_URL='$VITE_SERVER_URL'"
RUN printenv | grep VITE_

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]