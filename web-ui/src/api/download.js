/**
 * @file  下载页接口配置文件
 * */

import appAjax from '_libs/ajax-utils';
export const downloadList = ({
    manufacturer,
    publishTime
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/download/list',
            type: 'post',
            data: {
                manufacturer,
                publishTime
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