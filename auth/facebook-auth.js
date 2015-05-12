var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '426894947484457',
		clientSecret: '4e334911f900ff8246dead4d312d4fae',
		callbackURL: "http://localhost:3000"
	},
	function(accessToken, refreshToken, profile, done) {
		console.log('FB user:', accessToken, refreshToken, profile);
		User.findOrCreate(..., function(err, user) {
			if (err) { return done(err); }
			done(null, user);
		});
	}
));
