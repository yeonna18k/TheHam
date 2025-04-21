import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GetChallenge,
  CreateChallenge,
  DetailChallenge,
  ChangeChallenge,
  DeleteChallenge,
  ExitChallenge,
  ParticipantChallenge,
} from '@/api/ChallengeAPI';

// 챌린지 목록 조회
export const useGetChallenge = (title: string, text: string, page: number, size: number) => {
  return useQuery({
    queryKey: ['challenges', title, text, page, size],
    queryFn: () => GetChallenge(title, text, page, size),
  });
};

// 챌린지 상세 조회
export const useDetailChallenge = (id: number) => {
  return useQuery({
    queryKey: ['challengeDetail', id],
    queryFn: () => DetailChallenge(id),
    enabled: !!id,
  });
};

// 챌린지 생성
export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { title: string; text: string; release: string; amount: number; capacity: number; category: string; startDate: string; endDate: string }) => 
      CreateChallenge(variables.title, variables.text, variables.release, variables.amount, variables.capacity, variables.category, variables.startDate, variables.endDate),
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['challengeDetail', variables] });
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
export const useExitChallenge = () => {
  return useMutation({
    mutationFn: ExitChallenge,
  });
};

// 챌린지 참여
export const useParticipantChallenge = () => {
  return useMutation({
    mutationFn: ParticipantChallenge,
  });
};
