import { AxiosError } from 'axios';
import { baseFetch } from './fetchUtils';

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
    const axiosError = error as AxiosError;
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

export interface GetUsersChallengeResponse {
  savings: number;
  completedChallenges: number;
  participatingChallenges: number;
  finishedChallenge: number;
}

export const getUsersChallenge = async () => {
  try {
    return await baseFetch<GetUsersChallengeResponse>(`/users/challenge`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('유저 챌린지 반환 에러: ', error);
    throw error;
  }
};
