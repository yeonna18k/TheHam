import { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';
import ChallengeJoinButton from './JoinButton';

export default function NewChallenges() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with your API
    const fetchChallenges = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockChallenges: Challenge[] = [
        {
          id: '4',
          title: '14일 독서 챌린지',
          description: '매일 30분씩 독서하기',
          currentParticipants: 30,
          maxParticipants: 50,
          daysLeft: 14,
          isNew: true
        },
        {
          id: '5',
          title: '10일 걷기 챌린지',
          description: '하루 5000보 이상 걷기',
          currentParticipants: 42,
          maxParticipants: 100,
          daysLeft: 10,
          isNew: true
        },
        {
          id: '6',
          title: '7일 아침식사 챌린지',
          description: '일주일 동안 건강한 아침 먹기',
          currentParticipants: 25,
          maxParticipants: 50,
          daysLeft: 7,
          isNew: true
        }
      ];
      
      setChallenges(mockChallenges);
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  if (loading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      {challenges.map((challenge) => (
        <div 
          key={challenge.id} 
          className="bg-white p-4 mb-4 rounded-lg shadow-sm"
          onClick={() => handleChallengeClick(challenge.id)}
        >
          {challenge.isNew && (
            <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md mb-2">신규</span>
          )}
          <h3 className="text-lg font-bold">{challenge.title}</h3>
          {challenge.description && (
            <p className="text-gray-500 text-sm mt-1">{challenge.description}</p>
          )}
          
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>현재까지 {challenge.currentParticipants}명 참여</span>
              {challenge.daysLeft !== undefined && <span>{challenge.daysLeft}일 남음</span>}
            </div>
            <ChallengeJoinButton challengeId={challenge.id} />
          </div>
        </div>
      ))}
    </div>
  );
}