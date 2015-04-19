var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.data) {
  	req.session.data = {
  		name: 'afasdasdasd',
  		sec_name: 'sdsdfsfsdfds',
  		id: 111
  	};
  }
  else {
  	console.log(req.session);
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;
