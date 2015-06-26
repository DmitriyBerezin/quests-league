var util = require('util'),
	db = require('../services/database'),
	s3 = require('../services/aws-s3');

function getQuest(id, done) {
	var query = util.format('call quests.pQuestGet(%s)', id || null),
		data;

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		data = rows[0].length > 0 ? rows[0][0] : {};
		data.dic = {
			compaines: rows[1],
			tags: rows[2],
			leagues: rows[3],
			cities: rows[4],
			stations: rows[5]
		};

		return done(null, data);
	});
}

function createCompany(name, url, done) {
	var query = util.format('call quests.pCompanyCreate("%s", "%s")', name, url);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createTag(name, done) {
	var query = util.format('call quests.pTagCreate("%s")', name);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function editQuest(quest, done) {
	console.log(quest);

	var tagsQuery = db.intArrToInsertStatement(quest.tagsID),
		stationsQuery = db.intArrToInsertStatement(quest.stationsID),
		s = 'call quests.pQuestEdit(%s, "%s", "%s", %d, %s, %s, "%s", %s, %d, "%s", "%s", %d, %d)',
		query = util.format(s, quest.id || null, quest.name, quest.descr,
			quest.companyID, quest.playersForm || null, quest.playersTo || null,
			tagsQuery, quest.leagueID || null, quest.cityID, stationsQuery,
			quest.address, quest.lat, quest.lng);

	console.log(query);
	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function addQuestFile(questID, fileName, file, done) {
	var path = util.format('quests/%d/%s', questID, fileName);

	s3.putData(path, file, done);
}

module.exports = {
	getQuest: getQuest,
	editQuest: editQuest,
	addQuestFile: addQuestFile,
	createCompany: createCompany,
	createTag: createTag
};