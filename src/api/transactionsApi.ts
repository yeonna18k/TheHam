import {
  AccountBookMonthResponse,
  AccountBookRequest,
  AccountBookResponse,
} from '@/types/transactions';
import { baseFetch } from './BaseAPI';

export const getAccountBook = async ({
  startDate,
  endDate,
}: AccountBookRequest) => {
  try {
    const response = await baseFetch<AccountBookResponse[]>(
      `/account-book/all?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
      }
    );
    return response;
  } catch (error) {
    console.error('지정 기간 가계부 조회 에러: ', error);
    throw error;
  }
};

export const postAccountBookMonth = async (requestMonth: string) => {
  try {
    const response = await baseFetch<AccountBookMonthResponse[]>(
      `account-book/month`,
      {
        method: 'POST',
        data: {
          requestMonth,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('지정 월 가계부 조회 에러: ', error);
    throw error;
  }
};

export const getAccountBookSpend = async ({
  startDate,
  endDate,
}: AccountBookRequest) => {
  try {
    const response = await baseFetch<AccountBookResponse[]>(
      `/account-book/spend?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
      }
    );
    return response;
  } catch (error) {
    console.error('지정 기간 소비 조회 에러: ', error);
    throw error;
  }
};
