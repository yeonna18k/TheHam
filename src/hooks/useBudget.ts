import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postBudget, getBudget, putBudget, deleteBudget } from '@/api/Budget';
import { BudgetRequest } from '@/types/Budget';


// 예산을 등록하는 로직임
export const usePostBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: BudgetRequest) => postBudget(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });
}


// 예산을 가져오는 로직임
export const useGetBudget = (id: number) => {
  return useQuery({
    queryKey: ['budget', id],
    queryFn: () => getBudget(id, { budget: 0 }),
    enabled: !!id,
  });
}

// 예산을 수정하는 로직임
export const usePutBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, params }: { id: number; params: BudgetRequest }) => putBudget(id, params),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['budget', id] });
    },
  });
}

// 예산을 삭제하는 로직임
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });
}





