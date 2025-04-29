import axiosInstance from './axiosInstance';

// 쿠키에서 액세스 토큰 가져오기
const getAccessTokenFromCookie = (): string | null => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    return match ? match[2] : null;
  }
  return null;
};

// baseFetch 함수
export const baseFetch = async <T>(
  path: string,
  options?: {
    headers?: Record<string, string>;
    [key: string]: unknown;
  }
): Promise<T> => {
  const token = getAccessTokenFromCookie();

  // Authorization 헤더를 URL 인코딩으로 처리
  const headers = {
    ...options?.headers, // 기존 헤더 병합
    Authorization: token ? `Bearer ${encodeURIComponent(token)}` : undefined,
  };

  const res = await axiosInstance({
    url: path,
    method: (options?.method as 'GET' | 'POST' | 'PUT' | 'DELETE') || 'GET', // 기본값 GET
    headers: headers, // 수정된 헤더 사용
    ...options, // 나머지 옵션들
  });

  if (Object.hasOwn(res, 'data')) return res.data;
  else return res as T;
};
