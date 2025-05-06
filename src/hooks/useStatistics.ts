import {
  getStatCategory,
  getStatConsume,
  getStatFrequency,
} from '@/api/statsApi';
import { useQuery } from '@tanstack/react-query';

// 지출 통계 조회
export const useGetStatFrequency = (frequency: string) => {
  return useQuery({
    queryKey: ['frequency', frequency],
    queryFn: () => getStatFrequency(frequency),
    enabled: !!frequency,
  });
};

// 카테고리별 지출 목록 조회
export const useGetStatCategory = (
  frequency: string,
  category: string,
  page: number
) => {
  return useQuery({
    queryKey: ['frequencyCategory', frequency, category],
    queryFn: () => getStatCategory(frequency, category, page),
    enabled: !!frequency && !!category,
  });
};

// 소비 증감량 조회
export const useGetStatConsume = (frequency: string) => {
  return useQuery({
    queryKey: ['consumeCategory', frequency],
    queryFn: () => getStatConsume(frequency),
    enabled: !!frequency,
  });
};
