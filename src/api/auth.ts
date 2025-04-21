import { baseFetch } from './BaseAPI';

export const startKakaoLogin = () => {
  window.location.href = 'http://43.202.207.48:8080/oauth2/authorization/kakao';
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
