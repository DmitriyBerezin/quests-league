var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 10,
	host            : 'quest2.cp0uujwgrxiz.eu-west-1.rds.amazonaws.com',
	user            : 'root',
	password        : 'rootroot'
});

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

  // res.render('index', { title: 'Express' });
  getTestDataFromDb(function() {
  	res.render('index', { title: 'Express' });
  })
});

function getTestDataFromDb(callback) {
	pool.getConnection(function(err, connection) {
		console.log(err);

		// Use the connection
		connection.query( 'call quest.test_proc();', function(err, rows) {
			if (err) {
				console.log('Error:', err);
			}

			console.log('Db data are:', rows);
			// And done with the connection.
			connection.release();

			// Don't use the connection here, it has been returned to the pool.

			callback();
		});
	});
}

module.exports = router;
