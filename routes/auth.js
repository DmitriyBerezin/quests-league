var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../services/auth-oauth');
var localAuth = require('../services/auth-local');
var utils = require('../services/utils');


router.get('/login', function(req, res, next) {
	res.render('login', { message: req.flash('error') });
});



// Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);


// Twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);


// VKontakte
router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback', passport.authenticate('vkontakte', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);


// MailRu
router.get('/mailru', passport.authenticate('mailru'));

router.get('/mailru/callback', passport.authenticate('mailru', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);


// Google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);



// Instagram
router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback', passport.authenticate('instagram', {
	failureRedirect: '/auth/login'
}), utils.successRedirect);



// Email & password
router.post('/login',
	function(req, res, next) {
		if (!req.body.email ||
			!req.body.password) {
			var err = new Error('Неверные параметры запроса.');
			err.status = 400;
			return next(err);
		}

		return next();
	},
	passport.authenticate('local', {
		failureRedirect: '/auth/login',
		failureFlash: true
	}),
	utils.successRedirect
);


// Sign Up
router.post('/signup',
	function(req, res, next) {
		if (!req.body.name ||
			!req.body.email ||
			!req.body.password ||
			req.body.password.length < 6 ||
			req.body.password !== req.body.passwordConfirmation) {
			var err = new Error('Неверные параметры запроса.');
			err.status = 400;
			return next(err);
		}

		return next();
	},
	localAuth.signUp,
	localAuth.sendVerificationMail,
	function(req, res, next) {
		res.redirect('/auth/verify-need');
	}
);
router.get('/verify-need', function(req, res) {
	res.render('auth/verification-need')
});
router.get('/verify-start', localAuth.verifyStart, function(req, res) {
	res.status(200).send({});
});
router.get('/verify-end', localAuth.verifyEnd);


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
