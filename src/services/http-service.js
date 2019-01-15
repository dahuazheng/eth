import axios from 'axios';
import qs from 'qs';
import { Indicator } from 'mint-ui';
import Cookies from 'js-cookie'

let defaults = {
    // baseUrl: '/',
    headers: {
        //'X-Requested-With': 'XMLHttpRequest',
        //'Content-Type': 'application/json; charset=UTF-8',
        // 'Authorization': 'Bearer ' + Cookies.get('client-token')
    },
    timeout: 100000
};
// 定义请求变量
let needLoadingRequestCount = 0;
axios.interceptors.request.use(config => {
    config.headers.Accept = 'application/json, text/plain, */*';
    config.paramsSerializer = (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    };
    return config;
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    if(response && response.status == 401){
        // Cookies.remove('client-token', { path: '/' });
        window.location.reload()
    }
    return Promise.resolve(response);
}, error => {
    if (error && error.response) {
        if(error.response.status == 401){
            // Cookies.remove('client-token', { path: '/' });
            window.location.reload()
        }
    } else {
        error.response = {
            status: 400,
            statusText: '连接到服务器失败'
        };
    }
    return Promise.reject(error.response)
});

const httpService = {};

['get', 'post', 'put', 'delete'].forEach((method)=> {
    httpService[method] =  (url, data) => {
        typeof url === 'object' ? ( (data = url) && (url = data.url)) : '';
        data = data || {};
        let headers = Object.assign({}, defaults.headers, data.headers);
        let responseType = data.responseType;
        ['headers', 'responseType'].forEach(fv=>{
            delete data[fv];
        });

        return new Promise((resolve, reject) => {
            let dataParams = {
                method: method,
                baseURL: defaults.baseUrl,
                url: url,
                data: data,

                params: data,
                timeout: defaults.timeout,
                headers: headers,
                responseType: responseType
            };
            if(method !== 'get'){
                delete dataParams.params;
            }
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            needLoadingRequestCount ++ ;
            axios(dataParams).then(
                (response) => {
                    needLoadingRequestCount -- ;
                    setTimeout(()=>{
                        if(needLoadingRequestCount < 1){
                            Indicator.close();
                        }
                    }, 300)
                    if(response.status < 300){
                        resolve(response.data);
                    }else{
                        reject(new Error(`${response.status}: ${response.statusText}`))
                    }
                }
            ).catch(
                (error) => {
                    needLoadingRequestCount -- ;
                    setTimeout(()=>{
                        if(needLoadingRequestCount < 1){
                            Indicator.close();
                        }
                    }, 300)
                    reject(error)
                }
            )
        })
    }
});

export default httpService;
