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

export interface Content {
  id: number;
  title: string;
  capacity: number;
  status: string;
}
// 챌린지 조회
export interface GetChallengesRequest {
  title?: string;
  text?: string;
  page: number;
  size: number;
}

export interface GetChallengesResponse {
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

// 챌린지 생성
export interface PostChallengesRequest {
  title: string;
  text: string;
  release: string;
  amount: number;
  targetAmount: number;
  capacity: number;
  category: string[];
  startDate: string;
  endDate: string;
  description: string;
}

interface CategoryName {
  name: string;
}
export interface PostChallengesResponse {
  id: number;
  title: string;
  text: string;
  release: string;
  amount: number;
  capacity: number;
  challengeCategory: CategoryName[];
  status: string;
  startDate: string;
  endDate: string;
  createDate: string;
  modifyDate: string;
}
// 챌린지 상세 조회
export interface GetDetailChallengesResponse {
  id: number;
  creator: string;
  title: string;
  release: string;
  amount: number;
  capacity: number;
  challengeCategory: CategoryName[];
  status: string;
  startDate: string;
  endDate: string;
  createDate: string;
  modifyDate: string;
}

// 챌린지 수정
export interface PutChallengesRequest {
  title: string;
  text: string;
  release: string;
  amount: number;
  capacity: number;
  categoryList: string[];
  startDate: string;
  endDate: string;
}
export interface PutChallengesResponse {
  id: number;
  title: string;
  text: string;
  release: string;
  amount: number;
  capacity: number;
  categories: CategoryName[];
  status: string;
  startDate: string;
  endDate: string;
  createDate: string;
  modifyDate: string;
}

// 내 참여 챌린지 타입
export interface GetChallengesMeRequest {
  page: number;
  size: number;
}
export interface GetChallengesMeResponse {
  id: number;
  name: string;
  totalSpend: number;
  amount: number;
  endDay: number;
  isSuccess: boolean;
  isWriteTip: boolean;
}

// 신규 챌린지 타입
export interface GetChallengesNewRequest {
  page: number;
  size: number;
}

export interface GetChallengesNewResponse {
  id: number;
  title: string;
  capacity: number;
  participants: number;
  status: 'RECRUITING' | 'ONGOING' | 'ENDED';
}

// 인기 챌린지 타입
export interface GetChallengesTopResponse {
  id: number;
  title: string;
  capacity: number;
  participants: number;
  status: 'RECRUITING' | 'ONGOING' | 'ENDED';
}
