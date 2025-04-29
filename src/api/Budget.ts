"use client"

import { baseFetch } from './BaseAPI';
import type { Budget, BudgetRequest } from '@/types/Budget';

// 예산 등록
export async function postBudget(params: BudgetRequest) {
  const response = await baseFetch<Budget>('/budget', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response;
}

// 예산 및 소비 총액 조회 
export async function getBudget(id: number, params: BudgetRequest) {
  const response = await baseFetch<Budget>(`/budget/${id}`, {
    method: 'GET',
    body: JSON.stringify(params),
  });
  return response;
}

// 예산 수정
export async function putBudget(id: number, params: BudgetRequest) {
  const response = await baseFetch<Budget>(`/budget/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return response;
}

// 예산 삭제
export async function deleteBudget(id: number) {
  const response = await baseFetch(`/budget/${id}`, {
    method: 'DELETE',
  });
  return response;
}
