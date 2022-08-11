/**
 * @file  搜索页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const search = ({
   keyword,
   type,
   lang,
   version,
   page,
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: '-search',
            url: '/search/docs',
            type: 'post',
            data: {
                keyword,
                type: type == 'all' ? '' : type,
                lang,
                version,
                page,
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

export const searchTags = ({
   lang,
   keyword,
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: '-search',
            url: '/search/count',
            type: 'post',
            data: {
                keyword,
                lang,
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

export const repoSearch = ({
    keyword
 }) => {
     return new Promise((resolve, reject) => {
         appAjax.postJson({
             url: '/repo/search',
             type: 'get',
             params: {
                 keyword
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