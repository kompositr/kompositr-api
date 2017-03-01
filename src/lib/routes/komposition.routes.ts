import * as gcloudDatastore from "@google-cloud/datastore";
import { KompositionRespository } from "../repositories/komposition.repository";

export class KompositionRoutes {
    public routes: any[];
    constructor() {
        const repo = new KompositionRespository("Komposition", gcloudDatastore);
        this.routes = [{
            method: "GET",
            path: "/kompositions/",
            handler(request, reply) {
                repo.list()
                    .then((results) => {
                        reply(results);
                    });
            }
        }, {
            method: "GET",
            path: "/kompositions/{id}",
            handler(request, reply) {
                repo.read(request.params.id)
                    .then((results) => {
                        reply(results);
                    });
            }
        }, {
            method: "GET",
            path: "/kompositions/name/{name}",
            handler(request, reply) {
                repo.readByName(request.params.name)
                    .then((results) => {
                        reply(results);
                    });
            }
        }];

    }
}
