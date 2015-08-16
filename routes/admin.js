var express = require('express');
var router = express.Router();

var admin = require('../services/admin'),
	utils = require('../services/utils');

router.all('*', utils.requreAdminRole);

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