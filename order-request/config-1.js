function getRequestUrl(order) {
	return 'http://cubirint.ru/schedule/reserve'
}

function getRequesParams(order) {
	return {
		'Reserve[name]': order.user.name,
		'Reserve[email]': order.user.email,
		'Reserve[phone]': order.user.phone,
		'Reserve[npeople]': order.peopleCnt,
		'Reserve[payments]': 1,
		'Reserve[session_id]': order.outerSessionID,
		'Reserve[q_name]': 'Коэльо: Алхимик',
		'Reserve[price]': order.price,
		'Reserve[time]': order.start_at,
		'Reserve[quest_id]': 4,
		'Reserve[type]': 'full',
	};
}

function isSuccess(resp, body, done) {
	return done(null);
}


module.exports = {
	getRequestUrl: getRequestUrl,
	getRequesParams: getRequesParams
};