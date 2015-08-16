var util = require('util'),
	db = require('./database'),
	s3 = require('./aws-s3');

function getQuestList(done) {
	var query = 'call quests.pQuestList()',
		data;

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		data = {
			companies: rows[0],
			quests: rows[1]
		};
		return done(null, data);
	});
}

function getQuest(id, done) {
	var query = util.format('call quests.pQuestGet(%s)', id || null),
		data;

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		data = rows[0].length > 0 ? rows[0][0] : {};
		data.dic = {
			compaines: rows[1],
			tags: rows[2],
			leagues: rows[3],
			countries: rows[4],
			cities: rows[5],
			stations: rows[6],
			complexity: rows[7]
		};
		data.imgs = [];

		if (id) {
			getQuestFiles(id, function(err, imgs) {
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

function removeQuest(id, done) {
	var query = util.format('call quests.pQuestDel(%d)', id);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null);
	});
}

function createCompany(name, url, done) {
	var query = util.format('call quests.pCompanyCreate("%s", "%s")', name, url);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createTag(name, done) {
	var query = util.format('call quests.pTagCreate("%s")', name);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createCountry(name, done) {
	var query = util.format('call quests.pCountryCreate("%s")', name);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createCity(name, countryID, done) {
	var query = util.format('call quests.pCityCreate("%s", %d)', name, countryID);

	db.execQueryAsAdm(query, function(err, rows, fields) {
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
		s = 'call quests.pQuestEdit(%s, "%s", "%s", "%s", %d, %s, %s, "%s", %s, %d, %d, "%s", "%s", %d, %d, %s, %s, "%s", "%s", "%s", "%s", "%s", %s)',
		query = util.format(s, quest.id || null, quest.name, quest.descr, quest.url,
			quest.companyID, quest.playerFrom || null, quest.playerTo || null,
			tagsQuery, quest.leagueID || null, quest.countryID, quest.cityID,
			stationsQuery, quest.address, quest.lat, quest.lng,
			quest.priceFrom || null, quest.priceTo || null, quest.videoUrl,
			quest.ceoTitle, quest.ceoDescription, quest.ceoKeywords, quest.sefName,
			quest.complexityID || null);

	console.log(query);
	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function addQuestFile(questID, fileName, file, done) {
	var key = util.format('quests/%d/%s', questID, fileName);

	s3.putData(key, file, done);
}

function getQuestFiles(questID, done) {
	var key = util.format('quests/%d/', questID);

	s3.listData(key, done);
}

function importStations(done) {
	var data = require('../sql/spb-metro'),
		stations = data.root.row,
		query = 'call quests.pStationCreate("%s", 3)';

	for (var i = 0, l = stations.length; i < l; ++i) {
		db.execQueryAsAdm(util.format(query, stations[i]['_metroName']), function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			if (i === l - 1) {
				return done(null);
			}
		});
	}
}

function getCities(countryID, done) {
	var query = util.format('call quests.pCountryCities(%s)', countryID || null);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0]);
	});
}

function getStations(cityID, done) {
	var query = util.format('call quests.pCityStations(%s)', cityID || null);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0]);
	});
}

function getComment(id, done) {
	var query = util.format('call quests.pCommentGet(%d)', id);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0].length > 0 ? rows[0][0] : null);
	});
}

function approveComment(id, comment, done) {
	var query = util.format('call quests.pCommentApprove(%d, "%s")',
			id || null, comment);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done();
	});
}

function getCommentList(done) {
	var query = 'call quests.pCommentList()',
		data;

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0]);
	});
}


module.exports = {
	getQuestList: getQuestList,
	getQuest: getQuest,
	editQuest: editQuest,
	removeQuest: removeQuest,
	addQuestFile: addQuestFile,
	getQuestFiles: getQuestFiles,
	createCompany: createCompany,
	createTag: createTag,
	createCountry: createCountry,
	createCity: createCity,
	getCities: getCities,
	getStations: getStations,
	importStations: importStations,
	getComment: getComment,
	approveComment: approveComment,
	getCommentList: getCommentList
};