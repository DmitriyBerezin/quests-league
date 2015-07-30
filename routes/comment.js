var express = require('express');
var router = express.Router();

var comment = require('../services/comment');

router.get('/quest/:questID/comment', function(req, res, next) {
	var questID = req.params.questID,
		userID = req.user.id;

	if (!questID || !userID) {
		var err = new Error('Parameters questID and userID are required');
		err.status = 400;
		return next(err);
	}

	comment.getComment(null, questID, userID, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.send(comment);
	});
});

router.get('/comment/:id', function(req, res, next) {
	var id = req.params.id;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	comment.getComment(id, null, null, function(err, comment) {
		if (err) {
			return next(err);
		}

		res.send(comment);
	});
});

router.post('/comment', function(req, res, next) {
	var questID = req.body.questID,
		userID = req.user.id,
		comment = req.body.comment;

	if (!questID || !userID) {
		var err = new Error('Parameters questID and userID are required');
		err.status = 400;
		return next(err);
	}

	comment.editComment(null, questID, userID, comment, function(err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.put('/comment', function(req, res, next) {
	var id = req.body.id,
		comment = req.body.comment;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	comment.editComment(id, null, null, comment, function(err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.del('/comment', function(req, res, next) {
	var id = req.body.id;

	if (!id) {
		var err = new Error('Parameter id is required');
		err.status = 400;
		return next(err);
	}

	comment.delComment(id, function(err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;