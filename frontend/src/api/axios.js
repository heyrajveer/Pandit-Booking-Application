import axios from 'axios';
import { BASE_URL } from '../config/env';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Attach token safely
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔁 refresh token
const refreshToken = async () => {
  return await API.get('/auth/refresh');
};

// ⚠️ handle 401
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

      return API(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('token'); // ❗ fix here (not 'user')
      window.location.href = '/auth';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

// ✅ use only API interceptor
API.interceptors.response.use(
  (response) => response,
  handleAuthError
);

export default API;