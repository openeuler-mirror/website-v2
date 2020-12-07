/**
 * @file news router
 */
var express = require('express');
var router = express.Router();

const dbUtil = require('../mysql/dbUtil');
const SqlUtil = require('../mysql/sqlUtil');
const sql = new SqlUtil('news_visits', ['title', 'date', 'lang']);

router.get('/list', function (req, res) {
    dbUtil.query(sql.newsList, function (err, result) {
        if (result) {
            res.json({
                code: 200,
                data: result
            });
        } else {
            console.log(err.stack);
            res.json({
                code: 500,
                msg: err
            });
        }
    });
});

router.post('/visit', function (req, res) {
    let args = [];
    if (req.body.title == null || req.body.title.length === 0) {
        res.json({
            code: 400,
            data: 'title is null'
        });
    } else {
        args.push(req.body.title);
        args.push(req.body.date);
        args.push(req.body.lang);
        dbUtil.queryByArgs(sql.select('title = ? and date = ? and lang = ?'), args, function (err, result) {
            if (result.length === 0) {
                insertNewsVisits(args);
            } else {
                updateNewsVisits(result[0].id);
            }
        });
        res.json({
            code: 200,
            data: 'success'
        });
    }
});

function insertNewsVisits(args) {
    dbUtil.queryByArgs(sql.insertVisits('set title = ?, date = ?, lang = ?,count = 1'), args,
        function (err, result) {});
}

function updateNewsVisits(id) {
    dbUtil.queryByArgs(sql.updateVisits('set count = count + 1 where id = ?'), id, function (err, result) {});
}

router.post('/one', function (req, res) {
    let args = [];
    args.push(req.body.title);
    args.push(req.body.date);
    args.push(req.body.lang);
    dbUtil.queryByArgs(sql.select('title = ? and date = ? and lang = ?'), args, function (err, result) {
        if (err) {
            res.send({
                code: 500,
                data: err
            });
        } else {
            res.send({
                code: 200,
                data: result
            });
        }
    });
});

module.exports = router;