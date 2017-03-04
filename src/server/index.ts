import * as Config from "config";
import * as Server from "./server";

import {log} from "./logging/index";

const server = Server.init(Config);

server.start((err) => {
    if (err) { throw err; }
    // log.infoc(() => `Server running at: ${server.info.uri}`);
    // tslint:disable-next-line:no-console
    console.log(`Server running at: ${server.info.uri}`);
});
