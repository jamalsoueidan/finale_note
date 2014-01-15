// Load modules

var Note = require('./note');
var Account = require('./account');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
  { method: ['POST', 'GET'], path: '/note/upload', config: Note.upload },
  { method: ['POST', 'GET'], path: '/note/list', config: Note.list },
  { method: ['POST', 'GET'], path: '/note/{id}/download', config: Note.download },
  { method: ['POST', 'GET'], path: '/note/{id}', config: Note.read },
  { method: 'POST', path: '/account/login', config: Account.login },
  { method: 'POST', path: '/account/signup', config: Account.signup },
  { method: 'GET', path: '/account/logout', config: Account.logout }
];



