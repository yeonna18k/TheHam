import { usePopularChallenges } from '@/hooks/useChallenges';
import { PopularChallenge } from '@/types/challenge';
import { Star, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie-player';
import loadingData from '../../../public/lottie/piggy_loading.json';
import CardBoxLayout from '../common/CardBoxLayout';
import ChallengeJoinButton from './JoinButton';

export default function PopularChallenges() {
  const router = useRouter();
  const { data: challenges, isPending } = usePopularChallenges();

  const handleChallengeClick = (challengeId: string) => {
    router.push(`/challenges/${challengeId}`);
  };

  if (isPending) {
    return (
      <div className="p-4 text-center">
        <Lottie animationData={loadingData} />
      </div>
    );
  }

  if (challenges?.length === 0) {
    return (
      <CardBoxLayout>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy className="w-16 h-16 text-gray-300" />
            <Star className="w-6 h-6 text-amber-400 absolute -right-2 -top-1" />
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-2">
          아직 인기 챌린지가 없어요!
        </h3>

        <p className="text-gray-500">가장 먼저 챌린지를 등록하고</p>
        <p className="text-gray-500">참여를 유도해보세요.</p>
      </CardBoxLayout>
    );
  }

  return (
    <>
      {challenges?.map((challenge: PopularChallenge) => (
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
              <span>모집 정원 {challenge.capacity}명</span>
            </div>

            <div className="text-sm text-gray-400">
              상태:{' '}
              {challenge.status === 'RECRUITING' ? '모집중' : challenge.status}
            </div>

            <ChallengeJoinButton challengeId={challenge.id.toString()} />
          </div>
        </div>
      ))}
    </>
  );
}
