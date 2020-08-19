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

function readFileByPath(dirPath, index, esType, model, version) {
    let token = new Buffer.from(ES.ES_USER_PASS).toString('base64');
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
            content = content.replace(/[\r\n]/g, '');
            let json = {
                'id': '1',
                'title': item.substring(0, item.length - 3),
                'textContent': content,
                'articleName': item,
                'path': dirPath,
                'type': model,
                'version': version
            };
            HTTP.updateES(ES.ES_URL + index + '/' + esType, token, json).then(data => {
                console.log(JSON.stringify(data) + os.EOL);
            }).catch(ex => {
                console.log(ex.stack + os.EOL);
            });
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
    HTTP.updateES(ES.ES_URL + index + '/' + esType + '/_delete_by_query', token, json).then(data => {
        let meta = '[' + logUtil.getTime() + '] delete elasticsearch index.';
        console.log(meta + os.EOL + JSON.stringify(data) + os.EOL);
        readFileByPath(dirPath, index, esType, model, version);
    }).catch(ex => {
        console.log(ex.stack + os.EOL);
    });
}

module.exports = {
    insertES: insertES
};