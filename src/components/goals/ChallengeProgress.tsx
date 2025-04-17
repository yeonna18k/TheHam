import { Challenge } from '../../../types/challenge';

export const ChallengeProgress = ({ challenge }: { challenge: Challenge }) => {
  const progress = Math.round((challenge.currentAmount / challenge.targetAmount) * 100);
  const daysLeft = 17; // This would be calculated from challenge.endDate

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">{challenge.title}</h2>
      <p className="text-sm mb-2">{challenge.description}</p>
      
      <div className="mb-2">
        <p className="text-sm">기간: {challenge.startDate} - {challenge.endDate}</p>
        <p className="text-sm">남은 기간: {daysLeft}일</p>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm">목표 금액: {challenge.targetAmount.toLocaleString()}원</span>
          <span className="text-sm text-green-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">현재 사용 금액: {challenge.currentAmount.toLocaleString()}원</p>
      </div>
    </div>
  );
};