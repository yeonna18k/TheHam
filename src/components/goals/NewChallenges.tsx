import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';
import ChallengeJoinButton from './JoinButton';
import { useNewChallenges } from '@/hooks/useChallenges';
import { PopularChallenge } from '@/types/challenge';
import { Trophy, Star } from 'lucide-react';

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

  if (challenges.length === 0) {
    return (
      <div className="p-8 text-center bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy className="w-16 h-16 text-gray-300" />
            <Star className="w-6 h-6 text-amber-400 absolute -right-2 -top-1" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          아직 신규 챌린지가 없어요!
        </h3>
        
        <p className="text-gray-500">
          가장 먼저 챌린지를 등록하고
        </p>
        <p className="text-gray-500">
          참여를 유도해보세요.
        </p>
      </div>
    );
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
