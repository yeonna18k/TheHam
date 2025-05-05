export interface Challenge {
  id: string;
  title: string;
  description?: string;
  currentParticipants?: number;
  maxParticipants?: number;
  daysLeft?: number;
  isInvited?: boolean;
  invitedBy?: string;
  progress?: number;
  goal?: number;
  isCompleted?: boolean;
  isFailed?: boolean;
  status?: 'active' | 'completed' | 'failed';
  isNew?: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface ChallengesTopResponse {
  id: number;
  title: string;
  capacity: number;
  participants: number;
  status: 'RECRUITING' | 'ONGOING' | 'ENDED';
}

export interface InviteList {
  id: 0;
  requestUsername: string;
  challengeName: string;
  isAccept: true;
  requestAt: string;
  updateAt: string;
}

export interface NewChallenges {
  id: number;
  title: string;
  capacity: number;
  participants: number;
  status: 'RECRUITING' | 'ONGOING' | 'ENDED';
}

export interface Content {
  id: number;
  title: string;
  capacity: number;
  status: string;
}

export interface GetChallenge {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateChallenge {
  id: number;
  title: string;
  text: string;
  release: string;
  amount: number;
  capacity: number;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  createDate: string;
  modifyDate: string;
}

export interface detailChallenge {
  id: number;
  creator: string;
  title: string;
  release: string;
  amount: number;
  capacity: number;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  createDate: string;
  modifyDate: string;
}

export interface Invitation {
  id: number;
  requestUsername: string;
  challengeName: string;
  isAccept: boolean;
  requestAt: string;
  updateAt: string;
}

export interface InvitationResponse {
  id: number;
  name: string;
  totalSpend: number;
  amount: number;
  endDay: number;
  isSuccess: boolean;
  isWriteTip: boolean;
}

// 요청 파라미터를 위한 타입
export interface GetChallengeParams {
  title?: string;
  text?: string;
  page: number;
  size: number;
  tab?: number;
}

export interface CreateChallengeParams {
  title: string;
  text: string;
  release: string;
  amount: number;
  targetAmount: number;
  capacity: number;
  category: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface InvitationParams {
  id: number;
}
