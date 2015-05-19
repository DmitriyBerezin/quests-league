var config = require('../config/config'),
	mysql = require('mysql'),
	pool  = mysql.createPool(config.database);

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

module.exports = {
	getConnection: getConnection,
	execQuery: execQuery
};