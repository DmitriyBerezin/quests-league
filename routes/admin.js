var express = require('express');
var router = express.Router();

var admin = require('../services/admin'),
	authUtils = require('../auth/utils');

router.all('*', authUtils.requreAdminRole);

router.get('/quest/list', function(req, res, next) {
	admin.getQuestList(function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest-list', data);
	});
});

router.get('/quest/:id?', function(req, res, next) {
	admin.getQuest(req.params.id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest', data);
	});
});

router.post('/quest', function(req, res, next) {
	admin.editQuest(req.body, function(err, quest) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ questID: quest.quest_id });
	});
});

router.post('/quest/file', function(req, res, next) {
	var id = req.body.id,
		fileName = req.files.files.originalname,
		buffer = req.files.files.buffer;

	if (!id) {
		return res.status(400).send(null);
	}

	admin.addQuestFile(id, fileName, buffer, function(err, url) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ url: url });
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

router.post('/country', function(req, res, next) {
	admin.createCountry(req.body.name, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/city', function(req, res, next) {
	admin.createCity(req.body.name, req.body.countryID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/cities', function(req, res, next) {
	admin.getCities(req.query.countryID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/stations/import', function(req, res, next) {
	admin.importStations(function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send();
	});
});

module.exports = router;