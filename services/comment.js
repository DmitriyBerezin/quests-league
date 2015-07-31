var util = require('util'),
	db = require('./database');

function getComment(id, questID, userID, done) {
	var query = util.format('call quests.pCommentGet(%s, %s, %s)',
		id || null, questID || null, userID || null);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function editComment(id, questID, userID, comment, done) {
	var query = util.format('call quests.pCommentEdit(%s, %s, %s, "%s")',
			id || null, questID || null, userID || null, comment);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][rows[0].length - 1]);
	});
}

function delComment(id, userID, done) {
	var query = util.format('call quests.pCommentDel(%d, %d)', id, userID);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done();
	});
}

module.exports = {
	getComment: getComment,
	editComment: editComment,
	delComment: delComment
};
