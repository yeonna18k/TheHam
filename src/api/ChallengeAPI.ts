"use Client" 

import { baseFetch } from "./BaseAPI"
import type { CreateChallenge, GetChallenge, detailChallenge, Invitation, GetChallengeParams, CreateChallengeParams, InvitationParams } from "@/types/challenge";

//챌린지 조회 API
export async function GetChallenge(params: GetChallengeParams) {
    const response = await baseFetch<GetChallenge>("/api/v1/challenges", {
      method: "GET",
      params, // GetChallengeParams 타입을 그대로 전달
    });
    return response;
  }



// 챌린지 생성 API
export async function CreateChallenge(params: CreateChallengeParams) {
    const response = await baseFetch<CreateChallenge>("/api/v1/challenges", {
      method: "POST",
      body: JSON.stringify(params),
    });
    return response;
  }

// 챌린지 상세 조회 API
export async function DetailChallenge(id: number) {
    const response = await baseFetch<detailChallenge>(`/api/v1/challenges/${id}`, {
      method: "GET",
    });
    return response;
  }

// 챌린지 수정 API
export async function ChangeChallenge(id: number, params: CreateChallengeParams) {
    const response = await baseFetch<detailChallenge>(`/api/v1/challenges/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    return response;
  }

// 챌린지 삭제 API
export async function DeleteChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/${id}`, {
      method: "DELETE",
    });
    return response;
  }

// 챌린지 퇴장 API
export async function ExitChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/${id}/exit`, {
      method: "DELETE",
    });
    return response;
  }
  
  // 챌린지 참여 API
  export async function ParticipantChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/${id}/participation`, {
      method: "POST",
    });
    return response;
  }

// 챌린지 초대 관련 API
export async function InvitingChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/${id}/invites`, {
      method: "POST",
    });
    return response;
  }
  
  // 챌린지 초대 수락 API
  export async function AcceptChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/invites/${id}/accept`, {
      method: "PATCH",
    });
    return response;
  }
  
  // 챌린지 초대 거절 API
  export async function RejectChallenge(id: number) {
    const response = await baseFetch(`/api/v1/challenges/invites/${id}/reject`, {
      method: "PATCH",
    });
    return response;
  }

// 챌린지 초대 목록 API
export async function getInvitations(params: InvitationParams) {
    const response = await baseFetch<Invitation>("/api/v1/challenges/invites/me", {
      method: "GET",
      params, // InvitationParams 타입을 그대로 전달
    });
    return response;
  }