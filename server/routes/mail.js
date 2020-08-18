/**
 * @file mail router
 */
var express = require('express');
var router = express.Router();
const HTTP = require('../util/httpUtil');
const CONF = require('../config/apiConfig');
const logUtil = require('../util/logUtil');

router.get('/list', function (req, res, next) {
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }

    let token = new Buffer.from(CONF.MAIL_USER_PASS).toString('base64');
    HTTP.getUrl(CONF.MAIL_LIST_URL, token).then(data => {
        res.send(data);
    }).catch(ex => {
        logUtil.errorLogfile.write(ex.stack);
        res.send(HTTP.mailError);
    });
});

router.post('/add', function (req, res) {
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }

    var body = {
        'list_id': req.body.list_id,
        'subscriber': req.body.subscriber,
        'display_name': req.body.display_name,
        'pre_verified': 'true',
        'pre_confirmed': 'false',
        'pre_approved': 'true'
    };
    let token = new Buffer.from(CONF.MAIL_USER_PASS).toString('base64');
    HTTP.postUrl(CONF.MAIL_ADD_URL, token, body).then(data => {
        res.send(data);
    }).catch(ex => {
        logUtil.errorLogfile.write(ex.stack);
        res.send(HTTP.mailError);
    });
});

module.exports = router;