var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mysql = require('mysql'),
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root'
	});

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		var query = "call quests.get_user_by_email('" + email + "')";
		connection.query(query, function(err, rows, fields) {
			if (err) {
				return done(err);
			}

			if (!rows[0].length) {
				return done(err, false, { message: 'Incorrect email' });
			}

			if (rows[0][0].password !== password) {
				return done(err, false, { message: 'Incorrect password' });
			}

			return done(null, rows[0][0]);
		});
	}
));