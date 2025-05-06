import type { ConsumeCategory, State, StateCategory } from '@/types/Static';
import { baseFetch } from './BaseAPI';

// 지출 통계 조회
export async function getFrequency(frequency: string): Promise<State> {
  const data = await baseFetch<State>(`/stat/${frequency}`);
  return data ?? ({} as State);
}

// 카테고리별 지출 목록 조회
export async function getFrequencyCategory(
  frequency: string,
  category: string,
  page: number
): Promise<StateCategory> {
  const data = await baseFetch<StateCategory>(
    `/stat/category/${frequency}?category=${category}&page=${page}`
  );
  return data ?? ({} as StateCategory);
}

// 소비 증감량 조회
export async function getConsumeFrequency(
  frequency: string
): Promise<ConsumeCategory> {
  const data = await baseFetch<ConsumeCategory>(`/stat/consume/${frequency}`);
  return data ?? ({} as ConsumeCategory);
}
