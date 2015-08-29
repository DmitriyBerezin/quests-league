var util = require('util'),
	db = require('./database'),

	_countries,
	_cities;


function getCities(done) {
	var query = 'call quests.pCityList();';

	if (_countries && _cities) {
		return done(null, _countries, _cities);
	}

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		_countries = rows[0];
		_cities = rows[1];

		return done(null, _countries, _cities);
	});
}


module.exports = {
	getCities: getCities
};