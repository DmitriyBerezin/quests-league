var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	util = require('util'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt'),
	path = require('path'),
	async = require('async'),

	db = require('./database'),
	mailer = require('./mailer'),
	utils = require('./utils');


passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		function callback(err, res) {
			if (err) {
				return done(err);
			}

			if (res) {
				return done(null, row);
			}

			return done(null, false, { message: 'Учетной записи с такими параметрами не существует' });
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
			checkPassword(password, row.password, callback)
		});
	}
));

function signUp(req, res, next) {
	function callback(err, hash) {
		if (err) {
			return next(err);
		}

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

	hashPassword(req.body.password, callback);
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
					hostname: req.hostname,
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

function changePassword(userID, userPassword, oldPassword, newPassword, done) {
	checkPassword(oldPassword, userPassword, function(err, res) {
		if (err) {
			return done(err);
		}

		if (!res) {
			var err = new Error('Неверно указан текущий пароль.');
			err.status = 400;
			return done(err);
		}

		hashPassword(newPassword, function(err, password) {
			if (err) {
				return done(err);
			}

			var query = util.format('call quests.pUserChangePassword(%d, "%s")',
				userID, password);

			db.execQuery(query, function(err, rows, fields) {
				if (err) {
					return done(err);
				}

				return done(null, password);
			});
		});
	});
}

function forgotPasswordMail(email, protocol, hostname, done) {
	crypto.randomBytes(48, function(err, buf) {
		if (err) {
			return done(err);
		}

		var token = buf.toString('hex'),
			query = util.format('call quests.pUserSetForgotPasswordToken("%s", "%s")',
				email, token);

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			var res = +rows[0][0].success === 1,
				mailOptions,
				tmplFile = path.join(__dirname, '../views/mail/forgot-password.jade'),
				data = {
					protocol: protocol,
					hostname: hostname,
					token: token
				};

			if (!res) {
				var err = new Error('Указанный email не зарегистрирован в системе.');
				err.status = 400;
				return done(err);
			}

			utils.tmpl2Str(tmplFile, data, function(err, html) {
				if (err) {
					return done(err);
				}

				mailOptions = {
					to: email,
					subject: 'Восстановление пароля на попртале Лига Квестов',
					html: html
				};

				console.log(token);
				return done();

				mailer.sendMail(mailOptions, function(err, info) {
					if (err) {
						return done(err);
					}

					return done();
				});
			})
		});
	});
}

function resetPassword(token, newPassword, done) {
	hashPassword(newPassword, function(err, password) {
		if (err) {
			return done(err);
		}

		var query = util.format('call quests.pUserResetPassword("%s", "%s")',
			token, password);

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			var success = +rows[0][0].success === 1;
			if (!success) {
				var err = new Error('Несанкционированная попытка сбросить пароль.');
				err.status = 500;
				return done(err);
			}

			return done(null);
		});
	});
}

function hashPassword(psw, done) {
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return done(err);
		}

		bcrypt.hash(psw, salt, function(err, hash) {
			if (err) {
				return done(err);
			}

			return done(null, hash);
		});
	});
}

function checkPassword(psw, hash, done) {
	bcrypt.compare(psw, hash, done);
}


module.exports = {
	signUp: signUp,
	sendVerificationMail: sendVerificationMail,
	verifyStart: verifyStart,
	verifyEnd: verifyEnd,
	changePassword: changePassword,
	forgotPasswordMail: forgotPasswordMail,
	resetPassword: resetPassword,
};