var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var internals = {
  db: null,
  insert: function(collection, data, callback) {
    internals.db.collection(collection).insert(data, {w:1}, function(err, objects) {
      if (err) console.warn(err.message);
      if (err && err.message.indexOf('E11000 ') !== -1) {
        
      }

      if ( typeof(callback) == "function" ) {
        callback(objects)
      }
    });
  },
  exists: function(collection, query, callback) {
    internals.db.collection(collection).findOne(query, function(err, doc) {
      callback(doc !== null)
    });
  },
  findOne: function(collection, query, callback) {
    console.log(collection, query)
    internals.db.collection(collection).findOne(query, function(err, doc) {
      callback(doc);
    });
  },
  findAll: function(collection, query, callback) {
    console.log(collection, query)
    internals.db.collection(collection).find(query).toArray(function(err, docs) {
      callback(docs)
    })
  },
  update: function(collection, query, update) {
    console.log(collection, query)
    internals.db.collection(collection).update(query, {$set: update}, function(err, docs) {

    })
  },
  destroy: function(collection, query, options) {
    console.log(collection, query)
    internals.db.collection(collection).remove(query, options, function(err, results) {
      
    })
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
