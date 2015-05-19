var bcrypt = require('bcrypt'),
	util = require('util'),
	config = require('../config/config'),
	db = require('../services/database');

module.exports = {
	providers: {
		FACEBOOK: 'fb'
	},

	// route middleware to make sure a user is logged in
	requireAuthentication: function (req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/auth/login');
	},

	hashPassword: function(psw, cb, eb) {
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
	},

	checkPassword: function(psw, hash, cb, eb) {
		bcrypt.compare(psw, hash, function(err, res) {
			if (err) {
				return eb(err);
			}

			return cb(res);
		});
	},

	oauthAuthorization: function(provider, token, emails, name, cb, eb) {
		var email = emails.length > 0 ? emails[0].value : '',
			query = util.format('call quests.pUserOAuth("%s", "%s", "%s", "%s");', 
				provider, token, email, name);

		db.execQuery(query, function(err, rows, fields) {
			if (err) {
				return eb(err);
			}

			cb(rows[0][0]);
		});
	}
};