/**
 * @file news router
 */
var express = require('express');
var os = require('os');
var router = express.Router();

const httpUtil = require('../util/httpUtil');
var esUtil = require('../util/esParams');
const logUtil = require('../util/logUtil');
const apiConfig = require('../config/apiConfig');
const ES = require('../config/searchConfig');

router.get('/list', function (req, res) {
    let url = ES.ES_URL;
    for (let key in apiConfig.ES_REINDEX) {
        url += apiConfig.ES_REINDEX[key] + ',';
    }
    url += '/_search';
    let json = esUtil.getSearchViewsReqJson('news', 'list');
    httpUtil.getViews(url, 'GET', false, esUtil.esToken, json).then(data => {
        let response = esUtil.getSearchViewsResJson('list', data);
        res.json({
            code: 200,
            data: response
        });
    }).catch(ex => {
        console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        res.json({
            code: 500,
            data: ex.stack
        });
    });
});

router.post('/visit', function (req, res) {
    if (req.body.title == null || req.body.title.length === 0) {
        res.json({
            code: 400,
            data: 'title is null'
        });
    } else {
        let title = req.body.title;
        let lang = req.body.lang;
        let indexEs = apiConfig.ES_REINDEX[lang];
        let url = ES.ES_URL + indexEs + '/_search';
        let json = esUtil.getSearchViewsReqJson('news', 'one', title);
        httpUtil.getViews(url, 'GET', false, esUtil.esToken, json).then(data => {
            let newData = JSON.parse(data);
            if (newData.hits.hits.length) {
                let url = ES.ES_URL + indexEs + '/_update/' + newData.hits.hits[0]._id;
                let updateViewJson = esUtil.getUpdateViewJson();
                httpUtil.updateViews(url, 'POST', false, esUtil.esToken, updateViewJson).then(data => {
                    res.json({
                        code: 200,
                        data: 'success'
                    });
                }).catch(err => {
                    console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
                    res.json({
                        code: 500,
                        data: err.stack
                    });
                });
            } else {
                let addDataJson = esUtil.getAddDataReqJson(title, 1, 'news');
                let addDocUrl = ES.ES_URL + indexEs + '/_doc';
                httpUtil.addDataToReindex(addDocUrl, 'POST', false, esUtil.esToken, addDataJson).then(data => {
                    res.json({
                        code: 200,
                        data: 'success'
                    });
                }).catch(err => {
                    console.log('[' + logUtil.getTime() + ']' + err.stack + os.EOL);
                    res.json({
                        code: 500,
                        data: err.stack
                    });
                });
            }
        }).catch(ex => {
            console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
            res.json({
                code: 500,
                data: ex.stack
            });
        });
    }
});

router.post('/one', function (req, res) {
    let title = req.body.title;
    let lang = req.body.lang;
    let indexEs = apiConfig.ES_REINDEX[lang];
    let url = ES.ES_URL + indexEs + '/_search';
    let json = esUtil.getSearchViewsReqJson('news', 'one', title);
    httpUtil.getViews(url, 'GET', false, esUtil.esToken, json).then(data => {
        let response = esUtil.getSearchViewsResJson('one', data);
        res.json({
            code: 200,
            data: response
        });
    }).catch(ex => {
        console.log('[' + logUtil.getTime() + ']' + ex.stack + os.EOL);
        res.json({
            code: 500,
            data: ex.stack
        });
    });
});

module.exports = router;
