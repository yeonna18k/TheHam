import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';
import { useInviteList, useRejectChallenge, useAcceptChallenge } from '@/hooks/useChallenges';
import { InviteList } from '@/types/challenge'; // 타입 수정
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function InvitedChallenges() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const { data, isLoading } = useInviteList();
  const challenges: InviteList[] = Array.isArray(data) ? data : [];
  const { mutate: acceptChallenge } = useAcceptChallenge();
  const { mutate: rejectChallenge } = useRejectChallenge();

  const handleChallengeClick = (challengeId: number) => {
    selectChallenge(challengeId.toString());
    router.push(`/goals/${challengeId}`);
  };

  const handleAccept = (challengeId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    acceptChallenge(challengeId);
  };

  const handleReject = (challengeId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    rejectChallenge(challengeId);
  };

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      {challenges.map((challenge: { id: number; requestUsername: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined; challengeName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined; requestAt: string | number | Date; }) => (
        <div 
          key={challenge.id}
          className="bg-white p-4 mb-4 rounded-lg shadow-sm"
          onClick={() => handleChallengeClick(challenge.id)}
        >
          <div className="flex flex-col">
            <p className="text-green-500 text-sm">{challenge.requestUsername}님이 초대했습니다</p>
            <h3 className="text-xl font-bold mt-2">{challenge.challengeName}</h3>
            <div className="mt-2 text-sm text-gray-500">
              요청 일자: {new Date(challenge.requestAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex mt-4">
            <button 
              className="flex-1 py-2 border border-green-500 text-green-500 rounded-md mr-2"
              onClick={(e) => handleAccept(challenge.id, e)}
            >
              수락
            </button>
            <button 
              className="flex-1 py-2 bg-white border border-red-300 text-red-400 rounded-md"
              onClick={(e) => handleReject(challenge.id, e)}
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
