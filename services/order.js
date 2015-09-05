var util = require('util'),
	async = require('async'),

	db = require('./database'),
	orderRequest = require('../order-request/order-request'),
	authService = require('../services/auth-local'),

	STATUS_CONFIRMED = 'confirmed', // Данные заказы подтверждены
	STATUS_REGISTERED = 'registered', // Зарегистрирован во внешней системе
	STATUS_VISITED = 'visited', // Считается посещенным, елси дата сеанса < текущей даты
	STATUS_REFUSED = 'refused', // Считается отмененным, если сеанс свободен в расписание
	STATUS_SKIPPED = 'skipped'; // Не посещался без отмены брони. Проверяется прозвоном.


function createOrder(user, sessionID, playersCnt, comment, done) {
	async.waterfall([
		// Register new or update existed user
		function(done) {
			if (user.id) {
				authService.updateUser(user.id, user.phone, done);
			}
			else {
				authService.createUserForOrder(user.name, user.email, user.phone, done);
			}
		},
		// Send sms with order's verification code
		function(userID, done) {
			var confirmCode = 1111;
			done(null, user.id, confirmCode);
		},
		// Create a not verified order
		function(userID, confirmCode, done) {
			var query = util.format('call quests.pOrderCreate(%d, %d, %s, "%s", %s)',
					userID, sessionID, playersCnt || null, confirmCode, comment || null);

			db.execQuery(query, function(err, rows, fields) {
				var orderID = +rows[0][0].order_id;
				return done(null, orderID);
			});
		}
	], function(err, orderID) {
		if (err) {
			return done(err);
		}

		return done(null, orderID)
	});
}

function confirmOrder(orderID, confirmCode, done) {
	var query = util.format('call quests.pOrderConfirm(%d, "%s")',
			orderID, confirmCode);

	console.log(query)
	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		var order = rows.length > 0 && rows[0].length > 0 ? rows[0][0] : null;
		if (!order) {
			var err = new Error('Incorrect parameters');
			err.status = 400;
			return done(err);
		}

		console.log(order)
		return done(null, order);
	});
}

function setOrderStatus(orderID, status, done) {
	var query = util.format('call quests.pOrderSetStatus(%d, "%s")',
			orderID, status);

	console.log(query)
	db.execQuery(query, function(err, rows, fields) {
		if (err) {
			return done(err);
		}

		return done(null);
	});
}

function registerOrder(orderID, confirmCode, done) {
	async.waterfall([
		function(done) {
			return confirmOrder(orderID, confirmCode, done);
		},
		function(order, done) {
			console.log('1')
			return orderRequest.send(order, order.quest_id, done);
		},
		function(done) {
			console.log('2')
			return setOrderStatus(orderID, STATUS_REGISTERED, done);
		}
	], done);
}


module.exports = {
	createOrder: createOrder,
	registerOrder: registerOrder
};