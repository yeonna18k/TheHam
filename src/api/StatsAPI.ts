"use client";

import axios from 'axios';
import { baseFetch } from './BaseAPI';
import type { State, StateCategory, ConsumeCategory } from "../types/Static";

// 지출 통계 조회
export async function getFrequency(frequency: string) {
    const response = await axios.get<State>(`${baseFetch}/api/v1/stat/${frequency}`);
    return response.data;
}

// 카테고리별 지출 목록 조회
export async function getFrequencyCategory(frequency: string, category: string) {
    const response = await axios.get<StateCategory>(`${baseFetch}/api/v1/stat/${frequency}/${category}`);
    return response.data;
}

// 소비 증감량 조회
export async function getConsumeCategory(frequency: string, category: string) {
    const response = await axios.get<ConsumeCategory>(`${baseFetch}/api/v1/stat/consume/${frequency}/${category}`);
    return response.data;
}
