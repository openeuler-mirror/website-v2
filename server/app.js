// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

var helmet = require('helmet');
var indexRouter = require('./routes/index');
var isoRouter = require('./routes/iso');

var app = express();

app.disable('x-powered-by');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// Verify the logs folder
var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/log-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

app.use(logger('short', {
    stream: accessLogStream
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/iso', isoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8090);
module.exports = app;