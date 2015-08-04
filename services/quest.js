var util = require('util'),
	async = require('async'),
	natural = require('natural'),
	db = require('./database'),
	s3 = require('./aws-s3'),
	admin = require('./admin');

function getQuest(id, userID, done) {
	var query = util.format('call quests.pQuestGet1(%s, %s)', id || null, userID || null),
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
		res.userComment = rows[4].length > 0 ? rows[4][0] : null;
		res.otherComments = rows[5];
		res.imgs = [];
		res.ceo = {
			title: res.ceo_title,
			description: res.ceo_description,
			keywords: res.ceo_keywords
		};

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

function getQuestIdBySefName(sefName, done) {
	var query = util.format('call quests.pQuestGetIdBySefName("%s")', sefName);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		var id = rows[0].length > 0 ? rows[0][0].id : 0;
		return done(null, id);
	});
}

function search(q, done) {
	var dbQuery,
		quests = [],
		filesFunc = {};

	q = prepareSearchQuery(q);
	dbQuery = util.format('call quests.pQuestSearch("%s")', q);

	db.execQuery(dbQuery, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		quests = rows[0];
		for (var i = 0; i < quests.length; ++i) {
			filesFunc[quests[i].id] = admin.getQuestFiles.bind(null, quests[i].id);
		}

		async.parallel(filesFunc, function(err, data) {
			if (err) {
				return done(err);
			}

			for (var i = 0; i < quests.length; ++i) {
				quests[i].img = data[quests[i].id].length > 0 ?
					data[quests[i].id][0] : null;
			}

			return done(null, quests);
		});
	});
}

function prepareSearchQuery(q) {
	var words = [];

	if (!q) {
		return '';
	}

	words = q.split(' ');
	for (var i = 0; i < words.length; ++i) {
		words[i] = natural.PorterStemmerRu.stem(words[i]) + '*';
	}

	return words.join(' ');
}

module.exports = {
	getQuest: getQuest,
	getQuestIdBySefName: getQuestIdBySefName,
	search: search
};