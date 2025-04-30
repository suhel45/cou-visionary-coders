import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const fetchBiodataCreated = async () => {
  const response = await axios.get(`${BASE_URL}/api/profile/biodata`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchIdCardStatus = async () => {
  const response = await axios.get(`${BASE_URL}/api/identity/status`, {
    withCredentials: true,
  });
  return response.data;
};
