var express = require('express');
var router = express.Router();

var quest = require('../services/quest');

router.get('/search', function(req, res, next) {
	var query = req.query.query,
		page = req.query.page || 1,
		cityID = req.cookies.city;

	quest.search(req.lang, query, page, cityID, function(err, quests) {
		if (err) {
			return next(err);
		}

		res.send(quests);
	});
});

router.get('/:idOrSef', function(req, res, next) {
	var id = +req.params.idOrSef,
		sefName,
		userID = req.user ? req.user.id : null;

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

	quest.getQuest(req.lang, id, userID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('quest', data);
	});
});

module.exports = router;