# docker run -it -d -v ./dummy:/src -p 3000:3000 <container name>

FROM surenderthakran/nodejs:v4

RUN mkdir /src

RUN mkdir /src/node_modules

RUN mkdir /src/dummy

WORKDIR /src

ADD ./package.json /src/package.json

ADD ./Makefile /src/Makefile

RUN echo `ls`

RUN make install

#CMD ["node", "app.js"]
