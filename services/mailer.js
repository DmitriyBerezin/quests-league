var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport'),
	config = require('../config/config.js');

	transporter = nodemailer.createTransport(smtpTransport(config.mail.smtp));

function sendMail(options, cb) {
	options.from = options.from || 'ivan.questoff@yandex.ru';
	transporter.sendMail(options, cb);
}

function sendErrorLogMail(err, cb) {
	var options = {
		from: 'ivan.questoff@yandex.ru',
		to: 'ivan.questoff@yandex.ru',
		subject: err.message,
		text: err
	};

	cb = cb || function() {};

	transporter.sendMail(options, cb);
}

module.exports = {
	sendMail: sendMail,
	sendErrorLogMail: sendErrorLogMail
};