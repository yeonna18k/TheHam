import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const initialRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !initialRequest._retry) {
      initialRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
          {},
          {
            withCredentials: true,
          }
        );
        return axiosInstance(initialRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            {},
            { withCredentials: true }
          );
        } catch (logoutError) {
          console.error('Logout failed:', logoutError);
        } finally {
          window.location.href = '/auth/signin';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
