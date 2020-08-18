/**
 * @file mysqlConfig
 */

const mysqlConfig = {
    host: process.env.MYSQL_URL,
    port: '3306',
    user: 'root',
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE
};

module.exports = mysqlConfig;