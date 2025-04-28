import {
  AccountBookRequest,
  GetAccountBookAllResponse,
  GetAccountBookSpendResponse,
  PostAccountBookIncomeResponse,
  PostAccountBookMonthResponse,
  PostAccountBookSpendRequest,
  PostAccountBookSpendResponse,
} from '@/types/transactions';
import { baseFetch } from './BaseAPI';

export const getAccountBookAll = async ({
  startDate,
  endDate,
  page,
}: AccountBookRequest) => {
  try {
    const response = await baseFetch<GetAccountBookAllResponse>(
      `/account-book/all?startDate=${startDate}&endDate=${endDate}&page=${page}`,
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
    const response = await baseFetch<PostAccountBookMonthResponse[]>(
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
  page,
}: AccountBookRequest) => {
  try {
    const response = await baseFetch<GetAccountBookSpendResponse>(
      `/account-book/spend?startDate=${startDate}&endDate=${endDate}&page=${page}`,
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

export const postAccountBookSpend = async ({
  title,
  amount,
  memo,
  endDate,
  occurredAt,
  repeat,
  category,
}: PostAccountBookSpendRequest) => {
  try {
    const response = await baseFetch<PostAccountBookSpendResponse>(
      `/account-book/spend`,
      {
        method: 'POST',
        data: {
          title,
          amount,
          memo,
          endDate,
          occurredAt,
          repeat,
          category,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('지출 등록 에러: ', error);
    throw error;
  }
};

export const postAccountBookIncome = async () => {
  try {
    const response = await baseFetch<PostAccountBookIncomeResponse>(
      `/account-book/income`,
      {
        method: 'POST',
        data: {
          title: '월급',
          amount: 3000000,
          memo: '4월 정기 급여',
          endDate: '2025-04-28T10:16:42.077Z',
          occurredAt: '2025-04-28',
          repeat: {
            frequency: 'monthly',
            month: 0,
            day: 10,
          },
          category: 'salary',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('소비 등록 에러: ', error);
    throw error;
  }
};
