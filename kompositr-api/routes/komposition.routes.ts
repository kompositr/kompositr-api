import { KompositionRespository } from "../repositories/komposition.repository"

export class KompositionRoutes {
    public routes: Object[];
    constructor() {
        let repo = new KompositionRespository();
        this.routes = [{
            method: 'GET',
            path: '/kompositions/',
            handler: function (request, reply) {
                repo.list()
                    .then((results) => {
                        reply(results)
                    });
            }
        }, {
            method: 'GET',
            path: '/kompositions/{id}',
            handler: function (request, reply) {
                repo.read(request.params.id)
                    .then((results) => {
                        reply(results)
                    });
            }
        }, {
            method: 'GET',
            path: '/kompositions/name/{name}',
            handler: function (request, reply) {
                repo.readByName(request.params.name)
                    .then((results) => {
                        reply(results)
                    });
            }
        }]

    }
}