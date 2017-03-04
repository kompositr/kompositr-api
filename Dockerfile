FROM node:boron
COPY package.json .
RUN npm install
COPY config .
COPY src/server .
EXPOSE 8080
CMD [ "node", "index.js" ]