# docker run -it -d -v ./dummy:/src -p 3000:3000 <container name>

FROM node:latest

RUN mkdir /node_modules

RUN mkdir /dummy

WORKDIR /dummy

ADD . /dummy

RUN npm install

RUN npm root

CMD ["node", "app.js"]
