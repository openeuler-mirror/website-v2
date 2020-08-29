/**
 * @file  搜索页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const search = ({
   keyword,
   model,
   indexEs,
   openeulerArticles,
   page,
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/search/keyword',
            type: 'post',
            data: {
                keyword,
                model,
                indexEs,
                openeuler_articles: openeulerArticles,
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