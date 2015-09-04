var util = require('util'),

	db = require('./database');


function createOrder(userID, sessionID, confirmCode, comment, done) {
	var util.format('call quests.pOrderCreate(%d, %d, "%s", "%s")',
			userID, sessionID, confirmCode, comment);

	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		var orderID = +rows[0][0];
		return done(null, orderID);
	});
}