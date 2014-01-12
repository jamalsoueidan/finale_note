var Config = require('../config')
var Email = require('emailjs/email')

exports.email = Email.server.connect(Config.email.server);

/*email.send({
   text:    "i hope this works", 
   from:    "hw2002@gmail.com", 
   to:      "someone <jamal@soueidan.com>",
   cc:      "else <else@soueidan.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });
*/
