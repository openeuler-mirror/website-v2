/**
 * @file  安全页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const sigApi = '/sig';
export const sigList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: sigApi + '/sigs/',
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