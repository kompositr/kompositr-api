import {KompositionRespository} from "../data_access/komposition.repository"

export class KompositionRoutes {
    public routes: Object[];
    constructor() {
        this.routes = [{
            method: 'GET',
            path: '/kompositions/',
            handler: function (request, reply) {
                let repo = new KompositionRespository();
                repo.list()
                    .then((results) => {
                        reply(results)
                    });
            }
        }, {
            method: 'GET',
            path: '/kompositions/{id}',
            handler: function (request, reply) {
                let repo = new KompositionRespository();
                repo.read(request.params.id)
                    .then((results) => {
                        reply(results)
                    });
            }
        }, {
            method: 'GET',
            path: '/kompositions/name/{name}',
            handler: function (request, reply) {
                let repo = new KompositionRespository();
                repo.readByName(request.params.name)
                    .then((results) => {
                        reply(results)
                    });
            }
        }]

    }
}