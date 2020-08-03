/**
 * @file cve router
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('./public/data/cve.json'));

router.post('/list', function(req, res) {
    let page = req.body.page;
    let limit = req.body.pageSize;
    let year = req.body.year;
    let type = req.body.type;
    let keyword = req.body.keyword;

    let lists = [];
    let tempLists = [];
    let newArr = [];
    if (year === '' && type === '' && keyword === '') {
        lists = lesson;
    } else {
        if (type === '') {
            lists = lesson;
        } else {
            lists = lesson.filter((item) => {
                return item.type === type;
            });
        }
        tempLists = lists;
        if (year !== '' && keyword === '') {
            lists = tempLists.filter(item => {
                return item.announcementTime.indexOf(year) > -1;
            });
        } else if (year === '' && keyword !== '') {
            lists = tempLists.filter(item => {
                return item.cveId.indexOf(keyword) > -1;
            });
        } else {
            lists = tempLists.filter(item => {
                return item.cveId.indexOf(keyword) > -1 && item.announcementTime.indexOf(year) > -1;
            });
        }
    }
    let offset = parseInt(page);
    limit = parseInt(limit);
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