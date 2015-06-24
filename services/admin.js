var util = require('util'),
	db = require('../services/database');

function getQuestDictionaries(done) {
	var query = 'call quests.pQuestDuctionaries()',
		dic;

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		dic = {
			compaines: rows[0],
			tags: rows[1],
			leagues: rows[2],
			cities: rows[3],
			stations: rows[4]
		};

		return done(null, dic);
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
	var s = 'call quests.pQuestEdit(%s, "%s", "%s", %d, %s, %s, %s, %d, "%s", %d, %d)',
		query = util.format(s, quest.id || null, quest.name, quest.descr, quest.companyID,
			quest.playersForm || null, quest.playersTo || null, quest.leagueID || null, quest.cityID,
			quest.address, quest.lat, quest.lng);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null);
	});
}

module.exports = {
	getQuestDictionaries: getQuestDictionaries,
	createCompany: createCompany,
	createTag: createTag,
	editQuest: editQuest
};