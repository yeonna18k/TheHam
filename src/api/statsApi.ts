import {
  GetStatCategoryResponse,
  GetStatConsumeResponse,
  GetStatResponse,
} from '@/types/statistics';
import { baseFetch } from './BaseAPI';

// 지출 통계 조회
export async function getStatFrequency(
  frequency: string
): Promise<GetStatResponse[]> {
  return await baseFetch(`/stat/${frequency}`);
}

// 카테고리별 지출 목록 조회
export async function getStatCategory(
  frequency: string,
  category: string,
  page: number
): Promise<GetStatCategoryResponse> {
  return await baseFetch(
    `/stat/category/${frequency}?category=${category}&page=${page}`
  );
}

// 소비 증감량 조회
export async function getStatConsume(
  frequency: string
): Promise<GetStatConsumeResponse> {
  return await baseFetch(`/stat/consume/${frequency}`);
}
