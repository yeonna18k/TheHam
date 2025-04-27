import axiosInstance from './axiosInstance';

const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  return match ? match[2] : null;
};

export const baseFetch = async <T>(
  path: string,
  options?: {
    headers?: Record<string, string>;
    [key: string]: unknown;
  }
): Promise<T> => {
  // 쿠키에서 토큰 가져오기
  const token = getAccessTokenFromCookie();
  
  // Authorization 헤더에 토큰 추가
  const headers = {
    ...options?.headers,
    ...(token && { Authorization: `Bearer ${token}` }), // 토큰이 있으면 Authorization 헤더 추가
  };

  const res = await axiosInstance({
    url: path,
    method: (options?.method as 'GET' | 'POST' | 'PUT' | 'DELETE') || 'GET', // 기본값 GET
    headers, // 헤더 추가
    ...options,
  });

  if (Object.hasOwn(res, 'data')) return res.data;
  else return res as T;
};
