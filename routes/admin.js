var express = require('express');
var router = express.Router();

var admin = require('../services/admin');

router.get('/quest/:id', function(req, res, next) {
	admin.getQuest(req.params.id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest', data);
	});
});

router.post('/quest', function(req, res, next) {
	admin.editQuest(req.body, function(err, questID) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ questID: questID });
	});
});

router.post('/company', function(req, res, next) {
	admin.createCompany(req.body.name, req.body.site, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/tag', function(req, res, next) {
	admin.createTag(req.body.name, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

module.exports = router;