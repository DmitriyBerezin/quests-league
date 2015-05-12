var express = require('express');
var router = express.Router();
// var authFacebook = require('../auth/facebook-auth.js');

var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '426894947484457',
		clientSecret: '4e334911f900ff8246dead4d312d4fae',
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		console.log('FB user:', accessToken, refreshToken, profile);
		done(null, profile);
	}
));

/* GET users listing. */
router.get('/facebook', passport.authenticate('facebook', { session: false }));

// router.get('/facebook/callback', passport.authenticate('facebook', { 
// 	successRedirect: '/',
// 	failureRedirect: '/login'
// }));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
