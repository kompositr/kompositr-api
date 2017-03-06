// import { Komposition } from "../entities/komposition";
// import { datastore } from "../typings/datastore";
// import { IRepository } from "./base.repository";
// import IEntity = datastore.IEntity;
// import * as Promise from "bluebird";
// import * as moment from "moment";
// import { ObjectID } from "mongodb";
// import { log } from "../logging/index";

// export class KompositionRepository extends BaseRepository {

//     public read(id): Promise {
//         const collection = this.db.collection(this.config.collection);
//         return collection.findOne({ _id: new ObjectID(id) })
//             .then((komposition, e) => {
//                 if (e) {
//                     this.log.infoc(() => "ERROR QUERYING MONGO: " + e.toString());
//                     throw e;
//                 }
//                 this.log.infoc(() => "found something.." + JSON.stringify(komposition));
//                 return komposition;
//             });
//         // const key = this.ds.key([this.config.kind, parseInt(id, 10)]);
//         // const start = moment();
//         // return this.ds.get(key)
//         //     .then((err, entity) => {
//         //         this.log.debugc(() => "KompositionRepsotiry.get: " + JSON.stringify(err) + "  ><  " + JSON.stringify(entity));
//         //         if (err) { throw err; }
//         //         const timeMs = moment.duration(moment().diff(start)).asMilliseconds();
//         //         this.log.debugc(() => "duration: " + timeMs);
//         //         return entity;
//         //     });
//     }

//     public delete(id): Promise {
//         // const key = this.ds.key([this.config.kind, parseInt(id, 10)]);
//         // return this.ds.delete(key)
//         //     .then((err, etities) => {
//         //         this.log.infoc(() => "KompositionRepository.delete: " + JSON.stringify(err) + " >< " + JSON.stringify(etities));
//         //         return err;
//         //     });
//     }

//     public getStatements(): Promise {
//         // const query = this.ds.createQuery([this.config.kind])
//         //     .select(["__key__", "statements.phrase"]);
//         // return this.ds.runQuery(query)
//         //     .then((entities) => {
//         //         this.log.infoc(() => "KompositionRepository.getStatements" + JSON.stringify(entities));
//         //         // if (err) {
//         //         //     this.log.errorc(() => err);
//         //         //     throw err;
//         //         // }
//         //         return entities;
//         //     });
//     }

//     // function fromDatastore(obj) {
//     //     obj.data.id = obj.key.id;
//     //     return obj.data;
//     // }

//     public list(): Promise {
//         // const q = this.ds.createQuery([this.config.kind]);

//         // return this.ds.runQuery(q)
//         //     .then((entities, err) => {
//         //         if (err) { throw err; }
//         //         return entities;
//         //     });
//     }

//     public create(data: Komposition): Promise {
//         // return this.update(null, data);
//     }

//     public update(id: string, data: Komposition): Promise {
//         // let key;
//         // if (id) {
//         //     this.log.infoc(() => "id was provided, so should be updating");
//         //     key = this.ds.key([this.config.kind, parseInt(id, 10)]);
//         // } else {
//         //     key = this.ds.key(this.config.kind);
//         // }

//         // const entity = { key, data: this.toDatastore(data, ["action.type"]) };
//         // this.log.infoc(() => "entity is: " + JSON.stringify(entity));

//         // return this.ds.save(entity)
//         //     .then((err) => {
//         //         if (err) {
//         //             this.log.infoc(() => JSON.stringify(err));
//         //             // throw err;
//         //         }
//         //         data.id = entity.key.id;

//         //         return data;
//         //     });
//     }
// }
