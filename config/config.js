
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
			},

			twitter: {
				consumerKey: '426894947484457',
				consumerSecret: '4e334911f900ff8246dead4d312d4fae',
				callbackURL: '/auth/twitter/callback'
			},

			vkontakte: {
				clientID: '426894947484457',
				clientSecret: '4e334911f900ff8246dead4d312d4fae',
				callbackURL: '/auth/vkontakte/callback'
			},

			mailru: {
				clientID: '733832',
				clientSecret: 'df640d2dc1b81b80ee81c53768a69e77',
				callbackURL: '/auth/mailru/callback'
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