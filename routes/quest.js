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

router.get('/:idOrSef', function(req, res, next) {
	var id = +req.params.idOrSef,
		sefName;

	if (isNaN(id)) {
		id = null;
		sefName = req.params.idOrSef;

		quest.getQuestIdBySefName(sefName, function(err, id) {
			if (err) {
				return next(err);
			}

			res.redirect(301, '/quest/' + id);
		});
	}

	quest.getQuest(id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('quest', data);
	});
});

module.exports = router;