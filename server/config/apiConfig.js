/**
 * @file apiConfig
 */

const MAIL_API = 'https://api.openeuler.org/mailman/3.1/';
const MAIL_LIST_URL = MAIL_API + 'domains/openeuler.org/lists?advertised=true';
const MAIL_ADD_URL = MAIL_API + 'members';
const MAIL_USER_PASS = process.env.MAIL_USER_PASS;
const SIG_API = process.env.SIG_API;
const API_USER_PASS = process.env.API_USER_PASS;
const API_AUTH = 'Basic ' + new Buffer.from(process.env.API_USER_PASS).toString('base64');
const STATISTICS_URL = process.env.STATISTICS_URL;
const ES_INDEX = {
    zh: 'openeuler_articles',
    en: 'openeuler_articles_en',
    ru: 'openeuler_articles_ru'
};
const ES_REINDEX = {
    zh: 're_openeuler_articles',
    en: 're_openeuler_articles_en',
    ru: 're_openeuler_articles_ru'
};
module.exports = {
    MAIL_LIST_URL: MAIL_LIST_URL,
    MAIL_ADD_URL: MAIL_ADD_URL,
    MAIL_USER_PASS: MAIL_USER_PASS,
    SIG_API: SIG_API,
    API_USER_PASS: API_USER_PASS,
    API_AUTH: API_AUTH,
    STATISTICS_URL: STATISTICS_URL,
    ES_INDEX,
    ES_REINDEX
};
