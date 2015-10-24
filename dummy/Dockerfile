# docker run -it -d -v ./dummy:/src <container name>

FROM node:latest

RUN mkdir /src

WORKDIR /src

ADD . /src

RUN npm install

CMD ["node", "app.js"]
