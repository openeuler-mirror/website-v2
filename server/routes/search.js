/**
 * @file search router
 */
var express = require('express');
var os = require('os');
var path = require('path');
var url = require('url');
var router = express.Router();
var readFile = require('../search/readFile');
const CONF = require('../config/filePathConfig');
const httpUtil = require('../util/httpUtil');
const ES = require('../config/searchConfig');
const logUtil = require('../util/logUtil');

const ES_INDEX = 'openeuler_articles';
const ES_EN_INDEX = 'openeuler_articles_en';
const ES_TYPE = '_doc';
const ES_EN_TYPE = '_doc';

router.get('/index', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let lang = obj.query.lang;
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    let meta = '[' + logUtil.getTime() + '] create elasticsearch index.';

    if (lang === 'zh') {
        httpUtil.indexES(ES.ES_URL + ES_INDEX, token).then(data => {
            console.log(meta + os.EOL + JSON.stringify(data) + os.EOL);
        }).catch(ex => {
            console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        });
    }

    if (lang === 'en') {
        httpUtil.indexES(ES.ES_URL + ES_EN_INDEX, token).then(data => {
            console.log(meta + os.EOL + JSON.stringify(data) + os.EOL);
        }).catch(ex => {
            console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        });
    }

    res.json({
        code: 200,
        date: 'success'
    });
});

// model: ['docs', 'news', 'blog', 'live']
router.get('/insert', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let version = obj.query.version;
    let lang = obj.query.lang;
    let model = obj.query.model;
    if ('docs,news,blog,live'.indexOf(model) === -1) {
        res.json({
            code: 210,
            date: 'failed',
            msg: 'model parameter error'
        });
        return;
    }

    let dirPath = '';
    if (model === 'docs') {
        dirPath = path.join(CONF.DOCS_PATH, version, 'docs', 'content', lang, 'docs');
    } else {
        dirPath = path.join(CONF.NEWS_BLOG_PATH, lang, model);
        version = 'master';
    }

    if (lang === 'zh') {
        readFile.insertES(ES_INDEX, ES_TYPE, dirPath, model, version);
    } else if (lang === 'en') {
        readFile.insertES(ES_EN_INDEX, ES_EN_TYPE, dirPath, model, version);
    } else {
        res.json({
            code: 210,
            date: 'failed',
            msg: 'lang parameter error'
        });
        return;
    }

    res.json({
        code: 200,
        date: 'success'
    });
});

router.post('/keyword', function (req, res, next) {
    let keyword = req.body.keyword;
    keyword = keyword.replace(/#/g, '');
    let model = req.body.model;
    let indexEs = req.body.indexEs;
    let page = req.body.page;
    let version = req.body.version;
    let url = ES.ES_URL + indexEs + '/_search';
    let json = getSearchReqJson(page, model, keyword, version);
    httpUtil.updateES(url, json).then(data => {
        console.log('[' + logUtil.getTime() + ']' + JSON.stringify(data) + os.EOL);
        let responseData = getSearchResJson(data, keyword, page);
        res.send(responseData);
    }).catch(ex => {
        console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        res.json({
            code: 500,
            date: ex.stack
        });
    });
});

function getSearchResJson(data, keyword, page) {
    let arr = [];
    let num = 0;
    data.aggregations.data.buckets.forEach(item => {
        num += item.doc_count;
    });

    data.hits.hits.forEach(element => {
        let content = element._source.textContent;
        let index = content.indexOf(keyword);
        if (index > 100) {
            if (content.length > index + 100) {
                content = content.substring(index - 100, index + 100);
            } else {
                content = content.substring(index - 100, content.length);
            }
        } else if (content.length > index + 100) {
            content = content.substring(0, index + 100);
        } else {
            content = content.substring(0, content.length);
        }
        content = content.replace(keyword, '<em>' + keyword + '</em>');
        element._source.textContent = content;
        arr.push(element._source);
    });

    let json = {
        'status': 200,
        'msg': '',
        'data': {
            'page': page,
            'size': 10,
            'totalNum': num,
            'total': data.aggregations.data.buckets,
            'records': arr
        }
    };
    return json;
}

function getSearchReqJson(page, model, keyword, version) {
    page = parseInt(page, 10);
    // docs query by version
    if (model === 'docs' && version !== '') {
        let json = {
            'from': (page - 1) * 10,
            'size': 10,
            'query': {
                'bool': {
                    'must': [{
                            'match_phrase': {
                                'type': model
                            }
                        },
                        {
                            'match_phrase': {
                                'textContent': keyword
                            }
                        },
                        {
                            'match_phrase': {
                                'version': version
                            }
                        }
                    ]
                }
            },
            'aggs': {
                'data': {
                    'terms': {
                        'field': 'type'
                    }
                }
            }
        };
        return json;
    }
    if (model !== '') {
        let json = {
            'from': (page - 1) * 10,
            'size': 10,
            'query': {
                'bool': {
                    'must': [{
                            'match_phrase': {
                                'type': model
                            }
                        },
                        {
                            'match_phrase': {
                                'textContent': keyword
                            }
                        }
                    ]
                }
            },
            'aggs': {
                'data': {
                    'terms': {
                        'field': 'type'
                    }
                }
            }
        };
        return json;
    } else {
        let json = {
            'from': (page - 1) * 10,
            'size': 10,
            'query': {
                'bool': {
                    'should': [{
                        'match_phrase': {
                            'textContent': keyword
                        }
                    }]
                }
            },
            'aggs': {
                'data': {
                    'terms': {
                        'field': 'type'
                    }
                }
            }
        };
        return json;
    }
}

module.exports = router;