import { EmptyResponse } from '@/types/common';
import {
  DeleteFriendsResponse,
  GetFriendsListResponse,
  getFriendsRequestAcceptResponse,
  getFriendsRequestsListResponse,
} from '@/types/friends';
import { baseFetch } from './fetchUtils';

// 이하 나머지도 동일하게 headers 제거
export async function getFriends(id: number): Promise<EmptyResponse> {
  return baseFetch(`/friends/${id}`, { method: 'GET' });
}
export async function deleteFriends(
  id: number
): Promise<DeleteFriendsResponse[]> {
  return baseFetch(`/friends/${id}`, { method: 'DELETE' });
}

// 카카오톡 공유하기 링크
export async function getInviteKakao(): Promise<EmptyResponse> {
  return baseFetch('/friends/invite', {
    method: 'GET',
    credentials: 'include',
  });
}

// 친구 초대 토큰 발급
export async function getInviteKakaoToken(): Promise<{
  invitingUserToken: string;
}> {
  return baseFetch('/friends/invite/token', {
    method: 'GET',
    credentials: 'include',
  });
}

export async function getFriendsList(): Promise<GetFriendsListResponse[]> {
  return baseFetch('/friends/list', { method: 'GET' });
}
export async function getFriendsRequestAccept(
  id: number
): Promise<getFriendsRequestAcceptResponse[]> {
  return baseFetch(`/friends/request/${id}/accept`, { method: 'GET' });
}
export async function getFriendsRequestReject(
  id: number
): Promise<EmptyResponse> {
  return baseFetch(`/friends/request/${id}/reject`, { method: 'GET' });
}
export async function getFriendsRequestsList(): Promise<
  getFriendsRequestsListResponse[]
> {
  return baseFetch('/friends/requests', { method: 'GET' });
}
