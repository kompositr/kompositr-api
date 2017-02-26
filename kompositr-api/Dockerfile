FROM node:6.10.0
COPY . /app
WORKDIR /app
RUN npm install && npm ls
EXPOSE 3000
CMD [ "npm", "start"]