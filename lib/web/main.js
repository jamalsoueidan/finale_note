// Load modules

var Hapi = require('hapi');


// Declare internals

var internals = {};


// Home page

exports.home = function (request) {
  return request.reply.view('home');
};
