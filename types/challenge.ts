import { Participant } from "./Participant";

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