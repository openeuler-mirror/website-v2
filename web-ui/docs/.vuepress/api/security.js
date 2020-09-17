/**
 * @file  安全页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const oldApi = '-old';
export const securityList = ({
    keyword,
    page,
    pageSize,
    type,
    year
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/securitynotice/findAll',
            type: 'post',
            data: {
                keyword,
                type,
                year: year === '0' ? '' : year,
                pages: {
                    page,
                    size: pageSize
                }
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.securityNoticeList
                }
                if (result) {
                    resolve(res);
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
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/cvedatabase/findAll',
            type: 'post',
            data: {
                keyword,
                pages: {
                    page,
                    size: pageSize
                }
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.cveDatabaseList
                }
                if (result) {
                    resolve(res);
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
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/securitynotice/getBySecurityNoticeNo',
            type: 'get',
            params: {
                securityNoticeNo: sn
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/cvedatabase/getByCveId',
            type: 'get',
            params: {
                cveId
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getAffectedProduct = ({
    cveId
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/securitynotice/getByCveId',
            type: 'get',
            params: {
                cveId
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getPackage = ({
    cveId
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/cvedatabase/getPackageByCveId',
            type: 'get',
            params: {
                cveId
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getDownloadUrl = ({
    id
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: oldApi,
            url: '/cve-security-notice-server/securitynotice/getPackageLink',
            type: 'post',
            data: {
                packageName: id
            },
            success(result) {
                if (result) {
                    resolve(result.result[0]);
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