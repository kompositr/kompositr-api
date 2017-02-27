import * as q from "bluebird"
import * as google from "@google-cloud/datastore"
import IDatastore = datastore.IDatastore;
import {Komposition} from "../model/komposition"

export class BaseRepository {
    public ds: IDatastore
    readonly kind: string = 'Komposition';
    constructor() {
        var ds = q.promisifyAll(google({
            projectId: 'kompositr'
        }));
        this.ds = ds;
    }
}


export interface IModuleImport {
    (authOptions?: IAuthOptions): IGCloud;
}

export interface IAuthOptions {
    projectId?: string;
    keyFilename?: string;
}


export interface IGCloud {
    bigquery: (authOptions?: IAuthOptions) => any;
    datastore: datastore.IDatastore;
}


export module datastore {

    export interface IEntityInstrumentedData {
        name: string;
        value: string | number | boolean | IInt | IDouble | Date | any[];
        excludeFromIndexes?: boolean
    }

    export interface IEntity<TData> {
        key: IKey,
        ///** Optional method to explicity use for save. The choices include 'insert', 'update', 'upsert' and 'insert_auto_id'. */
        method?: string,
        /** Data to save with the provided key. If you provide an array of objects, you must use the explicit syntax: name for the name of the property and value for its value. You may also specify an excludeFromIndexes property, set to true or false. */
        data: TData | IEntityInstrumentedData[],
    }
    /** advanced features of IEntity, not sure how to use yet */
    export interface IEntityAdvanced<TData> extends IEntity<TData> {
        /** Optional method to explicity use for save. The choices include 'insert', 'update', 'upsert' and 'insert_auto_id'. */
        method?: string,
        ///** Data to save with the provided key. If you provide an array of objects, you must use the explicit syntax: name for the name of the property and value for its value. You may also specify an excludeFromIndexes property, set to true or false. */
        //data: TData | { name: string; value: string; excludeFromIndexes?: boolean }[],
    }

    export interface IDatastore {
        double(num: number): IDouble;
        int(num: number): IInt;
        dataset(options?: IDatasetOptions): IDataset;
        createQuery(key: string);
        createQuery(keys: string[]);
        key(kind: string): IKey;
        key(key: Object[]): IKey;
        runQueryAsync(q: IQuery)
        getAsync(key: IKey)
        saveAsync(entity: IEntity<Komposition>)
    }


    export interface IDatasetOptions extends IAuthOptions {
        /** Override the default API endpoint used to reach Datastore. This is useful for connecting to your local Datastore server (usually "http://localhost:8080"). */
        apiEndpoint?: string;
        /** Namespace to isolate transactions to. */
            namespace?: string;
    }

    /** functions that are shared between both the ITransaction and IDataset interfaces */
    export interface ICoreConnection {
        /**Generate IDs without creating entities.*/
        allocateIds(
            /** The key object to complete. */ incompleteKey: IKey,
            /** How many IDs to generate. */ n: number, callback: (err: any, keys: IKey[],
                                                                   /** The full API response. */ apiResponse: any) => void);

        /** Delete all entities identified with the specified key(s). */
        delete(key: IKey | IKey[], callback: (err: any, apiResponse: any) => void);


        /** Retrieve the entities identified with the specified key(s) in the current transaction. Get operations require a valid key to retrieve the key-identified entity from Datastore. */
        get<TEntityData>(key: IKey, callback: (err: any, entity: IEntity<TEntityData>) => void);
        get<TEntityData>(keys: IKey[], callback: (err: any, entities: IEntity<TEntityData>[]) => void);
        // get<TEntityData>(key: IKey): IStream<IEntity<TEntityData>>;


        /** Datastore allows you to query entities by kind, filter them by property filters, and sort them by a property name. Projection and pagination are also supported.

         If you provide a callback, the query is run, and the results are returned as the second argument to your callback. A third argument may also exist, which is a query object that uses the end cursor from the previous query as the starting cursor for the next query. You can pass that object back to this method to see if more results exist.

         You may also omit the callback to this function to trigger streaming mode. */
        runQuery<TEntityData>(q: IQuery, callback: (err: any, entities: IEntity<TEntityData>[], nextQuery: IQuery, apiResponse: any) => void);
        // runQuery<TEntityData>(q: IQuery): IStream<IEntity<TEntityData>>;

    }
    export interface IDataset extends ICoreConnection {

        /** Create a query from the current dataset to query the specified kind, scoped to the namespace provided at the initialization of the dataset. */
        createQuery(namespace: string, kind: string): IQuery;
        createQuery(kind: string): IQuery;



        /** Helper to create a Key object, scoped to the dataset's namespace by default.

         You may also specify a configuration object to define a namespace and path. */
        key(path?: string | string[]): IKey;
        key(options: {
            path?: string | string[];
            namespace?: string;
        }): IKey;
        /** Run a function in the context of a new transaction. Transactions allow you to perform multiple operations, committing your changes atomically. When you are finished making your changes within the transaction, run the done() function provided in the callback function to commit your changes. See an example below for more information. */
        runInTransaction(
            /** The function to run in the context of a transaction. */
            fn: (
                /** The Transaction. */
                transaction: ITransaction,
                /** Function used to commit changes. */
                done: () => void
            ) => void,
            callback: (err: any, apiResponse: any) => void
        );


        /** Maps to datastore/dataset#save, forcing the method to be insert. */
        insert: IDatasetSaveMethod;

        /** Insert or update the specified object(s). If a key is incomplete, its associated object is inserted and the original Key object is updated to contain the generated ID.

         This method will determine the correct Datastore method to execute (upsert, insert, update, and insertAutoId) by using the key(s) provided. For example, if you provide an incomplete key (one without an ID), the request will create a new entity and have its ID automatically assigned. If you provide a complete key, the entity will be updated with the data specified.

         By default, all properties are indexed. To prevent a property from being included in all indexes, you must supply an entity's data property as an array.*/
        save: IDatasetSaveMethod;

        /** Maps to datastore/dataset#save, forcing the method to be update.*/
        update: IDatasetSaveMethod;
        /** Maps to datastore/dataset#save, forcing the method to be upsert.*/
        upsert: IDatasetSaveMethod;

    }

    export interface IDatasetSaveMethod {
        <TEntityData>(entity: IEntity<TEntityData> | IEntity<TEntityData>[], callback: (err: any, apiResponse: any) => void);
    }
    export interface ITransactionSaveMethod {
        <TEntityData>(entity: IEntity<TEntityData> | IEntity<TEntityData>[]);
    }

    // export interface IStream<TData> extends NodeJS.ReadableStream {
    //     on(event: "error", callback: (err) => void);
    //     on(event: "data", callback: (data: TData) => void);
    //     on(event: "end", callback: () => void);
    //     on(event: string, callback: Function);
    // }

    export interface IDouble { }
    export interface IInt { }

    export interface IKey {
        /** 	The ID of the entity. Never equal to zero. Values less than zero are discouraged and will not be supported in the future.
         used for numerical identified entities.   either .id or .key can be set, not both.   */
        id: number;
        /** The name of the entity. A name matching regex "__.*__" is reserved/read-only. A name must not be more than 500 characters. Cannot be "".
         used for named entities.   either .id or .key can be set, not both.
         */
        name: string;
        /** The entity path. An entity path consists of one or more elements composed of a kind and a string or numerical identifier, which identify entities. The first element identifies a root entity, the second element identifies a child of the root entity, the third element a child of the second entity, and so forth. The entities identified by all prefixes of the path are called the element's ancestors. An entity path is always fully complete: ALL of the entity's ancestors are required to be in the path along with the entity identifier itself. The only exception is that in some documented cases, the identifier in the last path element (for the entity) itself may be omitted. A path can never be empty. */
        path: string[];
        /** The kind of the entity. A kind matching regex "__.*__" is reserved/read-only. A kind must not contain more than 500 characters. Cannot be "". */
        kind: string;

        parent: IKey;
    }

    export interface IQuery {
        /** Have pagination handled automatically. Default: true.   if true, and you run a query, a sub-query with more results will be returned

         Example

         // Retrieve a list of people related to person "1234",
         // disabling auto pagination
         var query = dataset.createQuery('Person')
         .hasAncestor(dataset.key(['Person', 1234]))
         .autoPaginate(false);

         var callback = function(err, entities, nextQuery, apiResponse) {
  if (nextQuery) {
    // More results might exist, so we'll manually fetch them
    dataset.runQuery(nextQuery, callback);
  }
};

         dataset.runQuery(query, callback);
         */
        autoPaginate(val: boolean): IQuery;
        /** Set an ending cursor to a query.

         Example

         var cursorToken = 'X';

         // Retrieve results limited to the extent of cursorToken.
         var endQuery = companyQuery.end(cursorToken);*/
        end(/** The ending cursor token. */custorToken: string): IQuery;
        /** Datastore allows querying on properties. Supported comparison operators are =, <, >, <=, and >=. "Not equal" and IN operators are currently not supported.

         To filter by ancestors, see datastore/query#hasAncestor.

         Example

         // List all companies named Google that have less than 400 employees.
         var companyQuery = query
         .filter('name =', 'Google')
         .filter('size <', 400);

         // To filter by key, use `__key__` for the property name. Filter on keys
         // stored as properties is not currently supported.
         var keyQuery = query.filter('__key__ =', dataset.key(['Company', 'Google']));
         */
        filter(/** Property + Operator (=, <, >, <=, >=).*/ filter: string, /** 	Value to compare property to.*/value: any): IQuery;

        /** Group query results by a list of properties.
         Example

         var groupedQuery = companyQuery.groupBy(['name', 'size']);*/
        groupBy(/** Properties to group by.*/
                properties: string[]): IQuery;
        /** Filter a query by ancestors.
         Example

         var ancestoryQuery = query.hasAncestor(dataset.key(['Parent', 123]));*/
        hasAncestor(/** Key object to filter by.*/key: IKey): IQuery;
        /**Set a limit on a query.
         Example

         // Limit the results to 10 entities.
         var limitQuery = companyQuery.limit(10);*/
        limit(/** The number of results to limit the query to.*/
              n: number): IQuery;
        /** Set an offset on a query.
         Example

         // Start from the 101st result.
         var offsetQuery = companyQuery.offset(100);*/
        offset(/**The offset to start from after the start cursor.*/n: number): IQuery;
        /** Sort the results by a property name in ascending or descending order. By default, an ascending sort order will be used.
         Example

         // Sort by size ascendingly.
         var companiesAscending = companyQuery.order('size');

         // Sort by size descendingly.
         var companiesDescending = companyQuery.order('-size');*/
        order(/**Optional operator (+, -) and property to order by.*/property: string): IQuery;
        /**Retrieve only select properties from the matched entities.

         Queries that select a subset of properties are called Projection Queries.
         Example

         // Only retrieve the name property.
         var selectQuery = companyQuery.select('name');

         // Only retrieve the name and size properties.
         var selectQuery = companyQuery.select(['name', 'size']);*/
        select(/**Properties to return from the matched entities.*/fieldNames: string | string[]): IQuery;
        /**Set a starting cursor to a query.
         Example

         var cursorToken = 'X';

         // Retrieve results starting from cursorToken.
         var startQuery = companyQuery.start(cursorToken);*/
        start(/**The starting cursor token.*/cursorToken: string): IQuery;

    }


    /** Build a Transaction object. Transactions will be created for you by datastore/dataset. When you need to run a transactional operation, use datastore/dataset#runInTransaction. */
    export interface ITransaction extends ICoreConnection {
        /** Reverse a transaction remotely and finalize the current transaction instance. */
        rollback(callback: (err: any, apiResponse: any) => void);



        /** Maps to datastore/dataset#save, forcing the method to be insert. */
        insert: ITransactionSaveMethod;

        /** Insert or update the specified object(s). If a key is incomplete, its associated object is inserted and the original Key object is updated to contain the generated ID.

         This method will determine the correct Datastore method to execute (upsert, insert, update, and insertAutoId) by using the key(s) provided. For example, if you provide an incomplete key (one without an ID), the request will create a new entity and have its ID automatically assigned. If you provide a complete key, the entity will be updated with the data specified.

         By default, all properties are indexed. To prevent a property from being included in all indexes, you must supply an entity's data property as an array.*/
        save: ITransactionSaveMethod;

        /** Maps to datastore/dataset#save, forcing the method to be update.*/
        update: ITransactionSaveMethod;
        /** Maps to datastore/dataset#save, forcing the method to be upsert.*/
        upsert: ITransactionSaveMethod;
    }
}


//
// /**
//  *  definitions for v0.27.0
//  docs here: https://googlecloudplatform.github.io/gcloud-node/#/docs/v0.27.0/datastore/dataset
//  */
// export var gcloud: IModuleImport = require("gcloud");