var util = require('util'),
	async = require('async'),
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

module.exports = {
	getQuest: getQuest
};