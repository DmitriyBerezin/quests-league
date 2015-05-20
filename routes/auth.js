var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../auth/facebook-auth.js');
var localAuth = require('../auth/local-auth.js');
var authUtils = require('../auth/utils');


router.get('/login', function(req, res, next) {
	res.render('login', {   message: req.flash('error') });
});



// Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));


// Twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));


// Email & password
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/auth/login',
	failureFlash: true
}));


// Sign Up
router.post('/signup', localAuth.signUp);

router.get('/verify', function(req, res, next) {
	res.render('verify');
});
router.post('/verify', localAuth.verify);


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
