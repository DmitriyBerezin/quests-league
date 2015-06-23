var express = require('express');
var router = express.Router();

var admin = require('../services/admin');

router.get('/quest', function(req, res, next) {
	admin.getQuestDictionaries(function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest', { dic: data });
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