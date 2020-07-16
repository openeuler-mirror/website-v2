// iso router
var express = require('express');
var isoRouter = express.Router();
var fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('./public/data/iso.json'));

isoRouter.get('/', function (req, res, next) {
    res.send('iso download');
});

isoRouter.get('/vendor', function (req, res, next) {
    let list = [];
    lesson.forEach(item => {
        if (list.indexOf(item.vendor) === -1) {
            list.push(item.vendor);
        }
    });
    res.send(list);
});

isoRouter.get('/releaseDate', function (req, res, next) {
    let list = [];
    lesson.forEach(item => {
        if (list.indexOf(item.releaseDate) === -1) {
            list.push(item.releaseDate);
        }
    });
    res.send(list);
});

isoRouter.post('/list', function (req, res) {
    let vendor = req.body.vendor;
    let releaseDate = req.body.releaseDate;
    let lst = req.body.LST;

    let lists = [];
    if (vendor === '' && releaseDate === '' && lst === '') {
        lists = lesson;
    } else {
        if (lst === '') {
            lists = lesson;
        } else {
            lists = lesson.filter((item) => {
                return item.LST === lst;
            });
        }

        let tempLists = lists;
        if (releaseDate !== '' && vendor === '') {
            lists = tempLists.filter(item => {
                return item.releaseDate.indexOf(releaseDate) > -1;
            });
        } else if (releaseDate === '' && vendor !== '') {
            let vendorArr = vendor.split(',');
            lists = tempLists.filter(item => {
                let checked = false;
                vendorArr.forEach(vendor => {
                    checked = checked || item.vendor.indexOf(vendor) > -1;
                });
                return checked;
            });
        } else {
            let vendorArr = vendor.split(',');
            lists = tempLists.filter(item => {
                let checked = false;
                vendorArr.forEach(vendor => {
                    checked = checked || item.vendor.indexOf(vendor) > -1;
                });
                return item.releaseDate.indexOf(releaseDate) > -1 && checked;
            });
        }
    }

    res.send({
        records: lists.length,
        list: lists
    });
});

module.exports = isoRouter;