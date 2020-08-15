/**
 * @file sqlUtil.js
 */

/**
 * @param {0} name table name
 * @param {1} args parameters
 * @return sql
 */
function sqlUtil(name, args) {
    this.newsList = 'select * from news_visits';
    this.blogList = 'select * from blog_visits';

    this.select = function (value) {
        return 'select * from ' + name + ' where ' + value;
    };

    this.insertVisits = function (value) {
        return 'insert into ' + name + ' ' + value;
    };
    this.updateVisits = function (value) {
        return 'update ' + name + ' ' + value;
    };
}

module.exports = sqlUtil;