import * as gcloudDatastore from "@google-cloud/datastore";
import * as q from "bluebird";
// import {log} from "../config/logging";
import { datastore } from "../typings/datastore";
import IDatastore = datastore.IDatastore;
import { Komposition } from "../entities/komposition";

export class BaseRepository {
    protected readonly ds: IDatastore;
    protected readonly log;
    constructor(protected kind: string, private datastore: gcloudDatastore) {
        this.ds = q.promisifyAll(datastore({
            projectId: "kompositr"
        }));
        // this.log = log;
    }

    protected toDatastore(obj, nonIndexed = null) {
        nonIndexed = nonIndexed || [];
        const results = [];
        Object.keys(obj).forEach((k) => {
            if (obj[k] === undefined) {
                return;
            }
            results.push({
                excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
                name: k,
                value: obj[k]
            });
        });
        return results;
    }
}
