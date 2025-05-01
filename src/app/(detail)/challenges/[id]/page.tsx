'use client';

import { ActionButtons } from '@/components/goals/ActionButtons';
import { ChallengeDetailHeader } from '@/components/goals/ChallengeDetailHeader';
import { ChallengeProgress } from '@/components/goals/ChallengeProgress';
import { ParticipantList } from '@/components/goals/ParticipantList';
import { PaymentSection } from '@/components/goals/PaymentSection';
import { PublicToggle } from '@/components/goals/PublicToggle';
import { useDetailChallenge } from '@/hooks/useChallenges';
import { useParams } from 'next/navigation';

export default function ChallengeDetail() {
  const params = useParams();
  const id = Number(params?.id);

  const { data: challenge, isLoading } = useDetailChallenge(id);
  if (isLoading || !challenge) return <div>Loading…</div>;

  return (
    <div className="pb-16 max-w-md mx-auto">
      <ChallengeDetailHeader title="챌린지 상세" />
      <div className="p-4">
        <ChallengeProgress challenge={challenge} />
        <ParticipantList capacity={challenge.capacity} />
        <PublicToggle
          challengeId={String(challenge.id)}
          isPublic={challenge.release === 'PUBLIC'}
        />
        <ActionButtons />
        <PaymentSection totalSavings={27000} payments={[]} />
      </div>
    </div>
  );
}
