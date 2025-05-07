import {
  FcmController,
  getFcmToken,
  sendFcmToken,
} from '@/api/fcmControllerApi';
import { useMutation } from '@tanstack/react-query';

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
