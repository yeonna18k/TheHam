'use client';

import { ActionButtons } from '@/components/challenges/ActionButtons';
import { ChallengeDetailHeader } from '@/components/challenges/ChallengeDetailHeader';
import { ChallengeProgress } from '@/components/challenges/ChallengeProgress';
import { ParticipantList } from '@/components/challenges/ParticipantList';
import { PaymentSection } from '@/components/challenges/PaymentSection';
import { PublicToggle } from '@/components/challenges/PublicToggle';
import { useDetailChallenge } from '@/hooks/useChallenges';
import { useParams } from 'next/navigation';

export default function ChallengeDetail() {
  const params = useParams();
  const id = Number(params?.id);

  const { data: challenge, isLoading } = useDetailChallenge(id);
  if (isLoading || !challenge) return <div>Loading…</div>;

  // const { data: challenge, isLoading } = useQuery({
  //   queryKey: ['challenge', id],
  //   queryFn: () => DetailChallenge(id),
  // });

  return (
    <div className="pb-16 max-w-md mx-auto">
      <ChallengeDetailHeader title="챌린지 상세" />
      {challenge && (
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
      )}
    </div>
  );
}
