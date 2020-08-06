/**
 * @file  安全页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const securityList = ({
    keyword,
    page,
    pageSize,
    type,
    year
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/securityNotice/list',
            type: 'post',
            data: {
                keyword,
                page,
                pageSize,
                type,
                year
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


export const cveList = ({
    keyword,
    page,
    pageSize
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/cve/list',
            type: 'post',
            data: {
                keyword,
                page,
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

export const securityDetail = ({
    sn
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/securityNotice/detail',
            type: 'post',
            data: {
                sn
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

export const cveDetail = ({
    cveId
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/cve/detail',
            type: 'post',
            data: {
                cveId
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