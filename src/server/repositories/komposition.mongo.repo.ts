import { Komposition } from "../entities/komposition";
import { datastore } from "../typings/datastore";
import { IRepository } from "./base.repository";
import IEntity = datastore.IEntity;
import * as Promise from "bluebird";
import * as moment from "moment";
import { Collection, MongoClient, ObjectID } from "mongodb";
import { log } from "../logging/index";

export class KompositionMongoRepository implements IRepository<Komposition> {

    private db: Collection;

    constructor(private readonly config: any) {
        MongoClient.connect(config.host)
            .then((mongodb) => {
                log.infoc(() => "connected to mongo!");
                this.db = mongodb.collection(config.collection);
            });
    }

    public read(id: string): Promise<Komposition> {
        return this.db.findOne({ _id: new ObjectID(id) })
            .then((komposition) => {
                log.infoc(() => "found something.." + JSON.stringify(komposition));
                return this.fromMongo(komposition);
            });
    }

    public delete(id): Promise<any> {
        return this.db.deleteOne({ _id: new ObjectID(id) })
            .then((results: any) => {
                log.infoc(() => "komposition.repo.delete: " + results.toString());
                return JSON.parse(results);
            });
    }

    public getStatements(): Promise<Komposition> {
        return this.db.aggregate([{ $unwind: "$statements" }]).toArray().then((results) => {
            log.infoc(() => "komposition.repo.getStatements: " + JSON.stringify(results));
            return results;
        });
        // const query = this.ds.createQuery([this.config.kind])
        //     .select(["__key__", "statements.phrase"]);
        // return this.ds.runQuery(query)
        //     .then((entities) => {
        //         this.log.infoc(() => "KompositionRepository.getStatements" + JSON.stringify(entities));
        //         // if (err) {
        //         //     this.log.errorc(() => err);
        //         //     throw err;
        //         // }
        //         return entities;
        //     });
    }

    public list(): Promise {
        return this.db.find().toArray()
            .then((results) => {
                return results.map(this.fromMongo);
            });
    }

    public create(data: Komposition): Promise<Komposition> {
        return this.db.insert(this.toMongo(data))
            .then((result) => {
                return this.fromMongo(result.ops);
            });
    }

    public update(id: string, data: Komposition): Promise<Komposition> {
        log.infoc(() => "repo.update: " + id + JSON.stringify(data));
        return this.db.update({ _id: new ObjectID(id) }, this.toMongo(data))
            .then((err) => {
                return err;
            });
    }

    private fromMongo(item) {
        if (!item) { return item; }
        if (Array.isArray(item) && item.length) {
            item = item[0];
        }
        item.id = item._id;
        delete item._id;
        return item;
    }

    private toMongo(item) {
        delete item.id;
        return item;
    }

}
