/*
 * 异步请求
 */
import es6Promise from 'es6-promise';
import axios from 'axios';
import md5 from 'spark-md5';
import loginFail from './loginFail';

es6Promise.polyfill();


// api版本号
const version = 'v11';
const http = axios.create();
const CancelToken = axios.CancelToken;

http.interceptors.request.use((config) => {
    const data = config.data = config.data || {};

    // 获取 xhr.abort 方法
    const _cancelToken = config.cancelToken;
    if (typeof _cancelToken === 'function') {
        config.cancelToken = new CancelToken(_cancelToken);
    }

    // 更新版本号
    config.url = config.url.replace(/\/v\d+\//, `/${version}/`);

    // 加密
    const hash = config.hash;
    if (hash) {
        const t = new Date().getTime();
        const sign = t + 'pcrjy@iyu034!34';
        data.sign = md5.hash(sign);
        data.t = t;
    }

    // 防止浏览器缓存url。如果是get请求，则默认开启清缓存
    const cache = config.cache;
    if (cache === false || (cache === undefined && config.method.toLowerCase() === 'get')) {
        config.params = config.params || {};
        config.params._ = +new Date();
    }
    //
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    // 后台不支持 application/json
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (data) {
        const arr = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        config.data = arr.join('&');
    }

    return config;
}, error => Promise.reject(error));

http.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            const data = response.data;
            const h = data && data.h;
            const code = h && h.code;
            const msg = h && h.msg;
            // 业务数据请求成功
            if (code === 200) {
                response.data = data.b;
            } else {
                response.status = code;
                response.statusText = msg;
                response.data = data;
                if (code === 10 && !response.config.disableAutoLogin) {
                    loginFail();
                } else {
                    return Promise.reject(response);
                }
            }
        }
        return response;
    },
    error => Promise.reject(
        axios.isCancel(error) ? {
            isCancel: true,
            statusText: 'canceled'
        } : error.response
    )
);

export default http;

