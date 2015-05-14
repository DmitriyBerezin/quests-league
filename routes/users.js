var express = require('express');
var router = express.Router();

var authUtils = require('../auth/utils');

/* GET users listing. */
router.get('/', authUtils.requireAuthentication, function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
