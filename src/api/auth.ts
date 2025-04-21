import axiosInstance from './axiosInstance';

export const startKakaoLogin = () => {
  window.location.href = 'http://43.202.207.48:8080/oauth2/authorization/kakao';
};

interface KakaoCallbackRequest {
  authorizationCode: string;
}

export const handleKakaoCallback = async (
  authorizationCode: KakaoCallbackRequest
) => {
  try {
    const response = await axiosInstance.get('/auth/kakao/callback', {
      params: { code: authorizationCode },
    });
    return response.data;
  } catch (error) {
    console.error('Error in Kakao callback:', error);
    throw error;
  }
};

export const signInApi = async (email: { email: string }) => {
  try {
    const response = await axiosInstance.post('/auth/signin', {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
