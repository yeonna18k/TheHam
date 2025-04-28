export interface AccountBookRequest {
  startDate: string;
  endDate: string;
  page: number;
}

export type TransactionType = 'SPEND' | 'INCOME';

export interface RepeatInfo {
  frequency: string | null;
  month: number | null;
  day: number | null;
}

export interface AccountBookItem {
  id: number;
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
  memo: string;
  endDate: string | null;
  occurredAt: string;
  repeat: RepeatInfo;
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

export interface Transaction {
  id: number;
  title: string;
  type: 'SPEND' | 'INCOME';
  category: string;
  amount: number;
  memo: string;
  occurredAt: string;
}

export interface PostAccountBookMonthResponse {
  day: number;
  spendTotal: number;
  incomeTotal: number;
  dayList: Transaction[];
}

export interface PostAccountBookSpendRequest {
  title: string;
  amount: number;
  memo: string;
  endDate?: string;
  occurredAt: string;
  repeat?: {
    frequency?: string;
    month?: number;
    day?: number;
  };
  category: string;
}

export interface PostAccountBookSpendResponse {
  title: string;
  amount: number;
  memo: string;
  endDate?: string;
  occurredAt: string;
  repeat?: {
    frequency?: string;
    month?: number;
    day?: number;
  };
  category: string;
}

export interface PostAccountBookIncomeRequest {
  title: string;
  amount: number;
  memo: string;
  endDate?: string;
  occurredAt: string;
  repeat?: {
    frequency?: string;
    month?: number;
    day?: number;
  };
  category: string;
}

export interface PostAccountBookIncomeResponse {
  title: string;
  amount: number;
  memo: string;
  endDate?: string;
  occurredAt: string;
  repeat?: {
    frequency?: string;
    month?: number;
    day?: number;
  };
  category: string;
}
