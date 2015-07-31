var express = require('express');
var router = express.Router();

var service = require('../services/comment'),
	utils = require('../services/utils');

router.all('*', utils.requireAuthentication);

router.get('/quest/:questID/comment', function(req, res, next) {
	var questID = req.params.questID,
		userID = req.user.id;

	if (!questID || !userID) {
		var err = new Error('Parameters questID and userID are required');
		err.status = 400;
		return next(err);
	}

	service.getComment(null, questID, userID, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.send(comment);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	service.getComment(id, null, null, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.send(comment);
	});
});

router.post('/', function(req, res, next) {
	var questID = req.body.questID,
		userID = req.user.id,
		comment = req.body.comment;

	if (!questID || !userID) {
		var err = new Error('Parameters questID and userID are required');
		err.status = 400;
		return next(err);
	}

	service.editComment(null, questID, userID, comment, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.status(200).send(comment);
	});
});

router.put('/', function(req, res, next) {
	var id = req.body.id,
		comment = req.body.comment;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	service.editComment(id, null, null, comment, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

router.delete('/', function(req, res, next) {
	var id = req.body.id;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	service.delComment(id, function(err) {
		if (err) {
			return next(err);
		}

		res.status(200).send({});
	});
});

module.exports = router;