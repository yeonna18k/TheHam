import React from 'react';
import { ChallengeItem } from './ChallengeItem';
import { useMyChallenge } from '@/hooks/useChallenges';
import { InvitationResponse } from '@/types/challenge';

interface ChallengeListProps {
  challenges?: InvitationResponse[];
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
    const { data: fetchedChallenges, isLoading: loading, isError: error } = useMyChallenge(); // 훅을 통해 데이터 가져오기
  
    const displayChallenges = challenges || fetchedChallenges; // 외부 데이터가 없으면 fetchedChallenges 사용
  
    if (loading) {
      return <div>로딩 중...</div>;
    }
  
    if (error) {
      return <div>{String(error)}</div>;
    }
  
    return (
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">참여중인 챌린지</h2>
          <span className="text-gray-400">≫</span>
        </div>
        
        {(displayChallenges ?? []).length === 0 ? (
          <div>참여 중인 챌린지가 없습니다.</div>
        ) : (
          (displayChallenges ?? []).map((challenge: InvitationResponse) => (
            <ChallengeItem 
              key={challenge.id}
              title={challenge.name} // name 사용
              progress={Math.round((challenge.totalSpend / challenge.amount) * 100)} // 예시로 진행률 계산
              daysLeft={challenge.endDay} // endDay 사용
            />
          ))
        )}
      </div>
    );
  };