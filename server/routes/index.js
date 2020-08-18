/**
 * @file index router
 */
var express = require('express');
var router = express.Router();
const CONF = require('../config/apiConfig');
const HTTP = require('../util/httpUtil');
router.get('/', function (req, res, next) {
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }

    res.json({
        code: 200,
        data: 'index'
    });
});

module.exports = router;