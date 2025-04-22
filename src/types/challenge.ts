import { Participant } from './Participant';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  targetAmount: number;
  currentAmount: number;
  participants: Participant[];
  isPublic: boolean;
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
  status: string; // e.g., "RECRUITING"
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
  capacity: number;
  category: string;
  startDate: string;
  endDate: string;
}

export interface InvitationParams {
  id: number;
}

