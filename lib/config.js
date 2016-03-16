// Product Configuration

exports.product = {
    name: 'FinaleNote'
};


// Server Configuration

exports.server = {
    web: {
        host: '127.0.0.1',
        port: 8080
    },
    api: {
        host: '127.0.0.1',
        port: 8081
    }
};

exports.server.web.uri = (exports.server.web.tls ? 'https://' : 'http://') + exports.server.web.host + ':' + exports.server.web.port;
exports.server.api.uri = (exports.server.api.tls ? 'https://' : 'http://') + exports.server.api.host + ':' + exports.server.api.port;


// Database Configuration

exports.database = {
    host: '127.0.0.1',
    port: 27017,
    db: 'finale_note'
};


// Email Configuration

exports.email = {
    from: 'hw2002 <hw2002@gmail.com>',
    server: {
        user:    "hw2002@gmail.com", 
        password:"", 
        host:    "smtp.gmail.com", 
        ssl:     true
    }
};

