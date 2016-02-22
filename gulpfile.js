
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jade = require('gulp-jade'),
	path = require('path'),
	gutil = require('gulp-util'),
	through = require('through2'),
	exec = require('child_process').exec,

	paths = {
		templates: ['./views-client/**/*.jade'],
	},

	jadeTask = function () {
		return gulp.src(paths.templates, { cwd: './**' })
			.pipe(jade({ client: true }).on('error', swallowError))
			.pipe(modify())
			.pipe(concat('templates.js'))
			.pipe(gulp.dest('./public/js'));
	},

	i18nTask = function(cb) {
		exec('sh/po2json.sh', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		});
	};

function swallowError(error) {
	var msg = {
		filename: error.filename,
		name: error.name,
		message: error.message
	};

	gutil.log(msg);

	this.emit('end');
}

function modify() {
	function transform(file, enc, callback) {
		if (!file.isBuffer()) {
			this.push(file);
			callback();
			return;
		}

		var funcName = path.basename(file.path, '.js'),
			from = 'function template(locals) {',
			to = 'function ' + funcName + '(locals) {',
			contents = file.contents.toString().replace(from, to);

		file.contents = new Buffer(contents);
		this.push(file);
		callback();
	}

	return through.obj(transform);
}

gulp.task('jade', jadeTask);
gulp.task('i18n', i18nTask);
gulp.task('build', ['jade']);

gulp.task('default', ['build']);
