import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Update as needed
  withCredentials: true, // Important for httpOnly cookies
});

export default axiosInstance;