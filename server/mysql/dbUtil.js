/**
 * @file dbUtil.js
 */
var mysql = require('mysql');
var config = require('../config/mysqlConfig');

var pool = mysql.createPool(config);

function query(sql, callback) {
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, rows) {
            callback(err, rows);
            conn.release();
        });
    });
}

function queryByArgs(sql, args, callback) {
    pool.getConnection(function (err, conn) {
        conn.query(sql, args, function (err, rows) {
            callback(err, rows);
            conn.release();
        });
    });
}

module.exports = {
    query: query,
    queryByArgs: queryByArgs
};