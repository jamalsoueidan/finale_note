var Hapi = require('hapi');
var Fs = require('fs');

exports.list = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id)
    mongoDb.query.findAll("contacts", {user_id: user_id}, function(objects) {
      return reply({contacts: objects})
    });
  }
}

exports.destroy = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.destroy('contacts', {_id: id});
    return reply()
  }
}

exports.update = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    var contact = request.payload.contact
    mongoDb.query.update('contacts', {_id: id}, contact);
    contact._id = request.params.id // remember to give back the same _id

    return reply({contact: contact})
  }
}

exports.create = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var contact = request.payload.contact
    contact.user_id = mongoDb.ObjectID(request.auth.credentials.id);
    mongoDb.query.insert('contacts', contact, function(doc) {
      return reply({contact: doc})
    })
  }
}

exports.get = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id);
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.findOne("contacts", {_id: id, user_id: user_id}, function(object) {
      return reply({contact: object});
    });
  }
}
