// Product Configuration

exports.product = {
    name: 'FinaleNote'
};


// Server Configuration

exports.server = {
    web: {
        host: '192.168.1.38',
        port: 8080
    },
    api: {
        host: '192.168.1.38',
        port: 8081
    }
};

exports.server.web.uri = (exports.server.web.tls ? 'https://' : 'http://') + exports.server.web.host + ':' + exports.server.web.port;
exports.server.api.uri = (exports.server.api.tls ? 'https://' : 'http://') + exports.server.api.host + ':' + exports.server.api.port;


// Database Configuration

exports.database = {
    host: '127.0.0.1',
    port: 27017,
    db: 'postmile'
};


// Email Configuration

exports.email = 
exports.email = {
    fromName: 'Slutseddle',
    replyTo: 'no-reply@gmail.com',
    server: {
        user:    "hw2002@gmail.com", 
        password:"nice2709", 
        host:    "smtp.gmail.com", 
        ssl:     true
    }
};

