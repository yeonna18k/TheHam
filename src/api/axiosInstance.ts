// api/axiosInstance.ts
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://43.202.207.48:8080', // 서버의 기본 URL
  timeout: 10000, // 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가 (토큰 자동 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가 (선택 사항)
axiosInstance.interceptors.response.use(
  (response) => response.data, // 응답 데이터 반환
  (error) => Promise.reject(error) // 에러 발생 시 처리
);

export default axiosInstance;
