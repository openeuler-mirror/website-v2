/**
 * @file  axios工具类
 * */

import axios from 'axios';
import config from '@/config';

let addUrlParam = function (url, paramName, paramValue) {
    if (!url) {
        return url;
    }
    url += ((url.indexOf('?') > 0) ? '&' : '?');
    url += paramName + '=' + paramValue;
    return url;
};

let postJson = params => {
    let api = axios.create({
        baseURL: config.serviceBaseUrl || ''
    });
    api.defaults.headers.post['Content-Type'] = 'application/json';

    // 添加随机数
    params['url'] = addUrlParam(params['url'], 'rnd', Math.random());

    // 请求数据
    let dataStr = params['data'] && ((typeof (params['data']) === 'object')
    ? JSON.stringify(params['data']) : params['data']);

    return api({
        method: params['type'] || 'post',
        url: params['url'],
        data: dataStr,
        params: params['params'],
        responseType: 'json'
    }).then(params['success']).catch(params['error']);
};

let exportsMethods = {
    postJson: params => postJson(params)
};

export default exportsMethods;