var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');

require('../services/auth-oauth');
var localAuth = require('../services/auth-local');
var utils = require('../services/utils');


router.get('/login', function(req, res, next) {
	if (req.query.returnUrl) {
		req.session.returnUrl = req.query.returnUrl;
	}

	res.render('auth/login', { message: req.flash('error') });
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


router.post('/email/check', function(req, res, next) {
	var email = req.body.email;

	if (!email) {
		var err = new Error('Неверные параметры запроса.');
		err.status = 400;
		return next(err);
	}

	localAuth.checkEmail(email, function(err, isValid) {
		if (err) {
			return next(err);
		}

		res.status(200).send(isValid);
	});
});

// Sign Up
router.post('/signup', function(req, res, next) {
	var name = req.body.name,
		email = req.body.email,
		password = req.body.password,
		phone = null;

		if (!name ||
			!email ||
			!password ||
			password.length < 6 ||
			password !== req.body.passwordConfirmation) {
			var err = new Error('Неверные параметры запроса.');
			err.status = 400;
			return next(err);
		}

		localAuth.createUser(name, email, password, phone, function(err, user) {
			if (err) {
				return next(err);
			}

			async.parallel([
				function(callback) {
					req.login(user, callback);
				},
				function(callback) {
					localAuth.verifyStart(user, req.protocol, req.hostname, callback);
				}
			],
			function(err) {
				if (err) {
					return next(err);
				}

				res.redirect('/auth/verify-need');
			});
		});
	}
);
router.get('/verify-need', function(req, res) {
	res.render('auth/verification-need');
});
router.get('/verify-start', utils.requireAuthentication, function(req, res, next) {
	localAuth.verifyStart(req.user, req.protocol, req.hostname, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});
router.get('/verify-end', localAuth.verifyEnd);
router.get('/verify-end', function(req, res, next) {
	var id = req.query.id,
		token = req.query.token;

	if (!id || !token) {
		var err = new Error('Неверные параметры запроса.');
		err.status = 400;
		return next(err);
	}

	localAuth.verifyEnd(id, token, function(err, user) {
		if (err) {
			return next(err);
		}

		req.login(user, function(err) {
			if (err) {
				return next(err);
			}

			res.render('auth/verification-complete');
		});
	});
});

router.get('/change-password', utils.requireAuthentication, function(req, res) {
	res.render('auth/change-password');
});
router.post('/change-password', utils.requireAuthentication,
	function(req, res, next) {
		var oldPassword = req.body.oldPassword,
			newPassword = req.body.newPassword;

		if (!oldPassword ||
			!newPassword ||
			newPassword.length < 6 ||
			newPassword !== req.body.newPasswordConfirm) {
			var err = new Error('Неверные параметры запроса.');
			err.status = 400;
			return next(err);
		}

		localAuth.changePassword(req.user.id, req.user.password, oldPassword, newPassword, function(err, password) {
			if (err) {
				return next(err);
			}

			req.user.password = password;
			res.status(200).send({});
		});
	}
);

router.get('/forgot-password', function(req, res, next) {
	res.render('auth/forgot-password');
});
router.post('/forgot-password', function(req, res, next) {
	var email = req.body.email;

	if (!email) {
		var err = new Error('Неверные параметры запроса.');
		err.status = 400;
		return next(err);
	}

	localAuth.forgotPasswordMail(email, req.protocol, req.hostname, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

router.get('/reset-password', function(req, res, next) {
	res.render('auth/reset-password');
});
router.post('/reset-password', function(req, res, next) {
	var newPassword = req.body.newPassword,
		token = req.body.token;

	if (!token ||
		!newPassword ||
		newPassword.length < 6 ||
		newPassword !== req.body.newPasswordConfirm) {
		var err = new Error('Неверные параметры запроса.');
		err.status = 400;
		return next(err);
	}

	localAuth.resetPassword(token, newPassword, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

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
