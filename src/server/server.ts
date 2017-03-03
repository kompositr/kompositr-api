import * as gcloud from "@google-cloud/datastore";
import * as hapi from "hapi";
import { KompositionRepository } from "./repositories/komposition.repository";
import { KompositionRoutes } from "./routes/komposition.routes";

export function init(config: any): hapi.Server {
    const server = new hapi.Server();

    server.connection({ port: config.get("Server.port") });
    const repo = new KompositionRepository(config.get("Komposition.dbConfig"), gcloud);
    server.route(new KompositionRoutes(repo).routes);
    return server;
}
