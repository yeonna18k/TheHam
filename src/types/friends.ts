export interface DeleteFriendsResponse {
  friendUserId: number;
  name: string;
  email: string;
  profileImageUrl: string;
}

export interface GetFriendsListResponse {
  friendUserId: number;
  name: string;
  profileImageUrl: string;
  participatingChallenges: number;
}

export interface getFriendsRequestAcceptResponse {
  friendUserId: number;
  name: string;
  profileImageUrl: string;
  participatingChallenges: number;
}

export interface getFriendsRequestsListResponse {
  friendUserId: number;
  name: string;
  email: string;
  profileImageUrl: string;
}
