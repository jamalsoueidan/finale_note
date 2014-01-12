var Config = require('../../config')
var Email = require('emailjs/email')

var internals = {
  email: null,
  send: function(options) {
    options['from'] = Config.email.from;
    internals.email.send(options, function(err, message) { 
      console.log(err || message); 
    });
  }
}

exports = module.exports = {
  name: 'email',
  version: '1.0.0',
  register: function (plugin, options, next) {
    internals.email = Email.server.connect(Config.email.server);
    plugin.expose('email', internals)
    next();
  }
};
