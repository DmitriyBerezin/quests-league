var AWS = require('aws-sdk'),
	proxy = require('proxy-agent'),
	util = require('util'),

	config = require('../config/config'),
	bucket;

// AWS.config.update({
// 	httpOptions: { agent: proxy('http://proxy.frsd.ru:3128') }
// });
if (process.env.AWS_ACCESS_KEY) {
	AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY
	});
}
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

function listData(key, done) {
	var params = {
		Prefix: key
	};

	bucket.listObjects(params, function(err, data){
		var imgs = [],
			baseUrl = util.format('https://s3.%s.amazonaws.com/%s/',
				config.aws.region, config.aws.bucket);

		if (err) {
			return done(err);
		}

		for (var i = 0, l = data.Contents.length; i < l; ++i) {
			imgs.push({ url: baseUrl + data.Contents[i].Key });
		}
		return done(null, imgs);
	});
}

module.exports = {
	putData: putData,
	listData: listData
};