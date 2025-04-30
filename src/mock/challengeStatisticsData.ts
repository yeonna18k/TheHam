export interface ChallengeStatistics {
  type: 'amount' | 'count';
  description: string;
  value: number;
  order: number;
}

export const CHALLENGES_STATICS: Record<
  string,
  Omit<ChallengeStatistics, 'value'>
> = {
  completedChallenges: {
    type: 'amount',
    description: '챌린지 성공 누적 금액',
    order: 0,
  },
  finishedChallenge: {
    type: 'count',
    description: '성공한 챌린지',
    order: 1,
  },
  participatingChallenges: {
    type: 'count',
    description: '참여중인 챌린지',
    order: 2,
  },
  savings: {
    type: 'count',
    description: '종료된 챌린지',
    order: 3,
  },
};
