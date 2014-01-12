var Hapi = require('hapi');
var Config = require('../config').server
var Routes = require('./routes');

var server = Hapi.createServer(Config.api.host, Config.api.port, { cors: true });

server.route(Routes.endpoints);

server.start();

console.log("API server running at " + Config.api.uri);
