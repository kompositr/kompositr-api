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
}
