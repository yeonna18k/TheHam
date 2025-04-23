import { baseFetch } from './BaseAPI';

export const startKakaoLogin = () => {
  window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;
};

interface SignUpRequest {
  nickname: string;
  categories: string[];
}
interface SignUpResponse {
  accessToken: string; // 반환 타입 확인
}

export const signUpApi = async (email: string, requestData: SignUpRequest) => {
  try {
    return await baseFetch<SignUpResponse>(`/auth/signup?email=${email}`, {
      method: 'POST',
      data: {
        nickname: requestData.nickname,
        categories: requestData.categories,
      },
    });
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const logoutApi = async () => {
  try {
    return await baseFetch<unknown>(`/auth/logout`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
