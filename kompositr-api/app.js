'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route(routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});