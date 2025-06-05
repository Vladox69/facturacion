import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();
const invoiceApi=axios.create({
    baseURL: VITE_API_URL
});

invoiceApi.interceptors.request.use(config=>{
    config.headers = {
        ...config.headers,
        'X-Token':localStorage.getItem('token')
    };
    return config;
});

export default invoiceApi;