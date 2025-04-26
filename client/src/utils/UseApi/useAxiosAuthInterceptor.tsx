import { useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useAuth } from '../../Hooks/useAuth/useAuth';

export function useAxiosAuthInterceptor() {
  const { logOut, setIsBackendAuthenticated } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          if (setIsBackendAuthenticated && typeof setIsBackendAuthenticated === 'function') {
            setIsBackendAuthenticated(false);
          }
          if (logOut && typeof logOut === 'function') {
            logOut();
          }
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [logOut, setIsBackendAuthenticated]);
}