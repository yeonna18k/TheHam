import { baseFetch } from './fetchUtils';

const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  return match ? match[2] : null;
};

// FCM 토큰 전송 (POST)
export async function sendFcmToken(token: string) {
  const accessToken = getAccessTokenFromCookie();
  if (!accessToken) {
    throw new Error('액세스 토큰이 없습니다. 로그인 상태를 확인하세요.');
  }
  return baseFetch<void>('/fcm/token', {
    method: 'POST',
    data: { token },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// FCM 토큰 가져오기 (GET)
export async function getFcmToken() {
  return baseFetch<void>('/fcm/token', {
    method: 'GET',
  });
}

// FCM 토큰 센드
export async function FcmController() {
  return baseFetch<void>('/fcm/send', {
    method: 'GET',
  });
}
