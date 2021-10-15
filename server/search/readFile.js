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
const esUtil = require('../util/esParams');
const CONF = require('../config/filePathConfig');
const apiConfig = require('../config/apiConfig');
const ES_TYPE = '_doc';
let jsonList = '';
let no = '';

function readFileByPath(dirPath, esIndex, esType, model, version, newDoc) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (item) {
        let innerPath = path.join(dirPath, item);
        if (fs.lstatSync(innerPath).isDirectory()) {
            readFileByPath(innerPath, esIndex, esType, model, version, newDoc);
        } else {
            if (!item.endsWith('.md')) {
                return;
            }

            let html = fs.readFileSync(innerPath, 'utf-8');
            let content = cheerio.load(html).text();
            let title = '';
            if (model === 'blog' || model === 'news') {
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
                newDoc.push({id: model + version + no, esIndex, model, title, views: 0});
            }
            let json = {
                'id': no,
                'title': title === '' ? item.substring(0, item.length - 3) : title,
                'textContent': content,
                'articleName': item,
                'path': dirPath,
                'type': model,
                'version': version,
                'views': 0
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
    return newDoc;
}

async function insertES(lang, esType, dirPath, model, version, resolve) {
    let index = apiConfig.ES_INDEX[lang];
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
    let now = logUtil.getTime();
    let reIndex = apiConfig.ES_REINDEX[lang];
    let deleteDocData = await HTTP.postES(ES.ES_URL + index + '/_doc/_delete_by_query', esUtil.esToken, json);
    let meta = '[' + now + ']' + index + ' ' + version + ' ' + model + ' delete elasticsearch index.';
    console.log(meta + os.EOL + JSON.stringify(deleteDocData) + os.EOL);
    jsonList = '';
    let newDoc = [];
    readFileByPath(dirPath, index, esType, model, version, newDoc);
    newDoc.forEach(async item => {
        let searchViewsJson = esUtil.getSearchViewsReqJson(item.model, 'one', item.title);
        let searchViewsUrl = ES.ES_URL + reIndex + '/_search';
        let searchViews = await HTTP.getViews(searchViewsUrl, 'GET', false, esUtil.esToken, searchViewsJson);
        // console.log('--------searchViews----------', searchViews);
        let searchViewsResponse = esUtil.getSearchViewsResJson('one', searchViews);
        // console.log('----searchViewsResponse------', searchViewsResponse);
        if (!searchViewsResponse.length) {
            let addDataJson = esUtil.getAddDataReqJson(item.title, item.views, item.model);
            let addDocUrl = ES.ES_URL + reIndex + '/_doc';
            let addDocData = await HTTP.addDataToReindex(addDocUrl, 'POST', false, esUtil.esToken, addDataJson);
            console.log('----------addDocData-------', addDocData);
        }
    });
    updateData(index, resolve);

}


function updateData(index, resolve) {
    HTTP.updateDataToES(ES.ES_URL + index + '/_bulk', 'POST', false, esUtil.esToken, jsonList).then(res => {
        let meta = '[' + logUtil.getTime() + '] add elasticsearch data.';
        console.log(meta + os.EOL);
        resolve();
    }).catch(err => {
        console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
    });
}


function initESData(version, lang, model) {
    return new Promise((resolve) => {
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
        insertES(lang, ES_TYPE, dirPath, model, version, resolve);
    });
}

function openFieldData() {
    let jsonList = {
        'properties': {
            'type': {
                'type': 'text',
                'fielddata': true
            }
        }
    };
    let promiseArr = [];
    for (let esindexKey in apiConfig.ES_INDEX) {
        let promise = new Promise((resolve, reject) => {
            HTTP.openFieldData(ES.ES_URL + apiConfig.ES_INDEX[esindexKey] + '/_mapping',
                'PUT', true, esUtil.esToken, jsonList)
                .then(res => {
                    let meta = '[' + logUtil.getTime() + '] ' + apiConfig.ES_INDEX[esindexKey] + ' set fielddata=true.';
                    console.log(meta + os.EOL);
                    resolve();
                })
                .catch(err => {
                    console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
                    reject();
                });
        });
        promiseArr.push(promise);
    }
    return promiseArr;
}

module.exports = {
    insertES: insertES,
    initESData: initESData,
    openFieldData: openFieldData
};
