
module.exports = {
	database: {
		web: {
			host: 'quests.cp0uujwgrxiz.eu-west-1.rds.amazonaws.com',
			port: 3306,
			user: 'root',
			password: process.env.RDS_WEB_PSW,
			connectionLimit: 10
		},
		admin: {
			host: 'quests.cp0uujwgrxiz.eu-west-1.rds.amazonaws.com',
			port: 3306,
			user: 'root',
			password: process.env.RDS_ADM_PSW
		}
	},

	auth: {
		strategies: {
			// https://developers.facebook.com/apps/
			facebook: {
				clientID: '426894947484457',
				clientSecret: '4e334911f900ff8246dead4d312d4fae',
				callbackURL: '/auth/facebook/callback'
			},

			// https://apps.twitter.com/app/8659230
			twitter: {
				consumerKey: 'x3z283bQrgbt6ZDNUJDtTWrbY',
				consumerSecret: 'vfmrQlixzzb8oQUP2X4A108Mz1rV6EHsfDOjKBjhfsiXnMGL3i',
				callbackURL: '/auth/twitter/callback'
			},

			// http://vk.com/editapp?id=5036179&section=options
			vkontakte: {
				clientID: '5036179',
				clientSecret: 'xJZ2va0Ug5nQJ1EGogGp',
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

			// https://instagram.com/developer/clients/manage/
			instagram: {
				clientID: '350568d4cf7a492ab482173e086c8640',
				clientSecret: 'c01f8c59772048a7a05ae0287eb743b0',
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
		},

		groups: {
			admins: [
				'questadm2015@gmail.com'
			],

			log: [
				'questadm2015@gmail.com'
			]
		}
	},

	aws: {
		region: 'eu-central-1',
		bucket: 'quests-league'
	},

	i18n: {
		supported_languages: [
			'en',
			'ru'
		],
		default_lang: 'en',
		locale_on_url: true,
		// debug_lang: 'it-CH',
		translation_directory: 'public/i18n'
	}
};