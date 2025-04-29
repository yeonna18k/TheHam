import { baseFetch } from './BaseAPI';

export interface ValidateNicknameRequest {
  nickname: string;
}

export const postUsersValidateNickname = async ({
  nickname,
}: ValidateNicknameRequest) => {
  try {
    return await baseFetch<boolean>(`/users/validate/nickname`, {
      method: 'POST',
      data: {
        nickname,
      },
    });
  } catch (error) {
    console.error('닉네임 중복 확인 에러:', error);
    throw error;
  }
};

export interface GetUsersAchievementResponse {
  title: string;
  content: string;
  createdAt: string;
}

export const getUsersAchievement = async () => {
  try {
    return await baseFetch<GetUsersAchievementResponse[]>(
      `/users/achievement`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('유저 업적 반환 에러 :', error);
    throw error;
  }
};
