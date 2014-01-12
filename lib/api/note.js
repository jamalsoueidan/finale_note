// Load modules

var Hapi = require('hapi');
var Fs = require('fs');
var PDFDocument = require('pdfkit')

// Declare internals

var internals = {};


// Home page
exports.upload = {
  handler: function (request) {
    //http://stackoverflow.com/questions/5867534/how-to-save-canvas-data-to-file
    img = request.payload['seller[sign_image]'];
    img = img.replace("data:image/png;base64,", "");
    Fs.writeFile('test.png', new Buffer(img, 'base64'));
    request.reply({ greeting: 'hello world' });
  }
};

exports.generate_pdf = {
  handler: function (request) {
    doc = new PDFDocument

    doc.addPage()
       .fontSize(25)
       .text('Here is some vector graphics...', 100, 100)
     
    doc.save()
       .moveTo(100, 150)
       .lineTo(100, 250)
       .lineTo(200, 250)
       .fill("#FF3300")
     
    doc.output(function(o) {
      request.reply(o);
    });
  }
};
