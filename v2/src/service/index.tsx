import { mainUrl } from '@/config';
import useAuthCheck from '@/hooks/useAuthCheck';
import useAuth from '@/models/_global/auth';
import axios from 'axios'
import { toast } from 'react-toastify';


axios.defaults.baseURL = mainUrl;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    const addr = useAuth.getState().currentAddr
    const authMap = useAuth.getState().authMap

    config.headers['X-Cysic-Address'] = authMap?.[addr]?.address
    config.headers['X-Cysic-Sign'] = authMap?.[addr]?.auth

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // 如果接口的url包含 graphql 则直接返回
    if (response.config.url?.includes('/graphql')) {
        return response?.data
    }
    
    if (response?.data?.code != 10000) {
        if (response?.data?.code == 10199) {
            const auth: any = useAuth.getState()
            auth.updateAddress(auth.currentAddr, { valid: false, auth: '' })
            // toast.error('Invalid Sig, Plz reSign')
        }
        throw {
            ...response?.data,
            message: response?.data?.msg
        }
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
}, function (error) {
    console.log('errror',  error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axios