var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	util = require('util'),
	crypto = require('crypto'),
	bcrypt = require('bcryptjs'),
	path = require('path'),
	async = require('async'),

	db = require('./database'),
	mailer = require('./mailer'),
	utils = require('./utils');


passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	getUser
));

function getUser(email, password, done) {
	var query = util.format('call quests.pUserGet("%s")', email),
		user;

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		if (!rows[0].length) {
			return done(err, false, { message: 'Учетной записи с такими параметрами не существует' });
		}

		user = rows[0][0];
		checkPassword(password, user.password, function(err, isValid) {
			if (err) {
				return done(err);
			}

			if (isValid) {
				return done(null, user);
			}

			return done(null, false, { message: 'Учетной записи с такими параметрами не существует' });
		});
	});
}

function createUser(name, email, password, phone, done) {
	hashPassword(password, function callback(err, hash) {
		if (err) {
			return done(err);
		}

		var query = util.format('call quests.pUserCreate("%s", "%s", "%s", "%s")',
				name, email, hash, phone),
			mailOptions;

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			return done(null, rows[0][0]);
		});
	});
}

function updateUser(userID, phone, done) {
	var query = util.format('call quests.pUserUpdate(%d, "%s")',
			userID, phone);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, userID);
	});
}

function createUserForOrder(name, email, phone, done) {
	// generate random password
	crypto.randomBytes(48, function(err, buf) {
		if (err) {
			return done(err);
		}

		var password = buf.toString('hex');
		createUser(name, email, password, phone, function(err, user) {
			if (err) {
				return done(err);
			}

			return done(null, user.id);
		});
	});
}

function sendWelcomeMail(user, manualCreated, protocol, hostname, done) {
	crypto.randomBytes(48, function(err, buf) {
		if (err) {
			return done(err);
		}

		var token = buf.toString('hex'),
			query = util.format('call quests.pUserSetVerificationToken(%d, "%s")',
				user.id, token);

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			var mailOptions,
				tmplFile = path.join(__dirname, '../views/mail/welcome.jade'),
				data = {
					userName: user.name,
					protocol: protocol,
					hostname: hostname,
					token: token,
					id: user.id,
					manualCreated: manualCreated
				},
				subject = manualCreated ?
							'Подтверждение аккаунта на попртале Лига Квестов' :
							'Добро пожаловать в портал Лига Квестов';

			utils.tmpl2Str(tmplFile, data, function(err, html) {
				if (err) {
					return done(err);
				}

				mailOptions = {
					to: user.email,
					subject: subject,
					html: html
				};

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

function checkEmail(email, done) {
	var query = util.format('call quests.pUserEmailCheck("%s")', email);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		var isValid = +rows[0][0].isValid === 0;
		return done(null, isValid);
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
	createUser: createUser,
	createUserForOrder: createUserForOrder,
	updateUser: updateUser,
	getUser: getUser,
	sendWelcomeMail: sendWelcomeMail,
	verifyEnd: verifyEnd,
	changePassword: changePassword,
	forgotPasswordMail: forgotPasswordMail,
	resetPassword: resetPassword,
	checkEmail: checkEmail
};