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
  name, // 초대 목록
} from '@/api/ChallengeAPI';

// 챌린지 목록 조회
export const useGetChallenge = (title: string, text: string, page: number, size: number) =>
  useQuery({
    queryKey: ['challenges', title, text, page, size],
    queryFn: () => GetChallenge(title, text, page, size),
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
    mutationFn: (params: Parameters<typeof CreateChallenge>[0]) =>
      CreateChallenge(...(params as unknown as [string, string, string, number, number, string, string, string])),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

// 챌린지 수정
export const useChangeChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ChangeChallenge,
    onSuccess: (_data, id) => {
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
    queryFn: name,
  });
