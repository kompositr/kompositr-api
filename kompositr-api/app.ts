'use strict';

import * as hapi from "hapi";

var routes = require('./routes/index.routes');

const server = new hapi.Server();

server.connection({ port: 8080 });

server.route(routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});