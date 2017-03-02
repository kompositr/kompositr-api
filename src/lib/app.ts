"use strict";

import * as hapi from "hapi";
// import {log} from "./config/logging";
import { KompositionRoutes } from "./routes/komposition.routes";

const server = new hapi.Server();

server.connection({ port: 8080 });

server.route(new KompositionRoutes().routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    // log.infoc(() => `Server running at: ${server.info.uri}`);
    // tslint:disable-next-line:no-console
    console.log(`Server running at: ${server.info.uri}`);
});
