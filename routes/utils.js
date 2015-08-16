var express = require('express');
var router = express.Router();

var utils = require('../services/utils-svc');

router.get('/cities', function(req, res, next) {
	utils.getCities(function(err, data) {
		if (err) {
			return next(err);
		}

		return res.status(200).send(data);
	});
});

module.exports = router;
