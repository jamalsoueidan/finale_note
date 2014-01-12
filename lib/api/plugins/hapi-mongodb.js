var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var internals = {
  db: null,
  insert: function(collection, data) {
    internals.db.collection(collection).insert(data, {w:1}, function(err, objects) {
      if (err) console.warn(err.message);
      if (err && err.message.indexOf('E11000 ') !== -1) {
        // this _id was already inserted in the database
      }
    });
  },
  exists: function(collection, query, callback) {
    internals.db.collection(collection).findOne(query, function(err, doc) {
      callback(doc !== null)
    });
  },
  findOne: function(collection, query, callback) {
    internals.db.collection(collection).findOne(query, function(err, doc) {
      callback(doc);
    });
  }
}

exports = module.exports = {
  name: 'mongodb',
  version: '1.0.0',
  register: function (plugin, options, next) {
    MongoClient.connect("mongodb://" + options.host + ":" + options.port + "/" + options.db, options.settings || {}, function (err, db) {
      if (err) return next(err);
      internals.db = db
      plugin.expose('query', internals)
      plugin.expose('db', db);
      plugin.expose('lib', mongodb);
      plugin.expose('ObjectID', ObjectID);
      next();
    });
  }
};
