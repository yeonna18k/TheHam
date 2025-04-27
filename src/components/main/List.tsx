import React from 'react';
import { ChallengeItem, ChallengeItemProps } from './ChallengeItem';

interface ChallengeListProps {
  challenges?: (ChallengeItemProps & { id: number | string })[];
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  const defaultChallenges: (ChallengeItemProps & { id: number | string })[] = [
    { id: 1, title: '30일 커피 줄이기 챌린지', progress: 66, daysLeft: 5 }
  ];

  const displayChallenges = challenges || defaultChallenges;

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">참여중인 챌린지</h2>
        <span className="text-gray-400">≫</span>
      </div>
      
      {displayChallenges.map(challenge => (
        <ChallengeItem 
          key={challenge.id}
          title={challenge.title}
          progress={challenge.progress}
          daysLeft={challenge.daysLeft}
        />
      ))}
    </div>
  );
};