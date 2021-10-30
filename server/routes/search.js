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
const APICONF = require('../config/apiConfig');
const apiConfig = require('../config/apiConfig');
const ES_TYPE = '_doc';

router.get('/index', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let lang = obj.query.lang;
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    let meta = '[' + logUtil.getTime() + '] create elasticsearch index.';
    httpUtil.indexES(ES.ES_URL + apiConfig.ES_INDEX[lang], token).then(data => {
        console.log(meta + os.EOL + JSON.stringify(data) + os.EOL);
    }).catch(ex => {
        console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
    });
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
        dirPath = path.join(CONF.DOCS_PATH, version, lang, 'docs');
    } else {
        dirPath = path.join(CONF.NEWS_BLOG_PATH, lang, model);
        version = 'master';
    }

    if (lang === 'zh') {
        readFile.insertES(lang, ES_TYPE, dirPath, model, version);
    } else if (lang === 'en') {
        readFile.insertES(lang, ES_TYPE, dirPath, model, version);
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
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    httpUtil.postES(url, token, json).then(data => {
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
        let content = element.highlight.textContent;
        content = filterContent(content[0]);
        element._source.textContent = content;
        let title = element._source.title.replace(keyword, '<em>' + keyword + '</em>');
        element._source.title = title;
        arr.push(element._source);
    });
    data.aggregations.data.buckets.unshift({
        key: 'all',
        doc_count: num
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

const filterArr = ['---', 'title:', '### ', '## ', '# ', '[[toc]]'];

function filterContent(content) {
    filterArr.forEach(val => {
        content = content.replace(val, '');
    });
    let arr = content.split(/[\r\n]/);
    let result = '';
    let index = -1;
    arr.forEach(s => {
        index = s.indexOf('](#');
        if (index > 1) {
            s = s.substring(0, index - 1);
            result += s.replace('-', '').replace('[', '').replace(']', '');
        } else if (!(s.indexOf('](./') > -1
            && (s.indexOf('.gif') > -1 || s.indexOf('.png') > -1 || s.indexOf('.jpg') > -1))) {
            result += s;
        }
    });
    return result;
}

function getSearchReqJson(page, model, keyword, version) {
    page = parseInt(page, 10);
    // docs query by version
    if (model === 'docs' && version !== '') {
        return {
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
            'highlight': {
                'fields': {
                    'textContent': {}
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
    }
    if (model !== '') {
        return {
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
            'highlight': {
                'fields': {
                    'textContent': {}
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
    } else {
        return {
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
            'highlight': {
                'fields': {
                    'textContent': {}
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
    }
}

router.get('/statistics', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let type = obj.query.type;
    let reqUrl = APICONF.STATISTICS_URL + 'query/all?community=' + type;
    httpUtil.getUrl(reqUrl, '').then(data => {
        res.send(data);
    }).catch(ex => {
        console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        res.json({
            code: 500,
            date: ex.stack
        });
    });
});

module.exports = router;
