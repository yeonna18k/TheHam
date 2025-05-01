import {
  getConsumeFrequency,
  getFrequency,
  getFrequencyCategory,
} from '@/api/StatsAPI';
import { useQuery } from '@tanstack/react-query';

// 지출 통계 조회
export const useGetFrequency = (frequency: string) => {
  return useQuery({
    queryKey: ['frequency', frequency],
    queryFn: () => getFrequency(frequency),
    enabled: !!frequency,
  });
};

// 카테고리별 지출 목록 조회
export const useGetFrequencyCategory = (
  frequency: string,
  category: string,
  page: number
) => {
  return useQuery({
    queryKey: ['frequencyCategory', frequency, category],
    queryFn: () => getFrequencyCategory(frequency, category, page),
    enabled: !!frequency && !!category,
  });
};

// 소비 증감량 조회
export const useGetConsumeCategory = (frequency: string, category: string) => {
  return useQuery({
    queryKey: ['consumeCategory', frequency, category],
    queryFn: () => getConsumeFrequency(frequency),
    enabled: !!frequency && !!category,
  });
};
