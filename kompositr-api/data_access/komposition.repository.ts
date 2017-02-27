import {BaseRepository, datastore} from "./base.repository";
import {Komposition} from "../model/komposition"

import IEntity = datastore.IEntity;
import * as Promise from "bluebird"
import * as moment from "moment"

export class KompositionRespository extends BaseRepository {

    read(id) {
        const key = this.ds.key([this.kind, parseInt(id, 10)]);
        let start = moment();
        return this.ds.getAsync(key)
            .then((entity, err) => {
                if (err) throw err;
                let timeMs = moment.duration(moment().diff(start)).asMilliseconds();
                console.log("duration: " + timeMs);
                return entity
            });
    }

    readByName(name: string): Promise {
        let query = this.ds.createQuery(this.kind);
        query.filter('name', name);
        return this.ds.runQueryAsync(query)
            .then(function (entities, err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                return entities
            });
    }

    list(): Promise {

        const q = this.ds.createQuery([this.kind])
            .order('name');

        return this.ds.runQueryAsync(q)
            .then((entities, err) => {
                if (err) throw err;
                return entities;
            });
    }


    create(data: Komposition): Promise {
        return this.update(null, data);
    }


    update(id: string, data: Komposition): Promise {
        let key;
        if (id)
            key = this.ds.key([this.kind, parseInt(id, 10)]);
        else
            key = this.ds.key(this.kind);

        const entity = {
            key: key,
            data: data
        };

        return this.ds.saveAsync(entity)
            .then((err) => {
                if (err) throw err;
                data.id = entity.key.id;
                return data;
            })
    }

}