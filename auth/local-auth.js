var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	format = require('string-format'),
	mysql = require('mysql'),
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root'
	}),
	authUtils = require('../auth/utils');


passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		function callback(res) {
			if (res) {
				return done(null, row);
			}

			return done(err, false, { message: 'Incorrect password' });
		}

		function errback(err) {
			return done(err);
		}

		
		var query = "call quests.get_user_by_email('" + email + "')",
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
		var query = 'call quests.create_user("' + req.body.name + '", "' + req.body.email + '", "' + hash + '")';

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
	var query = 'call quests.verify_user(' + req.body.id + ')';

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