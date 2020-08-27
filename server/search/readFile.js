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

let jsonList = '';

function readFileByPath(dirPath, index, esType, model, version) {
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
    const files = fs.readdirSync(dirPath);
    let i = 0;
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
            content = content.replace(/[\r\n]/g, '');

            let json = {
                'id': i,
                'title': item.substring(0, item.length - 3),
                'textContent': content,
                'articleName': item,
                'path': dirPath,
                'type': model,
                'version': version
            };
            let index = {
                'index': {
                    '_id': model + version + i,
                    '_type': '_doc'
                }
            };
            jsonList += JSON.stringify(index) + os.EOL;
            jsonList += JSON.stringify(json) + os.EOL;
            i++;
        }
    });
}

function insertES(index, esType, dirPath, model, version) {
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
        let meta = '[' + now + ']' + index + ' ' + model + ' delete elasticsearch index.';
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

module.exports = {
    insertES: insertES
};