import * as q from "bluebird"
import * as gcloudDatastore from "@google-cloud/datastore"
import { datastore } from "../entities/datastore";
import IDatastore = datastore.IDatastore;
import { Komposition } from "../entities/komposition"

export class BaseRepository {
    readonly ds: IDatastore
    constructor(protected kind: string, private datastore: gcloudDatastore) {
        var ds = q.promisifyAll(datastore({
            projectId: 'kompositr'
        }));
        this.ds = ds;
    }
}
