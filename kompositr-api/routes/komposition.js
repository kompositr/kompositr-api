(function(){
    module.exports = [{
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            var query = datastore.createQuery('Komposition');
            query.filter('command', request.params.name);

            datastore.runQuery(query, function(err, entities) {
                if (err)
                    console.log(err);
                console.log(JSON.stringify(entities));
                reply(entities);
            });
        }
    }]
}());