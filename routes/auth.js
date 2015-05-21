var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../auth/oauth-strategies.js');
var localAuth = require('../auth/local-auth.js');
var authUtils = require('../auth/utils');


router.get('/login', function(req, res, next) {
	res.render('login', { message: req.flash('error') });
});



// Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// Twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// VKontakte
router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback', passport.authenticate('vkontakte', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// MailRu
router.get('/mailru', passport.authenticate('mailru'));

router.get('/mailru/callback', passport.authenticate('mailru', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// Google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// Instagram
router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback', passport.authenticate('instagram', { 
	successRedirect: '/', 
	failureRedirect: '/auth/login' 
}));


// Email & password
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/auth/login',
	failureFlash: true
}));


// Sign Up
router.post('/signup', 
	localAuth.signUp, 
	localAuth.sendVerificationMail,
	function(req, res, next) {
		res.redirect('/');
	}
);
router.get('/verify', localAuth.verify);


// Log out
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});


passport.serializeUser(function(user, done) {
 	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});



module.exports = router;
