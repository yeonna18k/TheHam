'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '../../store/challengeStore';
import { ChallengeDetailHeader } from '../../components/goals/ChallengeDetailHeader';
import { TabNav } from '../../components/goals/TabNav';
import { ChallengeCard } from '../../components/goals/ChallengeCard';
import { AddChallengeButton } from '../../components/goals/AddChallengeButton';
import { AddChallengeModal } from '../../components/goals/AddChallengeModal';
import BottomNavigation from '../../components/main/BottomNavigation';

export default function ChallengeList() {
  const router = useRouter();
  const challenges = useChallengeStore(state => state.challenges);
  const selectChallenge = useChallengeStore(state => state.selectChallenge);
  
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['모든 챌린지', '신규 챌린지', '내 챌린지'];

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  return (
    <div className="pb-16 max-w-md mx-auto">
      <ChallengeDetailHeader title="챌린지" />
      
      <div className="p-4">
        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-4">
          {challenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => handleChallengeClick(challenge.id)}
            />
          ))}
        </div>
      </div>
      
        <AddChallengeButton onClick={() => setIsModalOpen(true)} />
      
      <AddChallengeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <BottomNavigation activeTab="goals" />
    </div>
  );
}
