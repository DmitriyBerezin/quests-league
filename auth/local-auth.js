var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	util = require('util'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt'),
	path = require('path'),

	db = require('../services/database'),
	mailer = require('../services/mailer'),
	authUtils = require('./utils'),
	utils = require('../services/utils');


passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		function callback(res) {
			if (res) {
				return done(null, row);
			}

			return done(null, false, { message: 'Учетной записи с такими параметрами не существует' });
		}

		function errback(err) {
			return done(err);
		}


		var query = util.format('call quests.pUserGet("%s")', email),
			row;

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			if (!rows[0].length) {
				return done(err, false, { message: 'Учетной записи с такими параметрами не существует' });
			}

			row = rows[0][0];
			checkPassword(password, row.password, callback, errback)
		});
	}
));

function signUp(req, res, next) {
	function callback(hash) {
		var query = util.format('call quests.pUserCreate("%s", "%s", "%s")',
				req.body.name, req.body.email, hash),
			mailOptions;

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return next(err);
			}

			req.login(rows[0][0], function(err) {
				if (err) {
					return next(err);
				}

				return next();
			});
			console.log(req.user);
		});
	}

	function errback(err) {
		return next(err);
	}

	hashPassword(req.body.password, callback, errback);
}

function sendVerificationMail(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}

	crypto.randomBytes(48, function(err, buf) {
		if (err) {
			return next(err);
		}

		var token = buf.toString('hex'),
			id = req.user.id,
			email = req.user.email,
			name = req.user.name,
			query = util.format('call quests.pUserSetVerificationToken(%d, "%s")',
				id, token);

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return next(err);
			}

			var mailOptions,
				tmplFile = path.join(__dirname, '../views/mail/verify-account.jade'),
				data = {
					userName: name,
					protocol: req.protocol,
					baseUrl: req.baseUrl,
					token: token,
					id: id
				};

			utils.tmpl2Str(tmplFile, data, function(err, html) {
				if (err) {
					return next(err);
				}

				mailOptions = {
					to: email,
					subject: 'Подтверждение аккаунта на попртале Лига Квестов',
					html: html
				};

				mailer.sendMail(mailOptions, function(err, info) {
					if (err) {
						return next(err);
					}

					return next();
				});
			})
		});
	});
}

function verifyStart(req, res, next) {
	return sendVerificationMail(req, res, next);
}

function verifyEnd(req, res, next) {
	var id = req.query.id,
		token = req.query.token,
		query = util.format('call quests.pUserVerify(%d, "%s")', id, token);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return next(err);
		}

		if (rows[0].length === 1) {
			req.login(rows[0][0], function(err) {
				if (err) {
					return next(err);
				}

				res.render('auth/verification-complete');
			});
		}
		else {
			var msg = 'Аккаунт не подтвержден, так как переданы не правильные данные. ' +
					'Пожалуйста, попробуйте еще раз или обратитесь в поддержку.',
				err = new Error(msg);
			err.status = 400;
			console.log(err);
			next(err);
		}
	});
}

function hashPassword(psw, cb, eb) {
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return eb(err);
		}

		bcrypt.hash(psw, salt, function(err, hash) {
			if (err) {
				return eb(err);
			}

			return cb(hash);
		});
	});
}

function checkPassword(psw, hash, cb, eb) {
	bcrypt.compare(psw, hash, function(err, res) {
		if (err) {
			return eb(err);
		}

		return cb(res);
	});
}


module.exports = {
	signUp: signUp,
	sendVerificationMail: sendVerificationMail,
	verifyStart: verifyStart,
	verifyEnd: verifyEnd
};