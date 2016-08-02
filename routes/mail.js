var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://systennisltda%40gmail.com:systennis123@smtp.gmail.com');

// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <pedrostrabeli@gmail.com>', // sender address
//     to: 'pedrostrabeli@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };

// send mail with defined transport object
router.post('/', function(req, res) {
	transporter.sendMail(req.body.mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    //transporter.close();
	});
});


module.exports = router;