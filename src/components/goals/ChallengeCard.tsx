import { Challenge } from '../../../types/challenge';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

export const ChallengeCard = ({ challenge, onClick }: ChallengeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4" onClick={onClick}>
      <div className="font-bold text-lg mb-2">{challenge.title}</div>
      <div className="text-sm text-gray-600">{challenge.description}</div>
      <div className="text-sm text-gray-600">
        매일 마시는 커피, 일주일에 한 번만 참아볼까요?
      </div>
      <button className="bg-black text-white rounded-full px-6 py-2 mt-3 w-full">
        자세히 보기
      </button>
    </div>
  );
};
