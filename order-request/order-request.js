var request = require('request');

function send(order, questID, done) {
	var config = getConfigForQuest(questID);

	if (!config) {
		var err = new Error('There are no order request config registered for this quest');
		err.status= 500;
		return done(err);
	}

	return done(null);

	console.log(orderReq.getRequestUrl());
	console.log(orderReq.getRequestParams())
	request.post({
		url: orderReq.getRequestUrl(),
		form: orderReq.getRequestParams()
	}, function(err, resp, body) {
		if (err) {
			return done(err);
		}

		if (resp.statusCode != 200 || resp.statusCode != 201) {
			var err = new Error(body);
			err.status = resp.statusCode;
			return done(err);
		}

		if (typeof orderReq.isSuccess === 'function') {
			return orderReq.isSuccess(resp, body, done);
		}

		return done(null);
	});
}

function getConfigForQuest(questID) {
	var config;

	switch (questID) {
		case 1:
		case 2:
		case 3:
			config = require('./config-1');
			break;
		default:
			break;
	}

	return config;
}

module.exports = {
	send: send
};
