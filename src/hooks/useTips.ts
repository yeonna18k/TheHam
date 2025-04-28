import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostTipsRequest } from '@/types/Tip';
import { getTip, postTip } from '@/api/Tip';

export const useGetTip = () => {    
  return useQuery({
    queryKey: ['tips'],
    queryFn: () => getTip(),
  });
}

export const usePostTip = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: PostTipsRequest) => postTip(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tips'] });
        },
    });
}
