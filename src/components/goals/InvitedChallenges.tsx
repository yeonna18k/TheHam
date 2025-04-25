import { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';

export default function InvitedChallenges() {
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
          id: '7',
          title: '30일 커피 줄이기 챌린지',
          description: '30일동안 주 2회 커피마시기 챌린지! 카페인을 줄이고 건강은 높이고!',
          currentParticipants: 5,
          daysLeft: 5,
          isInvited: true,
          invitedBy: '강남언니'
        },
        {
          id: '8',
          title: '15일 점심 도시락 챌린지',
          description: '2주동안 도시락 싸기 챌린지!',
          currentParticipants: 17,
          daysLeft: 3,
          isInvited: true,
          invitedBy: '강남언니'
        },
        {
          id: '9',
          title: '30일 택시 안타기 챌린지',
          description: '한달 동안 대중교통만 이용하기 건강도 챙기고 환경도 챙겨요!',
          currentParticipants: 8,
          daysLeft: 3,
          isInvited: true,
          invitedBy: '강남언니'
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

  const handleAccept = (challengeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // 참여 로직 구현
    console.log('Accept challenge:', challengeId);
  };

  const handleReject = (challengeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // 거절 로직 구현
    console.log('Reject challenge:', challengeId);
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
          <div className="flex items-start mb-2">
            <div className="w-8 h-8 mr-2 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-sm">{challenge.invitedBy}에게서 초대한 챌린지입니다</p>
              <h3 className="text-xl font-bold mt-2">{challenge.title}</h3>
              {challenge.description && <p className="text-gray-500 text-sm mt-1">{challenge.description}</p>}
              
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>현재까지 {challenge.currentParticipants}명 참여</span>
                  {challenge.daysLeft !== undefined && <span>{challenge.daysLeft}일 남음</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-4">
            <button 
              className="flex-1 py-2 border border-green-500 text-green-500 rounded-md mr-2"
              onClick={(e) => handleAccept(challenge.id, e)}
            >
              참여하기
            </button>
            <button 
              className="flex-1 py-2 bg-white border border-red-300 text-red-400 rounded-md"
              onClick={(e) => handleReject(challenge.id, e)}
            >
              거절하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}