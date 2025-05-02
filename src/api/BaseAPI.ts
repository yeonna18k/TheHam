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
    withCredentials: true,
    ...options,
  });

  if (Object.hasOwn(res, 'data')) return res.data;
  else return res as T;
};
