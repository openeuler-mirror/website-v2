/**
 * @file  新闻页浏览次数接口配置文件
 * */

import appAjax from '../libs/ajax-utils';
//1 新闻访问量列表
export const newsVisitList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/news/list',
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
//2 新闻访问量详情
export const newsVisitDetail = ({
    newsTitle,
    newsDate,
    pageLang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/news/one',
            type: 'post',
            data: {
                newsTitle,
                newsDate,
                pageLang
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
// 3增加新闻访问量
export const addVisit = ({
    newsTitle,
    newsDate,
    pageLang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/news/visit',
            type: 'post',
            data: {
                newsTitle,
                newsDate,
                pageLang
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