FROM node:boron
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY config /app/config
COPY src/server /app
EXPOSE 8080
CMD [ "node", "/app/index.js" ]