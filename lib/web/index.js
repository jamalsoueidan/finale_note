var Hapi = require('hapi');
var Config = require('../config').server.web
var Routes = require('./routes');

var server = Hapi.createServer(Config.host, Config.port);

server.views({
    path: __dirname + '/views',
    engines: {
        jade: 'jade'
    },
    compileOptions: {
        colons: true,
        pretty: true
    }
});

server.route(Routes.endpoints);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path:  __dirname + '/public', listing: false, index: true }
    }
});

server.start();

console.log("Web server running at " + Config.uri);
