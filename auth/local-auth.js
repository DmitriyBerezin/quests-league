var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	util = require('util'),
	config = require('../config/config'),
	mysql = require('mysql'),
	connection = mysql.createConnection(config.database),
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
		connection.query(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			if (!rows[0].length) {
				return done(err, false, { message: 'Incorrect email' });
			}

			row = rows[0][0];
			authUtils.checkPassword(password, row.password, callback, errback)
		});
	}
));

function signUp(req, res, next) {
	function callback(hash) {
		var query = util.format('call quests.pUserCreate("%s", "%s", "%s")',
				req.body.name, req.body.email, hash);

		connection.query(query, function(err, rows, fields) {
			if (err) {
				return next(err);
			}

			res.redirect('/auth/verify');
		});
	}

	function errback(err) {
		return next(err);
	}

	
	authUtils.hashPassword(req.body.password, callback, errback);
}

function verify(req, res, next) {
	var query = util.format('call quests.pUserVerify(%d)', req.body.id);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			return next(err);
		}

		res.redirect('/user/lk');
	});
}

module.exports = {
	signUp: signUp,
	verify: verify
};