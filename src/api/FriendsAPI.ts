"use client"

import { baseFetch } from './BaseAPI';

const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  return match ? match[2] : null;
};

// 카카오톡 공유하기 링크
export async function SharedKakao(token: string) {
  return baseFetch('/friends/invite', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 친구 초대 토큰 발급
export async function FriendsGetToken() {
  const token = getAccessTokenFromCookie();
  if (!token) {
    throw new Error('No access token found in cookies.');
  }

  return baseFetch('/friends/invite/token', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // 쿠키에서 토큰 가져와서 헤더에 추가
    },
  });
}

// 친구 삭제하기 
export async function FriendsDelete(id: number) {
  return baseFetch(`/friends/${id}`, {
    method: 'DELETE',
  });
}

// 친구 상세목록 조회
export async function FriendsDetail(id: number) {
  return baseFetch(`/friends/${id}`, {
    method: 'GET',
  });
}

// 친구 목록 반환
export async function FriendsList() {
  return baseFetch('/friends/list', {
    method: 'GET',
  });
}

// 친구 요청 승낙
export async function FriendsAccept(id: number) {
  return baseFetch(`/friends/request/${id}/accept`, {
    method: 'GET',
  });
}

// 친구 요청 거절 
export async function FriendsReject(id: number) {
  return baseFetch(`/friends/request/${id}/reject`, {
    method: 'GET',
  });
}

// 친구 요청 목록 반환
export async function FriendsRequestList() {
  return baseFetch('/friends/requests', {
    method: 'GET',
  });
}