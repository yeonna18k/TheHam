'use client';

import { baseFetch } from './fetchUtils';

// 카카오톡 공유하기 링크 – 이제 토큰 헤더 불필요
export async function SharedKakao() {
  return baseFetch('/friends/invite', {
    method: 'GET',
    credentials: 'include',
  });
}

// 친구 초대 토큰 발급 – 토큰 헤더 불필요
export async function FriendsGetToken() {
  return baseFetch<{ invitingUserToken: string }>('/friends/invite/token', {
    method: 'GET',
    credentials: 'include',
  });
}

// 이하 나머지도 동일하게 headers 제거
export async function FriendsDelete(id: number) {
  return baseFetch(`/friends/${id}`, { method: 'DELETE' });
}
export async function FriendsDetail(id: number) {
  return baseFetch(`/friends/${id}`, { method: 'GET' });
}
export async function FriendsList() {
  return baseFetch('/friends/list', { method: 'GET' });
}
export async function FriendsAccept(id: number) {
  return baseFetch(`/friends/request/${id}/accept`, { method: 'GET' });
}
export async function FriendsReject(id: number) {
  return baseFetch(`/friends/request/${id}/reject`, { method: 'GET' });
}
export async function FriendsRequestList() {
  return baseFetch('/friends/requests', { method: 'GET' });
}
