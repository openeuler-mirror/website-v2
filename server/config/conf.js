const MAIL_API = 'https://api.openeuler.org/mailman/3.1/';
const MAIL_LIST_URL = MAIL_API + 'domains/openeuler.org/lists?advertised=true';
const MAIL_ADD_URL = MAIL_API + 'members';
const MAIL_USER_PASS = 'restadmin:restpass';

module.exports = {
    MAIL_LIST_URL: MAIL_LIST_URL,
    MAIL_ADD_URL: MAIL_ADD_URL,
    MAIL_USER_PASS: MAIL_USER_PASS
};