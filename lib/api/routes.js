// Load modules

var Note = require('./note');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
    { method: 'POST', path: '/upload', config: Note.upload },
    { method: 'GET', path: '/generate_pdf', config: Note.generate_pdf }
];



