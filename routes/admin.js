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

		res.status(200).send({ data: data });
	});
});

router.post('/company', function(req, res, next) {
	var id = req.body.id,
		site = req.body.site,
		namesList = buildNamesList(req.body);

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

router.get('/tag/:id?', function(req, res, next) {
	var id = req.params.id;

	admin.getTag(id, config.i18n.supported_languages, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ data: data });
	});
});

router.post('/tag', function(req, res, next) {
	var id = req.body.id,
		namesList = buildNamesList(req.body);

	admin.editTag(req.lang, id, namesList, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/country/:id?', function(req, res, next) {
	var id = req.params.id;

	admin.getCountry(id, config.i18n.supported_languages, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ data: data });
	});
});

router.post('/country', function(req, res, next) {
	var id = req.body.id,
		namesList = buildNamesList(req.body);

	admin.editCountry(req.lang, id, namesList, function(err, data) {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

router.get('/city/:id?', function(req, res, next) {
	var id = req.params.id;

	admin.getCity(id, config.i18n.supported_languages, req.lang, function(err, data, allCountries) {
		if (err) {
			return next(err);
		}

		res.status(200).send({ data: data, allCountries: allCountries });
	});
});

router.post('/city', function(req, res, next) {
	var id = req.body.id,
		countryID = req.body.countryID,
		timeZone = req.body.timeZone,
		lat = req.body.lat,
		lng = req.body.lng,
		namesList = buildNamesList(req.body);

	if (!countryID) {
		var err = new Error('Invalid arguments: countryID missing');
		err.status = 400;
		return next(err);
	}

	admin.editCity(req.lang, id, namesList, countryID, timeZone, lat, lng, function(err, data) {
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

function buildNamesList(params) {
	var list = [];

	for (prop in params) {
		match = /name\[(\w*)\]/gi.exec(prop);
		if (match && match.length > 1) {
			list.push({ lang: match[1], name: params[prop] });
		}
	}

	return list;
}

module.exports = router;