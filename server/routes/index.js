/**
 * @file index router
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const path = require('path');
const CONF = require('../config/filePathConfig');

router.get('/', function (req, res, next) {
    res.json({
        code: 200,
        data: 'index'
    });
});

router.get('/docs/menu', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let version = obj.query.version;
    let lang = obj.query.lang;

    let dirPath = path.join(CONF.DOCS_PATH, version, 'docs', 'content', lang, 'menu');
    let data = JSON.parse(fs.readFileSync(dirPath + '/menu.json', 'utf-8'));
    res.json({
        code: 200,
        data: data
    });
});

router.get('/createMenu', function (req, res, next) {
    let obj = url.parse(encodeURI(req.url), true);
    let version = obj.query.version;
    let lang = obj.query.lang;

    let dirPath = path.join(CONF.DOCS_PATH, version, 'docs', 'content', lang, 'menu');
    let lesson = fs.readFileSync(dirPath + '/index.md', 'utf-8');
    let json = [];

    lesson.split(/\r?\n/).forEach(function (line) {
        if (line.indexOf(']({{<') > -1) {
            if (line.indexOf('-') === 0) {
                json.push(getLineArr(line));
            }
            if (line.indexOf('-') === 4) {
                json.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 8) {
                json.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 12) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 16) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
            if (line.indexOf('-') === 20) {
                json.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.slice(-1)[0].child.push(getLineArr(line));
            }
        }
    });

    fs.writeFile(dirPath + '/menu.json', JSON.stringify(json, null, 2), 'utf-8', (err) => {
        if (err == null) {
            res.json({
                code: 200,
                data: 'menu.json create success'
            });
        } else {
            console.log(err.stack);
            res.json({
                code: 201,
                data: 'menu.json create failed'
            });
        }
    });
});

function getLineArr(line) {
    let arr = {
        lable: line.substring(line.indexOf('[') + 1, line.indexOf(']')),
        path: line.substring(line.indexOf('"./') + 3, line.indexOf('.md')),
        child: []
    }
    return arr;
}

module.exports = router;