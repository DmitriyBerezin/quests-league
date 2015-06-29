
module.exports = {
	// route middleware to make sure a user is logged in
	requireAuthentication: function (req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// Store requested path
		req.session.returnUrl = req.originalUrl;

		// if they aren't redirect them to the home page
		res.redirect('/auth/login');
	},

	successRedirect: function(req, res) {
		var returnUrl = req.session.returnUrl;
		req.session.returnUrl = null;
		res.redirect(returnUrl || '/');
	}
};