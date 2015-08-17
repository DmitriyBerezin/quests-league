var util = require('util'),
	config = require('../config/config'),
	mysql = require('mysql'),
	pool  = mysql.createPool(config.database.web);

function getConnection(callback) {
	pool.getConnection(function(err, connection) {
		callback(err, connection);
	});
}

function execQuery(query, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			return callback(err);
		}

		connection.query(query, function(err, rows, fields) {
			connection.release();

			callback(err, rows, fields);
		});
	});
}

function execQueryAsAdm(query, callback) {
	var connection = mysql.createConnection(config.database.admin);

	connection.connect(function(err) {
		if (err) {
			return callback(err);
		}

		connection.query(query, function(err, rows, fields) {
			connection.destroy();

			callback(err, rows, fields);
		});
	});
}

function intArrToInsertStatement(arr) {
	if (!arr) {
		return '';
	}

	if (!Array.isArray(arr)) {
		arr = [arr];
	}

	return arr.reduce(function(res, val, index) {
		var pattern = '(e_id, %d)';

		if (index) {
			pattern = ',' + pattern;
		}

		return res += util.format(pattern, val);
	}, '');
}

module.exports = {
	getConnection: getConnection,
	execQuery: execQuery,
	execQueryAsAdm: execQueryAsAdm,
	intArrToInsertStatement: intArrToInsertStatement
};