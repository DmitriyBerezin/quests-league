var util = require('util'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	VKontakteStrategy = require('passport-vkontakte').Strategy,
	MailRuStrategy = require('passport-mailru').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	InstagramStrategy = require('passport-instagram').Strategy,

	config = require('../config/config'),
	db = require('./database'),

	providers = {
		FACEBOOK: 'fb',
		TWITTER: 'tw',
		VKONTAKTE: 'vk',
		MAILRU: 'mail',
		GOOGLE: 'googl',
		INSTAGRAM: 'inst'
	};

passport.use(new FacebookStrategy(config.auth.strategies.facebook,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.FACEBOOK,
			accessToken, profile, done);
	}
));

passport.use(new TwitterStrategy(config.auth.strategies.twitter,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.TWITTER,
			accessToken, profile, done);
	}
));

passport.use(new VKontakteStrategy(config.auth.strategies.vkontakte,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.VKONTAKTE,
			accessToken, profile, done);
	}
));

passport.use(new MailRuStrategy(config.auth.strategies.mailru,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.MAILRU,
			accessToken, profile, done);
	}
));


passport.use(new GoogleStrategy(config.auth.strategies.google,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.GOOGLE,
			accessToken, profile, done);
	}
));


passport.use(new InstagramStrategy(config.auth.strategies.instagram,
	function(accessToken, refreshToken, profile, done) {
		oauthAuthorization(providers.INSTAGRAM,
			accessToken, profile, done);
	}
));


function oauthAuthorization(provider, token, profile, done) {
	var email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : '',
		name = profile.displayName,
		query = util.format('call quests.pUserOAuth("%s", "%s", "%s", "%s", "%s");',
			provider, token, email, name, JSON.stringify(profile));

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0].length > 0 ? rows[0][0] : null);
	});
}
