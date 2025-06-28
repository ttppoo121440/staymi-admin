import LocalStorageService from '@/utils/LocalStorageService';
import axios, { AxiosError, AxiosResponse } from 'axios';

const localStorageService = LocalStorageService.getInstance();

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const userCookie = localStorageService.getItem('staymi-token');
    console.log(userCookie);

    if (userCookie) {
      config.headers.Authorization = `Bearer ${userCookie}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosClient;
