var Hapi = require('hapi');
var md5 = require('MD5')
//https://github.com/spumko/hapi-auth-cookie

var internals = {
  encryptPassword: function(password) {
    return md5(password)
  }
};

exports.home = {
  auth: true,
  handler: function (request, reply) {
    reply(request.auth.credentials);
  }
};

// curl --data "username=jamal&password=jamal" http://127.0.0.1:8081/account/login
exports.login = {
  auth: { 
    mode: 'try'
  },
  handler: function (request, reply) {
    if (request.auth.isAuthenticated) {
      return reply().redirect('/');
    }

    query = request.server.plugins['mongodb'].query
    query.findOne('users', {username: request.payload.username, password: internals.encryptPassword(request.payload.password)}, function(doc) {
      if (doc ===null) {
        return reply({message: "Wrong username or password"})
      } else {
        request.auth.session.set(doc);
        return reply(doc)
      }
    });
  }
};

exports.signup = {
  handler: function(request, reply) {
    params = request.query || request.payload
    query = request.server.plugins['mongodb'].query
    query.exists('users', {username: params.username}, function(exists) {
      if ( !exists ) {
        params['password'] = internals.encryptPassword(params['password']);
        query.insert('users', params);
        return reply(params)
      } else {
        return reply({message: 'User exists'})
      }
    });
  }
}

exports.logout = {
  auth: true,
  handler: function(request, reply) {
    request.auth.session.clear();
    return reply().redirect('/');
  }
};
