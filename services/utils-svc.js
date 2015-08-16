var util = require('util'),
	db = require('./database');


function getCities() {
	var query = 'call quests.pCityList();';

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		
	});
}


module.exports = {
	getCities: getCities
};