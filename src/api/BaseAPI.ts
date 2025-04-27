import axiosInstance from './axiosInstance';

export const baseFetch = async <T>(
  path: string,
  options?: {
    headers?: Record<string, string>;
    [key: string]: unknown;
  }
): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const res = await axiosInstance({
    url: path,
    method: (options?.method as 'GET' | 'POST' | 'PUT' | 'DELETE') || 'GET', // 기본값 GET
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      ...options?.headers, // 추가적인 헤더가 있을 경우 병합
    },
    ...options,
  });

  if (Object.hasOwn(res, 'data')) return res.data;
  else return res as T;
};
