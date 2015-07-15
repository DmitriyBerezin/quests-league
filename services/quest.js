var util = require('util'),
	db = require('./database'),
	s3 = require('./aws-s3'),
	admin = require('./admin');

function getQuest(id, done) {
	var query = util.format('call quests.pQuestGet1(%s)', id || null),
		data;

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		data = rows[0].length > 0 ? rows[0][0] : {};
		data.tags = rows[1];
		data.quests = rows[2];
		data.imgs = [];

		if (id) {
			admin.getQuestFiles(id, function(err, imgs) {
				if (err) {
					return done(err);
				}

				data.imgs = imgs;
				return done(null, data);
			})
		}
		else {
			return done(null, data);
		}
	});
}
module.exports = {
	getQuest: getQuest
};