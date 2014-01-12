// Load modules

var Hapi = require('hapi');


// Declare internals

var internals = {};


// Home page

exports.create = function (request) {
  return request.reply.view('create');
};

exports.draw = function (request) {
  return request.reply.view('draw');
};

