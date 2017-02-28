'use strict';

import * as hapi from "hapi";
import {KompositionRoutes} from "./routes/komposition.routes"

const server = new hapi.Server();

server.connection({ port: 8080 });

server.route(new KompositionRoutes().routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});