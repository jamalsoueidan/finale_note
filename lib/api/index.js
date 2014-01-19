var Hapi = require('hapi');
var Config = require('../config')
var Routes = require('./routes');
var Mongodb = require('./plugins/hapi-mongodb')
var Email = require('./plugins/hapi-email')

var server = Hapi.createServer(Config.server.api.host, Config.server.api.port, { cors: { origin: ['http://localhost:8080'], credentials: true} });

server.pack.require('hapi-auth-cookie', function (err) {

    server.auth.strategy('session', 'cookie', {
        password: '6d5d57f868g979gibuibbibiybiyiyigy97',
        cookie: 'login_session',
        redirectTo: '/account/login',
        isSecure: false
    });

    if (err) {
        console.error(err);
        throw err;
    }
});

server.pack.register(Mongodb, Config.database, function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
});

server.pack.register(Email, Config.database, function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
});

server.route(Routes.endpoints);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './lib/web/public', listing: false, index: true }
    }
});

server.start();

console.log("API server running at " + Config.server.api.uri);
