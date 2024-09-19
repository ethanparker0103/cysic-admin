import { mainUrl } from '@/config';
import axios from 'axios'

axios.defaults.baseURL = mainUrl;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    // config.headers['X-cysis-chain-id'] = defaultChainId
    // config.headers['X-cysis-timestamp'] = +dayjs().utc().unix()

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    console.log('response', response)
    if(response?.data?.code != 10000){
        throw {
            ...response?.data,
            message: response?.data?.msg
        }
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axios