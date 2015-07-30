var express = require('express');
var router = express.Router();

var utils = require('../services/utils');

/* GET users listing. */
router.get('/', utils.requireAuthentication, function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
