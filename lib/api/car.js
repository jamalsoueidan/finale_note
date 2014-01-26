var Hapi = require('hapi');
var Fs = require('fs');

exports.list = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id)
    mongoDb.query.findAll("cars", {user_id: user_id}, function(objects) {
      return reply({cars: objects})
    });
  }
}

exports.destroy = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.destroy('cars', {_id: id});
    return reply()
  }
}

exports.update = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    var car = request.payload.car
    mongoDb.query.update('cars', {_id: id}, car);
    car._id = request.params.id // remember to give back the same _id

    return reply({car: car})
  }
}

exports.create = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var car = request.payload.car
    car.user_id = mongoDb.ObjectID(request.auth.credentials.id);
    mongoDb.query.insert('cars', car, function(doc) {
      return reply({car: doc})
    })
  }
}

exports.get = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id);
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.findOne("cars", {_id: id, user_id: user_id}, function(object) {
      return reply({car: object});
    });
  }
}
