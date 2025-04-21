"use Client" 

import { baseFetch } from "./BaseAPI"
import axios from "axios";
import type { CreateChallenge, GetChallenge, detailChallenge, Invitation } from "@/types/challenge";

//챌린지 조회 API
export async function GetChallenge(title: string, text: string, page: number, size: number) {
    const response = await axios.get<GetChallenge>(`${baseFetch}/api/v1/challenges`, {
        params: { title, text, page, size },
    });
    return response.data;
}
export async function CreateChallenge(title: string, text: string, release: string, amount: number, capacity: number, category: string, startDate: string, endDate: string) {
    const response = await axios.post<CreateChallenge>(`${baseFetch}/api/v1/challenges`, {
        title,
        text,
        release,
        amount,
        capacity,
        category,
        startDate,
        endDate,
    });
    return response.data;
}

//챌린지 상세조회 API
export async function DetailChallenge(id: number) {
    const response = await axios.get<detailChallenge>(`${baseFetch}/api/v1/challenges/${id}`);
    return response.data;
}

//챌린지 수정 API
export async function ChangeChallenge(id: number) {
    const response = await axios.put<detailChallenge>(`${baseFetch}/api/v1/challenges/${id}`);
    return response.data;
}

//챌린지 삭제 API 
export async function DeleteChallenge(id: number) {
    const response = await axios.delete(`${baseFetch}/api/v1/challenges/${id}`);
    return response.data;
}

//챌린지 퇴장 API
export async function ExitChallenge(id: number) {
    const response = await axios.delete(`${baseFetch}/api/v1/challenges/${id}/exit`);
    return response.data;
}

//챌린지 참여 API
export async function ParticipantChallenge(id:number) {
    const response = await axios.post(`${baseFetch}/api/v1/challenges/${id}/participation`);
    return response.data;
}

//챌린지 초대 관련 API 
export async function InvitingChallenge(id:number) {
    const response = await axios.post(`${baseFetch}/api/v1/challenges/${id}/invites`);
    return response.data;
}

//챌린지 초대 수락 API
export async function AcceptChallenge(id:number) {
    const response = await axios.patch(`${baseFetch}/api/v1/challenges/invites/${id}/accept`);
    return response.data;
}

//챌린지 초대 거절 API
export async function RejectChallenge(id:number) {
    const response = await axios.patch(`${baseFetch}/api/v1/challenges/invites/${id}/reject`);
    return response.data
}

//챌린지 초대 목록 API
export async function name() {
    const response = await axios.get<Invitation>(`${baseFetch}/api/v1/challenges/invites/me`);
    return response.data;
}