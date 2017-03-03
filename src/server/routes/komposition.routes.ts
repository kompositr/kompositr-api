import * as gcloudDatastore from "@google-cloud/datastore";
import { IRouteConfiguration } from "@types/hapi";
import { KompositionRepository } from "../repositories/komposition.repository";
import * as KompositionValidator from "../validators/komposition.validator";

export class KompositionRoutes {
    public readonly routes: IRouteConfiguration[];
    constructor(private repo: KompositionRepository) {
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
                        reply(results.data);
                    });
            }
        }, {
            config: {
                validate: {
                    payload: KompositionValidator.updateKomposition
                }
            },
            method: ["POST"],
            path: "/kompositions/",
            handler(request, reply) {
                repo.create(request.payload)
                    .then((results) => {
                        reply(results).header("Location", "/kompositions/" + results.id);
                    });
            }
        }, {
            config: {
                validate: {
                    payload: KompositionValidator.updateKomposition
                }
            },
            method: ["PUT"],
            path: "/kompositions/{id}",
            handler(request, reply) {
                repo.update(request.params.id, request.payload)
                    .then((results) => {
                        reply(results).header("Location", "/kompositions/" + results.id);
                    });
            }
        }];

    }
}
