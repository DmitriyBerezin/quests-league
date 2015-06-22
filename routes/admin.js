var express = require('express');
var router = express.Router();

router.get('/quest/edit', function(req, res, next) {
	res.render('admin/quest');
});

module.exports = router;