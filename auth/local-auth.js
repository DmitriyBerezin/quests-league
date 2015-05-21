var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	util = require('util'),
	bcrypt = require('bcrypt'),
	
	db = require('../services/database'),
	mailer = require('../services/mailer'),
	authUtils = require('./utils');


passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		function callback(res) {
			if (res) {
				return done(null, row);
			}

			return done(null, false, { message: 'Incorrect password' });
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
				return done(err, false, { message: 'Incorrect email' });
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

			mailOptions = {
				//to: req.body.email,
				to: 'ivan.questoff@yandex.ru',
				subject: 'Verify account',
				//html: '<a href="http://localhost:3000/auth/verify?id=23"' + rows[0][0].id + '>'
				html: '<a href="http://localhost:3000/auth/verify?id=24">Verify account</a>'
			};		
			mailer.sendMail(mailOptions, function(err, info) {
				if (err) {
					return next(err);
				}

				res.redirect('/auth/verify');	
			});
		});
	}

	function errback(err) {
		return next(err);
	}

	
	hashPassword(req.body.password, callback, errback);
}

function verify(req, res, next) {
	var query = util.format('call quests.pUserVerify(%d)', req.body.id);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return next(err);
		}

		res.redirect('/user/lk');
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
	verify: verify
};