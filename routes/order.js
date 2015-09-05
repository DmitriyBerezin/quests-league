var express = require('express'),
	router = express.Router(),
	async = require('async'),

	orderService = require('../services/order');


// Create a new order
router.get('/', function(req, res, next) {
	var user = {
			id: req.body.userID,
			name: req.body.userName,
			email: req.body.userEmail,
			phone: req.body.userPhone
		},
		sessionID = req.body.sessionID,
		playersCnt = req.body.playersCnt,
		comment = req.body.comment;

	 user = {
		id: 1,
		name: 'test',
		email: 'test@test',
		phone: '111111111'
	};
	sessionID = 1;
	playersCnt = 2;
	comment = null;

	if (!user.name ||
		!user.email ||
		!user.phone ||
		!sessionID) {
		var err = new Error('Bad request');
		err.status = 401;
	}

	orderService.createOrder(user, sessionID, playersCnt, comment, function(err, orderID) {
		if (err){
			return next(err);
		}

		res.status(200).send({ orderID: orderID });
	});
});

// Register order
router.get('/confirm', function(req, res, next) {
	var confirmCode = req.body.code,
		orderID = req.body.orderID;

	orderID = 3;
	confirmCode = 1111;

	if (!confirmCode ||
		!orderID) {
		var err = new Error('Bad request');
		err.status = 401;
	}

	orderService.registerOrder(orderID, confirmCode, function(err) {
		if (err){
			return next(err);
		}

		return res.status(200).send({ orderID: orderID });
	})
});

module.exports = router;