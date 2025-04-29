import React from 'react';
import { ChallengeItem } from './ChallengeItem';
import { useMyChallenge } from '@/hooks/useChallenges';
import { InvitationResponse } from '@/types/challenge';
import { PiggyBank, ArrowRight } from 'lucide-react';

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
          <div className="flex flex-col items-center justify-center p-6 my-4 bg-gradient-to-r from-green-50 to-green-50 rounded-lg border border-green-100 shadow-sm">
          <div className="flex justify-center items-center bg-green-100 p-3 rounded-full mb-4">
            <PiggyBank className="text-green-500" size={32} />
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-2">참여중인 챌린지 내역이 없어요!</h3>
          <p className="text-gray-500 text-center text-sm mb-4">챌린지에 참여하고 저축왕이 되어보세요.</p>
          
          <button 
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 font-medium"
            onClick={() => window.location.href = '/goals'} // 모달 열기
          >
            챌린지 참여하기
            <ArrowRight className="ml-1" size={16} />
          </button>
        </div>
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