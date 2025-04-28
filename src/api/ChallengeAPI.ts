"use Client" 

import { baseFetch } from "./BaseAPI"
import type { CreateChallenge, GetChallenge, detailChallenge, Invitation, GetChallengeParams, CreateChallengeParams, InvitationParams, PopularChallenge, InvitationResponse } from "@/types/challenge";

//챌린지 조회 API
export async function GetChallenge(params: GetChallengeParams) {
    const response = await baseFetch<GetChallenge>("/challenges", {
      method: "GET",
      params, // GetChallengeParams 타입을 그대로 전달
    });
    return response;
  }

// 챌린지 생성 API
export async function CreateChallenge(params: CreateChallengeParams) {
  const response = await baseFetch<CreateChallenge>("/challenges", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',  // 반드시 JSON 형식으로 전송해야 함
    },
    data: params,
  });
  return response;
}

// 챌린지 상세 조회 API
export async function DetailChallenge(id: number) {
    const response = await baseFetch<detailChallenge>(`/challenges/${id}`, {
      method: "GET",
    });
    return response;
  }

// 챌린지 수정 API
export async function ChangeChallenge(id: number, params: CreateChallengeParams) {
    const response = await baseFetch<detailChallenge>(`/challenges/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    return response;
  }

// 챌린지 삭제 API
export async function DeleteChallenge(id: number) {
    const response = await baseFetch(`/challenges/${id}`, {
      method: "DELETE",
    });
    return response;
  }

// 챌린지 퇴장 API
export async function ExitChallenge(id: number) {
    const response = await baseFetch(`/challenges/${id}/exit`, {
      method: "DELETE",
    });
    return response;
  }
  
  // 챌린지 참여 API
  export async function ParticipantChallenge(id: number) {
    const response = await baseFetch(`/challenges/${id}/participation`, {
      method: "POST",
    });
    return response;
  }

  // 신규 챌린지 조회 API
  export const NewChallenges = async (): Promise<PopularChallenge[]> => {
    const response = await baseFetch(`/challenges/new`, {
      method: "GET",
    });
    return response as PopularChallenge[];
  }

  // 인기 챌린지 조회 API
  export const PopularChallenges = async (): Promise<PopularChallenge[]> => {
    const response = await baseFetch(`/challenges/top`, {
      method: "GET",
    });
    return response as PopularChallenge[];
  }

// 챌린지 초대 관련 API
export async function InvitingChallenge(id: number) {
    const response = await baseFetch(`/challenges/${id}/invites`, {
      method: "POST",
    });
    return response;
  }
  
  // 챌린지 초대 수락 API
  export async function AcceptChallenge(id: number) {
    const response = await baseFetch(`/challenges/invites/${id}/accept`, {
      method: "PATCH",
    });
    return response;
  }
  
  // 챌린지 초대 거절 API
  export async function RejectChallenge(id: number) {
    const response = await baseFetch(`/challenges/invites/${id}/reject`, {
      method: "PATCH",
    });
    return response;
  }

// 챌린지 초대 목록 API
export async function getInvitations(params: InvitationParams) {
    const response = await baseFetch<Invitation>("/challenges/invites/me", {
      method: "GET",
      params, // InvitationParams 타입을 그대로 전달
    });
    return response;
  }

// 내가 참여중인 챌린지 보기
export async function getMyChallenges() {
    const response = await baseFetch<InvitationResponse>("/challenges/me", {
      method: "GET",
    });
    return response;
  }
