"use client"

import { baseFetch } from './BaseAPI';
import type { State, StateCategory, ConsumeCategory } from '@/types/Static';

// 지출 통계 조회
export async function getFrequency(frequency: string): Promise<State> {
  const data = await baseFetch<State>(`/stat/${frequency}`);
  return data ?? {} as State;  // 데이터가 없으면 기본값을 반환
}

// 카테고리별 지출 목록 조회
export async function getFrequencyCategory(
  frequency: string,
  category: string
): Promise<StateCategory> {
  const data = await baseFetch<StateCategory>(`/stat/${frequency}/${category}`);
  return data ?? {} as StateCategory;  // 데이터가 없으면 기본값을 반환
}

// 소비 증감량 조회
export async function getConsumeCategory(
  frequency: string,
  category: string
): Promise<ConsumeCategory> {
  const data = await baseFetch<ConsumeCategory>(`/stat/consume/${frequency}/${category}`);
  return data ?? {} as ConsumeCategory;  // 데이터가 없으면 기본값을 반환
}

