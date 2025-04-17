import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useChallengeStore } from '../../store/challengeStore';
import { ChallengeDetailHeader } from '../../components/goals/ChallengeDetailHeader';
import { ChallengeProgress } from '../../components/goals/ChallengeProgress';
import { ParticipantList } from '../../components/goals/ParticipantList';
import { PublicToggle } from '../../components/goals/PublicToggle';
import { ActionButtons } from '../../components/goals/ActionButtons';
import { PaymentSection } from '../../components/goals/PaymentSection';
import BottomNavigation from '../../components/main/BottomNavigation';

export default function ChallengeDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const selectedChallenge = useChallengeStore(state => state.selectedChallenge);
  const selectChallenge = useChallengeStore(state => state.selectChallenge);
  const payments = useChallengeStore(state => state.payments);
  
  const [bottomTab, setBottomTab] = useState('challenges');
  
  useEffect(() => {
    if (id && typeof id === 'string') {
      selectChallenge(id);
    }
  }, [id, selectChallenge]);

  if (!selectedChallenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-16">
      <ChallengeDetailHeader title="챌린지 상세" />
      
      <div className="p-4">
        <ChallengeProgress challenge={selectedChallenge} />
        <ParticipantList participants={selectedChallenge.participants} />
        <PublicToggle 
          challengeId={selectedChallenge.id}
          isPublic={selectedChallenge.isPublic} 
        />
        
        <ActionButtons />
        
        <PaymentSection
          totalSavings={27000}
          payments={payments}
        />
      </div>
      
      <BottomNavigation activeTab="goals" />
    </div>
  );
}