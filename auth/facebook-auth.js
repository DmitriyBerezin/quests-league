var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,

	authUtils = require('./utils.js');

passport.use(new FacebookStrategy({
		clientID: '426894947484457',
		clientSecret: '4e334911f900ff8246dead4d312d4fae',
		callbackURL: '/auth/facebook/callback'
	},
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
