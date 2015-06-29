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
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);


// Twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { 
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);


// VKontakte
router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback', passport.authenticate('vkontakte', { 
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);


// MailRu
router.get('/mailru', passport.authenticate('mailru'));

router.get('/mailru/callback', passport.authenticate('mailru', { 
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);


// Google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google', { 
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);



// Instagram
router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback', passport.authenticate('instagram', { 
	failureRedirect: '/auth/login' 
}), authUtils.successRedirect);



// Email & password
router.post('/login', passport.authenticate('local', {
	failureRedirect: '/auth/login',
	failureFlash: true
}), authUtils.successRedirect);


// Sign Up
router.post('/signup', 
	localAuth.signUp, 
	localAuth.sendVerificationMail,
	authUtils.successRedirect
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
