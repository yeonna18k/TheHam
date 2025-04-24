export interface UsersProfileResponse {
  nickname: string | null;
  email: string;
  profileImageUrl: string | null;
}

export interface UsersProfileRequest {
  nickname: string;
  profileImageUrl: File | string | null;
}
