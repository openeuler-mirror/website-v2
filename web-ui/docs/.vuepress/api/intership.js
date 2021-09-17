/**
 * @file  首页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const sigApi = '-intership';

export const rankList = ({
     token,
     currentPage,
     pageSize
 }) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: sigApi,
            url: '/intern/points/lists/',
            type: 'get',
            params: {
                token,
                currentPage,
                pageSize
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