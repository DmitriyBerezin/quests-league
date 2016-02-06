var util = require('util'),
	db = require('./database'),
	s3 = require('./aws-s3');

function getQuestList(lang, done) {
	var query = util.format('call quests.pQuestList("%s")', lang),
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

function getQuest(lang, id, done) {
	var query = util.format('call quests.pQuestGet("%s", %s)', lang, id || null),
		data,
		commonData,
		langData;

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		commonData = rows[0].length > 0 ? rows[0][0] : {};
		langData = rows[1].length > 0 ? rows[1][0] : {};
		data = Object.assign({}, commonData, langData);

		data.dic = {
			compaines: rows[2],
			tags: rows[3],
			leagues: rows[4],
			countries: rows[5],
			cities: rows[6],
			stations: rows[7],
			complexity: rows[8]
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

function getCompany(id, langs, done) {
	var query = util.format('call quests.pAdminCompanyGet(%s)', id || null),
		company = {};

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		company = rows[0].length > 0 ? rows[0][0] : null;
		if (!company) {
			return done(null);
		}

		// Map <lang, dbdata>
		company.langs = {};
		langs.forEach(function(lang, i) {
			company.langs[lang] = rows[1].find((row) => row.lang === lang) || null;
		});

		return done(null, company);
	});
}

function editCompany(lang, id, name, url, done) {
	var query = util.format('call quests.pCompanyEdit("%s", %s, "%s", "%s")',
		lang, id || null, name, url);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function removeCompany(id, done) {
	var query = util.format('call quests.pCompanyDel(%d)', id);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null);
	});
}

function createTag(lang, name, done) {
	var query = util.format('call quests.pTagCreate("%s", "%s")', lang, name);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createCountry(lang, name, done) {
	var query = util.format('call quests.pCountryCreate("%s", "%s")', lang, name);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createCity(lang, name, countryID, done) {
	var query = util.format('call quests.pCityCreate("%s", "%s", %d)',
			lang, name, countryID);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function createStation(lang, name, cityID, done) {
	var query = util.format('call quests.pStationCreate("%s", "%s", %d)',
		lang, name, cityID);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0][0]);
	});
}

function editQuest(lang, quest, done) {
	console.log(quest);

	var tagsQuery = db.intArrToInsertStatement(quest.tagsID),
		stationsQuery = db.intArrToInsertStatement(quest.stationsID),
		s = 'call quests.pQuestEdit("%s", %s, "%s", "%s", "%s", %d, %s, %s, "%s", %s, %d, %d, "%s", "%s", %d, %d, %s, %s, "%s", "%s", "%s", "%s", "%s", %s)',
		query = util.format(s, lang, quest.id || null, quest.name, quest.descr, quest.url,
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

function getCities(lang, countryID, done) {
	var query = util.format('call quests.pCountryCities("%s", %s)',
			lang, countryID || null);

	db.execQueryAsAdm(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null, rows[0]);
	});
}

function getStations(lang, cityID, done) {
	var query = util.format('call quests.pCityStations("%s", %s)',
			lang, cityID || null);

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
	getCompany: getCompany,
	editCompany: editCompany,
	removeCompany: removeCompany,
	createTag: createTag,
	createCountry: createCountry,
	createCity: createCity,
	createStation: createStation,
	getCities: getCities,
	getStations: getStations,
	importStations: importStations,
	getComment: getComment,
	approveComment: approveComment,
	getCommentList: getCommentList
};