import { useMyChallenge } from '@/hooks/useChallenges';
import { useChallengeStore } from '@/store/challengeStore';
import { Star, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyChallenges() {
  const router = useRouter();
  const selectChallenge = useChallengeStore((state) => state.selectChallenge);
  const [filter, setFilter] = useState<string>('전체보기');

  const { data: myChallenges, isPending } = useMyChallenge({
    page: 1,
    size: 10,
  });

  const filterOptions = [
    '전체보기',
    '진행중인 챌린지',
    '종료된 챌린지',
    '성공한 챌린지',
  ];

  // 현재 날짜 기준으로 남은 일수를 계산하는 함수
  const calculateDaysLeft = (endDay: string) => {
    const today = new Date();
    const endDate = new Date(endDay);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  // 필터링된 챌린지 데이터
  const filteredChallenges = myChallenges
    ? myChallenges.filter((challenge) => {
        const daysLeft = calculateDaysLeft(challenge.endDay);

        switch (filter) {
          case '진행중인 챌린지':
            return daysLeft > 0;
          case '종료된 챌린지':
            return daysLeft === 0;
          case '성공한 챌린지':
            return challenge.isSuccess;
          default:
            return true; // 전체보기
        }
      })
    : [];

  const handleChallengeClick = (challengeId: string) => {
    selectChallenge(challengeId);
    router.push(`/goals/${challengeId}`);
  };

  if (isPending) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (!myChallenges || myChallenges.length === 0) {
    return (
      <div className="p-8 text-center bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy className="w-16 h-16 text-gray-300" />
            <Star className="w-6 h-6 text-amber-400 absolute -right-2 -top-1" />
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-2">
          아직 내 챌린지가 없어요!
        </h3>

        <p className="text-gray-500">가장 먼저 챌린지를 등록하고</p>
        <p className="text-gray-500">참여를 유도해보세요.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded-lg text-gray-700 bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {filteredChallenges.map((challenge) => {
        const daysLeft = calculateDaysLeft(challenge.endDay);
        const progress = challenge.totalSpend;
        const goal = challenge.amount;
        const progressPercentage = goal
          ? Math.min(100, (progress / goal) * 100)
          : 0;

        return (
          <div
            key={challenge.id}
            className="mb-4"
            onClick={() => handleChallengeClick(challenge.id.toString())}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-gray-500 text-sm">
                {daysLeft > 0
                  ? `${daysLeft}일 남았어요`
                  : '챌린지가 종료되었어요'}
              </div>
              <div className="flex items-center">
                <span className="text-green-500 font-medium">
                  {progress?.toLocaleString()}원
                </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-400">
                  {goal?.toLocaleString()}원
                </span>
              </div>
            </div>

            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div
              className={`mt-2 p-4 rounded-lg ${
                challenge.isSuccess
                  ? 'bg-green-100'
                  : daysLeft === 0 && !challenge.isSuccess
                    ? 'bg-red-100'
                    : 'bg-white'
              } shadow-sm`}
            >
              {(challenge.isSuccess ||
                (daysLeft === 0 && !challenge.isSuccess)) && (
                <div
                  className={`float-right w-6 h-6 rounded-full ${
                    challenge.isSuccess ? 'bg-green-500' : 'bg-red-500'
                  } text-white flex items-center justify-center text-xs`}
                >
                  {challenge.isSuccess ? '✓' : '!'}
                </div>
              )}
              <h3 className="text-lg font-medium">{challenge.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {challenge.isSuccess
                  ? '챌린지를 성공했어요'
                  : daysLeft === 0 && !challenge.isSuccess
                    ? '챌린지를 실패했어요'
                    : '진행 중인 챌린지'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
