var Hapi = require('hapi');
var Fs = require('fs');
var PDFDocument = require('pdfkit')

var internals = {
  saveSign: function(image_base64) {
    image_base64 = image_base64.replace("data:image/png;base64,", "");
    filepath = './lib/web/public/assets/images/uploads/sign.png';
    Fs.writeFile(filepath, new Buffer(image_base64, 'base64'));
  },
  createPDF: function(callback) {
    doc = new PDFDocument

    doc.addPage()
       .fontSize(25)
       .text('Here is some vector graphics...', 100, 100)
     
    doc.save()
       .moveTo(100, 150)
       .lineTo(100, 250)
       .lineTo(200, 250)
       .fill("#FF3300")
     
    doc.output(callback);
  }
};

//curl -X POST -H "Content-Type: application/json" -d '{}' -i http://localhost:8081/note/upload
exports.upload = {
  handler: function (request, reply) {
    //image_base64 = request.payload['seller[sign_image]'];
    //internals.saveSign(image_base64)
    internals.createPDF(function(buffer) {
      email = request.server.plugins['email'].email
      email.send({ text: "i hope this works",  to: "jamalsoueidan <jamal@soueidan.com>", subject: "testing emailjs" })
    })
    
    reply({ greeting: 'hello world' });
  }
};
