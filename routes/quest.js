var express = require('express');
var router = express.Router();

var quest = require('../services/quest');

router.get('/:id', function(req, res, next) {
	quest.getQuest(req.params.id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('quest', data);
	});
});

module.exports = router;