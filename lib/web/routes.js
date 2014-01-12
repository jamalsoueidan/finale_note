// Load modules

var Note = require('./note');
var Main = require('./main');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
    { method: 'GET', path: '/create', handler: Note.create },
    { method: 'GET', path: '/draw', handler: Note.draw },
    { method: 'GET', path: '/', handler: Main.home }
];



