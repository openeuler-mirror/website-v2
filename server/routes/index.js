/**
 * @file index router
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const url = require('url');
const path = require('path');
const CONF = require('../config/filePathConfig');
const HTTP = require('../util/httpUtil');
const ES = require('../config/searchConfig');
const logUtil = require('../util/logUtil');
const REPO_ES_INDEX = 'openeuler';
const OPENEULER_URL = 'https://repo.openeuler.org';

router.get('/', function (req, res, next) {
    res.json({
        code: 200,
        data: 'index'
    });
});

router.get('/docs/menu', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let version = obj.query.version;
    let lang = obj.query.lang;

    let dirPath = path.join(CONF.DOCS_PATH, version, 'docs', 'content', lang, 'menu');
    let data = JSON.parse(fs.readFileSync(dirPath + '/menu.json', 'utf-8'));
    res.json({
        code: 200,
        data: data
    });
});

router.get('/createMenu', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let version = obj.query.version;
    let lang = obj.query.lang;

    let dirPath = path.join(CONF.DOCS_PATH, version, 'docs', 'content', lang, 'menu');
    let lesson = fs.readFileSync(dirPath + '/index.md', 'utf-8');
    let json = [];

    lesson.split(/\r?\n/).forEach(function (line) {
        if (line.indexOf(']({{<') > -1) {
            if (line.indexOf('-') === 0) {
                json.push(getLineArr(line));
            }
            if (line.indexOf('-') === 4) {
                json.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 8) {
                json.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 12) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 16) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 20) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
        }
    });

    fs.writeFile(dirPath + '/menu.json', JSON.stringify(json, null, 2), 'utf-8', (err) => {
        if (err == null) {
            res.json({
                code: 200,
                data: 'menu.json create success'
            });
        } else {
            console.log(err.stack);
            res.json({
                code: 201,
                data: 'menu.json create failed'
            });
        }
    });
});

function getLineArr(line) {
    let arr = {
        lable: line.substring(line.indexOf('[') + 1, line.indexOf(']')),
        path: line.substring(line.indexOf('"./') + 3, line.indexOf('.md')),
        child: []
    }
    return arr;
}

router.get('/repo/search', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let json = {
        query: {
            wildcard: {
                'file.filename': {
                    'value': '*' + obj.query.keyword + '*'
                }
            }
        }
    };
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    let now = logUtil.getTime();
    HTTP.postES(ES.ES_URL + REPO_ES_INDEX + '/_doc/_search', token, json).then(data => {
        let responseData = getSearchResJson(data);
        res.send(responseData);
    }).catch(ex => {
        console.log('[' + now + ']' + ex.stack + os.EOL);
        logUtil.errorLogfile.write('[' + now + ']' + ex.stack + os.EOL);
    });
});

function getSearchResJson(data) {
    let arr = [];
    let num = data.hits.total.value;
    data.hits.hits.forEach(element => {
        element._source.path.virtual = OPENEULER_URL + element._source.path.virtual;
        arr.push(element._source);
    });
    let json = {
        'status': 200,
        'msg': '',
        'data': {
            'totalNum': num,
            'records': arr
        }
    };
    return json;
}

module.exports = router;