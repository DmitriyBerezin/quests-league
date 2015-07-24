var express = require('express');
var router = express.Router();

var quest = require('../services/quest');

router.get('/search', function(req, res, next) {
	quest.search(req.query.query, function(err, quests) {
		if (err) {
			return next(err);
		}

		res.send(quests);
	});
});

router.get('/:id', function(req, res, next) {
	quest.getQuest(req.params.id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('quest', data);
	});
});

module.exports = router;