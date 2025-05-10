import { putUsersProfile } from '@/api/profileApi';
import { postUsersValidateNickname } from '@/api/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUsersProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: putUsersProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const {
    mutate: validateNickname,
    isError,
    error,
  } = useMutation({
    mutationFn: postUsersValidateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userNickname'] });
    },
  });

  const isNicknameDuplicated =
    error && axios.isAxiosError(error) && error.response?.status === 409;

  return {
    updateProfile,
    isUpdating,
    validateNickname,
    isError,
    isNicknameDuplicated,
  };
};
