/**
 * @file blog router
 */
var express = require('express');
var router = express.Router();

var dbUtil = require('../mysql/dbUtil');
var SqlUtil = require('../mysql/sqlUtil');
const sql = new SqlUtil('docs_reviews', ['name', 'path', 'lang', 'version', 'stars', 'createTime']);

router.post('/reviews', function (req, res) {
    let args = [];
    if (req.body.name == null || req.body.path == null) {
        res.json({
            code: 400,
            data: 'name or path is null'
        });
    } else {
        args.push(req.body.name);
        args.push(req.body.path);
        args.push(req.body.lang);
        args.push(req.body.version);
        args.push(req.body.stars);
        dbUtil.queryByArgs(sql.insertReviews('set name = ?, path = ?, lang = ?,version = ?,stars = ?,createTime = now()'), args,
            function (err, result) {});
        res.json({
            code: 200,
            data: 'success'
        });
    }
});

module.exports = router;