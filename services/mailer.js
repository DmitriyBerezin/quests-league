var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport'),
	stubTransport = require('nodemailer-stub-transport'),

	config = require('../config/config.js'),

	transporter;


if (process.env.NODE_ENV === 'test') {
	transporter = nodemailer.createTransport(stubTransport());
}
else {
	transporter = nodemailer.createTransport(smtpTransport(config.mail.smtp));
}


function sendMail(options, cb) {
	options.from = options.from || 'ivan.questoff@yandex.ru';
	transporter.sendMail(options, cb);
}

function sendMail2Admins(options, cb) {
	options.to = config.mail.groups.admins.join(';');
	sendMail(options, cb);
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
	sendMail2Admins: sendMail2Admins,
	sendErrorLogMail: sendErrorLogMail
};