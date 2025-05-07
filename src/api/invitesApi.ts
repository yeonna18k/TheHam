import { EmptyResponse } from '@/types/common';
import { GetInvitesMeResponse, PostInvitesRequest } from '@/types/invites';
import { baseFetch } from './fetchUtils';

// 챌린지 초대 관련 API
export async function postInvites({
  id,
  email,
}: PostInvitesRequest): Promise<string> {
  return await baseFetch(`/challenges/${id}/invites`, {
    method: 'POST',
    data: {
      email,
    },
  });
}

// 챌린지 초대 수락 API
export async function patchInvitesAccept(id: number): Promise<EmptyResponse> {
  return await baseFetch(`/challenges/invites/${id}/accept`, {
    method: 'PATCH',
  });
}

// 챌린지 초대 거절 API
export async function patchInvitesReject(id: number): Promise<EmptyResponse> {
  return await baseFetch(`/challenges/invites/${id}/reject`, {
    method: 'PATCH',
  });
}

// 챌린지 초대 목록 API
export async function getInvitesMe(): Promise<GetInvitesMeResponse[]> {
  return await baseFetch('/challenges/invites/me', {
    method: 'GET',
  });
}
