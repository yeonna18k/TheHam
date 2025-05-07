import { EmptyResponse } from '@/types/common';
import type { PostTipsRequest } from '@/types/tips';
import { baseFetch } from './fetchUtils';

// 팁 반환
export async function getTips(): Promise<EmptyResponse> {
  return baseFetch('/tips');
}

// 팁 작성
export async function postTip(tip: PostTipsRequest): Promise<EmptyResponse> {
  return await baseFetch('/tips', {
    method: 'POST',
    data: tip,
  });
}
