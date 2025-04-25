import { useChallengeFormStore } from '@/store/ChallengeFormState';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { CreateChallengeParams } from '@/types/challenge';

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChallengeModal = ({ isOpen, onClose }: AddChallengeModalProps) => {
  const { title, description, targetAmount, startDate, endDate, isPublic, setTitle, setDescription, setTargetAmount, setStartDate, setEndDate, setIsPublic, resetForm } = useChallengeFormStore();
  const { mutate: createChallenge } = useCreateChallenge();

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newChallenge: CreateChallengeParams = {
      title,
      description,
      targetAmount: parseInt(targetAmount) || 0,
      startDate,
      endDate,
      text: description,     // 예시로 설명을 텍스트로 설정
      release: startDate,     // 예시로 시작일을 release로 설정
      amount: parseInt(targetAmount) || 0,  // 목표 금액을 amount로 설정
      capacity: 100,          // 예시로 임의의 값 설정
      category: 'general',    
    };

    createChallenge(newChallenge);
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">새 챌린지 추가하기</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="챌린지 제목"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="챌린지 설명"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 금액</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="목표 금액 (원)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-500"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">공개 챌린지로 설정</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSubmit}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};
