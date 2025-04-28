import {
  AccountBookMonthResponse,
  AccountBookRequest,
  AccountBookResponse,
} from '@/types/transactions';
import { baseFetch } from './BaseAPI';

export const postAccountBook = async ({
  startDate,
  endDate,
}: AccountBookRequest) => {
  try {
    const response = await baseFetch<AccountBookResponse[]>(
      `/account-book/all`,
      {
        method: 'POST',
        data: {
          startDate,
          endDate,
        },
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
