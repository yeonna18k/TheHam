'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '../../store/challengeStore';
import BottomNavigation from '../../components/main/BottomNavigation';
import { useGetChallenge } from '@/hooks/useChallenges';
import PopularChallenges from '../../components/goals/PopularChallenges';
import NewChallenges from '../../components/goals/NewChallenges';
import InvitedChallenges from '../../components/goals/InvitedChallenges';
import MyChallenges from '../../components/goals/MyChallenges';

type Tab = '인기 챌린지' | '신규 챌린지' | '초대 챌린지' | '내 챌린지';

export default function ChallengeList() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const [activeTab, setActiveTab] = useState<Tab>('인기 챌린지');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabMapping = {
    '인기 챌린지': 0,
    '신규 챌린지': 1,
    '초대 챌린지': 2,
    '내 챌린지': 3,
  };

  // 챌린지 목록 가져오기
  const { data: challenges = [] } = useGetChallenge({ 
    tab: tabMapping[activeTab], 
    page: 1, 
    size: 10 
  });
  
  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-16 max-w-md mx-auto">
      <header className="flex items-center p-4 border-b">
        <button className="mr-auto" onClick={() => router.back()}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-medium text-center flex-1">챌린지</h1>
        <div className="w-6"></div>
      </header>

      <nav className="flex border-b">
        {(['인기 챌린지', '신규 챌린지', '초대 챌린지', '내 챌린지'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-sm ${
              activeTab === tab 
                ? 'text-green-500 border-b-2 border-green-500' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto">
        {activeTab === '인기 챌린지' && <PopularChallenges challenges={challenges} onChallengeClick={handleChallengeClick} />}
        {activeTab === '신규 챌린지' && <NewChallenges challenges={challenges} onChallengeClick={handleChallengeClick} />}
        {activeTab === '초대 챌린지' && <InvitedChallenges challenges={challenges} onChallengeClick={handleChallengeClick} />}
        {activeTab === '내 챌린지' && <MyChallenges challenges={challenges} onChallengeClick={handleChallengeClick} />}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* We need to assume AddChallengeModal exists or create it */}
      {isModalOpen && (
        <div className="modal">
          {/* Replace with your actual modal component */}
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="goals" />
    </div>
  );
}