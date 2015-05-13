var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', /*ensureAuthenticated,*/ function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { 
		return next(); 
	}
	
	res.redirect('/auth/login')
}

//ivan.questoff@yandex.ru Quest123
