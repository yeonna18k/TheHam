import {
  deleteChallenges,
  deleteChallengesExit,
  getChallenges,
  getChallengesMe,
  getChallengesNew,
  getChallengesTop,
  getDetailChallenges,
  postChallenges,
  postChallengesParticipation,
  putChallenges,
} from '@/api/challengesApi';
import {
  getInvitesMe,
  patchInvitesAccept,
  patchInvitesReject,
  postInvites,
} from '@/api/invitesApi';
import {
  GetChallengesMeRequest,
  GetChallengesNewRequest,
  GetChallengesRequest,
  PostChallengesRequest,
  PutChallengesRequest,
} from '@/types/challenges';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 챌린지 목록 조회
export const useGetChallenge = (params: GetChallengesRequest) =>
  useQuery({
    queryKey: ['challenges', params],
    queryFn: () => getChallenges(params),
  });

// 챌린지 상세 조회
export const useDetailChallenge = (id: number) =>
  useQuery({
    queryKey: ['challengeDetail', id],
    queryFn: () => getDetailChallenges(id),
    enabled: !!id,
  });

// 챌린지 생성
export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PostChallengesRequest) => postChallenges(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

// 챌린지 수정
export const useChangeChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: number;
      params: PutChallengesRequest;
    }) => putChallenges(id, params),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['challengeDetail', id] });
    },
  });
};

// 챌린지 삭제
export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChallenges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

// 인기 챌린지 조회 쿼리
export function useGetChallengesTop() {
  return useQuery({
    queryKey: ['challengesTop'],
    queryFn: getChallengesTop,
  });
}
// 인기 챌린지 조회 쿼리
export function useGetChallengesNew({ page, size }: GetChallengesNewRequest) {
  return useQuery({
    queryKey: ['challengesTop'],
    queryFn: () => getChallengesNew({ page, size }),
  });
}

// 챌린지 퇴장
export const useExitChallenge = () =>
  useMutation({
    mutationFn: deleteChallengesExit,
  });

// 챌린지 참여
export const useParticipantChallenge = () =>
  useMutation({
    mutationFn: postChallengesParticipation,
  });

// 챌린지 초대
export const useInvitingChallenge = () =>
  useMutation({
    mutationFn: postInvites,
  });

// 초대 수락
export const useAcceptChallenge = () =>
  useMutation({
    mutationFn: patchInvitesAccept,
  });

// 초대 거절
export const useRejectChallenge = () =>
  useMutation({
    mutationFn: patchInvitesReject,
  });

// 초대 목록
export const useInviteList = () =>
  useQuery({
    queryKey: ['challengeInvites'],
    queryFn: () => getInvitesMe,
  });

// 내가 참여중인 챌린지 보기
export const useMyChallenge = ({ page, size }: GetChallengesMeRequest) =>
  useQuery({
    queryKey: ['myChallenges', page, size],
    queryFn: () => getChallengesMe({ page, size }),
  });
