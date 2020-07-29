var request = require('request');

var mailError = {
    "code": 1,
    "msg": "Background call mail server exception"
}

function getUrl (url, token) {
    let options = {
        url: url,
        method: "GET",
        json: true,
        timeout: 30000,
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic " + token
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error);
            }
        });
    });
};

function postUrl(url, token, reqBody) {
    let options = {
        url: url,
        method: "POST",
        json: true,
        timeout: 30000,
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic " + token
        },
        body: reqBody
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error == null) {
                resolve(body)
            } else {
                reject(error);
            }
        });
    });
};

module.exports = {
    getUrl: getUrl,
    postUrl: postUrl,
    mailError: mailError
}