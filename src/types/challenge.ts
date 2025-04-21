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

