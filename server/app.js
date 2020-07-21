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
var mailRouter = require('./routes/mail');

var app = express();

// Processing returns 304 status code
app.disable('etag');

app.disable('x-powered-by');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// Verify the logs folder
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

var errorLogfile = FileStreamRotator.getStream({
    filename: path.join(logDirectory, 'error-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

app.use(logger('combined', {
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
app.use('/mail', mailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    var now = new Date();
    var time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' ' +
        now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    var meta = '[' + time + '] ' + req.method + ' ' + req.url;
    errorLogfile.write(meta + err.stack);
    next();
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8090);
module.exports = app;