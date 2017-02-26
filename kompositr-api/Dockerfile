FROM node:4

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start", "-s"]