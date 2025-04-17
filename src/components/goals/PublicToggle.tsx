import { useChallengeStore } from '../../store/challengeStore';

interface PublicToggleProps {
  challengeId: string;
  isPublic: boolean;
}

export const PublicToggle = ({ challengeId, isPublic }: PublicToggleProps) => {
  const updateChallengePublic = useChallengeStore(state => state.updateChallengePublic);

  const handleToggle = (checked: boolean) => {
    updateChallengePublic(challengeId, checked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
      <span className="font-medium">공개 설정</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => handleToggle(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
      </label>
    </div>
  );
};