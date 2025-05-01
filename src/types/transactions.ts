export interface AccountBookRequest {
  startDate: string;
  endDate: string;
  page: number;
}

export type TransactionType = 'SPEND' | 'INCOME';

export interface RepeatInfo {
  frequency?: string | null;
  month?: number | null;
  day?: number | null;
}

export interface AccountBookItem {
  id: number;
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
  memo?: string;
  endDate?: string | null;
  occurredAt: string;
  repeat?: RepeatInfo;
}

export interface GetAccountBookAllResponse {
  accountBookPeriodResponse: AccountBookItem[];
  totalPage: number;
  totalElement: number;
  number: number;
}
export interface GetAccountBookSpendResponse {
  accountBookPeriodResponse: AccountBookItem[];
  totalPage: number;
  totalElement: number;
  number: number;
}

export type Transaction = Pick<
  AccountBookItem,
  'id' | 'title' | 'category' | 'amount' | 'memo' | 'occurredAt'
> & {
  type: 'SPEND' | 'INCOME';
};

export interface PostAccountBookMonthResponse {
  day: number;
  spendTotal: number;
  incomeTotal: number;
  dayList: Transaction[];
}

// 지출

export type PostAccountBookSpendRequest = Omit<AccountBookItem, 'id' | 'type'>;

export type PostAccountBookSpendResponse = Omit<AccountBookItem, 'type'> & {
  updatedAt: string;
};

export interface GetAccountBookSpendDetailRequest {
  id: string;
}

export type GetAccountBookSpendDetailResponse = Omit<
  AccountBookItem,
  'type'
> & { updatedAt: string };

export type PutAccountBookSpendRequest = Omit<AccountBookItem, 'type'>;

export type PutAccountBookSpendResponse = Omit<AccountBookItem, 'type'> & {
  updatedAt: string;
};

export interface DeleteAccountBookSpendRequest {
  id: string;
}

// 수입

export type PostAccountBookIncomeRequest = Omit<AccountBookItem, 'id' | 'type'>;

export type PostAccountBookIncomeResponse = Omit<AccountBookItem, 'type'> & {
  updatedAt: string;
};

export interface GetAccountBookIncomeDetailRequest {
  id: string;
}

export type GetAccountBookIncomeDetailResponse = Omit<
  AccountBookItem,
  'type'
> & {
  updatedAt: string;
};

export type PutAccountBookIncomeRequest = Omit<AccountBookItem, 'type'>;

export type PutAccountBookIncomeResponse = Omit<AccountBookItem, 'id' | 'type'>;

export interface DeleteAccountBookIncomeRequest {
  id: string;
}
