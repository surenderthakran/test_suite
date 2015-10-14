###
#
# Dockerfile for codrender.com version-1
#
###
FROM surenderthakran/nodejs:v4.1.2

## Copy Source Code
ADD . /src

## Change to work directory
WORKDIR /src

RUN npm install

EXPOSE 80

CMD ["node", "/src/index.js"]
#ENTRYPOINT ["node", "index.js"]
