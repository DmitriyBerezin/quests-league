
var jade = require('jade'),
	fs = require('fs');

// route middleware to make sure a user is logged in
function requireAuthentication(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		return next();
	}

	// Store requested path
	req.session.returnUrl = req.originalUrl;

	// if they aren't redirect them to the home page
	res.redirect('/auth/login');
}

function requreAdminRole(req, res, next) {
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
}

function successRedirect(req, res) {
	var returnUrl = req.session.returnUrl;
	req.session.returnUrl = null;
	res.redirect(returnUrl || '/');
}

function tmpl2Str(path, data, next) {
	fs.readFile(path, 'utf8', function (err, tmpl) {
		var fn;

		if (err) {
			return next(err);
		}

		fn = jade.compile(tmpl);
		next(null, fn(data));
	});
}

module.exports = {
	tmpl2Str: tmpl2Str,
	requireAuthentication: requireAuthentication,
	requreAdminRole: requreAdminRole,
	successRedirect: successRedirect
};