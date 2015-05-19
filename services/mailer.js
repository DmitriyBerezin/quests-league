var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport'),
	config = require('../config/config.js');

	transporter = nodemailer.createTransport(smtpTransport(config.mail.smtp));

function sendMail(cb) {
	var mailOptions = {
		from: 'ivan.questoff@yandex.ru',
		to: 'ivan.questoff@yandex.ru',
		subject: 'hello',
		text: 'hello world!'
	};

	transporter.sendMail(mailOptions, cb);
}

module.exports = {
	sendMail: sendMail
};