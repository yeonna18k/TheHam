import {
  AccountBookRequest,
  DeleteAccountBookIncomeRequest,
  DeleteAccountBookSpendRequest,
  GetAccountBookAllResponse,
  GetAccountBookIncomeDetailRequest,
  GetAccountBookIncomeDetailResponse,
  GetAccountBookSpendDetailRequest,
  GetAccountBookSpendDetailResponse,
  GetAccountBookSpendResponse,
  PostAccountBookIncomeRequest,
  PostAccountBookIncomeResponse,
  PostAccountBookMonthResponse,
  PostAccountBookSpendRequest,
  PostAccountBookSpendResponse,
  PutAccountBookIncomeRequest,
  PutAccountBookIncomeResponse,
  PutAccountBookSpendRequest,
  PutAccountBookSpendResponse,
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

// 지출 등록 / 수정 / 삭제

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

export const getAccountBookSpendDetail = async ({
  id,
}: GetAccountBookSpendDetailRequest) => {
  try {
    return await baseFetch<GetAccountBookSpendDetailResponse>(
      `/account-book/spend/detail/${id}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('지출 상세 조회 에러: ', error);
    throw error;
  }
};

export const putAccountBookSpend = async ({
  id,
  title,
  amount,
  memo,
  endDate,
  occurredAt,
  repeat,
  category,
}: PutAccountBookSpendRequest) => {
  try {
    return await baseFetch<PutAccountBookSpendResponse>(
      `/account-book/spend/${id}`,
      {
        method: 'PUT',
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
  } catch (error) {
    console.error('지출 수정 에러: ', error);
    throw error;
  }
};

export const deleteAccountBookSpend = async ({
  id,
}: DeleteAccountBookSpendRequest) => {
  try {
    return await baseFetch<boolean>(`/account-book/spend/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('지출 삭제 에러: ', error);
    throw error;
  }
};

// 수입 등록 / 수정 / 삭제

export const postAccountBookIncome = async ({
  title,
  amount,
  memo,
  endDate,
  occurredAt,
  repeat,
  category,
}: PostAccountBookIncomeRequest) => {
  try {
    const response = await baseFetch<PostAccountBookIncomeResponse>(
      `/account-book/income`,
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
    console.error('수입 등록 에러: ', error);
    throw error;
  }
};

export const getAccountBookIncomeDetail = async ({
  id,
}: GetAccountBookIncomeDetailRequest) => {
  try {
    return await baseFetch<GetAccountBookIncomeDetailResponse>(
      `/account-book/income/detail/${id}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('수입 상세 조회 에러: ', error);
    throw error;
  }
};

export const putAccountBookIncome = async ({
  id,
  title,
  amount,
  memo,
  endDate,
  occurredAt,
  repeat,
  category,
}: PutAccountBookIncomeRequest) => {
  try {
    return await baseFetch<PutAccountBookIncomeResponse>(
      `/account-book/income/${id}`,
      {
        method: 'PUT',
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
  } catch (error) {
    console.error('수입 수정 에러: ', error);
    throw error;
  }
};

export const deleteAccountBookIncome = async ({
  id,
}: DeleteAccountBookIncomeRequest) => {
  try {
    return await baseFetch<boolean>(`/account-book/income/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('수입 삭제 에러: ', error);
    throw error;
  }
};
