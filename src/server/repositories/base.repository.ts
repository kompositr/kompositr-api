import * as gcloudDatastore from "@google-cloud/datastore";
import * as q from "bluebird";
import { log } from "../logging/index";
import { datastore } from "../typings/datastore";
import IDatastore = datastore.IDatastore;
import { Komposition } from "../entities/komposition";

export interface IRepository<T> {
    create(entity: T): Promise<T>;
    delete(id: string): Promise<any>;
    read(id: string): Promise<T>;
    update(id: string, entity: T): Promise<T>;
    list(): Promise<T[]>;
    getStatements(): Promise<T>;
}

// import * as gcloudDatastore from "@google-cloud/datastore";
// import * as q from "bluebird";
// import {log} from "../logging/index";
// import { datastore } from "../typings/datastore";
// import IDatastore = datastore.IDatastore;
// import { MongoClient } from "mongodb";
// import { Komposition } from "../entities/komposition";

// export class BaseRepository {
//     protected readonly ds: IDatastore;
//     protected db;
//     protected readonly log;
//     constructor(protected readonly config: any) {
//         this.db = "";
//         MongoClient.connect(config.host)
//             .then((mongodb) => {
//                 log.infoc(() => "connected to mongo!");
//                 this.db = mongodb;
//             });
//         // this.ds = q.promisifyAll(datastore(config));
//         // this.ds = gcloudDatastore(config);
//         this.log = log;
//     }

//     protected toDatastore(obj, nonIndexed = null) {
//         nonIndexed = nonIndexed || [];
//         const results = [];
//         Object.keys(obj).forEach((k) => {
//             if (obj[k] === undefined) {
//                 return;
//             }
//             if (k === "id") { return; }
//             results.push({
//                 excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
//                 name: k,
//                 value: obj[k]
//             });
//         });
//         return results;
//     }
// }
