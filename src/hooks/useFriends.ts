import { useQuery } from '@tanstack/react-query';
import { SharedKakao, FriendsGetToken } from '@/api/FriendsAPI'; // 경로는 프로젝트에 맞게 조정

// 친구 초대 링크 조회 (카카오 토큰 필요)
export const useSharedKakao = (token: string) => {
  return useQuery({
    queryKey: ['sharedKakao', token],
    queryFn: () => SharedKakao(token),
    enabled: !!token, 
  });
};

// 친구 초대 토큰 발급
export const useFriendsInviteToken = () => {
  return useQuery({
    queryKey: ['friendsInviteToken'],
    queryFn: FriendsGetToken,
  });
};
