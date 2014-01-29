var Hapi = require('hapi');
var md5 = require('MD5')
//https://github.com/spumko/hapi-auth-cookie

var internals = {
  encryptPassword: function(password) {
    return md5(password)
  }
};

// curl --data "email=jamal&password=jamal" http://127.0.0.1:8081/account/login
exports.login = {
  validate: { 
    payload: { 
      email: Hapi.types.String().email(),
      password: Hapi.types.String().required(),
    }
  },
  handler: function (request, reply) {
    console.log(request.payload)
    query = request.server.plugins['mongodb'].query
    query.findOne('users', {email: request.payload.email, password: internals.encryptPassword(request.payload.password)}, function(doc) {
      if (doc ===null) {
        return reply(Hapi.error.notFound("Wrong email or password"));
      } else {
        request.auth.session.set({id: doc._id});
        return reply();
      }
    });
  }
};

// curl --data "email=king&password=king" http://127.0.0.1:8081/account/signup
exports.signup = {
  validate: { 
    payload: { 
      email: Hapi.types.String().email(),
      password: Hapi.types.String().required().min(6)
    }
  },
  handler: function(request, reply) {
    params = request.payload
    query = request.server.plugins['mongodb'].query
    query.exists('users', {email: params.email}, function(exists) {
      if ( !exists ) {
        params['password'] = internals.encryptPassword(params['password']);
        query.insert('users', params, function(doc) {
          request.auth.session.set({id: doc._id});
          return reply();
        });
      } else {
        return reply(Hapi.error.badRequest('Email with this email exists already'));
      }
    });
  }
}

exports.logout = {
  handler: function(request, reply) {
    request.auth.session.clear();
    return reply().redirect('/');
  }
};
