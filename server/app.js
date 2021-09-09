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
const apiConfig = require('./config/apiConfig');
const esUtil = require('./util/esParams');
const ES = require('./config/searchConfig');
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
const dbUtil = require('./mysql/dbUtil');
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

function updateViewsFromMysql() {
    console.log('-------START MIGRATING DATA-------', os.EOL);
    let tables = ['news_visits', 'blog_visits'];
    let tableDataCount = 0;
    let finishCount = 0;
    tables.forEach(table => {
            dbUtil.query('select * from ' + table, function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    result.forEach(async item => {
                        if (!item.title) {
                            return;
                        }
                        tableDataCount++;
                        let model = table === 'news_visits' ? 'news' : 'blog';
                        let reIndex = apiConfig.ES_REINDEX[item.lang];
                        let searchViewsJson = esUtil.getSearchViewsReqJson(model, 'one', item.title);
                        let searchViewsUrl = ES.ES_URL + reIndex + '/_search';
                        let searchViews = await HTTP.getViews(searchViewsUrl, 'GET', false, esUtil.esToken, searchViewsJson);
                        let searchViewsResponse = esUtil.getSearchViewsResJson('one', searchViews);
                        if (searchViewsResponse.length) {
                            let updateViewsUrl = ES.ES_URL + reIndex + '/_update/' + searchViewsResponse[0].id;
                            let json = esUtil.getUpdateViewsReqJson(item.count);
                            HTTP.updateViews(updateViewsUrl, 'POST', false, esUtil.esToken, json)
                                .then(res => {
                                    let meta = '[' + logUtil.getTime() + '] update es reindex      ' + model + '     ' + item.title + '   ' + reIndex;
                                    console.log(meta + os.EOL);
                                    finishCount++;
                                    if (finishCount === tableDataCount) {
                                        console.log('-------DATA MIGRATING IS COMPLETE-------', os.EOL);
                                    }
                                }).catch(err => {
                                console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
                            });
                        } else {
                            let addDataJson = esUtil.getAddDataReqJson(item.title, item.count, model);
                            let addDocUrl = ES.ES_URL + reIndex + '/_doc';
                            HTTP.addDataToReindex(addDocUrl, 'POST', false, esUtil.esToken, addDataJson).then(res => {
                                let meta = '[' + logUtil.getTime() + '] add to es reindex      ' + model + '     ' + item.title + '   ' + reIndex;
                                console.log(meta + os.EOL);
                                finishCount++;
                                if (finishCount === tableDataCount) {
                                    console.log('-------DATA MIGRATING IS COMPLETE-------', os.EOL);
                                }
                            }).catch(err => {
                                console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
                            });
                        }
                    });
                }
            });
    });
}

function initESData() {
    let initZhNews = readFile.initESData('master', 'zh', 'news');
    let initEnNews = readFile.initESData('master', 'en', 'news');
    let initZhBlog = readFile.initESData('master', 'zh', 'blog');
    let initEnBlog = readFile.initESData('master', 'en', 'blog');
    let initDocs1 = readFile.initESData('20.09', 'zh', 'docs');
    let initDocs2 = readFile.initESData('20.09', 'en', 'docs');
    let initDocs3 = readFile.initESData('20.09', 'ru', 'docs');
    let initDocs4 = readFile.initESData('20.03_LTS', 'zh', 'docs');
    let initDocs5 = readFile.initESData('20.03_LTS', 'en', 'docs');
    let initDocs6 = readFile.initESData('20.03_LTS_SP1', 'zh', 'docs');
    let initDocs7 = readFile.initESData('20.03_LTS_SP1', 'en', 'docs');
    let initDocs8 = readFile.initESData('21.03', 'zh', 'docs');
    let initDocs9 = readFile.initESData('21.03', 'en', 'docs');
    let initDocs10 = readFile.initESData('20.03_LTS_SP2', 'zh', 'docs');
    let initDocs11 = readFile.initESData('20.03_LTS_SP2', 'en', 'docs');
    Promise.all([initZhNews, initEnNews, initZhBlog, initEnBlog, initDocs1, initDocs2, initDocs3, initDocs4, initDocs5
        , initDocs6, initDocs7, initDocs8, initDocs9, initDocs10, initDocs11])
        .then(res => {
            console.log('-------START SUCCESS-------', os.EOL);
            updateViewsFromMysql();
        })
        .catch(err => {
            console.log('-------START FAILED-------', os.EOL);
        });
}

initESData();

app.listen(8090);
module.exports = app;
