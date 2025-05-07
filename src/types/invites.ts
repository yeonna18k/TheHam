// 챌린지 초대 타입
export interface PostInvitesRequest {
  id: number;
  email: string;
}

export interface GetInvitesMeResponse {
  id: number;
  requestUsername: string;
  challengeName: string;
  isAccept: boolean;
  requestAt: string;
  updateAt: string;
}
