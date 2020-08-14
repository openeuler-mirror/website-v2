/**
 * @file logUtil
 */
var fs = require('fs');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator');

// Verify the logs folder
var dir = __dirname.substring(0, __dirname.length - 5);
var logDirectory = path.join(dir, 'logs');
var createLogsDdir = function () {
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
};

var getTime = function () {
    let now = new Date();
    let first = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' ';
    let time = first + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return time;
};

// create a write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

var errorLogfile = FileStreamRotator.getStream({
    filename: path.join(logDirectory, 'error-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

module.exports = {
    createLogsDdir: createLogsDdir,
    getTime: getTime,
    accessLogStream: accessLogStream,
    errorLogfile: errorLogfile
};