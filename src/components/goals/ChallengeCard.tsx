import { Challenge } from '../../../types/challenge';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

export const ChallengeCard = ({ challenge, onClick }: ChallengeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4" onClick={onClick}>
      <div className="font-bold text-lg">{challenge.title}</div>
      <div className="text-sm text-gray-600 mb-2">{challenge.description}</div>
      <button className="bg-green-500 text-white rounded-full px-6 py-2 w-full">
        일주일 커피 한 잔 줄이기
      </button>
      <div className="text-sm text-gray-600 mt-2">
        매일 마시는 커피, 일주일에 한 번만 참아볼까요?
      </div>
    </div>
  );
};
