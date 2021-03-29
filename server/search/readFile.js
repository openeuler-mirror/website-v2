/**
 * @file readFile
 */
var fs = require('fs');
var cheerio = require('cheerio');
var path = require('path');
var os = require('os');
const HTTP = require('../util/httpUtil');
const ES = require('../config/searchConfig');
const logUtil = require('../util/logUtil');
const CONF = require('../config/filePathConfig');
const ES_INDEX = 'openeuler_articles';
const ES_EN_INDEX = 'openeuler_articles_en';
const ES_RU_INDEX = 'openeuler_articles_ru';
const ES_TYPE = '_doc';
let jsonList = '';
let no = '';

function readFileByPath(dirPath, index, esType, model, version) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (item) {
        let innerPath = path.join(dirPath, item);
        if (fs.lstatSync(innerPath).isDirectory()) {
            readFileByPath(innerPath, index, esType, model, version);
        } else {
            if (!item.endsWith('.md')) {
                return;
            }

            let html = fs.readFileSync(innerPath, 'utf-8');
            let content = cheerio.load(html).text();
            let title = '';
            if (model === 'blog') {
                let arr = content.split(/[\r\n]/);
                let flag = false;
                arr.forEach(s => {
                    if (s.startsWith('---')) {
                        flag = !flag;
                    }
                    if (flag) {
                        if (s.indexOf('title') > -1) {
                            title = s;
                        }
                    }
                });
                title = title.replace('title: ', '');
                let index = content.indexOf('---', 1);
                if (index > 1) {
                    content = content.substring(index + 3);
                }
            }
            let json = {
                'id': no,
                'title': title === '' ? item.substring(0, item.length - 3) : title,
                'textContent': content,
                'articleName': item,
                'path': dirPath,
                'type': model,
                'version': version
            };
            let index = {
                'index': {
                    '_id': model + version + no,
                    '_type': '_doc'
                }
            };
            jsonList += JSON.stringify(index) + os.EOL;
            jsonList += JSON.stringify(json) + os.EOL;
            no++;
        }
    });
}

function insertES(index, esType, dirPath, model, version) {
    console.log(dirPath);
    no = 1;
    let json = {
        query: {
            bool: {
                must: [{
                    'match_phrase': {
                        'type': model
                    }
                }, {
                    'match_phrase': {
                        'version': version
                    }
                }]
            }
        }
    };
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    let now = logUtil.getTime();
    HTTP.postES(ES.ES_URL + index + '/_doc/_delete_by_query', token, json).then(data => {
        let meta = '[' + now + ']' + index + ' ' + version + ' ' + model + ' delete elasticsearch index.';
        console.log(meta + os.EOL + JSON.stringify(data) + os.EOL);
        jsonList = '';
        readFileByPath(dirPath, index, esType, model, version);
        HTTP.updateES(ES.ES_URL + index + '/_bulk', token, jsonList).then(data => {}).catch(ex => {
            console.log('[' + now + ']' + ex.stack + os.EOL);
        });
    }).catch(ex => {
        console.log('[' + now + ']' + ex.stack + os.EOL);
    });
}

function initESData(version, lang, model) {
    if ('docs,news,blog,live'.indexOf(model) === -1) {
        console.log('model parameter error');
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
        insertES(ES_INDEX, ES_TYPE, dirPath, model, version);
    } else if (lang === 'en') {
        insertES(ES_EN_INDEX, ES_TYPE, dirPath, model, version);
    } else if (lang === 'ru') {
        insertES(ES_RU_INDEX, ES_TYPE, dirPath, model, version);
    }
}

module.exports = {
    insertES: insertES,
    initESData: initESData
};