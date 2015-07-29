
var jade = require('jade'),
	fs = require('fs');

function tmpl2Str(path, data, next) {
	fs.readFile(path, 'utf8', function (err, tmpl) {
		var fn;

		if (err) {
			return next(err);
		}

		fn = jade.compile(tmpl);
		next(null, fn(data));
	});
}

module.exports = {
	tmpl2Str: tmpl2Str
};