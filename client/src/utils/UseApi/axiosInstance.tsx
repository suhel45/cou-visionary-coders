import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // for httpOnly cookies
});

export default axiosInstance;