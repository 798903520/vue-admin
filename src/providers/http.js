import axios from 'axios';
// import Vue from 'vue';
import Router from '../router'

axios.defaults.timeout = 30000;
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.baseURL = '/api/'

var _token = sessionStorage.getItem('_token') || undefined;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log('config',config)
    // 在发送请求之前做些什么  bug=1的时候,直接放行
    if (config.method == "get"&&config.bug!=1) {
        if (config.params && config.params.token) {
            config.headers.authorization = config.params.token.replace('%20', ' ');
        }
        config.params.token?'':delete config.params.token;
    } else if (config.method == "post"&&config.bug!=1) {

        if (config.data && config.data.token) {
            console.log(config.url,config.data)
            config.headers.authorization = config.data.token.replace('%20', ' ');
        }
        config.data.token?'':delete config.data.token;
    }
    return config;  //添加这一行
})
// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            return response.data.data;
        } else if (response.data.code === 12) {
            if (sessionStorage.getItem('_token')) {
                Router.replace({
                    path: '/health/home'
                })
            } else if (sessionStorage.getItem('merchant_token')) {
                Router.replace({
                    path: '/healthmerchant/readagreement'
                })
            }
        } else if (response.data.code === 422) {
            console.error(`${response.data.code} --> ${response.data.messages}`);
            return Promise.reject(response.data.data);
        } else if (response.data.status == 1) { // 调用高德坐标转换接口
            return response.data
        } else { //[422, 150006, 220401, 921212, 220503, 92121, 220509, 220213, 220410, 50020, 247501, 247500, 220409, 220501, 221303, 955, 993, 220214, 221001, 220212].includes(response.data.code) 返回值放通
            return response.data
        }
    },
    error => {
        if (error.response && error.response.status && error.response.status === 401) {
            if (sessionStorage.getItem('_token') || sessionStorage.getItem('_token') == '') {
                Router.replace({
                    path: '/health/home'
                })
            } else if (sessionStorage.getItem('merchant_token') || sessionStorage.getItem('merchant_token') == '') {
                Router.replace({
                    path: '/healthmerchant/readagreement'
                })
            }
            // new Vue().params(null, null, 'toLogin');
        } else if (error.response && error.response.status && error.response.status === 500) {
            return Promise.reject(error);
        } else if (error.response && error.response.status && error.response.status === 400) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
)

const http = {
    // 封装get请求
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    // 封装post请求
    post(url, data = {}, config) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    setToken(token) {
        if (token) {
            _token = decodeURI(token);
            sessionStorage.setItem('_token', _token);
        } else {
            _token = undefined;
            sessionStorage.removeItem('_token');
        }
    },
    setuuid(uuid) {
        axios.interceptors.request.use(
            config => {
                if (uuid) {
                    config.headers.uuid = uuid;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }
}

export default http
