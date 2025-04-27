import { AccountBookRequest, AccountBookResponse } from '@/types/transactions';
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
