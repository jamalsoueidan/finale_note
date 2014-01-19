// Load modules

var Note = require('./notes');
var Contact = require('./contacts');
var Account = require('./account');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
  { method: 'DELETE', path: '/api/contacts/{id}', config: Contact.destroy },
  { method: 'PUT', path: '/api/contacts/{id}', config: Contact.update },
  { method: 'GET', path: '/api/contacts/{id}', config: Contact.get },
  { method: 'POST', path: '/api/contacts', config: Contact.create },
  { method: 'GET', path: '/api/contacts', config: Contact.list },

  { method: ['POST', 'GET'], path: '/api/note/upload', config: Note.upload },
  { method: 'GET', path: '/api/notes', config: Note.list },
  { method: ['POST', 'GET'], path: '/api/note/{id}/download', config: Note.download },
  { method: ['POST', 'GET'], path: '/api/note/{id}', config: Note.read },
  { method: 'POST', path: '/api/account/login', config: Account.login },
  { method: 'POST', path: '/api/account/signup', config: Account.signup },
  { method: 'GET', path: '/api/account/logout', config: Account.logout },
];



