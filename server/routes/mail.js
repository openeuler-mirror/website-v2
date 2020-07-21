// mail router
var express = require('express');
var router = express.Router();
const HTTP = require('../util/httpUtil');
const CONF = require('../config/conf');

router.get('/list', function (req, res, next) {
    HTTP.getUrl(CONF.MAIL_LIST_URL).then(data => {
        res.send(data);
    }).catch(ex => {
        console.log(ex);
        res.send(HTTP.mailError);
    });
});

router.post('/add', function (req, res) {
    let token = new Buffer.from(CONF.MAIL_USER_PASS).toString('base64');
    HTTP.postUrl(CONF.MAIL_ADD_URL, token, req.body).then(data => {
        res.send(data);
    }).catch(ex => {
        console.log(ex);
        res.send(HTTP.mailError);
    });
});

module.exports = router;