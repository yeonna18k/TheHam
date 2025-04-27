import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';
import ChallengeJoinButton from './JoinButton';
import { useNewChallenges } from '@/hooks/useChallenges';
import { PopularChallenge } from '@/types/challenge';

export default function PopularChallenges() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const { data: challenges = [], isLoading } = useNewChallenges();

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      {challenges.map((challenge: PopularChallenge) => (
        <div
          key={challenge.id}
          className="bg-white p-4 mb-4 rounded-lg shadow-sm cursor-pointer"
          onClick={() => handleChallengeClick(challenge.id.toString())}
        >
          <h3 className="text-lg font-bold">{challenge.title}</h3>
          
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span className="text-green-500">
                현재까지 {challenge.participants}명 참여
              </span>
              <span>
                모집 정원 {challenge.capacity}명
              </span>
            </div>

            <div className="text-sm text-gray-400">
              상태: {challenge.status === 'RECRUITING' ? '모집중' : challenge.status}
            </div>

            <ChallengeJoinButton challengeId={challenge.id.toString()} />
          </div>
        </div>
      ))}
    </div>
  );
}
