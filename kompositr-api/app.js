'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var hapi = require("hapi");
var inert = require("inert");
var server = new hapi.Server();
server.connection({ port: 8080 });
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, worldzz!');
    }
});
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("Server running at: " + server.info.uri);
});
server.register(inert, function (err) {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});
