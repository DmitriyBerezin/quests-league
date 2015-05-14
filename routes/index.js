var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', username: req.user ? req.user.name : 'guest' });
});

module.exports = router;

//ivan.questoff@yandex.ru Quest123
