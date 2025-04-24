import { responseSuccessCode } from '@/config';
import useStatic from '@/models/_global';
import useUser from '@/models/user';
import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://api-dev.prover.xyz';
// axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    // 获取当前钱包地址
    const address = useStatic.getState().address;
    
    // 获取用户状态管理器
    const userStore = useUser.getState();
    
    // 获取当前活跃地址 - 如果未设置则使用钱包地址
    const activeAddress = userStore.activeAddress || address;
    
    // 获取当前活跃地址的用户信息 - 包含签名
    const activeUser = activeAddress ? userStore.getUserByAddress(activeAddress) : undefined;
    const signature = activeUser?.signature;

    // 设置请求头
    config.headers['X-Cysic-Address'] = activeAddress;
    // config.headers['X-Cysic-Admin'] = 'admin'
    config.headers['X-Cysic-Sign'] = signature;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response: any) {
    console.log('axios response', response);
    if(response.request.responseURL.includes('/api/v1/upload')) {
        return response?.data;
    }
    if (![responseSuccessCode, 10024].includes(response?.data?.code)) {
        if (response?.data?.code == 10199) {
            // 签名无效 - 清除当前活跃地址的签名
            const userStore = useUser.getState();
            const address = useStatic.getState().address;
            const activeAddress = userStore.activeAddress || address;
            
            if (activeAddress) {
                // 只清除当前活跃地址的签名，不影响其他地址
                userStore.setSignature(activeAddress, undefined);
            }
            
            toast.error('Invalid Sig, Plz reSign');
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
    console.log('axios error', error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios;