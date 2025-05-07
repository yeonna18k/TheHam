import {
  deleteFriends,
  getFriends,
  getFriendsList,
  getFriendsRequestAccept,
  getFriendsRequestReject,
  getFriendsRequestsList,
  getInviteKakao,
  getInviteKakaoToken,
} from '@/api/friendsApi';
import { useMutation, useQuery } from '@tanstack/react-query';

// 카카오 공유하기
export const useSharedKakao = () => {
  return useMutation({
    mutationFn: getInviteKakao,
  });
};

// 친구 초대 토큰 발급
export const useFriendsInviteToken = () => {
  return useMutation({
    mutationFn: getInviteKakaoToken,
  });
};

// 친구 삭제하기
export const useFriendsDelete = () => {
  return useMutation({
    mutationFn: deleteFriends,
  });
};

// 친구 상세목록 조회
export const useFriendsDetail = (id: string) => {
  return useQuery({
    queryKey: ['friendsDetail', id],
    queryFn: () => getFriends(Number(id)),
    enabled: !!id,
  });
};

// 친구 허용
export const useFriendsAccept = () => {
  return useMutation({
    mutationFn: getFriendsRequestAccept,
  });
};

// 친구 거절
export const useFriendsReject = () => {
  return useMutation({
    mutationFn: getFriendsRequestReject,
  });
};

// 친구 요청 목록 조회
export const useFriendsRequestList = () => {
  return useQuery({
    queryKey: ['friendsRequestList'],
    queryFn: getFriendsRequestsList,
  });
};

// 친구 목록 조회
export const useFriendsList = () => {
  return useQuery({
    queryKey: ['friendsList'],
    queryFn: getFriendsList,
  });
};
