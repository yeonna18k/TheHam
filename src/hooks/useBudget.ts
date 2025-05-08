import {
  deleteBudget,
  getBudget,
  postBudget,
  putBudget,
} from '@/api/budgetApi';
import { BudgetRequest, PutBudgetRequest } from '@/types/budget';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 예산을 등록하는 로직임
export const usePostBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: BudgetRequest) => postBudget(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });
};

// 예산을 가져오는 로직임
export const useGetBudget = (date: string) => {
  return useQuery({
    queryKey: ['budget', date],
    queryFn: () => getBudget({ date }),
  });
};

// 예산을 수정하는 로직임
export const usePutBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, budget }: PutBudgetRequest) => putBudget({ id, budget }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['budget', id] });
    },
  });
};

// 예산을 삭제하는 로직임
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBudget({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });
};
