export interface AccountBookRequest {
  startDate: string;
  endDate: string;
}

export interface AccountBookResponse {
  id: string;
  title: string;
  type: 'INCOME' | 'SPEND';
  category: string;
  amount: number;
  memo: string;
  occurredAt: string;
}
