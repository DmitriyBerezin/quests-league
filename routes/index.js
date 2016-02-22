var express = require('express');
var router = express.Router();

var questService = require('../services/quest');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('lang', req.lang)
	res.render('index');
	// questService.search('', function(err, quests) {
	// 	if (err) {
	// 		res.render('index');
	// 	}

	// 	res.render('index', { quests: quests });
	// });
});

module.exports = router;
