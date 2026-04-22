import axios from 'axios';
import { BASE_URL } from '../config/env';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔥 ADD THIS (MAIN FIX)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const refreshToken = async () => {
  return await API.get('/auth/refresh');
};

const handleAuthError = async (error) => {
  const originalRequest = error.config;

  if (
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry &&
    !originalRequest.url?.includes('/auth/refresh')
  ) {
    originalRequest._retry = true;
    try {
      await refreshToken();
      originalRequest.withCredentials = true;
      return API(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('user');
      window.location.href = '/auth';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

API.interceptors.response.use(
  (response) => response,
  handleAuthError
);

axios.interceptors.response.use(
  (response) => response,
  handleAuthError
);

export default API;
