"use client"

import { baseFetch } from './BaseAPI';
import type { SSEResponse } from '@/types/SSE';

// SSE 테스트 경로
export async function getSSE() {
  const response = await baseFetch<SSEResponse>('/sse/send', {
    method: 'GET',
  });
  return response;
}

// SSE 구독 경로    
export async function subscribeSSE() {
  const response = await baseFetch<SSEResponse>('/sse/subscribe', {
    method: 'GET',
  });
  return response;
}