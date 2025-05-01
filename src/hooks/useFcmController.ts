import { useMutation } from '@tanstack/react-query';
import { sendFcmToken, getFcmToken, FcmController } from '@/api/FcmControllerAPI';

export const useFcmController = () => {
  return useMutation({
    mutationFn: () => FcmController(),
  });
};

export const useFcmToken = () => {
  return useMutation({
    mutationFn: (token: string) => sendFcmToken(token),
  });
};

export const useGetFcmToken = () => {
  return useMutation({
    mutationFn: () => getFcmToken(),
  });
};
