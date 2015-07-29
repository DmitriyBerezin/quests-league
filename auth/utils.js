
module.exports = {
	// route middleware to make sure a user is logged in
	requireAuthentication: function (req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			return next();
		}

		// Store requested path
		req.session.returnUrl = req.originalUrl;

		// if they aren't redirect them to the home page
		res.redirect('/auth/login');
	},

	requreAdminRole: function(req, res, next) {
		var ADMIN_ROLE_NAME = 'adm';

		if (!req.isAuthenticated()) {
			// Store requested path
			req.session.returnUrl = req.originalUrl;
			res.redirect('/auth/login');
		}

		if (req.user.role === ADMIN_ROLE_NAME) {
			return next();
		}

		var err = new Error('Access denied');
		err.status = 403;
		return next(err);
	},

	successRedirect: function(req, res) {
		var returnUrl = req.session.returnUrl;
		req.session.returnUrl = null;
		res.redirect(returnUrl || '/');
	}
};