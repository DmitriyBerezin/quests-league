var AWS = require('aws-sdk'),
	proxy = require('proxy-agent'),
	util = require('util'),

	config = require('../config/config'),
	bucket;

AWS.config.update({
	httpOptions: { agent: proxy('http://proxy.frsd.ru:3128') }
});
AWS.config.region = config.aws.region;

bucket = new AWS.S3({
	params: {
		Bucket: config.aws.bucket
	},
	sslEnabled: false,
	signatureVersion: 'v4'
});

function putData(key, buffer, done) {
	var obj = {
			Key: key,
			Body: buffer
		},
		url;

	bucket.putObject(obj, function (err) {
		if (err) {
			return done(err);
		}

		url = util.format('https://s3.%s.amazonaws.com/%s/%s',
			config.aws.region, config.aws.bucket, key);
		return done(null, url);
	});
}

module.exports = {
	putData: putData
};