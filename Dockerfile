FROM node:boron
RUN mkdir -p /kompositr/src
WORKDIR /kompositr
COPY package.json /kompositr
RUN npm install
COPY config /kompositr/config
COPY src/server /kompositr/src/server
COPY src/app /kompositr/src/app
EXPOSE 8080
CMD [ "node", "src/server/index.js" ]
