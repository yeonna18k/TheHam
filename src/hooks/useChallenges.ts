import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GetChallenge,
  CreateChallenge,
  DetailChallenge,
  ChangeChallenge,
  DeleteChallenge,
  ExitChallenge,
  ParticipantChallenge,
  InvitingChallenge,
  AcceptChallenge,
  RejectChallenge, 
  getInvitations,
  NewChallenges,
  PopularChallenges,
} from '@/api/ChallengeAPI';
import { GetChallengeParams, CreateChallengeParams, PopularChallenge } from '@/types/challenge';

// 챌린지 목록 조회
export const useGetChallenge = (params: GetChallengeParams) =>
  useQuery({
    queryKey: ['challenges', params],
    queryFn: () => GetChallenge(params),
  });

// 챌린지 상세 조회
export const useDetailChallenge = (id: number) =>
  useQuery({
    queryKey: ['challengeDetail', id],
    queryFn: () => DetailChallenge(id),
    enabled: !!id,
  });

// 챌린지 생성
export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateChallengeParams) => CreateChallenge(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

// 챌린지 수정
export const useChangeChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, params }: { id: number; params: CreateChallengeParams }) =>
      ChangeChallenge(id, params),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['challengeDetail', id] });
    },
  });
};

// 챌린지 삭제
export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

// 신규 챌린지 조회
export const useNewChallenges = () =>
  useQuery<PopularChallenge[]>({
    queryKey: ['newChallenges'],
    queryFn: NewChallenges,
  });


// 인기 챌린지 조회
export function usePopularChallenges() {
  return useQuery<PopularChallenge[]>({
    queryKey: ["popularChallenges"],
    queryFn: PopularChallenges,
  });
}

// 챌린지 퇴장
export const useExitChallenge = () =>
  useMutation({
    mutationFn: ExitChallenge,
  });

// 챌린지 참여
export const useParticipantChallenge = () =>
  useMutation({
    mutationFn: ParticipantChallenge,
  });

// 챌린지 초대
export const useInvitingChallenge = () =>
  useMutation({
    mutationFn: InvitingChallenge,
  });

// 초대 수락
export const useAcceptChallenge = () =>
  useMutation({
    mutationFn: AcceptChallenge,
  });

// 초대 거절
export const useRejectChallenge = () =>
  useMutation({
    mutationFn: RejectChallenge,
  });

// 초대 목록
export const useInviteList = () =>
  useQuery({
    queryKey: ['challengeInvites'],
    queryFn: () => getInvitations,
  });