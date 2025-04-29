// serverFetch.ts
import { headers } from 'next/headers';

// 서버 컴포넌트에서 사용할 fetch 함수 (네이티브 fetch 활용)
export const serverFetch = async <T>(
  path: string,
  options?: {
    headers?: Record<string, string>;
    method?: string;
    body?: any;
  }
): Promise<T> => {
  // 환경 변수에서 API URL 가져오기
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com';
  const fullUrl = `${baseURL}${path}`;

  // 요청 헤더 구성
  const headersList = headers();
  const cookie = headersList.get('cookie') || '';

  // fetch 요청 옵션 설정
  const fetchOptions: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie, // 클라이언트의 쿠키를 서버 요청에 포함
      ...options?.headers,
    },
    // 캐시 방지 (필요에 따라)
    cache: 'no-store',
  };

  // body가 있으면 추가
  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('서버 fetch 오류:', error);
    throw error;
  }
};
