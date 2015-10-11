###
#
# Dockerfile for codrender.com version-1
#
###
FROM surenderthakran/nodejs

## Copy Source Code
ADD . /src

## Change to work directory
WORKDIR /src

RUN npm install

CMD ["node src/index.js"]
