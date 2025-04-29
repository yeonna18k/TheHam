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
