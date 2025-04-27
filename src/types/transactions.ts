export interface AccountBookRequest {
  startDate: string;
  endDate: string;
}

export interface AccountBookResponse {
  id: number;
  title: string;
  type: 'INCOME' | 'SPEND';
  category: string;
  amount: number;
  memo: string;
  occurredAt: string;
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

export interface AccountBookMonthResponse {
  day: number;
  spendTotal: number;
  incomeTotal: number;
  dayList: Transaction[];
}
