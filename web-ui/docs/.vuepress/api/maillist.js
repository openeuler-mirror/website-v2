/**
 * @file  邮件列表页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const mailList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: 'http://159.138.45.71/mail/list',
            type: 'get',
            success(result) {
                if (result) {
                    resolve(result);
                    return;
                }
                reject(result);
            },
            error(msg) {
                reject(msg);
            }

        });

    });
};