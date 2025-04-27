import { EmptyResponse, SignUpRequest } from '@/types/auth';
import { baseFetch } from './BaseAPI';

export const startKakaoLogin = () => {
  window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;
};

export const postAuthSignUp = async (
  email: string,
  requestData: SignUpRequest
) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    return await baseFetch<EmptyResponse>(`/auth/signup?email=${email}`, {
      method: 'POST',
      data: {
        nickname: requestData.nickname,
        categories: requestData.categories,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export const getAuthLogout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    return await baseFetch<EmptyResponse>(`/auth/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('로그아웃 에러:', error);
    throw error;
  }
};
