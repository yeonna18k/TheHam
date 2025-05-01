export interface Budget {
  budget: number;
  total: number;
}

export interface BudgetRequest {
  budget: number;
}

export interface PostBudgetRequest {
  budget: number;
}

export interface GetBudgetRequest {
  date: string;
}

export interface PutBudgetRequest {
  id: number;
  budget: number;
}

export interface DeleteBudgetRequest {
  id: number;
}

export interface PostBudgetResponse {
  budget: number;
  total: number;
}

export interface GetBudgetResponse {
  id: number;
  budget: number;
  total: number;
}

export interface PutBudgetResponse {
  budget: number;
  total: number;
}
