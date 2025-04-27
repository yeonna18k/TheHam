"use client";

import { baseFetch } from './BaseAPI';

// FCM 토큰 전송 (POST)
export async function sendFcmToken(token: string) {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('액세스 토큰이 없습니다. 로그인 상태를 확인하세요.');
  } else {
    console.log('액세스 토큰:', accessToken);
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

