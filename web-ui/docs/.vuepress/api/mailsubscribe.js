/**
 * @file  邮件列表页订阅接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const subscribe = ({
    list_id
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: 'http://159.138.45.71/mail/add',
            type: 'post',
            data: {
                list_id
            },
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