/**
 * @file  axios工具类
 * */

import axios from 'axios';
import Vue from 'vue';
const serviceBaseUrl = '/api'

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
        baseURL: serviceBaseUrl || ''
    });
    api.defaults.headers.post['Content-Type'] = 'application/json';

    // 添加随机数
    params['url'] = addUrlParam(params['url'], 'rnd', Math.random());

    // 请求数据
    let dataStr = params['data'] && ((typeof (params['data']) === 'object')
    ? JSON.stringify(params['data']) : params['data']);

    let ajaxParams = {};
    // success方法重载
    ajaxParams['success'] = function (d) {
        const data = typeof d.data == "string" ? JSON.parse(d.data) : d.data;
        if(data){
            params.success(data);
        } else {
            new Vue().$message.error('开小差~请稍后重试。');
        }
    }
    return api({
        method: params['type'] || 'post',
        url: params['url'],
        data: dataStr,
        params: params['params'],
        responseType: 'json'
    }).then(ajaxParams['success']).catch(params['error']);
};

let exportsMethods = {
    postJson: params => postJson(params)
};

export default exportsMethods;