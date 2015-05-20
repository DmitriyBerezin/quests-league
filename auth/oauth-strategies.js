var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	VKontakteStrategy = require('passport-vkontakte').Strategy,
	MailRuStrategy = require('passport-mailru').Strategy,

	config = require('../config/config'),
	db = require('../services/database'),
	authUtils = require('./utils.js'),

	providers = {
		FACEBOOK: 'fb',
		TWITTER: 'tw',
		VKONTAKTE: 'vk',
		MAILRU: 'mail'
	};

passport.use(new FacebookStrategy(config.auth.strategies.facebook,
	function(accessToken, refreshToken, profile, done) {
		function callback(data) {
			return done(null, data);
		}

		function errback(err) {
			return done(err);
		}

		oauthAuthorization(providers.FACEBOOK, 
			accessToken, profile.emails, profile.displayName, callback, errback);
	}
));

passport.use(new TwitterStrategy(config.auth.strategies.twitter,
	function(accessToken, refreshToken, profile, done) {
		function callback(data) {
			return done(null, data);
		}

		function errback(err) {
			return done(err);
		}

		oauthAuthorization(providers.TWITTER, 
			accessToken, profile.emails, profile.displayName, callback, errback);
	}
));

passport.use(new VKontakteStrategy(config.auth.strategies.vkontakte,
	function(accessToken, refreshToken, profile, done) {
		function callback(data) {
			return done(null, data);
		}

		function errback(err) {
			return done(err);
		}

		oauthAuthorization(providers.VKONTAKTE, 
			accessToken, profile.emails, profile.displayName, callback, errback);
	}
));

passport.use(new MailRuStrategy(config.auth.strategies.mailru,
	function(accessToken, refreshToken, profile, done) {
		function callback(data) {
			return done(null, data);
		}

		function errback(err) {
			return done(err);
		}

		oauthAuthorization(providers.MAILRU, 
			accessToken, profile.emails, profile.displayName, callback, errback);
	}
));


function oauthAuthorization(provider, token, emails, name, cb, eb) {
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
