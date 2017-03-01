import { Komposition } from "../entities/komposition";
import { datastore } from "../typings/datastore";
import { BaseRepository } from "./base.repository";
import IEntity = datastore.IEntity;
import * as Promise from "bluebird";
import * as moment from "moment";

export class KompositionRespository extends BaseRepository {

    public read(id): Promise {
        const key = this.ds.key([this.kind, parseInt(id, 10)]);
        const start = moment();
        return this.ds.getAsync(key)
            .then((entity, err) => {
                if (err) { throw err; }
                const timeMs = moment.duration(moment().diff(start)).asMilliseconds();
                // this.log.debugc(() => "duration: " + timeMs);
                // tslint:disable-next-line:no-console
                console.log("duration: " + timeMs);
                return entity;
            });
    }

    public readByName(name: string): Promise {
        const query = this.ds.createQuery(this.kind);
        query.filter("name", name);
        return this.ds.runQueryAsync(query)
            .then((entities, err) => {
                if (err) {
                    // this.log.errorc(() => err);
                // tslint:disable-next-line:no-console
                    console.log(err);
                    throw err;
                }
                return entities;
            });
    }

    public list(): Promise {
        const q = this.ds.createQuery([this.kind])
            .order("name");

        return this.ds.runQueryAsync(q)
            .then((entities, err) => {
                if (err) { throw err; }
                return entities;
            });
    }

    public create(data: Komposition): Promise {
        return this.update(null, data);
    }

    public update(id: string, data: Komposition): Promise {
        let key;
        if (id) {
            key = this.ds.key([this.kind, parseInt(id, 10)]);
        } else {
            key = this.ds.key(this.kind);
        }

        const entity = { key, data };

        return this.ds.saveAsync(entity)
            .then((err) => {
                if (err) { throw err; }
                data.id = entity.key.id;
                return data;
            });
    }
}
