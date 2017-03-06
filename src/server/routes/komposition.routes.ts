import * as gcloudDatastore from "@google-cloud/datastore";
import { IRouteConfiguration } from "@types/hapi";
import * as Boom from "boom";
import * as _ from "underscore";
import { Komposition } from "../entities/komposition";
import { Statement } from "../entities/statement";
import { log } from "../logging/index";
import { IRepository } from "../repositories/base.repository";
// import { KompositionRepository } from "../repositories/komposition.repository";
import * as KompositionValidator from "../validators/komposition.validator";

export class KompositionRoutes {
    public readonly routes: IRouteConfiguration[];
    constructor(private repo: IRepository<Komposition>) {
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
                        if (results) {
                            reply(results);
                        } else {
                            reply(Boom.notFound("Komposition not found for id: " + request.params.id));
                        }
                    });
            }
        }, {
            method: "DELETE",
            path: "/kompositions/{id}",
            handler(request, reply) {
                repo.delete(request.params.id)
                    .then((results) => {
                        if (results.n === 0) {
                            reply(Boom.notFound("Could not find a komposition matching key: " + request.params.id));
                        } else if (results.n === 1) {
                            reply({message: "Delete Successful"}).code(200);
                        } else {
                            reply(Boom.badImplementation("Something bad happened: [" + results.n + "]"));
                        }
                    });
            }
        }, {
            method: "GET",
            path: "/kompositions/findAction/{phrase}",
            handler(request, reply) {
                repo.getStatements()
                    .then((results) => {
                        const matchingStatement = _.find(results, (komposition: any) => {
                            const regex = new RegExp(komposition.statements.phrase, "gi");
                            const result = regex.exec(request.params.phrase);
                            if (result) { return komposition; }
                        });
                        if (matchingStatement != null) {
                            repo.read(matchingStatement._id)
                                .then((komposition) => {
                                    reply(komposition);
                                });
                        } else {
                            reply(Boom.notFound("Cannot find a Komposition that matches this phrase"));
                        }
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
                // request.payload._id = request.params.id;
                repo.update(request.params.id, request.payload)
                    .then((results) => {
                        reply(results).header("Location", "/kompositions/" + results.id);
                    });
            }
        }];

    }
}
