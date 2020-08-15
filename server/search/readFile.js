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
            HTTP.updateES(ES.ES_URL + index + '/' + esType, json).then(data => {}).catch(ex => {
                logUtil.errorLogfile.write(ex.stack + os.EOL);
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
    HTTP.updateES(ES.ES_URL + index + '/' + esType + '/_delete_by_query', json).then(data => {
        let meta = '[' + logUtil.getTime() + '] delete elasticsearch index.';
        logUtil.errorLogfile.write(meta + os.EOL + JSON.stringify(data) + os.EOL);
        logUtil.errorLogfile.write('[' + logUtil.getTime() + '] update elasticsearch index start.' + os.EOL);
        readFileByPath(dirPath, index, esType, model, version);
        logUtil.errorLogfile.write('[' + logUtil.getTime() + '] update elasticsearch index finished.' + os.EOL);
    }).catch(ex => {
        logUtil.errorLogfile.write(ex.stack + os.EOL);
    });
}

module.exports = {
    insertES: insertES
};