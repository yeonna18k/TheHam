"use client"

import { baseFetch } from './BaseAPI';
import type { State, StateCategory, ConsumeCategory } from '@/types/Static';

// 지출 통계 조회
export async function getFrequency(frequency: string): Promise<State> {
  return baseFetch<State>(`/api/v1/stat/${frequency}`);
}

// 카테고리별 지출 목록 조회
export async function getFrequencyCategory(
  frequency: string,
  category: string
): Promise<StateCategory> {
  return baseFetch<StateCategory>(`/api/v1/stat/${frequency}/${category}`);
}

// 소비 증감량 조회
export async function getConsumeCategory(
  frequency: string,
  category: string
): Promise<ConsumeCategory> {
  return baseFetch<ConsumeCategory>(`/api/v1/stat/consume/${frequency}/${category}`);
}
