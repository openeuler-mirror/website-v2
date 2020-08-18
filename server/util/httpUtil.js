/**
 * @file httpUtil
 */
var request = require('request');
var fs = require('fs');

var mailError = {
    'code': 1,
    'msg': 'Background call mail server exception'
};

var sigError = {
    'code': 1,
    'msg': 'Background call SIG server exception'
};

var authError = {
    'code': 401,
    'msg': 'Unauthorized:Access is denied due to invalid credentials.'
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

function indexES(url, token) {
    let json = fs.readFileSync('./search/esIndex.json', 'utf-8');
    let options = {
        url: url,
        method: 'PUT',
        timeout: 3000,
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + token
        },
        rejectUnauthorized: false,
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

function updateES(url, token, reqBody) {
    let options = {
        url: url,
        method: 'POST',
        json: true,
        timeout: 3000,
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + token
        },
        rejectUnauthorized: false,
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

function getSig(url) {
    let options = {
        url: url,
        method: 'GET',
        json: true,
        timeout: 3000,
        headers: {
            'Content-type': 'application/json'
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

module.exports = {
    getUrl: getUrl,
    postUrl: postUrl,
    indexES: indexES,
    updateES: updateES,
    getSig: getSig,
    mailError: mailError,
    sigError: sigError,
    authError: authError
};