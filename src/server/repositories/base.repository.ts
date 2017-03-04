import * as gcloudDatastore from "@google-cloud/datastore";
import * as q from "bluebird";
import {log} from "../logging/index";
import { datastore } from "../typings/datastore";
import IDatastore = datastore.IDatastore;
import { Komposition } from "../entities/komposition";

export class BaseRepository {
    protected readonly ds: IDatastore;
    protected readonly log;
    constructor(protected config: any, private datastore: gcloudDatastore) {
        this.ds = q.promisifyAll(datastore(config));
        this.log = log;
    }

    protected toDatastore(obj, nonIndexed = null) {
        nonIndexed = nonIndexed || [];
        const results = [];
        Object.keys(obj).forEach((k) => {
            if (obj[k] === undefined) {
                return;
            }
            if (k === "id") { return; }
            results.push({
                excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
                name: k,
                value: obj[k]
            });
        });
        return results;
    }
}
