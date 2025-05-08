import { GetDetailChallengesResponse } from '@/types/challenges';

export const ChallengeProgress = ({
  challenge,
}: {
  challenge: GetDetailChallengesResponse;
}) => {
  const progress = Math.round((0 / challenge.amount) * 100);
  const daysLeft = calculateDaysLeft(challenge.endDate);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">{challenge.title}</h2>
      <div className="mb-2">
        <p className="text-sm">
          기간: {challenge.startDate} - {challenge.endDate}
        </p>
        <p className="text-sm">남은 기간: {daysLeft}일</p>
      </div>

      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm">
            목표 금액: {challenge.amount.toLocaleString()}원
          </span>
          <span className="text-sm text-green-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">현재 사용 금액: 0원</p>
      </div>
    </div>
  );
};

// 유틸 함수
function calculateDaysLeft(endDateStr: string): number {
  const today = new Date();
  const endDate = new Date(endDateStr);
  const diffTime = endDate.getTime() - today.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
}
