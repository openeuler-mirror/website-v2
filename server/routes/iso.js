var express = require('express');
var router = express.Router();
var fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('./public/data/iso.json'));

router.get('/', function (req, res, next) {
  res.send('iso download');
});

router.post('/list', function (req, res) {
  let vendor = req.body.vendor;
  let releaseData = req.body.releaseData;
  let lst = req.body.LST;

  let lists = [];
  if (vendor === "" && releaseData === "" && lst === "") {
    lists = lesson;
  } else {
    if (lst === "") {
      lists = lesson;
    } else {
      lists = lesson.filter((item) => {
        return item.LST === lst;
      });
    }

    let tempLists = lists;
    if (releaseData !== "" && vendor === "") {
      lists = tempLists.filter((item => {
        return item.releaseData.indexOf(releaseData) > -1;
      }));
    } else if (releaseData === "" && vendor !== "") {
      lists = tempLists.filter((item) => {
        return item.vendor.indexOf(vendor) > -1;
      });
    } else {
      lists = tempLists.filter((item) => {
        return item.releaseData.indexOf(releaseData) > -1 && item.vendor.indexOf(vendor) > -1;
      });
    }
  }

  res.send({
    records: lists.length,
    list: lists
  });
});

module.exports = router;