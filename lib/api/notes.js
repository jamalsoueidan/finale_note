var Hapi = require('hapi');
var Fs = require('fs');
var PDFDocument = require('pdfkit')
var _ = require("lodash")

var internals = {
  saveSign: function(image_base64) {
    image_base64 = image_base64.replace("data:image/png;base64,", "");
    filepath = './lib/web/public/assets/images/uploads/sign.png';
    Fs.writeFile(filepath, new Buffer(image_base64, 'base64'));
  },
  createPDF: function(options, callback) {
    doc = new PDFDocument({size: 'C2'})
      
    doc.image('./lib/api/assets/images/fdm/page1.jpg', 0, 0)

    doc.fontSize(20)
    doc.text(options.seller.name, 120, 300)
    doc.text(options.seller.address, 120, 360)
    doc.text(options.seller.postcode, 120, 420) 
    doc.text(options.seller.city, 180, 420)
    doc.text(options.seller.phone, 410, 420)

    doc.text(options.buyer.name, 650, 300)
    doc.text(options.buyer.address, 650, 360)
    doc.text(options.buyer.postcode, 650, 420) 
    doc.text(options.buyer.city, 710, 420)
    doc.text(options.buyer.phone, 943, 420)

    doc.output(callback);
  },
  validate: function(params, validate, callback) {
  },

  sendPDF: function(options) {
  }
};

exports.download = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id);
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.findOne("notes", {_id: id, user_id: user_id}, function(object) {
      var note = object;
      var seller_id = mongoDb.ObjectID(object.seller_id);
      var buyer_id = mongoDb.ObjectID(object.buyer_id);
      mongoDb.query.findAll("contacts", {user_id: user_id, $or: [{_id: seller_id}, {_id: buyer_id}]}, function(objects) {
        var seller = objects[0];
        var buyer = objects[1];

        internals.createPDF({note: note, seller: seller, buyer: buyer}, function(buffer) {
          var path = "./lib/web/public/assets/pdf/" + note._id + ".pdf";
          Fs.writeFile(path, buffer, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
            return reply({url: '/assets/pdf/' + note._id + ".pdf"});
          }); 
        });
      });  
    });
  }
}

exports.sendMail = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id);
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.findOne("notes", {_id: id, user_id: user_id}, function(object) {
      var note = object;
      var seller_id = mongoDb.ObjectID(object.seller_id);
      var buyer_id = mongoDb.ObjectID(object.buyer_id);
      mongoDb.query.findAll("contacts", {user_id: user_id, $or: [{_id: seller_id}, {_id: buyer_id}]}, function(objects) {
        var seller = objects[0];
        var buyer = objects[1];

        internals.createPDF({note: note, seller: seller, buyer: buyer}, function(buffer) {
          var to = seller.name + "<" + seller.email + ">, " + buyer.name + "<" + buyer.email + ">"
          var subject = "Slutseddel"
          var text = "Her er slutseddel"

          email = request.server.plugins['email'].email
          email.send({ text: text,  to: to, subject: subject, attachment: [{data: buffer, type:"application/pdf", name: "slutseddel.pdf"}]})
          return reply("Sendt mail");
        });
      });  
    });
  }
}

exports.update = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    var resource = request.payload.note
    mongoDb.query.update('notes', {_id: id}, resource);
    resource._id = request.params.id // remember to give back the same _id

    return reply({note: resource})
  }
}

exports.destroy = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.destroy('notes', {_id: id});
    return reply()
  }
}

exports.create = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var note = request.payload.note
    note.user_id = mongoDb.ObjectID(request.auth.credentials.id);
    mongoDb.query.insert('notes', note, function(doc) {
      return reply({note: doc})
    })
  }
}

exports.get = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id);
    var id = mongoDb.ObjectID(request.params.id)
    mongoDb.query.findOne("notes", {_id: id, user_id: user_id}, function(object) {
      return reply({note: object});
    });
  }
}

exports.list = {
  auth: true,
  handler: function(request, reply) {
    var mongoDb = request.server.plugins['mongodb']
    var user_id = mongoDb.ObjectID(request.auth.credentials.id)
    mongoDb.query.findAll("notes", {user_id: user_id}, function(objects) {
      return reply({notes: objects})
    });
  }
}
