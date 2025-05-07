import { UsersProfileRequest, UsersProfileResponse } from '@/types/profile';
import { baseFetch } from './fetchUtils';

export const getUsersProfile = async (): Promise<UsersProfileResponse> => {
  try {
    return await baseFetch<UsersProfileResponse>(`/users/profile`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('유저 프로필 조회 에러:', error);
    throw error;
  }
};

export const putUsersProfile = async (
  requestData: UsersProfileRequest
): Promise<UsersProfileResponse> => {
  try {
    return await baseFetch<UsersProfileResponse>(`/users/profile`, {
      method: 'PUT',
      data: {
        nickname: requestData.nickname,
        categories: requestData.profileImageUrl,
      },
    });
  } catch (error) {
    console.error('유저 프로필 수정 에러:', error);
    throw error;
  }
};
