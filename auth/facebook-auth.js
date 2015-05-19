var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,

	config = require('../config/config');
	authUtils = require('./utils.js');

passport.use(new FacebookStrategy(config.auth.strategies.facebook,
	function(accessToken, refreshToken, profile, done) {
		function callback(data) {
			return done(null, data);
		}

		function errback(err) {
			return done(err);
		}

		authUtils.oauthAuthorization(authUtils.providers.FACEBOOK, 
			accessToken, profile.emails, profile.displayName, callback, errback);
	}
));
