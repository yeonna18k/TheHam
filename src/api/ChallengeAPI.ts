'use Client';

import type {
  GetChallengesMeRequest,
  GetChallengesMeResponse,
  GetChallengesNewRequest,
  GetChallengesNewResponse,
  GetChallengesRequest,
  GetChallengesResponse,
  GetChallengesTopResponse,
  GetDetailChallengesResponse,
  Invitation,
  InvitationParams,
  PostChallengesRequest,
  PostChallengesResponse,
  PutChallengesRequest,
  PutChallengesResponse,
} from '@/types/challenge';
import { EmptyResponse } from '@/types/common';
import { baseFetch } from './baseApi';

// 챌린지 조회 API
export async function getChallenges(
  params: GetChallengesRequest
): Promise<GetChallengesResponse> {
  return await baseFetch('/challenges', {
    method: 'GET',
    params,
  });
}

// 챌린지 생성 API
export async function postChallenges(
  params: PostChallengesRequest
): Promise<PostChallengesResponse> {
  return await baseFetch('/challenges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 반드시 JSON 형식으로 전송해야 함
    },
    data: params,
  });
}

// 챌린지 상세 조회 API
export async function getDetailChallenges(
  id: number
): Promise<GetDetailChallengesResponse> {
  return await baseFetch(`/challenges/${id}`);
}

// 챌린지 수정 API
export async function putChallenges(
  id: number,
  params: PutChallengesRequest
): Promise<PutChallengesResponse> {
  return await baseFetch(`/challenges/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

// 챌린지 삭제 API
export async function deleteChallenges(id: number): Promise<EmptyResponse> {
  return await baseFetch(`/challenges/${id}`, {
    method: 'DELETE',
  });
}

// 챌린지 퇴장 API
export async function deleteChallengesExit(id: number) {
  return await baseFetch(`/challenges/${id}/exit`, {
    method: 'DELETE',
  });
}

// 챌린지 참여 API
export async function postChallengesParticipation(id: number) {
  return await baseFetch(`/challenges/${id}/participation`, {
    method: 'POST',
  });
}

// TODO: 아래 api는 invitesApi로 분리

// 챌린지 초대 관련 API
export async function InvitingChallenge(id: number) {
  const response = await baseFetch(`/challenges/${id}/invites`, {
    method: 'POST',
  });
  return response;
}

// 챌린지 초대 수락 API
export async function AcceptChallenge(id: number) {
  const response = await baseFetch(`/challenges/invites/${id}/accept`, {
    method: 'PATCH',
  });
  return response;
}

// 챌린지 초대 거절 API
export async function RejectChallenge(id: number) {
  const response = await baseFetch(`/challenges/invites/${id}/reject`, {
    method: 'PATCH',
  });
  return response;
}

// 챌린지 초대 목록 API
export async function getInvitations(params: InvitationParams) {
  const response = await baseFetch<Invitation>('/challenges/invites/me', {
    method: 'GET',
    params, // InvitationParams 타입을 그대로 전달
  });
  return response;
}

// 내가 참여중인 챌린지 보기
export async function getChallengesMe({
  page,
  size,
}: GetChallengesMeRequest): Promise<GetChallengesMeResponse[]> {
  return await baseFetch(`/challenges/me?page=${page}&size=${size}`);
}

// 신규 챌린지 조회 API
export async function NewChallenges({
  page,
  size,
}: GetChallengesNewRequest): Promise<GetChallengesNewResponse[]> {
  return await baseFetch(`/challenges/new?page=${page}&size=${size}`);
}

// 인기 챌린지 조회 API
export async function getChallengesTop(): Promise<GetChallengesTopResponse[]> {
  return await baseFetch(`/challenges/top`);
}
