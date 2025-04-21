import { useMutation } from '@tanstack/react-query';
import { FcmController } from '@/api/FcmControllerAPI';

export const useFcmToken = () => {
  return useMutation({
    mutationFn: (token: string) => FcmController(token),
  });
};
