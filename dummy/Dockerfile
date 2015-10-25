# docker run -it -d -v ./dummy:/src -p 3000:3000 <container name>

FROM surenderthakran/nodejs:v4

RUN mkdir /node_modules

RUN mkdir /dummy

ADD ./package.json /package.json

RUN npm install

RUN npm root

WORKDIR /dummy

#CMD ["node", "app.js"]
