import { useMyChallenge } from '@/hooks/useChallenges';
import { InvitationResponse } from '@/types/challenge';
import { ChevronsRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ChallengeItem } from './ChallengeItem';

interface ChallengeListProps {
  challenges?: InvitationResponse[];
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  const {
    data: fetchedChallenges,
    isLoading: loading,
    isError: error,
  } = useMyChallenge(); // 훅을 통해 데이터 가져오기
  const displayChallenges = challenges || fetchedChallenges; // 외부 데이터가 없으면 fetchedChallenges 사용

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{String(error)}</div>;
  }

  return (
    <Link
      href="/challenges"
      className="px-3 py-6 flex flex-col gap-3 rounded-lg bg-white shadow-sm"
    >
      <div className="flex justify-between items-center">
        <h1 className="title1">참여중인 챌린지</h1>
        <ChevronsRight size={24} />
      </div>
      {(displayChallenges ?? []).length === 0 ? (
        <div className="rounded-md p-4 flex border items-center gap-2">
          <div className="rounded-full bg-primary/20 h-9 w-9 items-center flex justify-center">
            <Trophy size={24} className="text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 body3">
              참여중인 챌린지가 없어요!
            </span>
            <Link href="/challenges" className="flex title3 text-primary">
              챌린지 참여하기
              <ChevronsRight />
            </Link>
          </div>
        </div>
      ) : (
        (displayChallenges ?? []).map((challenge: InvitationResponse) => (
          <ChallengeItem
            key={challenge.id}
            title={challenge.name} // name 사용
            progress={Math.round(
              (challenge.totalSpend / challenge.amount) * 100
            )} // 예시로 진행률 계산
            daysLeft={challenge.endDay} // endDay 사용
          />
        ))
      )}
    </Link>
  );
};
