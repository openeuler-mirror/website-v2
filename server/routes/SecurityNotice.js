/**
 * @file SecurityNotice router
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('./public/data/SecurityNotice.json'));

router.post('/detail', function (req, res) {
    let sn = req.body.sn;
    let lists = lesson.filter(item => {
        return item.securityNoticeNo.indexOf(sn) > -1;
    });
    res.send({
        list: lists
    });
});

router.post('/list', function (req, res) {
    let page = req.body.page;
    let limit = req.body.pageSize;
    let year = req.body.year;
    let type = req.body.type;
    let keyword = req.body.keyword;

    let lists = lesson;
    let newArr = [];
    if (year !== '') {
        lists = lists.filter(item => {
            return item.announcementTime.indexOf(year) > -1;
        });
    }
    if (type !== '') {
        lists = lists.filter(item => {
            return item.type === type;
        });
    }
    if (keyword !== '') {
        lists = lists.filter(item => {
            return item.securityNoticeNo.indexOf(keyword) > -1;
        });
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