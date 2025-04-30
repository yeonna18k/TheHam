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
  budget: number;
  total: number;
}

export interface PutBudgetResponse {
  budget: number;
  total: number;
}
