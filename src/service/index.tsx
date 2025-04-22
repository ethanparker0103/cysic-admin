import { mainUrl } from '@/config';
import useStatic from '@/models/_global';
import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://api-dev.prover.xyz';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    const address = useStatic.getState().address
    // const addr = useAuth.getState().currentAddr
    // const authMap = useAuth.getState().authMap

    config.headers['X-Cysic-Address'] = address
    config.headers['X-Cysic-Admin'] = 'admin'
    // config.headers['X-Cysic-Sign'] = authMap?.[addr]?.auth

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    
    if (response?.data?.code != 0) {
        if (response?.data?.code == 10199) {
            // const auth: any = useAuth.getState()
            // auth.updateAddress(auth.currentAddr, { valid: false, auth: '' })
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
    console.log('axios error',  error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axios