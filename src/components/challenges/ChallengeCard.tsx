import { PopularChallenge } from '@/types/challenge';
import ChallengeJoinButton from './JoinButton';

export default function ChallengeCard({
  id,
  title,
  participants,
  capacity,
  status,
}: PopularChallenge) {
  return (
    <div className="rounded-md shadow-sm px-3 py-6 flex flex-col gap-3">
      <h1>{title}</h1>
      <div className="mt-2">
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span className="text-green-500">현재까지 {participants}명 참여</span>
          <span>모집 정원 {capacity}명</span>
        </div>

        <div className="text-sm text-gray-400">
          상태: {status === 'RECRUITING' ? '모집중' : status}
        </div>

        <ChallengeJoinButton challengeId={id.toString()} />
      </div>
    </div>
  );
}
