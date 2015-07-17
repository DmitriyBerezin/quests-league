var util = require('util'),
	async = require('async'),
	natural = require('natural'),
	db = require('./database'),
	s3 = require('./aws-s3'),
	admin = require('./admin');

function getQuest(id, done) {
	var query = util.format('call quests.pQuestGet1(%s)', id || null),
		res;

	db.execQuery(query, function(err, rows, fields) {
		var filesFunc = {};

		if (err) {
			return done(err);
		}

		res = rows[0].length > 0 ? rows[0][0] : {};
		res.tags = rows[1];
		res.quests = rows[2];
		res.stations = rows[3];
		res.imgs = [];

		filesFunc[id] = admin.getQuestFiles.bind(null, id);
		for (var i = 0; i < res.quests.length; ++i) {
			filesFunc[res.quests[i].id] = admin.getQuestFiles.bind(null, res.quests[i].id);
		}

		async.parallel(filesFunc, function(err, data) {
			if (err) {
				return done(err);
			}

			res.imgs = data[id];
			for (var i = 0; i < res.quests.length; ++i) {
				res.quests[i].img = data[res.quests[i].id].length > 0 ?
					data[res.quests[i].id][0] : null;
			}

			return done(null, res);
		});
	});
}

function search(q, done) {
	var dbQuery;

	q = prepareSearchQuery(q);
	dbQuery = util.format('call quests.pQuestSearch("%s")', q);

	db.execQuery(dbQuery, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0]);
	});
}

function prepareSearchQuery(q) {
	var words = q.split(' ');

	for (var i = 0; i < words.length; ++i) {
		words[i] = natural.PorterStemmerRu.stem(words[i]) + '*';
	}

	return words.join(' ');
}

module.exports = {
	getQuest: getQuest,
	search: search
};