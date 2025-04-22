"use client"

import { baseFetch } from './BaseAPI';

// 카카오톡 공유하기 링크
export async function SharedKakao(token: string) {
  return baseFetch('/api/v1/friends/invite', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 친구 초대 토큰 발급
export async function FriendsGetToken() {
  return baseFetch('/api/v1/friends/invite/token', {
    method: 'GET',
  });
}
