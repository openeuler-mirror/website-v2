/**
 * @file app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var os = require('os');

var helmet = require('helmet');
const HTTP = require('./util/httpUtil');
const CONF = require('./config/apiConfig');
var logUtil = require('./util/logUtil');
var indexRouter = require('./routes/index');
var mailRouter = require('./routes/mail');
var cveRouter = require('./routes/cve');
var securityNoticeRouter = require('./routes/SecurityNotice');
var newsRouter = require('./routes/news');
var blogRouter = require('./routes/blog');
var docsRouter = require('./routes/docs');
var searchRouter = require('./routes/search');
var sigRouter = require('./routes/sig');
var readFile = require('./search/readFile');
var app = express();

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Processing returns 304 status code
app.disable('etag');

app.disable('x-powered-by');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
logUtil.createLogsDdir();
app.use(logger('combined', {
    stream: logUtil.accessLogStream
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let filter = (req, res, next) => {
    if (req.url.indexOf('/createMenu') > -1) {
        next();
        return;
    }
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }
    next();
};
app.use(filter);

app.use('/', indexRouter);
app.use('/mail', mailRouter);
app.use('/cve', cveRouter);
app.use('/securityNotice', securityNoticeRouter);
app.use('/news', newsRouter);
app.use('/blog', blogRouter);
app.use('/docs', docsRouter);
app.use('/search', searchRouter);
app.use('/sig', sigRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    var meta = '[' + logUtil.getTime() + '] ' + req.method + ' ' + req.url;
    console.log(meta + err.stack + os.EOL);
    next();
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function initESData() {
    readFile.initESData('20.09', 'ru', 'docs');
}

initESData();

app.listen(8090);
module.exports = app;