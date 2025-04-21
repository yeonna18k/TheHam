"use Client" 

import { baseFetch } from "./BaseAPI"
import axios from "axios";

//카카오톡 공유하기 링크
export async function SharedKakao(token: string) {
    const response = await axios.get(`${baseFetch}/api/v1/friends/invite`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

//친구 초대 토큰 발급
export async function FriendsGetToken() {
    const response = await axios.get(`${baseFetch}/api/v1/friends/invite/token`);
    return response.data;
}

