
module.exports = {
	database: {
		host: 'localhost',
		user: 'root',
		password: 'root',
		connectionLimit: 10
	},

	auth: {
		strategies: {
			facebook: {
				clientID: '426894947484457',
				clientSecret: '4e334911f900ff8246dead4d312d4fae',
				callbackURL: '/auth/facebook/callback'
			}
		}
	},

	mail: {
		smtp: {
			host: 'smtp.yandex.ru',
			port: 465,
			secure: true,
			auth: {
				user: 'ivan.questoff',
				pass: 'Quest123'
			}
		}
	}
};