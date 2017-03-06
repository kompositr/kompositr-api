import * as hapi from "hapi";
import * as Inert from "inert";
import {log} from "./logging/index";
import { KompositionMongoRepository } from "./repositories/komposition.mongo.repo";
// import { KompositionRepository } from "./repositories/komposition.repository";
import { KompositionRoutes } from "./routes/komposition.routes";

export function init(config: any): hapi.Server {
    const server = new hapi.Server();

    server.connection({ port: config.get("Server.port") });
    const repo = new KompositionMongoRepository(config.get("Komposition.dbConfig"));
    server.route(new KompositionRoutes(repo).routes);

    server.register(Inert, (err) => {
            if (err) {
                throw err;
            }

            server.route({
                handler(request, reply) {
                    return reply.file("src/app/index.html");
                },
                method: "GET",
                path: "/{path*}"
            });
            return server;
        });

    return server;
}
