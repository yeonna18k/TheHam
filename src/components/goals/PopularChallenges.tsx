import { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';
import ChallengeJoinButton from './JoinButton';

export default function PopularChallenges() {
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
          id: '1',
          title: '30일 커피 줄이기 챌린지',
          description: '30일동안 주 2회 커피마시기 챌린지! 카페인을 줄이고 건강은 높이고!',
          currentParticipants: 120,
          maxParticipants: 200,
          daysLeft: 25
        },
        {
          id: '2',
          title: '15일 점심 도시락 챌린지',
          description: '2주동안 도시락 싸기 챌린지!',
          currentParticipants: 85,
          maxParticipants: 100,
          daysLeft: 10
        },
        {
          id: '3',
          title: '21일 물 마시기 챌린지',
          description: '하루에 2L 물 마시기',
          currentParticipants: 75,
          maxParticipants: 100,
          daysLeft: 21
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
          <h3 className="text-lg font-bold">{challenge.title}</h3>
          {challenge.description && (
            <p className="text-gray-500 text-sm mt-1">{challenge.description}</p>
          )}
          
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span className="text-green-500">현재까지 {challenge.currentParticipants}명 참여</span>
              {challenge.daysLeft !== undefined && <span>{challenge.daysLeft}일 남음</span>}
            </div>
            <ChallengeJoinButton challengeId={challenge.id} />
          </div>
        </div>
      ))}
    </div>
  );
}