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
  (response) => response,
  async (error: AxiosError) => {
    const initialRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !initialRequest._retry) {
      initialRequest._retry = true;

      try {
        await axios.post(
          `/api/v1/auth/reissue`,
          {},
          {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            withCredentials: true,
          }
        );
        return axiosInstance(initialRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        try {
          await axios.post(
            `/api/v1/auth/logout`,
            {},
            { baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true }
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

// 응답 인터셉터 추가 (선택 사항)
axiosInstance.interceptors.response.use(
  (response) => response.data, // 응답 데이터 반환
  (error) => Promise.reject(error) // 에러 발생 시 처리
);

export default axiosInstance;
