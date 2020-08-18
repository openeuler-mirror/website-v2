/**
 * @file cve router
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
const CONF = require('../config/apiConfig');
const HTTP = require('../util/httpUtil');
const lesson = JSON.parse(fs.readFileSync('./public/data/cve.json'));

router.post('/detail', function (req, res) {
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }

    let cveId = req.body.cveId;
    let lists = lesson.filter(item => {
        return item.cveId.indexOf(cveId) > -1;
    });
    res.send({
        list: lists
    });
});

router.post('/list', function (req, res) {
    if (req.headers.authorization !== CONF.API_AUTH) {
        res.send(HTTP.authError);
        return;
    }
    let page = req.body.page;
    let limit = req.body.pageSize;
    let keyword = req.body.keyword;
    let lists = [];
    let newArr = [];
    if (keyword !== '') {
        lists = lesson.filter(item => {
            return item.cveId.indexOf(keyword) > -1;
        });
    } else {
        lists = lesson;
    }
    let offset = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (offset <= 1) {
        offset = 0;
        page = 1;
    } else {
        offset = (offset - 1) * limit;
    }
    let totalRecords = lists.length;
    newArr = lists.slice(offset, offset + limit);
    res.send({
        page: page,
        pageSize: limit,
        totalRecords: totalRecords,
        list: newArr
    });
});

module.exports = router;