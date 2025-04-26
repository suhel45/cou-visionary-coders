import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
  withCredentials: true, // for httpOnly cookies
});

export default axiosInstance;