// Load modules

var Note = require('./note');
var Account = require('./account');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
  { method: 'POST', path: '/note/upload', config: Note.upload },
  { method: 'GET', path: '/', config: Account.home },
  { method: 'POST', path: '/account/login', config: Account.login },
  { method: 'POST', path: '/account/signup', config: Account.signup },
  { method: 'GET', path: '/account/logout', config: Account.logout }
];



