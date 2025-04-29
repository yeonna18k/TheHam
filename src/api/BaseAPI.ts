import axiosInstance from './axiosInstance';

export const baseFetch = async <T>(
  path: string,
  options?: {
    headers?: Record<string, string>;
    [key: string]: unknown;
  }
): Promise<T> => {
  const res = await axiosInstance({
    url: path,
    method: (options?.method as 'GET' | 'POST' | 'PUT' | 'DELETE') || 'GET',
    withCredentials: true, // ✅ 추가: 쿠키 자동 전송
    ...options,
  });

  if (Object.hasOwn(res, 'data')) return res.data;
  else return res as T;
};
