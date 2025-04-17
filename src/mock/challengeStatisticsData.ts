export interface ChallengeStatistics {
  id: number;
  type: "amount" | "count";
  description: string;
  amount?: number;
  count?: number;
}

export const MOCK_CHALLENGES: ChallengeStatistics[] = [
  {
    id: 1,
    type: "amount",
    description: "챌린지 성공 누적 금액",
    amount: 300000,
  },
  {
    id: 2,
    type: "count",
    description: "성공한 챌린지",
    count: 5,
  },
  {
    id: 3,
    type: "count",
    description: "참여중인 챌린지",
    count: 2,
  },
  {
    id: 4,
    type: "count",
    description: "종료된 챌린지",
    count: 7,
  },
];
