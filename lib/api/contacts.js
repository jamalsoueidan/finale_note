var Hapi = require('hapi');
var Fs = require('fs');

exports.list = {
  auth: true,
  handler: function(request, reply) {
    var ObjectID = request.server.plugins['mongodb'].ObjectID
    var user_id = ObjectID(request.auth.credentials.id)
    query = request.server.plugins['mongodb'].query
    query.findAll("contacts", {user_id: user_id}, function(objects) {
      return reply({contacts: objects})
    });
  }
}

exports.destroy = {
  auth: true,
  handler: function(request, reply) {
    var ObjectID = request.server.plugins['mongodb'].ObjectID
    var query = request.server.plugins['mongodb'].query

    var id = ObjectID(request.params.id)
    query.destroy('contacts', {_id: id});
    return reply()
  }
}

exports.update = {
  auth: true,
  handler: function(request, reply) {
    var ObjectID = request.server.plugins['mongodb'].ObjectID
    var query = request.server.plugins['mongodb'].query

    var id = ObjectID(request.params.id)
    var contact = request.payload.contact
    query.update('contacts', {_id: id}, contact);
    contact._id = request.params.id // remember to give back the same _id

    return reply({contact: contact})
  }
}

exports.create = {
  auth: true,
  handler: function(request, reply) {
    
    var ObjectID = request.server.plugins['mongodb'].ObjectID
    var query = request.server.plugins['mongodb'].query
    var contact = request.payload.contact
    contact.user_id = ObjectID(request.auth.credentials.id);
    query.insert('contacts', contact, function(doc) {
      return reply({contact: doc})
    })
  }
}

exports.get = {
  auth: true,
  handler: function(request, reply) {
    var user_id = request.auth.credentials.id;
    var id = request.params.id
    ObjectID = request.server.plugins['mongodb'].ObjectID
    query = request.server.plugins['mongodb'].query
    query.findOne("contacts", {_id: ObjectID(id), user_id: ObjectID(user_id)}, function(object) {
      return reply({contact: object});
    });
  }
}
