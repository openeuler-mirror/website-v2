/**
 * @file httpUtil
 */
var request = require('request');
var fs = require('fs');

var mailError = {
    'code': 1,
    'msg': 'Background call mail server exception'
};

function getUrl(url, token) {
    let options = {
        url: url,
        method: 'GET',
        json: true,
        timeout: 3000,
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + token
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error == null) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

function postUrl(url, token, reqBody) {
    let options = {
        url: url,
        method: 'POST',
        json: true,
        timeout: 3000,
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + token
        },
        body: reqBody
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error == null) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

function indexES(url, lang) {
    let json = fs.readFileSync('./search/esIndex.json', 'utf-8');
    let options = {
        url: url,
        method: 'PUT',
        timeout: 3000,
        headers: {
            'Content-type': 'application/json'
        },
        body: json
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error == null) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

function updateES(url, reqBody) {
    let options = {
        url: url,
        method: 'POST',
        json: true,
        timeout: 3000,
        headers: {
            'Content-type': 'application/json'
        },
        body: reqBody
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error == null) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {
    getUrl: getUrl,
    postUrl: postUrl,
    indexES: indexES,
    updateES: updateES,
    mailError: mailError
};