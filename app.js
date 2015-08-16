var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var multer  = require('multer');
// var MongoStore = require('connect-mongo')(session);
// var mongoose = require ("mongoose");

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var quest = require('./routes/quest');
var comment = require('./routes/comment');

var mailer = require('./services/mailer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ inMemory: true }));
app.use(cookieParser());
app.use(session({
	secret: 'foo'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/quest', quest);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		var error = {
			message: err.message,
			error: err
		};
		errorHandler(error, req, res, next);
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	var error = {
		message: err.message,
		error: {}
	};
	errorHandler(error, req, res, next);
});

function errorHandler(err, req, res, next) {
	// mailer.sendErrorLogMail(err);

	res.status(err.status || 500);
	if (req.headers.accept.indexOf('text/html') === -1) {
		res.send(err);
	}
	else {
		res.render('error', err);
	}
}

module.exports = app;
