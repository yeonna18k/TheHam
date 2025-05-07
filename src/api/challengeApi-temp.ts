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
  PostChallengesRequest,
  PostChallengesResponse,
  PutChallengesRequest,
  PutChallengesResponse,
} from '@/types/challenges';
import { EmptyResponse } from '@/types/common';
import { baseFetch } from './fetchUtils';

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
