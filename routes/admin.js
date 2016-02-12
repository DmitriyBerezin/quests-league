var express = require('express');
var router = express.Router();

var admin = require('../services/admin'),
	utils = require('../services/utils'),
	config = require('../config/config');

router.all('*', utils.requreAdminRole);

router.get('/quest/list', function(req, res, next) {
	admin.getQuestList(req.lang, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest-list', data);
	});
});

router.get('/quest/:id?', function(req, res, next) {
	admin.getQuest(req.lang, req.params.id, function(err, data) {
		if (err) {
			return next(err);
		}

		res.render('admin/quest', data);
	});
});

router.post('/quest', function(req, res, next) {
	admin.editQuest(req.lang, req.body, function(err, quest) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ questID: quest.quest_id });
	});
});

router.delete('/quest', function(req, res, next) {
	var id = req.body.id;

	if (!id) {
		var err = new Error('Не передан id квеста');
		err.status = 400;
		return next(err);
	}

	admin.removeQuest(id, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
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

router.get('/company/:id?', function(req, res, next) {
	var id = req.params.id;

	admin.getCompany(id, config.i18n.supported_languages, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/company', function(req, res, next) {
	var id = req.body.id,
		site = req.body.site,
		namesList = [],
		prop,
		match;

	for (prop in req.body) {
		match = /name\[(\w*)\]/gi.exec(prop);
		if (match && match.length > 1) {
			namesList.push({ lang: match[1], name: req.body[prop] });
		}
	}

	admin.editCompany(req.lang, id, namesList, site, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.delete('/company', function(req, res, next) {
	var id = req.body.id;

	if (!id) {
		var err = new Error('`id` parameter is required');
		err.status(400);
		return next(err);
	}

	admin.removeCompany(id, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

router.post('/tag', function(req, res, next) {
	admin.createTag(req.lang, req.body.name, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/country', function(req, res, next) {
	admin.createCountry(req.lang, req.body.name, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/city', function(req, res, next) {
	admin.createCity(req.lang, req.body.name, req.body.countryID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.post('/station', function(req, res, next) {
	var name = req.body.name,
		cityID = req.body.cityID;

	if (!name || !cityID) {
		var err = new Error('Invalid arguments');
		err.status = 400;
		return next(err);
	}

	admin.createStation(req.lang, name, cityID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/cities', function(req, res, next) {
	admin.getCities(req.lang, req.query.countryID, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/stations', function(req, res, next) {
	admin.getStations(req.lang, req.query.cityID, function(err, data) {
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

		res.status(200).send({});
	});
});

router.get('/comment/approve/:id', function(req, res, next) {
	var commentID = req.params.id;

	admin.getComment(commentID, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.render('admin/comment', comment);
	});
});

router.post('/comment/approve', function(req, res, next) {
	var id = req.body.id,
		comment = req.body.comment;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	admin.approveComment(id, comment, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

router.get('/comment/list', function(req, res, next) {
	admin.getCommentList(function(err, comments) {
		if (err) {
			return next(err);
		}

		res.render('admin/comment-list', { comments: comments });
	});
});

module.exports = router;