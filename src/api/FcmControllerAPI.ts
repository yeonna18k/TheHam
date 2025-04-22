"use Client" 

import { baseFetch } from './BaseAPI';

// FCM 토큰 전송
export async function FcmController(token: string) {
  return baseFetch<void>('/api/v1/fcm/token', {
    method: 'POST',
    data: { token },
  });
}
