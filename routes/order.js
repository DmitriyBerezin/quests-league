var express = require('express'),
	router = express.Router(),
	async = require('async'),

	orderService = require('../services/order'),
	authService = require('../services/auth-local');


// Create a new order
router.post('/', function(req, res, next) {
	var userID = req.body.userID,
		userName = req.body.userName,
		userEmail = req.body.userEmail,
		userPhone = req.body.userPhone,
		sessionID = req.body.sessionID,
		comment = req.body.comment

	if (!userName ||
		!userEmail ||
		!userPhone ||
		!sessionID) {
		var err = new Error('Bad request');
		err.status = 401;
	}

	async.waterfall([
		// Register new or update existed user
		function(done) {
			if (userID) {
				authService.updateUser(userID, userPhone, done);
			}
			else {
				authService.createUserForOrder(userName, userEmail, userPhone, done);
			}
		},
		// Send sms with order's verification code
		function(userID, done) {
			var verifyCode = 1111;
			done(null, userID, verifyCode);
		},
		// Create a not verified order
		function(userID, verifyCode) {
			orderService.createOrder(userID, sessionID, confirmCode, comment, done);
		}
	], function(err, orderID) {
		res.status(200).send({ orderID: orderID });
	});

});

module.exports = router;