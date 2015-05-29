var express = require('express');
var router = express.Router();
var fs = require('fs');
var AWS = require('aws-sdk');
var util = require('util');
var proxy = require('proxy-agent');
AWS.config.update({
	httpOptions: { agent: proxy('http://proxy.frsd.ru:3128') }
});
AWS.config.region = 'eu-central-1';
var s3bucket = new AWS.S3({ 
	params: { 
		Bucket: 'quests-league' 
	}, 
	sslEnabled: false,
	signatureVersion: 'v4'
});

function uploadImg(req, res, next) {
	var fileStream = fs.createReadStream('C:\\Users\\Public\\Pictures\\Sample Pictures\\Chrysanthemum.jpg');
	fileStream.on('error', function (err) {
		if (err) { 
			return next(err);
		}
	}).on('open', function () {
		s3bucket.putObject({
			Key: 'img',
			Body: fileStream
		}, function (err) {
			if (err) { 
				return next(err);
			}

			return next();
		});
	}); 
}

function listImgs(req, res, next) {
	s3bucket.listObjects(function(err, data){
		if (err) {
			return next(err);
		}

		var imgs = [],
			baseUrl = util.format('https://%s.amazonaws.com/%s/', 's3.eu-central-1', 'quests-league');
		for (var i = 0, l = data.Contents.length; i < l; ++i) {
			imgs.push(baseUrl + data.Contents[i].Key);
		}
		res.render('img', { imgs: imgs });
	});
}

router.get('/', /*uploadImg, */listImgs, function(req, res, next) {
	res.render('img');
	// s3bucket.createBucket(function() {
	// 	var params = { Key: 'myKey', Body: 'Hello!' };
	// 	s3bucket.upload(params, function(err, data) {
	// 		if (err) {
	// 			console.log("Error uploading data: ", err);
	// 		} else {
	// 			console.log("Successfully uploaded data to myBucket/myKey");
	// 			res.render('img');
	// 		}
	// 	});
	// });
});

module.exports = router;