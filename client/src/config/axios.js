import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:3001/'
});

const token = localStorage.getItem('token');

axiosInstance.defaults.headers.common['x-access-token'] = token;

export default axiosInstance;

