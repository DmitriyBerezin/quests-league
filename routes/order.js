var express = require('express'),
	router = express.Router(),
	async = require('async'),

	orderService = require('../services/order');


// Create a new order
router.post('/', function(req, res, next) {
	var user = {
			id: req.user ? req.user.id : null,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone
		},
		sessionID = req.body.sessionID,
		playersCount = req.body.playersCount,
		comment = req.body.comment;

	if (!user.name ||
		!user.email ||
		!user.phone ||
		!sessionID) {
		var err = new Error('Bad request');
		err.status = 401;
	}

	orderService.createOrder(user, sessionID, playersCount, comment, function(err, orderID) {
		if (err){
			return next(err);
		}

		res.status(200).send({ orderID: orderID });
	});
});

// Register order
router.post('/confirm', function(req, res, next) {
	var confirmCode = req.body.code,
		orderID = req.body.orderID;

	if (!confirmCode ||
		!orderID) {
		var err = new Error('Bad request');
		err.status = 400;
	}

	orderService.registerOrder(orderID, confirmCode, function(err) {
		if (err){
			return next(err);
		}

		return res.status(200).send({ orderID: orderID });
	})
});

module.exports = router;