var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '426894947484457',
		clientSecret: '4e334911f900ff8246dead4d312d4fae',
		callbackURL: '/auth/facebook/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		done(null, { name: '1', id: 1 });
	}
));
