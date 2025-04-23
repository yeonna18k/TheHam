import { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { useRouter } from 'next/navigation';
import { useChallengeStore } from '@/store/challengeStore';

export default function MyChallenges() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const [filter, setFilter] = useState<string>('전체보기');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  
  const filterOptions = ['전체보기', '진행중인 챌린지', '종료된 챌린지', '내가 만든 챌린지'];

  useEffect(() => {
    const fetchChallenges = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockChallenges: Challenge[] = [
        {
          id: '10',
          title: '30일 커피 줄이기 챌린지',
          progress: 28000,
          goal: 40000,
          daysLeft: 5,
          status: 'active'
        },
        {
          id: '11',
          title: '15일 점심 도시락 챌린지',
          progress: 10000,
          goal: 20000,
          daysLeft: 0,
          status: 'failed',
          isFailed: true
        },
        {
          id: '12',
          title: '14일 운동 챌린지',
          progress: 50000,
          goal: 50000,
          daysLeft: 0,
          status: 'completed',
          isCompleted: true
        }
      ];
      
      let filteredChallenges = [...mockChallenges];
      if (filter === '진행중인 챌린지') {
        filteredChallenges = mockChallenges.filter(c => c.status === 'active');
      } else if (filter === '종료된 챌린지') {
        filteredChallenges = mockChallenges.filter(c => 
          c.status === 'completed' || c.status === 'failed');
      } else if (filter === '내가 만든 챌린지') {

      
      setChallenges(filteredChallenges);
      setLoading(false);
    };
  }

    fetchChallenges();
  }, [filter]);
  

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  if (loading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <select 
          className="w-full p-2 border rounded-lg text-gray-700 bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filterOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {challenges.map((challenge) => (
        <div 
          key={challenge.id} 
          className="mb-4"
          onClick={() => handleChallengeClick(challenge.id)}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="text-gray-500 text-sm">
              {challenge.daysLeft !== undefined && 
                (challenge.daysLeft > 0 
                  ? `${challenge.daysLeft}일 남았어요` 
                  : '챌린지가 종료되었어요')}
            </div>
            <div className="flex items-center">
              <span className="text-green-500 font-medium">{challenge.progress?.toLocaleString()}원</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-400">{challenge.goal?.toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${challenge.progress && challenge.goal ? Math.min(100, (challenge.progress / challenge.goal) * 100) : 0}%` }}
            ></div>
          </div>
          
          <div className={`mt-2 p-4 rounded-lg ${
            challenge.isCompleted ? 'bg-green-100' : 
            challenge.isFailed ? 'bg-red-100' : 'bg-white'
          } shadow-sm`}>
            {(challenge.isCompleted || challenge.isFailed) && (
              <div className={`float-right w-6 h-6 rounded-full ${
                challenge.isCompleted ? 'bg-green-500' : 'bg-red-500'
              } text-white flex items-center justify-center text-xs`}>
                {challenge.isCompleted ? '✓' : '!'}
              </div>
            )}
            <h3 className="text-lg font-medium">{challenge.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {challenge.isCompleted 
                ? "챌린지를 성공했어요" 
                : challenge.isFailed 
                  ? "챌린지를 실패했어요" 
                  : "진행 중인 챌린지"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}