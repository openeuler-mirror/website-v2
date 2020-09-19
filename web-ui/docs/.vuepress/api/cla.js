/**
 * @file  签署页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const sigApi = '-cla';
export const signCla = (postData) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: sigApi,
            url: '/cla/',
            type: 'post',
            data: postData,
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