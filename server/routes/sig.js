/**
 * @file sig router
 */
var express = require('express');
var router = express.Router();
const HTTP = require('../util/httpUtil');
const CONF = require('../config/apiConfig');

router.get('/group', function (req, res, next) {
    HTTP.getSig(CONF.SIG_API).then(data => {
        res.send(data);
    }).catch(ex => {
        console.log(ex.stack);
        res.send(HTTP.sigError);
    });
});

module.exports = router;