import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// TODO: Add interceptors for request and response
calendarApi.interceptors.request.use(config => {
    config.headers['x-token'] = localStorage.getItem('token') || '';
    return config;
}, error => {
    return Promise.reject(error);
});

export default calendarApi;
