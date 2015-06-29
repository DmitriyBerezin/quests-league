
module.exports = {
	database: {
		host: 'quests.cp0uujwgrxiz.eu-west-1.rds.amazonaws.com',
		// host: 'localhost',
		port: 3306,
		user: 'moderator',
		password: process.env.RDS_PSW || 'root',
		connectionLimit: 10
	},

	auth: {
		strategies: {
			// https://developers.facebook.com/apps/
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

			// http://api.mail.ru/sites/my/
			mailru: {
				clientID: '733832',
				clientSecret: 'df640d2dc1b81b80ee81c53768a69e77',
				callbackURL: '/auth/mailru/callback'
			},

			// https://console.developers.google.com/project
			google: {
				clientID: '599117122023-acliond173f33oa6r19mi6sk0649a5kq.apps.googleusercontent.com',
				clientSecret: 'veJ58I5Kajjud9iwDAvAW6M8',
				callbackURL: '/auth/google/callback'
			},

			instagram: {
				clientID: '733832',
				clientSecret: 'veJ58I5Kajjud9iwDAvAW6M8',
				callbackURL: '/auth/instagram/callback'
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
	},

	aws: {
		region: 'eu-central-1',
		bucket: 'quests-league'
	}
};