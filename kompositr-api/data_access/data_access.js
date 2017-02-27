var q = require('bluebird');
var Datastore = require('@google-cloud/datastore');

(function() {
    var ds = q.promisifyAll(Datastore({
        projectId: 'kompositr'
    }));

    module.exports = {
        datastore: ds
    }
}());

