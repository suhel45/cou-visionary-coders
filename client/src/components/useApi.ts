import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
  } from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  const useApi = (): AxiosInstance => {
    const navigate = useNavigate();
  
    const api = axios.create({
      baseURL: 'http://localhost:3000',
    });
  
    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  
    api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  
    return api;
  };
  
  export default useApi;
  