import { useQuery } from '@tanstack/react-query';
import { getSSE, subscribeSSE } from '@/api/SSEAPI';

// sse를 가져오는 로직임
export const useGetSSE = () => {
  return useQuery({
    queryKey: ['sse'],
    queryFn: () => getSSE(),
    enabled: false,
  });
};

// sse를 구독하는 로직임
export const useSubscribeSSE = () => {
  return useQuery({
    queryKey: ['sse'],
    queryFn: () => subscribeSSE(),
    enabled: false,
  });
};

