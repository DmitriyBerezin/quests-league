var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../auth/facebook-auth.js');
require('../auth/local-auth.js');


// Facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));


// Email & password
router.get('/login', function(req, res, next) {
	res.render('login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/auth/login',
	failureFlash: true
}));


// Log out
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});


passport.serializeUser(function(user, done) {
 	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	done(null, { name: '1', id: 1 });
});



module.exports = router;
