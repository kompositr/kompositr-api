var ds = require('./data_access').ds;
var q = require('bluebird');


const kind = 'Komposition';

function list (limit, token) {
    const q = ds.createQuery([kind])
        .limit(limit)
        .order('name')
        .start(token);

    return ds.runQueryAsync(q)
        .then((err, entities) => {
            if (err) throw err;
            return entities.map(fromDatastore);
        });
}

function update (id, data) {
    let key;
    if (id)
        key = ds.key([kind, parseInt(id, 10)]);
    else
        key = ds.key(kind);

    const entity = {
        key: key,
        data: toDatastore(data)
    };

    return ds.saveAsync(entity)
        .then((err) => {
            if (err) throw err;
            data.id = entity.key.id;
            return data;
        })
}

function create (data) {
    return update(null, data);
}

function read (id) {
    const key = ds.key([kind, parseInt(id, 10)]);
    return ds.getAsync(key)
        .then((err, entity) => {
            if (err) throw err;
            return fromDatastore(entity);
        });
}

function readByName (name) {
    let query = ds.createQuery('Komposition');
    query.filter('name', name);

    return ds.runQueryAsync(query)
        .then(function(err, entities) {
            if (err) throw err;
            return fromDatastore(entities);
        });
}

function _delete (id) {
    const key = ds.key([kind, parseInt(id, 10)]);
    return ds.deleteAsync(key);
}

function fromDatastore (obj) {
    obj.data.id = obj.key.id;
    return obj.data;
}

function toDatastore (obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            return;
        }
        results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1
        });
    });
    return results;
}

module.exports = {
    create,
    read,
    readByName,
    update,
    delete: _delete,
    list
};
