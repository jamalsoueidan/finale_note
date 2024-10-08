// Load modules

var Note = require('./notes');
var Car = require('./car');
var Contact = require('./contacts');
var Account = require('./account');

// Declare internals

var internals = {};


// API Server Endpoints

exports.endpoints = [
  { method: 'DELETE', path: '/api/cars/{id}', config: Car.destroy },
  { method: 'PUT', path: '/api/cars/{id}', config: Car.update },
  { method: 'GET', path: '/api/cars/{id}', config: Car.get },
  { method: 'POST', path: '/api/cars', config: Car.create },
  { method: 'GET', path: '/api/cars', config: Car.list },

  { method: 'DELETE', path: '/api/contacts/{id}', config: Contact.destroy },
  { method: 'PUT', path: '/api/contacts/{id}', config: Contact.update },
  { method: 'GET', path: '/api/contacts/{id}', config: Contact.get },
  { method: 'POST', path: '/api/contacts', config: Contact.create },
  { method: 'GET', path: '/api/contacts', config: Contact.list },

  { method: 'POST', path: '/api/note/{id}/download', config: Note.download },
  { method: 'POST', path: '/api/note/{id}/sendMail', config: Note.sendMail },
  { method: 'DELETE', path: '/api/notes/{id}', config: Note.destroy },
  { method: 'PUT', path: '/api/notes/{id}', config: Note.update },
  { method: 'GET', path: '/api/notes/{id}', config: Note.get },
  { method: 'POST', path: '/api/notes', config: Note.create },
  { method: 'GET', path: '/api/notes', config: Note.list },
  
  { method: 'POST', path: '/api/account/login', config: Account.login },
  { method: 'POST', path: '/api/account/signup', config: Account.signup },
  { method: 'GET', path: '/api/account/logout', config: Account.logout },
];



