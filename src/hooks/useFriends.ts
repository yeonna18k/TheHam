import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  SharedKakao, 
  FriendsGetToken, 
  FriendsAccept, 
  FriendsDelete, 
  FriendsDetail, 
  FriendsList, 
  FriendsReject, 
  FriendsRequestList 
} from '@/api/FriendsAPI'; // 경로는 프로젝트에 맞게 조정

// 카카오 공유하기
export const useSharedKakao = () => {
  return useMutation({
    mutationFn: SharedKakao,
  });
};

// 친구 초대 토큰 발급
export const useFriendsInviteToken = () => {
  return useMutation({
    mutationFn: FriendsGetToken,
  });
};

// 친구 삭제하기
export const useFriendsDelete = () => {
  return useMutation({
    mutationFn: FriendsDelete,
  });
};

// 친구 상세목록 조회
export const useFriendsDetail = (id: string) => {
  return useQuery({
    queryKey: ['friendsDetail', id],
    queryFn: () => FriendsDetail(Number(id)),
    enabled: !!id,
  });
};

// 친구 허용
export const useFriendsAccept = () => {
  return useMutation({
    mutationFn: FriendsAccept,
  });
};

// 친구 거절
export const useFriendsReject = () => {
  return useMutation({
    mutationFn: FriendsReject,
  });
};

// 친구 요청 목록 조회
export const useFriendsRequestList = () => {
  return useQuery({
    queryKey: ['friendsRequestList'],
    queryFn: FriendsRequestList,
  });
};

// 친구 목록 조회
export const useFriendsList = () => {
  return useQuery({
    queryKey: ['friendsList'],
    queryFn: FriendsList,
  });
};