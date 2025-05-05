'use client';

import { AddChallengeButton } from '@/components/goals/AddChallengeButton';
import { AddChallengeModal } from '@/components/goals/AddChallengeModal';
import InvitedChallenges from '@/components/goals/InvitedChallenges';
import MyChallenges from '@/components/goals/MyChallenges';
import NewChallenges from '@/components/goals/NewChallenges';
import PopularChallenges from '@/components/goals/PopularChallenges';
import { Button } from '@/components/ui/button';
import { useGetChallenge } from '@/hooks/useChallenges';
import { useChallengeStore } from '@/store/challengeStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Tab = '인기 챌린지' | '신규 챌린지' | '초대 챌린지' | '내 챌린지';

export default function Challenges() {
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
    size: 10,
  });

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <nav className="flex">
        {(
          ['인기 챌린지', '신규 챌린지', '초대 챌린지', '내 챌린지'] as Tab[]
        ).map((tab) => (
          <Button
            key={tab}
            variant="tab"
            className={`!rounded-none ${
              activeTab === tab ? 'text-primary border-b-2 border-primary' : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto">
        {activeTab === '인기 챌린지' && (
          <PopularChallenges
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
          />
        )}
        {activeTab === '신규 챌린지' && (
          <NewChallenges
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
          />
        )}
        {activeTab === '초대 챌린지' && (
          <InvitedChallenges
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
          />
        )}
        {activeTab === '내 챌린지' && (
          <MyChallenges
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
          />
        )}
      </div>

      <AddChallengeButton onClick={() => setIsModalOpen(true)} />

      <AddChallengeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
