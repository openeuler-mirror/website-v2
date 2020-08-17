/**
 * @file index router
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        code: 200,
        data: 'index'
    });
});

module.exports = router;